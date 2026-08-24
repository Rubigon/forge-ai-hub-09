import { createFileRoute } from "@tanstack/react-router";
import { comparisons } from "@/data/comparisons";
import { ComparisonCard } from "@/components/ComparisonCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdSlot } from "@/components/AdSlot";
import { breadcrumbJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/comparativas/")({
  head: () => ({
    meta: [
      { title: "Comparativas de herramientas de IA cara a cara — AIForge" },
      {
        name: "description",
        content:
          "Comparativas técnicas entre herramientas de IA: tablas de características, facilidad de uso, rendimiento y recomendación por perfil.",
      },
      { property: "og:title", content: "Comparativas de IA — AIForge" },
      { property: "og:description", content: "Tablas cara a cara con veredicto por perfil de usuario." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/comparativas" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/comparativas" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Inicio", url: "/" },
            { name: "Comparativas", url: "/comparativas" },
          ]),
        ),
      },
    ],
  }),
  component: ComparativasIndex,
});

function ComparativasIndex() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <Breadcrumbs crumbs={[{ name: "Inicio", url: "/" }, { name: "Comparativas", url: "/comparativas" }]} />
      <header className="mb-10 max-w-2xl">
        <h1 className="mb-3 font-display text-4xl font-extrabold tracking-tight">Comparativas</h1>
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
