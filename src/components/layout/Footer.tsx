import { Link } from "@tanstack/react-router";
import { site } from "@/config/site";
import { useI18n } from "@/lib/i18n";
import type { MessageKey } from "@/i18n/ui";

const columns = [
  {
    key: "footer.product" as MessageKey,
    links: [
      { to: "/herramientas", key: "nav.tools" as MessageKey },
      { to: "/comparativas", key: "nav.comparisons" as MessageKey },
      { to: "/directorio-ia", key: "nav.directory" as MessageKey },
      { to: "/recursos", key: "nav.resources" as MessageKey },
      { to: "/precios", key: "nav.pricing" as MessageKey },
    ],
  },
  {
    key: "footer.content" as MessageKey,
    links: [
      { to: "/blog", key: "nav.blog" as MessageKey },
      { to: "/guias", key: "nav.guides" as MessageKey },
      { to: "/tutoriales", key: "nav.tutorials" as MessageKey },
    ],
  },
  {
    key: "footer.company" as MessageKey,
    links: [
      { to: "/nosotros", key: "nav.about" as MessageKey },
      { to: "/autor", key: "nav.author" as MessageKey },
      { to: "/contacto", key: "nav.contact" as MessageKey },
    ],
  },
  {
    key: "footer.legal" as MessageKey,
    links: [
      { to: "/politica-privacidad", key: "nav.privacy" as MessageKey },
      { to: "/politica-cookies", key: "nav.cookies" as MessageKey },
      { to: "/terminos", key: "nav.terms" as MessageKey },
      { to: "/aviso-legal", key: "nav.legalNotice" as MessageKey },
    ],
  },
];

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border px-6 pt-20 pb-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 grid grid-cols-2 gap-12 md:grid-cols-6">
          <div className="col-span-2">
            <p className="mb-6 font-display text-xl font-extrabold tracking-tighter">
              FORGE<span className="text-muted-foreground"> AI HUB</span>
            </p>
            <p className="mb-4 max-w-xs text-sm text-muted-foreground">{t("home.sub")}</p>
            <p className="max-w-xs text-xs text-muted-foreground/70">{t("notice.partialTranslation")}</p>
          </div>
          {columns.map((col) => (
            <nav key={col.key} aria-label={t("footer.links", { section: t(col.key) })}>
              <h2 className="label-mono mb-6 text-foreground">{t(col.key)}</h2>
              <ul className="space-y-4 text-sm text-muted-foreground">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="transition-colors hover:text-foreground">
                      {t(link.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-10 md:flex-row">
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} FORGE AI HUB — SPAIN.
          </p>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-success" aria-hidden />
            <span className="font-mono text-[10px] uppercase tracking-tight text-muted-foreground">
              {t("footer.status")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
