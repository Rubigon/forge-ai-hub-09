/**
 * Capa de analítica. Eventos definidos por el producto.
 * Solo emite a GA4 si existe `window.gtag` Y el usuario ha dado consentimiento
 * (ver CookieConsent). En desarrollo registra en consola.
 */

export type AnalyticsEvent =
  | "tool_view"
  | "tool_click"
  | "comparison_view"
  | "article_view"
  | "search"
  | "prompt_optimizer_used"
  | "calculator_used"
  | "recommendation_completed"
  | "external_tool_click"
  | "newsletter_signup"
  | "contact_submit";

const CONSENT_KEY = "aiforge-consent";

export function hasConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    return raw ? JSON.parse(raw).analytics === true : false;
  } catch {
    return false;
  }
}

export function setConsent(value: { analytics: boolean; ads: boolean }) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONSENT_KEY, JSON.stringify({ ...value, at: new Date().toISOString() }));
  window.dispatchEvent(new Event("aiforge-consent-changed"));
}

export function trackEvent(event: AnalyticsEvent, params: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug(`[analytics] ${event}`, params);
  }
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (gtag && hasConsent()) gtag("event", event, params);
}
