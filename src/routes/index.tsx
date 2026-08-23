import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search } from "lucide-react";
import { articles, articleUrl, featuredArticles } from "@/data/articles";
import { categories } from "@/data/categories";
import { comparisons } from "@/data/comparisons";
import { interactiveApps } from "@/data/apps";
import { freeTools, newTools, popularTools, tools } from "@/data/tools";
import { AdSlot } from "@/components/AdSlot";
import { ArticleCard } from "@/components/ArticleCard";
import { ComparisonCard } from "@/components/ComparisonCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { RecommenderWizard } from "@/components/RecommenderWizard";
import { SectionHeader } from "@/components/SectionHeader";
import { ToolCard } from "@/components/ToolCard";
import { site } from "@/config/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${site.name} | Herramientas, comparativas y recursos de Inteligencia Artificial` },
      { name: "description", content: site.description },
      { property: "og:title", content: `${site.name} | Herramientas y recursos de IA` },
      { property: "og:description", content: site.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function openSearchDialog() {
  window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
}

function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="px-6 pt-24 pb-16">
        <div className="mx-auto max-w-4xl animate-fade-up text-center">
          <h1 className="mb-6 font-display text-5xl leading-[0.95] font-extrabold tracking-tight text-balance md:text-7xl">
            Descubre todo lo que puedes hacer con IA
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg font-medium text-pretty text-muted-foreground">
            Explora herramientas, aprende nuevas técnicas y encuentra la IA adecuada para cada tarea.
          </p>
          <div className="mb-14 flex flex-wrap justify-center gap-4">
            <Link
              to="/herramientas"
              className="rounded-lg bg-primary px-8 py-4 font-semibold text-primary-foreground transition-all hover:shadow-lg active:scale-95"
            >
              Explorar herramientas
            </Link>
            <Link
              to="/comparativas"
              className="rounded-lg border border-border bg-card px-8 py-4 font-semibold transition-all hover:bg-accent active:scale-95"
            >
              Ver comparativas
            </Link>
          </div>

          {/* Buscador global */}
          <button
            type="button"
            onClick={openSearchDialog}
            className="group mx-auto flex w-full max-w-2xl items-center gap-4 rounded-2xl border border-border bg-card py-5 pr-6 pl-5 text-left shadow-sm transition-all hover:ring-2 hover:ring-primary/10"
            aria-label="Abrir buscador global"
          >
            <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden />
            <span className="flex-1 text-muted-foreground/70">
              Buscar herramientas, guías o comparativas…
            </span>
            <kbd className="rounded border border-border px-2 py-1 font-mono text-xs text-muted-foreground">⌘K</kbd>
          </button>
        </div>
      </section>

      {/* Herramientas populares */}
      <section className="mx-auto max-w-7xl px-6 py-16" aria-labelledby="populares">
        <SectionHeader
          title="Herramientas populares"
          subtitle="Las más consultadas por la comunidad. Datos demo."
          linkTo="/herramientas"
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {popularTools.slice(0, 4).map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {/* Utilidades propias */}
      <section className="border-y border-border bg-muted/30 px-6 py-16" aria-labelledby="utilidades">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title="Utilidades de AIForge"
            subtitle="Herramientas interactivas que funcionan en tu navegador, sin registro."
            linkTo="/herramientas"
            linkLabel="VER TODAS"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {interactiveApps.map((app) => (
              <Link
                key={app.slug}
                to="/herramientas/$slug"
                params={{ slug: app.slug }}
                className="group rounded-xl bg-card p-5 ring-1 ring-border transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <p className="label-mono mb-3 text-muted-foreground">{app.category}</p>
                <h3 className="mb-1 font-display font-semibold group-hover:underline">{app.name}</h3>
                <p className="text-sm text-muted-foreground">{app.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recomendador */}
      <section className="bg-forge px-6 py-24 text-forge-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 font-display text-4xl font-extrabold tracking-tight">
              La Forja: encuentra tu IA ideal
            </h2>
            <p className="mb-10 text-lg text-forge-muted">
              Responde 3 preguntas y te recomendamos las herramientas que encajan con tu objetivo, presupuesto y
              nivel — con la razón de cada recomendación.
            </p>
            <ol className="space-y-4">
              {["Define tu objetivo principal", "Establece tu presupuesto mensual", "Elige tu nivel de experiencia"].map(
                (label, i) => (
                  <li key={label} className="flex items-center gap-4">
                    <span className="flex size-10 items-center justify-center rounded-full border border-forge-border font-mono text-xs">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-medium text-forge-foreground/90">{label}</span>
                  </li>
                ),
              )}
            </ol>
          </div>
          <RecommenderWizard />
        </div>
      </section>

      {/* Comparativas destacadas */}
      <section className="mx-auto max-w-7xl px-6 py-16" aria-labelledby="comparativas">
        <SectionHeader
          title="Comparativas destacadas"
          subtitle="Análisis lado a lado, con tabla y recomendación por perfil."
          linkTo="/comparativas"
        />
        <div className="grid gap-4 lg:grid-cols-2">
          {comparisons.slice(0, 4).map((c) => (
            <ComparisonCard key={c.slug} comparison={c} />
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6">
        <AdSlot position="in-content" />
      </div>

      {/* Novedades y gratuitas */}
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2">
        <div aria-labelledby="nuevas">
          <SectionHeader title="Recién llegadas" subtitle="Últimas incorporaciones al directorio." />
          <ul className="space-y-3">
            {newTools.map((tool) => (
              <li key={tool.slug}>
                <Link
                  to="/herramientas/$slug"
                  params={{ slug: tool.slug }}
                  className="group flex items-center justify-between rounded-xl bg-card p-4 ring-1 ring-border transition-shadow hover:shadow-lg"
                >
                  <div>
                    <p className="font-semibold group-hover:underline">{tool.name}</p>
                    <p className="text-xs text-muted-foreground">{tool.tagline}</p>
                  </div>
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div aria-labelledby="gratuitas">
          <SectionHeader title="Con plan gratuito" subtitle="Empieza sin pagar nada." />
          <ul className="space-y-3">
            {freeTools.slice(0, 5).map((tool) => (
              <li key={tool.slug}>
                <Link
                  to="/herramientas/$slug"
                  params={{ slug: tool.slug }}
                  className="group flex items-center justify-between rounded-xl bg-card p-4 ring-1 ring-border transition-shadow hover:shadow-lg"
                >
                  <div>
                    <p className="font-semibold group-hover:underline">{tool.name}</p>
                    <p className="text-xs text-muted-foreground">{tool.tagline}</p>
                  </div>
                  <span className="label-mono shrink-0 rounded bg-success/10 px-2 py-1 text-success">Gratis</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Categorías */}
      <section className="border-y border-border bg-muted/30 px-6 py-16" aria-labelledby="categorias">
        <div className="mx-auto max-w-7xl">
          <SectionHeader title="Explora por categoría" linkTo="/directorio-ia" linkLabel="DIRECTORIO COMPLETO" />
          <ul className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const count = tools.filter((t) => t.category === cat.slug).length;
              return (
                <li key={cat.slug}>
                  <Link
                    to="/directorio-ia"
                    search={{ categoria: cat.slug }}
                    className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
                  >
                    {cat.name}
                    <span className="font-mono text-[10px] text-muted-foreground">{count}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Artículos destacados */}
      <section className="mx-auto max-w-7xl px-6 py-16" aria-labelledby="articulos">
        <SectionHeader
          title="Artículos destacados"
          subtitle="Guías y tutoriales revisados por personas, con fuentes citadas."
          linkTo="/blog"
          linkLabel="VER BLOG"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {featuredArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      {/* Recursos */}
      <section className="border-t border-border px-6 py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 rounded-2xl bg-forge p-8 text-forge-foreground sm:p-12 lg:grid-cols-2">
          <div>
            <p className="label-mono mb-4 text-forge-muted">Recurso gratuito</p>
            <h2 className="mb-4 font-display text-3xl font-extrabold tracking-tight">
              Guía práctica de IA para estudiantes y programadores
            </h2>
            <p className="mb-8 text-forge-muted">
              Nuestro recurso descargable con las estructuras de prompt, flujos de trabajo y herramientas que usamos
              a diario. Suscríbete y te la enviaremos cuando esté lista.
            </p>
            <Link
              to="/recursos"
              className="inline-flex items-center gap-2 rounded-lg bg-forge-foreground px-6 py-3 text-sm font-semibold text-forge transition-opacity hover:opacity-90"
            >
              Ver recursos <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="rounded-xl border border-forge-border bg-forge-card p-6">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </main>
  );
}
