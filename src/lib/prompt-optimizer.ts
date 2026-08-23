/**
 * Motor determinista del Prompt Optimizer.
 * Analiza el prompt de entrada y lo reestructura en las 7 secciones del marco
 * AIForge: objetivo, contexto, rol, restricciones, formato, ejemplos y
 * criterios de calidad. Sin llamadas externas: funciona offline y sirve de
 * base para un futuro AIProvider (src/lib/ai/provider.ts).
 */

const ROLE_HINTS: { pattern: RegExp; role: string }[] = [
  { pattern: /c[óo]digo|program|funci[óo]n|api|bug|test|typescript|python|react/i, role: "desarrollador senior con experiencia en el stack indicado" },
  { pattern: /art[íi]culo|blog|redact|texto|copy|email/i, role: "redactor profesional especializado en el tema" },
  { pattern: /estudi|examen|apuntes|resumen/i, role: "profesor experto en pedagogía" },
  { pattern: /marketing|seo|anuncio|campaña|redes/i, role: "especialista en marketing digital" },
  { pattern: /datos|gr[áa]fico|excel|estad[íi]stica/i, role: "analista de datos" },
  { pattern: /traduc|ingl[ée]s|idioma/i, role: "traductor profesional nativo" },
];

function detectRole(text: string): string {
  const hit = ROLE_HINTS.find((h) => h.pattern.test(text));
  return hit?.role ?? "experto en la materia tratada";
}

function extractGoal(text: string): string {
  const clean = text.trim().replace(/\s+/g, " ");
  const first = clean.split(/[.!?\n]/)[0] ?? clean;
  return first.charAt(0).toUpperCase() + first.slice(1);
}

export function optimizePrompt(raw: string): string {
  const goal = extractGoal(raw);
  const role = detectRole(raw);
  const mentionsLength = /\b(\d+)\s*(palabras|caracteres|p[áa]rrafos|l[íi]neas)\b/i.exec(raw);

  const sections: string[] = [
    `[OBJETIVO]\n${goal}`,
    `[CONTEXTO]\nDescribe aquí tu situación: para quién es el resultado, dónde se usará y qué has intentado ya. Cuanto más concreto, mejor.`,
    `[ROL]\nActúa como ${role}.`,
    `[RESTRICCIONES]\n- ${mentionsLength ? `Longitud aproximada: ${mentionsLength[0]}.` : "Define una longitud máxima (p. ej. 500 palabras)."}\n- Evita relleno, generalidades y frases hechas.\n- Si te falta información, indícalo en lugar de inventarla.`,
    `[FORMATO]\nEspecifica la estructura de salida: encabezados, listas, tablas o bloques de código, según lo que necesites.`,
    `[EJEMPLOS]\nIncluye un ejemplo breve de la salida ideal (entrada → salida esperada).`,
    `[CRITERIOS DE CALIDAD]\n- La respuesta debe ser accionable y verificable.\n- Cita las fuentes cuando uses datos externos.\n- Señala explícitamente cualquier suposición.`,
  ];

  return sections.join("\n\n");
}
