import type { CategorySlug, Tool } from "@/types";

/**
 * Datos complementarios de ficha, separados del catálogo principal para poder
 * sustituirlos por información verificada sin tocar `tools.ts`.
 *
 * `apiTools`: herramientas que ofrecen API pública documentada.
 * `audienceByCategory`: público objetivo por tipo de herramienta.
 */
export const apiTools = new Set<string>([
  "chatgpt",
  "claude",
  "gemini",
  "perplexity",
  "flux",
  "ideogram",
  "runway",
  "elevenlabs",
  "github-copilot",
  "zapier",
  "make",
  "notion-ai",
  "jasper",
  "grammarly",
  "deepl-write",
  "figma-ai",
]);

export const audienceByCategory: Record<CategorySlug, string[]> = {
  chatbots: ["Uso general", "Estudiantes", "Profesionales"],
  imagenes: ["Diseñadores", "Creadores de contenido", "Marketing"],
  video: ["Creadores de contenido", "Agencias", "Marketing"],
  audio: ["Podcasters", "Creadores de contenido", "Locución"],
  musica: ["Creadores de contenido", "Aficionados a la música"],
  programacion: ["Programadores", "Estudiantes de desarrollo", "Equipos técnicos"],
  marketing: ["Marketing", "Agencias", "Ecommerce"],
  productividad: ["Profesionales", "Equipos", "Estudiantes"],
  educacion: ["Estudiantes", "Docentes", "Investigadores"],
  automatizacion: ["Operaciones", "Perfiles técnicos", "Pymes"],
  diseno: ["Diseñadores", "Product designers", "Marketing"],
  investigacion: ["Investigadores", "Estudiantes", "Analistas"],
  presentaciones: ["Estudiantes", "Consultores", "Equipos comerciales"],
  escritura: ["Redactores", "Estudiantes", "Profesionales"],
  "analisis-datos": ["Analistas", "Estudiantes", "Perfiles de negocio"],
};

export const hasApi = (slug: string) => apiTools.has(slug);

export const audienceFor = (tool: Tool) => audienceByCategory[tool.category] ?? ["Uso general"];

/** Fuentes declaradas de cada ficha: web oficial y su página de precios. */
export function sourcesFor(tool: Tool): { label: string; url: string }[] {
  return [
    { label: "Página oficial", url: tool.officialUrl },
    { label: "Documentación y precios del proveedor", url: tool.officialUrl },
  ];
}
