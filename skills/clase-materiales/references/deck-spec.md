# The deck spec

One JSON file per class day. `scripts/build_deck.js` reads it together with the course `design.json` and writes the pptx. The spec carries content and timing. It carries no color, font or coordinate, ever.

## Top level

```json
{
  "curso": "SPAN 212",
  "titulo": "Lección 1 · «Tú me quieres blanca»",
  "autor": "Caleb H. Kelley",
  "fecha": "lunes, 31 de agosto de 2026",
  "accent": "L1",
  "duracionMin": 75,
  "slides": []
}
```

`accent` is a key from `accents` in the course design file. `duracionMin` is checked against the slide windows and the build fails if they disagree.

## Every slide, whatever its type

| Field | Required | What it is |
|---|---|---|
| `tipo` | yes | One of the types below |
| `ventana` | yes | `["16:33", "16:35"]`, start and end in 24-hour HH:MM. Windows must be contiguous across the whole deck. |
| `rotulo` | yes | The short name of the beat. The generator builds the note header line from `ventana` and `rotulo`, so do not write that line by hand. |
| `notas` | yes | The verbatim speaker notes, labels and all. Rules in `guiones.md`. |
| `kicker` | no | The small line above the title |
| `titulo` | no | Set in all caps by the generator, so write it normally |
| `pie` | no | The small italic attribution or footnote |
| `size` | no | Body size override for a slide with unusually long text |

## Types

**`portada`** Opening slide. `imagen`, `subtitulo`, `pie`. Dark ground with the photograph bled to the edge on one side and the title on the clean side.

**`texto`** Title and a list across the full content width. `items`, `chip`.

**`panel`** Title and a list in the text column with a full-bleed image panel down one side. `imagen`, `items`, `chip`.

**`oscura`** Dark section break or activity slide. `imagen` for a photographic ground, `items`.

**`cita`** A pull quote in the display face with an accent rule beside it. `texto` for the quote, `pie` for the attribution, `fondo: "oscuro"` for the dark variant.

**`dos-columnas`** Two contrast cards. `columnas` is an array of two objects, each with `titulo` and `items`. The first card takes the accent rule, the second the hairline.

**`banda`** Three image tiles with a label and a gloss under each. `tiles` is an array of three objects with `imagen`, `rotulo` and `glosa`.

**`datos`** A dark data box replicating a textbook publication panel. `filas` is an array of `[etiqueta, valor]` pairs. Good for the six facts about a text that will be on the exam.

**`imagen`** A photograph edge to edge with an optional caption bar. `imagen`, `pie`.

## Items

An entry in `items` is either a plain string or an object.

```json
{ "text": "Publica cinco libros antes de los treinta y cinco", "accent": true }
```

`accent` colors that line in the lección accent, which is the one or two words per slide the system allows. `bold`, `italic`, `nivel` for indent depth and `bullet: false` are also available.

## Images

Paths are relative to where the generator runs. A missing file does not stop the build. The generator warns and draws a labeled placeholder, so the deck can be laid out before the photographs are chosen. Every warning has to be gone before delivery.

## What the build refuses

The preflight runs before anything is written, and it fails the build on a slide with no `notas`, notes with no `GUION` block, notes under 350 characters, a missing `rotulo`, a malformed or non-contiguous `ventana`, slide windows that do not sum to `duracionMin`, or an unknown `tipo`. Notes between 350 and 700 characters build with a warning, since 700 is the floor.

`--allow-thin` downgrades the note-length failure to a warning. It is for a genuine one-line slide and nothing else.

## Worked example

`scripts/examples/deck.example.json` is a complete nine-slide day in SPAN 212 that exercises every slide type and carries real notes at roughly a thousand characters each. Read it before writing a new one.
