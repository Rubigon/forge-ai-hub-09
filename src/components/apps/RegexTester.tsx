import { useMemo, useState } from "react";
import { AlertTriangle, Check, Copy } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface MatchResult {
  index: number;
  value: string;
  groups: string[];
  named: Record<string, string>;
}

const FLAG_OPTIONS: { flag: string; label: string }[] = [
  { flag: "g", label: "global" },
  { flag: "i", label: "ignorar mayúsculas" },
  { flag: "m", label: "multilínea" },
  { flag: "s", label: "punto incluye saltos" },
  { flag: "u", label: "unicode" },
];

/** Patrones propensos a backtracking catastrófico. */
const RISKY = /(\(\?:?[^)]*[+*]\)[+*])|(\[[^\]]*\][+*]\s*[+*])|(\.\*\.\*)/;

/** Probador de expresiones regulares 100% local (no se envía nada al servidor). */
export function RegexTester() {
  const [pattern, setPattern] = useState("(\\w+)@(\\w+)\\.(com|es)");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("Contacto: hola@aiforge.es y soporte@ejemplo.com");
  const [copied, setCopied] = useState(false);

  const { matches, error } = useMemo(() => {
    if (!pattern) return { matches: [] as MatchResult[], error: null as string | null };
    let regex: RegExp;
    try {
      regex = new RegExp(pattern, flags.includes("g") ? flags : `${flags}g`);
    } catch (e) {
      return { matches: [], error: e instanceof Error ? e.message : "Expresión no válida" };
    }
    const out: MatchResult[] = [];
    let guard = 0;
    for (const m of text.matchAll(regex)) {
      out.push({
        index: m.index ?? 0,
        value: m[0],
        groups: m.slice(1).map((g) => g ?? ""),
        named: { ...(m.groups ?? {}) },
      });
      if (++guard > 500) break;
    }
    return { matches: out, error: null };
  }, [pattern, flags, text]);

  const risky = RISKY.test(pattern);

  const toggleFlag = (flag: string) =>
    setFlags((f) => (f.includes(flag) ? f.replace(flag, "") : f + flag));

  const copy = async () => {
    const report = matches.map((m, i) => `${i + 1}. "${m.value}" @${m.index}${m.groups.length ? ` [${m.groups.join(" | ")}]` : ""}`).join("\n");
    await navigator.clipboard.writeText(report || "Sin coincidencias");
    setCopied(true);
    trackEvent("calculator_used", { tool: "regex", field: "copiar" });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="min-w-0 space-y-5">
        <label className="block">
          <span className="label-mono mb-2 block text-muted-foreground">Expresión regular</span>
          <div className="flex items-center gap-2 rounded-lg border border-input bg-card px-3">
            <span className="font-mono text-sm text-muted-foreground">/</span>
            <input
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              spellCheck={false}
              className="min-w-0 flex-1 bg-transparent py-2.5 font-mono text-sm focus:outline-none"
              aria-label="Expresión regular"
            />
            <span className="font-mono text-sm text-muted-foreground">/{flags}</span>
          </div>
        </label>

        <fieldset>
          <legend className="label-mono mb-2 text-muted-foreground">Flags</legend>
          <div className="flex flex-wrap gap-2">
            {FLAG_OPTIONS.map((f) => (
              <button
                key={f.flag}
                type="button"
                onClick={() => toggleFlag(f.flag)}
                aria-pressed={flags.includes(f.flag)}
                className={`rounded-lg border px-3 py-1.5 font-mono text-xs transition-colors ${
                  flags.includes(f.flag) ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-accent"
                }`}
              >
                {f.flag} · {f.label}
              </button>
            ))}
          </div>
        </fieldset>

        <label className="block">
          <span className="label-mono mb-2 block text-muted-foreground">Texto de prueba</span>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
            spellCheck={false}
            className="w-full rounded-xl border border-input bg-card p-4 font-mono text-sm focus:outline-none"
          />
        </label>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setPattern("");
              setText("");
            }}
            className="rounded-lg border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-accent"
          >
            Limpiar
          </button>
          <button
            type="button"
            onClick={copy}
            className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-accent"
          >
            {copied ? <Check className="size-4 text-success" aria-hidden /> : <Copy className="size-4" aria-hidden />}
            {copied ? "Copiado" : "Copiar resultado"}
          </button>
        </div>
      </div>

      <div className="min-w-0" aria-live="polite">
        {error ? (
          <p className="rounded-xl border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive" role="alert">
            Expresión no válida: {error}
          </p>
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between">
              <span className="label-mono text-muted-foreground">Coincidencias</span>
              <span className="font-display text-2xl font-extrabold">{matches.length}</span>
            </div>
            {risky && (
              <p className="mb-4 flex gap-2 rounded-lg border border-border bg-muted/60 p-3 text-xs text-muted-foreground">
                <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden />
                Este patrón anida cuantificadores y puede provocar backtracking catastrófico con textos largos.
              </p>
            )}
            {matches.length === 0 ? (
              <p className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                Sin coincidencias en el texto actual.
              </p>
            ) : (
              <ol className="space-y-2">
                {matches.map((m, i) => (
                  <li key={`${m.index}-${i}`} className="overflow-hidden rounded-lg border border-border">
                    <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/50 px-3 py-2">
                      <code className="truncate font-mono text-xs">{m.value}</code>
                      <span className="shrink-0 font-mono text-[10px] text-muted-foreground">pos. {m.index}</span>
                    </div>
                    {(m.groups.length > 0 || Object.keys(m.named).length > 0) && (
                      <dl className="divide-y divide-border text-xs">
                        {m.groups.map((g, gi) => (
                          <div key={gi} className="flex justify-between gap-3 px-3 py-1.5">
                            <dt className="text-muted-foreground">Grupo {gi + 1}</dt>
                            <dd className="truncate font-mono">{g || "—"}</dd>
                          </div>
                        ))}
                        {Object.entries(m.named).map(([k, v]) => (
                          <div key={k} className="flex justify-between gap-3 px-3 py-1.5">
                            <dt className="text-muted-foreground">{k}</dt>
                            <dd className="truncate font-mono">{v || "—"}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  </li>
                ))}
              </ol>
            )}
          </>
        )}
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          La evaluación se ejecuta en tu navegador con el motor de expresiones regulares de JavaScript. Ni el patrón ni
          el texto salen de tu dispositivo.
        </p>
      </div>
    </div>
  );
}
