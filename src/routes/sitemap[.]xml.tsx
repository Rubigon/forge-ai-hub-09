import { createFileRoute } from "@tanstack/react-router";
import { articles, articleUrl } from "@/data/articles";
import { comparisons } from "@/data/comparisons";
import { tools } from "@/data/tools";
import { interactiveApps } from "@/data/apps";

// Sin dominio asignado todavía: se usa el origen de la petición.
function buildSitemap(origin: string) {
  const staticPaths = [
    "/",
    "/herramientas",
    "/comparativas",
    "/directorio-ia",
    "/blog",
    "/guias",
    "/tutoriales",
    "/recursos",
    "/recomendador",
    "/autor",
    "/politica-privacidad",
    "/politica-cookies",
    "/terminos",
    "/aviso-legal",
  ];

  const entries = [
    ...staticPaths.map((path) => ({ path, lastmod: undefined as string | undefined })),
    ...tools.map((t) => ({ path: `/herramientas/${t.slug}`, lastmod: t.lastReviewed })),
    ...interactiveApps.map((a) => ({ path: `/herramientas/${a.slug}`, lastmod: undefined })),
    ...comparisons.map((c) => ({ path: `/comparativas/${c.slug}`, lastmod: c.lastReviewed })),
    ...articles.map((a) => ({ path: articleUrl(a), lastmod: a.updatedAt })),
  ];

  const urls = entries
    .map(
      ({ path, lastmod }) =>
        `  <url><loc>${origin}${path}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin;
        return new Response(buildSitemap(origin), {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});
