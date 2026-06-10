"use client";

import React from "react";
import { Search, Cpu, LayoutGrid, ArrowUpRight } from "lucide-react";

export default function CaseStudy() {
  return (
    <section className="py-24 bg-[#FAF9F6] border-y border-[#111111]/8 relative overflow-hidden">
      {/* Absolute grid decoration */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(17,17,17,1) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header and metadata */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#111111]/8 pb-8 mb-16">
          <div>
            <span className="font-mono text-xs text-[#555555] uppercase tracking-wider">
              02 // CASE RETROSPECTIVE
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-[#111111] mt-3">
              Life Flow AI
            </h2>
            <p className="text-[#555555] font-sans text-sm mt-2">
              Microsoft Imagine Cup 2026 Innovation Deep-Dive
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="font-mono text-[10px] text-[#555555] bg-[#C7FF3D] border border-transparent px-3 py-1 rounded-full uppercase font-bold tracking-wider">
              MICROSOFT AZURE INTEGRATION
            </span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Metric 1 */}
          <div className="bg-white border border-[#111111]/8 p-8 rounded-3xl flex flex-col justify-between h-56 hover:border-[#111111]/15 transition-all">
            <div className="p-3 bg-[#C7FF3D]/20 rounded-2xl w-fit">
              <Search className="w-5 h-5 text-[#111111]" />
            </div>
            <div>
              <span className="text-4xl md:text-5xl font-mono font-bold tracking-tight text-[#111111]">
                Hybrid
              </span>
              <p className="text-xs font-sans text-[#555555] mt-2 font-semibold uppercase tracking-wide">
                Search Pipeline
              </p>
              <p className="text-[11px] font-sans text-[#555555] mt-1 leading-snug">
                Azure AI Search private index queries paired with a smart fallback to the Bing Web Search API for wide coverage.
              </p>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="bg-white border border-[#111111]/8 p-8 rounded-3xl flex flex-col justify-between h-56 hover:border-[#111111]/15 transition-all">
            <div className="p-3 bg-[#C7FF3D]/20 rounded-2xl w-fit">
              <Cpu className="w-5 h-5 text-[#111111]" />
            </div>
            <div>
              <span className="text-4xl md:text-5xl font-mono font-bold tracking-tight text-[#111111]">
                AI-Led
              </span>
              <p className="text-xs font-sans text-[#555555] mt-2 font-semibold uppercase tracking-wide">
                Workflow Generator
              </p>
              <p className="text-[11px] font-sans text-[#555555] mt-1 leading-snug">
                Translates complex bureaucratic workflows (hospital, visas) into structured interactive checklists using DeepSeek R1 & GPT-4o.
              </p>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="bg-white border border-[#111111]/8 p-8 rounded-3xl flex flex-col justify-between h-56 hover:border-[#111111]/15 transition-all">
            <div className="p-3 bg-[#C7FF3D]/20 rounded-2xl w-fit">
              <LayoutGrid className="w-5 h-5 text-[#111111]" />
            </div>
            <div>
              <span className="text-4xl md:text-5xl font-mono font-bold tracking-tight text-[#111111]">
                3D R3F
              </span>
              <p className="text-xs font-sans text-[#555555] mt-2 font-semibold uppercase tracking-wide">
                Gamified Engine
              </p>
              <p className="text-[11px] font-sans text-[#555555] mt-1 leading-snug">
                Three.js and React Three Fiber interactive node visualizations tracking user achievements in real-time.
              </p>
            </div>
          </div>
        </div>

        {/* Narrative columns layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans text-sm leading-relaxed text-[#555555]">
          <div>
            <h4 className="text-xs font-mono text-[#111111] uppercase tracking-widest mb-4">
              // THE CHALLENGE
            </h4>
            <p className="text-[#111111] font-medium text-base mb-3">
              Simplifying complex, confusing real-world bureaucratic procedures without getting lost in paper forms or broken links.
            </p>
            <p>
              Navigating hospital admissions, visa applications, or passport paperwork is typically a nightmare of disjointed steps and opaque guidelines. Traditional setups offer static instruction sheets that fail to account for dynamic individual circumstances. We built LifeFlow to transform these messy administrative workflows into simple, validated, step-by-step interactive checklists powered by sovereign AI agents.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-mono text-[#111111] uppercase tracking-widest mb-4">
              // THE ARCHITECTURE
            </h4>
            <p className="text-[#111111] font-medium text-base mb-3">
              Azure-hosted Next.js web application utilizing hybrid semantic search indexes for real-time document validation.
            </p>
            <p>
              We engineered a robust pipeline connecting Next.js with OpenRouter to dispatch queries to DeepSeek R1 and GPT-4o models. Curated, high-confidence administrative guides are indexed in private Azure AI Search indices. Interactive frontend maps are rendered using React Three Fiber, while persistent state management is coordinated via Zustand. Automated checks verify steps before generating exportable checklists.
            </p>
          </div>
        </div>

        {/* Bottom CTA redirecting inside the page */}
        <div className="mt-16 pt-8 border-t border-[#111111]/8 flex justify-center">
          <a
            href="#connect"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#111111] hover:text-[#555555] transition-colors"
          >
            DISCUSS SYSTEM INTEGRATIONS <ArrowUpRight className="w-4 h-4 text-[#C7FF3D]" />
          </a>
        </div>
      </div>
    </section>
  );
}
