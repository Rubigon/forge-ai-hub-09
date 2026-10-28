import { createFileRoute } from "@tanstack/react-router";
import { ToolsCategoryPage } from "@/components/ToolsCategoryPage";
import { breadcrumbJsonLd } from "@/lib/seo";
import { catalogQueryOptions } from "@/lib/catalog";

const BASE_DOMAIN = "https://www.forge-ai-hub.com";

export const Route = createFileRoute("/herramientas/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(catalogQueryOptions()),
  head: () => {
    const fullUrl = `${BASE_DOMAIN}/herramientas`;
    const title = "Directorio de Herramientas de IA (2026) | Forge AI Hub";
    const description = "Catálogo completo de herramientas de Inteligencia Artificial con fichas técnicas, precios, opiniones y casos de uso en Forge AI Hub.";

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
              { name: "Herramientas", url: fullUrl },
            ]),
          ),
        },
      ],
    };
  },
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
