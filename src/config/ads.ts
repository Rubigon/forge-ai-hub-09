/**
 * Configuración de monetización publicitaria.
 *
 * - "off":         no se renderiza nada.
 * - "placeholder": hueco discreto "Espacio publicitario" (desarrollo).
 * - "live":        punto de integración de AdSense. El script solo debe
 *                  cargarse tras consentimiento de cookies (ver CookieConsent).
 *
 * Nunca incentivar clics ni colocar anuncios que interfieran con el contenido.
 */
export type AdsMode = "off" | "placeholder" | "live";
export type AdPosition = "top-content" | "in-content" | "sidebar" | "bottom-content";

export const adsConfig: { mode: AdsMode; client: string } = {
  mode: "off",
  client: "", // p. ej. "ca-pub-XXXX" cuando se active AdSense
};
