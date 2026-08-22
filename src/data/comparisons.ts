import type { Comparison } from "@/types";

/**
 * COMPARATIVAS DEMO. Las filas de la tabla separan explícitamente los datos
 * declarados por el fabricante de las pruebas propias de AIForge en el texto.
 */
export const comparisons: Comparison[] = [
  {
    slug: "chatgpt-vs-claude",
    toolA: "chatgpt",
    toolB: "claude",
    title: "ChatGPT vs Claude: ¿cuál elegir en 2026?",
    summary:
      "Dos asistentes generalistas de primer nivel. ChatGPT gana en versatilidad y ecosistema; Claude destaca en programación y textos largos cuidados.",
    rows: [
      { feature: "Programación", a: "Muy bueno", b: "Sobresaliente", winner: "b" },
      { feature: "Redacción", a: "Muy bueno", b: "Sobresaliente", winner: "b" },
      { feature: "Multimodalidad", a: "Texto, imagen, voz", b: "Texto e imagen", winner: "a" },
      { feature: "Ecosistema y extensiones", a: "Muy amplio", b: "Limitado", winner: "a" },
      { feature: "Plan gratuito", a: "Generoso", b: "Ajustado", winner: "a" },
      { feature: "Contexto largo", a: "Amplio", b: "Muy amplio", winner: "b" },
    ],
    easeOfUse: { a: 5, b: 4.5 },
    performance: { a: 4.6, b: 4.8 },
    prosA: ["Ecosistema y integraciones", "Multimodal completo", "Plan gratuito generoso"],
    prosB: ["Mejor calidad de código", "Textos más naturales", "Contexto muy amplio"],
    consA: ["Calidad variable según modelo", "Puede alucinar"],
    consB: ["Sin generación de imágenes", "Límites gratuitos estrictos"],
    conclusion:
      "Si buscas una única herramienta para todo, ChatGPT es la apuesta segura. Si tu trabajo es principalmente escribir código o textos cuidados, Claude ofrece resultados más consistentes.",
    recommendations: [
      { profile: "Programador", pick: "Claude", reason: "Código más limpio y mejor seguimiento de instrucciones técnicas." },
      { profile: "Estudiante", pick: "ChatGPT", reason: "Plan gratuito más amplio y funciones multimodales útiles." },
      { profile: "Creador de contenido", pick: "ChatGPT", reason: "Imagen, voz y texto en una sola suscripción." },
    ],
    lastReviewed: "2026-08-01",
  },
  {
    slug: "chatgpt-vs-gemini",
    toolA: "chatgpt",
    toolB: "gemini",
    title: "ChatGPT vs Gemini: ecosistema frente a versatilidad",
    summary:
      "Gemini brilla si trabajas dentro de Google Workspace; ChatGPT ofrece un ecosistema de terceros más rico y mayor consistencia general.",
    rows: [
      { feature: "Integración ofimática", a: "Vía conectores", b: "Nativa con Workspace", winner: "b" },
      { feature: "Contexto", a: "Amplio", b: "Muy amplio", winner: "b" },
      { feature: "Consistencia de respuestas", a: "Alta", b: "Variable", winner: "a" },
      { feature: "Generación de imágenes", a: "Incluida", b: "Incluida", winner: "tie" },
      { feature: "Precio del plan de pago", a: "Similar", b: "Similar", winner: "tie" },
    ],
    easeOfUse: { a: 5, b: 4.5 },
    performance: { a: 4.6, b: 4.3 },
    prosA: ["Ecosistema de terceros", "Consistencia", "Comunidad enorme"],
    prosB: ["Integración con Gmail y Docs", "Contexto muy largo", "Buen plan gratuito"],
    consA: ["Integración ofimática indirecta"],
    consB: ["Calidad menos predecible", "Interfaz en cambio constante"],
    conclusion:
      "Elige Gemini si tu día a día ocurre en Google Workspace. En cualquier otro caso, ChatGPT ofrece una experiencia más predecible.",
    recommendations: [
      { profile: "Empresa en Google Workspace", pick: "Gemini", reason: "Integración nativa con correo y documentos." },
      { profile: "Uso general", pick: "ChatGPT", reason: "Mayor consistencia y ecosistema." },
    ],
    lastReviewed: "2026-07-28",
  },
  {
    slug: "claude-vs-gemini",
    toolA: "claude",
    toolB: "gemini",
    title: "Claude vs Gemini: calidad de escritura frente a integración",
    summary:
      "Claude produce mejores textos y código; Gemini gana en contexto, integración y coste por token para volúmenes altos.",
    rows: [
      { feature: "Calidad de escritura", a: "Sobresaliente", b: "Buena", winner: "a" },
      { feature: "Programación", a: "Sobresaliente", b: "Buena", winner: "a" },
      { feature: "Contexto máximo", a: "Muy amplio", b: "Extremadamente amplio", winner: "b" },
      { feature: "Coste por token (API)", a: "Medio", b: "Bajo", winner: "b" },
      { feature: "Multimodalidad", a: "Texto e imagen", b: "Texto, imagen, audio y vídeo", winner: "b" },
    ],
    easeOfUse: { a: 4.5, b: 4.5 },
    performance: { a: 4.8, b: 4.3 },
    prosA: ["Escritura y código superiores", "Artefactos interactivos"],
    prosB: ["Coste bajo por token", "Multimodal completo", "Contexto enorme"],
    consA: ["Más caro por token", "Sin audio ni vídeo"],
    consB: ["Menos consistente en tareas complejas"],
    conclusion:
      "Para tareas exigentes de texto y código, Claude. Para procesar grandes volúmenes o entradas multimodales con coste contenido, Gemini.",
    recommendations: [
      { profile: "Desarrollador", pick: "Claude", reason: "Código más fiable en tareas complejas." },
      { profile: "Producto con API a escala", pick: "Gemini", reason: "Mejor coste por token y contexto." },
    ],
    lastReviewed: "2026-07-28",
  },
  {
    slug: "cursor-vs-github-copilot",
    toolA: "cursor",
    toolB: "github-copilot",
    title: "Cursor vs GitHub Copilot: qué asistente de código elegir",
    summary:
      "Cursor reinventa el editor alrededor de la IA; Copilot se integra en tu IDE y en GitHub sin cambiar tus hábitos.",
    rows: [
      { feature: "Autocompletado", a: "Predictivo multilínea", b: "Muy sólido", winner: "a" },
      { feature: "Edición multiarchivo", a: "Nativa con agentes", b: "Disponible", winner: "a" },
      { feature: "Integración con GitHub", a: "Estándar", b: "Nativa (PRs, Issues)", winner: "b" },
      { feature: "Soporte de IDEs", a: "Editor propio", b: "VS Code, JetBrains, Neovim", winner: "b" },
      { feature: "Plan gratuito", a: "Limitado", b: "Limitado", winner: "tie" },
    ],
    easeOfUse: { a: 4.7, b: 4.8 },
    performance: { a: 4.8, b: 4.5 },
    prosA: ["Contexto del repositorio completo", "Agentes de edición potentes"],
    prosB: ["Funciona en tu IDE actual", "Integración con el flujo de GitHub", "Gratis para estudiantes"],
    consA: ["Obliga a cambiar de editor", "Créditos difíciles de prever"],
    consB: ["Menos ágil en refactors grandes"],
    conclusion:
      "Cursor si quieres el flujo más potente y no te importa cambiar de editor. Copilot si trabajas en equipo sobre GitHub o usas JetBrains.",
    recommendations: [
      { profile: "Desarrollador individual", pick: "Cursor", reason: "Mayor productividad en refactors y proyectos completos." },
      { profile: "Equipo en GitHub", pick: "GitHub Copilot", reason: "Integración con PRs, Issues y políticas de empresa." },
      { profile: "Estudiante", pick: "GitHub Copilot", reason: "Acceso gratuito mediante el programa educativo." },
    ],
    lastReviewed: "2026-08-05",
  },
  {
    slug: "lovable-vs-bolt",
    toolA: "lovable",
    toolB: "bolt",
    title: "Lovable vs Bolt: crear aplicaciones web con IA",
    summary:
      "Ambas generan aplicaciones completas desde un chat. Lovable incluye backend y base de datos gestionados; Bolt ofrece un entorno de desarrollo más abierto.",
    rows: [
      { feature: "Backend y base de datos", a: "Integrados", b: "Configuración manual", winner: "a" },
      { feature: "Autenticación", a: "Integrada", b: "Manual", winner: "a" },
      { feature: "Control del entorno", a: "Gestionado", b: "Abierto", winner: "b" },
      { feature: "Despliegue", a: "Incluido", b: "Incluido", winner: "tie" },
      { feature: "Curva de aprendizaje", a: "Muy baja", b: "Media", winner: "a" },
    ],
    easeOfUse: { a: 4.8, b: 4.3 },
    performance: { a: 4.6, b: 4.3 },
    prosA: ["Full-stack sin configuración", "Edición visual", "Ideal para no programadores"],
    prosB: ["Entorno de desarrollo completo", "Más control sobre dependencias"],
    consA: ["Menos control de bajo nivel"],
    consB: ["Requiere más conocimientos", "Consumo de tokens impredecible"],
    conclusion:
      "Para llevar una idea a producción sin montar infraestructura, Lovable. Si quieres controlar el stack y ya sabes programar, Bolt.",
    recommendations: [
      { profile: "Emprendedor sin equipo técnico", pick: "Lovable", reason: "Backend, auth y despliegue resueltos." },
      { profile: "Desarrollador experimentado", pick: "Bolt", reason: "Mayor control sobre el entorno y las dependencias." },
    ],
    lastReviewed: "2026-08-02",
  },
  {
    slug: "midjourney-vs-flux",
    toolA: "midjourney",
    toolB: "flux",
    title: "Midjourney vs Flux: calidad artística frente a flexibilidad",
    summary:
      "Midjourney ofrece la estética más pulida sin configurar nada; Flux permite autoalojar, integrar por API y controlar el pipeline.",
    rows: [
      { feature: "Calidad estética", a: "Sobresaliente", b: "Muy buena", winner: "a" },
      { feature: "Texto dentro de la imagen", a: "Aceptable", b: "Bueno", winner: "b" },
      { feature: "Uso vía API", a: "Limitado", b: "Disponible", winner: "b" },
      { feature: "Autoalojamiento", a: "No", b: "Sí (variante abierta)", winner: "b" },
      { feature: "Facilidad para empezar", a: "Alta", b: "Media", winner: "a" },
    ],
    easeOfUse: { a: 4.6, b: 3.8 },
    performance: { a: 4.8, b: 4.5 },
    prosA: ["Estética inigualable", "Comunidad activa"],
    prosB: ["Integrable en productos", "Opción autoalojada", "Mejor texto en imagen"],
    consA: ["Sin plan gratuito", "Menos control programático"],
    consB: ["Requiere infraestructura para autoalojar"],
    conclusion:
      "Para crear imágenes puntuales de máxima calidad, Midjourney. Para integrar generación de imágenes en un producto, Flux.",
    recommendations: [
      { profile: "Diseñador", pick: "Midjourney", reason: "Mejor resultado visual con menos esfuerzo." },
      { profile: "Desarrollador de producto", pick: "Flux", reason: "API y pesos abiertos para integrar y escalar." },
    ],
    lastReviewed: "2026-07-25",
  },
];

export const comparisonBySlug = (slug: string) => comparisons.find((c) => c.slug === slug);
export const comparisonsForTool = (toolSlug: string) =>
  comparisons.filter((c) => c.toolA === toolSlug || c.toolB === toolSlug);
