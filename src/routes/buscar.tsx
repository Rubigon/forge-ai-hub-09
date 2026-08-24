import { useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { buildSearchIndex, searchItems, searchTypeLabels } from "@/lib/search";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdSlot } from "@/components/AdSlot";

export const Route = createFileRoute("/buscar")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  head: () => ({
    meta: [
      { title: "Buscar en AIForge: herramientas, comparativas y guías" },
      {
        name: "description",
        content: "Busca en todo el catálogo de AIForge: herramientas de IA, comparativas, guías, tutoriales y utilidades.",
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
  const { q } = Route.useSearch();
  const navigate = Route.useNavigate();
  const results = useMemo(() => (q ? searchItems(q, buildSearchIndex(), 40) : []), [q]);

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <Breadcrumbs crumbs={[{ name: "Inicio", url: "/" }, { name: "Buscar", url: "/buscar" }]} />
      <h1 className="mb-6 font-display text-4xl font-extrabold tracking-tight">Buscar</h1>

      <form
        role="search"
        className="mb-10"
        onSubmit={(e) => {
          e.preventDefault();
          const value = new FormData(e.currentTarget).get("q");
          navigate({ to: "/buscar", search: { q: typeof value === "string" ? value : "" } });
        }}
      >
        <label htmlFor="q" className="label-mono mb-2 block text-muted-foreground">
          Término de búsqueda
        </label>
        <div className="flex gap-2">
          <input
            id="q"
            name="q"
            type="search"
            defaultValue={q}
            placeholder="ChatGPT, automatizar, prompt…"
            className="flex-1 rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
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
        <p className="mb-6 font-mono text-xs text-muted-foreground">
          {results.length} resultado{results.length === 1 ? "" : "s"} para «{q}»
        </p>
      )}

      <ul className="space-y-3">
        {results.map((item) => (
          <li key={item.url}>
            <Link
              to={item.url}
              className="block rounded-xl border border-border p-5 transition-shadow hover:shadow-lg"
            >
              <p className="label-mono mb-2 text-muted-foreground">{searchTypeLabels[item.type]}</p>
              <p className="font-display font-semibold">{item.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
            </Link>
          </li>
        ))}
      </ul>

      {q && results.length === 0 && (
        <p className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
          Sin resultados. Prueba con un término más general.
        </p>
      )}

      <AdSlot position="bottom-content" className="mt-12" />
    </main>
  );
}
