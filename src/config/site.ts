/** Configuración global del sitio. Única fuente de verdad para nombre, URLs y copy base. */
export const site = {
  name: "AIForge",
  title: "AIForge: Descubre y Compara Herramientas de IA",
  claim: "Descubre, compara y utiliza la inteligencia artificial.",
  description:
    "Descubre herramientas de IA, comparativas, tutoriales y recursos para estudiar, programar, crear contenido y automatizar tareas.",
  locale: "es-ES",
  author: "Equipo AIForge",
  url: "https://www.forge-ai-hub.com",
  social: {
    twitter: "@aiforge_es",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com",
  },
  email: "hola@aiforge.es",
} as const;

export const mainNav = [
  { to: "/herramientas", label: "Herramientas", key: "nav.tools" },
  { to: "/comparativas", label: "Comparativas", key: "nav.comparisons" },
  { to: "/guias", label: "Guías", key: "nav.guides" },
  { to: "/directorio-ia", label: "Directorio", key: "nav.directory" },
  { to: "/blog", label: "Blog", key: "nav.blog" },
] as const;
