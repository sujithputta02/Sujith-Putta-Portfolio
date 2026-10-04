"use client";

import React, { useId } from "react";
import type { TargetAndTransition } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const initialProps: TargetAndTransition = {
  pathLength: 0,
  opacity: 0,
};

const animateProps: TargetAndTransition = {
  pathLength: 1,
  opacity: 1,
};

type Props = React.ComponentProps<typeof motion.svg> & {
  speed?: number;
  onAnimationComplete?: () => void;
};

interface LiquidGlassStrokeProps {
  d: string;
  duration: number;
  delay?: number;
  speed: number;
  shellGradId: string;
  coreGradId: string;
  causticGradId: string;
  specFilterId: string;
  onAnimationComplete?: () => void;
}

const LiquidGlassStroke: React.FC<LiquidGlassStrokeProps> = ({
  d,
  duration,
  delay = 0,
  speed,
  shellGradId,
  coreGradId,
  causticGradId,
  specFilterId,
  onAnimationComplete,
}) => {
  const calc = (x: number) => x * speed;
  const dur = calc(duration);
  const del = calc(delay);

  const transitionConfig = {
    duration: dur,
    ease: [0.25, 1, 0.5, 1] as const,
    delay: del,
    opacity: { duration: Math.max(0.15, dur * 0.35), delay: del },
  };

  return (
    <g className="relative">
      {/* 0. Volumetric Ambient Back-Caustic Glow */}
      <motion.path
        d={d}
        fill="none"
        stroke={`url(#${causticGradId})`}
        strokeWidth="24"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.35}
        filter="blur(10px)"
        initial={initialProps}
        animate={animateProps}
        transition={transitionConfig}
      />

      {/* 1. Outer Prismatic Glass Body (Crystal Clear with Iridescent Dispersion) */}
      <motion.path
        d={d}
        fill="none"
        stroke={`url(#${shellGradId})`}
        strokeWidth="16.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.88}
        filter={`url(#${specFilterId})`}
        initial={initialProps}
        animate={animateProps}
        transition={transitionConfig}
      />

      {/* 2. Luminous Refractive Liquid Core (Fluid Brilliance) */}
      <motion.path
        d={d}
        fill="none"
        stroke={`url(#${coreGradId})`}
        strokeWidth="9.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.92}
        initial={initialProps}
        animate={animateProps}
        transition={transitionConfig}
      />

      {/* 3. Surface Specular Crest (Ultra-sharp Wet Glass Glint Highlight) */}
      <motion.path
        d={d}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.98}
        initial={initialProps}
        animate={animateProps}
        transition={transitionConfig}
        className="filter drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]"
      />

      {/* 4. Fine Internal Reflection Ridge */}
      <motion.path
        d={d}
        fill="none"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.75}
        initial={initialProps}
        animate={animateProps}
        transition={transitionConfig}
        onAnimationComplete={onAnimationComplete}
      />
    </g>
  );
};

export function AppleHelloEnglishEffect({
  className,
  speed = 1,
  onAnimationComplete,
  ...props
}: Props) {
  const rawId = useId();
  const safeId = rawId.replace(/:/g, "");
  const shellGradId = `glass-shell-${safeId}`;
  const coreGradId = `glass-core-${safeId}`;
  const causticGradId = `glass-caustic-${safeId}`;
  const specFilterId = `glass-spec-${safeId}`;

  return (
    <motion.svg
      className={cn("h-32 sm:h-44 md:h-56 lg:h-64 w-auto overflow-visible select-none", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 638 200"
      fill="none"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      <title>hello - Apple Liquid Glass</title>

      <defs>
        {/* Prismatic Liquid Glass Shell: High luminance crystal with spectral refraction */}
        <linearGradient id={shellGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="20%" stopColor="#E0F2FE" stopOpacity="0.8" />   {/* Ice cyan refraction */}
          <stop offset="42%" stopColor="#FFFFFF" stopOpacity="0.92" />
          <stop offset="68%" stopColor="#F3E8FF" stopOpacity="0.82" />  {/* Prismatic lavender refraction */}
          <stop offset="88%" stopColor="#FEF3C7" stopOpacity="0.88" />  {/* Warm champagne amber highlight */}
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.95" />
        </linearGradient>

        {/* Luminous Inner Liquid Stream: Radiant fluid glow */}
        <linearGradient id={coreGradId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />
          <stop offset="28%" stopColor="#BAE6FD" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.96" />
          <stop offset="82%" stopColor="#FED7AA" stopOpacity="0.88" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.98" />
        </linearGradient>

        {/* Volumetric Caustic Backlight Gradient */}
        <linearGradient id={causticGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.5" />
        </linearGradient>

        {/* 3D Glass Surface Glint & Specular Reflection Filter */}
        <filter
          id={specFilterId}
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
          colorInterpolationFilters="sRGB"
        >
          {/* Surface normal elevation */}
          <feGaussianBlur in="SourceAlpha" stdDeviation="2.8" result="elevated" />
          
          {/* Primary overhead specular light */}
          <feSpecularLighting
            in="elevated"
            surfaceScale="7"
            specularConstant="2.2"
            specularExponent="40"
            lightingColor="#FFFFFF"
            result="specLight1"
          >
            <fePointLight x="240" y="-120" z="260" />
          </feSpecularLighting>
          <feComposite in="specLight1" in2="SourceAlpha" operator="in" result="specGlint" />

          {/* Secondary rim caustic reflection from lower edge */}
          <feSpecularLighting
            in="elevated"
            surfaceScale="3.5"
            specularConstant="1.2"
            specularExponent="20"
            lightingColor="#FEF08A"
            result="specLight2"
          >
            <fePointLight x="480" y="240" z="180" />
          </feSpecularLighting>
          <feComposite in="specLight2" in2="SourceAlpha" operator="in" result="rimGlint" />

          {/* Additive blend to keep glass brilliant and luminous */}
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="rimGlint" />
            <feMergeNode in="specGlint" />
          </feMerge>
        </filter>
      </defs>

      {/* Stroke 1: "h" initial stem */}
      <LiquidGlassStroke
        d="M8.69214 166.553C36.2393 151.239 61.3409 131.548 89.8191 98.0295C109.203 75.1488 119.625 49.0228 120.122 31.0026C120.37 17.6036 113.836 7.43883 101.759 7.43883C88.3598 7.43883 79.9231 17.6036 74.7122 40.9363C69.005 66.5793 64.7866 96.0036 54.1166 190.356"
        duration={0.85}
        delay={0}
        speed={speed}
        shellGradId={shellGradId}
        coreGradId={coreGradId}
        causticGradId={causticGradId}
        specFilterId={specFilterId}
      />

      {/* Stroke 2: "h" body arch and continuous "ello" cursive handwriting */}
      <LiquidGlassStroke
        d="M55.1624 181.135C60.6251 133.114 81.4118 98.0479 107.963 98.0479C123.844 98.0479 133.937 110.703 131.071 128.817C129.457 139.487 127.587 150.405 125.408 163.06C122.869 178.941 130.128 191.348 152.122 191.348C184.197 191.348 219.189 173.523 237.097 145.915C243.198 136.509 245.68 128.073 245.928 119.884C246.176 104.996 237.739 93.8296 222.851 93.8296C203.992 93.8296 189.6 115.17 189.6 142.465C189.6 171.745 205.481 192.341 239.208 192.341C285.066 192.341 335.86 137.292 359.199 75.8585C365.788 58.513 368.26 42.4065 368.26 31.1512C368.26 17.8057 364.042 7.55823 352.131 7.55823C340.469 7.55823 332.777 16.6141 325.829 30.9129C317.688 47.4967 311.667 71.4162 309.203 98.4549C303 166.301 316.896 191.348 349.936 191.348C390 191.348 434.542 135.534 457.286 75.6686C463.803 58.513 466.275 42.4065 466.275 31.1512C466.275 17.8057 462.057 7.55823 450.146 7.55823C438.484 7.55823 430.792 16.6141 423.844 30.9129C415.703 47.4967 409.682 71.4162 407.218 98.4549C401.015 166.301 414.911 191.348 444.416 191.348C473.874 191.348 489.877 165.67 499.471 138.402C508.955 111.447 520.618 94.8221 544.935 94.8221C565.035 94.8221 580.916 109.71 580.916 137.75C580.916 168.768 560.792 192.093 535.362 192.341C512.984 192.589 498.285 174.475 499.774 147.179C501.511 116.907 519.873 94.8221 543.943 94.8221C557.839 94.8221 569.51 100.999 578.682 107.725C603.549 125.866 622.709 114.656 630.047 96.7186"
        duration={2.6}
        delay={0.7}
        speed={speed}
        shellGradId={shellGradId}
        coreGradId={coreGradId}
        causticGradId={causticGradId}
        specFilterId={specFilterId}
        onAnimationComplete={onAnimationComplete}
      />
    </motion.svg>
  );
}

export function AppleHelloVietnameseEffect({
  className,
  speed = 1,
  onAnimationComplete,
  ...props
}: Props) {
  return (
    <AppleHelloEnglishEffect
      className={className}
      speed={speed}
      onAnimationComplete={onAnimationComplete}
      {...props}
    />
  );
}
