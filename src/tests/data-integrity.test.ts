import { describe, expect, it } from "vitest";
import { tools, toolBySlug, freeTools, popularTools } from "@/data/tools";
import { categories, categoryBySlug } from "@/data/categories";
import { comparisons, comparisonsForTool } from "@/data/comparisons";
import { articles, articleUrl, articleBySlug } from "@/data/articles";
import { interactiveApps, appBySlug } from "@/data/apps";

const slugRe = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

describe("integridad del catálogo", () => {
  it("no hay slugs duplicados entre herramientas y utilidades", () => {
    const all = [...tools.map((t) => t.slug), ...interactiveApps.map((a) => a.slug)];
    expect(new Set(all).size).toBe(all.length);
  });

  it("todas las herramientas tienen datos completos y válidos", () => {
    for (const tool of tools) {
      expect(tool.slug).toMatch(slugRe);
      expect(tool.name.length).toBeGreaterThan(1);
      expect(tool.description.length).toBeGreaterThan(40);
      expect(categoryBySlug(tool.category), `categoría inválida en ${tool.slug}`).toBeDefined();
      expect(tool.features.length).toBeGreaterThan(0);
      expect(tool.pros.length).toBeGreaterThan(0);
      expect(tool.cons.length).toBeGreaterThan(0);
      expect(tool.useCases.length).toBeGreaterThan(0);
      expect(tool.rating).toBeGreaterThan(0);
      expect(tool.rating).toBeLessThanOrEqual(5);
      expect(tool.officialUrl).toMatch(/^https:\/\//);
      expect(Number.isNaN(Date.parse(tool.lastReviewed))).toBe(false);
    }
  });

  it("todas las alternativas apuntan a herramientas existentes", () => {
    for (const tool of tools) {
      for (const alt of tool.alternatives) {
        expect(toolBySlug(alt), `${tool.slug} → ${alt}`).toBeDefined();
        expect(alt).not.toBe(tool.slug);
      }
    }
  });

  it("las comparativas referencian herramientas reales", () => {
    for (const c of comparisons) {
      expect(toolBySlug(c.toolA), c.slug).toBeDefined();
      expect(toolBySlug(c.toolB), c.slug).toBeDefined();
      expect(c.toolA).not.toBe(c.toolB);
    }
    expect(comparisonsForTool("chatgpt").length).toBeGreaterThan(0);
  });

  it("los artículos generan URLs válidas y sin duplicados", () => {
    const urls = articles.map(articleUrl);
    expect(new Set(urls).size).toBe(urls.length);
    for (const a of articles) {
      expect(a.slug).toMatch(slugRe);
      expect(articleBySlug(a.slug)).toBeDefined();
      expect(articleUrl(a)).toMatch(/^\/(blog|guias|tutoriales)\//);
      expect(a.content.length).toBeGreaterThan(0);
      expect(a.relatedTools.every((t) => typeof t === "string")).toBe(true);
    }
  });

  it("cada categoría del menú tiene al menos una herramienta", () => {
    for (const cat of categories) {
      expect(tools.filter((t) => t.category === cat.slug).length, cat.slug).toBeGreaterThan(0);
    }
  });

  it("los listados destacados no están vacíos", () => {
    expect(freeTools.length).toBeGreaterThan(0);
    expect(popularTools.length).toBeGreaterThan(0);
    expect(interactiveApps.length).toBeGreaterThan(0);
    for (const app of interactiveApps) expect(appBySlug(app.slug)).toBeDefined();
  });
});
