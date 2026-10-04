"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, type HTMLMotionProps } from "framer-motion";

export interface ParallaxProps extends Omit<HTMLMotionProps<"div">, "style" | "ref"> {
  children?: React.ReactNode;
  speed?: number; // -2 to 2 (negative = rises faster / opposite, positive = floats slower)
  yOffset?: [number, number]; // explicit pixel travel e.g. [-50, 50]
  rotateOffset?: [number, number]; // optional rotation during scroll e.g. [-4, 4]
  scaleOffset?: [number, number]; // optional scale during scroll e.g. [0.95, 1.05]
  opacityOffset?: [number, number]; // optional opacity during scroll e.g. [0.4, 1]
  className?: string;
  style?: React.CSSProperties;
}

export function Parallax({
  children,
  speed = 0.2,
  yOffset,
  rotateOffset,
  scaleOffset,
  opacityOffset,
  className = "",
  style = {},
  ...rest
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  const rangeY: [number, number] = yOffset || [-80 * speed, 80 * speed];
  const y = useTransform(smoothProgress, [0, 1], rangeY);

  const motionStyle: any = {
    ...style,
    y,
  };

  if (rotateOffset) {
    motionStyle.rotate = useTransform(smoothProgress, [0, 1], rotateOffset);
  }

  if (scaleOffset) {
    motionStyle.scale = useTransform(smoothProgress, [0, 1], scaleOffset);
  }

  if (opacityOffset) {
    motionStyle.opacity = useTransform(smoothProgress, [0, 1], opacityOffset);
  }

  return (
    <motion.div
      ref={ref}
      style={motionStyle}
      className={`will-change-transform ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// Background Floating Parallax Orb for deep dimensional layers
export function ParallaxOrb({
  color = "#FF5E00",
  speed = 0.35,
  size = 280,
  top = "10%",
  left,
  right,
  blur = 95,
  opacity = 0.14,
  className = "",
}: {
  color?: string;
  speed?: number;
  size?: number;
  top?: string;
  left?: string;
  right?: string;
  blur?: number;
  opacity?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 26,
    restDelta: 0.001,
  });

  const y = useTransform(smoothProgress, [0, 1], [-120 * speed, 120 * speed]);

  return (
    <div
      ref={ref}
      className={`absolute pointer-events-none z-0 overflow-hidden ${className}`}
      style={{
        top,
        left,
        right,
        width: size,
        height: size,
      }}
      aria-hidden="true"
    >
      <motion.div
        style={{
          y,
          width: "100%",
          height: "100%",
          borderRadius: "9999px",
          backgroundColor: color,
          filter: `blur(${blur}px)`,
          opacity,
        }}
      />
    </div>
  );
}
export default Parallax;
