import { Link } from "@tanstack/react-router";
import { articleBySlug, articleUrl } from "@/data/articles";
import { toolBySlug } from "@/data/tools";
import { ToolMark } from "@/components/ToolCard";

/** Enlazado interno: herramientas y artículos relacionados de una página. */
export function RelatedContent({ tools = [], articles = [] }: { tools?: string[]; articles?: string[] }) {
  const toolItems = tools.map(toolBySlug).filter((t) => t !== undefined);
  const articleItems = articles.map(articleBySlug).filter((a) => a !== undefined);
  if (toolItems.length === 0 && articleItems.length === 0) return null;

  return (
    <aside className="mt-16 border-t border-border pt-10" aria-label="Contenido relacionado">
      <h2 className="label-mono mb-6 text-muted-foreground">Relacionado</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {toolItems.map((tool) => (
          <Link
            key={tool.slug}
            to="/herramientas/$slug"
            params={{ slug: tool.slug }}
            className="flex items-center gap-4 rounded-xl bg-card p-4 ring-1 ring-border transition-shadow hover:shadow-lg"
          >
            <ToolMark initials={tool.initials} className="size-10 text-sm" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{tool.name}</p>
              <p className="truncate text-xs text-muted-foreground">{tool.tagline}</p>
            </div>
          </Link>
        ))}
        {articleItems.map((article) => (
          <Link
            key={article.slug}
            to={articleUrl(article)}
            className="rounded-xl bg-card p-4 ring-1 ring-border transition-shadow hover:shadow-lg"
          >
            <p className="label-mono mb-2 text-muted-foreground">{article.category}</p>
            <p className="text-sm leading-snug font-semibold">{article.title}</p>
          </Link>
        ))}
      </div>
    </aside>
  );
}
