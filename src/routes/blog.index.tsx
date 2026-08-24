import { createFileRoute } from "@tanstack/react-router";
import { ArticleListPage } from "@/components/ArticlePage";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog de inteligencia artificial y productividad — AIForge" },
      {
        name: "description",
        content:
          "Análisis, novedades y criterio sobre inteligencia artificial, automatización y productividad, sin ruido ni titulares vacíos.",
      },
      { property: "og:title", content: "Blog — AIForge" },
      { property: "og:description", content: "Análisis y novedades de IA con criterio técnico." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/blog" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: () => (
    <ArticleListPage
      type="blog"
      title="Blog"
      description="Novedades del sector, análisis de modelos y criterio práctico sobre cómo integrar IA en tu trabajo diario."
    />
  ),
});
