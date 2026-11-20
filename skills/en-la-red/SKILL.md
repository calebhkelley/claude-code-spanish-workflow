---
name: en-la-red
description: "Build a SPAN 201/202 \"En la red\" in-class interpretive activity for a Contraseña unit, a guided student handout plus the instructor lesson plan, as Emory-styled Word docs, structured so the activity rehearses that unit's Actividad de síntesis. Use whenever Caleb wants an En la red activity, an in-class IPA-style handout, a video or text comprehension activity, or the lesson plan that goes with it, for any unit (U13–U18), even if he doesn't say \"En la red\" by name."
---

# En la red · in-class interpretive activity + lesson plan

Caleb teaches Contraseña units in SPAN 201/202. Each unit’s penultimate class day carries an "En la red" activity (a video or web text with comprehension work), usually alongside the Exploración cultural and the project Borrador. This skill builds two Word documents for it, in his Emory-styled system:

1. A student handout (a guided IPA) students work through in class for practice.
2. A lesson plan for Caleb to teach from.

The handout exists to prepare. The unit’s Actividad de síntesis (the graded, in-class, on-paper unit assessment) is interpretive + grammar-in-context + short presentational. So the En la red handout rehearses those same moves on the same theme, one class before the síntesis. A student who finishes it has already done a smaller version of everything the síntesis asks. By default the handout is ungraded in-class practice, not a Canvas assignment; confirm if a unit differs.

## Before you draft, gather the unit’s materials

Don’t invent content. Pull it from what exists:
- The unit’s En la red source. If Caleb has a draft (often a .txt in the unit folder), start there. Otherwise take the En la red section from Contraseña for that unit (Preparar: Conexión, Preparar: Comprensión, Texto/Video, Aplicar).
- The unit Vocabulario PDFs (Vocabulario N-1, N-2) for the warm-up and to seed the presentational.
- The unit Resumen gramatical PDFs. The grammar-in-context section must drill whatever grammar THIS unit teaches, not a carried-over one. Read the summaries and build to them.
- The unit’s síntesis design, in project memory (span201_sintesis.md or the unit’s own note). Match the handout’s interpretive + grammar + presentational shape to how that síntesis is built, so the rehearsal is faithful.
- The calendar (General/ folder) for the En la red date and the síntesis date, per meeting pattern (TR vs MW). Do not invent dates.
- caleb-profile for voice, and span201_planes_de_clase.md for the plan conventions.

## The student handout (guided IPA)

Directions in Spanish, with a short English gloss in parentheses for task mechanics only (how many, how long), the same convention as the síntesis. Register is tú or ustedes, never vosotros: Caleb speaks vosotros in class but never asks it of students, so a handout addressing them in vosotros would misread the room.

Build these parts, in order. They map onto the three síntesis modes. Adapt the content to the unit and keep the arc.

- A. Vocabulario de la unidad (calentamiento). ~6 fill-in items using the unit’s active vocabulary, tied to the theme. Alphabetize or shuffle the bank so its order never matches the answers.
- B. Conexión (antes de ver/leer). The pre-viewing image or context work from the source, with its reflection questions.
- C. Vocabulario del texto/video (comprensión en contexto). A handful of quote-based meaning-in-context items from the source, two plausible options each.
- D. Interpretación. The video or text with the source’s guided steps (watch/read, a focused re-view, a short synthesis question) and a Cierto/Falso or short-answer set. This is the interpretive heart, the closest thing to the síntesis reading.
- E. Gramática en contexto. Short. A cloze or forced-choice built from a connected passage on the theme, drilling the unit grammar, plus a small second piece if the unit teaches two structures. Mirrors the síntesis grammar section.
- F. Presentacional. A 5 to 6 sentence writing task on the theme with explicit requirements (use the unit grammar, include N vocabulary words). Same shape as the síntesis presentational; say so in a small closing note.

Never print answers on the handout. Keys live in the lesson plan only. A handout that reveals its own answers, through an answer line, a marked option, or a bank in answer order, stops being a thinking task.

## The lesson plan

Match Caleb’s plan format (see any recent unit plan). Structure:
- Header: kicker, title, the meeting dates per section, Prof. line.
- Encuadre box: what day this is, what else shares the period (the En la red day usually also carries the Exploración cultural and the project Borrador, so scope the En la red block to roughly 45 to 55 minutes, not the full period); the design assumptions (students pre-worked the Contraseña Preparar/Aplicar); that it is ungraded practice for the síntesis; the síntesis date.
- Aviso de contenido box when the theme warrants it (migration, family separation, and similar). Make clear students may speak about the text or people they know and never have to tell their own story.
- Objetivos del día.
- Resumen del horario table (relative minutes, with a line giving each section’s start clock: MW 1:00, 201-10 TR 2:30, 201-11 TR 4:00).
- Materiales y preparación (print the handout, queue the video with its timestamps marked, board setup).
- One block per handout section: Qué hacer, Para proyectar (cream boxes), Guion del profesor (verbatim, in vosotros, warm and plain), a Nota box carrying the answer key, and "En inglés si hace falta" on multi-step segments.
- Tarea para el próximo día (finish the presentational and grammar as síntesis prep; the síntesis date; LinguaMeeting if relevant).
- Si el tiempo se descuadra (what to cut, what not to; the interpretive block most resembles the síntesis, so protect it).

Keys go only in the plan’s Nota boxes. When a key depends on the specific clip and you could not verify it, say so and tell Caleb to confirm rather than asserting it.

## Standing conventions
- Activity integrity. In any selection, matching, or fill-in item, nothing in color, weight, or order may reveal the answer. Scramble word banks. Keep all options visually identical.
- Register. Handout in tú/ustedes; guiones in vosotros. Never frame vosotros as expected of students.
- Dates. From the calendar, per meeting pattern. Never invent one. Use "según Canvas" when a date is not fixed there.
- Writing (Caleb’s preferences, apply to all prose you write, guiones and notes included): no em dashes; curly apostrophes and « » quotes; no colon used to bridge or introduce; avoid the "no es X, es Y" contrast frame; sparing, intentional bold; in Spanish no Oxford comma, in English use it.
- Files live in Planes de clase/Unidad N. Work on copies, deliver the finished files.

## Styling engine

Build the docs with python-docx, not the LibreOffice HTML pipeline. Write the helper below to `emorydoc.py` and `import` it; it is the validated Emory system (blue #012169 headings, gold #F2A900 rules, cream #FCF6E7 guion blocks, blue-tint #EEF1F7 notes, warn #FDF1D8, Calibri).

```python
# emorydoc.py
from docx import Document
from docx.shared import Pt, Inches, RGBColor
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
from docx.enum.table import WD_TABLE_ALIGNMENT

BLUE="012169"; GOLD="F2A900"; TINT="EEF1F7"; CREAM="FCF6E7"; WARN="FDF1D8"
GREY="6E6A65"; INK="141414"; HAIR="D8D2CC"

def cell_bg(cell, fill):
    tcPr=cell._tc.get_or_add_tcPr(); shd=OxmlElement("w:shd")
    shd.set(qn("w:val"),"clear"); shd.set(qn("w:color"),"auto"); shd.set(qn("w:fill"),fill); tcPr.append(shd)

def cell_borders(cell, left=None, top=None, bottom=None, right=None, allc=None):
    tcPr=cell._tc.get_or_add_tcPr(); tb=tcPr.find(qn("w:tcBorders"))
    if tb is None: tb=OxmlElement("w:tcBorders"); tcPr.append(tb)
    def setb(side, spec):
        if spec is None: return
        e=tb.find(qn("w:"+side))
        if e is None: e=OxmlElement("w:"+side); tb.append(e)
        sz,color=spec
        e.set(qn("w:val"),"single"); e.set(qn("w:sz"),str(sz)); e.set(qn("w:space"),"0"); e.set(qn("w:color"),color)
    if allc:
        for s in ("left","top","bottom","right"): setb(s, allc)
    setb("left",left); setb("top",top); setb("bottom",bottom); setb("right",right)

def no_table_borders(table):
    b=OxmlElement("w:tblBorders")
    for edge in ("top","left","bottom","right","insideH","insideV"):
        e=OxmlElement("w:"+edge); e.set(qn("w:val"),"none"); b.append(e)
    table._tbl.tblPr.append(b)

def keep_together(par):
    pPr=par._p.get_or_add_pPr()
    for tag in ("w:keepNext","w:keepLines"):
        el=OxmlElement(tag); el.set(qn("w:val"),"true"); pPr.append(el)

def keep_lines(par):
    pPr=par._p.get_or_add_pPr(); el=OxmlElement("w:keepLines"); el.set(qn("w:val"),"true"); pPr.append(el)

def space(par, before=None, after=None, line=None):
    pf=par.paragraph_format
    if before is not None: pf.space_before=Pt(before)
    if after  is not None: pf.space_after =Pt(after)
    if line   is not None: pf.line_spacing=line

def run(par, text, size=11, bold=False, italic=False, color=None, font="Calibri", caps=False, spacing=None):
    r=par.add_run(text); r.bold=bold; r.italic=italic; r.font.size=Pt(size); r.font.name=font
    if color: r.font.color.rgb=RGBColor.from_string(color)
    if caps:
        rpr=r._r.get_or_add_rPr(); sc=OxmlElement("w:smallCaps"); sc.set(qn("w:val"),"true"); rpr.append(sc)
    if spacing is not None:
        rpr=r._r.get_or_add_rPr(); sp=OxmlElement("w:spacing"); sp.set(qn("w:val"),str(spacing)); rpr.append(sp)
    return r

def para(doc, text=None, **kw):
    p=doc.add_paragraph()
    if text is not None:
        run(p, text, **{k:v for k,v in kw.items() if k in ("size","bold","italic","color","font","caps","spacing")})
    return p

def new_doc(margins=0.8, landscape=False):
    doc=Document(); st=doc.styles["Normal"]
    st.font.name="Calibri"; st.font.size=Pt(11); st.font.color.rgb=RGBColor.from_string(INK)
    sec=doc.sections[0]
    if landscape:
        from docx.enum.section import WD_ORIENT
        sec.orientation=WD_ORIENT.LANDSCAPE; sec.page_width, sec.page_height=Inches(11), Inches(8.5)
    for m in ("top_margin","bottom_margin","left_margin","right_margin"): setattr(sec, m, Inches(margins))
    return doc

def gold_rule(par, size=16):
    pPr=par._p.get_or_add_pPr(); pbdr=OxmlElement("w:pBdr"); bottom=OxmlElement("w:bottom")
    bottom.set(qn("w:val"),"single"); bottom.set(qn("w:sz"),str(size)); bottom.set(qn("w:space"),"4"); bottom.set(qn("w:color"),GOLD)
    pbdr.append(bottom); pPr.append(pbdr)

def kicker(doc, text):
    p=doc.add_paragraph(); space(p, before=2, after=1); run(p, text.upper(), size=9, bold=True, color=BLUE, caps=True, spacing=30); keep_lines(p); return p

def h1(doc, text):
    p=doc.add_paragraph(); space(p, before=2, after=4); run(p, text, size=22, bold=True, color=BLUE); keep_lines(p); return p

def h2(doc, text, rule=True):
    p=doc.add_paragraph(); space(p, before=12, after=6); run(p, text, size=14, bold=True, color=BLUE); keep_together(p)
    if rule: gold_rule(p, 16)
    return p

def h3(doc, text):
    p=doc.add_paragraph(); space(p, before=8, after=2); run(p, text, size=11.5, bold=True, color=BLUE); keep_together(p); return p

def box(doc, lines, fill=TINT, left=BLUE, left_sz=24, label=None, label_color=None):
    # lines: list of (text, kwargs-dict) or plain str. One-cell callout table.
    t=doc.add_table(rows=1, cols=1); t.alignment=WD_TABLE_ALIGNMENT.LEFT; no_table_borders(t)
    c=t.cell(0,0); cell_bg(c, fill)
    if left: cell_borders(c, left=(left_sz, left))
    c.width=Inches(6.6)
    tcPr=c._tc.get_or_add_tcPr(); mar=OxmlElement("w:tcMar")
    for side,val in (("top",90),("bottom",90),("start",150),("end",150)):
        e=OxmlElement("w:"+side); e.set(qn("w:w"),str(val)); e.set(qn("w:type"),"dxa"); mar.append(e)
    tcPr.append(mar)
    first=c.paragraphs[0]; first.text=""; made=False
    if label:
        space(first, after=2); run(first, label.upper(), size=8.5, bold=True, color=label_color or left, caps=True, spacing=20); made=True
    for item in lines:
        p = c.add_paragraph() if made else first; made=True
        space(p, after=2, before=0)
        txt, kw = item if isinstance(item, tuple) else (item, {})
        run(p, txt, **kw)
    return t

def bullet(doc, text, level=0, **kw):
    p=doc.add_paragraph(); p.paragraph_format.left_indent=Inches(0.28+0.25*level)
    p.paragraph_format.first_line_indent=Inches(-0.16); space(p, after=2, before=0)
    run(p, "•  ", size=11, color=GOLD, bold=True)
    run(p, text, **{k:v for k,v in kw.items() if k in ("size","bold","italic","color","font")}); return p

def numbered(doc, n, text, **kw):
    p=doc.add_paragraph(); p.paragraph_format.left_indent=Inches(0.32)
    p.paragraph_format.first_line_indent=Inches(-0.32); space(p, after=3, before=0)
    run(p, f"{n}.  ", size=11, bold=True, color=BLUE)
    run(p, text, **{k:v for k,v in kw.items() if k in ("size","bold","italic","color","font")}); return p

def blank_lines(doc, n=1):
    for _ in range(n):
        p=doc.add_paragraph(); space(p, before=6, after=6)
        pPr=p._p.get_or_add_pPr(); pbdr=OxmlElement("w:pBdr"); bottom=OxmlElement("w:bottom")
        bottom.set(qn("w:val"),"single"); bottom.set(qn("w:sz"),"6"); bottom.set(qn("w:space"),"2"); bottom.set(qn("w:color"),HAIR)
        pbdr.append(bottom); pPr.append(pbdr)
```

For a multi-column table (schedule, options grid), add rows with `doc.add_table`, set `no_table_borders`, and use `cell_bg` / `cell_borders(bottom=(4,HAIR))` for hairline rules; put `w:cantSplit` on each `w:tr` so a table never splits mid-row.

## Deliver and verify
- Save both docx under `/mnt/user-data/outputs`, `SendUserFile` them, and (when the device is linked) `device_commit_files` into `Planes de clase/Unidad N`.
- Always render each docx to PDF (`soffice --headless --convert-to pdf`) and look at a page or two before delivering. Check the callout boxes, the schedule table, and that no answer key leaked onto the handout.

## Checklist
- Handout has all six parts, adapted to this unit’s text, vocabulary, and grammar.
- Grammar-in-context drills THIS unit’s grammar, not a carried-over one.
- No answers on the handout; keys only in the plan’s Nota boxes.
- Banks scrambled; no option visually marked.
- Register correct (student handout not in vosotros).
- Dates from the calendar, or "según Canvas".
- Plan scoped to the real class time for the day.
- Rendered to PDF and eyeballed.