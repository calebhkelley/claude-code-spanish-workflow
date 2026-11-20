# Tooling

## Where the work happens

His machine has `python-pptx` 1.0.2, `soffice`, `pdftoppm` and PIL, so the whole build and check loop can run locally with nothing staged. `pptxgenjs` is a Node package and may not be there. If `npm install pptxgenjs` fails on his machine because of network limits, build the deck in the container and write the finished file into the course folder instead. Never install packages into his course folders.

## The deck

`node scripts/build_deck.js --design courses/<course>/design.json --deck <deck>.json --out <file>.pptx`

The generator reads every color, font and measurement from the design file and holds none of its own. It runs a preflight before writing anything, so a deck with thin notes, a malformed note header, or non-contiguous time windows fails loudly rather than shipping. `--allow-thin` downgrades the note-length failure to a warning, for a genuine one-line slide.

Spec format for the deck JSON is in `deck-spec.md`.

## The plan

Authored as one HTML file with inline CSS, then converted.

`bash scripts/plan_to_docx.sh <plan>.html <plan>.docx`

Absolute paths are required or `soffice` fails. Tables need `table-layout: fixed`, an explicit `width` attribute and `<col width>` tags, because percentage widths get dropped in the conversion. `scripts/templates/plan.html` already has all of that set up.

## Rendering and looking

`bash scripts/render_check.sh <file>.pptx` converts to PDF, rasterizes every page and writes a contact sheet. Open the pages. Looking at them is the point.

## File surgery on his documents

He edits these files himself between and during sessions, so rebuilding one from scratch destroys work.

- For `.docx`, `python-docx` against the file in place. Match a paragraph by a unique text fragment, then set `runs[0].text` and delete the remaining runs, which keeps the run formatting intact. Unzipping and string-replacing `word/document.xml` still works for a one-off substitution but is the harder tool for anything structural.
- Matching by text fragment fails in two ways. A fragment that hits two paragraphs is ambiguous, so widen it until it is unique. Worse, a replacement can manufacture a duplicate of an anchor you have not reached yet, so either order the edits so no anchor is ever ambiguous at the moment it is used, or word the replacement so it does not contain the next one. Assert on the match count rather than taking the first hit.
- A paragraph created by deep-copying another inherits the whole `w:pPr`, which carries list membership and not only the style name. Two paragraphs can share a style name and differ in whether they are bulleted. Clone from a neighbor inside the same block, or copy the `w:pPr` across afterward, and confirm it in a render.
- For `.pptx`, `python-pptx` for structural edits, and replace a media part rather than adding a second image when swapping a photo.
- `python-pptx` deflates entries that `pptxgenjs` wrote stored, so a deck’s file size drops sharply on the first save. That is compression, not data loss. Confirm by comparing slide text and color values before and after.
- Compare against the file on disk immediately before writing over it.

## Layout slack

Adding text to a finished slide is where decks break, and the shape coordinates never show it.

- A display line sized for one line will wrap to two under LibreOffice’s wider substitute fonts and land on top of whatever sits below it. Keep such a line short enough that it cannot wrap in either font, or leave a full line of clearance beneath it.
- Adding a row to a grid of rows means re-pitching every row. Derive the new top positions and row height from the space between the last fixed element above and the first below, rather than appending at the old pitch and hoping.
- A gloss or caption box has a hard ceiling in lines before it touches the next card. Count characters against the box width at the given point size and stay a line under it.
- All of this was found in renders and none of it was visible in the geometry.

## Images

Source from his own archive rather than downloading anything, which keeps the rights posture identical to his existing materials. Extract `ppt/media/` from his prior decks and from colleagues’ decks he already has. Prep with PIL, center-cropped to the panel aspect. Watch resolution, since archive images are often 150 to 350 px and work as small tiles but never as full-bleed panels.

### The headshot recipe

Reusable whenever a photo of a person goes on a slide.

1. Find the framing before touching the deck. Render several candidate square crops as circle-masked thumbnails in one contact sheet and compare them side by side. Guessing the face position from a full-size view does not work and cost two wasted passes the first time.
2. Upscale the crop so it stays crisp on a projector, then brightness 1.12, contrast 1.10, saturation 1.05. Phone photos render flat and dim through a classroom projector.
3. Replace the media part rather than adding a second image, and zero out any `srcRect` crop once the source is already square.
4. Place it, set `prstGeom` to `ellipse`, and give it a thin ring in the hairline color so it belongs to the same system.

## PDFs

Exported from Word and PowerPoint by Caleb, never rendered here. Ask him to re-export after an edit.
