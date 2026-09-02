/** Modelo de datos de AIForge. Los datos actuales son DEMO: sustituir por fuente real (CMS/DB). */

export type PricingModel = "gratis" | "freemium" | "pago";

export type CategorySlug =
  | "chatbots"
  | "imagenes"
  | "video"
  | "audio"
  | "musica"
  | "programacion"
  | "marketing"
  | "productividad"
  | "educacion"
  | "automatizacion"
  | "diseno"
  | "investigacion"
  | "presentaciones"
  | "escritura"
  | "analisis-datos";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
}

/** Tareas que el recomendador puede resolver */
export type TaskId =
  | "programar"
  | "estudiar"
  | "imagenes"
  | "video"
  | "contenido"
  | "automatizar"
  | "documentos"
  | "web"
  | "presentaciones";

export type LevelId = "principiante" | "intermedio" | "avanzado";
export type BudgetId = "gratis" | "menos-10" | "10-30" | "mas-30";

export interface Tool {
  slug: string;
  name: string;
  initials: string;
  tagline: string;
  description: string;
  category: CategorySlug;
  pricing: PricingModel;
  /** Texto de precio orientativo (demo). */
  priceNote: string;
  freeTier: boolean;
  /** Puntuación demo 0-5. */
  rating: number;
  features: string[];
  pros: string[];
  cons: string[];
  useCases: string[];
  officialUrl: string;
  alternatives: string[];
  /** ISO date de última revisión editorial. */
  lastReviewed: string;
  isNew?: boolean;
  isPopular?: boolean;
  tasks: TaskId[];
  levels: LevelId[];
}

export interface ComparisonRow {
  feature: string;
  a: string;
  b: string;
  /** slug de la herramienta ganadora en esta fila, si aplica */
  winner?: "a" | "b" | "tie";
}

export interface Comparison {
  slug: string;
  toolA: string;
  toolB: string;
  title: string;
  summary: string;
  rows: ComparisonRow[];
  easeOfUse: { a: number; b: number };
  performance: { a: number; b: number };
  prosA: string[];
  prosB: string[];
  consA: string[];
  consB: string[];
  conclusion: string;
  recommendations: { profile: string; pick: string; reason: string }[];
  lastReviewed: string;
}

export type ArticleType = "blog" | "guia" | "tutorial";

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "code"; lang: string; code: string };

export interface Article {
  slug: string;
  type: ArticleType;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  content: ContentBlock[];
  sources: { label: string; url: string }[];
  relatedTools: string[];
  relatedArticles: string[];
  featured?: boolean;
}

/** Herramienta interactiva propia (app), accesible en /herramientas/<slug> */
export interface InteractiveApp {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  isNew?: boolean;
  isPopular?: boolean;
}

export type SearchItemType = "herramienta" | "app" | "comparativa" | "articulo" | "categoria";

export interface SearchItem {
  type: SearchItemType;
  title: string;
  description: string;
  url: string;
  keywords: string;
  /** Slug de categoría (solo herramientas y categorías). */
  category?: CategorySlug;
  /** Modelo de precio (solo herramientas). */
  pricing?: PricingModel;
}
