# Guiones and speaker notes

The part that matters most and the part most likely to be under-done.

## The standing rule

Verbatim beats summary, and longer beats shorter.

A speaker note that says “explica la política de participación” is a failure. A speaker note that carries the four paragraphs he would actually say is correct. If a slide states something, there is a sentence in the notes that says it out loud. When in doubt, write the sentence.

## Spanish conventions for anything spoken

Vosotros. That is how he speaks in class. Students are never pushed toward it, and no student-facing material, spoken or printed, implies they should use it. This is a standing preference with no exceptions and it does not vary by course level.

Numbers written as spoken. “un diez por ciento”, not “10%”. “las cuatro de la tarde”, not “4:00 p.m.”. “mil novecientos cincuenta y seis”, not “1956”. The script is read aloud, so it is written the way it sounds. This applies inside the guillemets only. Headers, tables and labels keep their digits.

Guillemets `« »` wrap the spoken script inside speaker notes, so the eye finds the words to say instantly.

Bracketed stage directions split a multi-part guion. `[Al formar las parejas]`, `[En la puesta en común]`, `[Al cerrar]`.

Register comes from the course profile. Every profile carries a `registro` line. Write to it. A second-year literature course takes short sentences, high-frequency vocabulary and no literary idiom. A first-year language course takes present tense, cognates where they are honest, and one instruction per sentence. Never write a guion at the level of the text being studied rather than the level of the students reading it.

Plain content warnings. State the theme in one sentence, offer a private conversation, and move on. No euphemism and no dwelling.

## The English support layer

For courses whose profile sets `apoyo_en_ingles: sí`, which currently means SPAN 201 and anything below it.

The guion stays entirely in Spanish. Nothing changes about the Spanish. What is added is a short English line, inside the notes only, for the beats where a misunderstood instruction costs the activity. Mark it with the label `EN INGLÉS SI HACE FALTA` and keep it to one sentence.

It earns its place in four situations.

- Procedural instructions with more than one step, where a student who misses step two is lost for the whole activity.
- The rules of a graded task, meaning anything that affects a score.
- A safety, accessibility or policy statement, where being understood matters more than being in Spanish.
- A grammatical concept at the moment it is first named, where a one-clause English gloss prevents ten minutes of confusion.

It does not appear on ordinary content, on questions, on transitions, or as a translation of the guion. Nothing on a slide is ever in English because of this layer. If a deck reads as bilingual, the layer has been overused.

## Speaker note anatomy

Every slide’s notes open with one header line in this exact form.

```
4:33–4:35 · 2 min · Supersitio de VHL
```

Then labeled blocks, each label in caps on its own line with no colon after it.

| Label | When it appears |
|---|---|
| GUION | Always. The verbatim words. |
| ANTES DE QUE ENTREN | First slide. Room setup. |
| QUÉ HACER or ACCIÓN | Physical actions that run alongside the talking. |
| PARA TI | Something only Caleb needs to know. |
| TRANSICIÓN | The sentence that hands off to the next slide. |
| RITMO | Per-student or per-item pacing on a group activity. |
| CONTROL DE TIEMPO | A hard stop, on any segment that tends to overrun. |
| MIENTRAS TRABAJAN | What to do while students work silently, including when to call time. |
| SI ALGUIEN PREGUNTA | Anticipated questions with the answers ready. |
| EN INGLÉS SI HACE FALTA | The support line, in courses that use it. |
| VARIANTE DE RESERVA | The fallback activity. |
| ANTES DE SALIR TÚ | Last slide. What to collect, count and follow up on. |

Drill answers, translations and any other key go in the notes, never on the slide.

## Time budgets

Every slide’s notes carry their own window. The windows are contiguous, they sum to the plan’s segment totals, and those sum to the class length. `scripts/build_deck.js` checks this at build time and refuses a deck whose windows have a gap, an overlap or a wrong total.

For calibration, a seventy-five minute first day ran fourteen slides at 4:00–4:05, 4:05–4:09, 4:09–4:12, 4:12–4:15, 4:15–4:28, 4:28–4:31, 4:31–4:33, 4:33–4:35, 4:35–4:37, 4:37–4:39, 4:39–4:51, 4:51–5:10, 5:10–5:13, 5:13–5:15.

## Length in practice

That same deck ran about 15,500 characters of notes across fourteen slides, roughly 700 to 1,600 per slide. Activity slides run longest, since they carry a guion in several parts plus pacing cues. Nothing came in under 700. Treat 700 as the floor rather than the target. The generator warns below 700 and fails below 350.

## Obra typography, in notes and on slides alike

Films and plays in italics. Poems and short stories in quotation marks. A film segment goes in quotation marks inside the italicized film title.

## Note order in the deck, from Spring 2027 on

Presenter view shows the top of the notes, so the top is where the words to say go. `notas_en_vivo()` in `guion2027.py` rewrites the notes of a finished deck in this order.

1. The header line (clock window, minutes, title).
2. The GUION lines in 18 pt bold.
3. EN INGLÉS SI HACE FALTA, then the answers and any clock marks.
4. The TRANSICIÓN in 18 pt bold, after an arrow.
5. A dotted line reading ANTES DE CLASE, followed by Qué hacer, Para ti and every other preparation label.

The 700-character floor still applies to the notes as a whole. The length lives below the dotted line, and the part above it stays short enough to read at a glance.
