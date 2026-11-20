# The verification pass

Required every time, in full, before anything is delivered. On the session this method came from, most of the value came from checking rather than from writing. Three real defects surfaced, including a wrong handout question number that would have sent him checking the wrong field for every student in the room.

Run it as a list and report the result. “Verificado” with nothing behind it is not a verification.

## Arithmetic

- [ ] Schedule minutes sum to the class length in the course profile.
- [ ] Clock times in the schedule table are contiguous with no gaps and no overlaps.
- [ ] Every slide’s time window falls inside its plan segment.
- [ ] The slide windows sum to their segment totals.
- [ ] Any percentages that appear anywhere sum to one hundred.

`scripts/build_deck.js` covers the slide-window checks at build time. The plan-side arithmetic is on you.

## Engagement

- [ ] The minutes of genuine student production were counted and the number was written down.
- [ ] That number is at least a third of the class length, or there is a stated reason it is not.
- [ ] At least one segment asks students to commit to a position and defend it, not only to answer.
- [ ] No segment runs much past ten minutes with the instructor as the only voice.

A plan that passes the arithmetic and fails this section is exactly the defect the arithmetic cannot see. It surfaced once by him noticing it in a finished plan, which is late.

## Sources

- [ ] Every factual claim on a slide or in the plan traces to a named source. The syllabus, the Calendario, the textbook page map, the platform instructions sheet, or the text itself.
- [ ] Anything about what is assigned this week was checked against the platform, not against the calendar.
- [ ] Handout question numbers referenced in the plan match the handout. Open the handout and read it. Do not trust a memory of it.
- [ ] Dates, page numbers and publication facts about a text were read off the source, not recalled.

## Plan against deck

- [ ] Every slide has a guion covering everything the slide states. A slide carrying a claim with no script behind it is a defect, because there is nothing to say when it comes up.
- [ ] Plan and deck agree on the order of beats.
- [ ] Anything the plan says will be mentioned at a particular moment is scripted at that moment in the deck, and not somewhere else.
- [ ] No note falls under the length floor without a reason.

## Render

- [ ] Build the deck, then run `scripts/render_check.sh` and look at every slide.

This one is not optional and it is not satisfiable by reading geometry. Text boxes run full width with left-aligned text, so a photo can sit on top of the words while every bounding box looks correct. Both photo collisions ever found in these decks were visible only in a render.

Remember that LibreOffice substitutes fonts and the substitutes are wider, so text that wraps in the render often does not wrap in PowerPoint. Judge layout from the render, never typography, and design with slack either way.

## Before writing over anything of his

- [ ] Compare the file on disk against the working copy. He saves from PowerPoint and Word between and during sessions, including adding his own photos.
- [ ] Edit surgically rather than rebuilding.

## If this is a revision rather than a build

- [ ] Both files were read off disk in full before anything changed.
- [ ] Segment lengths, the schedule table and the per-slide window map are unchanged, unless he asked otherwise.
- [ ] Every slide that was not meant to change is identical in on-slide text and in notes. Diff it rather than assuming it.
- [ ] Every slide whose activity changed had its notes rewritten in full, not patched.
- [ ] Every touched slide was rendered and looked at.
- [ ] After any segment was renamed, the heading, the schedule table and the agenda slide agree with each other.
- [ ] Newly inserted paragraphs match their neighbors in bullet state, not only in style name.

## Report

Say what was checked, what was found, and what was changed. Name the sources that the facts were traced to. If something could not be verified, say that instead of implying it was.
