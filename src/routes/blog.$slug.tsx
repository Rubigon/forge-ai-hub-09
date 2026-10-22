import { createFileRoute, notFound } from "@tanstack/react-router";
import { catalogQueryOptions, useCatalog } from "@/lib/catalog";
import { ArticleDetailPage, articleHead } from "@/components/ArticlePage";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params, context }) => {
    const catalog = await context.queryClient.ensureQueryData(catalogQueryOptions());
    const article = catalog.articles.find((article) => article.slug === params.slug && article.type === "blog");
    if (!article) throw notFound();
    return { slug: params.slug, article };
  },
  head: ({ params, loaderData }) => articleHead(loaderData?.article, "/blog", params.slug),
  component: BlogArticle,
});

function BlogArticle() {
  const { slug } = Route.useLoaderData();
  const { articles } = useCatalog();
  const article = articles.find((item) => item.slug === slug);
  if (!article) return null;
  return <ArticleDetailPage article={article} />;
}
