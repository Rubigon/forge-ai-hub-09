import type { Tool } from "@/types";

/**
 * AIForge Score — valoración EDITORIAL, no opiniones de usuarios.
 *
 * Se calcula de forma determinista a partir de los datos catalogados de cada
 * herramienta, con cuatro ejes sobre 10 y una media ponderada. La fórmula es
 * pública (ver /metodologia) para que la puntuación sea auditable y
 * reproducible: mismos datos → misma puntuación.
 */
export interface EditorialScore {
  utility: number;
  quality: number;
  price: number;
  ease: number;
  overall: number;
}

export const SCORE_WEIGHTS = { utility: 0.3, quality: 0.3, price: 0.2, ease: 0.2 } as const;

export const SCORE_AXIS_LABELS: Record<keyof Omit<EditorialScore, "overall">, string> = {
  utility: "Utilidad",
  quality: "Calidad",
  price: "Precio",
  ease: "Facilidad",
};

const round1 = (n: number) => Math.round(n * 10) / 10;
const clamp = (n: number) => Math.min(10, Math.max(0, n));

export function editorialScore(tool: Tool): EditorialScore {
  // Base editorial del catálogo (0–5) reescalada a 0–10.
  const base = tool.rating * 2;

  const quality = clamp(round1(base));

  const utility = clamp(
    round1(base + (tool.features.length >= 5 ? 0.4 : 0) + (tool.useCases.length >= 4 ? 0.3 : 0) - tool.cons.length * 0.1),
  );

  const price = clamp(
    tool.pricing === "gratis" ? 10 : tool.pricing === "freemium" ? (tool.freeTier ? 8.5 : 7.5) : 6.5,
  );

  const ease = clamp(
    tool.levels.includes("principiante") ? 9 : tool.levels.includes("intermedio") ? 7.5 : 6,
  );

  const overall = round1(
    utility * SCORE_WEIGHTS.utility +
      quality * SCORE_WEIGHTS.quality +
      price * SCORE_WEIGHTS.price +
      ease * SCORE_WEIGHTS.ease,
  );

  return { utility, quality, price, ease, overall };
}

/** Nivel de dificultad declarado a partir de los niveles soportados. */
export function difficultyLabel(tool: Tool): string {
  if (tool.levels.includes("principiante")) return "Principiante";
  if (tool.levels.includes("intermedio")) return "Intermedio";
  return "Avanzado";
}
