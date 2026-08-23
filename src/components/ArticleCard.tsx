import { Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { articleUrl } from "@/data/articles";
import { formatDate } from "@/lib/seo";
import type { Article } from "@/types";

const typeLabels: Record<Article["type"], string> = {
  blog: "Blog",
  guia: "Guía",
  tutorial: "Tutorial",
};

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      to={articleUrl(article)}
      className="group flex h-full flex-col rounded-xl bg-card p-6 ring-1 ring-border transition-all hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="mb-4 flex items-center gap-2">
        <span className="label-mono rounded bg-muted px-2 py-1 text-muted-foreground">{typeLabels[article.type]}</span>
        <span className="text-xs text-muted-foreground">{article.category}</span>
      </div>
      <h3 className="mb-2 font-display text-lg leading-snug font-semibold group-hover:underline">{article.title}</h3>
      <p className="mb-6 line-clamp-2 flex-1 text-sm text-muted-foreground">{article.excerpt}</p>
      <div className="flex items-center justify-between border-t border-border pt-4 font-mono text-[11px] text-muted-foreground">
        <span>Actualizado: {formatDate(article.updatedAt)}</span>
        <span className="flex items-center gap-1">
          <Clock className="size-3" aria-hidden /> {article.readingMinutes} min
        </span>
      </div>
    </Link>
  );
}
