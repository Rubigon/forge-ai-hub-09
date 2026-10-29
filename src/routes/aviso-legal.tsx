import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/config/site";

const BASE_DOMAIN = "https://www.forge-ai-hub.com";

export const Route = createFileRoute("/aviso-legal")({
  head: () => {
    const fullUrl = `${BASE_DOMAIN}/aviso-legal`;
    const title = "Aviso Legal | Forge AI Hub";
    const description = "Información identificativa del titular de Forge AI Hub, legislación aplicable y condiciones generales.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: fullUrl },
        { property: "og:image", content: `${BASE_DOMAIN}/icon-512.png` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: fullUrl }],
    };
  },
  component: () => (
    <LegalPage
      title="Aviso Legal"
      path="/aviso-legal"
      sections={[
        {
          heading: "Titularidad",
          body: [
            // RELLENA AQUÍ TUS DATOS PERSONALES:
            "En cumplimiento de la normativa vigente, se indican a continuación los datos identificativos del titular de este sitio web:",
            "• Titular: Rubén González Pérez",
            "• NIF/DNI:54702330G",
            "• Dirección fiscal / Ubicación: A Coruña, ESPAÑA",
            `• Correo electrónico de contacto: ${site.email}`,
            `${site.name} es un proyecto especializado en inteligencia artificial.`,
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
