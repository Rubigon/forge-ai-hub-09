import { articles, articleUrl } from "@/data/articles";
import { comparisons } from "@/data/comparisons";
import { interactiveApps } from "@/data/apps";
import { tools } from "@/data/tools";
import { categoryBySlug } from "@/data/categories";
import type { SearchItem } from "@/types";

/** Índice de búsqueda global construido a partir de los datos del sitio. */
export function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  for (const t of tools) {
    items.push({
      type: "herramienta",
      title: t.name,
      description: t.tagline,
      url: `/herramientas/${t.slug}`,
      keywords: [t.name, t.tagline, categoryBySlug(t.category)?.name ?? "", ...t.features].join(" ").toLowerCase(),
    });
  }

  for (const app of interactiveApps) {
    items.push({
      type: "app",
      title: app.name,
      description: app.tagline,
      url: `/herramientas/${app.slug}`,
      keywords: [app.name, app.tagline, app.category, "herramienta", "utilidad", "calculadora"].join(" ").toLowerCase(),
    });
  }

  for (const c of comparisons) {
    items.push({
      type: "comparativa",
      title: c.title,
      description: c.summary,
      url: `/comparativas/${c.slug}`,
      keywords: [c.title, c.summary, c.slug.replace(/-/g, " ")].join(" ").toLowerCase(),
    });
  }

  for (const a of articles) {
    items.push({
      type: "articulo",
      title: a.title,
      description: a.excerpt,
      url: articleUrl(a),
      keywords: [a.title, a.excerpt, a.category, ...a.tags].join(" ").toLowerCase(),
    });
  }

  return items;
}

export function searchItems(query: string, items: SearchItem[], limit = 12): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const terms = q.split(/\s+/);
  const scored = items
    .map((item) => {
      const title = item.title.toLowerCase();
      let score = 0;
      for (const term of terms) {
        if (title.includes(term)) score += 10;
        if (item.keywords.includes(term)) score += 3;
      }
      return { item, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((r) => r.item);
}

export const searchTypeLabels: Record<SearchItem["type"], string> = {
  herramienta: "Herramientas",
  app: "Utilidades AIForge",
  comparativa: "Comparativas",
  articulo: "Artículos y guías",
};
