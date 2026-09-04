import { describe, expect, it } from "vitest";
import { buildSearchIndex, searchItems } from "@/lib/search";
import { optimizePrompt } from "@/lib/prompt-optimizer";
import { estimateCost, estimateTokens, modelPrices } from "@/data/model-prices";
import { breadcrumbJsonLd, formatDate, softwareApplicationJsonLd } from "@/lib/seo";
import { tools } from "@/data/tools";

describe("buscador", () => {
  const index = buildSearchIndex();

  it("indexa herramientas, comparativas y contenidos", () => {
    expect(index.length).toBeGreaterThan(30);
    const types = new Set(index.map((i) => i.type));
    expect(types.size).toBeGreaterThan(1);
    for (const item of index) expect(item.url.startsWith("/")).toBe(true);
  });

  it("encuentra resultados relevantes e ignora mayúsculas y acentos del término", () => {
    expect(searchItems("chatgpt", index).some((i) => i.url.includes("chatgpt"))).toBe(true);
    expect(searchItems("CHATGPT", index).length).toBeGreaterThan(0);
    expect(searchItems("programar", index).length).toBeGreaterThan(0);
  });

  it("devuelve lista vacía con términos sin coincidencias y respeta el límite", () => {
    expect(searchItems("qwertzuiop", index)).toEqual([]);
    expect(searchItems("a", index, 5).length).toBeLessThanOrEqual(5);
  });
});

describe("optimizador de prompts", () => {
  it("estructura un prompt vago añadiendo contexto", () => {
    const out = optimizePrompt("escribeme un email");
    expect(out.length).toBeGreaterThan("escribeme un email".length);
    expect(out.toLowerCase()).toContain("email");
  });

  it("es determinista y no rompe con entrada vacía", () => {
    expect(optimizePrompt("hola")).toBe(optimizePrompt("hola"));
    expect(() => optimizePrompt("")).not.toThrow();
  });
});

describe("calculadora de costes", () => {
  it("estima tokens de forma creciente con la longitud", () => {
    expect(estimateTokens("")).toBe(0);
    expect(estimateTokens("Hola mundo")).toBeGreaterThan(0);
    expect(estimateTokens("Hola mundo ".repeat(50))).toBeGreaterThan(estimateTokens("Hola mundo"));
  });

  it("calcula coste proporcional al número de peticiones", () => {
    const model = modelPrices[0]!;
    const one = estimateCost(1000, 1000, model, 1);
    const ten = estimateCost(1000, 1000, model, 10);
    expect(one).toBeGreaterThan(0);
    expect(ten).toBeCloseTo(one * 10, 6);
  });

  it("todos los modelos tienen precios positivos", () => {
    for (const m of modelPrices) {
      expect(m.inputPer1M).toBeGreaterThan(0);
      expect(m.outputPer1M).toBeGreaterThan(0);
    }
  });
});

describe("SEO", () => {
  it("genera breadcrumbs con posiciones correlativas", () => {
    const ld = breadcrumbJsonLd([
      { name: "Inicio", url: "/" },
      { name: "Herramientas", url: "/herramientas" },
    ]);
    expect(ld.itemListElement.map((i) => i.position)).toEqual([1, 2]);
  });

  it("genera JSON-LD válido para una herramienta", () => {
    const tool = tools[0]!;
    const ld = softwareApplicationJsonLd(tool, `/herramientas/${tool.slug}`);
    expect(ld["@type"]).toBe("SoftwareApplication");
    expect(JSON.parse(JSON.stringify(ld)).name).toBe(tool.name);
  });

  it("formatea fechas en español", () => {
    expect(formatDate("2026-01-15")).toMatch(/2026/);
  });
});

describe("AIForge Score editorial", () => {
  it("da una puntuación 0-10 y es determinista", () => {
    for (const tool of tools) {
      const score = editorialScore(tool);
      expect(score.overall).toBeGreaterThan(0);
      expect(score.overall).toBeLessThanOrEqual(10);
      expect(editorialScore(tool)).toEqual(score);
    }
  });
});

describe("Utilidades interactivas", () => {
  it("incluye las seis utilidades de la Prioridad 1", () => {
    const slugs = interactiveApps.map((a) => a.slug);
    for (const slug of [
      "optimizador-prompts",
      "calculadora-tokens",
      "calculadora-costes-ia",
      "formateador-json",
      "probador-regex",
      "formateador-sql",
    ]) {
      expect(slugs).toContain(slug);
    }
  });
});

describe("Buscador agrupado", () => {
  it("agrupa resultados por tipo y permite filtrar por precio", () => {
    const index = buildSearchIndex();
    const groups = groupResults(searchItems("ia", index, 50));
    expect(groups.length).toBeGreaterThan(0);
    const gratis = searchItems("ia", index, 50, { pricing: "gratis" });
    expect(gratis.every((r) => !r.pricing || r.pricing === "gratis")).toBe(true);
  });
});
