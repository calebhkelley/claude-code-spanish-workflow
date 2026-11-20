# SPAN 212 · visual system

The look of this course, in prose. The machine-readable twin is `design.json`, and the generator reads only that. When this file and `design.json` disagree, fix both.

This is the volatile layer. When Caleb supplies new visual references, this file and `design.json` get replaced and nothing else in the skill changes.

## Where it came from

His own Fall 2024 SPAN 212 decks, theme “ChronicleVTI”. He said the earlier styling was fine but flat, that he does not want one palette reused class after class, and that his previous materials already carry choices worth keeping. So the going-forward system is his own, decoded.

## The DNA

- All-caps titles, light weight, wide tracking, with a hairline rule underneath and a small kicker line above.
- Full-bleed image slabs that run to the slide edge, usually a tall panel on one side with the text on the other.
- Dark slides as section breaks, white text over a photograph.
- Small italic grey captions carrying real attributions, for example “Argentina, 1976”.
- Textbook page references in parentheses on the slide itself.
- Sparing accent on one or two words per slide. Lots of white space.
- Screenshots of the textbook and vText used directly as slide content.
- Never a bullets-on-white deck.

## Type

Univers Condensed for titles, all caps, tracking 2. Aptos for body. Calisto MT for quotes, verse and display phrases, italic when it is a pull quote. All three were verified embedded in his own 2024 PDF export, so they exist on his Mac. LibreOffice substitutes all three with wider faces when rendering, so judge layout from a render and typography from PowerPoint.

## Color

Neutrals never change. Ink, paper, grey and hairline are the same in every lección.

One accent per lección, so every class looks distinct and the semester still reads as one course. Carmesí, acero, índigo, siena, berenjena and oliva, in lección order. In the deck JSON this is one field, `accent`, holding the lección key. Changing it re-skins the whole deck. The accent is chosen by lección and stays the same for every class meeting within that lección. SPAN 212 does not rotate the accent by meeting.

## Slide types available

`portada`, `texto`, `panel`, `oscura`, `cita`, `dos-columnas`, `banda`, `datos`, `imagen`. Fields for each are in `references/deck-spec.md`.

The combinations that have worked. A dark portada with the subject photograph bled full and the title on the clean side. Two-column contrast cards for a grammar point. A three-up image band with a label and a gloss under each. A dark interlude announcing the reading or the activity. A black data box replicating the textbook’s own publication panel.

## Images

From his own archive, never downloaded, which keeps the rights posture identical to his existing materials. Extract `ppt/media/` from his 2024 decks and from a colleague’s Fall 2025 decks. What Lección 1 yielded the first time it was built. Magnolia on black, a white dress, a white heart in hands, a sepia Storni reading, a 1900 fashion plate, nácar shells, azucenas, and the Juan Berlengieri *Retrato* of 1935 cropped out of his screenshot of the textbook spread.

Prep with PIL, center-cropped to the panel aspect. Several of the colleague’s images are only 150 to 350 px, so use those as small tiles and never as a full-bleed panel.

## The frozen exception

The first-day administrative deck stays in the older card and Georgia system by his decision. It is not debt.
