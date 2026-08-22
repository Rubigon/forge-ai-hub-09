import type { Category, TaskId, LevelId, BudgetId } from "@/types";

export const categories: Category[] = [
  { slug: "chatbots", name: "Chatbots", description: "Asistentes conversacionales y modelos de lenguaje." },
  { slug: "imagenes", name: "Generación de imágenes", description: "Crea imágenes, ilustraciones y arte con IA." },
  { slug: "video", name: "Generación de vídeo", description: "Genera y edita vídeo a partir de texto o imágenes." },
  { slug: "audio", name: "Audio", description: "Voces sintéticas, transcripción y edición de audio." },
  { slug: "musica", name: "Música", description: "Composición y generación musical asistida por IA." },
  { slug: "programacion", name: "Programación", description: "Asistentes de código, IDEs y generadores de apps." },
  { slug: "marketing", name: "Marketing", description: "Copywriting, SEO y campañas con IA." },
  { slug: "productividad", name: "Productividad", description: "Notas, reuniones y organización del trabajo." },
  { slug: "educacion", name: "Educación", description: "Aprendizaje, apuntes y tutorización con IA." },
  { slug: "automatizacion", name: "Automatización", description: "Flujos de trabajo y agentes que ejecutan tareas." },
  { slug: "diseno", name: "Diseño", description: "Diseño gráfico, UI y prototipado asistido." },
  { slug: "investigacion", name: "Investigación", description: "Búsqueda con fuentes y análisis documental." },
  { slug: "presentaciones", name: "Presentaciones", description: "Diapositivas y decks generados con IA." },
  { slug: "escritura", name: "Escritura", description: "Redacción, corrección y edición de textos." },
  { slug: "analisis-datos", name: "Análisis de datos", description: "Exploración y visualización de datos con IA." },
];

export const categoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);

/** Opciones del recomendador */
export const taskOptions: { id: TaskId; label: string; code: string }[] = [
  { id: "programar", label: "Programar", code: "DEV" },
  { id: "estudiar", label: "Estudiar", code: "EDU" },
  { id: "imagenes", label: "Generar imágenes", code: "IMG" },
  { id: "video", label: "Generar vídeo", code: "VID" },
  { id: "contenido", label: "Crear contenido", code: "TXT" },
  { id: "automatizar", label: "Automatizar", code: "AUT" },
  { id: "documentos", label: "Analizar documentos", code: "DOC" },
  { id: "web", label: "Crear una web", code: "WEB" },
  { id: "presentaciones", label: "Crear una presentación", code: "PRE" },
];

export const budgetOptions: { id: BudgetId; label: string }[] = [
  { id: "gratis", label: "Gratis" },
  { id: "menos-10", label: "Menos de 10 €/mes" },
  { id: "10-30", label: "10–30 €/mes" },
  { id: "mas-30", label: "Más de 30 €/mes" },
];

export const levelOptions: { id: LevelId; label: string }[] = [
  { id: "principiante", label: "Principiante" },
  { id: "intermedio", label: "Intermedio" },
  { id: "avanzado", label: "Avanzado" },
];
