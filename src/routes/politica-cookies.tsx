import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/politica-cookies")({
  head: () => ({
    meta: [
      { title: "Política de cookies — AIForge" },
      {
        name: "description",
        content: "Qué cookies utiliza AIForge, para qué sirven y cómo puedes aceptarlas, rechazarlas o revocarlas.",
      },
      { property: "og:title", content: "Política de cookies — AIForge" },
      { property: "og:description", content: "Tipos de cookies y gestión del consentimiento en AIForge." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/politica-cookies" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/politica-cookies" }],
  }),
  component: () => (
    <LegalPage
      title="Política de cookies"
      path="/politica-cookies"
      sections={[
        {
          heading: "Qué es una cookie",
          body: [
            "Una cookie es un pequeño archivo que un sitio web almacena en tu navegador. Sirve para recordar preferencias o para medir el uso del sitio.",
          ],
        },
        {
          heading: "Cookies técnicas",
          body: [
            "AIForge almacena en tu navegador tu preferencia de tema (claro u oscuro) y tu decisión sobre el consentimiento. Son necesarias para que la interfaz funcione como esperas y no requieren consentimiento previo.",
          ],
        },
        {
          heading: "Cookies analíticas",
          body: [
            "Solo se activan si las aceptas. Registran de forma agregada qué páginas se visitan para orientar el trabajo editorial. Puedes rechazarlas sin perder ninguna funcionalidad.",
          ],
        },
        {
          heading: "Cookies publicitarias",
          body: [
            "El sitio está preparado para integrar Google AdSense. Mientras la publicidad se muestre en modo demostración no se cargan scripts de terceros ni se instalan cookies publicitarias. Cuando se activen, se cargarán únicamente tras tu consentimiento explícito.",
          ],
        },
        {
          heading: "Revocar el consentimiento",
          body: [
            "Puedes borrar el almacenamiento local del sitio desde la configuración de tu navegador para que vuelva a mostrarse el aviso de cookies y cambiar tu decisión.",
          ],
        },
      ]}
    />
  ),
});
