import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/terminos")({
  head: () => ({
    meta: [
      { title: "Términos de uso — AIForge" },
      {
        name: "description",
        content: "Condiciones de uso del sitio AIForge: alcance del contenido, propiedad intelectual y responsabilidad.",
      },
      { property: "og:title", content: "Términos de uso — AIForge" },
      { property: "og:description", content: "Condiciones de uso y limitación de responsabilidad." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/terminos" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/terminos" }],
  }),
  component: () => (
    <LegalPage
      title="Términos de uso"
      path="/terminos"
      sections={[
        {
          heading: "Objeto",
          body: [
            "Estas condiciones regulan el acceso y uso de AIForge, un sitio informativo sobre herramientas de inteligencia artificial desarrollado con fines académicos.",
          ],
        },
        {
          heading: "Naturaleza del contenido",
          body: [
            "Las fichas, comparativas y artículos son opiniones editoriales basadas en pruebas y en datos de demostración. No constituyen asesoramiento profesional ni garantía sobre el comportamiento de las herramientas descritas.",
            "Los precios y funcionalidades de terceros cambian con frecuencia: verifica siempre la información en la web oficial del proveedor.",
          ],
        },
        {
          heading: "Propiedad intelectual",
          body: [
            "Los textos y el código del sitio pertenecen a sus autores. Las marcas y nombres comerciales citados pertenecen a sus respectivos titulares y se emplean con fines identificativos.",
          ],
        },
        {
          heading: "Herramientas interactivas",
          body: [
            "Las utilidades del sitio se ejecutan íntegramente en tu navegador. El contenido que introduzcas en ellas no se envía a ningún servidor. Se ofrecen tal cual, sin garantía de exactitud.",
          ],
        },
        {
          heading: "Enlaces externos",
          body: [
            "AIForge enlaza a sitios de terceros sobre cuyo contenido no ejerce control alguno y de los que no se responsabiliza.",
          ],
        },
      ]}
    />
  ),
});
