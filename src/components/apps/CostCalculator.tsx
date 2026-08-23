import { useMemo, useState } from "react";
import { estimateCost, modelPrices, PRICE_DISCLAIMER } from "@/data/model-prices";
import { trackEvent } from "@/lib/analytics";

const usd = new Intl.NumberFormat("es-ES", { style: "currency", currency: "USD" });

/** Calculadora de costes de APIs de IA. Los precios viven en src/data/model-prices.ts. */
export function CostCalculator() {
  const [modelId, setModelId] = useState(modelPrices[0].id);
  const [tokensIn, setTokensIn] = useState(1000);
  const [tokensOut, setTokensOut] = useState(500);
  const [requestsPerDay, setRequestsPerDay] = useState(100);

  const model = modelPrices.find((m) => m.id === modelId) ?? modelPrices[0];

  const { daily, monthly, yearly } = useMemo(() => {
    const daily = estimateCost(tokensIn, tokensOut, model, requestsPerDay);
    return { daily, monthly: daily * 30, yearly: daily * 365 };
  }, [tokensIn, tokensOut, model, requestsPerDay]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <Field label="Modelo">
          <select
            value={modelId}
            onChange={(e) => {
              setModelId(e.target.value);
              trackEvent("calculator_used", { tool: "costes", field: "modelo" });
            }}
            className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm focus:outline-none"
          >
            {modelPrices.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label} — {m.provider}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Tokens de entrada por petición">
          <NumberInput value={tokensIn} onChange={setTokensIn} min={0} />
        </Field>
        <Field label="Tokens de salida por petición">
          <NumberInput value={tokensOut} onChange={setTokensOut} min={0} />
        </Field>
        <Field label="Peticiones por día">
          <NumberInput value={requestsPerDay} onChange={setRequestsPerDay} min={0} />
        </Field>
      </div>

      <div aria-live="polite">
        <div className="overflow-hidden rounded-xl bg-forge text-forge-foreground">
          <p className="border-b border-forge-border px-5 py-3 font-mono text-[10px] uppercase tracking-widest text-forge-muted">
            Estimación · {model.provider}
          </p>
          <dl className="divide-y divide-forge-border">
            <ResultRow label="Por petición" value={usd.format(estimateCost(tokensIn, tokensOut, model, 1))} />
            <ResultRow label="Diario" value={usd.format(daily)} />
            <ResultRow label="Mensual (30 días)" value={usd.format(monthly)} highlight />
            <ResultRow label="Anual" value={usd.format(yearly)} />
          </dl>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{PRICE_DISCLAIMER}</p>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="label-mono mb-2 block text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function NumberInput({ value, onChange, min }: { value: number; onChange: (v: number) => void; min: number }) {
  return (
    <input
      type="number"
      value={Number.isNaN(value) ? "" : value}
      min={min}
      onChange={(e) => onChange(Math.max(min, Number(e.target.value)))}
      className="w-full rounded-lg border border-input bg-card px-3 py-2.5 font-mono text-sm focus:outline-none"
    />
  );
}

function ResultRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between px-5 py-4">
      <dt className="text-sm text-forge-muted">{label}</dt>
      <dd className={highlight ? "font-display text-xl font-extrabold" : "font-mono text-sm"}>{value}</dd>
    </div>
  );
}
