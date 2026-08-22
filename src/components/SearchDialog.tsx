import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Command } from "cmdk";
import { GitCompareArrows, Newspaper, Search, Wrench, Zap } from "lucide-react";
import { buildSearchIndex, searchItems, searchTypeLabels } from "@/lib/search";
import { trackEvent } from "@/lib/analytics";
import type { SearchItem } from "@/types";

const icons: Record<SearchItem["type"], typeof Wrench> = {
  herramienta: Wrench,
  app: Zap,
  comparativa: GitCompareArrows,
  articulo: Newspaper,
};

/** Buscador global con atajo ⌘K / Ctrl+K, resultados agrupados por tipo. */
export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const index = useMemo(buildSearchIndex, []);
  const results = useMemo(() => searchItems(query, index), [query, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (query.trim().length >= 2) trackEvent("search", { q: query.trim().slice(0, 60) });
  }, [query]);

  if (!open) return null;

  const grouped = results.reduce<Record<string, SearchItem[]>>((acc, item) => {
    (acc[item.type] ??= []).push(item);
    return acc;
  }, {});

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center bg-foreground/20 px-4 pt-24 backdrop-blur-sm"
      onClick={() => setOpen(false)}
      role="presentation"
    >
      <Command
        label="Búsqueda global"
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        shouldFilter={false}
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="size-4 text-muted-foreground" aria-hidden />
          <Command.Input
            autoFocus
            value={query}
            onValueChange={setQuery}
            placeholder="Buscar herramientas, guías o comparativas…"
            className="h-14 w-full bg-transparent text-sm focus:outline-none"
            aria-label="Término de búsqueda"
          />
          <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">ESC</kbd>
        </div>
        <Command.List className="max-h-[50vh] overflow-y-auto p-2">
          {query.trim().length >= 2 && results.length === 0 && (
            <Command.Empty className="py-8 text-center text-sm text-muted-foreground">
              Sin resultados para «{query}».
            </Command.Empty>
          )}
          {query.trim().length < 2 && (
            <p className="py-8 text-center text-xs text-muted-foreground">Escribe al menos 2 caracteres para buscar.</p>
          )}
          {Object.entries(grouped).map(([type, items]) => (
            <Command.Group
              key={type}
              heading={searchTypeLabels[type as SearchItem["type"]]}
              className="text-xs text-muted-foreground [&_[cmdk-group-heading]]:label-mono [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2"
            >
              {items.map((item) => {
                const Icon = icons[item.type];
                return (
                  <Command.Item
                    key={item.url}
                    value={item.url}
                    onSelect={() => {
                      setOpen(false);
                      setQuery("");
                      navigate({ to: item.url });
                    }}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground aria-selected:bg-accent"
                  >
                    <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                    <span className="min-w-0">
                      <span className="block truncate font-medium">{item.title}</span>
                      <span className="block truncate text-xs text-muted-foreground">{item.description}</span>
                    </span>
                  </Command.Item>
                );
              })}
            </Command.Group>
          ))}
        </Command.List>
      </Command>
    </div>
  );
}
