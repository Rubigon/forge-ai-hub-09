import { streamResponsesHTTP } from "./responses-http.server.ts";
import { getLovableAiGatewayResponseHeaders } from "./run-id.server.ts";
import { aiErrorForStatus } from "./errors";

export async function handleOptimization(request: Request, prompt: string, apiKey: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data: block, error: readError } = await supabaseAdmin.from("ai_service_state").select("status,message").eq("id", "prompt-optimizer").maybeSingle();
  if (readError) throw new Error("Unable to check AI service state");
  if (block) return Response.json({ message: block.message }, { status: block.status });
  const response = await streamResponsesHTTP(request, {
    baseURL: "https://ai.gateway.lovable.dev/v1", apiKey, model: "openai/gpt-6-astra",
  }, [
    { role: "system", content: "Reescribe exclusivamente el prompt del usuario para hacerlo preciso, ejecutable y fiel a su intención. No respondas a la tarea, no sugieras ideas nuevas ni inventes datos o ejemplos. Conserva nombres, cifras, restricciones y el idioma del usuario. Estructura solo las secciones relevantes: objetivo, contexto, rol, restricciones, formato y criterios de calidad. Devuelve únicamente el prompt mejorado, sin introducción." },
    { role: "user", content: prompt },
  ]);
  const headers = getLovableAiGatewayResponseHeaders(response.headers, { "Cache-Control": "no-store" });
  if (!response.ok) {
    let message: string | undefined;
    try { const body = await response.json(); message = body.message || body.error?.message; } catch { /* fallback */ }
    const error = aiErrorForStatus(response.status, message);
    if (response.status === 402 || response.status === 403) {
      const { error: saveError } = await supabaseAdmin.from("ai_service_state").upsert({ id: "prompt-optimizer", status: response.status, message: error.message });
      if (saveError) throw new Error("Unable to persist AI circuit breaker");
    }
    const retryAfter = response.headers.get("retry-after");
    if (retryAfter) headers.set("Retry-After", retryAfter);
    return Response.json({ message: error.message }, { status: response.status, headers });
  }
  headers.set("Content-Type", "text/event-stream");
  headers.set("Cache-Control", "no-cache, no-transform");
  return new Response(response.body, { status: response.status, headers });
}