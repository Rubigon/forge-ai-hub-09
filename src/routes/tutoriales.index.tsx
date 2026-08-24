import { createFileRoute } from "@tanstack/react-router";
import { ArticleListPage } from "@/components/ArticlePage";

export const Route = createFileRoute("/tutoriales/")({
  head: () => ({
    meta: [
      { title: "Tutoriales paso a paso de IA y automatización — AIForge" },
      {
        name: "description",
        content:
          "Tutoriales prácticos paso a paso para automatizar tareas, programar con IA y sacar partido a las herramientas del sector.",
      },
      { property: "og:title", content: "Tutoriales — AIForge" },
      { property: "og:description", content: "Tutoriales prácticos, reproducibles y con resultado verificable." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/tutoriales" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/tutoriales" }],
  }),
  component: () => (
    <ArticleListPage
      type="tutorial"
      title="Tutoriales"
      description="Instrucciones reproducibles con un resultado concreto al final. Sin teoría de relleno."
    />
  ),
});
