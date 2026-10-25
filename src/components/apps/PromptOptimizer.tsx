import { useMemo, useState } from "react";
import { Check, Copy, LoaderCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { trackEvent } from "@/lib/analytics";
import { optimizePrompt } from "@/lib/prompt-optimizer";

export function PromptOptimizer() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [used, setUsed] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const remaining = useMemo(() => Math.max(0, 20 - used), [used]);

  const optimize = async () => {
    if (input.trim().length < 10) {
      setError("Escribe un prompt de al menos 10 caracteres para poder mejorarlo.");
      return;
    }
    if (remaining <= 0) {
      setError("Has alcanzado el límite de usos de esta sesión. Vuelve a cargar la página más tarde.");
      return;
    }
    setError(null);
    setOutput(null);
    setCopied(false);
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const result = optimizePrompt(input);
      setOutput(result);
      setUsed((u) => u + 1);
      trackEvent("prompt_optimizer_used");
    } catch {
      setError("Ocurrió un error al procesar el prompt.");
      toast.error("Ocurrió un error al procesar el prompt.");
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("No se pudo copiar. Selecciona el texto y cópialo manualmente.");
    }
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
          maxLength={12000}
          placeholder='Ej.: "Escríbeme un artículo sobre IA para mi blog"'
          className="w-full rounded-xl border border-input bg-card p-4 text-sm leading-relaxed focus:outline-none"
        />
        {error && (
          <p className="mt-2 text-xs text-destructive" role="alert">
            {error}
          </p>
        )}
        <div className="mt-4 flex items-center justify-between">
          <Button
            type="button"
            disabled={loading || remaining <= 0}
            onClick={optimize}
            className="flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-95"
          >
            {loading ? <LoaderCircle className="size-4 animate-spin" aria-hidden /> : <Sparkles className="size-4" aria-hidden />}
            {loading ? "Optimizando…" : "Optimizar prompt"}
          </Button>
          <span className="font-mono text-[11px] text-muted-foreground">{remaining} usos restantes</span>
        </div>
      </div>

      <div aria-live="polite">
        <div className="mb-3 flex items-center justify-between">
          <span className="label-mono text-muted-foreground">Versión optimizada</span>
          {output && (
            <Button
              variant="ghost"
              size="sm"
              disabled={loading}
              type="button"
              onClick={copy}
              className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {copied ? <Check className="size-3.5 text-success" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
              {copied ? "Copiado" : "Copiar"}
            </Button>
          )}
        </div>
        {loading && <p role="status" className="mb-3 text-sm text-muted-foreground">La IA está preparando tu prompt…</p>}
        {output ? (
          <pre className="min-h-64 overflow-x-auto rounded-xl bg-forge p-5 font-mono text-sm leading-relaxed whitespace-pre-wrap text-forge-foreground">
            {output}
          </pre>
        ) : (
          <div className="flex min-h-64 items-center justify-center rounded-xl border border-dashed border-border p-6 text-center">
            <p className="max-w-xs text-sm text-muted-foreground">
              {loading ? "Esperando respuesta…" : "Todavía no hay un prompt optimizado."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
