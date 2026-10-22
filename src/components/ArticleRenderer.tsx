import type { ContentBlock } from "@/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/** Renderiza los bloques estructurados de un artículo con tipografía editorial. */
export function ArticleRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="max-w-none">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "markdown":
            return <ReactMarkdown key={i} remarkPlugins={[remarkGfm]} components={{
              h2: ({ children }) => <h2 id={slugify(String(children))} className="mt-12 mb-4 scroll-mt-24 font-display text-2xl font-extrabold">{children}</h2>,
              h3: ({ children }) => <h3 className="mt-8 mb-3 font-display text-xl font-semibold">{children}</h3>,
              p: ({ children }) => <p className="mb-5 leading-relaxed text-foreground/90">{children}</p>,
              ul: ({ children }) => <ul className="mb-5 list-disc space-y-2 pl-6 leading-relaxed text-foreground/90">{children}</ul>,
              ol: ({ children }) => <ol className="mb-5 list-decimal space-y-2 pl-6 leading-relaxed text-foreground/90">{children}</ol>,
              hr: () => <hr className="my-8 border-border" />,
              table: ({ children }) => <div className="my-6 overflow-x-auto"><table className="w-full min-w-[560px] border-collapse text-sm">{children}</table></div>,
              th: ({ children }) => <th className="border border-border bg-muted p-3 text-start font-semibold">{children}</th>,
              td: ({ children }) => <td className="border border-border p-3 align-top">{children}</td>,
              a: ({ href, children }) => <a href={href} className="underline underline-offset-4" rel="noopener noreferrer">{children}</a>,
            }}>{block.text}</ReactMarkdown>;
          case "h2":
            return (
              <h2 key={i} id={slugify(block.text)} className="mt-12 mb-4 scroll-mt-24 font-display text-2xl font-extrabold tracking-tight">
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-8 mb-3 font-display text-xl font-semibold">
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className="mb-5 leading-relaxed text-foreground/90">
                {block.text}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="mb-5 list-disc space-y-2 pl-6 leading-relaxed text-foreground/90">
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="mb-5 list-decimal space-y-2 pl-6 leading-relaxed text-foreground/90">
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="my-8 border-l-2 border-primary pl-5 font-display text-lg font-medium text-foreground/80 italic"
              >
                {block.text}
              </blockquote>
            );
          case "code":
            return (
              <figure key={i} className="my-6 overflow-hidden rounded-lg bg-forge">
                <figcaption className="border-b border-forge-border px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-forge-muted">
                  {block.lang}
                </figcaption>
                <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-forge-foreground">
                  <code>{block.code}</code>
                </pre>
              </figure>
            );
        }
      })}
    </div>
  );
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
