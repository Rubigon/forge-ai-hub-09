import { useEffect } from "react";
import { Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock } from "lucide-react";
import { articleBasePath, articleBySlug, articleUrl } from "@/data/articles";
import { useCatalog } from "@/lib/catalog";
import { articleJsonLd, breadcrumbJsonLd, formatDate } from "@/lib/seo";
import { trackEvent } from "@/lib/analytics";
import { AdSlot } from "@/components/AdSlot";
import { ArticleCard } from "@/components/ArticleCard";
import { ArticleRenderer, slugify } from "@/components/ArticleRenderer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedContent } from "@/components/RelatedContent";
import type { Article, ArticleType } from "@/types";

export function articleHead(article: Article | undefined, base: string, slug: string) {
  if (!article) {
    return { meta: [{ title: "Artículo no encontrado — AIForge" }, { name: "robots", content: "noindex" }] };
  }
  const url = `${base}/${article.slug}`;
  return {
    meta: [
      { title: `${article.title} — AIForge` },
      { name: "description", content: article.excerpt },
      { property: "og:title", content: article.title },
      { property: "og:description", content: article.excerpt },
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(articleJsonLd(article, url)) },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Inicio", url: "/" },
            { name: base.slice(1), url: base },
            { name: article.title, url },
          ]),
        ),
      },
    ],
  };
}

export function getArticleOrThrow(type: ArticleType, slug: string) {
  const article = articleBySlug(slug);
  if (!article || article.type !== type) throw notFound();
  return article;
}

export function ArticleListPage({
  type,
  title,
  description,
}: {
  type: ArticleType;
  title: string;
  description: string;
}) {
  const { articles } = useCatalog();
  const list = articles.filter((article) => article.type === type);
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <Breadcrumbs crumbs={[{ name: "Inicio", url: "/" }, { name: title, url: articleBasePath[type] }]} />
      <header className="mb-12 max-w-2xl">
        <h1 className="mb-3 font-display text-4xl font-extrabold tracking-tight">{title}</h1>
        <p className="text-lg text-muted-foreground">{description}</p>
      </header>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </main>
  );
}

export function ArticleDetailPage({ article }: { article: Article }) {
  useEffect(() => {
    trackEvent("article_view", { slug: article.slug });
  }, [article.slug]);

  const toc = article.content.flatMap((block) => {
    if (block.type === "h2") return [{ text: block.text }];
    if (block.type === "markdown") return [...block.text.matchAll(/^## (.+)$/gm)].map((match) => ({ text: match[1] ?? "" }));
    return [];
  });

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <Breadcrumbs
        crumbs={[
          { name: "Inicio", url: "/" },
          { name: articleBasePath[article.type].slice(1), url: articleBasePath[article.type] },
          { name: article.title, url: articleUrl(article) },
        ]}
      />
      <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
        <article className="max-w-3xl">
          <header className="mb-10">
            <p className="label-mono mb-4 text-muted-foreground">{article.category}</p>
            <h1 className="mb-4 font-display text-4xl leading-tight font-extrabold tracking-tight text-balance">
              {article.title}
            </h1>
            <p className="mb-6 text-lg leading-relaxed text-muted-foreground">{article.excerpt}</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-border py-4 font-mono text-xs text-muted-foreground">
              <span>
                Por{" "}
                <Link to="/autor" className="text-foreground hover:underline">
                  {article.author}
                </Link>
              </span>
              <span>Publicado: {formatDate(article.publishedAt)}</span>
              <span className="font-semibold text-foreground">Actualizado: {formatDate(article.updatedAt)}</span>
              <span className="flex items-center gap-1">
                <Clock className="size-3" aria-hidden /> {article.readingMinutes} min de lectura
              </span>
            </div>
          </header>

          <AdSlot position="top-content" className="mb-10" />
          <ArticleRenderer blocks={article.content} />

          {article.sources.length > 0 && (
            <section className="mt-12 rounded-xl bg-muted/50 p-6" aria-labelledby="fuentes">
              <h2 id="fuentes" className="label-mono mb-4 text-muted-foreground">
                Fuentes
              </h2>
              <ul className="space-y-2 text-sm">
                {article.sources.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-border underline-offset-4 hover:decoration-foreground"
                    >
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-8 flex flex-wrap gap-2" aria-label="Etiquetas">
            {article.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-muted px-3 py-1 font-mono text-xs text-muted-foreground">
                #{tag}
              </span>
            ))}
          </div>

          <AdSlot position="bottom-content" className="mt-10" />
          <RelatedContent tools={article.relatedTools} articles={article.relatedArticles} />

          <Link
            to={articleBasePath[article.type]}
            className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden /> Volver
          </Link>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            {toc.length > 0 && (
              <nav aria-label="Tabla de contenidos" className="rounded-xl border border-border p-5">
                <p className="label-mono mb-4 text-muted-foreground">Contenido</p>
                <ul className="space-y-2.5 text-sm">
                  {toc.map((block) => (
                    <li key={block.text}>
                      <a href={`#${slugify(block.text)}`} className="text-muted-foreground hover:text-foreground">
                        {block.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
            <AdSlot position="sidebar" />
          </div>
        </aside>
      </div>
    </main>
  );
}
