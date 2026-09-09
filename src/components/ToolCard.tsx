import { Link } from "@tanstack/react-router";
import { pricingLabels } from "@/data/tools";
import { ScoreBadge } from "@/components/EditorialScore";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { translateTagline } from "@/i18n/content";
import type { MessageKey } from "@/i18n/ui";
import type { Tool } from "@/types";

export function ToolMark({ initials, className }: { initials: string; className?: string }) {
  return (
    <div
      className={cn(
        "flex size-12 items-center justify-center rounded-lg border border-border bg-muted font-display text-lg font-extrabold",
        className,
      )}
      aria-hidden
    >
      {initials}
    </div>
  );
}

const pricingKeys: Record<string, MessageKey> = {
  gratis: "label.free",
  freemium: "label.freemium",
  pago: "label.paid",
  "de-pago": "label.paid",
};

/** Etiqueta de precio traducida, con el texto español como respaldo. */
export function usePricingLabel(pricing: Tool["pricing"]) {
  const { t } = useI18n();
  const key = pricingKeys[pricing];
  return key ? t(key) : pricingLabels[pricing];
}

export function PricingBadge({ pricing, className }: { pricing: Tool["pricing"]; className?: string }) {
  const label = usePricingLabel(pricing);
  return (
    <span
      className={cn(
        "label-mono rounded px-2 py-1",
        pricing === "gratis" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground",
        className,
      )}
    >
      {label}
    </span>
  );
}

export function Rating({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("flex items-center gap-1", className)} aria-label={`${value} / 5`}>
      <span className="text-sm font-extrabold">{value.toFixed(1)}</span>
      <span className="font-mono text-[10px] text-muted-foreground">/ 5.0</span>
    </span>
  );
}

/** Descripción breve de una herramienta en el idioma activo. */
export function useTagline(tool: Pick<Tool, "slug" | "tagline">) {
  const { locale } = useI18n();
  return translateTagline(tool.slug, tool.tagline, locale);
}

export function ToolCard({ tool }: { tool: Tool }) {
  const { t } = useI18n();
  const tagline = useTagline(tool);

  return (
    <Link
      to="/herramientas/$slug"
      params={{ slug: tool.slug }}
      className="group block rounded-xl bg-card p-6 ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="mb-6 flex items-start justify-between">
        <ToolMark initials={tool.initials} />
        <PricingBadge pricing={tool.pricing} />
      </div>
      <h3 className="mb-1 font-display text-lg font-semibold">{tool.name}</h3>
      <p className="mb-6 line-clamp-2 text-sm text-muted-foreground">{tagline}</p>
      <div className="flex items-center justify-between border-t border-border pt-4">
        <ScoreBadge tool={tool} />
        <span className="font-mono text-[11px] uppercase text-muted-foreground">{t("label.score")}</span>
      </div>
    </Link>
  );
}
