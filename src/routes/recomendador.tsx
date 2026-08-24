import { createFileRoute } from "@tanstack/react-router";
import { RecommenderWizard } from "@/components/RecommenderWizard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdSlot } from "@/components/AdSlot";

export const Route = createFileRoute("/recomendador")({
  head: () => ({
    meta: [
      { title: "¿Qué IA necesito? Recomendador personalizado — AIForge" },
      {
        name: "description",
        content:
          "Responde tres preguntas sobre tu tarea, tu nivel y tu presupuesto y obtén una recomendación razonada de herramientas de IA.",
      },
      { property: "og:title", content: "Recomendador de herramientas de IA — AIForge" },
      { property: "og:description", content: "Tres preguntas y una recomendación razonada de IA para tu caso." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/recomendador" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/recomendador" }],
  }),
  component: Recomendador,
});

function Recomendador() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <Breadcrumbs crumbs={[{ name: "Inicio", url: "/" }, { name: "Recomendador", url: "/recomendador" }]} />
      <header className="mb-10 max-w-2xl">
        <h1 className="mb-3 font-display text-4xl font-extrabold tracking-tight">¿Qué IA necesito?</h1>
        <p className="text-lg text-muted-foreground">
          Un cuestionario corto que cruza tarea, nivel y presupuesto contra el catálogo. Sin registro y sin enviar tus
          respuestas a ningún servidor.
        </p>
      </header>
      <RecommenderWizard />
      <AdSlot position="bottom-content" className="mt-12" />
    </main>
  );
}
