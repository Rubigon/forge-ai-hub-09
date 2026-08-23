import { useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const FLAGS = [
  { id: "g", label: "global" },
  { id: "i", label: "mayús/minús" },
  { id: "m", label: "multilínea" },
  { id: "s", label: "dotAll" },
] as const;

interface MatchInfo {
  match: string;
  index: number;
  groups: string[];
}

/** Probador de expresiones regulares con coincidencias y grupos de captura. */
export function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState<Set<string>>(new Set(["g"]));
  const [text, setText] = useState("");

  const result = useMemo((): { matches: MatchInfo[]; error: string | null } => {
    if (!pattern) return { matches: [], error: null };
    let regex: RegExp;
    try {
      regex = new RegExp(pattern, [...flags].join(""));
    } catch (e) {
      return { matches: [], error: e instanceof Error ? e.message : "Expresión no válida" };
    }
    if (!text) return { matches: [], error: null };
    const matches: MatchInfo[] = [];
    if (flags.has("g")) {
      for (const m of text.matchAll(regex)) {
        matches.push({ match: m[0], index: m.index ?? 0, groups: m.slice(1) });
        if (matches.length >= 100) break;
      }
    } else {
      const m = regex.exec(text);
      if (m) matches.push({ match: m[0], index: m.index, groups: m.slice(1) });
    }
    if (matches.length > 0) trackEvent("calculator_used", { tool: "regex" });
    return { matches, error: null };
  }, [pattern, flags, text]);

  const toggleFlag = (f: string) => {
    setFlags((prev) => {
      const next = new Set(prev);
      if (next.has(f)) next.delete(f);
      else next.add(f);
      return next;
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <label htmlFor="regex-pattern" className="label-mono mb-2 block text-muted-foreground">
            Expresión regular
          </label>
          <div className="flex items-center rounded-xl border border-input bg-card px-4 focus-within:border-foreground/30">
            <span className="font-mono text-muted-foreground">/</span>
            <input
              id="regex-pattern"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="\b\w+@\w+\.\w+\b"
              spellCheck={false}
              className="h-12 w-full bg-transparent px-2 font-mono text-sm focus:outline-none"
            />
            <span className="font-mono text-muted-foreground">/{[...flags].join("")}</span>
          </div>
          {result.error && (
            <p role="alert" className="mt-2 text-xs text-destructive">
              {result.error}
            </p>
          )}
          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Flags de la expresión">
            {FLAGS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => toggleFlag(f.id)}
                aria-pressed={flags.has(f.id)}
                className={cn(
                  "rounded-md border px-2.5 py-1 font-mono text-xs transition-colors",
                  flags.has(f.id)
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {f.id} <span className="opacity-70">{f.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="regex-text" className="label-mono mb-2 block text-muted-foreground">
            Texto de prueba
          </label>
          <textarea
            id="regex-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
            placeholder="Pega aquí el texto sobre el que probar la expresión…"
            className="w-full rounded-xl border border-input bg-card p-4 font-mono text-sm leading-relaxed focus:outline-none"
          />
        </div>
      </div>

      <div aria-live="polite">
        <p className="label-mono mb-3 text-muted-foreground">
          Coincidencias {result.matches.length > 0 && `(${result.matches.length})`}
        </p>
        {result.matches.length === 0 ? (
          <div className="flex min-h-64 items-center justify-center rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            {pattern && text ? "No hay coincidencias." : "Las coincidencias y grupos aparecerán aquí."}
          </div>
        ) : (
          <ul className="max-h-96 space-y-2 overflow-y-auto">
            {result.matches.map((m, i) => (
              <li key={i} className="rounded-lg bg-card p-3 ring-1 ring-border">
                <div className="flex items-center justify-between gap-2">
                  <code className="rounded bg-success/10 px-2 py-0.5 font-mono text-sm text-success">{m.match}</code>
                  <span className="font-mono text-[10px] text-muted-foreground">índice {m.index}</span>
                </div>
                {m.groups.length > 0 && (
                  <ul className="mt-2 space-y-1 border-t border-border pt-2">
                    {m.groups.map((g, j) => (
                      <li key={j} className="font-mono text-xs text-muted-foreground">
                        Grupo {j + 1}: <span className="text-foreground">{g ?? "(vacío)"}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
