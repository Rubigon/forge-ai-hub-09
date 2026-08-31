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
  { id: "gpt-4-1", label: "GPT-4.1 (ejemplo)", provider: "OpenAI", inputPer1M: 2, outputPer1M: 8 },
  { id: "gpt-4-1-mini", label: "GPT-4.1 mini (ejemplo)", provider: "OpenAI", inputPer1M: 0.4, outputPer1M: 1.6 },
  { id: "o4-mini", label: "o4-mini (ejemplo)", provider: "OpenAI", inputPer1M: 1.1, outputPer1M: 4.4 },
  { id: "claude-opus", label: "Claude Opus (ejemplo)", provider: "Anthropic", inputPer1M: 15, outputPer1M: 75 },
  { id: "gemini-flash-lite", label: "Gemini Flash Lite (ejemplo)", provider: "Google", inputPer1M: 0.04, outputPer1M: 0.15 },
  { id: "mistral-large", label: "Mistral Large (ejemplo)", provider: "Mistral", inputPer1M: 2, outputPer1M: 6 },
  { id: "mistral-small", label: "Mistral Small (ejemplo)", provider: "Mistral", inputPer1M: 0.2, outputPer1M: 0.6 },
  { id: "llama-3-70b", label: "Llama 3.3 70B (ejemplo)", provider: "Meta / Groq", inputPer1M: 0.59, outputPer1M: 0.79 },
  { id: "deepseek-chat", label: "DeepSeek V3 (ejemplo)", provider: "DeepSeek", inputPer1M: 0.27, outputPer1M: 1.1 },
  { id: "grok-3-mini", label: "Grok 3 mini (ejemplo)", provider: "xAI", inputPer1M: 0.3, outputPer1M: 0.5 },
  { id: "command-r-plus", label: "Command R+ (ejemplo)", provider: "Cohere", inputPer1M: 2.5, outputPer1M: 10 },
  { id: "perplexity-sonar", label: "Sonar (ejemplo)", provider: "Perplexity", inputPer1M: 1, outputPer1M: 1 },
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
