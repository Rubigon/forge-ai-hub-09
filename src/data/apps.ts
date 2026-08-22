import type { InteractiveApp } from "@/types";

/**
 * Herramientas interactivas propias de AIForge, accesibles en /herramientas/<slug>.
 * Se renderizan con componentes React reales (no son fichas de directorio).
 */
export const interactiveApps: InteractiveApp[] = [
  {
    slug: "optimizador-prompts",
    name: "Prompt Optimizer",
    tagline: "Convierte un prompt vago en una instrucción estructurada.",
    description:
      "Reestructura tu prompt siguiendo el marco objetivo · contexto · rol · restricciones · formato · ejemplos · criterios de calidad.",
    category: "Escritura",
    isPopular: true,
  },
  {
    slug: "calculadora-costes-ia",
    name: "Calculadora de costes IA",
    tagline: "Estima el coste de las APIs de modelos de IA.",
    description:
      "Calcula el coste diario, mensual y anual de tus llamadas a APIs de modelos según tokens de entrada y salida.",
    category: "Desarrollo",
    isPopular: true,
  },
  {
    slug: "calculadora-tokens",
    name: "Calculadora de tokens",
    tagline: "Estima caracteres, palabras, tokens y coste de un texto.",
    description: "Pega un texto y obtén una estimación de tokens y su coste en distintos modelos.",
    category: "Desarrollo",
  },
  {
    slug: "formateador-json",
    name: "Formateador JSON",
    tagline: "Formatea, valida y minimiza JSON al instante.",
    description: "Valida JSON con mensajes de error claros, formatea con indentación y minimiza para producción.",
    category: "Desarrollo",
    isPopular: true,
  },
  {
    slug: "probador-regex",
    name: "Probador Regex",
    tagline: "Prueba expresiones regulares con resaltado de coincidencias.",
    description: "Escribe una expresión regular, pega un texto de prueba y visualiza coincidencias y grupos de captura.",
    category: "Desarrollo",
  },
  {
    slug: "analizador-texto",
    name: "Analizador de texto",
    tagline: "Palabras, caracteres, legibilidad y densidad léxica.",
    description: "Analiza cualquier texto: recuento de palabras, tiempo de lectura, frases y palabras más frecuentes.",
    category: "Escritura",
  },
];

export const appBySlug = (slug: string) => interactiveApps.find((a) => a.slug === slug);
