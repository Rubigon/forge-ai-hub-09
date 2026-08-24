import { Breadcrumbs } from "@/components/Breadcrumbs";

interface LegalSection {
  heading: string;
  body: string[];
}

/** Marco común de las páginas legales. Contenido informativo de un proyecto académico. */
export function LegalPage({
  title,
  path,
  sections,
}: {
  title: string;
  path: string;
  sections: LegalSection[];
}) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Breadcrumbs crumbs={[{ name: "Inicio", url: "/" }, { name: title, url: path }]} />
      <h1 className="mb-3 font-display text-4xl font-extrabold tracking-tight">{title}</h1>
      <p className="mb-10 font-mono text-xs text-muted-foreground">
        Documento orientativo de un proyecto académico. No sustituye al asesoramiento jurídico.
      </p>
      <div className="space-y-10">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="mb-3 font-display text-xl font-bold tracking-tight">{section.heading}</h2>
            <div className="space-y-3 leading-relaxed text-muted-foreground">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
