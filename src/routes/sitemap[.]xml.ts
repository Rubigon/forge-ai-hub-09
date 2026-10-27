import { createFileRoute } from "@tanstack/react-router";
import { tools } from "@/data/tools";
import { interactiveApps } from "@/data/apps";
import { articles, articleUrl } from "@/data/articles";
import { comparisons } from "@/data/comparisons";
import { readPublicPosts } from "@/lib/public-posts";
import { mergeArticles, postToArticle } from "@/lib/posts";

const BASE_URL = "https://www.forge-ai-hub.com";
const staticPages = [
  "",
  "/herramientas",
  "/comparativas",
  "/guias",
  "/tutoriales",
  "/directorio-ia",
  "/blog",
  "/buscar",
  "/recomendador",
  "/recursos",
  "/metodologia",
  "/nosotros",
  "/autor",
  "/precios",
  "/aviso-legal",
  "/politica-privacidad",
  "/politica-cookies",
  "/terminos",
  "/contacto",
];

const escapeXml = (text: string) =>
  text.replace(/[<>&'"]/g, (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[char] ?? char);

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const posts = await readPublicPosts();
        const allArticles = mergeArticles(articles, posts.map(postToArticle));
        const entries = [
          ...staticPages.map((path) => ({ path, date: "" })),
          ...tools.map((tool) => ({ path: `/herramientas/${tool.slug}`, date: tool.lastReviewed })),
          ...interactiveApps.map((app) => ({ path: `/herramientas/${app.slug}`, date: "" })),
          ...comparisons.map((comparison) => ({ path: `/comparativas/${comparison.slug}`, date: comparison.lastReviewed })),
          ...allArticles.map((article) => ({ path: articleUrl(article), date: article.updatedAt })),
        ]
          // 🛡️ Filtro de seguridad: elimina cualquier URL que contenga "$slug"
          .filter((entry) => entry.path && !entry.path.includes("$slug"));

        const urls = entries
          .map(
            ({ path, date }) =>
              `<url><loc>${escapeXml(BASE_URL + path)}</loc>${date ? `<lastmod>${escapeXml(date.split("T")[0] ?? date)}</lastmod>` : ""}</url>`
          )
          .join("\n");

        return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
          headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
