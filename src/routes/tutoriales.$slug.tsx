import { createFileRoute } from "@tanstack/react-router";
import { articleBySlug } from "@/data/articles";
import { ArticleDetailPage, articleHead, getArticleOrThrow } from "@/components/ArticlePage";

export const Route = createFileRoute("/tutoriales/$slug")({
  loader: ({ params }) => {
    getArticleOrThrow("tutorial", params.slug);
    return { slug: params.slug };
  },
  head: ({ params }) => articleHead(articleBySlug(params.slug), "/tutoriales", params.slug),
  component: TutorialArticle,
});

function TutorialArticle() {
  const { slug } = Route.useLoaderData();
  const article = articleBySlug(slug);
  if (!article) return null;
  return <ArticleDetailPage article={article} />;
}
