import { useMemo, useState } from "react";
import { estimateTokens, modelPrices, PRICE_DISCLAIMER } from "@/data/model-prices";
import { trackEvent } from "@/lib/analytics";

const usd = new Intl.NumberFormat("es-ES", { style: "currency", currency: "USD", maximumFractionDigits: 6 });

export function TokenCalculator() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const characters = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const tokens = estimateTokens(text);
    return { characters, words, tokens };
  }, [text]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <label htmlFor="token-input" className="label-mono mb-3 block text-muted-foreground">
          Tu texto
        </label>
        <textarea
          id="token-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => stats.tokens > 0 && trackEvent("calculator_used", { tool: "tokens" })}
          rows={10}
          placeholder="Pega aquí el texto que quieres medir…"
          className="w-full rounded-xl border border-input bg-card p-4 text-sm leading-relaxed focus:outline-none"
        />
      </div>
      <div aria-live="polite" className="space-y-6">
        <dl className="grid grid-cols-3 gap-3">
          <Stat label="Caracteres" value={stats.characters} />
          <Stat label="Palabras" value={stats.words} />
          <Stat label="Tokens aprox." value={stats.tokens} highlight />
        </dl>
        <div className="overflow-hidden rounded-xl ring-1 ring-border">
          <p className="border-b border-border bg-muted/50 px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Coste estimado por llamada (entrada)
          </p>
          <ul className="divide-y divide-border bg-card">
            {modelPrices.map((m) => (
              <li key={m.id} className="flex items-center justify-between px-4 py-2.5 text-sm">
                <span className="text-muted-foreground">{m.label}</span>
                <span className="font-mono">{usd.format((stats.tokens / 1_000_000) * m.inputPer1M)}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Estimación heurística (~4 caracteres por token). {PRICE_DISCLAIMER}
        </p>
      </div>
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div
      className={
        highlight ? "rounded-xl bg-forge p-4 text-forge-foreground" : "rounded-xl bg-card p-4 ring-1 ring-border"
      }
    >
      <dt className={highlight ? "font-mono text-[10px] uppercase tracking-widest text-forge-muted" : "font-mono text-[10px] uppercase tracking-widest text-muted-foreground"}>
        {label}
      </dt>
      <dd className="mt-1 font-display text-2xl font-extrabold">{value.toLocaleString("es-ES")}</dd>
    </div>
  );
}
