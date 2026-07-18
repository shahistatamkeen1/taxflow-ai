"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  FileSearch,
  FileText,
  FolderOpen,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { useRole } from "@/components/layout/RoleProvider";
import { Badge } from "@/components/ui/badge";
import {
  Button,
  buttonVariants,
} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  documents,
  type DemoTaxDocument,
} from "@/data/documents";
import type { DocumentStatus } from "@/types";

const statusLabels: Record<DocumentStatus, string> = {
  processed: "Processed",
  "needs-review": "Needs review",
  "low-quality": "Low quality",
  duplicate: "Duplicate",
  "missing-pages": "Missing pages",
};

const statusStyles: Record<DocumentStatus, string> = {
  processed:
    "border-emerald-200 bg-emerald-50 text-emerald-700",
  "needs-review": "border-amber-200 bg-amber-50 text-amber-700",
  "low-quality": "border-red-200 bg-red-50 text-red-700",
  duplicate: "border-violet-200 bg-violet-50 text-violet-700",
  "missing-pages":
    "border-orange-200 bg-orange-50 text-orange-700",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default function DocumentsPage() {
  const { role } = useRole();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    DocumentStatus | "all"
  >("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedDocument, setSelectedDocument] =
    useState<DemoTaxDocument | null>(null);

  const roleDocuments = useMemo(() => {
    if (role === "client") {
      return documents.filter(
        (document) =>
          document.clientId === "client-jordan-miller",
      );
    }

    return documents;
  }, [role]);

  const documentTypes = useMemo(
    () =>
      Array.from(
        new Set(roleDocuments.map((document) => document.type)),
      ).sort(),
    [roleDocuments],
  );

  const filteredDocuments = useMemo(() => {
    return roleDocuments.filter((document) => {
      const query = search.toLowerCase();

      const matchesSearch =
        document.name.toLowerCase().includes(query) ||
        document.clientName.toLowerCase().includes(query) ||
        document.type.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        document.status === statusFilter;

      const matchesType =
        typeFilter === "all" || document.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [roleDocuments, search, statusFilter, typeFilter]);

  const processedCount = roleDocuments.filter(
    (document) => document.status === "processed",
  ).length;

  const warningCount = roleDocuments.filter(
    (document) => document.warning,
  ).length;

  function resetFilters() {
    setSearch("");
    setStatusFilter("all");
    setTypeFilter("all");
  }

  return (
    <>
      <div className="mx-auto w-full max-w-[1600px] space-y-7 p-4 sm:p-6 lg:p-8">
        <section>
          <Badge variant="secondary" className="mb-3 gap-1.5">
            <Sparkles className="size-3.5" />
            {role === "client"
              ? "My Documents"
              : "Document Intelligence"}
          </Badge>

          <h1 className="text-3xl font-semibold tracking-tight">
            {role === "client"
              ? "Your tax documents"
              : "Document review"}
          </h1>

          <p className="mt-2 text-muted-foreground">
            {role === "client"
              ? "View the documents connected to your 2025 tax return."
              : "Search uploaded documents, inspect AI extraction results, and resolve evidence issues."}
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total documents</CardDescription>
              <CardTitle className="text-3xl">
                {roleDocuments.length}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Processed successfully</CardDescription>
              <CardTitle className="text-3xl">
                {processedCount}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Require attention</CardDescription>
              <CardTitle className="text-3xl">
                {warningCount}
              </CardTitle>
            </CardHeader>
          </Card>
        </section>

        <Card>
          <CardHeader className="border-b">
            <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
              <div>
                <CardTitle>Uploaded documents</CardTitle>
                <CardDescription className="mt-1">
                  Open a document to review extracted values and source
                  locations.
                </CardDescription>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative min-w-64">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Search documents..."
                    className="pl-9"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(
                      event.target.value as DocumentStatus | "all",
                    )
                  }
                  className="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="all">All statuses</option>
                  <option value="processed">Processed</option>
                  <option value="needs-review">Needs review</option>
                  <option value="low-quality">Low quality</option>
                  <option value="missing-pages">Missing pages</option>
                </select>

                <select
                  value={typeFilter}
                  onChange={(event) =>
                    setTypeFilter(event.target.value)
                  }
                  className="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="all">All types</option>

                  {documentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {filteredDocuments.length === 0 ? (
              <div className="flex flex-col items-center px-6 py-16 text-center">
                <FileSearch className="size-11 text-muted-foreground/50" />

                <h2 className="mt-4 font-semibold">
                  No matching documents
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Change the search or filters to view additional
                  documents.
                </p>

                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={resetFilters}
                >
                  Reset filters
                </Button>
              </div>
            ) : (
              <div className="divide-y">
                {filteredDocuments.map((document) => (
                  <article
                    key={document.id}
                    className="grid gap-5 p-5 transition-colors hover:bg-muted/40 md:grid-cols-[minmax(240px,1.5fr)_minmax(160px,0.8fr)_160px_130px]"
                  >
                    <div>
                      <div className="flex items-start gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                          <FileText className="size-5 text-muted-foreground" />
                        </div>

                        <div className="min-w-0">
                          <h2 className="truncate font-semibold">
                            {document.name}
                          </h2>

                          <p className="mt-1 text-sm text-muted-foreground">
                            {document.clientName} · {document.type}
                          </p>

                          <Badge
                            variant="outline"
                            className={`mt-3 ${statusStyles[document.status]}`}
                          >
                            {statusLabels[document.status]}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        AI extraction
                      </p>

                      <div className="mt-2 flex items-center gap-2">
                        <Progress
                          value={document.aiConfidence}
                          className="max-w-24"
                        />
                        <span className="text-sm font-medium">
                          {document.aiConfidence}%
                        </span>
                      </div>

                      <p className="mt-2 text-xs text-muted-foreground">
                        {document.extractedFields} fields extracted
                      </p>
                    </div>

                    <div className="text-sm">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        File details
                      </p>

                      <p className="mt-2">
                        {document.pages}{" "}
                        {document.pages === 1 ? "page" : "pages"}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {document.fileSize}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatDate(document.uploadedAt)}
                      </p>
                    </div>

                    <div className="flex items-center md:justify-end">
                      <Button
                        variant="outline"
                        className="w-full md:w-auto"
                        onClick={() =>
                          setSelectedDocument(document)
                        }
                      >
                        Review
                        <ArrowRight className="ml-2 size-4" />
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Sheet
        open={selectedDocument !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedDocument(null);
          }
        }}
      >
        <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
          {selectedDocument && (
            <>
              <SheetHeader>
                <SheetTitle>{selectedDocument.name}</SheetTitle>

                <SheetDescription>
                  {selectedDocument.clientName} ·{" "}
                  {selectedDocument.type}
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-6 px-4 pb-8">
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className={statusStyles[selectedDocument.status]}
                  >
                    {statusLabels[selectedDocument.status]}
                  </Badge>

                  <Badge variant="secondary">
                    {selectedDocument.aiConfidence}% confidence
                  </Badge>
                </div>

                {selectedDocument.warning && (
                  <div className="flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
                    <AlertTriangle className="mt-0.5 size-5 shrink-0" />

                    <div>
                      <p className="text-sm font-semibold">
                        Review required
                      </p>
                      <p className="mt-1 text-sm">
                        {selectedDocument.warning}
                      </p>
                    </div>
                  </div>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      AI document summary
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {selectedDocument.summary}
                    </p>
                  </CardContent>
                </Card>

                <div className="rounded-lg border bg-slate-100 p-3">
                  <div className="min-h-72 bg-white p-6 text-slate-900 shadow-sm">
                    <div className="flex justify-between border-b pb-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide">
                          Tax document
                        </p>
                        <p className="mt-1 font-bold">
                          {selectedDocument.name}
                        </p>
                      </div>

                      <p className="text-xs text-slate-500">
                        {selectedDocument.pages} page
                        {selectedDocument.pages !== 1 ? "s" : ""}
                      </p>
                    </div>

                    <div className="mt-6 space-y-3">
                      {selectedDocument.evidence.length > 0 ? (
                        selectedDocument.evidence.map((evidence) => (
                          <div
                            key={`${evidence.label}-${evidence.location}`}
                            className="rounded-lg border-2 border-blue-600 bg-blue-50 p-4"
                          >
                            <div className="flex items-center gap-2 text-blue-800">
                              <Sparkles className="size-4" />
                              <p className="text-xs font-bold uppercase tracking-wide">
                                AI evidence
                              </p>
                            </div>

                            <p className="mt-3 text-sm font-semibold">
                              {evidence.label}
                            </p>

                            <p className="mt-1 text-xl font-bold">
                              {evidence.value}
                            </p>

                            <p className="mt-2 text-xs text-blue-800">
                              {evidence.location} ·{" "}
                              {evidence.confidence}% confidence
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="flex min-h-44 flex-col items-center justify-center rounded-lg border border-dashed text-center">
                          <FolderOpen className="size-9 text-slate-400" />

                          <p className="mt-3 text-sm font-medium">
                            No reliable extraction available
                          </p>

                          <p className="mt-1 max-w-xs text-xs text-slate-500">
                            A clearer or complete document is required.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Document metadata
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Uploaded by
                      </p>
                      <p className="mt-1 font-medium">
                        {selectedDocument.uploadedBy}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">
                        Uploaded
                      </p>
                      <p className="mt-1 font-medium">
                        {formatDate(selectedDocument.uploadedAt)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">
                        File size
                      </p>
                      <p className="mt-1 font-medium">
                        {selectedDocument.fileSize}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">
                        Related fields
                      </p>
                      <p className="mt-1 font-medium">
                        {selectedDocument.relatedFieldIds.length}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex items-start gap-3 rounded-lg border bg-muted/30 p-4">
                  {selectedDocument.warning ? (
                    <AlertTriangle className="mt-0.5 size-5 text-muted-foreground" />
                  ) : (
                    <ShieldCheck className="mt-0.5 size-5 text-muted-foreground" />
                  )}

                  <p className="text-sm text-muted-foreground">
                    AI output remains reviewable and can be traced back
                    to the highlighted document location.
                  </p>
                </div>

                {role !== "client" && (
                  <Link
  href={`/returns/${selectedDocument.returnId}`}
  className={buttonVariants({
    className: "w-full",
  })}
>
  Open related return
  <ArrowRight className="ml-2 size-4" />
</Link>
                )}

                {role === "client" &&
                  selectedDocument.status === "processed" && (
                    <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                      <CheckCircle2 className="size-5" />
                      No further action is required for this document.
                    </div>
                  )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}