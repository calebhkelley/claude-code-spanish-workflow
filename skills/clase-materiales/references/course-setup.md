# Setting up a course that has no folder yet

Run this before building anything. Copy `courses/span201/` as the starting shape, since it is already a blank, and fill it.

## What has to be known before a single slide is written

Ask for what is not on a document, and read the rest off the documents rather than asking.

From the syllabus. Section, days, meeting time, class length in minutes, room, office hours, enrollment, textbook with edition and year, the online platform and its section name, every grade component with its percentage, the absence and make-up policy, the late-work rule, whether there is extra credit, and the key dates.

From the calendar. What each meeting covers, and whether the calendar is his or a coordinator’s. A coordinated course means some language has to be reproduced exactly rather than rewritten.

From him, since no document says it. The level and the register to write the guion at. Whether the course uses the English support layer. Where his prior materials for this course live, and whose materials he is allowed to mine. Any standing exception, meaning a document that stays in an older style on purpose.

## The class length is the one number everything depends on

Every schedule table sums to it, every slide window falls inside it, and the generator fails the build when they disagree. Get it right before anything else.

## The visual system

Two files, `visual-system.md` in prose and `design.json` for the generator, and they say the same thing.

The fastest path to a real one is to ask him for one or two decks or handouts he likes the look of, from any course and any source, then decode them the way his own 2024 decks were decoded. Reading his existing files beats inventing a palette, because the design choices he already made are the ones he wants kept.

Until he supplies references, a provisional system is fine as long as it is labeled provisional in both files, and as long as it does not simply copy another course. He has said he does not want one palette reused class after class, and that applies across courses as much as across lecciones.

## Then check

- The percentages in the profile sum to one hundred.
- The class length in the profile matches the syllabus.
- The register line is specific enough to write to. “Intermediate” is not a register. “Present tense and the tenses already taught, one instruction per sentence” is.
- The accent keys in `visual-system.md` match the keys in `design.json`.
- A throwaway two-slide deck builds and renders with the new design file.
