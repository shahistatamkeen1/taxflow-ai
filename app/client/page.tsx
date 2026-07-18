"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  MessageSquareText,
  UploadCloud,
} from "lucide-react";

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
import { Progress } from "@/components/ui/progress";

export default function ClientHomePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFileName, setUploadedFileName] =
    useState<string | null>(null);

  function handleUpload(file?: File) {
    if (!file) {
      return;
    }

    setUploadedFileName(file.name);
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-7 p-4 sm:p-6 lg:p-8">
      <section>
        <Badge variant="secondary" className="mb-3">
          2025 Individual Return
        </Badge>

        <h1 className="text-3xl font-semibold tracking-tight">
          Welcome, Jordan
        </h1>

        <p className="mt-2 text-muted-foreground">
          Complete the next step below to help your tax preparer
          continue.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Return progress</CardDescription>
            <CardTitle className="text-3xl">68%</CardTitle>
          </CardHeader>

          <CardContent>
            <Progress value={68} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Outstanding tasks</CardDescription>
            <CardTitle className="text-3xl">2</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Unread messages</CardDescription>
            <CardTitle className="text-3xl">1</CardTitle>
          </CardHeader>
        </Card>
      </section>

      {uploadedFileName ? (
        <Card className="border-emerald-200 bg-emerald-50">
          <CardContent className="flex items-start gap-4 p-6 text-emerald-900">
            <CheckCircle2 className="mt-0.5 size-6 shrink-0" />

            <div>
              <h2 className="font-semibold">
                Document uploaded successfully
              </h2>

              <p className="mt-1 text-sm">
                {uploadedFileName} was added to your return. Your tax
                preparer will review it next.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-primary/30 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <UploadCloud className="size-5" />
              </div>

              <div>
                <CardDescription>Your next step</CardDescription>
                <CardTitle className="mt-1">
                  Upload a clearer 1099-INT
                </CardTitle>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              The interest amount on your current document is difficult
              to confirm. Upload a clearer image or PDF from Lakeside
              Bank.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                className="hidden"
                onChange={(event) =>
                  handleUpload(event.target.files?.[0])
                }
              />

              <Button
                onClick={() => fileInputRef.current?.click()}
              >
                <UploadCloud className="mr-2 size-4" />
                Upload document
              </Button>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock3 className="size-4" />
                Due July 19
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <section className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Outstanding tasks</CardTitle>
            <CardDescription>
              Items needed to complete your return
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 rounded-lg border p-4">
              <FileText className="mt-0.5 size-5 text-muted-foreground" />

              <div>
                <p className="text-sm font-medium">
                  Upload a clearer 1099-INT
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Due July 19
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border p-4">
              <MessageSquareText className="mt-0.5 size-5 text-muted-foreground" />

              <div>
                <p className="text-sm font-medium">
                  Confirm your mortgage-interest statement
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Two different amounts were detected.
                </p>
              </div>
            </div>

            <Link
  href="/client/tasks"
  className={buttonVariants({
    variant: "outline",
    className: "w-full",
  })}
>
  View all tasks
  <ArrowRight className="ml-2 size-4" />
</Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Return progress</CardTitle>
            <CardDescription>
              What has happened and what comes next
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3">
                <CheckCircle2 className="mt-0.5 size-5 text-emerald-600" />
                <div>
                  <p className="text-sm font-medium">
                    Initial documents received
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Completed July 15
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <CheckCircle2 className="mt-0.5 size-5 text-emerald-600" />
                <div>
                  <p className="text-sm font-medium">
                    AI document review completed
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Completed July 17
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Clock3 className="mt-0.5 size-5 text-amber-600" />
                <div>
                  <p className="text-sm font-medium">
                    Waiting for your documents
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Current stage
                  </p>
                </div>
              </div>
            </div>

            <Link
  href="/client/progress"
  className={buttonVariants({
    variant: "outline",
    className: "mt-6 w-full",
  })}
>
  View full progress
  <ArrowRight className="ml-2 size-4" />
</Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}