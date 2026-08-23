import { useMemo, useState } from "react";
import { Check, Copy, Sparkles } from "lucide-react";
import { optimizePrompt } from "@/lib/prompt-optimizer";
import { trackEvent } from "@/lib/analytics";

/**
 * Prompt Optimizer: motor determinista local que reestructura el prompt en
 * las 7 secciones del marco AIForge. Preparado para sustituir el motor por un
 * AIProvider server-side (ver src/lib/ai/provider.ts) sin tocar la UI.
 */
export function PromptOptimizer() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [used, setUsed] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const remaining = useMemo(() => Math.max(0, 20 - used), [used]);

  const optimize = () => {
    if (input.trim().length < 10) {
      setError("Escribe un prompt de al menos 10 caracteres para poder mejorarlo.");
      return;
    }
    // Protección básica contra abuso (cliente): 20 usos por sesión.
    if (remaining <= 0) {
      setError("Has alcanzado el límite de usos de esta sesión. Vuelve a cargar la página más tarde.");
      return;
    }
    setError(null);
    setOutput(optimizePrompt(input));
    setUsed((u) => u + 1);
    trackEvent("prompt_optimizer_used");
  };

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <label htmlFor="prompt-input" className="label-mono mb-3 block text-muted-foreground">
          Tu prompt actual
        </label>
        <textarea
          id="prompt-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={8}
          placeholder='Ej.: "Escríbeme un artículo sobre IA para mi blog"'
          className="w-full rounded-xl border border-input bg-card p-4 text-sm leading-relaxed focus:outline-none"
        />
        {error && (
          <p className="mt-2 text-xs text-destructive" role="alert">
            {error}
          </p>
        )}
        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={optimize}
            className="flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-95"
          >
            <Sparkles className="size-4" aria-hidden /> Optimizar prompt
          </button>
          <span className="font-mono text-[11px] text-muted-foreground">{remaining} usos restantes</span>
        </div>
      </div>

      <div aria-live="polite">
        <div className="mb-3 flex items-center justify-between">
          <span className="label-mono text-muted-foreground">Versión optimizada</span>
          {output && (
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
        {output ? (
          <pre className="min-h-64 overflow-x-auto rounded-xl bg-forge p-5 font-mono text-sm leading-relaxed whitespace-pre-wrap text-forge-foreground">
            {output}
          </pre>
        ) : (
          <div className="flex min-h-64 items-center justify-center rounded-xl border border-dashed border-border p-6 text-center">
            <p className="max-w-xs text-sm text-muted-foreground">
              El resultado aparecerá aquí estructurado en objetivo, contexto, rol, restricciones, formato, ejemplos y
              criterios de calidad.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
