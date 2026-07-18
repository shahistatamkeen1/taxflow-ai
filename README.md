# TaxFlow AI

**TaxFlow AI** is an interactive AI-assisted tax preparation and review workspace designed for tax professionals, reviewers, and clients.

The prototype demonstrates how AI-generated tax information can remain **traceable, explainable, reviewable, and correctable** while preserving human oversight throughout the tax-return workflow.

## Live Application

- **Live Prototype:** https://taxflow-ai-seven.vercel.app/
- **GitHub Repository:** https://github.com/shahistatamkeen1/taxflow-ai

---

## Project Overview

AI can reduce the time required to process tax documents, extract financial values, identify inconsistencies, and recommend next actions.

However, tax professionals cannot responsibly rely on AI output unless they can clearly understand:

- Where each value originated
- Which document supports the value
- The exact page and section used
- How confident the AI is
- Whether conflicting information exists
- Whether a calculation or transformation was applied
- How a human reviewer can verify or correct the result
- Who performed the final action
- What the client needs to do next

TaxFlow AI addresses these concerns through an evidence-first, human-in-the-loop tax-review experience.

---

## Case Study Challenges Addressed

The prototype addresses all ten challenge areas presented in the case study.

### Challenge 01 — Source Document Traceability

Each AI-generated tax value can be traced to:

- The related source document
- The exact document page
- The relevant form section or box
- The extracted source text
- Additional supporting documents
- Any calculation or transformation applied

The return-review workspace keeps the tax value and supporting evidence visible together.

### Challenge 02 — Contextual Collaboration

Collaboration is connected to the exact tax issue rather than placed in a disconnected inbox.

The prototype includes:

- Client clarification requests
- Supporting-document requests
- Request ownership
- Due dates
- Related tax-return fields
- Request statuses
- Client-facing messages and tasks
- Activity-history updates

### Challenge 03 — Clear First-Run Guidance

The experience immediately communicates the next most important action.

Examples include:

- A recommended guided review on the CPA dashboard
- Priority-ranked tax returns
- A clear next-action owner
- A client homepage with one primary task
- Outstanding-task summaries
- Return-progress guidance

### Challenge 04 — Navigation and Context

Users can move through the application without losing their place or role context.

The prototype includes:

- Role-aware sidebar navigation
- Active-route highlighting
- Return-to-dashboard navigation
- Related-return links
- Contextual document previews
- Consistent page titles and descriptions
- Responsive mobile navigation

### Challenge 05 — Role-Aware Experiences

The interface adapts to three user roles:

- **Preparer**
- **Reviewer**
- **Client**

Preparers and reviewers receive detailed evidence, AI confidence, internal warnings, correction tools, and audit history.

Clients receive simplified tasks, document requests, messages, and return progress without unnecessary internal tax-review complexity.

### Challenge 06 — Return Status and Progress

The application communicates:

- Current return status
- Overall completion percentage
- Verified-field count
- Outstanding tasks
- Next action
- Next-action owner
- Completed stages
- Current stage
- Upcoming stages

Statuses use plain language, icons, and text rather than relying only on color.

### Challenge 07 — An Actionable Dashboard

The CPA dashboard is designed around decisions and actions instead of passive statistics.

It includes:

- Priority-ranked returns
- Urgency indicators
- Return progress
- Assigned owner
- Deadline information
- Next action
- Next-action ownership
- Search
- Priority filters
- Owner filters
- Direct access to the return-review workflow
- A recommended guided demonstration

### Challenge 08 — Clickable vs. Editable

The prototype clearly distinguishes between information that can be viewed and information that can be changed.

Users can:

- Select tax-return fields
- Switch between source documents
- Verify extracted values
- Correct AI-generated values
- Enter a required correction reason
- Undo the latest field change
- Submit client clarification requests
- Search and filter documents
- Complete client tasks
- Simulate a document upload

Editable actions use clearly labeled controls and visible confirmation states.

### Challenge 09 — Managing Complexity

Complex tax information is organized through progressive disclosure and contextual layouts.

The application uses:

- A three-panel tax-review workspace
- Grouped tax-return sections
- Role-specific navigation
- Expandable source evidence
- Contextual warnings
- Conditional calculation details
- Document-review sheets
- Simplified client interfaces
- Responsive stacked layouts on smaller screens

Users see detailed information only when it is relevant to their current task.

### Challenge 10 — Trustworthy AI

The prototype does not present AI confidence as proof of correctness.

Each AI-assisted result can include:

- The generated value
- Confidence score
- Confidence label
- Supporting evidence
- Source location
- Warning or uncertainty
- Explanation of the AI process
- Recommended human action
- Verification controls
- Correction controls
- Original-value preservation
- Reviewer identity
- Timestamp
- Audit-history event

Human reviewers remain responsible for the final decision.

---

## Recommended Demo Walkthrough

The main demonstration takes approximately two to three minutes.

1. Open the CPA dashboard.
2. Select **Start Guided Review**.
3. Open the **Mortgage Interest** field.
4. Compare the two conflicting lender documents.
5. Review the AI confidence, warning, explanation, and recommended action.
6. Select **Correct Value**.
7. Enter:

   ```text
   $18,240
   ```

8. Enter the correction reason:

   ```text
   Confirmed against the lender's annual mortgage summary.
   ```

9. Save the correction.
10. Confirm that the original AI value remains visible.
11. Review the updated activity history.
12. Use **Undo Last Change** to demonstrate recoverability.
13. Select the Client role.
14. Review the simplified client homepage, tasks, documents, and return progress.

---

## Main Features

### CPA Dashboard

- Action-oriented return queue
- Priority scoring
- Search and filtering
- Return progress
- Assigned preparer
- Deadline visibility
- Next-action ownership
- Guided demonstration entry point

### Tax-Return Review Workspace

- Tax fields grouped by section
- AI-generated values
- Confidence scores
- Confidence labels
- Review statuses
- Source-document previews
- Exact page and section references
- Highlighted evidence
- Multiple-source comparison
- AI explanations
- Recommended actions
- Calculation and transformation details

### Human Review Controls

- Verify extracted values
- Correct AI-generated values
- Require a correction reason
- Preserve the original AI value
- Record reviewer identity
- Record timestamps
- Update activity history
- Undo the most recent field action

### Document Intelligence

- Search documents
- Filter by status
- Filter by document type
- AI extraction confidence
- Extracted-field totals
- Document warnings
- Document summaries
- Evidence previews
- Related-return navigation
- Role-aware document visibility

### Client Requests and Collaboration

- Open requests
- Waiting-on-client statuses
- Request ownership
- Due dates
- Related tax fields
- Clarification requests
- Supporting-document requests
- Contextual collaboration

### Client Experience

- Clear next action
- Outstanding-task count
- Return progress
- Simulated document upload
- Client task completion
- Tax-return timeline
- Plain-language statuses
- Next-action ownership
- Client-specific document list

### Responsive Interface

The application supports:

- Desktop layouts
- Tablet layouts
- Mobile navigation
- Stacked review panels
- Responsive cards
- Responsive filters
- Mobile-friendly dialogs and document previews

---

## Edge Cases Demonstrated

The prototype includes multiple scenarios beyond the ideal success path:

- High-confidence extraction
- Medium-confidence extraction
- Low-confidence extraction
- Blurred document image
- Conflicting source documents
- Multiple-document calculated value
- Missing supporting evidence
- Missing document pages
- Human-corrected AI value
- Verified value
- Client clarification request
- Supporting-document request
- Empty search results
- Missing tax return
- Completed client task
- Outstanding client task
- Undoable field change

---

## What Is Fully Functional

The following frontend interactions are implemented:

- Application navigation
- Responsive sidebar
- Mobile menu
- Role switching
- Role-aware navigation
- Dashboard search
- Dashboard filters
- Priority-ranked returns
- Return-field selection
- Source-document selection
- Multiple-source comparison
- Confidence and warning states
- AI explanation rendering
- Calculation-step rendering
- Value verification
- Value correction
- Correction-reason capture
- Original-value preservation
- Reviewer and timestamp display
- Undo workflow
- Activity-history updates
- Client clarification requests
- Document search
- Document filtering
- Document preview sheets
- Related-return navigation
- Client task completion
- Simulated file selection
- Upload success state
- Client progress timeline
- Empty states
- Not-found states

---

## What Is Simulated

The following capabilities use realistic mock data for demonstration:

- OCR
- Document parsing
- AI inference
- Confidence-score generation
- Tax calculations
- Tax-law validation
- Authentication
- Authorization enforcement
- Persistent database storage
- Real file storage
- Email delivery
- Client notifications
- Production audit storage
- External tax-software integrations

The prototype intentionally prioritizes frontend usability, information architecture, interaction design, responsible AI presentation, and human oversight.

---

## Key Design Decisions

### Evidence Before Automation

AI-generated values are never shown without a way to inspect their evidence.

The interface connects each value to the exact document, page, section, and extracted text used by the system.

### Confidence Is Not Correctness

Confidence scores are used as review guidance, not as proof that a value is correct.

Low-confidence and conflicting results include visible warnings and recommended human actions.

### Human Corrections Preserve History

Correcting an AI-generated value does not silently overwrite the original result.

The interface preserves:

- Original AI value
- Corrected value
- Correction reason
- Reviewer identity
- Timestamp
- Audit event

### Contextual Collaboration

Questions and requests are connected to the exact return field or document issue that caused them.

This reduces ambiguity for both the tax professional and the client.

### Role-Aware Complexity

Professional users receive detailed tax-review tools, while clients receive simplified tasks and progress information.

### Progressive Disclosure

Detailed AI explanations, calculations, source documents, and activity history appear only where they are useful.

### Accessible Status Communication

Statuses use a combination of:

- Text
- Icons
- Labels
- Visual styling

The interface does not rely only on color to communicate meaning.

---

## Technology Stack

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui with Base UI**
- **Lucide React**
- **React Context**
- **Local typed mock data**
- **Vercel**

---

## Project Structure

```text
taxflow-ai/
├── app/
│   ├── client/
│   │   ├── progress/
│   │   ├── tasks/
│   │   └── page.tsx
│   ├── dashboard/
│   ├── documents/
│   ├── requests/
│   ├── returns/
│   │   └── [returnId]/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── layout/
│   ├── return-review/
│   └── ui/
│
├── data/
│   ├── clients.ts
│   ├── documents.ts
│   ├── returns.ts
│   └── users.ts
│
├── lib/
│   ├── priority.ts
│   └── utils.ts
│
├── public/
├── types/
│   └── index.ts
│
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

---

## Installation and Local Setup

### Prerequisites

Install the following before running the project:

- A recent LTS version of Node.js
- npm
- Git

Verify the installation:

```bash
node --version
npm --version
git --version
```

### Clone the Repository

```bash
git clone https://github.com/shahistatamkeen1/taxflow-ai.git
```

Navigate into the project:

```bash
cd taxflow-ai
```

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

Open the application:

```text
http://localhost:3000
```

No environment variables, API keys, external databases, or backend services are required.

---

## Available Commands

### Start Development Mode

```bash
npm run dev
```

### Run ESLint

```bash
npm run lint
```

### Create a Production Build

```bash
npm run build
```

### Start the Production Build

Run this after `npm run build`:

```bash
npm start
```

---

## Production Validation

Before deployment or review, run:

```bash
npm run lint
npm run build
npm start
```

Then open:

```text
http://localhost:3000
```

Test the following routes:

```text
/dashboard
/returns
/returns/return-jordan-2025
/documents
/requests
/client
/client/tasks
/client/progress
```

---

## Deployment

The application is deployed on Vercel:

https://taxflow-ai-seven.vercel.app/

The project does not require environment variables because all prototype data and AI responses are simulated locally.

---

## Future Production Improvements

With additional development time, the next production phases would include:

- Secure authentication
- Fine-grained role-based permissions
- Real document upload
- Encrypted object storage
- OCR integration
- Document-understanding models
- LLM-based explanations
- Tax-rule validation
- Persistent relational database
- Immutable audit logging
- Client email notifications
- Background document processing
- Human-feedback collection
- Automated frontend tests
- Accessibility testing
- Monitoring and observability
- Tax-software integrations
- Data-retention and privacy controls

---

## Privacy and Data Notice

All names, clients, tax documents, financial values, statuses, messages, and return details in this application are fictional.

No real taxpayer information is included.

---

## Author

**Shahista Tamkeen**

- GitHub: https://github.com/shahistatamkeen1
- Portfolio: https://shahistatamkeen1.github.io/portfolio/
- LinkedIn: https://www.linkedin.com/in/shahista-tamkeen/