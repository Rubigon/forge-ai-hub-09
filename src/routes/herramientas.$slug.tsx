import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight, Check, X } from "lucide-react";
import { toolBySlug, pricingLabels } from "@/data/tools";
import { appBySlug } from "@/data/apps";
import { comparisonsForTool } from "@/data/comparisons";
import { breadcrumbJsonLd, formatDate, softwareApplicationJsonLd } from "@/lib/seo";
import { AdSlot } from "@/components/AdSlot";
import { AppPage } from "@/components/AppPage";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ComparisonCard } from "@/components/ComparisonCard";
import { RelatedContent } from "@/components/RelatedContent";
import { PromptOptimizer } from "@/components/apps/PromptOptimizer";
import { CostCalculator } from "@/components/apps/CostCalculator";
import { TokenCalculator } from "@/components/apps/TokenCalculator";
import { JsonFormatter } from "@/components/apps/JsonFormatter";
import { RegexTester } from "@/components/apps/RegexTester";
import { TextAnalyzer } from "@/components/apps/TextAnalyzer";
import type { Tool } from "@/types";

const appComponents: Record<string, () => React.JSX.Element> = {
  "optimizador-de-prompts": PromptOptimizer,
  "calculadora-costes-ia": CostCalculator,
  "contador-de-tokens": TokenCalculator,
  "formateador-json": JsonFormatter,
  "probador-regex": RegexTester,
  "analizador-de-texto": TextAnalyzer,
};

export const Route = createFileRoute("/herramientas/$slug")({
  loader: ({ params }) => {
    const app = appBySlug(params.slug);
    const tool = toolBySlug(params.slug);
    if (!app && !tool) throw notFound();
    return { slug: params.slug };
  },
  head: ({ params }) => {
    const app = appBySlug(params.slug);
    const tool = toolBySlug(params.slug);
    const url = `/herramientas/${params.slug}`;
    if (app) {
      return {
        meta: [
          { title: `${app.name} gratis online — AIForge` },
          { name: "description", content: app.description },
          { property: "og:title", content: `${app.name} — AIForge` },
          { property: "og:description", content: app.description },
          { property: "og:type", content: "website" },
          { property: "og:url", content: url },
          { name: "twitter:card", content: "summary" },
        ],
        links: [{ rel: "canonical", href: url }],
      };
    }
    if (!tool) {
      return { meta: [{ title: "Herramienta no encontrada — AIForge" }, { name: "robots", content: "noindex" }] };
    }
    return {
      meta: [
        { title: `${tool.name}: análisis, precios y alternativas — AIForge` },
        { name: "description", content: tool.description.slice(0, 155) },
        { property: "og:title", content: `${tool.name} — análisis y precios` },
        { property: "og:description", content: tool.tagline },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(softwareApplicationJsonLd(tool, url)) },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Inicio", url: "/" },
              { name: "Herramientas", url: "/herramientas" },
              { name: tool.name, url },
            ]),
          ),
        },
      ],
    };
  },
  component: SlugPage,
});

function SlugPage() {
  const { slug } = Route.useLoaderData();
  const app = appBySlug(slug);

  if (app) {
    const AppComponent = appComponents[app.slug];
    return <AppPage app={app}>{AppComponent ? <AppComponent /> : <p>Utilidad en preparación.</p>}</AppPage>;
  }

  const tool = toolBySlug(slug);
  if (!tool) return null;
  return <ToolDetail tool={tool} />;
}

function ToolDetail({ tool }: { tool: Tool }) {
  const comparisons = comparisonsForTool(tool.slug);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <Breadcrumbs
        crumbs={[
          { name: "Inicio", url: "/" },
          { name: "Herramientas", url: "/herramientas" },
          { name: tool.name, url: `/herramientas/${tool.slug}` },
        ]}
      />

      <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
        <div className="max-w-3xl">
          <header className="mb-10 flex flex-wrap items-start gap-5">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-primary font-mono text-lg font-bold text-primary-foreground">
              {tool.initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="label-mono mb-2 text-muted-foreground">{tool.category}</p>
              <h1 className="mb-2 font-display text-4xl font-extrabold tracking-tight">{tool.name}</h1>
              <p className="text-lg text-muted-foreground">{tool.tagline}</p>
            </div>
          </header>

          <dl className="mb-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-border sm:grid-cols-4">
            {[
              { k: "Modelo", v: pricingLabels[tool.pricing] },
              { k: "Precio", v: tool.priceNote },
              { k: "Plan gratis", v: tool.freeTier ? "Sí" : "No" },
              { k: "Valoración", v: `${tool.rating.toFixed(1)}/5` },
            ].map((item) => (
              <div key={item.k} className="bg-card p-4">
                <dt className="label-mono mb-1 text-muted-foreground">{item.k}</dt>
                <dd className="text-sm font-semibold">{item.v}</dd>
              </div>
            ))}
          </dl>

          <section className="prose-block mb-10" aria-labelledby="que-es">
            <h2 id="que-es" className="mb-3 font-display text-2xl font-bold tracking-tight">
              Qué es {tool.name}
            </h2>
            <p className="leading-relaxed text-muted-foreground">{tool.description}</p>
          </section>

          <AdSlot position="in-content" className="mb-10" />

          <section className="mb-10" aria-labelledby="funciones">
            <h2 id="funciones" className="mb-4 font-display text-2xl font-bold tracking-tight">
              Funciones principales
            </h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {tool.features.map((f) => (
                <li key={f} className="flex gap-2 rounded-lg bg-muted/60 px-4 py-3 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-10 grid gap-6 sm:grid-cols-2" aria-labelledby="pros-contras">
            <h2 id="pros-contras" className="sr-only">
              Ventajas y limitaciones
            </h2>
            <div className="rounded-xl border border-border p-5">
              <p className="label-mono mb-4 text-muted-foreground">Ventajas</p>
              <ul className="space-y-2 text-sm">
                {tool.pros.map((p) => (
                  <li key={p} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border p-5">
              <p className="label-mono mb-4 text-muted-foreground">Limitaciones</p>
              <ul className="space-y-2 text-sm">
                {tool.cons.map((c) => (
                  <li key={c} className="flex gap-2">
                    <X className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mb-10" aria-labelledby="casos-uso">
            <h2 id="casos-uso" className="mb-4 font-display text-2xl font-bold tracking-tight">
              Casos de uso reales
            </h2>
            <ol className="space-y-3">
              {tool.useCases.map((u, i) => (
                <li key={u} className="flex gap-4 border-b border-border pb-3 text-sm last:border-0">
                  <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  <span>{u}</span>
                </li>
              ))}
            </ol>
          </section>

          {comparisons.length > 0 && (
            <section className="mb-10" aria-labelledby="comparativas-tool">
              <h2 id="comparativas-tool" className="mb-4 font-display text-2xl font-bold tracking-tight">
                Comparativas con {tool.name}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {comparisons.map((c) => (
                  <ComparisonCard key={c.slug} comparison={c} />
                ))}
              </div>
            </section>
          )}

          <p className="mb-10 rounded-xl bg-muted/60 p-4 font-mono text-xs text-muted-foreground">
            Última revisión editorial: {formatDate(tool.lastReviewed)}. Datos de demostración con fines académicos;
            verifica precios en la web oficial.
          </p>

          <RelatedContent tools={tool.alternatives} />
          <AdSlot position="bottom-content" className="mt-10" />
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            <div className="rounded-xl border border-border p-5">
              <p className="label-mono mb-3 text-muted-foreground">Acceso</p>
              <a
                href={tool.officialUrl}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Ir a la web oficial <ArrowUpRight className="size-4" aria-hidden />
              </a>
              <p className="mt-3 text-xs text-muted-foreground">Enlace externo. AIForge no gestiona esta plataforma.</p>
            </div>
            {tool.alternatives.length > 0 && (
              <nav className="rounded-xl border border-border p-5" aria-label="Alternativas">
                <p className="label-mono mb-3 text-muted-foreground">Alternativas</p>
                <ul className="space-y-2 text-sm">
                  {tool.alternatives.map((alt) => {
                    const altTool = toolBySlug(alt);
                    if (!altTool) return null;
                    return (
                      <li key={alt}>
                        <Link
                          to="/herramientas/$slug"
                          params={{ slug: alt }}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          {altTool.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            )}
            <AdSlot position="sidebar" />
          </div>
        </aside>
      </div>
    </main>
  );
}
