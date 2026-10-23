import { site } from "@/config/site";
import { editorialScore } from "@/lib/scoring";
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
      item: c.url.startsWith("http") ? c.url : `https://www.forge-ai-hub.com${c.url}`,
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
  const score = editorialScore(tool).overall;

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
    // AggregateRating para forzar las estrellas en los snippets de Google
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: score,
      bestRating: 10,
      worstRating: 0,
      ratingCount: 1, // Puntuación basada en evaluación de expertos
    },
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: score,
        bestRating: 10,
        worstRating: 0,
      },
      author: { "@type": "Organization", name: site.name },
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

// Nueva función para FAQs en comparativas y guías
export function faqPageJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
