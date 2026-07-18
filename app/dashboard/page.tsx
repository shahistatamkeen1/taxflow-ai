"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Eye,
  FileSearch,
  FileText,
  Search,
  ShieldCheck,
  Sparkles,
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
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { taxReturns } from "@/data/returns";
import { calculatePriorityScore } from "@/lib/priority";
import type {
  Priority,
  ReturnStatus,
  TaxReturn,
} from "@/types";

const summaryItems = [
  {
    title: "Needs attention",
    value: 12,
    description: "Returns with unresolved issues",
    icon: AlertTriangle,
  },
  {
    title: "Waiting on clients",
    value: 5,
    description: "Outstanding document requests",
    icon: Clock3,
  },
  {
    title: "Ready for review",
    value: 4,
    description: "Returns awaiting final approval",
    icon: CheckCircle2,
  },
  {
    title: "Documents processed",
    value: 86,
    description: "AI-reviewed source documents",
    icon: FileText,
  },
];

const priorityClasses: Record<Priority, string> = {
  critical:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300",
  high:
    "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900 dark:bg-orange-950 dark:text-orange-300",
  medium:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300",
  low:
    "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300",
};

function formatStatus(status: ReturnStatus) {
  return status
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatDeadline(deadline: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(`${deadline}T12:00:00`));
}

export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<
    Priority | "all"
  >("all");
  const [ownerFilter, setOwnerFilter] = useState<
    TaxReturn["nextActionOwner"] | "all"
  >("all");

  const filteredReturns = useMemo(() => {
    return [...taxReturns]
      .filter((taxReturn) => {
        const matchesSearch =
          taxReturn.clientName
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          taxReturn.returnType
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          taxReturn.nextAction
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesPriority =
          priorityFilter === "all" ||
          taxReturn.priority === priorityFilter;

        const matchesOwner =
          ownerFilter === "all" ||
          taxReturn.nextActionOwner === ownerFilter;

        return matchesSearch && matchesPriority && matchesOwner;
      })
      .sort(
        (first, second) =>
          calculatePriorityScore(second) -
          calculatePriorityScore(first),
      );
  }, [search, priorityFilter, ownerFilter]);

  function resetFilters() {
    setSearch("");
    setPriorityFilter("all");
    setOwnerFilter("all");
  }

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-7 p-4 sm:p-6 lg:p-8">
      <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <Badge variant="secondary" className="mb-3 gap-1.5">
            <Sparkles className="size-3.5" />
            CPA Workspace
          </Badge>

          <h1 className="text-3xl font-semibold tracking-tight">
            Good evening, Maya
          </h1>

          <p className="mt-2 text-muted-foreground">
            Here is the work requiring your attention today.
          </p>
        </div>

        <Link
          href="/returns/return-jordan-2025"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
        >
          Review highest priority
          <ArrowRight className="size-4" />
        </Link>
      </section>

    <section className="rounded-xl border border-primary/20 bg-primary/5 p-5 shadow-sm">
  <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
    <div className="flex items-start gap-4">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <Eye className="size-5" />
      </div>

      <div>
        <Badge variant="outline" className="mb-2 bg-background">
          Recommended demo
        </Badge>

        <h2 className="text-lg font-semibold">
          Review an AI-detected document conflict
        </h2>

        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Compare two conflicting mortgage-interest documents, inspect
          the AI&apos;s evidence, correct the extracted value, and review
          the resulting audit history.
        </p>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <FileSearch className="size-3.5" />
            Source traceability
          </span>

          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="size-3.5" />
            AI transparency
          </span>

          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="size-3.5" />
            Human oversight
          </span>
        </div>
      </div>
    </div>

    <Link
      href="/returns/return-jordan-2025"
      className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
    >
      Start guided review
      <ArrowRight className="size-4" />
    </Link>
  </div>
</section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryItems.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium">
                  {item.title}
                </CardTitle>

                <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                  <Icon className="size-4 text-muted-foreground" />
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-3xl font-semibold tracking-tight">
                  {item.value}
                </p>

                <CardDescription className="mt-1">
                  {item.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <Card>
        <CardHeader className="border-b">
          <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
            <div>
              <CardTitle>Priority work queue</CardTitle>
              <CardDescription className="mt-1">
                Returns ranked by deadline, issue severity, and next
                action.
              </CardDescription>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative min-w-60">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search work queue..."
                  className="pl-9"
                />
              </div>

              <select
                value={priorityFilter}
                onChange={(event) =>
                  setPriorityFilter(
                    event.target.value as Priority | "all",
                  )
                }
                className="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All priorities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>

              <select
                value={ownerFilter}
                onChange={(event) =>
                  setOwnerFilter(
                    event.target.value as
                      | TaxReturn["nextActionOwner"]
                      | "all",
                  )
                }
                className="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All owners</option>
                <option value="preparer">Preparer</option>
                <option value="reviewer">Reviewer</option>
                <option value="client">Client</option>
              </select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {filteredReturns.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <Search className="size-10 text-muted-foreground/50" />

              <h2 className="mt-4 font-semibold">
                No matching returns
              </h2>

              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Adjust your search or filters to see additional work.
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
              {filteredReturns.map((taxReturn) => (
                <div
                  key={taxReturn.id}
                  className="grid gap-5 p-5 transition-colors hover:bg-muted/40 md:grid-cols-[minmax(240px,1.2fr)_minmax(220px,1.5fr)_160px_130px]"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        variant="outline"
                        className={priorityClasses[taxReturn.priority]}
                      >
                        {taxReturn.priority}
                      </Badge>

                      <Badge variant="secondary">
                        {formatStatus(taxReturn.status)}
                      </Badge>
                    </div>

                    <h2 className="mt-3 font-semibold">
                      {taxReturn.clientName}
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {taxReturn.taxYear} {taxReturn.returnType}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Next action
                    </p>

                    <p className="mt-2 text-sm font-medium">
                      {taxReturn.nextAction}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Owned by:{" "}
                      <span className="capitalize">
                        {taxReturn.nextActionOwner}
                      </span>
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        Progress
                      </span>
                      <span className="font-medium">
                        {taxReturn.progress}%
                      </span>
                    </div>

                    <Progress
                      value={taxReturn.progress}
                      className="mt-2"
                    />

                    <p className="mt-3 text-xs text-muted-foreground">
                      Due {formatDeadline(taxReturn.deadline)}
                    </p>
                  </div>

                  <div className="flex items-center md:justify-end">
                    <Link
                      href={`/returns/${taxReturn.id}`}
                      className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-md border bg-background px-3 text-sm font-medium shadow-sm transition-colors hover:bg-muted md:w-auto"
                    >
                      Review
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}