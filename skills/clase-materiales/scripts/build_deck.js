#!/usr/bin/env node
/*
 * build_deck.js — class deck generator.
 *
 * Holds no design values of its own. Every color, font, size and coordinate
 * comes from the design file passed with --design. Change the design file and
 * the whole deck re-skins.
 *
 *   node build_deck.js --design courses/span212/design.json \
 *                      --deck lección1.json --out deck.pptx [--allow-thin]
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function loadPptxGen() {
  const tries = ['pptxgenjs'];
  try {
    const root = execSync('npm root -g', { encoding: 'utf8' }).trim();
    tries.push(path.join(root, 'pptxgenjs'));
  } catch (e) { /* npm not on PATH, fine */ }
  for (const t of tries) {
    try { return require(t); } catch (e) { /* keep looking */ }
  }
  console.error('pptxgenjs not found. Install it with: npm install -g pptxgenjs');
  process.exit(1);
}
const PptxGenJS = loadPptxGen();

// ---------------------------------------------------------------- arguments
const args = {};
process.argv.slice(2).forEach((a, i, arr) => {
  if (a.startsWith('--')) {
    const k = a.slice(2);
    args[k] = (arr[i + 1] && !arr[i + 1].startsWith('--')) ? arr[i + 1] : true;
  }
});
for (const req of ['design', 'deck', 'out']) {
  if (!args[req]) { console.error(`missing --${req}`); process.exit(1); }
}
const D = JSON.parse(fs.readFileSync(args.design, 'utf8'));
const K = JSON.parse(fs.readFileSync(args.deck, 'utf8'));
const allowThin = !!args['allow-thin'];

// ------------------------------------------------------------------ helpers
const C = D.colors;
const F = D.fonts;
const G = D.geometry;
const T = D.type;

const accentKey = K.accent || D.defaultAccent;
const ACC = D.accents[accentKey];
if (!ACC) {
  console.error(`accent "${accentKey}" is not defined in ${args.design}. Known: ${Object.keys(D.accents).join(', ')}`);
  process.exit(1);
}
const ACCENT = ACC.hex;
const TINT = ACC.tint || C.hairline;

const toMin = (hhmm) => {
  const m = /^(\d{1,2}):(\d{2})$/.exec(String(hhmm).trim());
  if (!m) return null;
  return parseInt(m[1], 10) * 60 + parseInt(m[2], 10);
};
const fmtClock = (hhmm) => {
  const t = toMin(hhmm);
  let h = Math.floor(t / 60), mm = t % 60;
  if (D.horaFormato === '12h') { h = h % 12; if (h === 0) h = 12; }
  return `${h}:${String(mm).padStart(2, '0')}`;
};

// --------------------------------------------------------------- preflight
const problems = [];
const warnings = [];

if (!Array.isArray(K.slides) || !K.slides.length) problems.push('deck has no slides');

let prevEnd = null;
K.slides.forEach((s, i) => {
  const n = i + 1;
  if (!s.tipo) problems.push(`slide ${n} has no tipo`);
  if (!s.rotulo) problems.push(`slide ${n} has no rotulo for its note header`);

  // time windows
  if (!Array.isArray(s.ventana) || s.ventana.length !== 2) {
    problems.push(`slide ${n} has no ventana [inicio, fin] in 24h HH:MM`);
  } else {
    const a = toMin(s.ventana[0]), b = toMin(s.ventana[1]);
    if (a === null || b === null) problems.push(`slide ${n} ventana is not HH:MM`);
    else {
      if (b < a) problems.push(`slide ${n} ventana ends before it starts`);
      if (prevEnd !== null && a !== prevEnd) {
        problems.push(`slide ${n} starts at ${s.ventana[0]} but slide ${n - 1} ended at a different time. Windows must be contiguous.`);
      }
      prevEnd = b;
    }
  }

  // notes
  const notes = (s.notas || '').trim();
  if (!notes) {
    problems.push(`slide ${n} has no notas. Every slide carries verbatim script.`);
  } else {
    if (!/^GUION$/m.test(notes)) {
      problems.push(`slide ${n} notes carry no GUION block. If the slide states it, the notes say it aloud.`);
    }
    if (notes.length < 350 && !allowThin) {
      problems.push(`slide ${n} notes are ${notes.length} characters. Floor is 700, hard failure under 350. Use --allow-thin only for a genuine one-line slide.`);
    } else if (notes.length < 700) {
      warnings.push(`slide ${n} notes are ${notes.length} characters, under the 700 floor.`);
    }
    if (/[:]\s*$/m.test(notes.split('\n').filter(l => /^[A-ZÁÉÍÓÚÑ ]{4,}$/.test(l.replace(/:$/, ''))).join('\n'))) {
      warnings.push(`slide ${n} has a caps label ending in a colon. Labels take no colon.`);
    }
  }
});

if (K.duracionMin && K.slides.length && prevEnd !== null) {
  const start = toMin(K.slides[0].ventana[0]);
  const total = prevEnd - start;
  if (total !== K.duracionMin) {
    problems.push(`slide windows total ${total} minutes, deck declares ${K.duracionMin}.`);
  }
}

warnings.forEach(w => console.warn('  aviso  ' + w));
if (problems.length) {
  console.error('\nPreflight failed. Nothing written.\n');
  problems.forEach(p => console.error('  ✗ ' + p));
  console.error('');
  process.exit(1);
}

// ------------------------------------------------------------------ layout
const pptx = new PptxGenJS();
pptx.layout = D.layout || 'LAYOUT_WIDE';
pptx.author = K.autor || '';
pptx.title = K.titulo || '';

function noteHeader(s) {
  const a = toMin(s.ventana[0]), b = toMin(s.ventana[1]);
  return `${fmtClock(s.ventana[0])}–${fmtClock(s.ventana[1])} · ${b - a} min · ${s.rotulo}`;
}

function bg(slide, color) {
  slide.background = { color: color };
}

// accent tick + kicker + all-caps title + hairline rule
function head(slide, s, opts) {
  const o = opts || {};
  const x = o.x !== undefined ? o.x : G.columnaTexto.x;
  const w = o.w !== undefined ? o.w : G.columnaTexto.w;
  const dark = !!o.dark;
  const y = G.cabecera.y;

  slide.addShape(pptx.ShapeType.rect, {
    x: x, y: y, w: G.cabecera.tick.w, h: G.cabecera.tick.h, fill: { color: ACCENT }, line: { color: ACCENT }
  });
  if (s.kicker) {
    slide.addText(String(s.kicker).toUpperCase(), {
      x: x + G.cabecera.tick.w + G.cabecera.tick.gap, y: y - 0.02, w: w, h: 0.24,
      fontFace: F.body, fontSize: T.kicker, color: dark ? C.paper : C.grey,
      charSpacing: T.kickerTracking, bold: false, valign: 'middle'
    });
  }
  slide.addText(String(s.titulo || '').toUpperCase(), {
    x: x, y: y + G.cabecera.tituloOffset, w: w, h: G.cabecera.tituloAlto,
    fontFace: F.titulo, fontSize: s.tituloSize || T.titulo, color: dark ? C.paper : C.ink,
    charSpacing: T.tituloTracking, bold: false, valign: 'top'
  });
  const reglaY = y + G.cabecera.reglaOffset;
  slide.addShape(pptx.ShapeType.line, {
    x: x, y: reglaY, w: w, h: 0,
    line: { color: dark ? C.grey : C.hairline, width: G.cabecera.reglaGrosor }
  });
  return reglaY;
}

// where the body starts, given whether a chip sits under the rule
function cuerpoY(reglaY, hasChip) {
  return reglaY + G.cuerpo.trasRegla + (hasChip ? G.chip.h + G.cuerpo.trasChip : 0);
}
function chipY(reglaY) {
  return reglaY + G.cuerpo.trasRegla;
}

// tinted textbook-page badge
function chip(slide, text, x, y) {
  const w = Math.max(G.chip.wMin, 0.105 * String(text).length + 0.30);
  slide.addShape(pptx.ShapeType.roundRect, {
    x: x, y: y, w: w, h: G.chip.h, rectRadius: G.chip.radio,
    fill: { color: TINT }, line: { color: TINT }
  });
  slide.addText(String(text).toUpperCase(), {
    x: x, y: y, w: w, h: G.chip.h, align: 'center', valign: 'middle',
    fontFace: F.body, fontSize: T.chip, color: ACCENT, charSpacing: T.chipTracking
  });
}

// small italic attribution
function caption(slide, text, x, y, w, dark) {
  slide.addText(String(text), {
    x: x, y: y, w: w, h: 0.3,
    fontFace: F.body, fontSize: T.caption, italic: true,
    color: dark ? C.hairline : C.grey
  });
}

function list(slide, items, x, y, w, h, dark, size) {
  const runs = items.map((it) => {
    if (typeof it === 'string') return { text: it, options: { bullet: { characterCode: G.vinieta }, breakLine: true } };
    return {
      text: it.text,
      options: {
        bullet: it.bullet === false ? false : { characterCode: G.vinieta },
        breakLine: true,
        bold: !!it.bold,
        italic: !!it.italic,
        color: it.accent ? ACCENT : (dark ? C.paper : C.ink),
        indentLevel: it.nivel || 0
      }
    };
  });
  slide.addText(runs, {
    x: x, y: y, w: w, h: h,
    fontFace: F.body, fontSize: size || T.cuerpo,
    color: dark ? C.paper : C.ink,
    paraSpaceAfter: T.espacioParrafo, lineSpacingMultiple: 1,
    valign: 'top'
  });
}

function placeholder(slide, box, label, dark) {
  slide.addShape(pptx.ShapeType.rect, {
    x: box.x, y: box.y, w: box.w, h: box.h,
    fill: { color: dark ? C.ink : TINT }, line: { color: dark ? C.grey : C.hairline }
  });
  slide.addText(String(label || 'imagen pendiente').toUpperCase(), {
    x: box.x, y: box.y + box.h / 2 - 0.2, w: box.w, h: 0.4, align: 'center',
    fontFace: F.body, fontSize: T.chip, color: C.grey, charSpacing: T.chipTracking
  });
}

function panelImage(slide, img, box, label, dark) {
  if (!img) return;
  if (!fs.existsSync(img)) {
    console.warn(`  aviso  image not found, placeholder drawn: ${img}`);
    placeholder(slide, box, label, dark);
    return;
  }
  slide.addImage({ path: img, x: box.x, y: box.y, w: box.w, h: box.h, sizing: { type: 'cover', w: box.w, h: box.h } });
}

// ------------------------------------------------------------- slide types
const builders = {};

builders.portada = (slide, s) => {
  bg(slide, C.ink);
  if (s.imagen) panelImage(slide, s.imagen, G.portada.imagen, s.titulo, true);
  if (s.velo !== false) {
    slide.addShape(pptx.ShapeType.rect, {
      x: G.portada.velo.x, y: 0, w: G.portada.velo.w, h: G.slide.h,
      fill: { color: C.ink, transparency: G.portada.velo.transparencia }, line: { color: C.ink }
    });
  }
  if (s.kicker) {
    slide.addText(String(s.kicker).toUpperCase(), {
      x: G.portada.texto.x, y: G.portada.texto.y, w: G.portada.texto.w, h: 0.3,
      fontFace: F.body, fontSize: T.kicker, color: ACCENT, charSpacing: T.kickerTracking
    });
  }
  slide.addText(String(s.titulo || '').toUpperCase(), {
    x: G.portada.texto.x, y: G.portada.texto.y + 0.42, w: G.portada.texto.w, h: 2.2,
    fontFace: F.titulo, fontSize: T.portadaTitulo, color: C.paper, charSpacing: T.tituloTracking, valign: 'top'
  });
  if (s.subtitulo) {
    slide.addText(String(s.subtitulo), {
      x: G.portada.texto.x, y: G.portada.texto.y + 2.55, w: G.portada.texto.w, h: 0.9,
      fontFace: F.display, fontSize: T.portadaSub, color: C.hairline, italic: true, valign: 'top'
    });
  }
  if (s.pie) caption(slide, s.pie, G.portada.texto.x, G.slide.h - 0.75, G.portada.texto.w, true);
};

builders.texto = (slide, s) => {
  bg(slide, C.paper);
  const r = head(slide, s, { x: G.margen.x, w: G.anchoContenido });
  if (s.chip) chip(slide, s.chip, G.margen.x, chipY(r));
  const y = cuerpoY(r, !!s.chip);
  if (s.items) list(slide, s.items, G.margen.x, y, G.anchoContenido, G.slide.h - y - G.cuerpo.pieAlto, false, s.size);
  if (s.pie) caption(slide, s.pie, G.margen.x, G.slide.h - 0.72, G.anchoContenido, false);
};

builders.panel = (slide, s) => {
  bg(slide, C.paper);
  panelImage(slide, s.imagen, G.panelLateral, s.titulo);
  const r = head(slide, s, { x: G.columnaTexto.x, w: G.columnaTexto.w });
  if (s.chip) chip(slide, s.chip, G.columnaTexto.x, chipY(r));
  const y = cuerpoY(r, !!s.chip);
  if (s.items) list(slide, s.items, G.columnaTexto.x, y, G.columnaTexto.w, G.slide.h - y - G.cuerpo.pieAlto, false, s.size);
  if (s.pie) caption(slide, s.pie, G.columnaTexto.x, G.slide.h - 0.72, G.columnaTexto.w, false);
};

builders.oscura = (slide, s) => {
  bg(slide, C.ink);
  if (s.imagen) {
    panelImage(slide, s.imagen, { x: 0, y: 0, w: G.slide.w, h: G.slide.h }, s.titulo, true);
    slide.addShape(pptx.ShapeType.rect, {
      x: 0, y: 0, w: G.slide.w, h: G.slide.h,
      fill: { color: C.ink, transparency: G.oscura.transparencia }, line: { color: C.ink }
    });
  }
  const r = head(slide, s, { x: G.margen.x, w: G.anchoContenido, dark: true });
  const y = cuerpoY(r, false);
  if (s.items) list(slide, s.items, G.margen.x, y, G.anchoContenido, G.slide.h - y - G.cuerpo.pieAlto, true, s.size);
  if (s.pie) caption(slide, s.pie, G.margen.x, G.slide.h - 0.72, G.anchoContenido, true);
};

builders.cita = (slide, s) => {
  bg(slide, s.fondo === 'oscuro' ? C.ink : C.paper);
  const dark = s.fondo === 'oscuro';
  head(slide, s, { x: G.margen.x, w: G.anchoContenido, dark: dark });
  slide.addShape(pptx.ShapeType.rect, {
    x: G.cita.x - G.cita.filete, y: G.cita.y, w: G.cita.filete, h: G.cita.h,
    fill: { color: ACCENT }, line: { color: ACCENT }
  });
  slide.addText(String(s.texto || ''), {
    x: G.cita.x, y: G.cita.y, w: G.cita.w, h: G.cita.h,
    fontFace: F.display, fontSize: s.size || T.cita, italic: true,
    color: dark ? C.paper : C.ink, valign: 'top', lineSpacingMultiple: 1.15
  });
  if (s.pie) caption(slide, s.pie, G.cita.x, G.cita.y + G.cita.h + 0.08, G.cita.w, dark);
};

builders['dos-columnas'] = (slide, s) => {
  bg(slide, C.paper);
  head(slide, s, { x: G.margen.x, w: G.anchoContenido });
  const cols = s.columnas || [];
  cols.slice(0, 2).forEach((col, i) => {
    const x = G.dosColumnas.x[i];
    slide.addShape(pptx.ShapeType.rect, {
      x: x, y: G.dosColumnas.y, w: G.dosColumnas.w, h: G.dosColumnas.filete,
      fill: { color: i === 0 ? ACCENT : C.hairline }, line: { color: i === 0 ? ACCENT : C.hairline }
    });
    slide.addText(String(col.titulo || '').toUpperCase(), {
      x: x, y: G.dosColumnas.y + 0.18, w: G.dosColumnas.w, h: 0.4,
      fontFace: F.titulo, fontSize: T.subtitulo, color: C.ink, charSpacing: T.tituloTracking
    });
    list(slide, col.items || [], x, G.dosColumnas.y + 0.72, G.dosColumnas.w, G.dosColumnas.h, false, col.size);
  });
};

builders.banda = (slide, s) => {
  bg(slide, C.paper);
  head(slide, s, { x: G.margen.x, w: G.anchoContenido });
  (s.tiles || []).slice(0, 3).forEach((tile, i) => {
    const x = G.banda.x[i];
    const box = { x: x, y: G.banda.y, w: G.banda.w, h: G.banda.alto };
    if (tile.imagen) panelImage(slide, tile.imagen, box, tile.rotulo);
    else placeholder(slide, box, tile.rotulo, false);
    slide.addText(String(tile.rotulo || '').toUpperCase(), {
      x: x, y: G.banda.y + G.banda.alto + 0.12, w: G.banda.w, h: 0.3,
      fontFace: F.body, fontSize: T.chip, color: ACCENT, charSpacing: T.chipTracking
    });
    slide.addText(String(tile.glosa || ''), {
      x: x, y: G.banda.y + G.banda.alto + 0.42, w: G.banda.w, h: 1.2,
      fontFace: F.body, fontSize: T.glosa, color: C.ink, valign: 'top'
    });
  });
};

builders.datos = (slide, s) => {
  bg(slide, C.paper);
  head(slide, s, { x: G.margen.x, w: G.anchoContenido });
  slide.addShape(pptx.ShapeType.rect, {
    x: G.datos.x, y: G.datos.y, w: G.datos.w, h: G.datos.h,
    fill: { color: C.ink }, line: { color: C.ink }
  });
  const filas = (s.filas || []).map(f => ([
    { text: String(f[0]).toUpperCase() + '  ', options: { color: C.hairline, fontSize: T.datosEtiqueta, charSpacing: T.chipTracking } },
    { text: String(f[1]), options: { color: C.paper, fontSize: T.datosValor, breakLine: true } }
  ])).flat();
  slide.addText(filas, {
    x: G.datos.x + G.datos.pad, y: G.datos.y + G.datos.pad, w: G.datos.w - 2 * G.datos.pad, h: G.datos.h - 2 * G.datos.pad,
    fontFace: F.body, paraSpaceAfter: T.espacioParrafo, valign: 'top'
  });
  if (s.pie) caption(slide, s.pie, G.datos.x, G.datos.y + G.datos.h + 0.12, G.datos.w, false);
};

builders.imagen = (slide, s) => {
  bg(slide, C.ink);
  panelImage(slide, s.imagen, { x: 0, y: 0, w: G.slide.w, h: G.slide.h }, s.titulo, true);
  if (s.pie) {
    slide.addShape(pptx.ShapeType.rect, {
      x: 0, y: G.slide.h - 0.85, w: G.slide.w, h: 0.85,
      fill: { color: C.ink, transparency: 20 }, line: { color: C.ink }
    });
    caption(slide, s.pie, G.margen.x, G.slide.h - 0.62, G.anchoContenido, true);
  }
};

// ---------------------------------------------------------------- assembly
K.slides.forEach((s, i) => {
  const build = builders[s.tipo];
  if (!build) {
    console.error(`slide ${i + 1} has unknown tipo "${s.tipo}". Known: ${Object.keys(builders).join(', ')}`);
    process.exit(1);
  }
  const slide = pptx.addSlide();
  build(slide, s);
  slide.addNotes(noteHeader(s) + '\n\n' + s.notas.trim() + '\n');
});

pptx.writeFile({ fileName: args.out }).then(() => {
  const chars = K.slides.reduce((a, s) => a + s.notas.trim().length, 0);
  console.log(`\n${args.out}`);
  console.log(`  ${K.slides.length} slides · accent ${accentKey} (${ACC.nombre || ACC.hex}) · ${chars} characters of notes · ${Math.round(chars / K.slides.length)} per slide`);
  console.log('  Now render it and look at every slide. Geometry does not show collisions.\n');
});
