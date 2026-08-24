import { createFileRoute, Link } from "@tanstack/react-router";
import { interactiveApps } from "@/data/apps";
import { freeTools } from "@/data/tools";
import { featuredArticles } from "@/data/articles";
import { ArticleCard } from "@/components/ArticleCard";
import { ToolCard } from "@/components/ToolCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { NewsletterForm } from "@/components/NewsletterForm";
import { AdSlot } from "@/components/AdSlot";

export const Route = createFileRoute("/recursos")({
  head: () => ({
    meta: [
      { title: "Recursos gratuitos de IA: utilidades, plantillas y lecturas — AIForge" },
      {
        name: "description",
        content:
          "Recursos gratuitos para trabajar con IA: utilidades interactivas, herramientas sin coste y lecturas de referencia seleccionadas.",
      },
      { property: "og:title", content: "Recursos gratuitos de IA — AIForge" },
      { property: "og:description", content: "Utilidades, herramientas gratis y lecturas seleccionadas." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/recursos" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/recursos" }],
  }),
  component: Recursos,
});

function Recursos() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <Breadcrumbs crumbs={[{ name: "Inicio", url: "/" }, { name: "Recursos", url: "/recursos" }]} />
      <header className="mb-12 max-w-2xl">
        <h1 className="mb-3 font-display text-4xl font-extrabold tracking-tight">Recursos</h1>
        <p className="text-lg text-muted-foreground">
          Todo lo que puedes usar hoy sin pagar nada: utilidades propias, herramientas con plan gratuito y lecturas de
          referencia.
        </p>
      </header>

      <section className="mb-16" aria-labelledby="utilidades">
        <h2 id="utilidades" className="mb-6 font-display text-2xl font-extrabold tracking-tight">
          Utilidades interactivas
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

      <AdSlot position="in-content" className="mb-16" />

      <section className="mb-16" aria-labelledby="gratis">
        <h2 id="gratis" className="mb-6 font-display text-2xl font-extrabold tracking-tight">
          Herramientas con plan gratuito
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {freeTools.slice(0, 8).map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      <section className="mb-16" aria-labelledby="lecturas">
        <h2 id="lecturas" className="mb-6 font-display text-2xl font-extrabold tracking-tight">
          Lecturas de referencia
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredArticles.slice(0, 3).map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <NewsletterForm />
    </main>
  );
}
