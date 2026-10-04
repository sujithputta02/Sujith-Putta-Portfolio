"use client";

import { useEffect, type RefObject } from "react";

export interface LiquidGlassOptions {
  scale?: number;       // displacement strength (negative = magnifying bulge)
  chroma?: number;      // per-channel scale stagger (prism fringe)
  border?: number;      // neutral inset as a fraction of the smaller side
  mapBlur?: number;     // edge-curvature softness (px) of the map's gray inset
  blur?: number;        // backdrop blur (px) behind the glass interior (0 for crystal clear non-frosted)
  saturate?: number;    // backdrop saturation boost
  radius?: number | null; // corner radius override (px); default reads border-radius
  fallbackBlur?: number; // frosted blur (px) where refraction is unsupported (0 for non-frosted)
}

/**
 * React hook that applies Apple-style Liquid Glass refraction from deepika-builds/liquid-glass
 * to any element reference, tuned for crystal clear, non-frosted optics.
 */
export function useLiquidGlass(
  ref: RefObject<HTMLElement | null>,
  active: boolean = true,
  options?: LiquidGlassOptions
) {
  const optionsKey = JSON.stringify(options);

  useEffect(() => {
    const el = ref.current;
    if (!el || !active) return;

    let destroyed = false;
    let glassInstance: { destroy: () => void; refresh: () => void } | null = null;

    const init = () => {
      if (destroyed || !ref.current) return;
      const globalLiquidGlass = (window as any).liquidGlass;
      if (typeof globalLiquidGlass === "function") {
        const parsedOptions = optionsKey ? JSON.parse(optionsKey) : undefined;
        glassInstance = globalLiquidGlass(ref.current, parsedOptions);
      } else {
        setTimeout(init, 50);
      }
    };

    init();

    return () => {
      destroyed = true;
      if (glassInstance && typeof glassInstance.destroy === "function") {
        glassInstance.destroy();
      }
    };
  }, [ref, active, optionsKey]);
}
