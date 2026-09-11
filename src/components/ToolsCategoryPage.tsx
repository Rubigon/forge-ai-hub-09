import { useMemo, useState } from "react";
import { categories, categoryBySlug } from "@/data/categories";
import { useI18n } from "@/lib/i18n";
import { translateCategoryName } from "@/i18n/content";
import { pricingLabels, tools, toolsByCategory } from "@/data/tools";
import { interactiveApps } from "@/data/apps";
import { ToolCard } from "@/components/ToolCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { cn } from "@/lib/utils";
import type { CategorySlug, PricingModel } from "@/types";
import { Link } from "@tanstack/react-router";

const pricingFilters: (PricingModel | "todas")[] = ["todas", "gratis", "freemium", "pago"];

/** Listado de herramientas con filtros. Usado por el hub, las categorías y el directorio. */
export function ToolsCategoryPage({
  categorySlug,
  title,
  description,
}: {
  categorySlug?: CategorySlug;
  title: string;
  description: string;
}) {
  const [pricing, setPricing] = useState<PricingModel | "todas">("todas");

  const filtered = useMemo(() => {
    const base = categorySlug ? toolsByCategory(categorySlug) : tools;
    return pricing === "todas" ? base : base.filter((t) => t.pricing === pricing);
  }, [categorySlug, pricing]);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <Breadcrumbs
        crumbs={[
          { name: "Inicio", url: "/" },
          { name: "Herramientas", url: "/herramientas" },
          ...(categorySlug ? [{ name: title, url: `/herramientas/${categorySlug}` }] : []),
        ]}
      />
      <header className="mb-10 max-w-2xl">
        <h1 className="mb-3 font-display text-4xl font-extrabold tracking-tight">{title}</h1>
        <p className="text-lg text-muted-foreground">{description}</p>
      </header>

      <div className="mb-8 flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar por precio">
        {pricingFilters.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPricing(p)}
            aria-pressed={pricing === p}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              pricing === p
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {p === "todas" ? "Todas" : pricingLabels[p]}
          </button>
        ))}
        <span className="ml-auto font-mono text-xs text-muted-foreground">
          {filtered.length} resultado{filtered.length === 1 ? "" : "s"} · Datos demo
        </span>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
          No hay herramientas con esos filtros todavía.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {filtered.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      )}

      {!categorySlug && (
        <section className="mt-16" aria-labelledby="utilidades-propias">
          <h2 id="utilidades-propias" className="mb-2 font-display text-2xl font-extrabold tracking-tight">
            Utilidades interactivas de AIForge
          </h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Herramientas propias que funcionan en tu navegador. Gratuitas y sin registro.
          </p>
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
        </section>
      )}

      {!categorySlug && (
        <section className="mt-16" aria-labelledby="categorias-hub">
          <h2 id="categorias-hub" className="mb-8 font-display text-2xl font-extrabold tracking-tight">
            Categorías del directorio
          </h2>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {categories.map((cat) => {
              const count = toolsByCategory(cat.slug).length;
              return (
                <li key={cat.slug}>
                  <Link
                    to="/directorio-ia"
                    search={{ categoria: cat.slug }}
                    className="block rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-lg"
                  >
                    <p className="text-sm font-semibold">{translateCategoryName(cat.slug, cat.name, locale)}</p>
                    <p className="font-mono text-[10px] text-muted-foreground">
                      {count} herramienta{count === 1 ? "" : "s"}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </main>
  );
}
