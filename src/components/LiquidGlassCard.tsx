"use client";

import React, { useRef } from "react";
import { useLiquidGlass } from "@/hooks/useLiquidGlass";
import type { LiquidGlassOptions } from "@/hooks/useLiquidGlass";

interface LiquidGlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  active?: boolean;
  options?: LiquidGlassOptions;
}

/**
 * Reusable wrapper component that applies authentic Apple-style Liquid Glass refraction
 * from deepika-builds/liquid-glass, tuned for crystal-clear, non-frosted optics.
 */
export const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({
  className = "",
  children,
  style,
  active = true,
  options,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  onClick,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // Default parameters tuned for crystal-clear, non-frosted refraction
  useLiquidGlass(ref, active, {
    scale: -112,
    chroma: 6,
    border: 0.07,
    mapBlur: 12,
    blur: 0,        // 0 blur = crystal-clear, non-frosted refraction
    saturate: 1.25,
    fallbackBlur: 0, // No frosted blur on fallback
    ...options,
  });

  return (
    <div
      ref={ref}
      className={`liquid-glass-clear ${className}`}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      onClick={onClick}
      {...rest}
    >
      {children}
    </div>
  );
};

export default LiquidGlassCard;
