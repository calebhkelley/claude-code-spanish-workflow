# The plan de clase

A Word `.docx` in Spanish, addressed to Caleb as the reader, not to students. The working assumption is that he may be reading it at five minutes before the hour with the room filling up, so nothing in it should require reconstruction on the spot. Anything he would have to remember gets written down. Anything he would say gets written verbatim.

This structure holds for every class day in every course. It survived a full visual redesign untouched, which is the evidence that it belongs here and not in a course folder.

## Sections, in this fixed order

1. Header block. Course and document type, the date written out in Spanish, then section, meeting time, room and instructor on one line. All five come from the course profile.

2. Objetivos del día. Three to five bullets. What the class should accomplish, not what will happen in it. “Los estudiantes distinguen ser y estar en descripciones físicas” rather than “hacemos ejercicios de ser y estar”.

3. Resumen del horario. A three-column table of Hora, Segmento, Min. The minutes sum to the exact class length from the course profile and the clock times are contiguous with no gaps. Check the arithmetic every time. This table is the spine of the whole document, so settle it before writing any prose.

4. Materiales y preparación. Handouts and copy counts, what has to be open on the projector before students walk in, anything written on the board, anything students were told to bring. Also anything he needs to check beforehand, such as what the online platform actually has assigned that week.

5. One section per segment, in clock order. Shape below.

6. Tarea for the next meeting. Restated as a numbered list even though it already appears inside the closing segment’s script. The redundancy is deliberate, since this is the block he glances at while packing up.

7. Si el tiempo se descuadra. Three contingencies, written as “si vas con retraso”, “si sobra tiempo” and “prioridad si hay que recortar”. Name the specific segment that gets cut and the one that has to survive. Vague contingencies are useless under time pressure.

## The talking budget

The schedule table proves the minutes add up. It proves nothing about who is using them, and that is the one failure mode this document cannot see on its own. So count, every time, before writing any guion.

What counts. Minutes in which students are producing language. Pair work, small groups, students reading to each other, a student defending a position in front of the class. One student answering a question while the rest listen does not count. Neither does a board-collection phase, unless the pair work feeding it is real.

The number. Compare that total to the class length. Below a third, the plan needs rebalancing before anything else happens. A third is a floor and not a target.

How to fix it. Almost never by adding content, which only makes the day longer. Convert a segment that already exists, with one of these.

- Give a passive activity an interpretive task. Reading aloud becomes reading aloud and then deciding, in pairs, what the tone is and which line proves it. The minutes do not change. What they carry does.
- Turn a question sequence into a position they have to take. Rather than asking four questions and calling on people, ask one question with two defensible answers, make pairs commit, count the room out loud, and let them argue with the text in hand. Rule out “depende”, because the commitment is the point.
- Give back what they already did at home. If the platform assigned a classification or a comprehension set, do not re-teach it. Project their own answers and ask what those answers imply.
- Put a personal question at the end rather than the beginning. It closes the circle back to the text, and by then the group is warm enough to answer it. Say out loud that talking about someone they know is an acceptable substitute for talking about themselves.

What not to convert without asking. A dense grammar or policy segment, and anything he has said he wants to deliver himself. Propose, then let him choose.

## Where the discussion questions come from

The textbook’s own question sets are the best raw material available and they are usually sitting unused, because the platform assigns some activities in a strand and leaves others open. Find out which ones are unassigned and mine those.

Pick and choose rather than importing a set whole. Four sharp questions across four groups beat twelve that nobody finishes.

Paraphrase into his voice rather than transcribing. The textbook addresses one reader in the singular. He is speaking to a room. Keep the substance, name the activity and the page on the slide so students can find the original, and let the wording be his.

## Segment section shape

Each segment carries a heading with its time range and duration, then some combination of these blocks. Only Qué hacer and Guion del profesor are mandatory.

| Block | What goes in it |
|---|---|
| Qué hacer | Instructor actions as bullets. Physical and procedural, not spoken. |
| Guion del profesor | The verbatim Spanish. Rules in `guiones.md`. |
| Puntos que no puedes saltarte | For dense policy or grammar segments. The non-negotiable content, compressed. |
| Preguntas para proyectar | Exact wording of anything students read off the screen. |
| Nota | Something for Caleb alone. A thing to watch for, a name to note, a follow-up. |
| Aviso de contenido | Present whenever the day’s text touches a sensitive theme. |
| Variante de reserva | An alternate activity if the group size or the energy is wrong. |

## The plan and the deck are not the same document

A plan segment is a block of time. A slide is a single idea. Seven segments becoming fourteen slides is correct and expected, and one policy segment can legitimately become five slides. The plan governs time, the deck governs sequence, and the speaker notes are where the two are reconciled. When a plan segment spans several slides, split the segment’s minutes across them and say so on the first slide of the run.

## Authoring

Written as one HTML file with inline CSS and converted with `soffice`. Details and the table gotchas are in `tooling.md`. A starting HTML skeleton is at `scripts/templates/plan.html`.

## From Spring 2027 on, two documents per class

Caleb reported that the single plan was unreadable in class. It ran thirteen to fifteen pages, and the guion sat at the same size as everything else, so he lost his place. From Spring 2027 every class gets two documents, and each piece of information lives in exactly one of them.

Guion en vivo (`SPAN212_<Term>_Guion_en_vivo_<día>_<mes>_<Tema>`). This is the one he opens in class, and it works like a teleprompter.
- Page one holds the map, one line per slide with number, clock window, title and minutes, plus the cut priority. Hard clock marks are shown in red.
- Each slide opens with a dark full-width band showing the start time large, the slide number and title, then minutes, end time and format. Hard marks get a red band.
- Any “si a las H:MM…” contingency sits directly under the band of the segment that contains that time, in amber.
- The guion is set at 15 pt with a blue bar on the left, one line per paragraph. Stage directions in brackets are small grey italics.
- Respuestas modelo, clave and similar keys go in a small tinted box after the guion. The transition comes last, in large blue type with an arrow.
- Nothing else goes in it.

Plan de preparación (`SPAN212_Spring2027_Plan_…`). This one is read the night before. It holds the header, things to do before class, materials, objectives, the schedule, hard marks, the talking budget, the puesta en común rules, the content warning and every contingency. It then goes segment by segment with Antes de que entren, Qué hacer and Para ti, and ends with Tarea and Notas. It carries no guion and no answers.

The builder is `Curso/Spring 2027/Estilo 2027/_fuente/convertir.py`, on top of `guion2027.py`. Every Fall 2026 class was converted with it. It reads the deck’s notes and sorts each label automatically. The live labels are GUION, TRANSICIÓN, RESPUESTAS MODELO, CLAVE, CADENA MODELO, QUÉ ESCUCHAR, PUNTOS QUE NO PUEDES SALTARTE, MARCA DE RELOJ, CONTROL DE TIEMPO and EN INGLÉS SI HACE FALTA. Every other label goes to the preparation plan. Hidden reserve slides (notes header starting OCULTA) go at the end of the live document under Reserva.
