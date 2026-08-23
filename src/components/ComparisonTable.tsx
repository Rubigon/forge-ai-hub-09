import { Check, Minus } from "lucide-react";
import { toolBySlug } from "@/data/tools";
import { cn } from "@/lib/utils";
import type { Comparison } from "@/types";

/** Tabla comparativa reutilizable. Celdas ganadoras resaltadas en esmeralda. */
export function ComparisonTable({ comparison }: { comparison: Comparison }) {
  const a = toolBySlug(comparison.toolA);
  const b = toolBySlug(comparison.toolB);

  return (
    <div className="overflow-x-auto rounded-xl bg-card ring-1 ring-border">
      <table className="w-full min-w-[540px] text-left text-sm">
        <caption className="sr-only">{comparison.title}</caption>
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th scope="col" className="px-4 py-3 font-medium">
              Característica
            </th>
            <th scope="col" className="px-4 py-3 text-center font-semibold">
              {a?.name ?? comparison.toolA}
            </th>
            <th scope="col" className="px-4 py-3 text-center font-semibold">
              {b?.name ?? comparison.toolB}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {comparison.rows.map((row) => (
            <tr key={row.feature}>
              <th scope="row" className="px-4 py-3 font-medium text-muted-foreground">
                {row.feature}
              </th>
              <td className={cn("px-4 py-3 text-center", row.winner === "a" && "font-medium text-success")}>
                <CellValue value={row.a} winner={row.winner === "a"} />
              </td>
              <td className={cn("px-4 py-3 text-center", row.winner === "b" && "font-medium text-success")}>
                <CellValue value={row.b} winner={row.winner === "b"} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CellValue({ value, winner }: { value: string; winner: boolean }) {
  return (
    <span className="inline-flex items-center justify-center gap-1.5">
      {winner ? (
        <Check className="size-3.5" aria-hidden />
      ) : (
        <Minus className="size-3.5 text-muted-foreground/40" aria-hidden />
      )}
      {value}
    </span>
  );
}
