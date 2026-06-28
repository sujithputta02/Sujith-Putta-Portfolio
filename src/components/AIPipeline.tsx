"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NodeData {
  id: string;
  label: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  code: string;
  category: "input" | "process" | "db" | "model" | "output";
}

export default function AIPipeline() {
  const nodes: NodeData[] = [
    {
      id: "draft",
      label: "LLM Draft Response",
      title: "LLM Draft Response Generation",
      description: "The base aerospace LLM generates an unverified draft response containing potential factual hallucinations.",
      icon: (
        <svg viewBox="0 0 16 16" className="w-5 h-5" fill="none">
          <path d="M 4 4 L 8 7 L 4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          <line x1="9" y1="10" x2="12" y2="10" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      category: "input",
      code: `# Base LLM response generation
draft_response = base_model.generate(
    prompt="Describe the cooling valve component of the F16 wing.",
    max_tokens=256
)

# Output contains unverified structural claims
print(f"Draft: {draft_response.text}")`
    },
    {
      id: "extraction",
      label: "1. Entity Extraction",
      title: "Subject-Aware Mission Entity Extraction",
      description: "Extracts key system components, missions, and relationships from the draft text for fact validation.",
      icon: (
        <svg viewBox="0 0 16 16" className="w-5 h-5" fill="currentColor">
          <rect x="5" y="5" width="6" height="6" />
          <line x1="3" y1="6" x2="5" y2="6" stroke="currentColor" strokeWidth="1" />
          <line x1="3" y1="8" x2="5" y2="8" stroke="currentColor" strokeWidth="1" />
          <line x1="3" y1="10" x2="5" y2="10" stroke="currentColor" strokeWidth="1" />
          <line x1="11" y1="6" x2="13" y2="6" stroke="currentColor" strokeWidth="1" />
          <line x1="11" y1="8" x2="13" y2="8" stroke="currentColor" strokeWidth="1" />
          <line x1="11" y1="10" x2="13" y2="10" stroke="currentColor" strokeWidth="1" />
          <line x1="6" y1="3" x2="6" y2="5" stroke="currentColor" strokeWidth="1" />
          <line x1="8" y1="3" x2="8" y2="5" stroke="currentColor" strokeWidth="1" />
          <line x1="10" y1="3" x2="10" y2="5" stroke="currentColor" strokeWidth="1" />
          <line x1="6" y1="11" x2="6" y2="13" stroke="currentColor" strokeWidth="1" />
          <line x1="8" y1="11" x2="8" y2="13" stroke="currentColor" strokeWidth="1" />
          <line x1="10" y1="11" x2="10" y2="13" stroke="currentColor" strokeWidth="1" />
        </svg>
      ),
      category: "process",
      code: `# Subject-aware entity extraction
extracted_entities = entity_extractor.extract(
    draft_response.text,
    entity_types=["Mission", "Component", "System"]
)

# Result: ['F16', 'cooling valve', 'wing']
print(f"Extracted: {extracted_entities}")`
    },
    {
      id: "query",
      label: "2. Neo4j Two-Hop Cypher Query",
      title: "Neo4j Graph Database Multi-Hop Retrieval",
      description: "Executes a Cypher query with fuzzy regex match to extract ground-truth relationship paths up to two hops around components.",
      icon: (
        <svg viewBox="0 0 16 16" className="w-5 h-5" fill="currentColor">
          <rect x="3" y="2" width="10" height="3" />
          <rect x="3" y="6" width="10" height="3" />
          <rect x="3" y="10" width="10" height="3" />
          <circle cx="5" cy="3.5" r="0.7" fill="white" />
          <circle cx="5" cy="7.5" r="0.7" fill="white" />
          <circle cx="5" cy="11.5" r="0.7" fill="white" />
        </svg>
      ),
      category: "db",
      code: `// Neo4j two-hop Cypher query
MATCH (n:Mission)-[r]-(m:Component)
WHERE n.name =~ '(?i).*F16.*' 
  AND m.name =~ '(?i).*cooling valve.*'
RETURN n, r, m LIMIT 5;

// Ground-truth component mapping retrieved`
    },
    {
      id: "audit",
      label: "3. Graph-Grounded NLI Audit",
      title: "Graph-Grounded Natural Language Inference",
      description: "Audits atomic claims from the draft response against graph facts to classify them as entailment, neutral, or contradiction.",
      icon: (
        <svg viewBox="0 0 16 16" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
          <path d="M 2 8 H 5 L 7 4 L 9 12 L 11 8 H 14" />
        </svg>
      ),
      category: "process",
      code: `# Graph-Grounded NLI validation
nli_results = []
for claim in draft_response.split_claims():
    audit_result = nli_model.predict(
        premise=graph_ground_truth,
        hypothesis=claim
    )
    nli_results.append(audit_result)
    # Classifications: entailment | contradiction | neutral`
    },
    {
      id: "decision",
      label: "4. Contradiction & Alert Branching",
      title: "Contradiction & Alert Verification",
      description: "Branching verification logic: if contradiction is found, routes to [CAUTION] citation block, referencing exact graph records.",
      icon: (
        <svg viewBox="0 0 16 16" className="w-5 h-5" fill="currentColor">
          <path d="M 3 2 H 13 V 7 C 13 11 8 14 8 14 C 8 14 3 11 3 7 Z" />
          <path d="M 4 3 H 12 V 7 C 12 10 8 13 8 13 C 8 13 4 10 4 7 Z" fill="white" />
          <path d="M 8 3 V 13" stroke="currentColor" strokeWidth="1" />
        </svg>
      ),
      category: "output",
      code: `# Check for atomic claim contradictions
has_contradiction = any(r == "contradict" for r in nli_results)
if has_contradiction:
    # Route to caution filter
    citation = locate_graph_record(contradicted_claim)
    output = f"[CAUTION] Refuted claim. Cite record: {citation}"
else:
    output = draft_response`
    },
    {
      id: "verified",
      label: "Verified Response (-83.3% Hallucination)",
      title: "Hallucination-Shielded Output",
      description: "Outputs corrected, safe aerospace metrics with a verified -83.3% reduction in model hallucination rates.",
      icon: (
        <svg viewBox="0 0 16 16" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
          <circle cx="5" cy="8" r="3" />
          <line x1="8" y1="8" x2="14" y2="8" />
          <line x1="11" y1="8" x2="11" y2="10" />
          <line x1="13" y1="8" x2="13" y2="10" />
        </svg>
      ),
      category: "output",
      code: `# Return audited payload
return {
    "status": "success",
    "hallucination_delta": "-83.3%",
    "payload": verified_output,
    "execution_time_overhead": "+130ms"
}`
    }
  ];

  const [activeNodeId, setActiveNodeId] = useState<string>("draft");
  const activeNode = nodes.find(n => n.id === activeNodeId) || nodes[0];

  return (
    <section id="visualizer" className="py-24 bg-[#FAF9F6] border-b-2 border-black scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section header */}
        <div className="mb-16 text-center md:text-left">
          <span className="font-pixel text-xs text-[#555555] tracking-widest uppercase font-bold">
            04 // INTERACTIVE TELEMETRY
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-medium text-[#111111] mt-3">
            NEXORA Graph-NLI Verification Visualizer
          </h2>
          <p className="text-[#555555] font-sans text-sm mt-3 max-w-xl">
            Click on any pipeline node to inspect real-time Graph-NLI verification stages, Cypher database records, and verification algorithms.
          </p>
        </div>

        {/* Master layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Node Map Panel (col-span-7) */}
          <div className="lg:col-span-7 bg-white border-2 border-black rounded-none p-6 md:p-8 flex flex-col justify-between relative min-h-[500px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            {/* Soft grid background */}
            <div 
              className="absolute inset-0 opacity-[0.015] pointer-events-none"
              style={{
                backgroundImage: "linear-gradient(rgba(17,17,17,1) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,1) 1px, transparent 1px)",
                backgroundSize: "20px 20px"
              }}
            />
            <div className="relative z-10 w-full flex flex-col items-start h-full gap-4 py-2">
              
              {/* Node 0: LLM Draft Response */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full">
                <button
                  onClick={() => setActiveNodeId("draft")}
                  className={`flex items-center gap-3 px-4 py-3 rounded-none border-2 border-black transition-all text-xs font-pixel select-none text-left w-full sm:min-w-[260px] sm:w-auto cursor-pointer font-bold ${
                    activeNodeId === "draft"
                      ? "bg-[#111111] text-[#C7FF3D] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]"
                      : "bg-[#F7F7F5] text-[#555555] hover:bg-[#C7FF3D]/10 hover:text-black"
                  }`}
                >
                  {nodes[0].icon}
                  <span>LLM Draft Response</span>
                </button>
              </div>

              {/* Connecting arrow */}
              <div className="h-4 w-[2px] bg-black ml-8" />

              {/* Node 1: Entity Extraction */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full">
                <button
                  onClick={() => setActiveNodeId("extraction")}
                  className={`flex items-center gap-3 px-4 py-3 rounded-none border-2 border-black transition-all text-xs font-pixel select-none text-left w-full sm:min-w-[260px] sm:w-auto cursor-pointer font-bold ${
                    activeNodeId === "extraction"
                      ? "bg-[#111111] text-[#C7FF3D] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]"
                      : "bg-[#F7F7F5] text-[#555555] hover:bg-[#C7FF3D]/10 hover:text-black"
                  }`}
                >
                  {nodes[1].icon}
                  <span>Step 1 — Entity Extraction</span>
                </button>
              </div>

              {/* Connecting arrow */}
              <div className="h-4 w-[2px] bg-black ml-8" />

              {/* Node 2: Neo4j Cypher query */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full">
                <button
                  onClick={() => setActiveNodeId("query")}
                  className={`flex items-center gap-3 px-4 py-3 rounded-none border-2 border-black transition-all text-xs font-pixel select-none text-left w-full sm:min-w-[260px] sm:w-auto cursor-pointer font-bold ${
                    activeNodeId === "query"
                      ? "bg-[#111111] text-[#C7FF3D] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]"
                      : "bg-[#F7F7F5] text-[#555555] hover:bg-[#C7FF3D]/10 hover:text-black"
                  }`}
                >
                  {nodes[2].icon}
                  <span>Step 2 — Neo4j two-hop query</span>
                </button>
              </div>

              {/* Connecting arrow */}
              <div className="h-4 w-[2px] bg-black ml-8" />

              {/* Node 3: NLI Audit */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full">
                <button
                  onClick={() => setActiveNodeId("audit")}
                  className={`flex items-center gap-3 px-4 py-3 rounded-none border-2 border-black transition-all text-xs font-pixel select-none text-left w-full sm:min-w-[260px] sm:w-auto cursor-pointer font-bold ${
                    activeNodeId === "audit"
                      ? "bg-[#111111] text-[#C7FF3D] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]"
                      : "bg-[#F7F7F5] text-[#555555] hover:bg-[#C7FF3D]/10 hover:text-black"
                  }`}
                >
                  {nodes[3].icon}
                  <span>Step 3 — Graph-Grounded NLI Audit</span>
                </button>
              </div>

              {/* Connecting arrow */}
              <div className="h-4 w-[2px] bg-black ml-8" />

              {/* Node 4: Decision check */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full">
                <button
                  onClick={() => setActiveNodeId("decision")}
                  className={`flex items-center gap-3 px-4 py-3 rounded-none border-2 border-black transition-all text-xs font-pixel select-none text-left w-full sm:min-w-[260px] sm:w-auto cursor-pointer font-bold ${
                    activeNodeId === "decision"
                      ? "bg-[#111111] text-[#C7FF3D] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]"
                      : "bg-[#F7F7F5] text-[#555555] hover:bg-[#C7FF3D]/10 hover:text-black"
                  }`}
                >
                  {nodes[4].icon}
                  <div className="flex flex-col">
                    <span>Contradict Check?</span>
                    <span className="text-[9px] opacity-75">(yes → CAUTION alert)</span>
                  </div>
                </button>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-red-500/10 border-2 border-red-500/50 text-red-500 text-[9px] font-pixel font-bold rounded-none w-fit shadow-[1.5px_1.5px_0px_0px_rgba(239,68,68,0.3)]">
                  <span>+130ms security overhead</span>
                </div>
              </div>

              {/* Connecting arrow */}
              <div className="h-4 w-[2px] bg-black ml-8" />

              {/* Node 5: Output */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full">
                <button
                  onClick={() => setActiveNodeId("verified")}
                  className={`flex items-center gap-3 px-4 py-3 rounded-none border-2 border-black transition-all text-xs font-pixel select-none text-left w-full sm:min-w-[260px] sm:w-auto cursor-pointer font-bold ${
                    activeNodeId === "verified"
                      ? "bg-[#111111] text-[#C7FF3D] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]"
                      : "bg-[#F7F7F5] text-[#555555] hover:bg-[#C7FF3D]/10 hover:text-black"
                  }`}
                >
                  {nodes[5].icon}
                  <span>Verified Response</span>
                </button>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border-2 border-emerald-500/50 text-emerald-500 text-[9px] font-pixel font-bold rounded-none w-fit shadow-[1.5px_1.5px_0px_0px_rgba(16,185,129,0.3)]">
                  <span>-83.3% hallucination</span>
                </div>
              </div>

            </div>
          </div>

          {/* Interactive Code Sidebar Panel (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#111111] text-white rounded-none p-6 md:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
                className="flex flex-col justify-between h-full flex-1"
              >
                {/* Header info */}
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-white/5 border border-white/10 rounded-none text-[#C7FF3D] shadow-[1px_1px_0px_0px_rgba(255,255,255,0.1)]">
                        {activeNode.icon}
                      </div>
                      <span className="font-pixel text-[10px] text-white/55 uppercase tracking-widest font-bold">
                        Code Telemetry
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-none animate-pulse" />
                      <span className="font-pixel text-[9px] text-green-500 font-bold">READY</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-pixel font-bold text-white leading-tight">
                    {activeNode.title}
                  </h3>
                  <p className="text-xs font-sans text-white/70 mt-2 leading-relaxed">
                    {activeNode.description}
                  </p>
                </div>

                {/* Code viewport */}
                <div className="my-6 bg-black/60 rounded-none p-4 border-2 border-white/15 font-mono text-[10.5px] overflow-x-auto text-left shadow-inner flex-1 flex flex-col justify-center min-h-[220px]">
                  <pre className="text-white/95">
                    <code>{activeNode.code}</code>
                  </pre>
                </div>

                {/* Sidebar footer */}
                <div className="border-t border-white/10 pt-4 flex items-center justify-between font-pixel text-[10px] text-white/45 font-bold">
                  <span>NODE ID: {activeNode.id.toUpperCase()}</span>
                  <span className="text-[#C7FF3D]">NEXORA ENGINE</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
