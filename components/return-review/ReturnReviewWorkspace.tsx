"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  Calculator,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  FileQuestion,
  FileText,
  History,
  Info,
  LockKeyhole,
  MessageSquareText,
  Pencil,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
  UserRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type {
  ActivityItem,
  FieldStatus,
  TaxField,
  TaxReturn,
} from "@/types";

interface ReturnReviewWorkspaceProps {
  taxReturn: TaxReturn;
}

const statusLabels: Record<FieldStatus, string> = {
  "ai-generated": "AI generated",
  "needs-review": "Needs review",
  verified: "Verified",
  corrected: "Corrected",
  conflict: "Conflict detected",
  "missing-source": "Missing source",
  locked: "Locked",
};

const statusStyles: Record<FieldStatus, string> = {
  "ai-generated":
    "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300",
  "needs-review":
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300",
  verified:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300",
  corrected:
    "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900 dark:bg-violet-950 dark:text-violet-300",
  conflict:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300",
  "missing-source":
    "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900 dark:bg-orange-950 dark:text-orange-300",
  locked:
    "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300",
};

function FieldStatusIcon({
  status,
  className,
}: {
  status: FieldStatus;
  className?: string;
}) {
  if (status === "verified") {
    return <CheckCircle2 className={className} />;
  }

  if (status === "conflict") {
    return <TriangleAlert className={className} />;
  }

  if (status === "missing-source") {
    return <FileQuestion className={className} />;
  }

  if (status === "locked") {
    return <LockKeyhole className={className} />;
  }

  if (status === "corrected") {
    return <Pencil className={className} />;
  }

  if (status === "ai-generated") {
    return <Sparkles className={className} />;
  }

  return <CircleDot className={className} />;
}

function confidenceStyles(confidence?: number) {
  if (confidence === undefined) {
    return "border-muted bg-muted text-muted-foreground";
  }

  if (confidence >= 90) {
    return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300";
  }

  if (confidence >= 70) {
    return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300";
  }

  return "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300";
}

function confidenceLabel(confidence?: number) {
  if (confidence === undefined) {
    return "Not scored";
  }

  if (confidence >= 90) {
    return "High confidence";
  }

  if (confidence >= 70) {
    return "Medium confidence";
  }

  return "Low confidence";
}

function formatDateTime(value?: string) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export function ReturnReviewWorkspace({
  taxReturn,
}: ReturnReviewWorkspaceProps) {
  const [fields, setFields] = useState<TaxField[]>(taxReturn.fields);
  const [selectedFieldId, setSelectedFieldId] = useState(
    taxReturn.fields[0]?.id ?? "",
  );
  const [selectedSourceIndex, setSelectedSourceIndex] = useState(0);

  const [correctionDialogOpen, setCorrectionDialogOpen] =
    useState(false);
  const [correctionValue, setCorrectionValue] = useState("");
  const [correctionReason, setCorrectionReason] = useState("");

  const [undoSnapshots, setUndoSnapshots] = useState<
    Record<string, TaxField>
  >({});

  const [requestedFieldIds, setRequestedFieldIds] = useState<string[]>(
    [],
  );

  const [feedbackMessage, setFeedbackMessage] = useState("");

  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: "activity-initial-1",
      returnId: taxReturn.id,
      type: "message",
      description:
        "AI document review completed and identified five fields requiring review.",
      userName: "TaxFlow AI",
      timestamp: "2026-07-17T15:30:00",
    },
    {
      id: "activity-initial-2",
      returnId: taxReturn.id,
      fieldId: "field-mortgage-interest",
      type: "flagged",
      description:
        "Conflicting mortgage-interest values were detected across two documents.",
      userName: "TaxFlow AI",
      timestamp: "2026-07-17T15:32:00",
    },
  ]);

  const selectedField =
    fields.find((field) => field.id === selectedFieldId) ?? fields[0];

  const selectedSource =
    selectedField?.sources[selectedSourceIndex] ??
    selectedField?.sources[0];

  const groupedFields = useMemo(() => {
    return fields.reduce<Record<string, TaxField[]>>((groups, field) => {
      if (!groups[field.section]) {
        groups[field.section] = [];
      }

      groups[field.section].push(field);
      return groups;
    }, {});
  }, [fields]);

  const verifiedFieldCount = fields.filter(
    (field) => field.status === "verified",
  ).length;

  const reviewProgress =
    fields.length === 0
      ? taxReturn.progress
      : Math.round((verifiedFieldCount / fields.length) * 100);

  const visibleActivities = activities
    .filter(
      (activity) =>
        !activity.fieldId || activity.fieldId === selectedField?.id,
    )
    .slice(0, 6);
function selectField(fieldId: string) {
  setSelectedFieldId(fieldId);
  setSelectedSourceIndex(0);
  setFeedbackMessage("");
}

  function updateField(
    fieldId: string,
    update: (field: TaxField) => TaxField,
  ) {
    setFields((currentFields) =>
      currentFields.map((field) =>
        field.id === fieldId ? update(field) : field,
      ),
    );
  }

  function storeUndoSnapshot(field: TaxField) {
    setUndoSnapshots((currentSnapshots) => ({
      ...currentSnapshots,
      [field.id]: { ...field },
    }));
  }

  function addActivity(
    type: ActivityItem["type"],
    description: string,
    userName: string,
    fieldId?: string,
  ) {
    const activity: ActivityItem = {
      id: `activity-${Date.now()}`,
      returnId: taxReturn.id,
      fieldId,
      type,
      description,
      userName,
      timestamp: new Date().toISOString(),
    };

    setActivities((currentActivities) => [
      activity,
      ...currentActivities,
    ]);
  }

  function verifySelectedField() {
    if (!selectedField || selectedField.status === "verified") {
      return;
    }

    storeUndoSnapshot(selectedField);

    const timestamp = new Date().toISOString();

    updateField(selectedField.id, (field) => ({
      ...field,
      status: "verified",
      verifiedBy: "Maya Chen",
      verifiedAt: timestamp,
    }));

    addActivity(
      "verified",
      `${selectedField.label} was verified against its supporting evidence.`,
      "Maya Chen",
      selectedField.id,
    );

    setFeedbackMessage(
      `${selectedField.label} has been verified successfully.`,
    );
  }

  function openCorrectionDialog() {
    if (!selectedField) {
      return;
    }

    setCorrectionValue(selectedField.value);
    setCorrectionReason("");
    setCorrectionDialogOpen(true);
  }

  function saveCorrection() {
    if (
      !selectedField ||
      correctionValue.trim() === "" ||
      correctionReason.trim() === ""
    ) {
      return;
    }

    storeUndoSnapshot(selectedField);

    const previousValue = selectedField.value;
    const timestamp = new Date().toISOString();

    updateField(selectedField.id, (field) => ({
      ...field,
      value: correctionValue.trim(),
      originalAIValue: field.originalAIValue ?? previousValue,
      status: "corrected",
      correctedBy: "Maya Chen",
      correctedAt: timestamp,
      correctionReason: correctionReason.trim(),
    }));

    addActivity(
      "corrected",
      `${selectedField.label} was corrected from ${previousValue} to ${correctionValue.trim()}. Reason: ${correctionReason.trim()}`,
      "Maya Chen",
      selectedField.id,
    );

    setCorrectionDialogOpen(false);
    setFeedbackMessage(
      `${selectedField.label} has been corrected. The original AI value remains in the audit history.`,
    );
  }

  function requestClarification() {
    if (
      !selectedField ||
      requestedFieldIds.includes(selectedField.id)
    ) {
      return;
    }

    setRequestedFieldIds((currentIds) => [
      ...currentIds,
      selectedField.id,
    ]);

    addActivity(
      "document-request",
      `A client clarification request was created for ${selectedField.label}.`,
      "Maya Chen",
      selectedField.id,
    );

    setFeedbackMessage(
      `A clarification request for ${selectedField.label} has been assigned to Jordan Miller.`,
    );
  }

  function undoLastFieldAction() {
    if (!selectedField) {
      return;
    }

    const snapshot = undoSnapshots[selectedField.id];

    if (!snapshot) {
      return;
    }

    setFields((currentFields) =>
      currentFields.map((field) =>
        field.id === selectedField.id ? snapshot : field,
      ),
    );

    setUndoSnapshots((currentSnapshots) => {
      const nextSnapshots = { ...currentSnapshots };
      delete nextSnapshots[selectedField.id];
      return nextSnapshots;
    });

    addActivity(
      "corrected",
      `The most recent change to ${selectedField.label} was undone.`,
      "Maya Chen",
      selectedField.id,
    );

    setFeedbackMessage(
      `The most recent change to ${selectedField.label} was undone.`,
    );
  }

  if (!selectedField) {
    return (
      <div className="p-8">
        <Card>
          <CardContent className="p-8 text-center">
            <FileQuestion className="mx-auto size-10 text-muted-foreground" />
            <h1 className="mt-4 text-xl font-semibold">
              No return fields available
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              This demonstration return does not contain reviewable
              fields.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto w-full max-w-[1800px] space-y-5 p-4 sm:p-6">
        <section className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
            <div>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="size-4" />
                Back to dashboard
              </Link>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Badge variant="destructive">
                  {taxReturn.priority}
                </Badge>

                <Badge variant="secondary">
                  {taxReturn.status
                    .split("-")
                    .map(
                      (word) =>
                        word.charAt(0).toUpperCase() + word.slice(1),
                    )
                    .join(" ")}
                </Badge>

                <Badge variant="outline">
                  {taxReturn.taxYear}
                </Badge>
              </div>

              <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                {taxReturn.clientName}
              </h1>

              <p className="mt-1 text-sm text-muted-foreground">
                {taxReturn.returnType}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 xl:min-w-[620px]">
              <div className="rounded-lg border bg-muted/30 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Review progress
                </p>

                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="font-medium">
                    {verifiedFieldCount} of {fields.length} verified
                  </span>
                  <span>{reviewProgress}%</span>
                </div>

                <Progress value={reviewProgress} className="mt-2" />
              </div>

              <div className="rounded-lg border bg-muted/30 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Next action
                </p>

                <p className="mt-2 text-sm font-medium">
                  {taxReturn.nextAction}
                </p>

                <p className="mt-1 text-xs capitalize text-muted-foreground">
                  Owner: {taxReturn.nextActionOwner}
                </p>
              </div>

              <div className="rounded-lg border bg-muted/30 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Assigned team
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <UserRound className="size-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Maya Chen</p>
                    <p className="text-xs text-muted-foreground">
                      Preparer
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {feedbackMessage && (
          <div className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0" />

            <div>
              <p className="text-sm font-medium">Action completed</p>
              <p className="mt-1 text-sm">{feedbackMessage}</p>
            </div>
          </div>
        )}

        <div className="grid gap-5 xl:grid-cols-[280px_minmax(0,1fr)_minmax(340px,0.9fr)]">
          {/* LEFT PANEL */}
          <Card className="overflow-hidden xl:sticky xl:top-20 xl:h-[calc(100vh-6rem)]">
            <CardHeader className="border-b">
              <CardTitle className="text-base">Return fields</CardTitle>
              <CardDescription>
                Select a field to review its value and source.
              </CardDescription>
            </CardHeader>

            <ScrollArea className="h-[520px] xl:h-[calc(100vh-13rem)]">
              <CardContent className="space-y-6 p-4">
                {Object.entries(groupedFields).map(
                  ([section, sectionFields]) => (
                    <section key={section}>
                      <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {section}
                      </p>

                      <div className="space-y-1">
                        {sectionFields.map((field) => {
                          const isSelected =
                            field.id === selectedField.id;

                          return (
                            <button
                              key={field.id}
                              type="button"
                              onClick={() => selectField(field.id)}
                              className={cn(
                                "w-full rounded-lg border p-3 text-left transition-all",
                                isSelected
                                  ? "border-primary bg-primary/5 shadow-sm"
                                  : "border-transparent hover:border-border hover:bg-muted/60",
                              )}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                  <p className="truncate text-sm font-medium">
                                    {field.label}
                                  </p>

                                  <p className="mt-1 text-sm font-semibold">
                                    {field.value}
                                  </p>
                                </div>

                                <ChevronRight
                                  className={cn(
                                    "mt-0.5 size-4 shrink-0",
                                    isSelected
                                      ? "text-primary"
                                      : "text-muted-foreground",
                                  )}
                                />
                              </div>

                              <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                                <FieldStatusIcon
                                  status={field.status}
                                  className="size-3.5"
                                />
                                {statusLabels[field.status]}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </section>
                  ),
                )}
              </CardContent>
            </ScrollArea>
          </Card>

          {/* CENTER PANEL */}
          <div className="space-y-5">
            <Card>
              <CardHeader className="border-b">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {selectedField.section}
                    </p>

                    <CardTitle className="mt-2 text-xl">
                      {selectedField.label}
                    </CardTitle>

                    <CardDescription className="mt-1">
                      Review the extracted value, evidence, and AI
                      reasoning.
                    </CardDescription>
                  </div>

                  <Badge
                    variant="outline"
                    className={cn(
                      "w-fit",
                      statusStyles[selectedField.status],
                    )}
                  >
                    <FieldStatusIcon
                      status={selectedField.status}
                      className="mr-1.5 size-3.5"
                    />
                    {statusLabels[selectedField.status]}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 p-5 sm:p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border bg-muted/30 p-5">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Current value
                    </p>

                    <p className="mt-3 text-3xl font-semibold tracking-tight">
                      {selectedField.value}
                    </p>

                    {selectedField.originalAIValue && (
                      <div className="mt-3 rounded-md border bg-background p-3">
                        <p className="text-xs text-muted-foreground">
                          Original AI value
                        </p>
                        <p className="mt-1 text-sm font-medium line-through">
                          {selectedField.originalAIValue}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="rounded-xl border bg-muted/30 p-5">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      AI confidence
                    </p>

                    <Badge
                      variant="outline"
                      className={cn(
                        "mt-3",
                        confidenceStyles(selectedField.confidence),
                      )}
                    >
                      {confidenceLabel(selectedField.confidence)}
                    </Badge>

                    <p className="mt-3 text-3xl font-semibold">
                      {selectedField.confidence ?? "—"}
                      {selectedField.confidence !== undefined && "%"}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Confidence is based on document readability and
                      source consistency.
                    </p>
                  </div>
                </div>

                {selectedField.warnings &&
                  selectedField.warnings.length > 0 && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
                      <div className="flex items-start gap-3">
                        <TriangleAlert className="mt-0.5 size-5 shrink-0 text-red-600 dark:text-red-300" />

                        <div>
                          <p className="text-sm font-semibold text-red-800 dark:text-red-200">
                            Review required
                          </p>

                          <div className="mt-2 space-y-1">
                            {selectedField.warnings.map((warning) => (
                              <p
                                key={warning}
                                className="text-sm text-red-700 dark:text-red-300"
                              >
                                {warning}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                <section className="rounded-xl border">
                  <div className="flex items-center gap-3 border-b p-4">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Sparkles className="size-4" />
                    </div>

                    <div>
                      <h2 className="text-sm font-semibold">
                        AI explanation
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        What the AI did and why
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5 p-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        How this value was determined
                      </p>

                      <p className="mt-2 text-sm leading-relaxed">
                        {selectedField.explanation ??
                          "No AI explanation is available."}
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Recommended action
                      </p>

                      <div className="mt-2 flex items-start gap-2 rounded-lg bg-muted/50 p-3">
                        <Info className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                        <p className="text-sm">
                          {selectedField.recommendedAction ??
                            "Review this field manually."}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {selectedField.transformation && (
                  <section className="rounded-xl border">
                    <div className="flex items-center gap-3 border-b p-4">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                        <Calculator className="size-4" />
                      </div>

                      <div>
                        <h2 className="text-sm font-semibold">
                          Calculation applied
                        </h2>
                        <p className="text-xs text-muted-foreground">
                          How multiple sources produced this value
                        </p>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="rounded-lg bg-muted/60 p-4 font-mono text-sm">
                        {selectedField.transformation.formula}
                      </div>

                      <ol className="mt-4 space-y-3">
                        {selectedField.transformation.steps.map(
                          (step, index) => (
                            <li
                              key={step}
                              className="flex items-start gap-3 text-sm"
                            >
                              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                                {index + 1}
                              </span>
                              {step}
                            </li>
                          ),
                        )}
                      </ol>
                    </div>
                  </section>
                )}

                {(selectedField.correctedBy ||
                  selectedField.verifiedBy) && (
                  <section className="rounded-xl border bg-muted/20 p-4">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="mt-0.5 size-5 text-muted-foreground" />

                      <div className="space-y-2">
                        {selectedField.correctedBy && (
                          <div>
                            <p className="text-sm font-medium">
                              Corrected by{" "}
                              {selectedField.correctedBy}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatDateTime(
                                selectedField.correctedAt,
                              )}
                            </p>

                            {selectedField.correctionReason && (
                              <p className="mt-2 text-sm">
                                Reason:{" "}
                                {selectedField.correctionReason}
                              </p>
                            )}
                          </div>
                        )}

                        {selectedField.verifiedBy && (
                          <div>
                            <p className="text-sm font-medium">
                              Verified by{" "}
                              {selectedField.verifiedBy}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatDateTime(
                                selectedField.verifiedAt,
                              )}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </section>
                )}

                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={verifySelectedField}
                    disabled={selectedField.status === "verified"}
                  >
                    <CheckCircle2 className="mr-2 size-4" />
                    {selectedField.status === "verified"
                      ? "Verified"
                      : "Verify value"}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={openCorrectionDialog}
                  >
                    <Pencil className="mr-2 size-4" />
                    Correct value
                  </Button>

                  <Button
                    variant="outline"
                    onClick={requestClarification}
                    disabled={requestedFieldIds.includes(
                      selectedField.id,
                    )}
                  >
                    <MessageSquareText className="mr-2 size-4" />
                    {requestedFieldIds.includes(selectedField.id)
                      ? "Request sent"
                      : "Request clarification"}
                  </Button>

                  {undoSnapshots[selectedField.id] && (
                    <Button
                      variant="ghost"
                      onClick={undoLastFieldAction}
                    >
                      <RotateCcw className="mr-2 size-4" />
                      Undo last change
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="border-b">
                <div className="flex items-center gap-3">
                  <History className="size-5 text-muted-foreground" />

                  <div>
                    <CardTitle className="text-base">
                      Activity history
                    </CardTitle>
                    <CardDescription>
                      Audit trail for this field and return
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                {visibleActivities.length === 0 ? (
                  <div className="p-6 text-center text-sm text-muted-foreground">
                    No activity has been recorded.
                  </div>
                ) : (
                  <div className="divide-y">
                    {visibleActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex gap-3 p-4"
                      >
                        <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
                          {activity.type === "verified" ? (
                            <CheckCircle2 className="size-4" />
                          ) : activity.type === "corrected" ? (
                            <Pencil className="size-4" />
                          ) : activity.type ===
                            "document-request" ? (
                            <MessageSquareText className="size-4" />
                          ) : (
                            <AlertCircle className="size-4" />
                          )}
                        </div>

                        <div>
                          <p className="text-sm">
                            {activity.description}
                          </p>

                          <p className="mt-1 text-xs text-muted-foreground">
                            {activity.userName} ·{" "}
                            {formatDateTime(activity.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* RIGHT PANEL */}
          <Card className="overflow-hidden xl:sticky xl:top-20 xl:h-[calc(100vh-6rem)]">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-base">
                    Source evidence
                  </CardTitle>
                  <CardDescription>
                    Exact document location used by the AI
                  </CardDescription>
                </div>

                <FileText className="size-5 text-muted-foreground" />
              </div>
            </CardHeader>

            <ScrollArea className="h-[620px] xl:h-[calc(100vh-13rem)]">
              <CardContent className="space-y-5 p-4">
                {selectedField.sources.length > 1 && (
                  <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Available sources
                    </p>

                    <div className="space-y-2">
                      {selectedField.sources.map((source, index) => (
                        <button
                          key={`${source.documentId}-${index}`}
                          type="button"
                          onClick={() =>
                            setSelectedSourceIndex(index)
                          }
                          className={cn(
                            "w-full rounded-lg border p-3 text-left transition-colors",
                            selectedSourceIndex === index
                              ? "border-primary bg-primary/5"
                              : "hover:bg-muted/50",
                          )}
                        >
                          <p className="truncate text-sm font-medium">
                            {source.documentName}
                          </p>

                          <p className="mt-1 text-xs text-muted-foreground">
                            Page {source.page} · {source.section}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedSource ? (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg border bg-muted/30 p-3">
                        <p className="text-xs text-muted-foreground">
                          Page
                        </p>
                        <p className="mt-1 text-sm font-semibold">
                          {selectedSource.page}
                        </p>
                      </div>

                      <div className="rounded-lg border bg-muted/30 p-3">
                        <p className="text-xs text-muted-foreground">
                          Section
                        </p>
                        <p className="mt-1 text-sm font-semibold">
                          {selectedSource.section}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-lg border bg-slate-100 p-3 dark:bg-slate-950">
                      <div className="mx-auto min-h-[570px] bg-white p-6 text-slate-900 shadow-sm">
                        <div className="flex items-start justify-between border-b pb-4">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wide">
                              Tax document
                            </p>
                            <h3 className="mt-1 text-lg font-bold">
                              {selectedSource.documentName}
                            </h3>
                          </div>

                          <div className="text-right">
                            <p className="text-xs text-slate-500">
                              Page
                            </p>
                            <p className="font-bold">
                              {selectedSource.page}
                            </p>
                          </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-4 text-xs">
                          <div className="rounded border p-3">
                            <p className="text-slate-500">
                              Taxpayer
                            </p>
                            <p className="mt-1 font-semibold">
                              Jordan Miller
                            </p>
                          </div>

                          <div className="rounded border p-3">
                            <p className="text-slate-500">
                              Tax year
                            </p>
                            <p className="mt-1 font-semibold">
                              2025
                            </p>
                          </div>
                        </div>

                        <div className="mt-7 space-y-4">
                          <div className="rounded border p-3">
                            <p className="text-xs text-slate-500">
                              Employer / Institution
                            </p>
                            <p className="mt-1 text-sm font-medium">
                              Northstar Financial Services
                            </p>
                          </div>

                          <div className="rounded border p-3">
                            <p className="text-xs text-slate-500">
                              Account or statement reference
                            </p>
                            <p className="mt-1 font-mono text-xs">
                              XXX-XX-4821
                            </p>
                          </div>

                          <div className="rounded-lg border-2 border-blue-600 bg-blue-50 p-4">
                            <div className="flex items-center gap-2">
                              <Sparkles className="size-4 text-blue-700" />
                              <p className="text-xs font-bold uppercase tracking-wide text-blue-800">
                                AI evidence highlight
                              </p>
                            </div>

                            <p className="mt-3 text-sm font-semibold text-blue-950">
                              {selectedSource.section}
                            </p>

                            <p className="mt-2 rounded border border-blue-200 bg-white p-3 font-mono text-sm">
                              {selectedSource.extractedText}
                            </p>

                            <p className="mt-3 text-xs text-blue-800">
                              This highlighted section was linked
                              directly to the selected tax-return
                              field.
                            </p>
                          </div>

                          <div className="space-y-2">
                            {Array.from({ length: 6 }).map(
                              (_, index) => (
                                <div
                                  key={index}
                                  className="h-3 rounded bg-slate-100"
                                  style={{
                                    width: `${92 - index * 6}%`,
                                  }}
                                />
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border bg-muted/30 p-4">
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="mt-0.5 size-5 text-muted-foreground" />

                        <div>
                          <p className="text-sm font-medium">
                            Evidence connection
                          </p>

                          <p className="mt-1 text-sm text-muted-foreground">
                            The selected return value is connected to
                            this exact document, page, section, and
                            extracted text.
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex min-h-[480px] flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
                    <FileQuestion className="size-12 text-muted-foreground/50" />

                    <h3 className="mt-4 font-semibold">
                      No supporting source
                    </h3>

                    <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                      This value does not have readable supporting
                      evidence. Request a document from the client
                      before verification.
                    </p>

                    <Button
                      variant="outline"
                      className="mt-5"
                      onClick={requestClarification}
                      disabled={requestedFieldIds.includes(
                        selectedField.id,
                      )}
                    >
                      <MessageSquareText className="mr-2 size-4" />
                      {requestedFieldIds.includes(selectedField.id)
                        ? "Request sent"
                        : "Request supporting document"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </ScrollArea>
          </Card>
        </div>
      </div>

      <Dialog
        open={correctionDialogOpen}
        onOpenChange={setCorrectionDialogOpen}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Correct extracted value</DialogTitle>

            <DialogDescription>
              The original AI-generated value will remain visible in
              the activity history.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-2">
            <div className="rounded-lg border bg-muted/40 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Original value
              </p>

              <p className="mt-2 text-xl font-semibold">
                {selectedField.value}
              </p>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="corrected-value"
                className="text-sm font-medium"
              >
                Corrected value
              </label>

              <Input
                id="corrected-value"
                value={correctionValue}
                onChange={(event) =>
                  setCorrectionValue(event.target.value)
                }
                placeholder="Enter the corrected value"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="correction-reason"
                className="text-sm font-medium"
              >
                Reason for correction
              </label>

              <Textarea
                id="correction-reason"
                value={correctionReason}
                onChange={(event) =>
                  setCorrectionReason(event.target.value)
                }
                placeholder="Explain why the AI-generated value was changed..."
                rows={4}
              />

              <p className="text-xs text-muted-foreground">
                This reason will be retained in the audit trail.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCorrectionDialogOpen(false)}
            >
              Cancel
            </Button>

            <Button
              onClick={saveCorrection}
              disabled={
                correctionValue.trim() === "" ||
                correctionReason.trim() === ""
              }
            >
              Save correction
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}