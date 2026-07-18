"use client";

import { useParams } from "next/navigation";
import { FileQuestion } from "lucide-react";

import { ReturnReviewWorkspace } from "@/components/return-review/ReturnReviewWorkspace";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { taxReturns } from "@/data/returns";

export default function ReturnReviewPage() {
  const params = useParams<{ returnId: string }>();

  const taxReturn = taxReturns.find(
    (item) => item.id === params.returnId,
  );

  if (!taxReturn) {
    return (
      <div className="mx-auto max-w-3xl p-6 lg:p-8">
        <Card>
          <CardContent className="flex flex-col items-center p-10 text-center">
            <FileQuestion className="size-12 text-muted-foreground" />

            <CardTitle className="mt-5">
              Tax return not found
            </CardTitle>

            <CardDescription className="mt-2">
              The requested return does not exist in the prototype
              dataset.
            </CardDescription>

            <a
  href="/dashboard"
  className={buttonVariants({
    className: "mt-6",
  })}
>
  Return to dashboard
</a>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <ReturnReviewWorkspace taxReturn={taxReturn} />;
}