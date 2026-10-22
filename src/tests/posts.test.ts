import { describe, expect, it } from "vitest";
import { mergeArticles, postToArticle } from "@/lib/posts";
import type { Tables } from "@/integrations/supabase/types";

const post: Tables<"posts"> = {
  id: "post-1", slug: "chatgpt-vs-claude-vs-gemini-2026",
  title: "ChatGPT vs Claude vs Gemini: Comparativa Real de los 3 Grandes Modelos de IA",
  description: "Comparativa de los tres modelos", category: "Comparativas",
  content: "## Tabla Comparativa\n\n| Criterio | ChatGPT | Claude | Gemini |\n| --- | --- | --- | --- |\n| Código | Notable | Sobresaliente | Bueno |",
  published: true, created_at: "2026-10-22T17:35:00Z", updated_at: "2026-10-22T17:35:00Z",
};

describe("database article adapter", () => {
  it("preserves the post slug, category and original Markdown in a blog article", () => {
    const article = postToArticle(post);
    expect(article.slug).toBe("chatgpt-vs-claude-vs-gemini-2026");
    expect(article.category).toBe("Comparativas");
    expect(article.type).toBe("blog");
    expect(article.content).toEqual([{ type: "markdown", text: post.content }]);
  });
  it("uses the database version for duplicate slugs without losing existing articles", () => {
    const old = postToArticle({ ...post, title: "Old title" });
    const other = postToArticle({ ...post, slug: "other-article" });
    const merged = mergeArticles([old, other], [postToArticle(post)]);
    expect(merged).toHaveLength(2);
    expect(merged.find((article) => article.slug === post.slug)?.title).toBe(post.title);
    expect(merged.some((article) => article.slug === "other-article")).toBe(true);
  });
});