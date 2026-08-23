import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Action = "format" | "minify" | "validate";

/** Formateador/validador/minificador de JSON 100% local. */
export function JsonFormatter() {
  const [input, setInput] = useState("");
  const [action, setAction] = useState<Action>("format");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!input.trim()) return { ok: true as const, output: "", message: null };
    try {
      const parsed = JSON.parse(input);
      trackIfFirstUse();
      if (action === "validate") return { ok: true as const, output: "", message: "JSON válido." };
      const output = action === "minify" ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2);
      return { ok: true as const, output, message: null };
    } catch (e) {
      return { ok: false as const, output: "", message: e instanceof Error ? e.message : "JSON no válido" };
    }
  }, [input, action]);

  const copy = async () => {
    if (!result.output) return;
    await navigator.clipboard.writeText(result.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <label htmlFor="json-input" className="label-mono text-muted-foreground">
            JSON de entrada
          </label>
          <div className="flex gap-1 rounded-lg border border-border p-1" role="group" aria-label="Acción">
            {(["format", "minify", "validate"] as const).map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setAction(a)}
                aria-pressed={action === a}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                  action === a ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {a === "format" ? "Formatear" : a === "minify" ? "Minimizar" : "Validar"}
              </button>
            ))}
          </div>
        </div>
        <textarea
          id="json-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={14}
          spellCheck={false}
          placeholder='{"nombre": "AIForge", "herramientas": ["prompts", "tokens"]}'
          className={cn(
            "w-full rounded-xl border bg-card p-4 font-mono text-sm leading-relaxed focus:outline-none",
            result.ok ? "border-input" : "border-destructive",
          )}
        />
        {result.message && (
          <p
            role={result.ok ? "status" : "alert"}
            className={cn("mt-2 text-xs", result.ok ? "text-success" : "text-destructive")}
          >
            {result.message}
          </p>
        )}
      </div>
      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="label-mono text-muted-foreground">Resultado</span>
          {result.output && (
            <button
              type="button"
              onClick={copy}
              className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground"
            >
              {copied ? <Check className="size-3.5 text-success" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
              {copied ? "Copiado" : "Copiar"}
            </button>
          )}
        </div>
        <pre className="min-h-80 overflow-auto rounded-xl bg-forge p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap text-forge-foreground">
          {result.output || "El resultado aparecerá aquí."}
        </pre>
      </div>
    </div>
  );
}

let tracked = false;
function trackIfFirstUse() {
  if (!tracked) {
    tracked = true;
    trackEvent("calculator_used", { tool: "json" });
  }
}
