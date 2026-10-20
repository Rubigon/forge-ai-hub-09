export type AIProviderErrorCode = "not_configured" | "rate_limited" | "denied" | "credits" | "failed" | "network" | "refusal";

export class AIProviderError extends Error {
  constructor(public code: AIProviderErrorCode, message: string, public status = 503) {
    super(message);
    this.name = "AIProviderError";
  }
}

export function aiErrorForStatus(status: number, safeMessage?: string): AIProviderError {
  const code = status === 401 ? "not_configured" : status === 429 ? "rate_limited" : status === 403 ? "denied" : status === 402 ? "credits" : "failed";
  const fallback = status === 401 ? "El servicio de IA no está configurado correctamente. Contacta con AIForge." :
    status === 429 ? "Hay demasiadas solicitudes. Espera un momento antes de volver a intentarlo." :
    "El servicio de IA está temporalmente no disponible. Tu texto se ha conservado.";
  return new AIProviderError(code, safeMessage || fallback, status);
}