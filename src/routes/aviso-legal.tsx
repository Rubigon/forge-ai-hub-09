import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/config/site";

export const Route = createFileRoute("/aviso-legal")({
  head: () => ({
    meta: [
      { title: "Aviso legal — AIForge" },
      {
        name: "description",
        content: "Información identificativa del titular de AIForge, legislación aplicable y condiciones generales.",
      },
      { property: "og:title", content: "Aviso legal — AIForge" },
      { property: "og:description", content: "Titularidad del sitio y legislación aplicable." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/aviso-legal" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/aviso-legal" }],
  }),
  component: () => (
    <LegalPage
      title="Aviso legal"
      path="/aviso-legal"
      sections={[
        {
          heading: "Titularidad",
          body: [
            `${site.name} es un proyecto académico sin ánimo de lucro desarrollado en el marco de un Trabajo Fin de Máster en Inteligencia Artificial. Contacto: ${site.email}.`,
          ],
        },
        {
          heading: "Condiciones de acceso",
          body: [
            "El acceso al sitio es libre y gratuito. El usuario se compromete a no utilizarlo con fines ilícitos ni a intentar dañar su funcionamiento.",
          ],
        },
        {
          heading: "Exclusión de responsabilidad",
          body: [
            "El titular no responde de los daños derivados del uso de la información publicada ni de las herramientas de terceros enlazadas desde el sitio.",
          ],
        },
        {
          heading: "Legislación aplicable",
          body: [
            "Estas condiciones se rigen por la legislación española y europea aplicable en materia de servicios de la sociedad de la información y protección de datos.",
          ],
        },
      ]}
    />
  ),
});
