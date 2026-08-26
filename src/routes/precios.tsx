import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { interactiveApps } from "@/data/apps";

export const Route = createFileRoute("/precios")({
  head: () => ({
    meta: [
      { title: "Precios de AIForge: acceso gratuito y sin registro" },
      {
        name: "description",
        content:
          "AIForge es gratuito: directorio, comparativas y utilidades de IA sin registro ni suscripción. Así se sostiene el proyecto.",
      },
      { property: "og:title", content: "Precios — AIForge" },
      { property: "og:description", content: "Acceso gratuito, sin registro ni suscripción." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/precios" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/precios" }],
  }),
  component: Precios,
});

const included = [
  "Directorio completo de herramientas con filtros",
  "Comparativas cara a cara y recomendaciones por perfil",
  `${interactiveApps.length} utilidades interactivas que funcionan en tu navegador`,
  "Guías, tutoriales y artículos sin muro de pago",
  "Recomendador de herramientas paso a paso",
  "Sin registro, sin cuenta y sin tarjeta",
];

function Precios() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Breadcrumbs crumbs={[{ name: "Inicio", url: "/" }, { name: "Precios", url: "/precios" }]} />

      <h1 className="mb-3 font-display text-4xl font-extrabold tracking-tight">Precios</h1>
      <p className="mb-10 text-lg text-muted-foreground">
        AIForge es completamente gratuito. No hay planes de pago, ni funciones bloqueadas, ni cuenta que crear.
      </p>

      <section className="mb-10 rounded-2xl border border-border p-8">
        <p className="label-mono mb-3 text-muted-foreground">Plan único</p>
        <p className="mb-1 font-display text-5xl font-extrabold tracking-tight">0 €</p>
        <p className="mb-8 text-sm text-muted-foreground">Para siempre, sin registro.</p>
        <ul className="mb-8 space-y-3 text-sm">
          {included.map((item) => (
            <li key={item} className="flex gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
        <Link
          to="/herramientas"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Empezar a explorar
        </Link>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-display text-2xl font-bold tracking-tight">Cómo se sostiene el proyecto</h2>
        <p className="leading-relaxed text-muted-foreground">
          El mantenimiento se financia con publicidad contextual claramente identificada y con enlaces externos a las
          webs oficiales de las herramientas. Esos ingresos nunca condicionan las valoraciones ni el orden del
          directorio: los criterios de análisis son los mismos para todas las herramientas y están publicados en la{" "}
          <Link to="/autor" className="font-medium text-foreground underline underline-offset-2">
            metodología editorial
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="mb-3 font-display text-2xl font-bold tracking-tight">¿Y los precios de las herramientas?</h2>
        <p className="leading-relaxed text-muted-foreground">
          Cada ficha del directorio indica el modelo de precio y si existe plan gratuito. Puedes filtrar por coste en
          el{" "}
          <Link to="/directorio-ia" className="font-medium text-foreground underline underline-offset-2">
            directorio
          </Link>{" "}
          o estimar el gasto de una API con la{" "}
          <Link
            to="/herramientas/$slug"
            params={{ slug: "calculadora-costes-ia" }}
            className="font-medium text-foreground underline underline-offset-2"
          >
            calculadora de costes
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
