import { useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";

const STOPWORDS = new Set(
  "de la el en y a los del se las por un para con no una su al lo como más pero sus le ya o este sí porque esta entre cuando muy sin sobre también me hasta hay donde quien desde todo nos durante todos uno les ni contra otros ese eso ante ellos e esto mí antes algunos qué unos yo otro otras otra él tanto esa estos mucho quienes nada muchos cual poco ella estar estas algunas algo nosotros mi mis tú te ti tu tus ellas nosotras vosotros vosotras os mío mía míos mías tuyo tuya tuyos tuyas suyo suya suyos suyas nuestro nuestra nuestros nuestras vuestro vuestra vuestros vuestras esos esas estoy estás está estamos están fue ser son es era eran han has ha hemos hay tener tiene tienen".split(
    " ",
  ),
);

/** Analizador de texto: palabras, caracteres, frases, lectura y densidad léxica. */
export function TextAnalyzer() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/) : [];
    const sentences = trimmed ? trimmed.split(/[.!?…]+/).filter((s) => s.trim().length > 0) : [];
    const readingMinutes = words.length / 220; // velocidad media de lectura en español

    const freq = new Map<string, number>();
    for (const w of words) {
      const clean = w.toLowerCase().replace(/[^\p{L}\p{N}áéíóúüñ]/gu, "");
      if (clean.length > 3 && !STOPWORDS.has(clean)) freq.set(clean, (freq.get(clean) ?? 0) + 1);
    }
    const top = [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
    if (words.length > 0) trackEvent("calculator_used", { tool: "texto" });

    return {
      characters: text.length,
      charactersNoSpaces: text.replace(/\s/g, "").length,
      words: words.length,
      sentences: sentences.length,
      readingMinutes,
      avgWordsPerSentence: sentences.length ? words.length / sentences.length : 0,
      top,
    };
  }, [text]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <label htmlFor="analyzer-input" className="label-mono mb-3 block text-muted-foreground">
          Tu texto
        </label>
        <textarea
          id="analyzer-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={12}
          placeholder="Pega aquí el texto que quieres analizar…"
          className="w-full rounded-xl border border-input bg-card p-4 text-sm leading-relaxed focus:outline-none"
        />
      </div>
      <div aria-live="polite" className="space-y-6">
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Stat label="Palabras" value={stats.words.toLocaleString("es-ES")} />
          <Stat label="Caracteres" value={stats.characters.toLocaleString("es-ES")} />
          <Stat label="Sin espacios" value={stats.charactersNoSpaces.toLocaleString("es-ES")} />
          <Stat label="Frases" value={stats.sentences.toLocaleString("es-ES")} />
          <Stat
            label="Lectura"
            value={stats.readingMinutes < 1 ? "< 1 min" : `~${Math.ceil(stats.readingMinutes)} min`}
          />
          <Stat label="Palabras/frase" value={stats.avgWordsPerSentence.toFixed(1)} />
        </dl>
        <div>
          <h3 className="label-mono mb-3 text-muted-foreground">Palabras más frecuentes</h3>
          {stats.top.length === 0 ? (
            <p className="text-sm text-muted-foreground">Escribe texto para ver la densidad léxica.</p>
          ) : (
            <ul className="space-y-2">
              {stats.top.map(([word, count]) => {
                const pct = (count / stats.words) * 100;
                return (
                  <li key={word} className="flex items-center gap-3">
                    <span className="w-28 truncate font-mono text-sm">{word}</span>
                    <span className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                      <span
                        className="block h-full rounded-full bg-foreground/70"
                        style={{ width: `${Math.min(100, pct * 10)}%` }}
                      />
                    </span>
                    <span className="w-16 text-right font-mono text-xs text-muted-foreground">
                      {count}× ({pct.toFixed(1)}%)
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-card p-4 ring-1 ring-border">
      <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-display text-xl font-extrabold">{value}</dd>
    </div>
  );
}
