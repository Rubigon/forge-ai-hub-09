import { adsConfig, type AdPosition } from "@/config/ads";
import { cn } from "@/lib/utils";

/**
 * Hueco publicitario controlado por configuración (src/config/ads.ts).
 * - off: no renderiza nada.
 * - placeholder: caja discreta "Espacio publicitario" para desarrollo.
 * - live: integración con AdSense (cargar el script solo tras consentimiento).
 */
export function AdSlot({ position, className }: { position: AdPosition; className?: string }) {
  if (adsConfig.mode === "off") return null;

  if (adsConfig.mode === "live") {
    // Integración AdSense: insertar <ins class="adsbygoogle"> aquí.
    return <div className={className} data-ad-position={position} data-ad-client={adsConfig.client} />;
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-lg border border-dashed border-border bg-muted/40",
        position === "sidebar" ? "min-h-[250px]" : "min-h-[90px]",
        className,
      )}
      role="complementary"
      aria-label="Espacio publicitario"
      data-ad-position={position}
    >
      <span className="label-mono text-muted-foreground/60">Espacio publicitario</span>
    </div>
  );
}
