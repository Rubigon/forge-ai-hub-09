/**
 * Capa de abstracción AIProvider.
 *
 * Objetivo: que las herramientas de AIForge no dependan de un proveedor
 * concreto. Para activar IA real:
 *
 * 1. Provisiona la clave (LOVABLE_API_KEY) — nunca en el frontend.
 * 2. Implementa `complete()` en un server function (createServerFn) usando
 *    el gateway de IA (p. ej. google/gemini-3.7-flash vía AI SDK).
 * 3. Inyecta el provider en las herramientas; las UI ya gestionan los
 *    estados loading / success / error / rate-limit.
 *
 * Ejemplo de implementación (server-side):
 *
 *   const gateway = createOpenAICompatible({
 *     name: "lovable",
 *     baseURL: "https://ai.gateway.lovable.dev/v1",
 *     headers: { "Lovable-API-Key": process.env.LOVABLE_API_KEY! },
 *   });
 *   const result = await generateText({ model: gateway("google/gemini-3.7-flash"), prompt });
 */

export interface AIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface AICompletionOptions {
  messages: AIMessage[];
  /** Límite de salida en tokens (el proveedor decide cómo aplicarlo). */
  maxTokens?: number;
}

export interface AIProvider {
  id: string;
  complete(options: AICompletionOptions): Promise<string>;
}

export type AIProviderErrorCode = "not_configured" | "rate_limited" | "failed";

export class AIProviderError extends Error {
  constructor(
    public code: AIProviderErrorCode,
    message: string,
  ) {
    super(message);
    this.name = "AIProviderError";
  }
}

/** Provider sin configurar: falla de forma explícita y controlada. */
export const unconfiguredProvider: AIProvider = {
  id: "unconfigured",
  async complete() {
    throw new AIProviderError(
      "not_configured",
      "El proveedor de IA no está configurado. Activa Lovable Cloud y añade LOVABLE_API_KEY en el servidor.",
    );
  },
};
