/**
 * Motor determinista del Prompt Optimizer.
 *
 * Reescribe el prompt del usuario: analiza lo que ha escrito y devuelve una
 * versión ejecutable y estructurada con SU contenido (tarea, tema, formato,
 * longitud, idioma, audiencia…), no una plantilla con consejos.
 */

interface Analysis {
  task: string;
  topic: string;
  role: string;
  format: string;
  length: string;
  audience: string;
  language: string;
  tone: string;
}

const ROLE_HINTS: { pattern: RegExp; role: string; task: string }[] = [
  { pattern: /c[óo]digo|program|funci[óo]n|api|bug|script|typescript|javascript|python|react|sql/i, role: "ingeniero de software senior", task: "resolver una tarea de programación" },
  { pattern: /art[íi]culo|blog|post|redact|texto|copy/i, role: "redactor profesional con experiencia editorial", task: "redactar un texto" },
  { pattern: /email|correo|mensaje|carta/i, role: "especialista en comunicación escrita profesional", task: "escribir un email" },
  { pattern: /estudi|examen|apuntes|resumen|resumir|tema\s/i, role: "profesor experto en didáctica", task: "explicar y sintetizar contenido" },
  { pattern: /marketing|seo|anuncio|campa[ñn]a|redes sociales|instagram|linkedin/i, role: "especialista en marketing digital", task: "crear contenido de marketing" },
  { pattern: /datos|gr[áa]fico|excel|estad[íi]stica|an[áa]lisis/i, role: "analista de datos", task: "analizar información" },
  { pattern: /traduc|ingl[ée]s|idioma/i, role: "traductor profesional nativo", task: "traducir un texto" },
  { pattern: /plan|estrategia|proyecto|organiz/i, role: "consultor de estrategia", task: "diseñar un plan de acción" },
];

const FORMAT_HINTS: { pattern: RegExp; format: string }[] = [
  { pattern: /tabla/i, format: "una tabla comparativa con encabezados claros" },
  { pattern: /lista|bullet|puntos/i, format: "una lista de puntos concisos" },
  { pattern: /c[óo]digo|funci[óo]n|script/i, format: "bloques de código comentados y ejecutables" },
  { pattern: /email|correo/i, format: "un email con asunto, cuerpo y cierre" },
  { pattern: /esquema|[íi]ndice|estructura/i, format: "un esquema jerárquico con encabezados" },
  { pattern: /art[íi]culo|blog|post/i, format: "un texto con encabezados H2 y párrafos breves" },
];

const AUDIENCE_HINTS: { pattern: RegExp; audience: string }[] = [
  { pattern: /principiante|novato|desde cero/i, audience: "personas sin conocimientos previos" },
  { pattern: /experto|avanzado|t[ée]cnico|senior/i, audience: "un público técnico avanzado" },
  { pattern: /cliente|empresa|directiv|jefe/i, audience: "un interlocutor profesional o de negocio" },
  { pattern: /estudiante|alumno|clase|universidad/i, audience: "estudiantes" },
];

const TONE_HINTS: { pattern: RegExp; tone: string }[] = [
  { pattern: /formal|profesional|serio/i, tone: "formal y profesional" },
  { pattern: /cercano|informal|divertido|amig/i, tone: "cercano y natural" },
  { pattern: /persuasi|vender|convencer/i, tone: "persuasivo pero honesto" },
];

const STOPWORDS = new Set([
  "hazme", "haz", "escribeme", "escríbeme", "escribe", "dame", "quiero", "necesito", "por", "favor", "un", "una", "unos", "unas",
  "el", "la", "los", "las", "de", "del", "que", "para", "con", "sobre", "como", "cómo", "mi", "me", "y", "o", "en", "al", "es", "sea",
  "algo", "tema", "hola", "puedes", "podrias", "podrías",
]);

function clean(text: string) {
  return text.trim().replace(/\s+/g, " ");
}

function detectTopic(text: string): string {
  const t = clean(text).replace(/[.!?]+$/g, "");
  const about = /\b(sobre|acerca de|de tema|del tema|relacionado con)\b\s+(.{3,120})/i.exec(t);
  if (about?.[2]) return about[2].replace(/[.,;].*$/, "").trim();
  const words = t
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w));
  return words.slice(0, 8).join(" ") || t;
}

function analyze(raw: string): Analysis {
  const text = clean(raw);
  const hit = ROLE_HINTS.find((h) => h.pattern.test(text));
  const lengthMatch = /\b(\d+)\s*(palabras|caracteres|p[áa]rrafos|l[íi]neas|p[áa]ginas)\b/i.exec(text);
  const format = FORMAT_HINTS.find((h) => h.pattern.test(text))?.format;
  const audience = AUDIENCE_HINTS.find((h) => h.pattern.test(text))?.audience;
  const tone = TONE_HINTS.find((h) => h.pattern.test(text))?.tone;
  const isEnglish = /\b(write|create|make|explain|summarize)\b/i.test(text) && !/[áéíóúñ¿¡]/i.test(text);

  return {
    task: hit?.task ?? "completar la petición descrita",
    topic: detectTopic(text),
    role: hit?.role ?? "experto en la materia tratada",
    format: format ?? "texto claro y bien estructurado, sin relleno",
    length: lengthMatch ? lengthMatch[0] : "entre 300 y 500 palabras (ajústalo si el contenido lo exige)",
    audience: audience ?? "un lector general interesado en el tema",
    language: isEnglish ? "inglés" : "español (España)",
    tone: tone ?? "claro, directo y profesional",
  };
}

export function optimizePrompt(raw: string): string {
  const original = clean(raw);
  if (!original) return "";
  const a = analyze(original);

  return [
    `Actúa como ${a.role}.`,
    "",
    `TAREA\n${capitalize(a.task)}: ${original}`,
    "",
    `TEMA / OBJETO\n${capitalize(a.topic)}.`,
    "",
    `AUDIENCIA\nEscribe para ${a.audience}. Tono ${a.tone}. Idioma: ${a.language}.`,
    "",
    `FORMATO DE SALIDA\nEntrega ${a.format}. Extensión: ${a.length}. Devuelve únicamente el resultado final, sin explicar tu proceso.`,
    "",
    `RESTRICCIONES\n- No inventes datos, cifras ni fuentes: si falta información, indícalo entre corchetes.\n- Evita frases hechas, relleno y repeticiones.\n- Mantén la coherencia terminológica a lo largo de todo el texto.`,
    "",
    `CRITERIOS DE CALIDAD\n- El resultado debe poder usarse tal cual, sin reescritura.\n- Cada afirmación debe aportar información concreta.\n- Revisa el resultado antes de responder y corrige lo que no cumpla estos criterios.`,
  ].join("\n");
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Aliases de seguridad para retrocompatibilidad total con cualquier componente de la app
export const optimizePromptLocal = optimizePrompt;
export default optimizePrompt;
