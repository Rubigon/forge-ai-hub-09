import { useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { buildSearchIndex, groupResults, searchItems, searchTypeLabels, searchTypeOrder } from "@/lib/search";
import { categories } from "@/data/categories";
import { pricingLabels } from "@/data/tools";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import type { PricingModel, SearchItemType } from "@/types";

type Search = { q?: string; tipo?: string; categoria?: string; precio?: string };

export const Route = createFileRoute("/buscar")({
  validateSearch: (search: Record<string, unknown>): Search => {
    const out: Search = {};
    if (typeof search["q"] === "string" && search["q"]) out.q = search["q"];
    if (typeof search["tipo"] === "string" && searchTypeOrder.includes(search["tipo"] as SearchItemType))
      out.tipo = search["tipo"];
    if (typeof search["categoria"] === "string" && categories.some((c) => c.slug === search["categoria"]))
      out.categoria = search["categoria"];
    if (typeof search["precio"] === "string" && ["gratis", "freemium", "pago"].includes(search["precio"]))
      out.precio = search["precio"];
    return out;
  },
  head: () => ({
    meta: [
      { title: "Buscar en AIForge: herramientas, comparativas y guías" },
      {
        name: "description",
        content:
          "Busca en todo el catálogo de AIForge: herramientas de IA, comparativas, guías, tutoriales, categorías y utilidades gratuitas.",
      },
      { property: "og:title", content: "Buscador — AIForge" },
      { property: "og:description", content: "Busca herramientas, comparativas y contenidos de IA." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/buscar" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: "/buscar" }],
  }),
  component: Buscar,
});

function Buscar() {
  const { q = "", tipo, categoria, precio } = Route.useSearch();
  const navigate = Route.useNavigate();

  const results = useMemo(
    () =>
      q
        ? searchItems(q, buildSearchIndex(), 60, {
            type: (tipo as SearchItemType) ?? "todos",
            category: categoria ?? "todas",
            pricing: (precio as PricingModel) ?? "todos",
          })
        : [],
    [q, tipo, categoria, precio],
  );
  const groups = useMemo(() => groupResults(results), [results]);

  const setFilter = (key: "tipo" | "categoria" | "precio", value: string) =>
    navigate({
      to: "/buscar",
      search: (prev) => ({ ...prev, [key]: value || undefined }),
    });

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <Breadcrumbs crumbs={[{ name: "Inicio", url: "/" }, { name: "Buscar", url: "/buscar" }]} />
      <h1 className="mb-6 font-display text-4xl font-extrabold tracking-tight">Buscar</h1>

      <form
        role="search"
        className="mb-6"
        onSubmit={(e) => {
          e.preventDefault();
          const value = new FormData(e.currentTarget).get("q");
          navigate({
            to: "/buscar",
            search: (prev) => ({ ...prev, q: typeof value === "string" ? value : "" }),
          });
        }}
      >
        <label htmlFor="q" className="label-mono mb-2 block text-muted-foreground">
          Término de búsqueda
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            id="q"
            name="q"
            type="search"
            defaultValue={q}
            placeholder="ChatGPT, programar, prompt…"
            className="min-w-0 flex-1 rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
          />
          <button
            type="submit"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Buscar
          </button>
        </div>
      </form>

      {q && (
        <div className="mb-8 grid gap-3 sm:grid-cols-3">
          <Select label="Tipo" value={tipo ?? ""} onChange={(v) => setFilter("tipo", v)}>
            <option value="">Todos los tipos</option>
            {searchTypeOrder.map((t) => (
              <option key={t} value={t}>
                {searchTypeLabels[t]}
              </option>
            ))}
          </Select>
          <Select label="Categoría" value={categoria ?? ""} onChange={(v) => setFilter("categoria", v)}>
            <option value="">Todas las categorías</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </Select>
          <Select label="Precio" value={precio ?? ""} onChange={(v) => setFilter("precio", v)}>
            <option value="">Cualquier precio</option>
            {(["gratis", "freemium", "pago"] as PricingModel[]).map((p) => (
              <option key={p} value={p}>
                {pricingLabels[p]}
              </option>
            ))}
          </Select>
        </div>
      )}

      {q && (
        <p className="mb-6 font-mono text-xs text-muted-foreground">
          {results.length} resultado{results.length === 1 ? "" : "s"} para «{q}»
        </p>
      )}

      <div className="space-y-10">
        {groups.map((group) => (
          <section key={group.type} aria-labelledby={`grupo-${group.type}`}>
            <h2 id={`grupo-${group.type}`} className="label-mono mb-3 text-muted-foreground">
              {searchTypeLabels[group.type]} · {group.items.length}
            </h2>
            <ul className="space-y-3">
              {group.items.map((item) => (
                <li key={`${item.url}-${item.title}`}>
                  <Link
                    to={item.url}
                    search={item.searchParams}
                    className="block rounded-xl border border-border p-5 transition-shadow hover:shadow-lg"
                  >
                    <p className="font-display font-semibold">{item.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {!q && (
        <section aria-labelledby="sugerencias">
          <h2 id="sugerencias" className="label-mono mb-4 text-muted-foreground">
            Búsquedas frecuentes
          </h2>
          <ul className="mb-8 flex flex-wrap gap-2">
            {["chatgpt", "programar", "imágenes", "automatizar", "gratis", "prompt", "vídeo", "estudiar"].map((term) => (
              <li key={term}>
                <Link
                  to="/buscar"
                  search={{ q: term }}
                  className="rounded-full border border-border bg-card px-4 py-2 text-sm transition-colors hover:bg-accent"
                >
                  {term}
                </Link>
              </li>
            ))}
          </ul>
          <div className="grid gap-3 sm:grid-cols-3">
            <Link to="/directorio-ia" className="rounded-xl border border-border p-5 transition-shadow hover:shadow-lg">
              <p className="font-display font-semibold">Directorio completo</p>
              <p className="mt-1 text-sm text-muted-foreground">Filtra por categoría y precio.</p>
            </Link>
            <Link to="/comparativas" className="rounded-xl border border-border p-5 transition-shadow hover:shadow-lg">
              <p className="font-display font-semibold">Comparativas</p>
              <p className="mt-1 text-sm text-muted-foreground">Análisis cara a cara.</p>
            </Link>
            <Link to="/recomendador" className="rounded-xl border border-border p-5 transition-shadow hover:shadow-lg">
              <p className="font-display font-semibold">La Forja</p>
              <p className="mt-1 text-sm text-muted-foreground">Responde y obtén tu herramienta.</p>
            </Link>
          </div>
        </section>
      )}

      {q && results.length === 0 && (
        <div className="rounded-xl border border-dashed border-border p-10 text-center">
          <p className="mb-6 text-muted-foreground">
            Sin resultados para «{q}» con los filtros activos. Prueba a quitarlos o busca un término más general.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/buscar"
              search={{ q }}
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Quitar filtros
            </Link>
            <Link
              to="/directorio-ia"
              className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-accent"
            >
              Ver todo el directorio
            </Link>
            <Link
              to="/recomendador"
              className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-accent"
            >
              Usar La Forja
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}

function Select({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="label-mono mb-1.5 block text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm focus:outline-none"
      >
        {children}
      </select>
    </label>
  );
}
