"use client";

import React, { useRef } from "react";
import { useLiquidGlass, type LiquidGlassOptions } from "@/hooks/useLiquidGlass";
import { cn } from "@/lib/utils";

export interface LiquidGlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  target?: string;
  rel?: string;
  variant?: "crystal" | "lime" | "orange" | "white";
  size?: "sm" | "md" | "lg";
  options?: LiquidGlassOptions;
  children: React.ReactNode;
}

export const LiquidGlassButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  LiquidGlassButtonProps
>(
  (
    {
      href,
      target,
      rel,
      variant = "crystal",
      size = "md",
      className = "",
      options,
      children,
      onClick,
      ...props
    },
    forwardedRef
  ) => {
    const internalRef = useRef<HTMLElement | null>(null);

    // Apply authentic non-frosted refractive liquid glass (deepika-builds/liquid-glass)
    useLiquidGlass(internalRef as any, true, {
      scale: -95,
      chroma: 5,
      border: 0.08,
      mapBlur: 10,
      blur: 0, // 0 blur = pure crystal-clear refraction, NOT frosted!
      fallbackBlur: 0,
      saturate: 1.35,
      radius: 999, // Pill by default
      ...options,
    });

    const setRefs = (node: any) => {
      internalRef.current = node;
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        (forwardedRef as any).current = node;
      }
    };

    const variantStyles = {
      crystal:
        "text-white bg-white/[0.08] hover:bg-white/[0.14] border-white/25 hover:border-white/50 shadow-[0_8px_30px_rgba(0,0,0,0.5),inset_0_1px_1.5px_rgba(255,255,255,0.7),inset_0_-2px_6px_rgba(255,255,255,0.06),inset_0_0_0_1px_rgba(255,255,255,0.15)]",
      lime:
        "text-black bg-[#D4FF00]/85 hover:bg-[#D4FF00] border-[#D4FF00]/90 shadow-[0_8px_30px_rgba(212,255,0,0.35),inset_0_1.5px_2px_rgba(255,255,255,0.85),inset_0_-2px_6px_rgba(0,0,0,0.15)] font-bold",
      orange:
        "text-white bg-[#FF5E00]/80 hover:bg-[#FF5E00] border-[#FF5E00]/80 shadow-[0_8px_30px_rgba(255,94,0,0.4),inset_0_1.5px_2px_rgba(255,255,255,0.8),inset_0_-2px_6px_rgba(0,0,0,0.15)]",
      white:
        "text-black bg-white/90 hover:bg-white border-white/90 shadow-[0_8px_30px_rgba(255,255,255,0.3),inset_0_1.5px_2px_rgba(255,255,255,1)] font-semibold",
    };

    const sizeStyles = {
      sm: "px-3.5 py-1.5 text-[11px] gap-1.5",
      md: "px-5 py-2 text-xs gap-2",
      lg: "px-7 py-3 text-sm gap-2.5",
    };

    const baseClasses = cn(
      "relative inline-flex items-center justify-center font-mono font-medium tracking-wide rounded-full border transition-all duration-300 select-none cursor-pointer group active:scale-[0.97] hover:-translate-y-0.5",
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if (href) {
      return (
        <a
          ref={setRefs}
          href={href}
          target={target}
          rel={rel}
          onClick={onClick as any}
          className={baseClasses}
        >
          {/* Subtle specular sheen sweep */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 via-transparent to-transparent pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" />
          {children}
        </a>
      );
    }

    return (
      <button
        ref={setRefs}
        onClick={onClick}
        className={baseClasses}
        {...props}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 via-transparent to-transparent pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" />
        {children}
      </button>
    );
  }
);

LiquidGlassButton.displayName = "LiquidGlassButton";

export default LiquidGlassButton;
