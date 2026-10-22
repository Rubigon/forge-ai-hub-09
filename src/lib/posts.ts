import type { Tables } from "@/integrations/supabase/types";
import type { Article } from "@/types";

export function postToArticle(post: Tables<"posts">): Article {
  return {
    slug: post.slug,
    type: "blog",
    title: post.title,
    excerpt: post.description,
    category: post.category,
    tags: [],
    author: "Equipo AIForge",
    publishedAt: post.created_at,
    updatedAt: post.updated_at,
    readingMinutes: Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200)),
    content: [{ type: "markdown", text: post.content }],
    sources: [],
    relatedTools: [],
    relatedArticles: [],
  };
}

export function mergeArticles(existing: Article[], incoming: Article[]): Article[] {
  return [...new Map([...existing, ...incoming].map((article) => [article.slug, article])).values()];
}