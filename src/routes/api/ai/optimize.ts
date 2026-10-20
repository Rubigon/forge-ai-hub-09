import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/api/ai/optimize")({
  server: { handlers: { POST: async ({ request }) => {
    // Same-origin first-party paid tool; no public-prefix auth bypass.
    const origin = request.headers.get("origin");
    if (!origin || origin !== new URL(request.url).origin) return Response.json({ message: "Solicitud no autorizada." }, { status: 403 });
    try {
      const input = z.object({ prompt: z.string().trim().min(10).max(12000) }).strict().safeParse(await request.json());
      if (!input.success) return Response.json({ message: "Escribe entre 10 y 12.000 caracteres." }, { status: 400 });
      const apiKey = process.env["LOVABLE_API_KEY"];
      if (!apiKey) return Response.json({ message: "El servicio de IA no está configurado. Contacta con AIForge." }, { status: 401 });
      const { handleOptimization } = await import("@/lib/ai/optimize.server");
      return await handleOptimization(request, input.data.prompt, apiKey);
    } catch (error) {
      if (request.signal.aborted) return new Response(null, { status: 499 });
      if (error instanceof SyntaxError) return Response.json({ message: "Solicitud no válida." }, { status: 400 });
      console.error("AI optimization request failed", error instanceof Error ? error.name : "UnknownError");
      return Response.json({ message: "El servicio de IA está temporalmente no disponible. Tu texto se ha conservado." }, { status: 503 });
    }
  } } },
});