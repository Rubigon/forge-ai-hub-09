import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ScoreBadge } from "@/components/EditorialScore";
import { difficultyLabel } from "@/lib/scoring";
import { comparisonBySlug } from "@/data/comparisons";
import { toolBySlug } from "@/data/tools";
import { breadcrumbJsonLd, comparisonJsonLd, formatDate } from "@/lib/seo";
import { AdSlot } from "@/components/AdSlot";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ComparisonTable } from "@/components/ComparisonTable";
import { RelatedContent } from "@/components/RelatedContent";

const BASE_DOMAIN = "https://www.forge-ai-hub.com";

export const Route = createFileRoute("/comparativas/$slug")({
  loader: ({ params }) => {
    if (!comparisonBySlug(params.slug)) throw notFound();
    return { slug: params.slug };
  },
  head: ({ params }) => {
    const c = comparisonBySlug(params.slug);
    if (!c) {
      return { meta: [{ title: "Comparativa no encontrada — Forge AI Hub" }, { name: "robots", content: "noindex" }] };
    }
    const fullUrl = `${BASE_DOMAIN}/comparativas/${c.slug}`;
    const title = `${c.title}: ¿Cuál es mejor en 2026? | Forge AI Hub`;
    const description = `Comparativa detallada: ${c.title}. Analizamos diferencias clave, precio, rendimiento y características para ayudarte a elegir.`;

    return {
      meta: [
        { title },
        { name: "description", content: description.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: description.slice(0, 155) },
        { property: "og:type", content: "article" },
        { property: "og:url", content: fullUrl },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: fullUrl }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(comparisonJsonLd(c, fullUrl)) },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Inicio", url: `${BASE_DOMAIN}/` },
              { name: "Comparativas", url: `${BASE_DOMAIN}/comparativas` },
              { name: c.title, url: fullUrl },
            ]),
          ),
        },
      ],
    };
  },
  component: ComparativaDetalle,
});

function ScoreBar({ label, a, b, nameA, nameB }: { label: string; a: number; b: number; nameA: string; nameB: string }) {
  return (
    <div>
      <p className="label-mono mb-3 text-muted-foreground">{label}</p>
      <div className="space-y-3">
        {[
          { name: nameA, value: a },
          { name: nameB, value: b },
        ].map((row) => (
          <div key={row.name}>
            <div className="mb-1 flex justify-between text-xs">
              <span className="font-medium">{row.name}</span>
              <span className="font-mono text-muted-foreground">{row.value.toFixed(1)}/5</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary" style={{ width: `${(row.value / 5) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComparativaDetalle() {
  const { slug } = Route.useLoaderData();
  const comparison = comparisonBySlug(slug);
  if (!comparison) return null;

  const a = toolBySlug(comparison.toolA);
  const b = toolBySlug(comparison.toolB);
  const nameA = a?.name ?? comparison.toolA;
  const nameB = b?.name ?? comparison.toolB;

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <Breadcrumbs
        crumbs={[
          { name: "Inicio", url: "/" },
          { name: "Comparativas", url: "/comparativas" },
          { name: comparison.title, url: `/comparativas/${comparison.slug}` },
        ]}
      />
      <header className="mb-10">
        <h1 className="mb-4 font-display text-4xl leading-tight font-extrabold tracking-tight text-balance">
          {comparison.title}
        </h1>
        <p className="text-lg leading-relaxed text-muted-foreground">{comparison.summary}</p>
        <p className="mt-4 font-mono text-xs text-muted-foreground">
          Última revisión: {formatDate(comparison.lastReviewed)}
        </p>
      </header>

      <AdSlot position="top-content" className="mb-10" />

      <section className="mb-12 grid gap-4 sm:grid-cols-2" aria-labelledby="resumen">
        <h2 id="resumen" className="sr-only">
          Resumen rápido
        </h2>
        {[a, b].map((tool, i) =>
          tool ? (
            <article key={tool.slug} className="rounded-xl border border-border p-5">
              <div className="mb-3 flex items-start justify-between gap-3">
                <h3 className="font-display text-lg font-semibold">{tool.name}</h3>
                <ScoreBadge tool={tool} />
              </div>
              <dl className="mb-4 space-y-1.5 text-sm text-muted-foreground">
                <div className="flex justify-between gap-3">
                  <dt>Precio</dt>
                  <dd className="text-right font-medium text-foreground">{tool.priceNote}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt>Plan gratuito</dt>
                  <dd className="font-medium text-foreground">{tool.freeTier ? "Sí" : "No"}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt>Nivel</dt>
                  <dd className="font-medium text-foreground">{difficultyLabel(tool)}</dd>
                </div>
              </dl>
              <Link
                to="/herramientas/$slug"
                params={{ slug: tool.slug }}
                className="inline-flex rounded-lg border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-accent"
              >
                Ver ficha de {tool.name}
              </Link>
            </article>
          ) : (
            <p key={i} className="rounded-xl border border-dashed border-border p-5 text-sm text-muted-foreground">
              Ficha no disponible.
            </p>
          ),
        )}
      </section>

      <section className="mb-12" aria-labelledby="tabla">
        <h2 id="tabla" className="mb-4 font-display text-2xl font-bold tracking-tight">
          Comparativa característica a característica
        </h2>
        <ComparisonTable comparison={comparison} />
      </section>

      <section className="mb-12 grid gap-8 rounded-xl border border-border p-6 sm:grid-cols-2" aria-labelledby="scores">
        <h2 id="scores" className="sr-only">
          Puntuaciones
        </h2>
        <ScoreBar label="Facilidad de uso" a={comparison.easeOfUse.a} b={comparison.easeOfUse.b} nameA={nameA} nameB={nameB} />
        <ScoreBar label="Rendimiento" a={comparison.performance.a} b={comparison.performance.b} nameA={nameA} nameB={nameB} />
      </section>

      <section className="mb-12 grid gap-6 sm:grid-cols-2" aria-labelledby="pros-cons">
        <h2 id="pros-cons" className="sr-only">
          Ventajas y limitaciones
        </h2>
        {[
          { name: nameA, pros: comparison.prosA, cons: comparison.consA },
          { name: nameB, pros: comparison.prosB, cons: comparison.consB },
        ].map((col) => (
          <div key={col.name} className="rounded-xl bg-card p-5 ring-1 ring-border">
            <h3 className="mb-4 font-display font-semibold">{col.name}</h3>
            <p className="label-mono mb-2 text-muted-foreground">A favor</p>
            <ul className="mb-4 space-y-1.5 text-sm">
              {col.pros.map((p) => (
                <li key={p}>+ {p}</li>
              ))}
            </ul>
            <p className="label-mono mb-2 text-muted-foreground">En contra</p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {col.cons.map((c) => (
                <li key={c}>− {c}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-12" aria-labelledby="veredicto">
        <h2 id="veredicto" className="mb-4 font-display text-2xl font-bold tracking-tight">
          Veredicto
        </h2>
        <p className="mb-6 leading-relaxed text-muted-foreground">{comparison.conclusion}</p>
        <ul className="grid gap-3">
          {comparison.recommendations.map((rec) => (
            <li key={rec.profile} className="rounded-xl bg-muted/60 p-4">
              <p className="label-mono mb-1 text-muted-foreground">{rec.profile}</p>
              <p className="text-sm">
                <span className="font-semibold">{rec.pick}</span> — {rec.reason}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <RelatedContent tools={[comparison.toolA, comparison.toolB]} />
      <AdSlot position="bottom-content" className="mt-10" />
    </main>
  );
}
