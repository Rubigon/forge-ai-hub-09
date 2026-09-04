import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { budgetOptions, levelOptions, taskOptions } from "@/data/categories";
import { tools } from "@/data/tools";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { BudgetId, LevelId, TaskId, Tool } from "@/types";

/**
 * "La Forja": recomendador de herramientas en 3 pasos (objetivo, presupuesto, nivel).
 * Reglas transparentes: cada recomendación explica por qué encaja.
 */
export function RecommenderWizard() {
  const [step, setStep] = useState(0);
  const [task, setTask] = useState<TaskId | null>(null);
  const [budget, setBudget] = useState<BudgetId | null>(null);
  const [level, setLevel] = useState<LevelId | null>(null);

  const results = useMemo(() => {
    if (!task || !budget || !level) return [];
    return recommend(task, budget, level);
  }, [task, budget, level]);

  const reset = () => {
    setStep(0);
    setTask(null);
    setBudget(null);
    setLevel(null);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-forge-border bg-forge-card p-6 text-forge-foreground shadow-2xl sm:p-8">
      <div className="absolute top-0 right-0 p-4 font-mono text-[10px] uppercase tracking-widest text-forge-muted">
        Paso {Math.min(step + 1, 3)} / 3
      </div>

      {step === 0 && (
        <StepShell title="¿Qué quieres hacer?">
          <OptionGrid
            options={taskOptions.map((o) => ({ id: o.id, label: o.label, code: o.code }))}
            selected={task}
            onSelect={(id) => {
              setTask(id as TaskId);
              setStep(1);
            }}
          />
        </StepShell>
      )}

      {step === 1 && (
        <StepShell title="¿Cuál es tu presupuesto?" onBack={() => setStep(0)}>
          <OptionGrid
            options={budgetOptions.map((o) => ({ id: o.id, label: o.label }))}
            selected={budget}
            onSelect={(id) => {
              setBudget(id as BudgetId);
              setStep(2);
            }}
          />
        </StepShell>
      )}

      {step === 2 && (
        <StepShell title="¿Cuál es tu nivel?" onBack={() => setStep(1)}>
          <OptionGrid
            options={levelOptions.map((o) => ({ id: o.id, label: o.label }))}
            selected={level}
            onSelect={(id) => {
              setLevel(id as LevelId);
              trackEvent("recommendation_completed", { task: task ?? "", budget: budget ?? "", level: id });
              setStep(3);
            }}
          />
        </StepShell>
      )}

      {step === 3 && (
        <div>
          <h3 className="mb-2 font-display text-xl font-semibold">Tu stack recomendado</h3>
          <p className="mb-6 text-sm text-forge-muted">
            Basado en: {taskOptions.find((o) => o.id === task)?.label} ·{" "}
            {budgetOptions.find((o) => o.id === budget)?.label} · {levelOptions.find((o) => o.id === level)?.label}
          </p>
          <ul className="space-y-3">
            {results.map(({ tool, reason, match }, index) => (
              <li key={tool.slug}>
                <Link
                  to="/herramientas/$slug"
                  params={{ slug: tool.slug }}
                  className="block rounded-xl border border-forge-border bg-forge p-4 transition-colors hover:border-forge-foreground/40"
                >
                  <div className="mb-1 flex items-center justify-between gap-3">
                    <span className="font-semibold">
                      {index === 0 && (
                        <span className="mr-2 rounded bg-forge-foreground px-1.5 py-0.5 font-mono text-[10px] uppercase text-forge">
                          Mejor opción
                        </span>
                      )}
                      {tool.name}
                    </span>
                    <span className="shrink-0 font-mono text-[11px] text-forge-muted">{match}% compatible</span>
                  </div>
                  <p className="text-xs leading-relaxed text-forge-muted">{reason}</p>
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={reset}
            className="mt-6 flex items-center gap-2 font-mono text-xs text-forge-muted transition-colors hover:text-forge-foreground"
          >
            <RotateCcw className="size-3.5" aria-hidden /> Empezar de nuevo
          </button>
        </div>
      )}

      <div className="mt-8 flex gap-1.5" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn("h-1.5 w-8 rounded-full", step >= i || step === 3 ? "bg-forge-foreground" : "bg-forge-border")}
          />
        ))}
      </div>
    </div>
  );
}

function StepShell({
  title,
  onBack,
  children,
}: {
  title: string;
  onBack?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="rounded-full border border-forge-border p-1.5 text-forge-muted transition-colors hover:text-forge-foreground"
            aria-label="Paso anterior"
          >
            <ArrowLeft className="size-4" aria-hidden />
          </button>
        )}
        <h3 className="font-display text-xl font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function OptionGrid({
  options,
  selected,
  onSelect,
}: {
  options: { id: string; label: string; code?: string }[];
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => onSelect(option.id)}
          className={cn(
            "rounded-xl border border-forge-border p-4 text-left transition-all hover:border-forge-foreground/60 hover:bg-forge",
            selected === option.id && "border-forge-foreground bg-forge",
          )}
        >
          {option.code && <span className="mb-1 block font-mono text-xs text-forge-muted">{option.code}</span>}
          <span className="font-medium">{option.label}</span>
        </button>
      ))}
    </div>
  );
}

const MAX_SCORE = 6;

function recommend(task: TaskId, budget: BudgetId, level: LevelId): { tool: Tool; reason: string; match: number }[] {
  const matches = tools.filter((t) => t.tasks.includes(task));
  const scored = matches
    .map((tool) => {
      let score = 0;
      const reasons: string[] = [];
      // Presupuesto
      if (budget === "gratis" && tool.pricing === "gratis") {
        score += 3;
        reasons.push("es completamente gratuita");
      } else if (budget === "gratis" && tool.freeTier) {
        score += 2;
        reasons.push("tiene un plan gratuito usable");
      } else if (budget === "menos-10" && tool.pricing !== "pago") {
        score += 2;
        reasons.push("encaja en un presupuesto ajustado");
      } else if (budget === "10-30" || budget === "mas-30") {
        score += 1;
        reasons.push("tu presupuesto cubre sus planes de pago");
      }
      // Nivel
      if (tool.levels.includes(level)) {
        score += 2;
        reasons.push(
          level === "principiante"
            ? "es adecuada para empezar sin experiencia"
            : level === "intermedio"
              ? "aprovecha conocimientos intermedios"
              : "ofrece el control que busca un perfil avanzado",
        );
      }
      if (tool.isPopular) score += 1;
      return { tool, score, reasons };
    })
    .sort((a, b) => b.score - a.score || b.tool.rating - a.tool.rating);

  // Siempre debe haber al menos una recomendación: si ningún resultado supera
  // el umbral, se relaja el filtro y, en última instancia, se recomienda la
  // herramienta mejor valorada del catálogo.
  let selected = scored.filter((r) => r.score > 2);
  if (selected.length === 0) selected = scored.slice(0, 3);
  if (selected.length === 0) {
    const fallback = [...tools].sort((a, b) => b.rating - a.rating)[0];
    if (fallback) {
      selected = [
        {
          tool: fallback,
          score: 0,
          reasons: ["es la herramienta mejor valorada del catálogo y cubre tareas generales"],
        },
      ];
    }
  }

  return selected.slice(0, 3).map(({ tool, score, reasons }) => ({
    tool,
    match: Math.max(40, Math.min(98, Math.round((score / MAX_SCORE) * 60) + 38)),
    reason: `La recomendamos porque ${
      reasons.length > 0 ? reasons.slice(0, 2).join(" y ") : "cubre la tarea que has elegido"
    }. AIForge Score editorial: ${editorialScore(tool).overall.toFixed(1)}/10.`,
  }));
}
