import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { mainNav, site } from "@/config/site";
import { useTheme } from "@/lib/theme";
import { useI18n } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { MessageKey } from "@/i18n/ui";

export function Header() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { t } = useI18n();

  const openSearch = () =>
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <Link
            to="/"
            className="flex items-center gap-2 font-display text-xl font-extrabold tracking-tighter"
            aria-label={site.name}
          >
            <span className="rounded-sm bg-primary px-1.5 py-0.5 text-primary-foreground">AI</span>
            <span>FORGE</span>
          </Link>
          <nav className="hidden gap-6 text-[13px] font-medium text-muted-foreground md:flex" aria-label={site.name}>
            {mainNav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {t(item.key as MessageKey)}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openSearch}
            className="hidden items-center gap-2 rounded-full border border-border px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground sm:flex"
            aria-label={t("action.searchAria")}
          >
            <Search className="size-3.5" aria-hidden />
            <span>⌘K</span>
          </button>
          <button
            type="button"
            onClick={toggle}
            className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={theme === "dark" ? t("theme.toLight") : t("theme.toDark")}
          >
            {theme === "dark" ? <Sun className="size-4" aria-hidden /> : <Moon className="size-4" aria-hidden />}
          </button>
          <LanguageSwitcher />
          <Link
            to="/recomendador"
            className="hidden rounded-full bg-primary px-4 py-2 text-[13px] font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90 lg:block"
          >
            {t("cta.findAI")}
          </Link>
          <button
            type="button"
            className="rounded-md p-2 text-muted-foreground md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? t("menu.close") : t("menu.open")}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-6 py-4 md:hidden" aria-label={site.name}>
          <ul className="space-y-3 text-sm font-medium">
            {mainNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} onClick={() => setOpen(false)} className="block py-1">
                  {t(item.key as MessageKey)}
                </Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                className="flex items-center gap-2 py-1 text-muted-foreground"
                onClick={() => {
                  setOpen(false);
                  openSearch();
                }}
              >
                <Search className="size-4" aria-hidden /> {t("action.search")}
              </button>
            </li>
            <li>
              <Link
                to="/recomendador"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-lg bg-primary px-4 py-2 text-center text-primary-foreground"
              >
                {t("cta.findAI")}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
