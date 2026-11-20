---
name: spanish-participation-grader
description: "Grade participación en clase self-assessments for Spanish courses. Use for Canvas participation quizzes, mapping SpeedGrader exports to students, moderating self-reported scores, and drafting the Canvas comments."
---

# Spanish Participation Grader

## Scope

Participación en clase is graded by a per-unit Canvas New Quizzes self-assessment. The student rates their own behavior, Canvas computes a score, and the instructor moderates it. The work is moderation and policy, not evaluation of a submission.

Not for projects, posters, dialogues, or the actividad de síntesis. Those are rubric-graded student work and belong to `spanish-project-grader`. The tell is whether there is a rubric and a piece of work to read.

## The instrument

Current configuration, SPAN 201. Confirm it still holds before relying on the numbers.

| Item | Measures | Points |
|---|---|---|
| 1 | Use of Spanish in class | 20 |
| 2 | Engagement, discussions, group work, volunteering | 30 |
| 3 | Attentiveness | 30 |
| 4 | Preparation | 10 |
| 5 | Respect toward classmates and instructor | 10 |
| 6 | Device use | 0, carries negative values |
| 7 | Absences | 0, carries negative values |
| 8 | Lateness | 0, carries negative values |
| 9 | Written reflection, English | 0, ungraded |

Items use multiple choice with points varying by answer, which is what lets option two on item 1 score 14 rather than 0, and what lets items 6 through 8 carry negatives. Observed deductions run −5 for device use, −4 for one absence, −8 for two.

## 1. Pull the data from Canvas, never from the PDFs alone

One request returns every student’s name, score, submission time, and policy status.

```
https://<canvas host>/api/v1/courses/<course>/assignments/<assignment>/submissions?include[]=user&per_page=100
```

Open it in a browser already signed in to Canvas. Four fields matter and are not visible in the normal Canvas interface.

| Field | Meaning |
|---|---|
| `entered_score` | The quiz result, which is what a printed PDF shows |
| `score` | What the student actually has after late and missing policies apply |
| `points_deducted` | The gap between them |
| `missing`, `late`, `excused`, `late_policy_status` | Which policy fired, and whether it was overridden |

Reading only the PDF, or only the gradebook column, hides one or the other. Always report both numbers to the instructor.

For the reflections themselves, the New Quizzes student analysis report exports every name, every item response, and the full text of item 9 to one CSV. Prefer it over printing from SpeedGrader.

## 2. Working from SpeedGrader PDF exports

Only if the exports already exist. Do not create them as a first step.

They carry no student name. Not in the text, not in the metadata. Every file is titled with the course. Anything built on the assumption that a name is in there will fail silently.

Parsing. `pdftotext -layout` handles them cleanly. The option the student selected is indented deeper than the others, so indentation identifies the choice. The awarded value appears twice, in the item header and again at the foot of the item. A `Correct Answer` block appears only when the student chose something other than the top option.

Matching files to students. Export order is usually SpeedGrader order, which is alphabetical by surname with non-submitters skipped. Treat that as a strong hypothesis and a weak proof. In one real case eleven of twelve matched and two adjacent files were transposed, so position alone would have mislabeled both. Confirm against a value that varies per student. Score plus attempt duration works, and both are printed on page one of every export. Verify at least one case directly at `speed_grader?assignment_id=<id>&student_id=<id>`.

Rename at the Save As dialog, not afterward. Canvas, SpeedGrader, and Lingro all generate names from page titles.

## 3. Check the policy layers before scoring anything

Two policies live outside the quiz, in the gradebook late policy settings and the assignment group, and they routinely move more points than any moderation decision.

Missing submission policy. Auto-enters a zero for students who did not submit. A zero on participación makes a claim about attendance the form was never measuring. Surface it and ask how the instructor wants it handled, including whether the form can still be completed late.

Late policy. Deducts from the quiz result. Check whether it is flat or per day. A late penalty on a reflection form measures deadline compliance rather than participation, so flag it and let the instructor decide.

Name the students affected by each, and say plainly when the two compound on one student.

## 4. Moderate the self-assessment

The self-assessment is evidence toward the grade rather than the grade itself. Three principles keep that defensible.

Moderate in both directions. Raising only the modest students is indistinguishable from inflation and gets noticed. Every upward proposal should be paired with a genuine look at the maximal self-ratings.

Moderate only where there are grounds. Items 1 through 3 are observable. Items 4 and 5 usually sit at 8 or 10 for everyone and should be left alone.

Use partial increments. Move an item by about three points rather than jumping to the ceiling, unless the gap between the rating and the evidence is large enough that a nudge would not address it.

The instructor’s own record outranks everything here. Reflection text is the only evidence available without them. Present proposals, not conclusions, and say which cases need their memory rather than the document.

### Signals for raising

- Floor self-raters. A rating far below the rest of the class beside an engaged, specific reflection.
- A student who describes full participation in pairs and groups while docking themselves on engagement. Group work is participation.
- A student enrolled after the unit began, carrying deductions for sessions that predate their enrollment.

### Signals for holding or lowering

- A maximal rating on item 1 from a student with absences, minimal time on the form, and a very short reflection.
- Any claim about classroom behavior that the instructor did not observe.

### Check the distribution before assuming inflation

Count how many students docked themselves on item 1. If most did, the cohort is being honest and the risk runs the other way, with the most candid reflections taking the lowest grades. Say so, because it changes the recommendation.

Announce the moderation policy before the next unit opens. Moderation the class knows about in advance reads as a standard. The same moderation applied silently reads as arbitrary, and the candid students notice first.

## 5. The Canvas comments

English, since the reflections are in English. Two to four sentences, paste-ready, no headers or bullets.

Students see only a final number. Correct answers and per-question scores are hidden, so a moved score arrives with no explanation unless the comment supplies it. Account for any raised or held score in words, naming the behavior that earned the change.

No score breakdown in the comment. Never quote per-item point values, before and after figures, or the arithmetic behind a total. The student rated themselves item by item and remembers what they gave, so "I raised your engagement item above the mark you gave yourself" carries everything that "I raised your engagement item from 25 to 28" carries. The one figure that still belongs in a comment is a late deduction, stated plainly, since nothing else lets the student reconcile the final number.

Respond to what the student actually wrote. Name the activity they mentioned, answer the question they asked. When a student asks more than one thing, answer each one, and answer before extending any invitation, so the invitation reads as a reply rather than as a deflection. A comment that would fit any student in the section is worse than none.

Flag reflections addressed to the instructor personally rather than to the form. A student asking whether their questions derail class, whether a permitted device use is allowed, or explaining a late enrollment is asking for an answer. Draft those separately and tell the instructor they may want to adjust the tone, or hand the thread back for them to write.

Do not congratulate a student on a high self-rating. Comment on the behavior, not on the number they chose.

Use the course’s own vocabulary. If a student calls the unit assessment an exam and the course calls it the actividad de síntesis, use the course’s term in the reply.

## 6. File naming

```
SPAN<course>-<section>_U<unit>_Participacion_<Apellido>-<Nombre>.pdf
```

Section always included, since participation files are section-specific. Surname first, so the folder sorts like the roster and SpeedGrader. ASCII only, no accents or ñ, because the files live in OneDrive and go to Canvas. A surname containing a space closes up, since the hyphen marks the surname and given-name boundary.

When names are not yet known, use `_S01` through `_Snn` to preserve export order, then rename in one pass.

## 7. Instrument design review

Worth raising once per term, before the next unit opens, while changes are still free.

Whether students see correct answers. Build, then Settings, then Restrict student result view. Because points vary by answer, Canvas treats the top-value option as correct and labels it so. If students see that label, the form asks for candor and then marks candor incorrect. Check rather than assume, since the label always appears on the instructor side.

The item 1 spread. A 20, 14, 9, 0 spread charges six points for the honest second option on the hardest criterion. If most of the class selects that option, the spread is doing more work than any other number in the quiz. Something like 20, 17, 12, 5 keeps the ranking and lowers the price of accuracy.

Items 6 through 8. Self-reported attendance, lateness, and device use, for negative points. Unreliable in the direction you would expect, and punitive twice over when a student is honest. If the course has an attendance tool, these can become ungraded information items.

Keep item 9 exactly as it is. The reflections routinely surface things no rubric would.

## Writing conventions

No em dashes. No colons bridging ideas or introducing topics. Curly apostrophes throughout. Oxford comma in English, never in Spanish. Restrained bold. No sentence structures that set up an expectation and then negate it.

## Privacy

Never write student names, scores, or reflection content into this skill file, into memory, or into any artifact meant to be shared. Student work stays in the course folder and in Canvas.