import { useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { categories, categoryBySlug } from "@/data/categories";
import { useI18n } from "@/lib/i18n";
import { translateCategoryName } from "@/i18n/content";
import { pricingLabels } from "@/data/tools";
import { catalogQueryOptions, useCatalog } from "@/lib/catalog";
import { ToolCard } from "@/components/ToolCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdSlot } from "@/components/AdSlot";
import { breadcrumbJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";
import type { CategorySlug, PricingModel } from "@/types";

type DirectorySearch = { categoria?: CategorySlug | undefined; precio?: PricingModel | undefined };

const categorySlugs = categories.map((c) => c.slug) as string[];
const pricingValues: PricingModel[] = ["gratis", "freemium", "pago"];

export const Route = createFileRoute("/directorio-ia")({
  loader: ({ context }) => context.queryClient.ensureQueryData(catalogQueryOptions()),
  validateSearch: (search: Record<string, unknown>): DirectorySearch => ({
    categoria: categorySlugs.includes(String(search['categoria'])) ? (search['categoria'] as CategorySlug) : undefined,
    precio: pricingValues.includes(search['precio'] as PricingModel) ? (search['precio'] as PricingModel) : undefined,
  }),
  head: ({ match }) => {
    const { categoria, precio } = match.search;
    const catName = categoria ? categoryBySlug(categoria)?.name : undefined;
    const priceName = precio ? pricingLabels[precio]?.toLowerCase() : undefined;
    const suffix = [catName, priceName ? `precio ${priceName}` : undefined].filter(Boolean).join(", ");
    const title = suffix
      ? `Herramientas de IA: ${suffix} — AIForge`
      : "Directorio de IA: todas las herramientas por categoría — AIForge";
    const description = suffix
      ? `Herramientas de inteligencia artificial filtradas por ${suffix}, con fichas técnicas, precios y alternativas.`
      : "Directorio completo de herramientas de inteligencia artificial filtrable por categoría y modelo de precio, con fichas técnicas revisadas.";
    return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/directorio-ia" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/directorio-ia" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Inicio", url: "/" },
            { name: "Directorio", url: "/directorio-ia" },
          ]),
        ),
      },
    ],
    };
  },
  component: Directorio,
});

function Directorio() {
  const { tools } = useCatalog();
  const { categoria, precio } = Route.useSearch();
  const { locale } = useI18n();

  const filtered = useMemo(
    () => tools.filter((t) => (!categoria || t.category === categoria) && (!precio || t.pricing === precio)),
    [tools, categoria, precio],
  );

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <Breadcrumbs crumbs={[{ name: "Inicio", url: "/" }, { name: "Directorio", url: "/directorio-ia" }]} />
      <header className="mb-10 max-w-2xl">
        <h1 className="mb-3 font-display text-4xl font-extrabold tracking-tight">Directorio de IA</h1>
        <p className="text-lg text-muted-foreground">
          Todas las herramientas del catálogo en una sola vista. Filtra por categoría y por modelo de precio.
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="space-y-8">
          <nav aria-label="Filtrar por categoría">
            <p className="label-mono mb-3 text-muted-foreground">Categoría</p>
            <ul className="space-y-1 text-sm">
              <li>
                <Link
                  to="/directorio-ia"
                  search={{ categoria: undefined, precio }}
                  className={cn(
                    "block rounded-md px-2 py-1.5",
                    !categoria ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  Todas
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to="/directorio-ia"
                    search={{ categoria: cat.slug, precio }}
                    className={cn(
                      "block rounded-md px-2 py-1.5",
                      categoria === cat.slug
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {translateCategoryName(cat.slug, cat.name, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Filtrar por precio">
            <p className="label-mono mb-3 text-muted-foreground">Precio</p>
            <ul className="space-y-1 text-sm">
              <li>
                <Link
                  to="/directorio-ia"
                  search={{ categoria, precio: undefined }}
                  className={cn(
                    "block rounded-md px-2 py-1.5",
                    !precio ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  Cualquiera
                </Link>
              </li>
              {pricingValues.map((p) => (
                <li key={p}>
                  <Link
                    to="/directorio-ia"
                    search={{ categoria, precio: p }}
                    className={cn(
                      "block rounded-md px-2 py-1.5",
                      precio === p
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {pricingLabels[p]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <AdSlot position="sidebar" />
        </aside>

        <div>
          <p className="mb-6 font-mono text-xs text-muted-foreground">
            {filtered.length} herramienta{filtered.length === 1 ? "" : "s"}
          </p>
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-10 text-center">
              <p className="mb-6 text-muted-foreground">No hay herramientas con esa combinación de filtros.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to="/directorio-ia"
                  search={{}}
                  className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Quitar filtros
                </Link>
                <Link
                  to="/recomendador"
                  className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-accent"
                >
                  Usar el recomendador
                </Link>
                <Link
                  to="/contacto"
                  className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-accent"
                >
                  Proponer una herramienta
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          )}
          <AdSlot position="bottom-content" className="mt-12" />
        </div>
      </div>
    </main>
  );
}
