import { createFileRoute } from "@tanstack/react-router";
import { catalogQueryOptions } from "@/lib/catalog";
import { ArticleListPage } from "@/components/ArticlePage";
import { breadcrumbJsonLd } from "@/lib/seo";

const BASE_DOMAIN = "https://www.forge-ai-hub.com";

export const Route = createFileRoute("/guias/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(catalogQueryOptions()),
  head: () => {
    const fullUrl = `${BASE_DOMAIN}/guias`;
    const title = "Guías Completas de IA (2026) | Forge AI Hub";
    const description =
      "Guías extensas y estructuradas para dominar prompt engineering, elección de modelos, automatización y uso profesional de la Inteligencia Artificial.";

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
              { name: "Guías", url: fullUrl },
            ]),
          ),
        },
      ],
    };
  },
  component: () => (
    <ArticleListPage
      type="guia"
      title="Guías"
      description="Documentos de referencia: se leen una vez y se consultan muchas. Estructura clara, ejemplos y decisiones justificadas."
    />
  ),
});
