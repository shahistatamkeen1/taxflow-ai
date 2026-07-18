import type { TaxDocument } from "@/types";

export interface DocumentEvidence {
  label: string;
  value: string;
  location: string;
  confidence: number;
}

export interface DemoTaxDocument extends TaxDocument {
  clientName: string;
  returnId: string;
  uploadedBy: string;
  fileSize: string;
  aiConfidence: number;
  extractedFields: number;
  summary: string;
  warning?: string;
  evidence: DocumentEvidence[];
}

export const documents: DemoTaxDocument[] = [
  {
    id: "document-jordan-w2",
    clientId: "client-jordan-miller",
    clientName: "Jordan Miller",
    returnId: "return-jordan-2025",
    name: "Northstar Technologies W-2",
    type: "W-2",
    pages: 1,
    uploadedAt: "2026-07-15T10:30:00",
    uploadedBy: "Jordan Miller",
    fileSize: "284 KB",
    status: "processed",
    relatedFieldIds: ["field-wages"],
    aiConfidence: 98,
    extractedFields: 4,
    summary:
      "Wage and withholding information extracted successfully from the employer-issued W-2.",
    evidence: [
      {
        label: "Wages, tips and compensation",
        value: "$112,450",
        location: "Page 1 · Box 1",
        confidence: 98,
      },
      {
        label: "Federal income tax withheld",
        value: "$18,740",
        location: "Page 1 · Box 2",
        confidence: 97,
      },
    ],
  },
  {
    id: "document-jordan-1099-int",
    clientId: "client-jordan-miller",
    clientName: "Jordan Miller",
    returnId: "return-jordan-2025",
    name: "Lakeside Bank 1099-INT",
    type: "1099-INT",
    pages: 1,
    uploadedAt: "2026-07-15T11:20:00",
    uploadedBy: "Jordan Miller",
    fileSize: "196 KB",
    status: "low-quality",
    relatedFieldIds: ["field-interest"],
    aiConfidence: 78,
    extractedFields: 1,
    summary:
      "Interest income was extracted, but the final digit requires human confirmation.",
    warning:
      "The final digit is slightly unclear because the uploaded image is blurred.",
    evidence: [
      {
        label: "Interest income",
        value: "$3,240",
        location: "Page 1 · Box 1",
        confidence: 78,
      },
    ],
  },
  {
    id: "document-jordan-1098-primary",
    clientId: "client-jordan-miller",
    clientName: "Jordan Miller",
    returnId: "return-jordan-2025",
    name: "Lakeside Mortgage 1098",
    type: "1098",
    pages: 1,
    uploadedAt: "2026-07-16T09:10:00",
    uploadedBy: "Jordan Miller",
    fileSize: "242 KB",
    status: "needs-review",
    relatedFieldIds: ["field-mortgage-interest"],
    aiConfidence: 62,
    extractedFields: 1,
    summary:
      "The mortgage-interest value conflicts with another uploaded lender summary.",
    warning:
      "This statement reports $18,420, while the annual summary reports $18,240.",
    evidence: [
      {
        label: "Mortgage interest received",
        value: "$18,420",
        location: "Page 1 · Box 1",
        confidence: 62,
      },
    ],
  },
  {
    id: "document-jordan-1098-secondary",
    clientId: "client-jordan-miller",
    clientName: "Jordan Miller",
    returnId: "return-jordan-2025",
    name: "Lakeside Mortgage Annual Summary",
    type: "Mortgage Summary",
    pages: 2,
    uploadedAt: "2026-07-16T09:15:00",
    uploadedBy: "Jordan Miller",
    fileSize: "411 KB",
    status: "needs-review",
    relatedFieldIds: ["field-mortgage-interest"],
    aiConfidence: 88,
    extractedFields: 1,
    summary:
      "The annual lender summary contains a different mortgage-interest total.",
    warning:
      "The value differs from the amount shown on the uploaded Form 1098.",
    evidence: [
      {
        label: "Total mortgage interest paid",
        value: "$18,240",
        location: "Page 2 · Annual interest summary",
        confidence: 88,
      },
    ],
  },
  {
    id: "document-food-bank",
    clientId: "client-jordan-miller",
    clientName: "Jordan Miller",
    returnId: "return-jordan-2025",
    name: "Community Food Bank Receipt",
    type: "Donation Receipt",
    pages: 1,
    uploadedAt: "2026-07-14T14:20:00",
    uploadedBy: "Jordan Miller",
    fileSize: "132 KB",
    status: "processed",
    relatedFieldIds: ["field-charitable"],
    aiConfidence: 96,
    extractedFields: 1,
    summary: "Donation amount extracted successfully.",
    evidence: [
      {
        label: "Donation amount",
        value: "$1,500",
        location: "Page 1 · Donation amount",
        confidence: 96,
      },
    ],
  },
  {
    id: "document-education",
    clientId: "client-jordan-miller",
    clientName: "Jordan Miller",
    returnId: "return-jordan-2025",
    name: "Education Foundation Receipt",
    type: "Donation Receipt",
    pages: 1,
    uploadedAt: "2026-07-14T14:25:00",
    uploadedBy: "Jordan Miller",
    fileSize: "145 KB",
    status: "processed",
    relatedFieldIds: ["field-charitable"],
    aiConfidence: 97,
    extractedFields: 1,
    summary: "Contribution amount extracted successfully.",
    evidence: [
      {
        label: "Contribution amount",
        value: "$2,000",
        location: "Page 1 · Contribution amount",
        confidence: 97,
      },
    ],
  },
  {
    id: "document-relief",
    clientId: "client-jordan-miller",
    clientName: "Jordan Miller",
    returnId: "return-jordan-2025",
    name: "Relief Organization Receipt",
    type: "Donation Receipt",
    pages: 1,
    uploadedAt: "2026-07-14T14:30:00",
    uploadedBy: "Jordan Miller",
    fileSize: "128 KB",
    status: "processed",
    relatedFieldIds: ["field-charitable"],
    aiConfidence: 94,
    extractedFields: 1,
    summary: "Donation total extracted successfully.",
    evidence: [
      {
        label: "Donation total",
        value: "$1,350",
        location: "Page 1 · Donation total",
        confidence: 94,
      },
    ],
  },
  {
    id: "document-home-office",
    clientId: "client-jordan-miller",
    clientName: "Jordan Miller",
    returnId: "return-jordan-2025",
    name: "Home Office Expense Receipt",
    type: "Expense Receipt",
    pages: 1,
    uploadedAt: "2026-07-16T15:45:00",
    uploadedBy: "Jordan Miller",
    fileSize: "87 KB",
    status: "low-quality",
    relatedFieldIds: ["field-home-office"],
    aiConfidence: 41,
    extractedFields: 0,
    summary:
      "The document could not be read reliably and requires a clearer replacement.",
    warning: "The receipt is cropped and the expense amount is unreadable.",
    evidence: [],
  },
  {
    id: "document-olivia-w2",
    clientId: "client-olivia-parker",
    clientName: "Olivia Parker",
    returnId: "return-olivia-2025",
    name: "Previous Employer W-2",
    type: "W-2",
    pages: 1,
    uploadedAt: "2026-07-16T12:00:00",
    uploadedBy: "Olivia Parker",
    fileSize: "201 KB",
    status: "missing-pages",
    relatedFieldIds: [],
    aiConfidence: 35,
    extractedFields: 0,
    summary:
      "The uploaded document is incomplete and does not contain all required wage information.",
    warning: "The lower portion of the W-2 is missing.",
    evidence: [],
  },
  {
    id: "document-northstar-profit-loss",
    clientId: "client-northstar",
    clientName: "Northstar Consulting LLC",
    returnId: "return-northstar-2025",
    name: "2025 Profit and Loss Statement",
    type: "Financial Statement",
    pages: 8,
    uploadedAt: "2026-07-15T16:40:00",
    uploadedBy: "Northstar Consulting LLC",
    fileSize: "1.4 MB",
    status: "processed",
    relatedFieldIds: [],
    aiConfidence: 91,
    extractedFields: 18,
    summary:
      "Revenue and expense categories were extracted from the annual profit-and-loss statement.",
    evidence: [
      {
        label: "Gross revenue",
        value: "$482,900",
        location: "Page 1 · Revenue summary",
        confidence: 94,
      },
      {
        label: "Operating expenses",
        value: "$286,420",
        location: "Page 4 · Expense summary",
        confidence: 89,
      },
    ],
  },
];