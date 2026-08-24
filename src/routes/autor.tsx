import { createFileRoute } from "@tanstack/react-router";
import { site } from "@/config/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const Route = createFileRoute("/autor")({
  head: () => ({
    meta: [
      { title: "Quién está detrás de AIForge — Equipo editorial" },
      {
        name: "description",
        content:
          "Metodología editorial de AIForge: cómo se prueban las herramientas, cómo se puntúan y cómo se revisan los contenidos.",
      },
      { property: "og:title", content: "Equipo editorial — AIForge" },
      { property: "og:description", content: "Metodología de pruebas, puntuación y revisión de contenidos." },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/autor" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/autor" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: site.author,
          description: "Equipo editorial especializado en inteligencia artificial aplicada.",
          url: "/autor",
        }),
      },
    ],
  }),
  component: Autor,
});

function Autor() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Breadcrumbs crumbs={[{ name: "Inicio", url: "/" }, { name: "Autor", url: "/autor" }]} />
      <h1 className="mb-6 font-display text-4xl font-extrabold tracking-tight">{site.author}</h1>
      <div className="space-y-6 leading-relaxed text-muted-foreground">
        <p>
          AIForge nace como proyecto de Trabajo Fin de Máster en Inteligencia Artificial con una premisa incómoda: la
          mayoría de directorios de IA son listados automáticos sin criterio. Aquí cada ficha pasa por una revisión
          manual y lleva fecha de última verificación.
        </p>
        <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">Metodología</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Prueba práctica de la herramienta con al menos tres tareas representativas de su categoría.</li>
          <li>Registro de limitaciones reales, no solo de la lista de funciones del fabricante.</li>
          <li>Contraste de precios con la página oficial en la fecha indicada en la ficha.</li>
          <li>Puntuación 0–5 ponderando utilidad, calidad de salida, precio y curva de aprendizaje.</li>
          <li>Revisión periódica: si una ficha no se revisa, se marca como desactualizada.</li>
        </ol>
        <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">Independencia</h2>
        <p>
          Los enlaces externos se marcan como tales. Si en el futuro se incorporan enlaces de afiliación o publicidad,
          se señalizarán de forma explícita y nunca condicionarán la valoración editorial.
        </p>
        <p className="font-mono text-xs">Contacto: {site.email}</p>
      </div>
    </main>
  );
}
