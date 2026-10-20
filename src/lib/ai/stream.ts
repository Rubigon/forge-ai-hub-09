import { AIProviderError, aiErrorForStatus } from "./errors";

/** SSE framing supports separate metadata, split UTF-8 and multiple frames per chunk. */
export async function consumeAIStream(response: Response, onDelta?: (text: string) => void): Promise<string> {
  if (!response.ok) {
    let message: string | undefined;
    try { const body = await response.json(); message = typeof body.message === "string" ? body.message : undefined; } catch { /* non-JSON proxy error */ }
    throw aiErrorForStatus(response.status, message);
  }
  if (!response.body) throw new AIProviderError("failed", "La IA no ha devuelto una respuesta.");
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "", output = "", completed = false;
  const frame = (value: string) => {
    const data = value.split("\n").filter((line) => line.startsWith("data:")).map((line) => line.slice(5).trimStart()).join("\n");
    if (!data || data === "[DONE]") return;
    const event = JSON.parse(data);
    if (event.type === "response.output_text.delta" && typeof event.delta === "string") { output += event.delta; onDelta?.(event.delta); }
    if (event.type === "response.refusal.delta" || event.type === "response.refusal.done") throw new AIProviderError("refusal", event.refusal || event.delta || "La IA no puede atender esta solicitud.", 422);
    if (event.type === "error" || event.type === "response.failed") {
      const error = event.error || event.response?.error || event;
      throw aiErrorForStatus(error.status || (error.type === "permission_error" ? 403 : 503), error.message);
    }
    if (event.type === "response.incomplete") throw new AIProviderError("failed", "La respuesta se interrumpió. Tu texto se ha conservado.");
    if (event.type === "response.completed") completed = true;
  };
  try {
    while (true) {
      const { value, done } = await reader.read();
      buffer += decoder.decode(value, { stream: !done }).replace(/\r\n/g, "\n");
      let end: number;
      while ((end = buffer.indexOf("\n\n")) >= 0) { frame(buffer.slice(0, end)); buffer = buffer.slice(end + 2); }
      if (done) { if (buffer.trim()) frame(buffer); break; }
    }
    if (!completed || !output.trim()) throw new AIProviderError("failed", "La IA no completó la respuesta. Tu texto se ha conservado.");
    return output;
  } finally {
    await reader.cancel().catch(() => {});
    reader.releaseLock();
  }
}