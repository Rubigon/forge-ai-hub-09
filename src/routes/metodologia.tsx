import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SCORE_AXIS_LABELS, SCORE_WEIGHTS } from "@/lib/scoring";
import { breadcrumbJsonLd } from "@/lib/seo";

const title = "Metodología AIForge: cómo valoramos las herramientas de IA";
const description =
  "Criterios, pesos y fuentes del AIForge Score: una valoración editorial reproducible, sin opiniones de usuarios ni datos inventados.";

export const Route = createFileRoute("/metodologia")({
  head: () => ({
    meta: [
      { title: `${title} — AIForge` },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/metodologia" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/metodologia" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Inicio", url: "/" },
            { name: "Metodología", url: "/metodologia" },
          ]),
        ),
      },
    ],
  }),
  component: Metodologia,
});

const axes: { key: keyof typeof SCORE_WEIGHTS; detail: string }[] = [
  { key: "utility", detail: "Amplitud de funciones reales, casos de uso cubiertos y limitaciones documentadas." },
  { key: "quality", detail: "Calidad del resultado y madurez del producto según nuestra revisión editorial." },
  { key: "price", detail: "Relación entre lo que ofrece y su modelo de precio, incluyendo la existencia de plan gratuito." },
  { key: "ease", detail: "Curva de aprendizaje y nivel mínimo necesario para obtener resultados útiles." },
];

function Metodologia() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Breadcrumbs crumbs={[{ name: "Inicio", url: "/" }, { name: "Metodología", url: "/metodologia" }]} />
      <h1 className="mb-4 font-display text-4xl font-extrabold tracking-tight">Metodología AIForge</h1>
      <p className="mb-10 text-lg text-muted-foreground">{description}</p>

      <section className="mb-10">
        <h2 className="mb-3 font-display text-2xl font-bold tracking-tight">Qué es el AIForge Score</h2>
        <p className="leading-relaxed text-muted-foreground">
          Es una puntuación <strong>editorial</strong> sobre 10. No procede de votos de usuarios ni de encuestas: se
          calcula de forma determinista a partir de los datos que catalogamos de cada herramienta, de modo que dos
          herramientas con las mismas características obtienen la misma nota. La fórmula es pública y auditable.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-display text-2xl font-bold tracking-tight">Ejes y pesos</h2>
        <dl className="divide-y divide-border overflow-hidden rounded-xl border border-border">
          {axes.map((axis) => (
            <div key={axis.key} className="p-5">
              <dt className="mb-1 flex items-center justify-between gap-3">
                <span className="font-semibold">{SCORE_AXIS_LABELS[axis.key]}</span>
                <span className="font-mono text-xs text-muted-foreground">
                  peso {Math.round(SCORE_WEIGHTS[axis.key] * 100)}%
                </span>
              </dt>
              <dd className="text-sm text-muted-foreground">{axis.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-display text-2xl font-bold tracking-tight">Qué no hacemos</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>No publicamos valoraciones atribuidas a una comunidad que no existe.</li>
          <li>No afirmamos haber probado una herramienta si no la hemos probado.</li>
          <li>No presentamos precios sin indicar su fecha de comprobación y su fuente.</li>
          <li>No ordenamos el directorio en función de acuerdos comerciales.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-display text-2xl font-bold tracking-tight">Pruebas propias</h2>
        <p className="leading-relaxed text-muted-foreground">
          Estamos preparando una batería de pruebas comparables (programación, razonamiento, escritura y análisis) cuyos
          resultados se incorporarán al Score como un eje adicional. Hasta que existan resultados reales, no se muestra
          ninguna puntuación de pruebas.
        </p>
      </section>

      <p className="text-sm text-muted-foreground">
        ¿Ves un dato desactualizado?{" "}
        <Link to="/contacto" className="underline hover:text-foreground">
          Avísanos
        </Link>{" "}
        y lo revisamos.
      </p>
    </main>
  );
}
