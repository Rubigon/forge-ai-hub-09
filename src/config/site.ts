/** Configuración global del sitio. Única fuente de verdad para nombre, URLs y copy base. */
export const site = {
  name: "AIForge",
  claim: "Descubre, compara y utiliza la inteligencia artificial.",
  description:
    "Descubre herramientas de IA, comparativas, tutoriales y recursos para estudiar, programar, crear contenido y automatizar tareas.",
  locale: "es-ES",
  author: "Equipo AIForge",
  social: {
    twitter: "@aiforge_es",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com",
  },
  email: "hola@aiforge.es",
} as const;

export const mainNav = [
  { to: "/herramientas", label: "Herramientas" },
  { to: "/comparativas", label: "Comparativas" },
  { to: "/guias", label: "Guías" },
  { to: "/directorio-ia", label: "Directorio" },
  { to: "/blog", label: "Blog" },
] as const;
