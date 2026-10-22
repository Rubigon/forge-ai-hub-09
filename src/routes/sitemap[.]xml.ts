import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { site } from "@/config/site";

const BASE_URL = "https://www.forge-ai-hub.com";

// Rutas estáticas principales del sitio
const staticPages = [
  "",
  "/herramientas",
  "/comparativas",
  "/guias",
  "/directorio-ia",
  "/blog",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        // 1. Consultar herramientas en Supabase
        const { data: tools } = await supabase
          .from("tools")
          .select("slug, updated_at");

        // 2. Consultar artículos del blog en Supabase
        const { data: posts } = await supabase
          .from("posts")
          .select("slug, updated_at");

        // Generar URLs estáticas
        const staticUrls = staticPages
          .map(
            (page) => `
  <url>
    <loc>${BASE_URL}${page}</loc>
    <changefreq>daily</changefreq>
    <priority>${page === "" ? "1.0" : "0.8"}</priority>
  </url>`
          )
          .join("");

        // Generar URLs dinámicas de herramientas
        const toolUrls = (tools || [])
          .map(
            (tool) => `
  <url>
    <loc>${BASE_URL}/herramientas/${tool.slug}</loc>
    <lastmod>${
      tool.updated_at
        ? new Date(tool.updated_at).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0]
    }</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
          )
          .join("");

        // Generar URLs dinámicas del blog
        const postUrls = (posts || [])
          .map(
            (post) => `
  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${
      post.updated_at
        ? new Date(post.updated_at).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0]
    }</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
          )
          .join("");

        const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticUrls}
  ${toolUrls}
  ${postUrls}
</urlset>`;

        return new Response(sitemapXml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=3600",
          },
        });
      },
    },
  },
});
