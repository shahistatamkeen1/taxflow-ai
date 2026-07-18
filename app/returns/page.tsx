import { taxReturns } from "@/data/returns";

export default function ReturnsPage() {
  return (
    <div className="mx-auto max-w-7xl p-6 lg:p-8">
      <h1 className="text-3xl font-semibold tracking-tight">
        Tax Returns
      </h1>

      <p className="mt-2 text-muted-foreground">
        Review and manage all client returns.
      </p>

      <div className="mt-8 grid gap-4">
        {taxReturns.map((taxReturn) => (
          <a
            key={taxReturn.id}
            href={`/returns/${taxReturn.id}`}
            className="rounded-xl border bg-card p-5 transition-colors hover:bg-muted/50"
          >
            <p className="font-semibold">{taxReturn.clientName}</p>

            <p className="mt-1 text-sm text-muted-foreground">
              {taxReturn.taxYear} {taxReturn.returnType}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}