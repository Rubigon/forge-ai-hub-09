import { createFileRoute } from "@tanstack/react-router";
import { catalogQueryOptions } from "@/lib/catalog";
import { ArticleListPage } from "@/components/ArticlePage";
import { breadcrumbJsonLd } from "@/lib/seo";

const BASE_DOMAIN = "https://www.forge-ai-hub.com";

export const Route = createFileRoute("/blog/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(catalogQueryOptions()),
  head: () => {
    const fullUrl = `${BASE_DOMAIN}/blog`;
    const title = "Blog de Inteligencia Artificial (2026) | Forge AI Hub";
    const description =
      "Análisis, novedades y criterio sobre inteligencia artificial, automatización y productividad, sin ruido ni titulares vacíos.";

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
              { name: "Blog", url: fullUrl },
            ]),
          ),
        },
      ],
    };
  },
  component: () => (
    <ArticleListPage
      type="blog"
      title="Blog"
      description="Novedades del sector, análisis de modelos y criterio práctico sobre cómo integrar IA en tu trabajo diario."
    />
  ),
});
