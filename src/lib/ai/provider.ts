import { AIProviderError } from "./errors";
import { consumeAIStream } from "./stream";
export { AIProviderError } from "./errors";
export type { AIProviderErrorCode } from "./errors";

export interface AIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface AICompletionOptions {
  messages: AIMessage[];
  maxTokens?: number;
  signal?: AbortSignal;
  onDelta?: (text: string) => void;
}

export interface AIProvider {
  id: string;
  complete(options: AICompletionOptions): Promise<string>;
}

/** Browser facade: secrets, model and optimization instructions live on the server. */
export const aiProvider: AIProvider = {
  id: "lovable-ai",
  async complete({ messages, signal, onDelta }) {
    try {
      const response = await fetch("/api/ai/optimize", {
        method: "POST", signal,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: messages.filter((m) => m.role === "user").map((m) => m.content).join("\n") }),
      });
      return await consumeAIStream(response, onDelta);
    } catch (error) {
      if (signal?.aborted || error instanceof AIProviderError) throw error;
      throw new AIProviderError("network", "No se pudo conectar con la IA. Comprueba tu conexión; tu texto se ha conservado.");
    }
  },
};
