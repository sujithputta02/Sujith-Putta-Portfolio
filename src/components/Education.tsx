"use client";

import React, { useState } from "react";
import { profileData } from "@/data/profile";
import {
  GraduationCap,
  Award,
  BookOpen,
  CheckCircle,
} from "lucide-react";
import { LiquidGlassCard } from "@/components/LiquidGlassCard";

interface CourseItem {
  name: string;
  categoryLabel: string;
  accent: string;
}

const COURSES: CourseItem[] = [
  { name: "Data Structures & Algorithms", categoryLabel: "Core CS", accent: "#FF5E00" },
  { name: "System Design Basics", categoryLabel: "Systems", accent: "#00F0FF" },
  { name: "Data Engineering", categoryLabel: "Data", accent: "#A800FF" },
  { name: "Computer Network Fundamentals", categoryLabel: "Systems", accent: "#0070F3" },
  { name: "Object-Oriented Programming", categoryLabel: "Core CS", accent: "#FF0055" },
  { name: "DBMS", categoryLabel: "Data", accent: "#10B981" },
  { name: "Full Stack Development", categoryLabel: "Systems", accent: "#FFB800" },
  { name: "Python", categoryLabel: "Core CS", accent: "#38BDF8" },
  { name: "MySQL", categoryLabel: "Data", accent: "#F97316" },
];

export default function Education() {
  const edu = profileData.education;
  const [logoError, setLogoError] = useState(false);

  return (
    <section
      id="education"
      className="w-full px-2 sm:px-4 md:px-5 py-4 sm:py-6 scroll-mt-20 text-left select-none"
    >
      <div className="editorial-frame w-full p-6 sm:p-8 md:p-10 relative overflow-hidden">
        
        {/* Frame Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-6 font-mono text-xs text-white/50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#A800FF] animate-pulse" />
            <span className="uppercase tracking-widest text-white/70">
              02 // ACADEMIC PROFILE & FOUNDATIONS
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>DSU CST Department • Class of 2027</span>
            <div className="w-16 h-1.5 rounded-full spectrum-pill" />
          </div>
        </div>

        {/* Section Heading */}
        <div className="mb-6 text-left">
          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl text-white tracking-tight leading-none font-normal">
            Education &amp; Coursework<sup className="font-sans text-xs sm:text-sm font-mono text-white/50 ml-1.5 top-[-1.5em] sm:top-[-2.2em] font-normal">(02)</sup>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-white/60 mt-2 max-w-xl font-light">
            Formal computer science foundations, core systems engineering, and honors academic standing.
          </p>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            COMPACT BENTO GRID (Left: Credentials | Right: Coursework Matrix)
            Both sides align in height for a balanced, non-bloated section
           ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          
          {/* ─── LEFT COLUMN (5 Cols): Academic Credential Card (Liquid Glass) ─── */}
          <LiquidGlassCard
            className="lg:col-span-5 rounded-2xl sm:rounded-3xl border border-white/[0.1] p-5 sm:p-7 flex flex-col justify-between shadow-xl relative overflow-hidden"
            options={{
              radius: 24,
              scale: -90,
              chroma: 4,
              border: 0.05,
              mapBlur: 8,
              blur: 0,
              fallbackBlur: 0,
            }}
            style={{
              background:
                "radial-gradient(circle at 85% 20%, rgba(168, 0, 255, 0.14) 0%, rgba(14, 14, 14, 0.96) 65%)",
            }}
          >
            {/* Top Status Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2 font-mono text-[11px] text-white/70">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="uppercase font-bold tracking-wider">Active Candidate</span>
              </div>
              <span className="font-mono text-[10px] text-white/60 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full font-bold">
                {edu.years}
              </span>
            </div>

            {/* Middle: University Crest + School + Degree */}
            <div className="flex items-center gap-4 my-3 sm:my-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white p-1.5 border-2 border-white/25 shadow-xl flex items-center justify-center shrink-0">
                {!logoError ? (
                  <img
                    src="/dayananda-sagar-logo.jpg"
                    alt="Dayananda Sagar University Crest"
                    className="w-full h-full object-contain"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <GraduationCap className="w-8 h-8 text-[#1254F5]" />
                )}
              </div>

              <div className="space-y-0.5">
                <span className="font-mono text-[9px] text-[#FF5E00] uppercase font-bold tracking-wider block">
                  DEPARTMENT OF CST
                </span>
                <h3 className="font-display font-bold text-lg sm:text-xl text-white leading-tight">
                  {edu.school}
                </h3>
                <p className="font-sans text-xs text-white/80 font-medium">
                  {edu.degree}
                </p>
                <p className="font-sans text-[11px] text-white/40 font-light">
                  School of Engineering • Bengaluru, India
                </p>
              </div>
            </div>

            {/* Bottom: CGPA Metric Block */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-display font-black text-white leading-none">
                    {edu.cgpa}
                  </span>
                  <span className="font-mono text-xs text-white/40 font-bold">/ 10.0</span>
                </div>
                <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block mt-0.5">
                  Cumulative GPA
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-mono text-[10px] font-bold tracking-wider">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                <span>HONORS STANDING</span>
              </div>
            </div>
          </LiquidGlassCard>

          {/* ─── RIGHT COLUMN (7 Cols): Compact Coursework Matrix (Liquid Glass) ─── */}
          <LiquidGlassCard
            className="lg:col-span-7 rounded-2xl sm:rounded-3xl border border-white/[0.1] p-5 sm:p-7 flex flex-col justify-between shadow-xl relative"
            options={{
              radius: 24,
              scale: -90,
              chroma: 4,
              border: 0.05,
              mapBlur: 8,
              blur: 0,
              fallbackBlur: 0,
            }}
            style={{ background: "rgba(14, 14, 14, 0.96)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3 sm:mb-4">
              <div className="flex items-center gap-2 font-mono text-xs text-white/70">
                <BookOpen className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span className="uppercase font-bold tracking-widest text-white">
                  Core Specialization Modules
                </span>
              </div>
              <span className="font-mono text-[10px] text-white/40 font-bold tracking-wider">
                [09 MODULES]
              </span>
            </div>

            {/* Compact 3x3 Grid of Coursework Modules */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-2.5 my-auto">
              {COURSES.map((course, idx) => (
                <div
                  key={course.name}
                  className="p-2.5 sm:p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.07] hover:border-white/20 transition-all duration-200 flex flex-col justify-between group shadow-sm"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: course.accent }}
                    />
                    <span className="font-mono text-[9px] text-white/30 group-hover:text-white/60">
                      0{idx + 1}
                    </span>
                  </div>

                  <span className="font-sans font-semibold text-xs text-white/85 group-hover:text-white transition-colors line-clamp-2 leading-snug">
                    {course.name}
                  </span>

                  <span className="font-mono text-[9px] text-white/40 uppercase tracking-wider mt-1.5 block">
                    {course.categoryLabel}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Footer Note */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-white/40 mt-3 sm:mt-4">
              <span className="flex items-center gap-1.5 text-white/50">
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                <span>Verified Foundation</span>
              </span>
              <span>CST Department Curriculum</span>
            </div>
          </LiquidGlassCard>

        </div>

        {/* Section Corner Index */}
        <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-white/40 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="text-xl font-display font-black text-white">37</span>
            <span className="uppercase tracking-widest text-[10px]">
              Academic Records // Dayananda Sagar University
            </span>
          </div>
          <span className="text-[10px] uppercase">9.05 CGPA Honors Standing</span>
        </div>

      </div>
    </section>
  );
}
