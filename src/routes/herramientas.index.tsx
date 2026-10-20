import { createFileRoute } from "@tanstack/react-router";
import { ToolsCategoryPage } from "@/components/ToolsCategoryPage";
import { breadcrumbJsonLd } from "@/lib/seo";
import { catalogQueryOptions } from "@/lib/catalog";

export const Route = createFileRoute("/herramientas/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(catalogQueryOptions()),
  head: () => ({
    meta: [
      { title: "Herramientas de IA analizadas y utilidades gratuitas — AIForge" },
      {
        name: "description",
        content:
          "Catálogo de herramientas de inteligencia artificial con fichas técnicas, precios y casos de uso, más utilidades interactivas gratuitas de AIForge.",
      },
      { property: "og:title", content: "Herramientas de IA — AIForge" },
      {
        property: "og:description",
        content: "Fichas técnicas de herramientas de IA y utilidades interactivas gratuitas.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/herramientas" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/herramientas" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Inicio", url: "/" },
            { name: "Herramientas", url: "/herramientas" },
          ]),
        ),
      },
    ],
  }),
  component: HerramientasIndex,
});

function HerramientasIndex() {
  return (
    <ToolsCategoryPage
      title="Herramientas de IA"
      description="Fichas técnicas revisadas a mano: qué hace cada herramienta, cuánto cuesta, para quién es y cuándo no merece la pena."
    />
  );
}
