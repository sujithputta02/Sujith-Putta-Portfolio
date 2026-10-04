"use client";

import React, { useState } from "react";
import {
  AppleHelloEnglishEffect,
  AppleHelloVietnameseEffect,
} from "@/components/ui/apple-hello-effect";
import { LiquidGlassCard } from "@/components/LiquidGlassCard";
import LiquidGlassButton from "@/components/LiquidGlassButton";
import { Sparkles, RotateCcw, Globe } from "lucide-react";

export const AppleHelloEffectDemo = () => {
  const [lang, setLang] = useState<"en" | "vi">("en");
  const [speed, setSpeed] = useState<number>(1.1);
  const [replayKey, setReplayKey] = useState<number>(0);

  return (
    <div className="flex w-full min-h-screen flex-col justify-center items-center gap-8 bg-[#0C0C0C] text-white p-6 relative select-none">
      {/* Background ambient glow */}
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-[#FF5E00]/20 via-[#0070F3]/15 to-transparent blur-[120px] rounded-full pointer-events-none" />

      {/* Main Liquid Glass Showcase Card */}
      <LiquidGlassCard
        className="relative px-8 py-8 sm:px-14 sm:py-10 rounded-[2.5rem] border border-white/20 bg-white/[0.03] backdrop-blur-3xl shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(255,94,0,0.15)] flex flex-col items-center justify-center overflow-hidden transition-all duration-500 hover:border-white/35 max-w-xl w-full"
        options={{
          scale: -120,
          chroma: 6,
          border: 0.07,
          mapBlur: 12,
          blur: 0,
          saturate: 1.3,
          radius: 36,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none" />

        {lang === "en" ? (
          <AppleHelloEnglishEffect
            key={`en-${replayKey}`}
            speed={speed}
            className="h-18 sm:h-24 md:h-28 text-white filter drop-shadow-[0_0_20px_rgba(255,255,255,0.7)]"
          />
        ) : (
          <AppleHelloVietnameseEffect
            key={`vi-${replayKey}`}
            speed={speed}
            className="h-18 sm:h-24 md:h-28 text-white filter drop-shadow-[0_0_20px_rgba(255,255,255,0.7)]"
          />
        )}

        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/10 text-[10px] font-mono tracking-widest text-white/50 uppercase">
          <Sparkles className="w-3 h-3 text-[#FF5E00]" />
          <span>Liquid Glass Typography Effect</span>
        </div>
      </LiquidGlassCard>

      {/* Controls Bar */}
      <div className="flex items-center gap-3 flex-wrap justify-center font-mono text-[11px] z-10">
        <LiquidGlassButton
          onClick={() => {
            setLang((l) => (l === "en" ? "vi" : "en"));
            setReplayKey((k) => k + 1);
          }}
          size="sm"
          variant="crystal"
          className="px-4 py-2"
        >
          <Globe className="w-3.5 h-3.5 text-[#FF5E00]" />
          <span>{lang === "en" ? "Switch to: xin chào" : "Switch to: hello"}</span>
        </LiquidGlassButton>

        <LiquidGlassButton
          onClick={() => setReplayKey((k) => k + 1)}
          size="sm"
          variant="crystal"
          className="px-4 py-2"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#FF5E00]" />
          <span>Replay Animation</span>
        </LiquidGlassButton>

        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 text-white/70">
          <span>Speed:</span>
          {[0.8, 1.1, 1.5].map((s) => (
            <LiquidGlassButton
              key={s}
              onClick={() => {
                setSpeed(s);
                setReplayKey((k) => k + 1);
              }}
              variant={speed === s ? "white" : "crystal"}
              size="sm"
              className="!px-2 !py-0.5 !rounded !text-[11px]"
            >
              {s}x
            </LiquidGlassButton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppleHelloEffectDemo;
