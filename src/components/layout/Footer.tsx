import { Link } from "@tanstack/react-router";
import { site } from "@/config/site";
import { NewsletterForm } from "@/components/NewsletterForm";

const columns = [
  {
    title: "Producto",
    links: [
      { to: "/herramientas", label: "Herramientas" },
      { to: "/comparativas", label: "Comparativas" },
      { to: "/directorio-ia", label: "Directorio" },
      { to: "/recursos", label: "Recursos" },
      { to: "/precios", label: "Precios" },
    ],
  },
  {
    title: "Contenido",
    links: [
      { to: "/blog", label: "Blog" },
      { to: "/guias", label: "Guías" },
      { to: "/tutoriales", label: "Tutoriales" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { to: "/nosotros", label: "Nosotros" },
      { to: "/autor", label: "Autor" },
      { to: "/contacto", label: "Contacto" },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/politica-privacidad", label: "Privacidad" },
      { to: "/politica-cookies", label: "Cookies" },
      { to: "/terminos", label: "Términos" },
      { to: "/aviso-legal", label: "Aviso legal" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border px-6 pt-20 pb-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 grid grid-cols-2 gap-12 md:grid-cols-6">
          <div className="col-span-2">
            <p className="mb-6 font-display text-xl font-extrabold tracking-tighter">
              AI<span className="text-muted-foreground">FORGE</span>
            </p>
            <p className="mb-8 max-w-xs text-sm text-muted-foreground">{site.claim}</p>
            <NewsletterForm compact />
          </div>
          {columns.map((col) => (
            <nav key={col.title} aria-label={`Enlaces de ${col.title}`}>
              <h2 className="label-mono mb-6 text-foreground">{col.title}</h2>
              <ul className="space-y-4 text-sm text-muted-foreground">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="transition-colors hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-10 md:flex-row">
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} AIFORGE. PROYECTO DEMO — MADRID, ES.
          </p>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-success" aria-hidden />
            <span className="font-mono text-[10px] uppercase tracking-tight text-muted-foreground">
              Sistemas operativos
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
