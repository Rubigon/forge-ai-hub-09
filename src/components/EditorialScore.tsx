import { Link } from "@tanstack/react-router";
import { editorialScore, SCORE_AXIS_LABELS, type EditorialScore as Score } from "@/lib/scoring";
import { cn } from "@/lib/utils";
import type { Tool } from "@/types";

/** Puntuación compacta para tarjetas y listados. */
export function ScoreBadge({ tool, className }: { tool: Tool; className?: string }) {
  const score = editorialScore(tool);
  return (
    <span
      className={cn("flex items-baseline gap-1", className)}
      aria-label={`AIForge Score editorial: ${score.overall} sobre 10`}
    >
      <span className="text-sm font-extrabold">{score.overall.toFixed(1)}</span>
      <span className="font-mono text-[10px] text-muted-foreground">/ 10</span>
    </span>
  );
}

/** Bloque completo con los cuatro ejes y enlace a la metodología. */
export function ScorePanel({ tool }: { tool: Tool }) {
  const score = editorialScore(tool);
  const axes = (Object.keys(SCORE_AXIS_LABELS) as (keyof Omit<Score, "overall">)[]).map((key) => ({
    key,
    label: SCORE_AXIS_LABELS[key],
    value: score[key],
  }));

  return (
    <section className="rounded-xl border border-border p-5" aria-labelledby="aiforge-score">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="label-mono text-muted-foreground">AIForge Score</p>
          <h2 id="aiforge-score" className="font-display text-3xl font-extrabold tracking-tight">
            {score.overall.toFixed(1)}
            <span className="ml-1 font-mono text-sm font-normal text-muted-foreground">/ 10</span>
          </h2>
        </div>
        <Link to="/metodologia" className="font-mono text-[11px] text-muted-foreground underline hover:text-foreground">
          Cómo puntuamos
        </Link>
      </div>
      <dl className="space-y-2.5">
        {axes.map((axis) => (
          <div key={axis.key} className="flex items-center gap-3">
            <dt className="w-24 shrink-0 text-xs text-muted-foreground">{axis.label}</dt>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary" style={{ width: `${axis.value * 10}%` }} />
            </div>
            <dd className="w-12 shrink-0 text-right font-mono text-xs">{axis.value.toFixed(1)}/10</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Valoración editorial de AIForge calculada con criterios públicos a partir de los datos catalogados. No son
        opiniones de usuarios ni valoraciones de una comunidad.
      </p>
    </section>
  );
}
