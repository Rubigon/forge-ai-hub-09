import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdSlot } from "@/components/AdSlot";
import type { InteractiveApp } from "@/types";

/** Marco común de las herramientas interactivas de AIForge. */
export function AppPage({ app, children }: { app: InteractiveApp; children: ReactNode }) {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <Breadcrumbs
        crumbs={[
          { name: "Inicio", url: "/" },
          { name: "Herramientas", url: "/herramientas" },
          { name: app.name, url: `/herramientas/${app.slug}` },
        ]}
      />
      <header className="mb-10 max-w-2xl">
        <p className="label-mono mb-3 text-muted-foreground">{app.category} · Herramienta AIForge</p>
        <h1 className="mb-3 font-display text-4xl font-extrabold tracking-tight">{app.name}</h1>
        <p className="text-lg text-muted-foreground">{app.description}</p>
      </header>
      <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">{children}</div>
      <AdSlot position="bottom-content" className="mt-12" />
    </main>
  );
}
