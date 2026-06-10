"use client";

import React, { useState } from "react";
import { Terminal, Database, Server, Key, Cpu, Shield, Activity, Code } from "lucide-react";

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
      icon: <Terminal className="w-5 h-5" />,
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
      icon: <Cpu className="w-5 h-5" />,
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
      icon: <Database className="w-5 h-5" />,
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
      icon: <Activity className="w-5 h-5" />,
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
      icon: <Shield className="w-5 h-5" />,
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
      icon: <Key className="w-5 h-5" />,
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
    <section id="visualizer" className="py-24 bg-[#FAF9F6] border-b border-[#111111]/8 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section header */}
        <div className="mb-16 text-center md:text-left">
          <span className="font-mono text-xs text-[#555555] tracking-widest uppercase">
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
          <div className="lg:col-span-7 bg-white border border-[#111111]/8 rounded-3xl p-6 md:p-8 flex flex-col justify-between relative min-h-[500px]">
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
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all text-xs font-mono select-none text-left w-full sm:min-w-[260px] sm:w-auto cursor-pointer ${
                    activeNodeId === "draft"
                      ? "bg-[#111111] text-[#C7FF3D] border-transparent shadow-md scale-[1.02] sm:scale-105"
                      : "bg-[#F7F7F5] border-[#111111]/8 text-[#555555] hover:border-[#111111]/20"
                  }`}
                >
                  <Terminal className="w-4 h-4" />
                  <span>LLM Draft Response</span>
                </button>
              </div>

              {/* Connecting arrow */}
              <div className="h-4 w-[2px] bg-[#111111]/15 ml-8" />

              {/* Node 1: Entity Extraction */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full">
                <button
                  onClick={() => setActiveNodeId("extraction")}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all text-xs font-mono select-none text-left w-full sm:min-w-[260px] sm:w-auto cursor-pointer ${
                    activeNodeId === "extraction"
                      ? "bg-[#111111] text-[#C7FF3D] border-transparent shadow-md scale-[1.02] sm:scale-105"
                      : "bg-[#F7F7F5] border-[#111111]/8 text-[#555555] hover:border-[#111111]/20"
                  }`}
                >
                  <Cpu className="w-4 h-4" />
                  <span>Step 1 — Entity Extraction</span>
                </button>
              </div>

              {/* Connecting arrow */}
              <div className="h-4 w-[2px] bg-[#111111]/15 ml-8" />

              {/* Node 2: Neo4j Cypher query */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full">
                <button
                  onClick={() => setActiveNodeId("query")}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all text-xs font-mono select-none text-left w-full sm:min-w-[260px] sm:w-auto cursor-pointer ${
                    activeNodeId === "query"
                      ? "bg-[#111111] text-[#C7FF3D] border-transparent shadow-md scale-[1.02] sm:scale-105"
                      : "bg-[#F7F7F5] border-[#111111]/8 text-[#555555] hover:border-[#111111]/20"
                  }`}
                >
                  <Database className="w-4 h-4" />
                  <span>Step 2 — Neo4j two-hop query</span>
                </button>
              </div>

              {/* Connecting arrow */}
              <div className="h-4 w-[2px] bg-[#111111]/15 ml-8" />

              {/* Node 3: NLI Audit */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full">
                <button
                  onClick={() => setActiveNodeId("audit")}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all text-xs font-mono select-none text-left w-full sm:min-w-[260px] sm:w-auto cursor-pointer ${
                    activeNodeId === "audit"
                      ? "bg-[#111111] text-[#C7FF3D] border-transparent shadow-md scale-[1.02] sm:scale-105"
                      : "bg-[#F7F7F5] border-[#111111]/8 text-[#555555] hover:border-[#111111]/20"
                  }`}
                >
                  <Activity className="w-4 h-4" />
                  <span>Step 3 — Graph-Grounded NLI Audit</span>
                </button>
              </div>

              {/* Connecting arrow */}
              <div className="h-4 w-[2px] bg-[#111111]/15 ml-8" />

              {/* Node 4: Decision check */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full">
                <button
                  onClick={() => setActiveNodeId("decision")}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all text-xs font-mono select-none text-left w-full sm:min-w-[260px] sm:w-auto cursor-pointer ${
                    activeNodeId === "decision"
                      ? "bg-[#111111] text-[#C7FF3D] border-transparent shadow-md scale-[1.02] sm:scale-105"
                      : "bg-[#F7F7F5] border-[#111111]/8 text-[#555555] hover:border-[#111111]/20"
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  <div className="flex flex-col">
                    <span>Contradict Check?</span>
                    <span className="text-[9px] opacity-75">(yes → CAUTION alert)</span>
                  </div>
                </button>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-500 text-[9px] font-mono rounded-lg w-fit">
                  <span>+130ms security overhead</span>
                </div>
              </div>

              {/* Connecting arrow */}
              <div className="h-4 w-[2px] bg-[#111111]/15 ml-8" />

              {/* Node 5: Output */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full">
                <button
                  onClick={() => setActiveNodeId("verified")}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all text-xs font-mono select-none text-left w-full sm:min-w-[260px] sm:w-auto cursor-pointer ${
                    activeNodeId === "verified"
                      ? "bg-[#111111] text-[#C7FF3D] border-transparent shadow-md scale-[1.02] sm:scale-105"
                      : "bg-[#F7F7F5] border-[#111111]/8 text-[#555555] hover:border-[#111111]/20"
                  }`}
                >
                  <Key className="w-4 h-4" />
                  <span>Verified Response</span>
                </button>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[9px] font-mono rounded-lg w-fit">
                  <span>-83.3% hallucination</span>
                </div>
              </div>

            </div>
          </div>

          {/* Interactive Code Sidebar Panel (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#111111] text-white rounded-3xl p-6 md:p-8 shadow-xl border border-white/5 overflow-hidden">
            
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-white/5 rounded-lg text-[#C7FF3D]">
                    {activeNode.icon}
                  </div>
                  <span className="font-mono text-[10px] text-white/55 uppercase tracking-widest">
                    Code Telemetry
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-mono text-[9px] text-green-500">READY</span>
                </div>
              </div>

              <h3 className="text-lg font-sans font-bold text-white leading-tight">
                {activeNode.title}
              </h3>
              <p className="text-xs font-sans text-white/70 mt-2 leading-relaxed">
                {activeNode.description}
              </p>
            </div>

            {/* Code viewport */}
            <div className="my-6 bg-black/60 rounded-2xl p-4 border border-white/5 font-mono text-[10.5px] overflow-x-auto text-left shadow-inner flex-1 flex flex-col justify-center min-h-[220px]">
              <pre className="text-white/95">
                <code>{activeNode.code}</code>
              </pre>
            </div>

            {/* Sidebar footer */}
            <div className="border-t border-white/10 pt-4 flex items-center justify-between font-mono text-[10px] text-white/45">
              <span>NODE ID: {activeNode.id.toUpperCase()}</span>
              <span className="text-[#C7FF3D]">NEXORA ENGINE</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
