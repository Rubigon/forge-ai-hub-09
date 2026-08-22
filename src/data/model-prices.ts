/**
 * Precios de modelos para la calculadora de costes.
 * DATOS DE EJEMPLO (USD por 1M de tokens). Actualizar desde la fuente oficial
 * de cada proveedor antes de usar en producción. Al estar en un único archivo
 * de datos, los componentes no necesitan cambios al actualizar precios.
 */
export interface ModelPrice {
  id: string;
  label: string;
  provider: string;
  inputPer1M: number;
  outputPer1M: number;
}

export const modelPrices: ModelPrice[] = [
  { id: "gpt-4o", label: "GPT-4o (ejemplo)", provider: "OpenAI", inputPer1M: 2.5, outputPer1M: 10 },
  { id: "gpt-4o-mini", label: "GPT-4o mini (ejemplo)", provider: "OpenAI", inputPer1M: 0.15, outputPer1M: 0.6 },
  { id: "claude-sonnet", label: "Claude Sonnet (ejemplo)", provider: "Anthropic", inputPer1M: 3, outputPer1M: 15 },
  { id: "claude-haiku", label: "Claude Haiku (ejemplo)", provider: "Anthropic", inputPer1M: 0.8, outputPer1M: 4 },
  { id: "gemini-pro", label: "Gemini Pro (ejemplo)", provider: "Google", inputPer1M: 1.25, outputPer1M: 5 },
  { id: "gemini-flash", label: "Gemini Flash (ejemplo)", provider: "Google", inputPer1M: 0.075, outputPer1M: 0.3 },
];

export const PRICE_DISCLAIMER =
  "Precios orientativos de ejemplo en USD por millón de tokens. Consulta la página oficial de cada proveedor para precios actualizados.";

/** Heurística común: ~4 caracteres por token en español/inglés. */
export function estimateTokens(text: string): number {
  if (!text.trim()) return 0;
  return Math.ceil(text.length / 4);
}

export function estimateCost(tokensIn: number, tokensOut: number, model: ModelPrice, requests: number) {
  const perRequest = (tokensIn / 1_000_000) * model.inputPer1M + (tokensOut / 1_000_000) * model.outputPer1M;
  return perRequest * requests;
}
