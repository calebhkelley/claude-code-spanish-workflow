---
name: "clase-materiales"
description: "Build Caleb Kelley's Spanish class materials, a plan de clase in Word plus a matching PowerPoint deck with full verbatim speaker notes in Spanish, and verify the two against each other. Use for any request that names a class day, a lección, a reading, or a text and asks for a lesson plan, a slideshow, a deck, speaker notes, a guion, a handout, or a rework of any of those, in SPAN 212, SPAN 201, or any other course he teaches. Use it even when he does not name it and even when he asks only for slides or only for a plan."
---

# Clase · materiales

The method for building a plan de clase and its deck. Course-neutral. Everything specific to one course lives in `courses/<course>/`, so the same method runs SPAN 212 and SPAN 201 without rework.

Consult the `caleb-profile` skill for his identity and writing preferences rather than restating them here.

## Before anything else

Identify the course and load its two files.

- `courses/<course>/profile.md` holds the facts. Section, room, meeting time, class length, textbook, grade components, policies, platform details, where the archive lives.
- `courses/<course>/visual-system.md` holds the look, and `courses/<course>/design.json` holds the machine-readable version of it that the generator reads.

If the course has no folder yet, run the intake in `references/course-setup.md` before building anything. Do not guess a course fact and do not carry a fact across courses. SPAN 212’s grade components, palette and textbook page maps mean nothing in SPAN 201.

## Every class day is hands off

From November 2026 on, every class day in SPAN 201, SPAN 212 and any other course he teaches is built hands off. He launches each task quickly, then the students run it on their own while he stays mostly in one place and listens. He asked to circulate less, so the materials carry everything he would otherwise walk around the room to say. This applies to new builds and to revisions of days already built.

- His voice is the launch and the close. Each task gets a launch of about a minute, written verbatim in the notes, and the class gets a short close. The minutes between belong to the students. In the talking budget, count his minutes as well as theirs and report both numbers to him.
- The instructions stand on their own. The steps, the model, the time and the end product sit on the slide and again in the cuaderno or handout, so a pair that missed the launch can start without asking him. A task with more than two steps shows them as numbered steps on screen.
- Every task ends in a product. A sentence in the cuaderno, a list, a decision, a short text, a filled-in table. The product is how a pair knows it is done and how he can see from where he sits that the work happened.
- Roles keep both partners talking. Each partner gets a job (reads, writes, asks, checks), and the roles swap halfway, so one student cannot carry the pair.
- Students check themselves. Each task closes with a pair-with-pair check or a key the room compares against, so nobody needs him to confirm an answer. Keys still never sit on a task slide while the task is running. When a task needs a self-check, the key goes on its own reveal slide right after the task, or in the cuaderno where pairs look only at the end.
- Sharing goes pair to pair or from one half of the room to the other. No puesta en común runs toward him, and none depends on volunteers.
- Grammar arrives as a one-page summary with models that pairs read together and then use right away. If he has said he wants to deliver a segment himself, propose the hands-off version and let him choose.
- Plan where he is. Qué hacer says where he sits or stands for each task and names at most one planned checkpoint per task, the moment he steps in. Everything else he does from that spot.
- Scoring follows the syllabus. Do not invent a daily grade. Read the grade components in `courses/<course>/profile.md` and the syllabus itself, and tie the day’s product to the component that already covers in-class work. If the profile’s grade components are still marked TODO, read them off the syllabus and fill them in before building. In both current courses participation is self-assessed once per unit or lección, so the day’s product is evidence students point to in that self-assessment, and nothing new gets graded.

The notes floor in `references/guiones.md` still holds. On a task slide the notes carry the launch verbatim, QUÉ ESCUCHAR for what he listens for from where he sits, the CLAVE, CONTROL DE TIEMPO, and EN INGLÉS SI HACE FALTA for the steps.

Before delivering, check every task slide against this list. A slide that needs him to explain it out loud a second time fails.

## Build order

1. Read the day. Pull the Calendario entry for the date, the syllabus sections it touches, and whatever the platform actually has assigned that week. Check the assignment rather than trusting the calendar.
2. Mine the archive. His own prior decks for the same text, the coordinator’s or colleagues’ materials, the textbook page map. Reuse his images from his own files rather than downloading anything. `courses/<course>/profile.md` says where those live.
3. Write the plan. Structure in `references/plan-de-clase.md`, built to the hands-off rules above. The schedule table is the spine, so settle the minutes first. Once the segments exist, count the talking before writing a word of guion, using the talking budget in that same file, and count his own minutes alongside the students’.
4. Write the deck spec. One JSON file of slides, each with its verbatim notes. Slide types and fields in `references/deck-spec.md`. The deck carries more beats than the plan has segments, which is expected.
5. Build both. `scripts/build_deck.js` for the pptx, `scripts/plan_to_docx.sh` for the docx. Tooling notes in `references/tooling.md`.
6. Verify. `references/verificacion.md`, all of it, every time, plus the hands-off check above. This step is where the value comes from.
7. Deliver. Write into the course folder on his machine, tell him the folder and file name, and ask him to export the PDFs from Word and PowerPoint himself.

## Revising a plan and deck that already exist

Most requests after the first build are revisions, and a revision is not a smaller build. It is surgery on two files he may already have edited himself.

1. Read both files off disk in full first, along with whatever notes exist on that class day. Never revise from a memory of what was built.
2. Measure the thing he is complaining about. “This feels like I am lecturing for a large portion of the class” is a measurement, not a mood. Count it, and tell him the number before proposing a fix. When converting a day to hands off, count the minutes in which he is the one talking and the minutes in which he would need to circulate.
3. Ask which segments may move. Which segment gets converted, where new material goes, and how it should be worded are his calls, and the answers constrain everything downstream. Ask before editing, not after, and offer him named options rather than an open question.
4. Hold the clock fixed unless he says otherwise. Segment lengths, the schedule table and the per-slide window map stay as they are. What changes is what happens inside the minutes.
5. Edit in place, with `python-docx` and `python-pptx` against the files where they live. Back up first. The traps are in `references/tooling.md`.
6. Rewrite the notes of every changed slide in full. A slide whose activity changed and whose notes still describe the old one is worse than either version alone.
7. Prove the blast radius. Render every slide you touched and look at it, and diff every slide you did not, on-slide text and notes both.

## Non-negotiables

Verbatim beats summary, and longer beats shorter. A speaker note that says “explain the participation policy” is a failure. One that carries the four paragraphs he would actually say is correct. If a slide states something, a sentence in the notes says it aloud. The floor is roughly 700 characters of notes per slide, and the floor is not the target. Full rules in `references/guiones.md`.

Budget the talking before you write it. A plan can pass every arithmetic check in `verificacion.md` and still be seventy-five minutes of one voice. Add up the minutes in which students are actually producing language and compare that number to the class length. Under a third, the plan is lecture-shaped and gets rebalanced before it goes any further. The fix is almost never new content, it is converting a segment that already exists. Counting method and conversion levers are in `references/plan-de-clase.md`. On a hands-off day, his own minutes are the second number to watch, about one per task plus the close.

Vosotros in anything he says aloud, because that is how he speaks in class. Students are never pushed toward it and no student-facing material implies they should use it. No exceptions.

Numbers written the way they are spoken inside a guion. “un diez por ciento”, not “10%”. “las cuatro de la tarde”, not “4:00 p.m.”.

Register is set by the course profile, not by habit. A second-year literature course and a first-year language course get different sentence length and different vocabulary, and lower-level courses get the English support layer described in `references/guiones.md`.

Drill answers and keys live in the notes and never sit on a slide while students are working. The one exception is the self-check reveal slide described under hands-off days, shown only after the task ends.

Accent color is per course. It lives in each course’s `visual-system.md` and `design.json`. SPAN 212 chooses the accent by lección and holds it for every meeting in that lección. SPAN 201 rotates the accent by class meeting through its own set. There is no global per-meeting rule.

Render every slide and look at it. Text boxes run full width with left-aligned text, so an image sitting on top of the words is invisible from the geometry. Every photo problem ever found in these decks was found in a render.

Edit his files surgically. He opens these in Word and PowerPoint and edits them between and during sessions. Compare the file on disk against the working copy immediately before writing over it, and never rebuild one of his files from scratch.

House style applies to every document. No em dashes outside creative writing or something read aloud. No colons bridging ideas. Curly apostrophes and quotation marks in all human-readable text. No “it is not X, it is Y” contrast framing. Bold sparingly. Sentence-case headings in English documents.

## Reference files

| File | What it holds | How often it changes |
|---|---|---|
| `references/plan-de-clase.md` | Document shape, segment blocks, level of detail | Rarely |
| `references/guiones.md` | Spanish conventions, note anatomy, labels, time budgets, English support | Rarely |
| `references/deck-spec.md` | The JSON the generator eats, slide type by slide type | Rarely |
| `references/verificacion.md` | The required final pass | Rarely |
| `references/tooling.md` | Build pipeline, file surgery, LibreOffice quirks | Rarely |
| `references/course-setup.md` | Intake for a course that has no folder yet | Rarely |
| `courses/<course>/profile.md` | Everything true of one course this term | Every term |
| `courses/<course>/visual-system.md` | That course’s look, in prose | Whenever he supplies new references |
| `courses/<course>/design.json` | The same look, machine-readable | Same |

No hex value, font name or measurement belongs in `SKILL.md`, in a reference file, or in the generator’s logic. They live in `design.json` and are read from it, so a redesign is one file edit.