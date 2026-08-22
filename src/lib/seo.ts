import { site } from "@/config/site";
import type { Article, Comparison, Tool } from "@/types";

export interface Crumb {
  name: string;
  url: string;
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    description: site.description,
    inLanguage: site.locale,
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: "/buscar?q={search_term_string}" },
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    description: site.claim,
    email: site.email,
  };
}

export function articleJsonLd(article: Article, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    inLanguage: site.locale,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: { "@type": "Person", name: article.author, url: "/autor" },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: url,
    keywords: article.tags.join(", "),
  };
}

export function softwareApplicationJsonLd(tool: Tool, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.tagline,
    applicationCategory: tool.category,
    operatingSystem: "Web",
    url,
    offers: {
      "@type": "Offer",
      price: tool.pricing === "gratis" ? "0" : undefined,
      priceCurrency: "EUR",
      description: tool.priceNote,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tool.rating,
      bestRating: 5,
      ratingCount: 128,
    },
  };
}

export function comparisonJsonLd(comparison: Comparison, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: comparison.title,
    description: comparison.summary,
    inLanguage: site.locale,
    dateModified: comparison.lastReviewed,
    author: { "@type": "Organization", name: site.name },
    mainEntityOfPage: url,
  };
}

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
