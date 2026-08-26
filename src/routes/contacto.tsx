import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { toast } from "sonner";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { site } from "@/config/site";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — AIForge" },
      {
        name: "description",
        content:
          "Escríbenos para proponer una herramienta, corregir un dato o colaborar con AIForge. Respondemos por correo electrónico.",
      },
      { property: "og:title", content: "Contacto — AIForge" },
      { property: "og:description", content: "Propón herramientas, corrige datos o colabora con AIForge." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contacto" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/contacto" }],
  }),
  component: Contacto,
});

const topics = [
  { value: "propuesta", label: "Proponer una herramienta" },
  { value: "correccion", label: "Corregir un dato" },
  { value: "colaboracion", label: "Colaboración o prensa" },
  { value: "otro", label: "Otro asunto" },
] as const;

type Errors = Partial<Record<"name" | "email" | "message", string>>;

function validate(values: { name: string; email: string; message: string }): Errors {
  const errors: Errors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();
  if (name.length < 2) errors.name = "Indica tu nombre (mínimo 2 caracteres).";
  else if (name.length > 100) errors.name = "El nombre no puede superar 100 caracteres.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Introduce un correo electrónico válido.";
  else if (email.length > 255) errors.email = "El correo no puede superar 255 caracteres.";
  if (message.length < 20) errors.message = "Cuéntanos algo más (mínimo 20 caracteres).";
  else if (message.length > 1500) errors.message = "El mensaje no puede superar 1500 caracteres.";
  return errors;
}

function Contacto() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState<string>(topics[0].value);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate({ name, email, message });
    setErrors(found);
    if (Object.keys(found).length > 0) {
      toast.error("Revisa los campos marcados.");
      return;
    }
    const label = topics.find((t) => t.value === topic)?.label ?? "Contacto";
    const subject = encodeURIComponent(`[AIForge] ${label}`);
    const body = encodeURIComponent(`Nombre: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`);
    trackEvent("contact_submit", { topic });
    setSent(true);
    toast.success("Abriendo tu cliente de correo con el mensaje preparado.");
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  const field = "mt-1 w-full rounded-md border border-input bg-card px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none";

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Breadcrumbs crumbs={[{ name: "Inicio", url: "/" }, { name: "Contacto", url: "/contacto" }]} />

      <h1 className="mb-3 font-display text-4xl font-extrabold tracking-tight">Contacto</h1>
      <p className="mb-10 text-muted-foreground">
        ¿Quieres proponer una herramienta, avisarnos de un precio desactualizado o colaborar? Rellena el formulario y
        se abrirá tu cliente de correo con el mensaje ya redactado. También puedes escribir directamente a{" "}
        <a href={`mailto:${site.email}`} className="font-medium text-foreground underline underline-offset-2">
          {site.email}
        </a>
        .
      </p>

      <form onSubmit={submit} noValidate className="grid gap-5 rounded-xl border border-border p-6">
        <div>
          <label htmlFor="c-name" className="text-sm font-medium">
            Nombre
          </label>
          <input
            id="c-name"
            value={name}
            maxLength={100}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={Boolean(errors.name)}
            className={field}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-destructive" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="c-email" className="text-sm font-medium">
            Correo electrónico
          </label>
          <input
            id="c-email"
            type="email"
            value={email}
            maxLength={255}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(errors.email)}
            className={field}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-destructive" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="c-topic" className="text-sm font-medium">
            Motivo
          </label>
          <select id="c-topic" value={topic} onChange={(e) => setTopic(e.target.value)} className={field}>
            {topics.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="c-message" className="text-sm font-medium">
            Mensaje
          </label>
          <textarea
            id="c-message"
            rows={6}
            value={message}
            maxLength={1500}
            onChange={(e) => setMessage(e.target.value)}
            aria-invalid={Boolean(errors.message)}
            className={field}
          />
          <div className="mt-1 flex justify-between text-xs">
            <span className="text-destructive" role="alert">
              {errors.message ?? ""}
            </span>
            <span className="font-mono text-muted-foreground">{message.length}/1500</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Send className="size-4" aria-hidden /> Enviar mensaje
          </button>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <Mail className="size-4" aria-hidden /> Escribir sin formulario
          </a>
        </div>

        {sent && (
          <p className="text-sm text-success" role="status">
            Mensaje preparado. Si no se ha abierto tu gestor de correo, copia el texto y escríbenos a {site.email}.
          </p>
        )}
      </form>
    </main>
  );
}
