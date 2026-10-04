"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profileData } from "@/data/profile";
import {
  Award,
  ShieldCheck,
  CheckCircle,
  ExternalLink,
  Globe,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import LiquidGlassButton from "@/components/LiquidGlassButton";

interface CredentialCardProps {
  cred: (typeof profileData.credentials)[0];
  idx: number;
  total: number;
  getCredIcon: (idx: number, color?: string) => React.ReactNode;
}

function CredentialCard({
  cred,
  idx,
  total,
  getCredIcon,
}: CredentialCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll of the card relative to the top of the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scale down and fade slightly as subsequent cards scroll over it
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94], { clamp: true });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.72], { clamp: true });

  // Exact card model from the reference image: Luminous lime silk gradient, neon rim
  const gradient = "linear-gradient(135deg, #A8F23A 0%, #76D11B 35%, #4C9E10 70%, #2E6B08 100%)";
  const rimColor = "#86E522";

  return (
    <motion.div
      ref={containerRef}
      style={{
        scale,
        opacity,
        top: `calc(var(--sticky-top-base, 80px) + ${idx} * var(--sticky-top-step, 36px))`,
        zIndex: idx + 1,
      }}
      className="sticky w-full origin-top select-none group/card"
    >
      <div className="relative w-full">
        {/* ─── 1. MAIN CARD SURFACE ─── */}
        <div
          className="relative w-full h-[220px] sm:h-[240px] md:h-[250px] rounded-[30px] sm:rounded-[36px] border-[3.5px] border-[#0A0A0A] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] transition-all duration-300 group-hover/card:border-white/20"
          style={{ background: gradient }}
        >
          {/* Silk Luster Radial Light Flares (Exact soft sheen beams from reference image) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 25% 15%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 55%), radial-gradient(ellipse at 80% 35%, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0) 45%)",
            }}
          />

          {/* ─── 2. TOP-LEFT: DUAL TRANSLUCENT FROSTED GLASS CIRCLES (from Reference Image) ─── */}
          <div className="absolute top-4 sm:top-5 left-5 sm:left-7 z-20 flex items-center">
            {/* Left Glass Circle with Brand Logo */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/30 backdrop-blur-md border border-white/50 shadow-[0_4px_12px_rgba(0,0,0,0.15)] flex items-center justify-center p-2 relative z-10 transition-transform group-hover/card:scale-105">
              {getCredIcon(idx, "#FFFFFF")}
            </div>

            {/* Right Overlapping Glass Circle */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-[0_4px_10px_rgba(0,0,0,0.1)] -ml-5 relative z-0 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-white/40 shadow-inner" />
            </div>
          </div>

          {/* ─── 3. TOP-RIGHT: CLEAN VERIFIED BADGE CHIP (Amount & Total Balance removed) ─── */}
          <div className="absolute top-4 sm:top-5 right-5 sm:right-7 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/25 backdrop-blur-md border border-white/20 text-white/90 font-mono text-[10px] sm:text-[11px] font-medium tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A8F23A] animate-pulse" />
            <span>0{idx + 1} // VERIFIED</span>
          </div>

          {/* ─── 4. THE S-CURVE OBSIDIAN MATTE BLACK COMPARTMENT (from Reference Image) ─── */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
          >
            {/* Deep Matte Black Body */}
            <path
              d="M 0 230 L 320 230 C 390 230, 410 330, 480 330 L 1000 330 L 1000 600 L 0 600 Z"
              fill="#060606"
            />
            {/* Top Rim Specular Highlight Line */}
            <path
              d="M 0 230 L 320 230 C 390 230, 410 330, 480 330 L 1000 330"
              stroke="rgba(255, 255, 255, 0.18)"
              strokeWidth="2.5"
              fill="none"
            />
          </svg>

          {/* ─── 5. BOTTOM-LEFT: TITLE & ISSUER ─── */}
          <div className="absolute left-5 sm:left-7 bottom-4 sm:bottom-5 z-20 max-w-[58%] sm:max-w-[65%] text-left">
            <h3 className="font-display font-bold text-base sm:text-lg md:text-xl text-white tracking-tight leading-snug line-clamp-1 group-hover/card:text-white transition-colors">
              {cred.title}
            </h3>
            <p className="text-xs sm:text-sm font-sans text-white/60 tracking-wide mt-0.5 line-clamp-1 font-light">
              {cred.issuer}
            </p>
          </div>

          {/* ─── 6. BOTTOM-RIGHT: ACTION BUTTON (in place of toggle switch) ─── */}
          <div className="absolute right-5 sm:right-7 bottom-4 sm:bottom-5 z-20 flex items-center">
            {cred.link ? (
              <LiquidGlassButton
                href={cred.link}
                target="_blank"
                rel="noopener noreferrer"
                variant="lime"
                size="sm"
                className="font-bold text-xs"
              >
                <span>Verify Badge</span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </LiquidGlassButton>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/70 font-mono text-[11px] font-medium">
                <CheckCircle className="w-3.5 h-3.5 text-[#7AD31E]" />
                <span>Verified</span>
              </span>
            )}
          </div>
        </div>

        {/* ─── 7. 3D EXTRUDED BOTTOM SHELF & NEON RIM (from Reference Image) ─── */}
        {/* Vibrant Glowing Neon Rim */}
        <div
          className="w-[94%] h-2.5 sm:h-3 mx-auto -mt-1 sm:-mt-1.5 rounded-b-[24px] opacity-95 transition-all duration-300 relative z-0"
          style={{
            backgroundColor: rimColor,
            boxShadow: `0 0 16px ${rimColor}88`,
          }}
        />

        {/* 3D Black Base Extrusion / Isometric Shadow Plate */}
        <div className="w-[98%] h-3.5 sm:h-4 mx-auto -mt-1.5 sm:-mt-2 rounded-b-[28px] bg-[#070707] border-b-2 border-black shadow-[0_24px_50px_rgba(0,0,0,0.95)] relative -z-10" />
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// AUTHENTIC COMPANY & ENTITY SVG LOGOS
// ─────────────────────────────────────────────────────────────

// 1. Amazon Web Services (AWS) Official Logo
function AwsLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <path
        fill="#FFFFFF"
        d="M36.379 53.64c0 1.56.168 2.825.465 3.75.336.926.758 1.938 1.347 3.032.207.336.293.672.293.969 0 .418-.254.84-.8 1.261l-2.653 1.77c-.379.25-.758.379-1.093.379-.422 0-.844-.211-1.266-.59a13.28 13.28 0 0 1-1.516-1.98 34.153 34.153 0 0 1-1.304-2.485c-3.282 3.875-7.41 5.813-12.38 5.813-3.535 0-6.355-1.012-8.421-3.032-2.063-2.023-3.114-4.718-3.114-8.086 0-3.578 1.262-6.484 3.833-8.671 2.566-2.192 5.976-3.286 10.316-3.286 1.43 0 2.902.125 4.46.336 1.56.211 3.161.547 4.845.926v-3.074c0-3.2-.676-5.43-1.98-6.734C26.061 32.633 23.788 32 20.546 32c-1.473 0-2.988.168-4.547.547a33.416 33.416 0 0 0-4.547 1.433c-.676.293-1.18.461-1.473.547-.296.082-.507.125-.675.125-.59 0-.883-.422-.883-1.304v-2.063c0-.676.082-1.18.293-1.476.21-.293.59-.586 1.18-.883 1.472-.758 3.242-1.39 5.304-1.895 2.063-.547 4.254-.8 6.57-.8 5.008 0 8.672 1.136 11.032 3.41 2.316 2.273 3.492 5.726 3.492 10.359v13.64Zm-17.094 6.403c1.387 0 2.82-.254 4.336-.758 1.516-.508 2.863-1.433 4-2.695.672-.8 1.18-1.684 1.43-2.695.254-1.012.422-2.23.422-3.665v-1.765a34.401 34.401 0 0 0-3.871-.719 31.816 31.816 0 0 0-3.961-.25c-2.82 0-4.883.547-6.274 1.684-1.387 1.136-2.062 2.734-2.062 4.84 0 1.98.504 3.453 1.558 4.464 1.012 1.051 2.485 1.559 4.422 1.559Zm33.809 4.547c-.758 0-1.262-.125-1.598-.422-.34-.254-.633-.84-.887-1.64L40.715 29.98c-.25-.843-.38-1.39-.38-1.687 0-.672.337-1.05 1.013-1.05h4.125c.8 0 1.347.124 1.644.421.336.25.59.84.84 1.64l7.074 27.876 6.57-27.875c.208-.84.462-1.39.797-1.64.34-.255.93-.423 1.688-.423h3.367c.8 0 1.348.125 1.684.422.336.25.633.84.8 1.64l6.653 28.212 7.285-28.211c.25-.84.547-1.39.84-1.64.336-.255.887-.423 1.644-.423h3.914c.676 0 1.055.336 1.055 1.051 0 .21-.043.422-.086.676-.043.254-.125.59-.293 1.05L80.801 62.57c-.254.84-.547 1.387-.887 1.64-.336.255-.883.423-1.598.423h-3.62c-.801 0-1.348-.13-1.684-.422-.34-.297-.633-.844-.801-1.684l-6.527-27.16-6.485 27.117c-.21.844-.46 1.391-.8 1.684-.337.297-.926.422-1.684.422Zm54.105 1.137c-2.187 0-4.379-.254-6.484-.758-2.106-.504-3.746-1.055-4.84-1.684-.676-.379-1.137-.8-1.305-1.18a2.919 2.919 0 0 1-.254-1.18v-2.148c0-.882.336-1.304.97-1.304.25 0 .503.043.757.129.25.082.629.25 1.05.418a23.102 23.102 0 0 0 4.634 1.476c1.683.336 3.324.504 5.011.504 2.653 0 4.715-.465 6.145-1.39 1.433-.926 2.191-2.274 2.191-4 0-1.18-.379-2.145-1.136-2.946-.758-.8-2.192-1.516-4.254-2.191l-6.106-1.895c-3.074-.969-5.348-2.398-6.734-4.293-1.39-1.855-2.106-3.918-2.106-6.105 0-1.77.38-3.328 1.137-4.676a10.829 10.829 0 0 1 3.031-3.453c1.262-.965 2.696-1.684 4.38-2.188 1.683-.504 3.452-.715 5.304-.715.926 0 1.894.043 2.82.168.969.125 1.852.293 2.738.461.84.211 1.641.422 2.399.676.758.254 1.348.504 1.77.758.59.336 1.011.672 1.261 1.05.254.34.379.802.379 1.391v1.98c0 .884-.336 1.348-.969 1.348-.336 0-.883-.171-1.597-.507-2.403-1.094-5.098-1.641-8.086-1.641-2.399 0-4.293.379-5.598 1.18-1.309.797-1.98 2.02-1.98 3.746 0 1.18.421 2.191 1.261 2.988.844.8 2.403 1.602 4.633 2.316l5.98 1.895c3.032.969 5.22 2.316 6.524 4.043 1.305 1.727 1.938 3.707 1.938 5.895 0 1.812-.38 3.453-1.094 4.882-.758 1.434-1.77 2.696-3.074 3.707-1.305 1.051-2.864 1.809-4.672 2.36-1.895.586-3.875.883-6.024.883Zm0 0"
      />
      <path
        fill="#FF9900"
        d="M118 73.348c-4.432.063-9.664 1.052-13.621 3.832-1.223.883-1.012 2.062.336 1.894 4.508-.547 14.44-1.726 16.21.547 1.77 2.23-1.976 11.62-3.663 15.79-.504 1.26.59 1.769 1.726.8 7.41-6.231 9.348-19.242 7.832-21.137-.757-.925-4.388-1.79-8.82-1.726zM1.63 75.859c-.927.116-1.347 1.236-.368 2.121 16.508 14.902 38.359 23.872 62.613 23.872 17.305 0 37.43-5.43 51.281-15.66 2.273-1.688.297-4.254-2.02-3.204-15.534 6.57-32.421 9.77-47.788 9.77-22.778 0-44.8-6.273-62.653-16.633-.39-.231-.755-.304-1.064-.266z"
      />
    </svg>
  );
}

// 2. Google Cloud Platform (GCP) Official 4-Color Cloud Logo
function GoogleCloudLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <path
        fill="#EA4335"
        d="M80.6 40.3h.4l-.2-.2 14-14v-.3c-11.8-10.4-28.1-14-43.2-9.5C36.5 20.8 24.9 32.8 20.7 48c.2-.1.5-.2.8-.2 5.2-3.4 11.4-5.4 17.9-5.4 2.2 0 4.3.2 6.4.6.1-.1.2-.1.3-.1 9-9.9 24.2-11.1 34.6-2.6h-.1z"
      />
      <path
        fill="#4285F4"
        d="M108.1 47.8c-2.3-8.5-7.1-16.2-13.8-22.1L80 39.9c6 4.9 9.5 12.3 9.3 20v2.5c16.9 0 16.9 25.2 0 25.2H63.9v20h-.1l.1.2h25.4c14.6.1 27.5-9.3 31.8-23.1 4.3-13.8-1-28.8-13-36.9z"
      />
      <path
        fill="#34A853"
        d="M39 107.9h26.3V87.7H39c-1.9 0-3.7-.4-5.4-1.1l-15.2 14.6v.2c6 4.3 13.2 6.6 20.7 6.6z"
      />
      <path
        fill="#FBBC05"
        d="M40.2 41.9c-14.9.1-28.1 9.3-32.9 22.8-4.8 13.6 0 28.5 11.8 37.3l15.6-14.9c-8.6-3.7-10.6-14.5-4-20.8 6.6-6.4 17.8-4.4 21.7 3.8L68 55.2C61.4 46.9 51.1 42 40.2 42.1z"
      />
    </svg>
  );
}

// 3. Kaggle Official 'k' Logo
function KaggleLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <path
        fill="#20BEFF"
        d="M100.402 127.243c-.126.501-.627.752-1.502.752H82.168c-1.007 0-1.876-.438-2.632-1.317L51.91 91.531l-7.706 7.33v27.258c0 1.255-.628 1.881-1.88 1.881h-12.97c-1.254 0-1.88-.626-1.88-1.88V1.876c0-1.25.625-1.877 1.88-1.877h12.97c1.253 0 1.882.628 1.882 1.876v76.501l33.08-33.457c.878-.875 1.755-1.315 2.631-1.315h17.295c.75 0 1.25.315 1.504.937.252.753.19 1.316-.19 1.693L63.561 80.062l36.465 45.3c.499.502.625 1.128.38 1.881"
      />
    </svg>
  );
}

// 4. NASA Official Meatball Insignia
function NasaLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 110 92" className={className} fill="none">
      {/* Blue Cosmos Circle */}
      <circle cx="50.049" cy="45" fill="#0B3D91" r="40.14" />
      <g fill="#FFFFFF">
        {/* Starfield */}
        <circle cx="47.679" cy="12.57" r=".45" />
        <circle cx="52.299" cy="13.17" r=".45" />
        <circle cx="58.359" cy="21.33" r=".45" />
        <circle cx="25.119" cy="63.33" r=".45" />
        <circle cx="26.289" cy="66.93" r=".45" />
        <circle cx="20.709" cy="63.87" r=".337" />
        <circle cx="39.009" cy="70.942" r=".338" />
        <circle cx="67.711" cy="64.98" r=".337" />
        <circle cx="76.052" cy="55.92" r=".338" />
        <circle cx="35.169" cy="23.962" r=".337" />
        <circle cx="44.349" cy="17.22" r=".337" />
        <circle cx="76.719" cy="57.96" r=".45" />
        <circle cx="70.839" cy="58.2" r=".45" />
        {/* Supersonic Red Vector Chevron */}
        <path
          d="M82.809 24.72c-5.466 3.204-14.081 7.071-22.439 10.352 2.644 3.545 6.57-2.42 13.779-5.668 19.499-9.599-2.725 2.582-11.734 9.315-17.227 13.068.283.461.557.922.822 1.381 8.322-5.569 13.922-9.668 17.185-12.409 4.5-3.78 14.76-12.24 18.66-23.58C95.709 16.92 87.621 21.899 82.809 24.72z"
          fill="#FC3D21"
        />
        {/* White Elliptical Orbit Ring */}
        <path
          d="M60.967 35.813c-10.492-13.206-23.309-20.461-28.835-16.07-4.292 3.41-2.53 13.376 3.386 23.845.306-.105.609-.208.909-.31-5.971-10.2-7.605-19.679-3.557-22.896 5.087-4.042 17.37 3.241 27.558 16.064 2.109 2.654 3.963 5.318 5.533 7.915 6.012 9.95 7.857 18.948 3.703 22.621-1.271 1.124-5.155 1.565-10.243-.725-.071.089.043.33.132.389 4.392 1.766 8.599 2.439 10.723.752C75.38 63.342 71.459 49.019 60.967 35.813z"
          stroke="#FFFFFF"
          strokeWidth="1.2"
        />
        {/* Official NASA Serif Lettering */}
        <path d="M15.969 37.38h6.72l5.64 9.57c0 0 0-6.93 0-7.47 0-.84-1.065-1.935-1.44-2.1.45 0 4.38 0 4.65 0-.285.075-1.2 1.185-1.2 2.1 0 .45 0 10.5 0 10.98 0 .675.975 1.605 1.44 1.965h-6.48l-5.73-9.615c0 0 0 7.17 0 7.56 0 .75.735 1.47 1.5 2.085h-4.95c.705-.3 1.38-1.245 1.44-1.995s0-10.425 0-10.845C17.559 38.7 16.674 37.95 15.969 37.38z" />
        <path d="M38.559 50.79c.09-.6.36-1.8.36-1.8h4.98c.225.6.393 1.139.48 1.65.105.615-.525 1.305-1.08 1.785h7.871c.164-.11.327-.22.49-.329-.305-.27-.586-.675-.771-1.156-.3-.78-5.04-13.56-5.04-13.56h-7.8c.375.345 1.455 1.275 1.29 2.28-.147.9-2.808 10.534-2.97 11.01-.225.66-1.38 1.395-1.845 1.785h4.815C38.859 51.915 38.469 51.39 38.559 50.79zM41.049 41.58l2.22 5.49h-3.9L41.049 41.58z" />
        <path d="M65.748 44.848c-1.468.978-3.017 1.999-4.649 3.065.732.355 1.315.801 1.371 1.377.104 1.082-2.07 1.605-4.035 1.38-.393-.045-.779-.148-1.147-.286-.408.263-.82.528-1.238.796-.425.273-.941.609-1.53.997v1.553c.39-.765 1.243-1.45 1.905-1.485.285-.015 1.275.9 5.355.675 1.98-.109 5.805-2.22 5.745-4.65C67.489 46.834 66.739 45.714 65.748 44.848zM54.519 48.6v1.582c.361-.241.717-.478 1.066-.709C55.036 49.091 54.647 48.734 54.519 48.6zM64.353 43.855c-.38-.225-.765-.422-1.134-.596-1.92-.9-3.93-1.065-4.35-2.28-.296-.857.54-1.65 2.58-1.62 2.04.03 3.93 1.245 4.44 1.68v-3.87c-.15.15-.808.905-1.41.78-1.155-.24-3.12-.553-5.37-.54-2.58.015-4.8 2.009-4.875 4.53-.105 3.525 2.715 4.485 4.305 5.04.164.057.351.118.554.183 1.525-.992 2.731-1.756 3.437-2.163C63.004 44.726 63.625 44.334 64.353 43.855z" />
        <path d="M77.439 52.425h8.94c-.495-.12-1.05-.705-1.35-1.485-.3-.78-5.04-13.56-5.04-13.56H76.59c-.964.694-1.997 1.426-3.1 2.197-.003.028-.006.056-.011.083-.148.9-2.808 10.534-2.97 11.01-.225.66-1.38 1.395-1.845 1.785h4.815c-.48-.54-.87-1.065-.78-1.665.09-.6.36-1.8.36-1.8h4.98c.225.6.393 1.139.48 1.65C78.624 51.255 77.994 51.945 77.439 52.425zM73.509 47.07l1.68-5.49 2.22 5.49H73.509z" />
      </g>
    </svg>
  );
}

// 5. Accenture Official Forward Chevron Logo
function AccentureLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="m.66 16.95 13.242-4.926L.66 6.852V0l22.68 9.132v5.682L.66 24Z"
        fill="#A100FF"
      />
    </svg>
  );
}

// 6. dbt Labs Official Faceted Cube Logo
function DbtLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M17.9004 9.3763a8.1488 8.1488 0 0 0-3.0421-3.1206l1.7708.8385a10.2874 10.2874 0 0 1 3.74 3.0007l3.234-5.9295a2.8546 2.8546 0 0 0-.0611-2.9604C22.7566.0371 21.2112-.3409 19.9754.3327l-5.8749 3.2101a4.3612 4.3612 0 0 1-4.1761 0L4.1769.408a2.8545 2.8545 0 0 0-2.9592.0632c-1.1673.7853-1.5452 2.33-.8723 3.5655L3.55 9.9106a4.3612 4.3612 0 0 1 0 4.1772l-3.1272 5.743a2.86 2.86 0 0 0 .085 2.9974c.794 1.1438 2.3225 1.5054 3.5448.8385l6.0581-3.3049a10.2877 10.2877 0 0 1-3.0051-3.7454l-.8374-1.7708a8.148 8.148 0 0 0 3.1206 3.0421l10.5832 5.779c1.2213.666 2.7481.3055 3.5426-.8363a2.8699 2.8699 0 0 0 .0796-3.0018L17.9004 9.3763zm3.3801-7.7351c.6022 0 1.0904.4882 1.0904 1.0904s-.4882 1.0904-1.0904 1.0904-1.0904-.4882-1.0904-1.0904.4882-1.0904 1.0904-1.0904zM2.7442 3.822c-.6022 0-1.0904-.4882-1.0904-1.0904s.4882-1.0904 1.0904-1.0904 1.0904.4882 1.0904 1.0904S3.3464 3.822 2.7442 3.822zm0 18.5363c-.6022 0-1.0904-.4882-1.0904-1.0904 0-.6022.4882-1.0904 1.0904-1.0904s1.0904.4882 1.0904 1.0904c0 .6022-.4882 1.0904-1.0904 1.0904zm10.3585-11.4489c-1.2008-.0035-2.177.9672-2.1805 2.1679a2.1738 2.1738 0 0 0 .7052 1.6091c-1.4872-.2091-2.5234-1.5843-2.3142-3.0716.2091-1.4872 1.5843-2.5234 3.0716-2.3142a2.7194 2.7194 0 0 1 2.3142 2.3142 2.1623 2.1623 0 0 0-1.5963-.7054zm8.1778 11.4489c-.6022 0-1.0904-.4882-1.0904-1.0904 0-.6022.4882-1.0904 1.0904-1.0904s1.0904.4882 1.0904 1.0904c0 .6022-.4882 1.0904-1.0904 1.0904z"
        fill="#FF694B"
      />
    </svg>
  );
}

// 7. OpenAI Official Knot Logo (ChatGPT Prompt Engineering)
function OpenAILogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#10A37F">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  );
}

// 8. Google Official 4-Color 'G' Logo (Google Gen AI Exchange)
function GoogleGLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.67v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.16z"
        fill="#4285F4"
      />
      <path
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.34 24 12 24z"
        fill="#34A853"
      />
      <path
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.94 0 12s.45 3.84 1.24 5.42l4.04-3.15z"
        fill="#FBBC05"
      />
      <path
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.93 6.72-4.93z"
        fill="#EA4335"
      />
    </svg>
  );
}

// 9. Google Gemini / Gen AI Exchange Spark Logo
function GoogleGeminiLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <defs>
        <linearGradient id="geminiGradCred" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1A73E8" />
          <stop offset="50%" stopColor="#9334E6" />
          <stop offset="100%" stopColor="#FF0055" />
        </linearGradient>
      </defs>
      <path
        d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81"
        fill="url(#geminiGradCred)"
      />
    </svg>
  );
}

export default function Credentials() {
  const getCredIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <AwsLogo className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 1:
        return <GoogleCloudLogo className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 2:
        return <KaggleLogo className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 3:
        return <NasaLogo className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 4:
        return <AccentureLogo className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 5:
        return <DbtLogo className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 6:
        return <OpenAILogo className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 7:
        return <GoogleGLogo className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 8:
        return <GoogleGeminiLogo className="w-5 h-5 sm:w-6 sm:h-6" />;
      default:
        return <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF5E00]" />;
    }
  };

  return (
    <section id="credentials" className="w-full px-2 sm:px-4 md:px-5 py-4 sm:py-6 scroll-mt-20 text-left select-none">
      {/* ─────────────────────────────────────────────────────────────
          EDITORIAL FRAME CONTAINER (explicit overflow-visible for sticky stacking)
         ───────────────────────────────────────────────────────────── */}
      <div
        className="editorial-frame w-full p-6 sm:p-10 md:p-14 relative"
        style={{ overflow: "visible" }}
      >
        
        {/* Frame Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8 font-mono text-xs text-white/50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="uppercase tracking-widest text-white/70">
              08 // VERIFIED CREDENTIALS & CERTIFICATIONS
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>Enterprise Systems Badges ({profileData.credentials.length})</span>
            <div className="w-16 h-1.5 rounded-full spectrum-pill" />
          </div>
        </div>

        {/* Section Heading */}
        <div className="mb-10 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl text-white tracking-tight leading-none font-normal">
                Credentials &amp; Badges<sup className="font-sans text-xs sm:text-sm font-mono text-white/50 ml-1.5 top-[-1.5em] sm:top-[-2.2em] font-normal">(06)</sup>
              </h2>
              <p className="font-sans text-sm sm:text-base text-white/60 mt-3 max-w-xl font-light">
                Independently verifiable certifications across cloud computing, machine learning, and software simulations.
              </p>
            </div>

            {/* Visual Cue Indicator */}
            <div className="hidden md:flex items-center gap-2 font-mono text-[11px] text-[#00E5FF] bg-white/5 border border-white/10 px-4 py-2 rounded-full uppercase tracking-wider shrink-0">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#FF5E00]" />
              <span>Scroll down to stack cards into deck</span>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            CREDENTIALS PHYSICAL STACKING CARDS DECK
            Each card pins at tiered offsets and stacks on scroll
           ───────────────────────────────────────────────────────────── */}
        <div
          className="w-full max-w-xl sm:max-w-2xl md:max-w-[660px] mx-auto flex flex-col gap-10 sm:gap-14 relative pb-64 sm:pb-80 pt-4"
          style={{
            "--sticky-top-base": "85px",
            "--sticky-top-step": "40px",
          } as React.CSSProperties}
        >
          {profileData.credentials.map((cred, idx) => (
            <CredentialCard
              key={cred.title}
              cred={cred}
              idx={idx}
              total={profileData.credentials.length}
              getCredIcon={getCredIcon}
            />
          ))}
        </div>

        {/* Section Corner Index */}
        <div className="mt-12 pt-6 border-t border-white/10 flex items-center justify-between text-white/40 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="text-xl font-display font-black text-white">39</span>
            <span className="uppercase tracking-widest text-[10px]">Verified Credentials Board</span>
          </div>
          <span className="text-[10px] uppercase">AWS / GCP / Kaggle / NASA / DeepLearning.AI</span>
        </div>

      </div>
    </section>
  );
}
