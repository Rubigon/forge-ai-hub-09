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

  const openSearch = () => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <Link
            to="/"
            className="flex items-center gap-2 font-display text-xl font-extrabold tracking-tighter"
            aria-label={site.name}
          >
            <span className="rounded-sm bg-primary px-1.5 py-0.5 text-primary-foreground">FORGE</span>
            <span>AI HUB</span>
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
            className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-foreground/20"
            aria-label={t("action.searchAria")}
          >
            <Search className="size-3.5" aria-hidden />
            <span className="hidden sm:inline">{t("home.searchPlaceholder")}</span>
            <kbd className="hidden rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] sm:inline">⌘K</kbd>
          </button>

          <LanguageSwitcher />

          <button
            type="button"
            onClick={toggle}
            className="flex size-9 items-center justify-center rounded-lg border border-border bg-card transition-colors hover:border-foreground/20"
            aria-label={t("action.toggleTheme")}
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex size-9 items-center justify-center rounded-lg border border-border bg-card md:hidden"
            aria-label={t("action.menuAria")}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-b border-border bg-background px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3 text-sm">
            {mainNav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="py-1 text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "font-semibold text-foreground" }}
              >
                {t(item.key as MessageKey)}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
