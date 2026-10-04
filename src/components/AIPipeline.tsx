"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Database,
  Terminal,
  Layers,
  Network,
  GitBranch,
  ShieldCheck,
} from "lucide-react";
import LiquidGlassButton from "@/components/LiquidGlassButton";

interface PipelineStep {
  id: string;
  step: string;
  name: string;
  tag: string;
  icon: React.ReactNode;
  accent: string;
  summary: string;
  detail: {
    heading: string;
    description: string;
    highlightLabel: string;
    highlightContent: string;
    isWarning?: boolean;
    isSuccess?: boolean;
  };
  codeSnippet: string;
  metric: { label: string; value: string };
}

const STEPS: PipelineStep[] = [
  {
    id: "draft",
    step: "01",
    name: "Draft Generation",
    tag: "AEROSPACE BASE LLM",
    icon: <Terminal className="w-5 h-5" />,
    accent: "#00E5FF",
    summary: "Base model generates an initial unverified draft from the prompt.",
    detail: {
      heading: "Unverified Aerospace Prompt & Output",
      description: "Prompt: \"Describe the cooling valve component of the F-16 wing.\"",
      highlightLabel: "Candidate Response (Factual Anomaly Detected)",
      highlightContent: "The F-16 wing utilizes an unpressurized sodium-potassium cooling valve directly connected to the external elevon actuator for rapid thermal dissipation.",
      isWarning: true,
    },
    codeSnippet: `draft = base_llm.generate("Describe cooling valve of F-16 wing")
# Output contains unverified chemical claim: sodium-potassium`,
    metric: { label: "Hallucination Risk", value: "High" },
  },
  {
    id: "extraction",
    step: "02",
    name: "Entity Extraction",
    tag: "SUBJECT-AWARE NER",
    icon: <Layers className="w-5 h-5" />,
    accent: "#38BDF8",
    summary: "Extracts subject entities and structural claims to prepare for graph retrieval.",
    detail: {
      heading: "Decomposed Mission Entities",
      description: "Entity parser isolates key subjects for ground-truth verification.",
      highlightLabel: "Identified Entity Targets",
      highlightContent: "• Aircraft: F-16 Fighting Falcon\n• Subsystem: Wing Elevon Assembly\n• Target Claim: Cooling valve uses sodium-potassium",
    },
    codeSnippet: `entities = entity_extractor.parse(draft.text)
claims = claim_decomposer.isolate(draft.text)
# Resolved: ['F-16', 'Cooling Valve', 'Wing Assembly']`,
    metric: { label: "Entities Isolated", value: "3 Targets" },
  },
  {
    id: "query",
    step: "03",
    name: "Neo4j Graph Query",
    tag: "2-HOP FACT RETRIEVAL",
    icon: <Database className="w-5 h-5" />,
    accent: "#A855F7",
    summary: "Retrieves verified ground truth relationships from the aerospace knowledge graph.",
    detail: {
      heading: "Neo4j Knowledge Graph Traversal",
      description: "Multi-hop query locates canonical specs for F-16 cooling systems.",
      highlightLabel: "Retrieved Ground Truth Fact",
      highlightContent: "F-16 [HOUSES] -> Environmental Control System [REGULATES] -> Closed-Loop Bleed-Air Heat Exchanger (AF-SPEC-902). Sodium-potassium prohibited.",
    },
    codeSnippet: `MATCH (a:Aircraft {name: 'F-16'})-[:HOUSES]->(s:System)-[:REGULATES]->(c:Component)
WHERE c.type =~ '(?i).*cooling.*'
RETURN a, s, c LIMIT 5;`,
    metric: { label: "Canonical Spec", value: "AF-SPEC-902" },
  },
  {
    id: "nli",
    step: "04",
    name: "NLI Fact Audit",
    tag: "NATURAL LANGUAGE INFERENCE",
    icon: <Network className="w-5 h-5" />,
    accent: "#F59E0B",
    summary: "Evaluates draft claims against ground-truth facts for entailment or contradiction.",
    detail: {
      heading: "Premise vs. Hypothesis Scoring",
      description: "Audits candidate assertion against canonical engineering ground truth.",
      highlightLabel: "Inference Assessment",
      highlightContent: "Premise: F-16 ECS uses closed-loop bleed-air heat exchangers.\nHypothesis: F-16 wing uses sodium-potassium valves.\nResult: 98.4% Contradiction (Trigger Alert)",
      isWarning: true,
    },
    codeSnippet: `scores = nli_model.predict(premise=graph_truth, hypothesis=draft_claim)
# Entailment: 1.2% | Neutral: 0.4% | Contradiction: 98.4%`,
    metric: { label: "Contradiction Score", value: "98.4%" },
  },
  {
    id: "gate",
    step: "05",
    name: "Contradiction Gate",
    tag: "BRANCHING LOGIC",
    icon: <GitBranch className="w-5 h-5" />,
    accent: "#EF4444",
    summary: "Halts delivery upon contradiction and routes payload to ground-truth substitution.",
    detail: {
      heading: "Active Mitigation Branch",
      description: "Contradiction threshold exceeded (>50%), routing to verified fact substitution.",
      highlightLabel: "Mitigation Action",
      highlightContent: "Stripping hallucinated sodium-potassium claim → Substituting canonical bleed-air heat exchanger with AF-SPEC-902 citation block.",
    },
    codeSnippet: `if nli_scores["contradiction"] > 0.50:
    payload = substitute_with_graph_record(draft, neo4j_fact)
    # Execution overhead: +130ms`,
    metric: { label: "Added Overhead", value: "+130ms" },
  },
  {
    id: "verified",
    step: "06",
    name: "Verified Output",
    tag: "FACT-GROUNDED PAYLOAD",
    icon: <ShieldCheck className="w-5 h-5" />,
    accent: "#10B981",
    summary: "Outputs verified, citation-anchored response with -83.3% hallucination reduction.",
    detail: {
      heading: "Shielded Production Payload",
      description: "Audited response dispatched with cryptographic ground-truth citation.",
      highlightLabel: "Final Dispatched Response",
      highlightContent: "\"The F-16 wing environmental cooling system utilizes a closed-loop bleed-air heat exchanger [Ref: AF-SPEC-902], mounted adjacent to the wing-root assembly for aerodynamic cooling.\"",
      isSuccess: true,
    },
    codeSnippet: `return {
    "status": "VERIFIED_SAFE",
    "hallucination_delta": "-83.3%",
    "citation": "Neo4j://Aircraft/F-16/ECS-Node-401"
}`,
    metric: { label: "Hallucination Delta", value: "-83.3%" },
  },
];

export default function AIPipeline() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const active = STEPS[currentIdx];

  const goNext = () => setCurrentIdx((i) => (i + 1) % STEPS.length);
  const goPrev = () => setCurrentIdx((i) => (i - 1 + STEPS.length) % STEPS.length);

  return (
    <section id="visualizer" className="w-full px-4 sm:px-6 md:px-10 py-12 scroll-mt-20 text-left select-none">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Section Header with generous space */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs text-[#00E5FF] tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
            <span>07 // NEXORA PIPELINE VERIFICATION</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase leading-tight">
            Graph-NLI Verification Flow
          </h2>

          <p className="font-sans text-sm sm:text-base text-white/60 max-w-xl font-light leading-relaxed">
            How unverified LLM aerospace claims are audited against a Neo4j knowledge graph to eliminate hallucinations in real time.
          </p>
        </div>

        {/* ── Airy, Spacious Step Bar ──────────────────────────── */}
        <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-6 overflow-x-auto">
          {STEPS.map((s, idx) => {
            const isSelected = idx === currentIdx;
            const isCompleted = idx < currentIdx;

            return (
              <LiquidGlassButton
                key={s.id}
                onClick={() => setCurrentIdx(idx)}
                variant={isSelected ? "white" : "crystal"}
                size="sm"
                className={`!py-1.5 !px-3 !rounded-full shrink-0 flex items-center gap-2.5 ${
                  isSelected
                    ? "shadow-md text-black"
                    : isCompleted
                    ? "text-white/80"
                    : "text-white/40"
                }`}
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center font-mono text-[9px] font-bold"
                  style={{
                    backgroundColor: isSelected ? s.accent : isCompleted ? "#10B981" : "rgba(255,255,255,0.1)",
                    color: isSelected || isCompleted ? "#000000" : "rgba(255,255,255,0.6)",
                  }}
                >
                  {isCompleted ? "✓" : s.step}
                </div>

                <span className="font-sans text-xs font-semibold tracking-wide">
                  {s.name}
                </span>
              </LiquidGlassButton>
            );
          })}
        </div>

        {/* ── Main Open Showcase Canvas (Free, Breathable, Uncongested) ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="rounded-3xl border border-white/10 bg-[#0C0C0F] p-8 sm:p-10 md:p-12 space-y-8 shadow-2xl"
          >
            {/* Stage Title and Summary */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="space-y-1">
                <span
                  className="font-mono text-xs font-bold uppercase tracking-widest"
                  style={{ color: active.accent }}
                >
                  STEP {active.step} // {active.tag}
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                  {active.name}
                </h3>
              </div>

              {/* Metric Badge */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="font-mono text-[10px] text-white/40 uppercase block">
                    {active.metric.label}
                  </span>
                  <span
                    className="font-mono text-base font-bold"
                    style={{ color: active.accent }}
                  >
                    {active.metric.value}
                  </span>
                </div>
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center border"
                  style={{
                    backgroundColor: `${active.accent}15`,
                    borderColor: `${active.accent}35`,
                    color: active.accent,
                  }}
                >
                  {active.icon}
                </div>
              </div>
            </div>

            {/* Stage Description */}
            <p className="font-sans text-sm sm:text-base text-white/70 font-light leading-relaxed max-w-2xl">
              {active.summary}
            </p>

            {/* Visual Highlight Block */}
            <div className={`p-6 sm:p-7 rounded-2xl border ${
              active.detail.isWarning
                ? "bg-amber-500/[0.04] border-amber-500/25 text-amber-200"
                : active.detail.isSuccess
                ? "bg-emerald-500/[0.04] border-emerald-500/25 text-emerald-200"
                : "bg-white/[0.02] border-white/10 text-white"
            }`}>
              <div className="flex items-center gap-2 mb-2 font-mono text-xs text-white/50 uppercase tracking-wider">
                {active.detail.isWarning ? (
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                ) : active.detail.isSuccess ? (
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                )}
                <span>{active.detail.highlightLabel}</span>
              </div>

              <div className="font-sans text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal text-white/90">
                {active.detail.highlightContent}
              </div>
            </div>

            {/* Minimal, Clean Code Logic */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                // Pipeline Logic
              </span>
              <div className="p-4 sm:p-5 rounded-2xl bg-[#060608] border border-white/5 font-mono text-xs text-cyan-300/80 overflow-x-auto">
                <pre>
                  <code>{active.codeSnippet}</code>
                </pre>
              </div>
            </div>

            {/* Stepper Navigation Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <LiquidGlassButton
                onClick={goPrev}
                size="sm"
                variant="crystal"
                className="gap-2 px-4 py-2 font-mono text-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous Step</span>
              </LiquidGlassButton>

              <span className="font-mono text-xs text-white/30">
                {active.step} / 06
              </span>

              <LiquidGlassButton
                onClick={goNext}
                size="sm"
                variant="white"
                className="gap-2 px-5 py-2 font-sans text-xs font-semibold"
              >
                <span>Next Step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </LiquidGlassButton>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Airy 3-Point Metric Strip at the bottom ───────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-left">
          <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.01]">
            <span className="font-display font-black text-2xl text-emerald-400 block">
              -83.3%
            </span>
            <span className="font-mono text-xs text-white/60 uppercase tracking-wider block mt-1">
              Hallucination Reduction
            </span>
            <span className="font-sans text-xs text-white/40 mt-1 block">
              Benchmarked on aerospace mission queries
            </span>
          </div>

          <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.01]">
            <span className="font-display font-black text-2xl text-amber-400 block">
              +130ms
            </span>
            <span className="font-mono text-xs text-white/60 uppercase tracking-wider block mt-1">
              Verification Overhead
            </span>
            <span className="font-sans text-xs text-white/40 mt-1 block">
              Includes Neo4j 2-hop graph traversal
            </span>
          </div>

          <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.01]">
            <span className="font-display font-black text-2xl text-[#00E5FF] block">
              100%
            </span>
            <span className="font-mono text-xs text-white/60 uppercase tracking-wider block mt-1">
              Fact Grounding
            </span>
            <span className="font-sans text-xs text-white/40 mt-1 block">
              Direct citations to canonical AF-SPEC records
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
