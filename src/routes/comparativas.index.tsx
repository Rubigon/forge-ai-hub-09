import { createFileRoute } from "@tanstack/react-router";
import { comparisons } from "@/data/comparisons";
import { ComparisonCard } from "@/components/ComparisonCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdSlot } from "@/components/AdSlot";
import { breadcrumbJsonLd } from "@/lib/seo";

const BASE_DOMAIN = "https://www.forge-ai-hub.com";

export const Route = createFileRoute("/comparativas/")({
  head: () => {
    const fullUrl = `${BASE_DOMAIN}/comparativas`;
    const title = "Comparativas de Herramientas de IA (2026) | Forge AI Hub";
    const description =
      "Comparativas técnicas y análisis cara a cara entre herramientas de IA. Tablas de características, facilidad de uso, rendimiento y recomendaciones por perfil.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: fullUrl },
        { property: "og:image", content: `${BASE_DOMAIN}/icon-512.png` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: fullUrl }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Inicio", url: `${BASE_DOMAIN}/` },
              { name: "Comparativas", url: fullUrl },
            ]),
          ),
        },
      ],
    };
  },
  component: ComparativasIndex,
});

function ComparativasIndex() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <Breadcrumbs crumbs={[{ name: "Inicio", url: "/" }, { name: "Comparativas", url: "/comparativas" }]} />
      <header className="mb-10 max-w-2xl">
        <h1 className="mb-3 font-display text-4xl font-extrabold tracking-tight">Comparativas de IA</h1>
        <p className="text-lg text-muted-foreground">
          Enfrentamos dos herramientas con los mismos criterios y cerramos con una recomendación por perfil, no con un
          empate diplomático.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {comparisons.map((c) => (
          <ComparisonCard key={c.slug} comparison={c} />
        ))}
      </div>
      <AdSlot position="bottom-content" className="mt-12" />
    </main>
  );
}
