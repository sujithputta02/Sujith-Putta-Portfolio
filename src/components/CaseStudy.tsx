"use client";

import React, { useState } from "react";
import { Search, Cpu, LayoutGrid, ArrowUpRight, Shield, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CaseStudy() {
  const [activeCase, setActiveCase] = useState<"lifeflow" | "cyberconstituent">("lifeflow");

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
        
        {/* Toggle Switcher */}
        <div className="flex justify-center mb-12 relative z-20">
          <div className="inline-flex bg-[#111111]/5 border border-[#111111]/8 p-1 rounded-2xl relative">
            
            {/* Lifeflow button */}
            <button
              onClick={() => setActiveCase("lifeflow")}
              className={`relative z-10 px-5 py-2.5 rounded-xl font-mono text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 cursor-pointer ${
                activeCase === "lifeflow" ? "text-[#C7FF3D]" : "text-[#555555] hover:text-[#111111]"
              }`}
            >
              01 // Life Flow AI
              {activeCase === "lifeflow" && (
                <motion.div
                  layoutId="activeCaseBg"
                  className="absolute inset-0 bg-[#111111] rounded-xl -z-10 shadow-sm"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>

            {/* CyberConstituent button */}
            <button
              onClick={() => setActiveCase("cyberconstituent")}
              className={`relative z-10 px-5 py-2.5 rounded-xl font-mono text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 cursor-pointer ${
                activeCase === "cyberconstituent" ? "text-[#C7FF3D]" : "text-[#555555] hover:text-[#111111]"
              }`}
            >
              02 // CyberConstituent-SLM
              {activeCase === "cyberconstituent" && (
                <motion.div
                  layoutId="activeCaseBg"
                  className="absolute inset-0 bg-[#111111] rounded-xl -z-10 shadow-sm"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCase}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeCase === "lifeflow" ? (
              <div>
                {/* Header and metadata */}
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#111111]/8 pb-8 mb-16 text-left">
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
                  <div className="bg-white border border-[#111111]/8 p-8 rounded-3xl flex flex-col justify-between h-56 hover:border-[#111111]/15 transition-all text-left">
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
                  <div className="bg-white border border-[#111111]/8 p-8 rounded-3xl flex flex-col justify-between h-56 hover:border-[#111111]/15 transition-all text-left">
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
                  <div className="bg-white border border-[#111111]/8 p-8 rounded-3xl flex flex-col justify-between h-56 hover:border-[#111111]/15 transition-all text-left">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans text-sm leading-relaxed text-[#555555] text-left">
                  <div>
                    <h4 className="text-xs font-mono text-[#111111] uppercase tracking-widest mb-4">
                      // THE CHALLENGE
                    </h4>
                    <p className="text-[#111111] font-medium text-base mb-3">
                      Simplifying complex, confusing real-world bureaucratic procedures without getting lost in paper forms or broken links.
                    </p>
                    <p>
                      Navigating hospital admissions, visa applications, or paperwork is typically a nightmare of disjointed steps and opaque guidelines. Traditional setups offer static instruction sheets that fail to account for dynamic individual circumstances. We built LifeFlow to transform these messy administrative workflows into simple, validated, step-by-step interactive checklists powered by sovereign AI agents.
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
              </div>
            ) : (
              <div>
                {/* Header and metadata */}
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#111111]/8 pb-8 mb-16 text-left">
                  <div>
                    <span className="font-mono text-xs text-[#555555] uppercase tracking-wider">
                      03 // CASE RETROSPECTIVE
                    </span>
                    <h2 className="text-3xl md:text-5xl font-display font-medium text-[#111111] mt-3">
                      CyberConstituent-SLM
                    </h2>
                    <p className="text-[#555555] font-sans text-sm mt-2">
                      Constitutional AI-Aligned Cybersecurity Threat Classifier
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <span className="font-mono text-[10px] text-[#111111] bg-[#C7FF3D] border border-transparent px-3 py-1 rounded-full uppercase font-bold tracking-wider">
                      CONSTITUTIONAL AI ALIGNMENT
                    </span>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                  {/* Metric 1 */}
                  <div className="bg-white border border-[#111111]/8 p-8 rounded-3xl flex flex-col justify-between h-56 hover:border-[#111111]/15 transition-all text-left">
                    <div className="p-3 bg-[#C7FF3D]/20 rounded-2xl w-fit">
                      <Shield className="w-5 h-5 text-[#111111]" />
                    </div>
                    <div>
                      <span className="text-4xl md:text-5xl font-mono font-bold tracking-tight text-[#111111]">
                        89%
                      </span>
                      <p className="text-xs font-sans text-[#555555] mt-2 font-semibold uppercase tracking-wide">
                        Validation Accuracy
                      </p>
                      <p className="text-[11px] font-sans text-[#555555] mt-1 leading-snug">
                        High-precision sequence classification accuracy verified across 6 core cybersecurity threat labels.
                      </p>
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div className="bg-white border border-[#111111]/8 p-8 rounded-3xl flex flex-col justify-between h-56 hover:border-[#111111]/15 transition-all text-left">
                    <div className="p-3 bg-[#C7FF3D]/20 rounded-2xl w-fit">
                      <Cpu className="w-5 h-5 text-[#111111]" />
                    </div>
                    <div>
                      <span className="text-4xl md:text-5xl font-mono font-bold tracking-tight text-[#111111]">
                        67M
                      </span>
                      <p className="text-xs font-sans text-[#555555] mt-2 font-semibold uppercase tracking-wide">
                        Parameters Count
                      </p>
                      <p className="text-[11px] font-sans text-[#555555] mt-1 leading-snug">
                        Fine-tuned distilbert-base-uncased sequence classifier, ideal for low-latency edge deployments.
                      </p>
                    </div>
                  </div>

                  {/* Metric 3 */}
                  <div className="bg-white border border-[#111111]/8 p-8 rounded-3xl flex flex-col justify-between h-56 hover:border-[#111111]/15 transition-all text-left">
                    <div className="p-3 bg-[#C7FF3D]/20 rounded-2xl w-fit">
                      <Lock className="w-5 h-5 text-[#111111]" />
                    </div>
                    <div>
                      <span className="text-4xl md:text-5xl font-mono font-bold tracking-tight text-[#111111]">
                        Zero
                      </span>
                      <p className="text-xs font-sans text-[#555555] mt-2 font-semibold uppercase tracking-wide">
                        Exploit Leakage
                      </p>
                      <p className="text-[11px] font-sans text-[#555555] mt-1 leading-snug">
                        Aligned under Anthropic-inspired Constitutional guidelines to filter actionable exploit syntax and payload risks.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Narrative columns layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans text-sm leading-relaxed text-[#555555] text-left">
                  <div>
                    <h4 className="text-xs font-mono text-[#111111] uppercase tracking-widest mb-4">
                      // THE CHALLENGE
                    </h4>
                    <p className="text-[#111111] font-medium text-base mb-3">
                      Filtering out actionable exploit scripts and SQL injection queries from security logs without losing analytical categorization utility.
                    </p>
                    <p>
                      Security logs ingest vast volumes of unstructured alerts, which frequently contain actual exploit payloads (e.g. SQL command injections, cross-site scripts) or biased geopolitical attribution assumptions. Direct downstream processing of these raw alerts exposes monitoring databases to log injection vulnerabilities or misleads analysts. Our challenge was designing an SLM classifier that sanitizes threat descriptions while maintaining classification fidelity.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-mono text-[#111111] uppercase tracking-widest mb-4">
                      // THE ARCHITECTURE
                    </h4>
                    <p className="text-[#111111] font-medium text-base mb-3">
                      FP16 fine-tuned DistilBERT on Google Colab T4 GPU integrating custom data pre-processing and model cards.
                    </p>
                    <p>
                      We fine-tuned distilbert-base-uncased with Cosine learning rate scheduling and half-precision (FP16) variables. To guarantee safety, training datasets were aligned with a set of Constitutional AI rules. Custom Streamlit dashboards connect to the model endpoint, presenting classification confidence meters, logits distributions, and safety status logs. The model and config parameters are exported directly on the Hugging Face Hub.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

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
