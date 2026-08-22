import { useState } from "react";
import { Check } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

/**
 * Formulario de newsletter. No envía emails: preparado para conectar un
 * proveedor (p. ej. vía server function) cuando el servicio esté activo.
 */
export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState("error");
      return;
    }
    trackEvent("newsletter_signup");
    setState("done");
  };

  if (state === "done") {
    return (
      <p className="flex items-center gap-2 text-sm text-success" role="status">
        <Check className="size-4" aria-hidden /> ¡Gracias! Te avisaremos cuando lancemos la newsletter.
      </p>
    );
  }

  return (
    <form onSubmit={submit} noValidate={false} className={compact ? "" : "mx-auto max-w-md"}>
      {!compact && (
        <label htmlFor="newsletter-email" className="mb-2 block text-sm font-medium">
          Una vez por semana, las mejores herramientas de IA.
        </label>
      )}
      <div className="flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Tu correo electrónico
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setState("idle");
          }}
          placeholder="tu@email.com"
          className="h-10 w-full rounded-md border border-input bg-card px-3 text-sm focus:outline-none"
        />
        <button
          type="submit"
          className="h-10 shrink-0 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Suscribirme
        </button>
      </div>
      {state === "error" && (
        <p className="mt-2 text-xs text-destructive" role="alert">
          Introduce un correo electrónico válido.
        </p>
      )}
      {!compact && (
        <p className="mt-2 text-xs text-muted-foreground">Sin spam. Date de baja cuando quieras.</p>
      )}
    </form>
  );
}
