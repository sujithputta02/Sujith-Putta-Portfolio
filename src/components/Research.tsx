"use client";

import React from "react";
import { BookOpen, Calendar, User } from "lucide-react";
import { motion } from "framer-motion";

export default function Research() {
  return (
    <section className="py-24 bg-white border-b border-[#111111]/8 scroll-mt-20 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center"
        >
          <span className="font-mono text-xs text-[#555555] tracking-widest uppercase">
            06 // ACADEMIC RESEARCH & PAPERS
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-medium text-[#111111] mt-3">
            Academic Credibility
          </h2>
          <p className="text-[#555555] font-sans text-sm mt-3 max-w-xl mx-auto">
            Reviewing deterministic answers in air-gapped, zero-network environments.
          </p>
        </motion.div>

        {/* LaTeX Styled Document Block */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
          className="latex-block bg-[#FAF9F6] border border-[#111111]/8 p-8 md:p-12 rounded-3xl shadow-sm relative text-left"
        >
          
          {/* Header Metadata */}
          <div className="flex flex-wrap items-center gap-6 border-b border-[#111111]/8 pb-6 mb-8 text-xs font-mono text-[#555555]">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#111111]" />
              <span>STATUS: PEER-REVIEW // NMITCON 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#111111]" />
              <span>AEROSPACE ARCHITECTURES</span>
            </div>
          </div>

          {/* Paper Title */}
          <h3 className="text-xl md:text-3xl font-display font-bold text-[#111111] leading-tight mb-4">
            NEXORA: Sovereign Hybrid Retrieval-Augmented Generation for Air-Gapped Aerospace Mission Intelligence
          </h3>

          {/* Authors */}
          <div className="flex items-center gap-2 mb-8 font-sans text-xs text-[#111111] font-semibold">
            <User className="w-4 h-4 text-[#555555]" />
            <span>Sujith Putta, Dept. of Computer Science & Technology, DSU Bangalore</span>
          </div>

          {/* Abstract Box */}
          <div className="border-y border-[#111111]/8 py-6 my-6">
            <h4 className="text-[10px] font-mono text-[#111111] tracking-widest uppercase mb-3 text-center">
              ABSTRACT
            </h4>
            <p className="latex-abstract font-sans text-xs md:text-sm text-[#555555] leading-relaxed">
              This paper presents NEXORA, a sovereign offline Retrieval-Augmented Generation (RAG) framework optimized for air-gapped aerospace intelligence environments. Because public cloud APIs are blocked due to security regulations, NEXORA uses local embeddings and private models. To address the problem of Large Language Model (LLM) hallucinations, we join dense mathematical vector stores (FAISS) with structured knowledge network layers (Neo4j graph schemas). This hybrid pipeline ensures deterministic answers, validates user access clearance levels (RBAC), and handles complex relationship paths with sub-second retrieval times, outperforming traditional semantic similarity architectures.
            </p>
          </div>

          {/* Dual column academic styling section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans text-xs text-[#555555] leading-relaxed mt-8">
            <div className="space-y-3">
              <h5 className="font-bold text-[#111111] font-mono text-[10px] uppercase tracking-wider">
                1. INTRODUCTION
              </h5>
              <p>
                In safety-critical domains such as aerospace engineering, information queries must return factual, deterministic results. Traditional RAG systems query flat vector embeddings, which lack structural entity-relationship maps. This paper introduces a hybrid model where local dense lookups trigger Cypher traversal queries to reconstruct complex entities.
              </p>
            </div>
            <div className="space-y-3">
              <h5 className="font-bold text-[#111111] font-mono text-[10px] uppercase tracking-wider">
                2. ARCHITECTURE
              </h5>
              <p>
                Our system separates unstructured manuals from structural telemetry maps. FAISS handles semantic search queries to extract candidates, while a parallel path Traversal routine inspects connections in Neo4j. The contexts are merged in a validation container before LLaMA 3 executes responses.
              </p>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
