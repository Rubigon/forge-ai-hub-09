import { createFileRoute, notFound } from "@tanstack/react-router";
import { catalogQueryOptions, useCatalog } from "@/lib/catalog";
import { articleBySlug } from "@/data/articles";
import { ArticleDetailPage, articleHead } from "@/components/ArticlePage";

export const Route = createFileRoute("/guias/$slug")({
  loader: async ({ params, context }) => {
    const catalog = await context.queryClient.ensureQueryData(catalogQueryOptions());
    if (!catalog.articles.some((article) => article.slug === params.slug && article.type === "guia")) throw notFound();
    return { slug: params.slug };
  },
  head: ({ params }) => articleHead(articleBySlug(params.slug), "/guias", params.slug),
  component: GuiaArticle,
});

function GuiaArticle() {
  const { slug } = Route.useLoaderData();
  const { articles } = useCatalog();
  const article = articles.find((item) => item.slug === slug);
  if (!article) return null;
  return <ArticleDetailPage article={article} />;
}
