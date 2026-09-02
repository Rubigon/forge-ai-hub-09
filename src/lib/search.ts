import { articles, articleUrl } from "@/data/articles";
import { comparisons } from "@/data/comparisons";
import { interactiveApps } from "@/data/apps";
import { tools } from "@/data/tools";
import { categories, categoryBySlug } from "@/data/categories";
import type { PricingModel, SearchItem, SearchItemType } from "@/types";

/** Índice de búsqueda global construido a partir de los datos del sitio. */
export function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  for (const t of tools) {
    items.push({
      type: "herramienta",
      title: t.name,
      description: t.tagline,
      url: `/herramientas/${t.slug}`,
      category: t.category,
      pricing: t.pricing,
      keywords: [t.name, t.tagline, categoryBySlug(t.category)?.name ?? "", ...t.features, ...t.useCases]
        .join(" ")
        .toLowerCase(),
    });
  }

  for (const app of interactiveApps) {
    items.push({
      type: "app",
      title: app.name,
      description: app.tagline,
      url: `/herramientas/${app.slug}`,
      keywords: [app.name, app.tagline, app.category, "herramienta", "utilidad", "calculadora", "gratis"]
        .join(" ")
        .toLowerCase(),
    });
  }

  for (const c of comparisons) {
    items.push({
      type: "comparativa",
      title: c.title,
      description: c.summary,
      url: `/comparativas/${c.slug}`,
      keywords: [c.title, c.summary, c.slug.replace(/-/g, " "), "comparativa", "vs"].join(" ").toLowerCase(),
    });
  }

  for (const a of articles) {
    items.push({
      type: "articulo",
      title: a.title,
      description: a.excerpt,
      url: articleUrl(a),
      keywords: [a.title, a.excerpt, a.category, a.type, ...a.tags].join(" ").toLowerCase(),
    });
  }

  for (const c of categories) {
    const count = tools.filter((t) => t.category === c.slug).length;
    items.push({
      type: "categoria",
      title: c.name,
      description: `${c.description} ${count} herramienta${count === 1 ? "" : "s"} en el directorio.`,
      url: `/directorio-ia?categoria=${c.slug}`,
      category: c.slug,
      keywords: [c.name, c.description, c.slug.replace(/-/g, " "), "categoría"].join(" ").toLowerCase(),
    });
  }

  return items;
}

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export interface SearchFilters {
  type?: SearchItemType | "todos";
  category?: string;
  pricing?: PricingModel | "todos";
}

export function searchItems(query: string, items: SearchItem[], limit = 12, filters: SearchFilters = {}): SearchItem[] {
  const q = normalize(query.trim());
  if (q.length < 2) return [];
  const terms = q.split(/\s+/);

  const filtered = items.filter((item) => {
    if (filters.type && filters.type !== "todos" && item.type !== filters.type) return false;
    if (filters.category && filters.category !== "todas" && item.category !== filters.category) return false;
    if (filters.pricing && filters.pricing !== "todos") {
      if (item.type !== "herramienta" || item.pricing !== filters.pricing) return false;
    }
    return true;
  });

  const scored = filtered
    .map((item) => {
      const title = normalize(item.title);
      const keywords = normalize(item.keywords);
      let score = 0;
      for (const term of terms) {
        if (title === term) score += 20;
        if (title.includes(term)) score += 10;
        if (keywords.includes(term)) score += 3;
      }
      return { item, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((r) => r.item);
}

export const searchTypeOrder: SearchItemType[] = ["herramienta", "app", "comparativa", "articulo", "categoria"];

/** Agrupa los resultados por tipo, respetando el orden editorial. */
export function groupResults(results: SearchItem[]): { type: SearchItemType; items: SearchItem[] }[] {
  return searchTypeOrder
    .map((type) => ({ type, items: results.filter((r) => r.type === type) }))
    .filter((group) => group.items.length > 0);
}

export const searchTypeLabels: Record<SearchItemType, string> = {
  herramienta: "Herramientas",
  app: "Utilidades AIForge",
  comparativa: "Comparativas",
  articulo: "Artículos, guías y tutoriales",
  categoria: "Categorías",
};
