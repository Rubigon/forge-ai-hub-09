import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/config/site";

export const Route = createFileRoute("/politica-privacidad")({
  head: () => ({
    meta: [
      { title: "Política de privacidad — AIForge" },
      {
        name: "description",
        content: "Cómo trata AIForge los datos personales: base legal, finalidades, conservación y derechos del usuario.",
      },
      { property: "og:title", content: "Política de privacidad — AIForge" },
      { property: "og:description", content: "Tratamiento de datos personales en AIForge." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/politica-privacidad" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/politica-privacidad" }],
  }),
  component: () => (
    <LegalPage
      title="Política de privacidad"
      path="/politica-privacidad"
      sections={[
        {
          heading: "Responsable del tratamiento",
          body: [
            `${site.name} es un proyecto académico de demostración. Para cualquier cuestión relativa a datos personales puedes escribir a ${site.email}.`,
          ],
        },
        {
          heading: "Datos que se tratan",
          body: [
            "Datos de navegación agregados (páginas vistas, origen del tráfico, tipo de dispositivo) únicamente si has aceptado las cookies analíticas.",
            "Dirección de correo electrónico, si te suscribes voluntariamente al boletín.",
          ],
        },
        {
          heading: "Finalidad y base legal",
          body: [
            "Los datos analíticos se tratan para entender qué contenidos resultan útiles y mejorarlos. La base legal es tu consentimiento, revocable en cualquier momento.",
            "El correo del boletín se trata para enviarte contenidos del proyecto. La base legal es igualmente tu consentimiento.",
          ],
        },
        {
          heading: "Conservación",
          body: [
            "Los datos analíticos se conservan de forma agregada durante un máximo de 14 meses. El correo del boletín se conserva hasta que solicites la baja.",
          ],
        },
        {
          heading: "Destinatarios",
          body: [
            "En un despliegue con publicidad activa, Google podría tratar datos como proveedor de Google AdSense conforme a sus propias políticas. Mientras la publicidad esté en modo demostración, no se envía ningún dato a terceros.",
          ],
        },
        {
          heading: "Tus derechos",
          body: [
            "Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a la dirección de contacto. También puedes presentar una reclamación ante la autoridad de control competente.",
          ],
        },
      ]}
    />
  ),
});
