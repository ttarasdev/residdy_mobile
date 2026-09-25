# Cases

Based on Figma `04 · Sprawy`: case card 278:3454, case detail 279:3541, instruction 280:3637, date selection 280:3748.

- `CaseCard.tsx`: status, title and three-stage preview on the legalization page.
- `StageTrack.tsx`: shared horizontal timeline. Keeps the selected stage visible; long stage names wrap to two lines.
- `CaseDetails.tsx`: case title/status, stage navigation, all-stages modal and task progress.
- `CaseTask.tsx`: vertical timeline and task cards. Completed tasks are muted, instructions use a paper surface, date tasks use navy. Locked stages are read-only.
- `TaskDateModal.tsx`: Monday-first localized calendar, local time input, future-date validation and API submission. No new date library.
- `Instruction.tsx`: title, wide branded header, paper text blocks and inline images; returns to the case.
- `NewCase.tsx`: existing introduction → category → case flow.

All content comes from the API. Mutations invalidate case lists/details and reminder queries. Subscription guards remain in place. Static UI text lives in `casesUi` and `workspace` in all four message files.

Task and stage timeline icons come from `template.icon.url`, including completed items. Completion does not replace the catalog icon. The checkbox checkmark and date-button calendar remain UI action icons. Paper task surfaces tint the remote monochrome icon dark.
