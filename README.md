# TaxFlow AI

An interactive AI-assisted tax-review prototype built for the AI
Engineer candidate case study.

TaxFlow AI helps tax professionals prioritize urgent work, inspect
AI-extracted values, trace those values to exact document evidence,
resolve uncertainty, and retain human oversight throughout the review
process.

## Live Prototype

- Live application: ADD_VERCEL_URL
- GitHub repository: ADD_GITHUB_URL

## Case Study Focus

Primary challenge:

- Challenge 01 — Source Document Traceability

Supporting concepts demonstrated:

- Challenge 05 — Role-Aware Experiences
- Challenge 06 — Return Status and Progress
- Challenge 07 — An Actionable Dashboard
- Challenge 08 — Clickable vs. Editable
- Challenge 10 — Trustworthy AI

> Update this section to reflect the exact challenge or challenges
> assigned by the recruiting team.

## Product Problem

AI can accelerate tax preparation by extracting values, identifying
warnings, and recommending next actions. However, tax professionals
cannot responsibly rely on AI output unless they can understand:

- Where each value came from
- What evidence supports it
- How confident the system is
- What uncertainty exists
- Whether a transformation was applied
- How a human can verify or correct it
- Who performed the final action

TaxFlow AI addresses this problem through an evidence-first,
human-in-the-loop review workflow.

## Recommended Demo Walkthrough

The strongest demonstration takes approximately two minutes.

1. Open the CPA Dashboard.
2. Select **Start guided review**.
3. Choose **Mortgage interest** from the return-field list.
4. Compare the two conflicting source documents.
5. Review the AI confidence, warning, explanation, and recommended action.
6. Select **Correct value**.
7. Enter `$18,240`.
8. Use the reason:
   `Confirmed against the lender's annual mortgage summary.`
9. Save the correction.
10. Review the original AI value and updated audit history.
11. Use the role switcher to open the Client experience.
12. Review the simplified task and return-progress views.

## Main Features

### Action-oriented CPA dashboard

- Returns ranked by urgency, status, deadline, and action ownership
- Client, priority, and owner filters
- Direct navigation from summary to action
- Recommended guided demonstration

### Source-document traceability

- Return field linked to the supporting document
- Exact document page and section
- Highlighted extracted evidence
- Multiple evidence-source comparison
- Calculation and transformation steps

### Trustworthy AI interaction model

- AI-generated value
- Confidence level and score
- Supporting evidence
- Explanation of what the AI did
- Visible uncertainty and warnings
- Recommended next action
- Human verification and correction controls

### Human oversight and audit history

- Verify extracted values
- Correct AI output
- Preserve the original AI value
- Require a correction reason
- Record reviewer identity and timestamp
- Undo the latest change
- Create client clarification requests

### Role-aware experience

The same application shell adapts to:

- CPA / Preparer
- Reviewer
- Client

Professional users receive evidence, confidence, internal statuses,
correction tools, and audit history. Clients receive plain-language
tasks, document requests, and return progress without unnecessary
internal complexity.

### Document intelligence

- Search and filtering
- Document-status indicators
- Extraction confidence
- Extracted-field counts
- AI document summaries
- Source-evidence previews
- Related-return navigation

### Client action center

- Clear next action
- Simulated document upload
- Outstanding tasks
- Task completion
- Return-progress timeline
- Plain-language ownership and status

## Edge Cases Demonstrated

The prototype includes:

- High-confidence direct extraction
- Medium-confidence extraction
- Low-quality document
- Conflicting source documents
- Multiple-source calculated value
- Missing supporting evidence
- Human-corrected AI result
- Verified result
- Client clarification request
- Empty search results
- Missing return
- Completed and outstanding client tasks

## What Is Genuinely Functional

The following interactions are implemented in the frontend:

- Application navigation
- Responsive desktop and mobile shell
- Role switching
- Dashboard search and filtering
- Priority ranking
- Return-field selection
- Source-document switching
- AI explanation rendering
- Confidence and warning states
- Value verification
- Value correction
- Correction-reason capture
- Original-value preservation
- Undo workflow
- Activity-history updates
- Client clarification requests
- Document search and filtering
- Document-preview sheets
- Client task completion
- Simulated client file selection and upload success

## What Is Simulated

The following capabilities use realistic mock data:

- OCR and document parsing
- AI inference
- Confidence-score generation
- Tax calculations
- Authentication
- Authorization enforcement
- Persistent database storage
- File storage
- Email and external notifications
- Tax-law validation
- Production audit logging

The prototype intentionally prioritizes the frontend interaction model,
information architecture, and AI trust experience.

## Key Design Decisions

### Side-by-side evidence review

Return fields and supporting evidence remain visible in the same
workspace. This reduces context switching and allows reviewers to
validate AI output without losing their place.

### Evidence instead of confidence alone

A confidence score is never presented as proof of correctness. Each
result includes supporting evidence, uncertainty, and a recommended
human action.

### Progressive AI transparency

The default interface provides the result, confidence, evidence,
warning, and next action. Calculation details appear only when they are
relevant.

### Corrections preserve history

Human corrections do not silently overwrite AI output. The prototype
retains the original value, corrected value, correction reason,
reviewer identity, timestamp, and audit event.

### Contextual collaboration

Document requests and clarification actions are connected to the exact
tax field or evidence issue rather than being placed in a disconnected
inbox.

### Role-aware complexity

CPA and reviewer users receive detailed professional controls. Clients
receive simplified instructions, progress, and document requests.

### Accessible status communication

Statuses use text, icons, and styling together instead of relying on
color alone.

## Technology Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui with Base UI
- Lucide icons
- Local typed mock data
- React state and local storage

## Project Structure

```text
app/
├── client/
├── dashboard/
├── documents/
├── requests/
├── returns/
├── layout.tsx
└── page.tsx

components/
├── ai/
├── collaboration/
├── dashboard/
├── documents/
├── layout/
├── return-review/
├── shared/
└── ui/

data/
├── clients.ts
├── documents.ts
├── returns.ts
└── users.ts

lib/
├── priority.ts
└── utils.ts

types/
└── index.ts