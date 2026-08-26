import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { site } from "@/config/site";
import { tools } from "@/data/tools";
import { comparisons } from "@/data/comparisons";
import { articles } from "@/data/articles";
import { interactiveApps } from "@/data/apps";

export const Route = createFileRoute("/nosotros")({
  head: () => ({
    meta: [
      { title: "Sobre AIForge: qué es y cómo trabajamos" },
      {
        name: "description",
        content:
          "AIForge es una plataforma independiente de herramientas, comparativas y utilidades de inteligencia artificial. Conoce el proyecto y su metodología.",
      },
      { property: "og:title", content: "Sobre AIForge" },
      { property: "og:description", content: "Plataforma independiente de herramientas y comparativas de IA." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/nosotros" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/nosotros" }],
  }),
  component: Nosotros,
});

function Nosotros() {
  const stats = [
    { k: "Herramientas analizadas", v: String(tools.length) },
    { k: "Comparativas", v: String(comparisons.length) },
    { k: "Artículos y guías", v: String(articles.length) },
    { k: "Utilidades propias", v: String(interactiveApps.length) },
  ];

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Breadcrumbs crumbs={[{ name: "Inicio", url: "/" }, { name: "Nosotros", url: "/nosotros" }]} />

      <h1 className="mb-4 font-display text-4xl font-extrabold tracking-tight">Sobre {site.name}</h1>
      <p className="mb-10 text-lg text-muted-foreground">{site.claim}</p>

      <dl className="mb-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-border sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.k} className="bg-card p-4">
            <dt className="label-mono mb-1 text-muted-foreground">{s.k}</dt>
            <dd className="font-display text-2xl font-bold">{s.v}</dd>
          </div>
        ))}
      </dl>

      <section className="mb-10">
        <h2 className="mb-3 font-display text-2xl font-bold tracking-tight">Qué hacemos</h2>
        <p className="leading-relaxed text-muted-foreground">
          AIForge reúne en un solo lugar el trabajo que normalmente está disperso: un directorio de herramientas de
          inteligencia artificial con fichas comparables, comparativas cara a cara con criterios explícitos,
          contenidos formativos y utilidades interactivas que funcionan directamente en el navegador, sin registro y
          sin enviar tus datos a ningún servidor.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-display text-2xl font-bold tracking-tight">Cómo trabajamos</h2>
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Criterios homogéneos.</strong> Todas las herramientas se describen con
            los mismos campos: modelo de precio, plan gratuito, funciones, ventajas, limitaciones y casos de uso.
          </li>
          <li>
            <strong className="text-foreground">Revisión fechada.</strong> Cada ficha y comparativa indica su última
            revisión editorial, para que sepas cuándo se comprobó la información.
          </li>
          <li>
            <strong className="text-foreground">Independencia.</strong> Los enlaces externos se marcan como tales y
            ninguna herramienta paga por aparecer o por mejorar su posición.
          </li>
          <li>
            <strong className="text-foreground">Privacidad primero.</strong> Las utilidades se ejecutan en local y la
            analítica solo se activa con tu consentimiento explícito.
          </li>
        </ul>
      </section>

      <section className="mb-10 rounded-xl border border-border p-5">
        <h2 className="mb-2 font-display text-xl font-bold tracking-tight">Contexto del proyecto</h2>
        <p className="text-sm text-muted-foreground">
          AIForge se desarrolla como proyecto académico de Trabajo Fin de Máster en Inteligencia Artificial. Los datos
          de herramientas y precios son de demostración con fines docentes: verifica siempre la información en la web
          oficial de cada producto antes de contratar.
        </p>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link
          to="/autor"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Metodología editorial <ArrowRight className="size-4" aria-hidden />
        </Link>
        <Link
          to="/contacto"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-accent"
        >
          Contactar
        </Link>
      </div>
    </main>
  );
}
