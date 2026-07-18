import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Clock3,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const stages = [
  {
    title: "Documents received",
    description:
      "Your initial tax documents were uploaded successfully.",
    status: "complete",
    date: "July 15",
  },
  {
    title: "AI document review",
    description:
      "TaxFlow AI extracted values and identified items requiring review.",
    status: "complete",
    date: "July 17",
  },
  {
    title: "Client clarification",
    description:
      "Your preparer is waiting for a clearer 1099-INT and mortgage confirmation.",
    status: "current",
    date: "Current stage",
  },
  {
    title: "CPA preparation",
    description:
      "Your preparer will complete the return after outstanding items are resolved.",
    status: "upcoming",
    date: "Next",
  },
  {
    title: "Final review",
    description:
      "A senior reviewer will inspect the completed return.",
    status: "upcoming",
    date: "Upcoming",
  },
  {
    title: "Ready for filing",
    description:
      "You will receive the completed return for approval.",
    status: "upcoming",
    date: "Upcoming",
  },
];

export default function ClientProgressPage() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-7 p-4 sm:p-6 lg:p-8">
      <section>
        <Badge variant="secondary" className="mb-3">
          2025 Individual Return
        </Badge>

        <h1 className="text-3xl font-semibold tracking-tight">
          Return progress
        </h1>

        <p className="mt-2 text-muted-foreground">
          See what has already happened, what is happening now, and
          what comes next.
        </p>
      </section>

      <Card>
        <CardHeader>
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <CardDescription>Overall completion</CardDescription>
              <CardTitle className="mt-1 text-3xl">68%</CardTitle>
            </div>

            <Badge
              variant="outline"
              className="w-fit border-amber-200 bg-amber-50 text-amber-700"
            >
              Waiting on client
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          <Progress value={68} />

          <p className="mt-3 text-sm text-muted-foreground">
            Your return will continue after two outstanding items are
            completed.
          </p>

          <Link
  href="/client/tasks"
  className={buttonVariants({
    className: "mt-5",
  })}
>
  Complete outstanding tasks
  <ArrowRight className="ml-2 size-4" />
</Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Return timeline</CardTitle>
          <CardDescription>
            Statuses are written in plain language and include the
            owner of the next action.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-0">
            {stages.map((stage, index) => {
              const isComplete = stage.status === "complete";
              const isCurrent = stage.status === "current";

              return (
                <div
                  key={stage.title}
                  className="relative flex gap-4 pb-8 last:pb-0"
                >
                  {index < stages.length - 1 && (
                    <div className="absolute left-[11px] top-7 h-[calc(100%-12px)] w-px bg-border" />
                  )}

                  <div className="relative z-10 bg-background">
                    {isComplete ? (
                      <CheckCircle2 className="size-6 text-emerald-600" />
                    ) : isCurrent ? (
                      <Clock3 className="size-6 text-amber-600" />
                    ) : (
                      <Circle className="size-6 text-muted-foreground" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h2 className="font-semibold">
                        {stage.title}
                      </h2>

                      <span className="text-xs text-muted-foreground">
                        {stage.date}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {stage.description}
                    </p>

                    {isCurrent && (
                      <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                        Next action owner: Jordan Miller
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}