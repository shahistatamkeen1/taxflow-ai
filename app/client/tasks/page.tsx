"use client";

import { useRef, useState } from "react";
import {
  CheckCircle2,
  Circle,
  FileText,
  MessageSquareText,
  UploadCloud,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const initialTasks = [
  {
    id: "task-upload-interest",
    title: "Upload a clearer 1099-INT",
    description:
      "Upload a clear image or PDF showing the complete interest amount.",
    dueDate: "July 19",
    type: "upload",
    status: "open",
  },
  {
    id: "task-confirm-mortgage",
    title: "Confirm your mortgage-interest statement",
    description:
      "Let your preparer know which lender statement is the final corrected version.",
    dueDate: "July 19",
    type: "answer",
    status: "open",
  },
  {
    id: "task-review-profile",
    title: "Review personal information",
    description:
      "Confirm that your address, filing status, and contact details are correct.",
    dueDate: "Completed July 16",
    type: "review",
    status: "complete",
  },
];

export default function ClientTasksPage() {
  const uploadInputRef = useRef<HTMLInputElement>(null);

  const [completedIds, setCompletedIds] = useState<string[]>(
    initialTasks
      .filter((task) => task.status === "complete")
      .map((task) => task.id),
  );

  const [activeUploadTaskId, setActiveUploadTaskId] =
    useState<string | null>(null);

  const completedCount = completedIds.length;

  const progress = Math.round(
    (completedCount / initialTasks.length) * 100,
  );

  function completeTask(taskId: string) {
    setCompletedIds((current) =>
      current.includes(taskId) ? current : [...current, taskId],
    );
  }

  function beginUpload(taskId: string) {
    setActiveUploadTaskId(taskId);
    uploadInputRef.current?.click();
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-7 p-4 sm:p-6 lg:p-8">
      <section>
        <Badge variant="secondary" className="mb-3">
          Client Action Center
        </Badge>

        <h1 className="text-3xl font-semibold tracking-tight">
          My tasks
        </h1>

        <p className="mt-2 text-muted-foreground">
          Complete these items so your preparer can continue working on
          your return.
        </p>
      </section>

      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">
              {completedCount} of {initialTasks.length} tasks complete
            </span>
            <span>{progress}%</span>
          </div>

          <Progress value={progress} className="mt-3" />
        </CardContent>
      </Card>

      <input
        ref={uploadInputRef}
        type="file"
        accept=".pdf,.png,.jpg,.jpeg"
        className="hidden"
        onChange={(event) => {
          if (
            event.target.files?.[0] &&
            activeUploadTaskId
          ) {
            completeTask(activeUploadTaskId);
            setActiveUploadTaskId(null);
          }
        }}
      />

      <div className="space-y-4">
        {initialTasks.map((task) => {
          const completed = completedIds.includes(task.id);

          const Icon =
            task.type === "upload"
              ? UploadCloud
              : task.type === "answer"
                ? MessageSquareText
                : FileText;

          return (
            <Card key={task.id}>
              <CardContent className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center">
                <div className="flex flex-1 items-start gap-4">
                  {completed ? (
                    <CheckCircle2 className="mt-0.5 size-6 shrink-0 text-emerald-600" />
                  ) : (
                    <Circle className="mt-0.5 size-6 shrink-0 text-muted-foreground" />
                  )}

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2
                        className={`font-semibold ${
                          completed
                            ? "text-muted-foreground line-through"
                            : ""
                        }`}
                      >
                        {task.title}
                      </h2>

                      <Badge
                        variant={
                          completed ? "secondary" : "outline"
                        }
                      >
                        {completed ? "Complete" : "Action required"}
                      </Badge>
                    </div>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {task.description}
                    </p>

                    <p className="mt-2 text-xs text-muted-foreground">
                      {task.dueDate}
                    </p>
                  </div>
                </div>

                {!completed && (
                  <Button
                    onClick={() => {
                      if (task.type === "upload") {
                        beginUpload(task.id);
                      } else {
                        completeTask(task.id);
                      }
                    }}
                  >
                    <Icon className="mr-2 size-4" />
                    {task.type === "upload"
                      ? "Upload"
                      : task.type === "answer"
                        ? "Confirm"
                        : "Review"}
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}