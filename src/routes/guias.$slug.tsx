import { createFileRoute } from "@tanstack/react-router";
import { articleBySlug } from "@/data/articles";
import { ArticleDetailPage, articleHead, getArticleOrThrow } from "@/components/ArticlePage";

export const Route = createFileRoute("/guias/$slug")({
  loader: ({ params }) => {
    getArticleOrThrow("guia", params.slug);
    return { slug: params.slug };
  },
  head: ({ params }) => articleHead(articleBySlug(params.slug), "/guias", params.slug),
  component: GuiaArticle,
});

function GuiaArticle() {
  const { slug } = Route.useLoaderData();
  const article = articleBySlug(slug);
  if (!article) return null;
  return <ArticleDetailPage article={article} />;
}
