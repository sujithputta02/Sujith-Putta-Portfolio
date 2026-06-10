"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profileData } from "@/data/profile";
import { Award, ShieldCheck, CheckCircle, ExternalLink, Globe } from "lucide-react";

interface CredentialCardProps {
  cred: typeof profileData.credentials[0];
  idx: number;
  getCredIcon: (idx: number) => React.ReactNode;
}

function CredentialCard({ cred, idx, getCredIcon }: CredentialCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll of the card relative to the top of the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Smoothly scale down and fade slightly as subsequent cards scroll over it
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94], { clamp: true });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.75], { clamp: true });

  const cardClassName = `w-full h-full bg-white border border-[#111111]/6 shadow-[0_8px_30px_rgba(0,0,0,0.02)] rounded-3xl p-5 sm:p-6 flex flex-col justify-between hover:border-[#111111]/15 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-300 relative group overflow-hidden select-none block text-left ${
    cred.link ? "cursor-pointer" : ""
  }`;

  const cardContent = (
    <>
      {/* Shimmer metallic sweep shine overlay */}
      <div className="absolute inset-0 pointer-events-none bg-radial from-[#C7FF3D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 flex items-start justify-between">
        <div className="p-2.5 sm:p-3 bg-[#C7FF3D]/25 rounded-2xl">
          {getCredIcon(idx)}
        </div>
        <span className="font-mono text-[9px] text-[#555555] bg-[#111111]/5 px-2 py-0.5 rounded">
          VERIFIED [0{idx + 1}]
        </span>
      </div>

      <div className="relative z-10 mt-3 sm:mt-4 text-left">
        <h3 className="text-xs sm:text-sm font-sans font-bold text-[#111111] line-clamp-1">
          {cred.title}
        </h3>
        <p className="text-[10px] sm:text-[11px] font-mono tracking-wide text-[#555555] mt-1 truncate">
          {cred.issuer}
        </p>
      </div>

      {/* Verified metadata check row */}
      <div className="relative z-10 border-t border-[#111111]/5 pt-2.5 mt-2.5 sm:pt-3 sm:mt-3 flex items-center justify-between text-[10px] font-mono text-[#555555]">
        <span className="text-green-600 flex items-center gap-1 font-bold">
          ✓ SECURE CREDENTIAL
        </span>
        {cred.link && (
          <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[#111111]">
            View <ExternalLink className="w-3 h-3" />
          </span>
        )}
      </div>
    </>
  );

  return (
    <motion.div
      ref={containerRef}
      style={{
        scale,
        opacity,
        top: `calc(var(--sticky-top-base, 80px) + ${idx} * var(--sticky-top-step, 18px))`,
        zIndex: idx + 1,
      }}
      className="sticky w-full h-[152px] sm:h-44 origin-top"
    >
      {cred.link ? (
        <a
          href={cred.link}
          target="_blank"
          rel="noopener noreferrer"
          className={cardClassName}
        >
          {cardContent}
        </a>
      ) : (
        <div className={cardClassName}>
          {cardContent}
        </div>
      )}
    </motion.div>
  );
}

export default function Credentials() {
  const getCredIcon = (idx: number) => {
    switch (idx % 4) {
      case 0:
        return <Award className="w-5 h-5 text-[#111111]" />;
      case 1:
        return <ShieldCheck className="w-5 h-5 text-[#111111]" />;
      case 2:
        return <CheckCircle className="w-5 h-5 text-[#111111]" />;
      default:
        return <Globe className="w-5 h-5 text-[#111111]" />;
    }
  };

  return (
    <section id="credentials" className="py-24 bg-[#F7F7F5] border-b border-[#111111]/8 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left">
          <span className="font-mono text-xs text-[#555555] tracking-widest uppercase">
            08 // VERIFIED BADGES
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-medium text-[#111111] mt-3">
            Credentials Hover Board
          </h2>
          <p className="text-[#555555] font-sans text-sm mt-3 max-w-md">
            Clickable or hoverable verification panels matching certified capabilities.
          </p>
        </div>

        {/* Credentials Stacking Cards Container */}
        <div className="max-w-2xl mx-auto flex flex-col gap-10 sm:gap-12 relative pb-48 [--sticky-top-base:76px] [--sticky-top-step:18px] sm:[--sticky-top-base:120px] sm:[--sticky-top-step:28px]">
          {profileData.credentials.map((cred, idx) => (
            <CredentialCard
              key={cred.title}
              cred={cred}
              idx={idx}
              getCredIcon={getCredIcon}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
