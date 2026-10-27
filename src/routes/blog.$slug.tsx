import { createFileRoute, notFound } from "@tanstack/react-router";
import { catalogQueryOptions, useCatalog } from "@/lib/catalog";
import { ArticleDetailPage } from "@/components/ArticlePage";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";

const BASE_DOMAIN = "https://www.forge-ai-hub.com";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params, context }) => {
    const catalog = await context.queryClient.ensureQueryData(catalogQueryOptions());
    const article = catalog.articles.find((item) => item.slug === params.slug && item.type === "blog");
    if (!article) throw notFound();
    return { slug: params.slug, article };
  },
  head: ({ params, loaderData }) => {
    const article = loaderData?.article;
    if (!article) {
      return { meta: [{ title: "Artículo no encontrado — Forge AI Hub" }, { name: "robots", content: "noindex" }] };
    }

    const fullUrl = `${BASE_DOMAIN}/blog/${params.slug}`;
    const title = `${article.title} | Blog Forge AI Hub`;
    const description = article.excerpt || article.description || "";

    return {
      meta: [
        { title },
        { name: "description", content: description.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: description.slice(0, 155) },
        { property: "og:type", content: "article" },
        { property: "og:url", content: fullUrl },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: fullUrl }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(articleJsonLd(article, fullUrl)) },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Inicio", url: `${BASE_DOMAIN}/` },
              { name: "Blog", url: `${BASE_DOMAIN}/blog` },
              { name: article.title, url: fullUrl },
            ]),
          ),
        },
      ],
    };
  },
  component: BlogArticle,
});

function BlogArticle() {
  const { slug } = Route.useLoaderData();
  const { articles } = useCatalog();
  const article = articles.find((item) => item.slug === slug);
  if (!article) return null;
  return <ArticleDetailPage article={article} />;
}
