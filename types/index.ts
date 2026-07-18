export type UserRole = "preparer" | "reviewer" | "client";

export type Priority = "critical" | "high" | "medium" | "low";

export type ReturnStatus =
  | "not-started"
  | "collecting-documents"
  | "in-preparation"
  | "needs-attention"
  | "ready-for-review"
  | "client-action-required"
  | "complete";

export type FieldStatus =
  | "ai-generated"
  | "needs-review"
  | "verified"
  | "corrected"
  | "conflict"
  | "missing-source"
  | "locked";

export type ConfidenceLevel = "high" | "medium" | "low";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  returnIds: string[];
}

export interface SourceReference {
  documentId: string;
  documentName: string;
  page: number;
  section: string;
  extractedText: string;
}

export interface Transformation {
  formula: string;
  steps: string[];
}

export interface TaxField {
  id: string;
  label: string;
  section: string;
  value: string;
  originalAIValue?: string;
  status: FieldStatus;
  confidence?: number;
  confidenceLevel?: ConfidenceLevel;
  explanation?: string;
  recommendedAction?: string;
  sources: SourceReference[];
  transformation?: Transformation;
  warnings?: string[];
  verifiedBy?: string;
  verifiedAt?: string;
  correctedBy?: string;
  correctedAt?: string;
  correctionReason?: string;
}

export interface TaxReturn {
  id: string;
  clientId: string;
  clientName: string;
  taxYear: number;
  returnType: string;
  status: ReturnStatus;
  priority: Priority;
  deadline: string;
  preparerId: string;
  reviewerId: string;
  fields: TaxField[];
  progress: number;
  nextAction: string;
  nextActionOwner: "client" | "preparer" | "reviewer";
}

export type DocumentStatus =
  | "processed"
  | "needs-review"
  | "low-quality"
  | "duplicate"
  | "missing-pages";

export interface TaxDocument {
  id: string;
  clientId: string;
  name: string;
  type: string;
  pages: number;
  uploadedAt: string;
  status: DocumentStatus;
  relatedFieldIds: string[];
  previewPath?: string;
}

export interface ActivityItem {
  id: string;
  returnId: string;
  fieldId?: string;
  type:
    | "verified"
    | "corrected"
    | "flagged"
    | "message"
    | "document-request";
  description: string;
  userName: string;
  timestamp: string;
}

export interface ClientRequest {
  id: string;
  clientId: string;
  returnId: string;
  fieldId?: string;
  title: string;
  description: string;
  status: "open" | "waiting-on-client" | "resolved";
  dueDate: string;
  owner: "client" | "preparer";
}