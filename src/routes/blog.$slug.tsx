import { createFileRoute } from "@tanstack/react-router";
import { articleBySlug } from "@/data/articles";
import { ArticleDetailPage, articleHead, getArticleOrThrow } from "@/components/ArticlePage";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    getArticleOrThrow("blog", params.slug);
    return { slug: params.slug };
  },
  head: ({ params }) => articleHead(articleBySlug(params.slug), "/blog", params.slug),
  component: BlogArticle,
});

function BlogArticle() {
  const { slug } = Route.useLoaderData();
  const article = articleBySlug(slug);
  if (!article) return null;
  return <ArticleDetailPage article={article} />;
}
