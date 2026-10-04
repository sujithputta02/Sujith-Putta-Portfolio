"use client";

import React from "react";
import { BookOpen, Calendar, User, FileText, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { LiquidGlassCard } from "@/components/LiquidGlassCard";

export default function Research() {
  return (
    <section className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-6 scroll-mt-20 text-left select-none">
      <div className="editorial-frame p-6 sm:p-10 md:p-12 relative overflow-hidden">
        
        {/* Frame Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8 font-mono text-xs text-white/50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00DFD8] animate-pulse" />
            <span className="uppercase tracking-widest text-white/70">
              06 // ACADEMIC RESEARCH & PAPERS
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>Air-Gapped Sovereign AI // DSU CST</span>
            <div className="w-16 h-1.5 rounded-full spectrum-pill" />
          </div>
        </div>

        {/* Section Heading */}
        <div className="mb-10">
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-none">
            Academic Research
          </h2>
          <p className="font-sans text-sm sm:text-base text-white/60 mt-3 max-w-xl font-light">
            Formulating hybrid graph-vector retrieval models to guarantee zero-hallucination execution in air-gapped environments.
          </p>
        </div>

        {/* LaTeX Styled Document Block */}
        <LiquidGlassCard
          className="border border-white/15 p-6 sm:p-10 md:p-12 rounded-2xl relative text-left text-white shadow-xl"
          options={{ radius: 16, scale: -95, chroma: 5, border: 0.05, mapBlur: 10, blur: 0, fallbackBlur: 0 }}
        >
          
          {/* Header Metadata */}
          <div className="flex flex-wrap items-center gap-6 border-b border-white/10 pb-5 mb-6 text-xs font-mono text-white/50">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#FF5E00]" />
              <span>STATUS: RESEARCH PAPER (2026)</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#00E5FF]" />
              <span>AEROSPACE ARCHITECTURES</span>
            </div>
          </div>

          {/* Paper Title */}
          <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white leading-tight mb-3">
            NEXORA: Sovereign Hybrid Retrieval-Augmented Generation for Air-Gapped Aerospace Mission Intelligence
          </h3>

          {/* Authors */}
          <div className="flex items-center gap-2 mb-6 font-sans text-xs text-white/70">
            <User className="w-4 h-4 text-[#FF5E00]" />
            <span>Sujith Putta, Dept. of Computer Science & Technology, DSU Bangalore</span>
          </div>

          {/* Abstract Box */}
          <div className="border-y border-white/10 py-6 my-6 bg-white/[0.02] px-4 rounded-xl">
            <h4 className="text-[10px] font-mono text-[#FF5E00] tracking-widest uppercase mb-2 font-bold">
              // ABSTRACT
            </h4>
            <p className="font-sans text-xs sm:text-sm text-white/75 leading-relaxed font-light">
              This paper presents NEXORA, a sovereign offline Retrieval-Augmented Generation (RAG) framework optimized for air-gapped aerospace intelligence environments. Because public cloud APIs are blocked due to security regulations, NEXORA uses local embeddings and private models. To address the problem of Large Language Model (LLM) hallucinations, we join dense mathematical vector stores (FAISS) with structured knowledge network layers (Neo4j graph schemas). This hybrid pipeline ensures deterministic answers, validates user access clearance levels (RBAC), and handles complex relationship paths with sub-second retrieval times, outperforming traditional semantic similarity architectures.
            </p>
          </div>

          {/* Dual column academic styling section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans text-xs text-white/60 leading-relaxed mt-6">
            <div className="space-y-2">
              <h5 className="font-bold text-white font-mono text-[10px] uppercase tracking-wider">
                1. INTRODUCTION
              </h5>
              <p className="font-light">
                In safety-critical domains such as aerospace engineering, information queries must return factual, deterministic results. Traditional RAG systems query flat vector embeddings, which lack structural entity-relationship maps. This paper introduces a hybrid model where local dense lookups trigger Cypher traversal queries to reconstruct complex entities.
              </p>
            </div>
            <div className="space-y-2">
              <h5 className="font-bold text-white font-mono text-[10px] uppercase tracking-wider">
                2. ARCHITECTURE
              </h5>
              <p className="font-light">
                Our system separates unstructured manuals from structural telemetry maps. FAISS handles semantic search queries to extract candidates, while a parallel path Traversal routine inspects connections in Neo4j. The contexts are merged in a validation container before LLaMA 3 executes responses.
              </p>
            </div>
          </div>

          {/* Action Row */}
          <div className="border-t border-white/10 mt-8 pt-4 flex items-center justify-between font-mono text-xs text-white/50">
            <span className="text-[10px] uppercase">Ablation Tests // 99.4% Factual Consistency</span>
            <a
              href="https://github.com/sujithputta02/Nexora"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-white hover:text-[#FF5E00] transition-colors font-bold"
            >
              <span>Inspect Source</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </LiquidGlassCard>

        {/* Section Corner Index */}
        <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between text-white/40 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="text-xl font-display font-black text-white">44</span>
            <span className="uppercase tracking-widest text-[10px]">Academic Research Publication</span>
          </div>
          <span className="text-[10px] uppercase">NEXORA Architecture</span>
        </div>

      </div>
    </section>
  );
}
