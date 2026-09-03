import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const MAIN_KEYWORDS = [
  "SELECT",
  "FROM",
  "WHERE",
  "GROUP BY",
  "ORDER BY",
  "HAVING",
  "LIMIT",
  "OFFSET",
  "INSERT INTO",
  "VALUES",
  "UPDATE",
  "SET",
  "DELETE FROM",
  "INNER JOIN",
  "LEFT JOIN",
  "RIGHT JOIN",
  "FULL JOIN",
  "JOIN",
  "ON",
  "UNION ALL",
  "UNION",
];

/** Formateador SQL local: normaliza palabras clave y salta de línea en las cláusulas principales. */
function formatSql(sql: string): string {
  let out = sql.replace(/\s+/g, " ").trim();
  if (!out) return "";

  // Palabras clave en mayúsculas (fuera de literales simples).
  for (const kw of MAIN_KEYWORDS) {
    out = out.replace(new RegExp(`\\b${kw.replace(/ /g, "\\s+")}\\b`, "gi"), kw);
  }
  for (const kw of ["AND", "OR", "AS", "ASC", "DESC", "NOT", "IN", "IS", "NULL", "LIKE", "BETWEEN", "CASE", "WHEN", "THEN", "ELSE", "END", "DISTINCT", "COUNT", "SUM", "AVG", "MIN", "MAX"]) {
    out = out.replace(new RegExp(`\\b${kw}\\b`, "gi"), kw);
  }

  // Saltos de línea antes de cláusulas principales.
  for (const kw of MAIN_KEYWORDS) {
    out = out.replace(new RegExp(`\\s+${kw.replace(/ /g, "\\s+")}\\b`, "g"), `\n${kw}`);
  }
  out = out.replace(/\s+(AND|OR)\b/g, "\n  $1");
  out = out.replace(/,\s*/g, ",\n  ");
  out = out.replace(/;\s*/g, ";\n\n");

  return out
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")
    .trim();
}

/** Formateador y validador ligero de SQL, ejecutado íntegramente en el navegador. */
export function SqlFormatter() {
  const [input, setInput] = useState("select u.id, u.email, count(o.id) as pedidos from users u left join orders o on o.user_id = u.id where u.active = true and u.created_at > '2024-01-01' group by u.id, u.email order by pedidos desc limit 20;");
  const [copied, setCopied] = useState(false);

  const formatted = useMemo(() => formatSql(input), [input]);

  const warnings = useMemo(() => {
    const list: string[] = [];
    const opens = (input.match(/\(/g) ?? []).length;
    const closes = (input.match(/\)/g) ?? []).length;
    if (opens !== closes) list.push(`Paréntesis desequilibrados: ${opens} abiertos frente a ${closes} cerrados.`);
    if ((input.match(/'/g) ?? []).length % 2 !== 0) list.push("Hay un número impar de comillas simples.");
    if (/\bselect\s+\*/i.test(input)) list.push("SELECT * recupera todas las columnas: nombra solo las que necesitas.");
    if (/\b(delete|update)\b/i.test(input) && !/\bwhere\b/i.test(input))
      list.push("DELETE/UPDATE sin WHERE afecta a toda la tabla.");
    return list;
  }, [input]);

  const copy = async () => {
    await navigator.clipboard.writeText(formatted);
    setCopied(true);
    trackEvent("calculator_used", { tool: "sql", field: "copiar" });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="min-w-0">
        <label htmlFor="sql-input" className="label-mono mb-2 block text-muted-foreground">
          Consulta SQL
        </label>
        <textarea
          id="sql-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={14}
          spellCheck={false}
          className="w-full rounded-xl border border-input bg-card p-4 font-mono text-sm leading-relaxed focus:outline-none"
        />
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setInput(formatted)}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Formatear
          </button>
          <button
            type="button"
            onClick={() => setInput("")}
            className="rounded-lg border border-border px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-accent"
          >
            Limpiar
          </button>
        </div>
      </div>

      <div className="min-w-0" aria-live="polite">
        <div className="mb-3 flex items-center justify-between">
          <span className="label-mono text-muted-foreground">Resultado</span>
          {formatted && (
            <button
              type="button"
              onClick={copy}
              className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {copied ? <Check className="size-3.5 text-success" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
              {copied ? "Copiado" : "Copiar"}
            </button>
          )}
        </div>
        {formatted ? (
          <pre className="min-h-64 overflow-x-auto rounded-xl bg-forge p-5 font-mono text-sm leading-relaxed whitespace-pre text-forge-foreground">
            {formatted}
          </pre>
        ) : (
          <div className="flex min-h-64 items-center justify-center rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            Escribe una consulta para formatearla.
          </div>
        )}
        {warnings.length > 0 && (
          <ul className="mt-4 space-y-2">
            {warnings.map((w) => (
              <li key={w} className="rounded-lg border border-border bg-muted/50 p-3 text-xs text-muted-foreground">
                {w}
              </li>
            ))}
          </ul>
        )}
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          Formateo heurístico para lectura y revisión: no sustituye al analizador sintáctico de tu motor de base de
          datos.
        </p>
      </div>
    </div>
  );
}
