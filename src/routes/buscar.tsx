import { useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { buildSearchIndex, searchItems, searchTypeLabels } from "@/lib/search";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdSlot } from "@/components/AdSlot";

export const Route = createFileRoute("/buscar")({
  validateSearch: (search: Record<string, unknown>): { q?: string } =>
    typeof search['q'] === "string" && search['q'] ? { q: search['q'] } : {},
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
  const { q = "" } = Route.useSearch();
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
              <p className="font-display font-semibold">Recomendador</p>
              <p className="mt-1 text-sm text-muted-foreground">3 preguntas y tu IA ideal.</p>
            </Link>
          </div>
        </section>
      )}

      {q && results.length === 0 && (
        <div className="rounded-xl border border-dashed border-border p-10 text-center">
          <p className="mb-6 text-muted-foreground">
            Sin resultados para «{q}». Prueba con un término más general o explora estas salidas:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/directorio-ia"
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Ver todo el directorio
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
      )}

      <AdSlot position="bottom-content" className="mt-12" />
    </main>
  );
}
