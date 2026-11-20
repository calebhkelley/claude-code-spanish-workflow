---
name: "texto-para-estudiantes"
description: "The ceiling on student-facing text in Caleb's Spanish courses, plus the revision audit, scaffolding, writing-space and answer-leak rules. Read before writing or revising any slide, cuaderno page, handout, project sheet or assessment for SPAN 201/202."
---

# Texto para estudiantes · the ceiling

This is the rule sheet for anything a SPAN 201/202 student reads: a slide, a cuaderno page, a handout, a project instrucciones, a síntesis. Read it alongside whichever build skill applies (`clase-materiales`, `actividad-de-sintesis`, `proyecto-materiales`, `en-la-red`).

## Step zero · run the audit

Before building or revising anything, run this on Caleb’s machine with `device_bash`:

```
python3 "$HOME/mnt/SPAN 201/03 Registro/auditar_revisiones.py"
```

It takes under a second over the whole course folder and prints a few lines. It pulls every comment Caleb has left in a .docx or .pptx, and it diffs each file against a stored plain-text snapshot so it also catches edits he made without commenting. Anything new goes into `03 Registro/REVISIONES.md` as an open entry, with the detail in `03 Registro/_auditoria/detalle_<fecha>.md`.

How to work with it:

- Open the detail file only for entries you are about to act on. The summary is deliberately short so a clean run costs almost nothing.
- Every open entry gets resolved or asked about before you build. A comment is a build instruction, not a note.
- **Close entries by editing `REVISIONES.md`**, marking `[x]` and writing what you did and which skill now carries the rule. Mark it done when the correction is applied, not when it is understood.
- **Then run `--cerrar`** so those comments stop being reported. It fingerprints them, so his comment stays inside his file untouched.
- **`--base`** re-baselines the snapshots after you deliver, so your own changes are not reported back to you next run.
- A run that finds nothing prints one line. That is the normal case and it is the point.

What it does not catch is a decision Caleb made and never wrote down. When a correction implies a rule, ask rather than infer, and put the answer in the skill.

## The six recurring corrections

Every recurring correction Caleb has written on these materials is one of six things, in the order he has flagged them.

## 1 · Too many words

The readers are intermediate-low. Every extra clause costs them decoding they should be spending on the task.

- One sentence per instruction. A task line names the action, the page and the grouping. Nothing else. The rest is the teacher’s job to say out loud, and the guion already carries it.
- Cut any sentence that only tells them how to feel about the task. «La corrección es la parte que cuenta» survives, because it changes what they write. «Es el mismo músculo que la síntesis» does not.
- A box that runs past three lines is either a reading text or it is too long.
- Prefer the shorter verb and the shorter noun. «Di en qué parte del vídeo te apoyas» beats «No basta la respuesta: hay que decir en qué parte del vídeo te apoyas (idea + prueba)».
- Before delivering, read every student-facing page start to finish the way a third-semester reader would. Anything you skim past, they will too.

## 2 · Meta commentary, footers and vague headings

- Nothing on a student page explains the pedagogy. No «esto es un plan de trabajo, no una entrega», no «lo que hunde un proyecto en pareja es la logística», no «es el ensayo directo de la síntesis». That reasoning belongs in the plan de clase, where Caleb reads it.
- A slide footer is optional and usually wrong. The `nota` field exists to say something the slide does not: a page number, a link, a timing. It is not for restating the task or explaining why the task is good. If the footer would only paraphrase the slide, leave it out. Caleb has deleted these by hand on two decks now; on a third, he deleted seven of them.
- Headings say what they mean. «El arranque de la escucha» tells a student nothing. Name the task or name the content. Caleb’s words on a Día 3 slide were «hate this vagueness in the headings. say what you mean». A heading that could sit on any slide in the deck is a heading that has not been written yet.
- A modelo is for a format, not for a task. Keep one only where the response shape is genuinely new and the student cannot tell how much to write. Where the item is multiple choice, a blank to fill, or a sentence to correct, the consigna already says everything the modelo would, and the modelo just costs reading minutes. When in doubt, cut it.

## 3 · Not enough room to write

This has been the note on four separate handouts.

- A one-line answer gets a ruled row of 26pt, not 20. A two-to-three sentence answer gets three or four ruled lines at 26 to 28pt.
- A fill-in table row is at least 30pt. A planning box that asks for a sentence is at least 45.
- When cutting text frees vertical space, spend it on writing room, not on white margin. A half-empty student page means the boxes should have grown.

## 4 · Production asked for cold

The pattern to stop repeating: the sheet shows a form, then asks students to write their own sentence with it, and nobody can. The missing step is recognition.

Any new structure gets four moves, in this order, and the last two are where the minutes go.

1. Fíjate. Two or three real sentences from the day’s own content, one per form. They mark the structure; they write nothing.
2. Entiende. Five or six new sentences, classified A / B / C against the forms. Selection only, no production. This is the step that keeps going missing.
3. Practica. Guided output with the frame given: blanks, a supplied verb, a supplied time phrase.
4. Úsalo. Their own sentences, one per form, with a printed model and an opener for each.

A block covering three forms needs closer to twenty minutes than to ten. If the clock will not hold it, cut a form, not a step.

## 5 · Answers leaking onto the page

Beyond the standing integrity rules (no colour or weight on the right option, banks scrambled, keys only in the notes or the clave):

- A fallback box on the student sheet is an answer key. A «si no hay vídeo» summary printed under the note-taking questions answered all five of them. Contingency material for the instructor lives in the plan de clase, never on the page the student is filling in.
- A worked example is spent. A sentence used in the reference table cannot reappear as a practice item, even reworded. Before delivering a grammar page, lay the table examples and the practice items side by side and check that no pair shares a verb, a subject and a structure.
- A rule the students are about to derive is not printed. It goes in blank slots they fill in afterwards.
- Spread correct options across positions rather than letting them cluster on a or b.

## 6 · Grammar they have not been taught

Read every prompt, option and model for a structure the course has not reached. The subjunctive turned up in a Día 4 inference question («el museo quiere que el tejido no se pierda») in a semester that had not taught it. Rewrite in what they have («el museo trabaja para conservar el tejido») rather than glossing it. This check covers prompts, models and distractors, not just the target items.

## Two habits that prevent the rest

Start from Contraseña’s own activities, not from a blank page. Caleb’s note after a Día 3 that did not land: lean more heavily on Contraseña’s Conversar plans as the starting point instead of inventing activities from scratch. The book’s activity has a shape students already know from LingroHub, it carries the unit’s vocabulary, and it takes less class time to set up. Adapt it, cut it down, change the register, swap the content to the day’s art, but start from it. Invent only when nothing in the unit fits.

What did not get done is data about the plan. When a day’s last two segments went unused in every section, the day was overbooked, not the class slow. Before building the next day, read the cuaderno of the one just taught, find out what actually got done, and cut the page that did not rather than carrying it forward. Put the minutes into the block that was under-scaffolded.

## Glossing, unchanged

Directions stay in Spanish. Gloss English only for a few genuinely blocking task words, inline in parentheses; for the academic-honesty box, which may be fully bilingual on purpose; and for proper names of English-language resources. Never gloss the unit’s target vocabulary. Prefer Spanish scaffolds over English ones.

## Open question, not yet settled

The register of written consignas. Three are in use right now and Caleb has asked about it twice. The decks use the infinitive («Leer el recuadro…»), the cuaderno uses tú («Enmarca…», «Subraya…») and the guion uses vosotros. The guion is settled and stays vosotros. The other two are not. Ask before building a new packet, and write the answer in here when it comes.

## Before delivering, check

- The audit ran, and every open entry is resolved or asked about.
- No footer that only paraphrases its slide, and no heading that could sit on any slide.
- No sentence explaining why the activity is designed the way it is.
- Every modelo left on the page teaches a format the consigna cannot.
- Every answer space fits what was asked for, with room to spare.
- Any new structure runs fíjate → entiende → practica → úsalo.
- No fallback box, no reused example, no untaught structure.
- The page rendered and looked at, not just generated.
- `--base` run so the next audit starts from what you delivered.