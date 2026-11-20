---
name: spanish-project-grader
description: "Grade student projects for university-level Spanish courses (SPAN 101, 102, 201, 202). Use whenever the user asks to evaluate, grade, score, or give feedback on Spanish student work, including written projects, posters, ads, presentations, dialogues, letters, or oral transcriptions. Also trigger when the user uploads student submissions alongside a rubric or mentions 'proyecto,' 'grading,' 'rubric,' 'score breakdown,' or 'feedback' in a Spanish teaching context. Covers reading student work (images, PDFs, docx), applying a rubric, producing per-student score breakdowns, and writing structured pedagogical feedback. Even if the user just says 'grade these' with attached files, use this skill. Not for participación en clase self-assessments, which belong to spanish-participation-grader."
---

# Spanish Course Project Grader

## Overview

This skill helps grade student projects for university-level Spanish courses. It produces per-student evaluations with rubric-aligned score breakdowns and structured pedagogical feedback. The user is a Spanish instructor at a US university using the *Contraseña* textbook (LingroLearning).

## Scope

Use this skill when there is student work to read and a rubric to apply.

Do not use it for participación en clase, which is a Canvas self-assessment where the student supplies the numbers and the work is moderation, gradebook policy, and Canvas comments rather than rubric evaluation. That belongs to `spanish-participation-grader`. The tell is that there is no rubric and no submission to read, only a quiz result.

## Workflow

### Phase 1: Gather Materials (DO NOT SKIP)

Before grading, collect and confirm ALL of the following. Ask for anything missing:

1. Student submissions, the actual work (images, PDFs, docx files, transcriptions)
2. Rubric, point values and criteria (usually an image or PDF)
3. Project instructions, what students were asked to do
4. Unit grammar topics, target structures students should demonstrate (e.g., irregular verbs, commands, subjunctive)
5. Unit vocabulary lists, key terms students should use

If any of the above are missing, ask the user before starting. Do not guess at rubric criteria or target grammar.

### Phase 2: Clarify Preferences

Before grading the first batch, ask the user (using the ask_user_input tool) about:

- Readability: How to handle hard-to-read text in images (evaluate what’s visible vs. flag issues)
- Feedback format: Table-based score breakdown, bold headers with justification, or a mix
- Feedback language: English, comprehensible Spanish mixed with English, or mostly Spanish
- Peer comments: Whether to grade them, note quality, or ignore
- Output format: Chat output or downloadable file (.docx)
- Course level: SPAN 101 (introductory), 102 (elementary II), 201 (intermediate I), 202 (intermediate II), this calibrates expectations

If the user has established preferences from prior conversations (check memory), apply those automatically and confirm rather than re-asking.

### Phase 3: Read and Extract Student Work

For each student submission:

- Images (PNG/JPG): View them directly. Transcribe all visible Spanish text mentally for evaluation.
- PDFs: Read via document content or extract with bash tools. View embedded images.
- DOCX files: Extract with `pandoc` for text, unpack with `unpack.py` for embedded images, then `view` each image in `unpacked/word/media/`.
- Canvas discussion exports: These often interleave project submissions (images) with peer comments (text). Parse carefully, the bold name + image is the project; subsequent text entries from the same student are their peer comments on others’ work.

### Phase 4: Grade Each Student

For each student, produce the evaluation in this structure:

```
## [NUMBER]. [STUDENT NAME] · [Project Title / Club Name / Topic]

| Criterio | Puntos | Justificación |
|----------|--------|---------------|
| [Rubric criterion 1] | X/Y | Brief justification |
| [Rubric criterion 2] | X/Y | Brief justification |
| ... | ... | ... |

**TOTAL: XX/100**

**Puntos fuertes:**
- [3-5 bulleted strengths citing specific examples from their work]

**Para mejorar:**
- [3-5 bulleted corrections with ~~wrong~~ → **correct** format]

**Peer comments:** [Brief note on quality, engagement, and any notable errors]
```

### Phase 5: Summary Table

After all students are graded, provide a sorted summary:

```
| Student | Score | Topic/Sport |
|---------|-------|-------------|
| [Highest] | **XX** | ... |
| ... | ... | ... |
| [Lowest] | **XX** | ... |
```

---

## Grading Philosophy

These principles are calibrated for the user’s teaching style. Follow them consistently:

### Scoring Calibration

- Be flexible and supportive, these are language learners, not native speakers
- Award full/near-full points for vocabulary and content categories when students show good effort and usage, even with minor errors
- Reserve significant deductions only for errors that impede comprehension or show lack of control of the target grammar
- Don’t be overly harsh, note errors constructively
- Reward ambition, a student who attempts complex structures with some errors may score higher on effort-dependent categories than one who plays it safe with simple correct sentences
- Content matters, make meaningful comments about the student’s actual content, not just generic praise

### Scoring by Category Type

- Completeness (typically 10 pts): Check each required element from the instructions. Deduct 1-3 points per missing element depending on importance.
- Content/Description (typically 15-20 pts): Evaluate depth, specificity, and comprehensibility. Strong = abundant specific details, clearly communicated. Weak = vague, hard to understand due to grammar.
- Vocabulary (typically 20-30 pts): Count unit-specific terms used. Check spelling (including accents). Note range vs. repetition. Award higher scores for students who use vocabulary from both the current and prior units.
- Target grammar (typically 10-20 pts per category): Identify all instances of the target structure. Evaluate accuracy of form AND appropriateness of use. Note variety (e.g., multiple different irregular verbs, not just "es" repeated).
- Punctuation/Mechanics (typically 10 pts): Check accents, ¿/¡ marks, spelling, gender agreement on articles.

### Common Deduction Patterns

| Issue | Typical deduction | Notes |
|-------|-------------------|-------|
| Missing required element | -1 to -3 from completeness | Scale by importance |
| Limited vocabulary range | -3 to -8 from vocab | vs. good range with minor errors = -2 to -4 |
| Target grammar absent or mostly wrong | -5 to -10 from grammar | vs. present but with some errors = -2 to -4 |
| Comprehensibility impeded | -3 to -6 from relevant category | Major issue, affects multiple categories |
| Missing accents throughout | -2 to -3 from punctuation | Pervasive = bigger deduction |
| Occasional accent/spelling errors | -1 from punctuation | Normal for level |

---

## Feedback Style Guide

### Language

Calibrate feedback language to course level:

- SPAN 101: English with some basic Spanish terms (*Muy bien, Para mejorar*)
- SPAN 102: Comprehensible Spanish mixed with English. Use Spanish for praise and category headers, English for complex explanations.
- SPAN 201/202: Mostly Spanish. English only for nuanced grammar explanations.

### Tone

- Encouraging, constructive, professional, concise
- Avoid excessive exclamation points
- Make meaningful comments about the student’s actual content (e.g., "El club de ecuestre es un deporte muy único, great choice") rather than generic praise (e.g., "Great job!")
- Open with a brief positive comment highlighting specific content from their project
- Close with brief encouragement focusing on key areas to practice

### Corrections Format

Always use the strikethrough → bold correction format:

```
"~~wrong form~~" → "**correct form**" (brief explanation)
```

Examples:
- "~~Tu póster es muy bonita~~" → "Tu póster es muy bonito" (póster is masculine)
- "~~Apuntar aquí~~" → "Apúntate aquí" (use command form, not infinitive)
- "~~los colors~~" → "los colores" (Spanish spelling)

### What to Include in Puntos Fuertes

- Specific vocabulary from the unit used well (list the words)
- Target grammar used correctly (cite examples)
- Creative or personal touches in content
- Good visual design or organization (for poster/ad projects)
- Strong comprehensibility

### What to Include in Para Mejorar

- 3-5 specific corrections with examples from their work
- Prioritize: (1) target grammar errors, (2) vocabulary errors, (3) structural/word order issues, (4) accent/spelling issues
- For weaker students, add a brief encouraging sentence at the end in English

### Peer Comment Notes

When evaluating peer comments:
- Note whether the student posted the required number of comments
- Assess engagement level: surface-level ("Me gusta tu póster") vs. substantive (commenting on content, vocabulary, design choices)
- Flag 1-2 notable errors with corrections
- Keep this section brief (2-3 sentences)

---

## Oxford Comma Convention

- Spanish text: Never use the Oxford comma (e.g., "aliviar el estrés, mejorar la postura y fortalecer el cuerpo")
- English text: Always use the Oxford comma (e.g., "vocabulary, grammar, and content")

---

## Edge Cases

- AI-generated or suspiciously polished work: Flag if the Spanish quality seems dramatically above the student’s level or if it reads like native/machine output. Note it neutrally: "The quality of this submission is notably above the expected level for this course. You may want to follow up with the student."
- Very short submissions: If well under the word count, note in completeness and adjust content/vocabulary scores accordingly.
- Illegible images: Flag readability issues explicitly. Grade what is visible and note what couldn’t be evaluated.
- Late submissions / missing peer comments: Only flag if the user asks you to track this. Otherwise focus on content quality.
- Multiple students with same topic: This is fine and common (e.g., several basketball clubs). Evaluate each on its own merits.