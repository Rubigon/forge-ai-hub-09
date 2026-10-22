import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { tools } from "@/data/tools";
import { interactiveApps } from "@/data/apps";
import { articles } from "@/data/articles";
import { getPublicPosts } from "@/lib/posts.functions";
import { mergeArticles, postToArticle } from "@/lib/posts";

/** Replace this adapter with HTTP/database reads; UI query contracts remain unchanged. */
export const catalogService = {
  async getCatalog(signal?: AbortSignal) {
    await new Promise<void>((resolve, reject) => {
      if (signal?.aborted) { reject(new DOMException("Cancelled", "AbortError")); return; }
      const abort = () => { clearTimeout(timer); reject(new DOMException("Cancelled", "AbortError")); };
      const timer = setTimeout(() => { signal?.removeEventListener("abort", abort); resolve(); }, 120);
      signal?.addEventListener("abort", abort, { once: true });
    });
    // Isolated DTOs prevent a consumer from accidentally mutating the source catalog.
    const posts = await getPublicPosts();
    if (signal?.aborted) throw new DOMException("Cancelled", "AbortError");
    return structuredClone({ tools, apps: interactiveApps, articles: mergeArticles(articles, posts.map(postToArticle)) });
  },
};

export const catalogQueryOptions = () => queryOptions({
  queryKey: ["catalog"],
  queryFn: ({ signal }) => catalogService.getCatalog(signal),
  staleTime: 5 * 60 * 1000,
  retry: false,
});

export function useCatalog() {
  return useSuspenseQuery(catalogQueryOptions()).data;
}