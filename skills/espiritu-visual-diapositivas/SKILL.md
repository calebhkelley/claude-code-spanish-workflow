---
name: "espiritu-visual-diapositivas"
description: "Read with clase-materiales before building or revising any SPAN 201 or SPAN 212 class deck. Carries the approved visual spirit of the 28 Sept 2026 SPAN 212 deck."
---

# Espíritu visual · the approved deck, carried across courses

On 29 September 2026 Caleb said he likes how the visuals were put together in the SPAN 212 deck for 28 September («La noche boca arriba», v2) and asked for that spirit in SPAN 201. This skill is the bridge. It sits beside `clase-materiales` and `texto-para-estudiantes`. Where it conflicts with `clase-materiales` on colour, this skill wins, because it records the later decision.

## Step zero · look at the reference

On Caleb’s machine, open the contact sheet before designing anything.

- SPAN 201 folder: `03 Registro/REFERENCIA_VISUAL_SPAN212_28sept.png` and the note `REFERENCIA_VISUAL_SPAN212_28sept.md` beside it.
- SPAN 212 folder: the deck itself, `Clases/09-28 La noche boca arriba/SPAN212_Fall2026_28_septiembre_La_noche_boca_arriba.pptx`, and its per-day builder `_fuente/deck2.py`.

Stage the PNG and look at it. The words below are a summary and do not replace seeing it.

## What transfers and what does not

The spirit transfers. The look does not. In SPAN 201 the GALERÍA system stays in force: the artwork leads with museum wall labels, the accent is sampled from the day’s art, and there is no bulleted slide type. Caleb rejected a SPAN 212 reskin of SPAN 201 on 15 September. Do not bring over 212’s palette, its caps title face or its bullets.

## Colour · allowed, never alone (29 September 2026, both courses)

Colour can be used on slide decks, including to tell grammatical concepts apart. This supersedes the 17 September line in `clase-materiales` that retired colour as a semantic channel in SPAN 201, for slides. Colour can never be the only way to differentiate, because Caleb has a colour-blind student. Every colour distinction also carries a second channel that survives without it: the gesture (subrayado, rodeado, enmarcado), weight, a shape, a position, or a text label. The 212 deck is the model: directo in carmesí and underlined, indirecto in acero and bold, se in ámbar with its own label.

Before delivering, convert the render to greyscale and confirm every distinction still reads. A pair of cards, chips or words that differ only in hue fails.

## The principles

1. Every content segment gets an image with a job. State in one sentence what the picture helps a student infer, recall or picture. A twenty-slide deck with fewer than eight content images is a draft. Repeating the same image on several slides does not count.
2. The picture sits next to what it explains. Statements on one side, the scene they describe on the other, with a caption.
3. Instructions and content share one slide. Two images, each over its own question set, on one canvas. Split only when showing the second half early would spoil the first, and write that reason in the notes.
4. One wide image, then labelled fact cells (qué es, desde cuándo, para qué, qué tiene que ver con el texto) in place of a context paragraph. In GALERÍA the image is the obra with its wall label.
5. Structure is drawn. Timelines, two-track stories, cause chains, with the unknowns left as unlabelled shapes when finding them is the task.
6. Grammar is diagrammed, in colour plus a second channel. The sentence cut into boxes with a small role label under each. Answer chips students classify into. Pill-shaped chains for a transformation, with the impossible form struck through. Each box, chip and pill can take its concept’s colour and always carries its gesture or label too.
7. La herramienta as facing cards. The self-check question in a tinted accent box, then two facing cards, then two or three minimal pairs per column.
8. El plan as numbered columns with a small italic gloss under each and one tinted callout for the day’s logistics.
9. A multi-panel image is several images. Cut comic strips and Contraseña illustrations into scenes and use them as a visual chain.
10. No cierto o falso. Use el dato intruso (four statements, three true, one not, papers up together, a point for the right one and another for the porqué) and make the intruso item the idea of the day.
11. Name the grammar band after the structure. Caleb retitled 212’s band to «LA FORMA EN FOCO: Pronombres de objeto directo e indirecto» after delivery.
12. Layouts serve the content. When a day’s content does not fit the generator’s fixed types, write a per-day python-pptx builder, as `deck2.py` did, keeping the course’s house elements (in SPAN 201, wall labels, PASO cards, activity pills).

## Before delivering

Render every slide and count the content images. Check each one against principle 1 out loud in the reply: which slide, which image, what job. Run the greyscale check. Then check that no image, colour, weight or position gives away an answer.