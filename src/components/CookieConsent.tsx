import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { hasConsent, setConsent } from "@/lib/analytics";

const KEY = "aiforge-consent";

/**
 * Banner de consentimiento GDPR. Los scripts de analítica/publicidad
 * solo deben activarse tras un consentimiento afirmativo (ver lib/analytics).
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!window.localStorage.getItem(KEY)) setVisible(true);
  }, []);

  if (!visible) return null;

  const decide = (accepted: boolean) => {
    setConsent({ analytics: accepted, ads: accepted });
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Consentimiento de cookies"
      className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-lg rounded-xl border border-border bg-card p-5 shadow-2xl"
    >
      <p className="mb-1 text-sm font-semibold">Tu privacidad</p>
      <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
        Usamos cookies propias y de terceros para analítica y, en el futuro, publicidad. Puedes aceptarlas o
        rechazarlas. Más información en nuestra{" "}
        <Link to="/politica-cookies" className="underline underline-offset-2 hover:text-foreground">
          política de cookies
        </Link>
        .
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => decide(true)}
          className="rounded-md bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Aceptar
        </button>
        <button
          type="button"
          onClick={() => decide(false)}
          className="rounded-md border border-border px-4 py-2 text-xs font-semibold transition-colors hover:bg-accent"
        >
          Rechazar
        </button>
      </div>
      {!hasConsent() && <span className="sr-only">Los scripts de terceros están desactivados hasta que decidas.</span>}
    </div>
  );
}
