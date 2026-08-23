import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { toolBySlug } from "@/data/tools";
import { formatDate } from "@/lib/seo";
import type { Comparison } from "@/types";
import { ToolMark } from "@/components/ToolCard";

export function ComparisonCard({ comparison }: { comparison: Comparison }) {
  const a = toolBySlug(comparison.toolA);
  const b = toolBySlug(comparison.toolB);

  return (
    <Link
      to="/comparativas/$slug"
      params={{ slug: comparison.slug }}
      className="group flex items-center justify-between gap-4 rounded-xl bg-card p-5 ring-1 ring-border transition-all hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex shrink-0 -space-x-2">
          <ToolMark initials={a?.initials ?? "?"} className="size-10 text-sm ring-2 ring-card" />
          <ToolMark initials={b?.initials ?? "?"} className="size-10 text-sm ring-2 ring-card" />
        </div>
        <div className="min-w-0">
          <h3 className="truncate font-display font-semibold">
            {a?.name} vs {b?.name}
          </h3>
          <p className="truncate text-xs text-muted-foreground">{comparison.summary}</p>
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1">
        <ArrowRight
          className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1"
          aria-hidden
        />
        <span className="font-mono text-[10px] text-muted-foreground">
          Rev. {formatDate(comparison.lastReviewed)}
        </span>
      </div>
    </Link>
  );
}
