import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  MessageSquareText,
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

const requests = [
  {
    id: "request-001",
    title: "Upload a clearer 1099-INT",
    description:
      "The interest amount cannot be confirmed from the current document image.",
    client: "Jordan Miller",
    relatedItem: "Taxable interest",
    owner: "Client",
    dueDate: "July 19, 2026",
    status: "Waiting on client",
    priority: "High",
  },
  {
    id: "request-002",
    title: "Confirm mortgage-interest amount",
    description:
      "Two uploaded documents contain different mortgage-interest totals.",
    client: "Jordan Miller",
    relatedItem: "Mortgage interest",
    owner: "Maya Chen",
    dueDate: "July 18, 2026",
    status: "Open",
    priority: "Critical",
  },
  {
    id: "request-003",
    title: "Provide missing W-2",
    description:
      "A W-2 from the client's previous employer has not yet been uploaded.",
    client: "Olivia Parker",
    relatedItem: "Wages",
    owner: "Client",
    dueDate: "July 21, 2026",
    status: "Waiting on client",
    priority: "High",
  },
];

function getStatusIcon(status: string) {
  if (status === "Resolved") {
    return CheckCircle2;
  }

  if (status === "Waiting on client") {
    return Clock3;
  }

  return MessageSquareText;
}

export default function RequestsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-7 p-4 sm:p-6 lg:p-8">
      <section>
        <Badge variant="secondary" className="mb-3">
          Collaboration
        </Badge>

        <h1 className="text-3xl font-semibold tracking-tight">
          Client Requests
        </h1>

        <p className="mt-2 text-muted-foreground">
          Track document requests, tax questions, ownership, and client
          responses.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Open requests</CardDescription>
            <CardTitle className="text-3xl">8</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Waiting on clients</CardDescription>
            <CardTitle className="text-3xl">5</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Due this week</CardDescription>
            <CardTitle className="text-3xl">4</CardTitle>
          </CardHeader>
        </Card>
      </section>

      <Card>
        <CardHeader className="border-b">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <CardTitle>Outstanding requests</CardTitle>
              <CardDescription className="mt-1">
                Every request is connected to a client and a specific tax
                issue.
              </CardDescription>
            </div>

            <Button>Create request</Button>
          </div>
        </CardHeader>

        <CardContent className="divide-y p-0">
          {requests.map((request) => {
            const StatusIcon = getStatusIcon(request.status);

            return (
              <article
                key={request.id}
                className="grid gap-5 p-5 transition-colors hover:bg-muted/40 lg:grid-cols-[1.5fr_1fr_auto]"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant={
                        request.priority === "Critical"
                          ? "destructive"
                          : "outline"
                      }
                    >
                      {request.priority}
                    </Badge>

                    <Badge variant="secondary">
                      <StatusIcon className="mr-1 size-3" />
                      {request.status}
                    </Badge>
                  </div>

                  <h2 className="mt-3 font-semibold">{request.title}</h2>

                  <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                    {request.description}
                  </p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <UserRound className="size-4 text-muted-foreground" />
                    <span>{request.client}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FileText className="size-4 text-muted-foreground" />
                    <span>{request.relatedItem}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarDays className="size-4 text-muted-foreground" />
                    <span>Due {request.dueDate}</span>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Next action owner:{" "}
                    <span className="font-medium text-foreground">
                      {request.owner}
                    </span>
                  </p>
                </div>

                <div className="flex items-center">
                  <Button variant="outline">Open request</Button>
                </div>
              </article>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}