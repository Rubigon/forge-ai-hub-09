import { afterEach, describe, expect, it, vi } from "vitest";
import { catalogService } from "@/lib/catalog";
import { aiErrorForStatus } from "@/lib/ai/errors";
import { consumeAIStream } from "@/lib/ai/stream";
import { aiProvider } from "@/lib/ai/provider";

vi.mock("@/lib/posts.functions", () => ({ getPublicPosts: vi.fn().mockResolvedValue([]) }));

afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });

describe("async catalog adapter", () => {
  it("waits for simulated latency and returns all three collections", async () => {
    vi.useFakeTimers();
    let resolved = false;
    const pending = catalogService.getCatalog().then((data) => { resolved = true; return data; });
    await vi.advanceTimersByTimeAsync(119);
    expect(resolved).toBe(false);
    await vi.advanceTimersByTimeAsync(1);
    const data = await pending;
    expect(data.tools.some((tool) => tool.slug === "chatgpt")).toBe(true);
    expect(data.apps.some((app) => app.slug === "optimizador-prompts")).toBe(true);
    expect(data.articles.length).toBeGreaterThan(0);
    data.tools.length = 0;
    const next = catalogService.getCatalog();
    await vi.advanceTimersByTimeAsync(120);
    expect((await next).tools.length).toBeGreaterThan(0);
  });
  it("cancels catalog loading", async () => {
    const abort = new AbortController(); abort.abort();
    await expect(catalogService.getCatalog(abort.signal)).rejects.toMatchObject({ name: "AbortError" });
  });
});

describe("AI error rules", () => {
  it.each([[401, "not_configured"], [429, "rate_limited"], [403, "denied"], [402, "credits"], [503, "failed"]])("preserves HTTP %s and maps its category", (status, code) => {
    const error = aiErrorForStatus(Number(status), "Safe upstream reason");
    expect(error.status).toBe(status);
    expect(error.code).toBe(code);
    expect(error.message).toBe("Safe upstream reason");
  });
  it("reports network failure without retries or mock output", async () => {
    const fetcher = vi.fn().mockRejectedValue(new TypeError("Failed to fetch"));
    vi.stubGlobal("fetch", fetcher);
    await expect(aiProvider.complete({ messages: [{ role: "user", content: "Optimize this prompt" }] })).rejects.toMatchObject({ code: "network" });
    expect(fetcher).toHaveBeenCalledTimes(1);
  });
  it("preserves the safe denial and never retries", async () => {
    const fetcher = vi.fn().mockResolvedValue(Response.json({ message: "Provider access denied" }, { status: 403 }));
    vi.stubGlobal("fetch", fetcher);
    await expect(aiProvider.complete({ messages: [{ role: "user", content: "Optimize this prompt" }] })).rejects.toMatchObject({ status: 403, message: "Provider access denied" });
    expect(fetcher).toHaveBeenCalledTimes(1);
  });
});

function sse(events: unknown[]) {
  const bytes = new TextEncoder().encode(events.map((event) => `data: ${JSON.stringify(event)}\n\n`).join(""));
  return new Response(new ReadableStream({ start(controller) { for (const byte of bytes) controller.enqueue(new Uint8Array([byte])); controller.close(); } }));
}
describe("AI stream reader", () => {
  it("handles separate metadata and fragmented UTF-8 frames before live text", async () => {
    const deltas: string[] = [];
    const response = sse([{ type: "response.created" }, { type: "response.reasoning_summary_text.delta", delta: "thinking" }, { type: "response.output_text.delta", delta: "Objetivo: " }, { type: "response.output_text.delta", delta: "日本語" }, { type: "response.completed" }]);
    expect(await consumeAIStream(response, (text) => deltas.push(text))).toBe("Objetivo: 日本語");
    expect(deltas).toEqual(["Objetivo: ", "日本語"]);
  });
  it("ends a refusal even with HTTP 200", async () => {
    await expect(consumeAIStream(sse([{ type: "response.refusal.delta", delta: "Cannot comply" }]))).rejects.toMatchObject({ code: "refusal" });
  });
  it("rejects empty or interrupted responses", async () => {
    await expect(consumeAIStream(sse([{ type: "response.completed" }]))).rejects.toMatchObject({ code: "failed" });
    await expect(consumeAIStream(sse([{ type: "response.output_text.delta", delta: "partial" }]))).rejects.toMatchObject({ code: "failed" });
  });
});