import { createFileRoute } from "@tanstack/react-router";
import { ArticleListPage } from "@/components/ArticlePage";

export const Route = createFileRoute("/guias/")({
  head: () => ({
    meta: [
      { title: "Guías completas de IA: prompts, modelos y automatización — AIForge" },
      {
        name: "description",
        content:
          "Guías extensas y estructuradas para dominar prompt engineering, elección de modelos, automatización y uso profesional de la IA.",
      },
      { property: "og:title", content: "Guías de IA — AIForge" },
      { property: "og:description", content: "Guías largas y estructuradas para dominar la IA aplicada." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/guias" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/guias" }],
  }),
  component: () => (
    <ArticleListPage
      type="guia"
      title="Guías"
      description="Documentos de referencia: se leen una vez y se consultan muchas. Estructura clara, ejemplos y decisiones justificadas."
    />
  ),
});
