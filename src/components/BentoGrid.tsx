"use client";

import React, { useRef, useState, useEffect } from "react";
import { Terminal, Cpu, ShieldAlert, Server, GitPullRequest } from "lucide-react";
import { motion } from "framer-motion";

// Staggered bento grid entrance container variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// Left cards slide in from bottom-left
const leftCardVariants = {
  hidden: {
    opacity: 0,
    x: -30,
    y: 20,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 75,
      damping: 15,
      mass: 0.9,
    },
  },
};

// Right cards slide in from bottom-right
const rightCardVariants = {
  hidden: {
    opacity: 0,
    x: 30,
    y: 20,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 75,
      damping: 15,
      mass: 0.9,
    },
  },
};

// Header title/subtitle fade down
const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 16,
    },
  },
};


// Interactive bento card wrapper that tracks cursor coordinates
function BentoCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`hover-radial-card relative p-6 md:p-8 rounded-none overflow-hidden group ${className}`}
    >
      {/* Dynamic light gradient shine element inside the card */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500"
        style={{
          background: "radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), #C7FF3D 0%, transparent 80%)"
        }}
      />
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}


export default function BentoGrid() {
  // Simple running states for our simulated console dashboards
  const [activeEndpoint, setActiveEndpoint] = useState("/api/v1/auth/jwt");
  const [logs, setLogs] = useState<string[]>([
    "AUTH_JWT: Verified signature token successfully.",
    "RATE_LIMIT: Client under strict 100/15m quota (current: 1)",
    "ZOD: Schema verification succeeded for reservation payload.",
  ]);

  useEffect(() => {
    const endpoints = [
      "/api/v1/auth/jwt",
      "/api/v1/aerospace/query",
      "/api/v1/reservation/create",
      "/api/v1/users/profile",
    ];
    const logPool = [
      "AUTH_JWT: Checked bearer authorization header context.",
      "SECURE: Helmet headers validated. Strict-Transport-Security: Active.",
      "CORS: Origin allowed for application production client.",
      "RATE_LIMIT: Rate limiting middleware passed (0ms delay).",
      "SYSTEM: Synced write records between MongoDB and Firestore.",
    ];

    const timer = setInterval(() => {
      const randomEndpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
      const randomLog = logPool[Math.floor(Math.random() * logPool.length)];
      setActiveEndpoint(randomEndpoint);
      setLogs((prev) => [randomLog, prev[0], prev[1]].slice(0, 3));
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="bento" className="py-24 px-4 md:px-8 max-w-6xl mx-auto scroll-mt-20">
      <motion.div
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="mb-16 text-center md:text-left"
      >
        <span className="font-mono text-xs text-[#555555] tracking-widest uppercase">
          02 // ARCHITECTURE MATRIX
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-medium text-[#111111] mt-3 leading-tight">
          System Capability Matrix
        </h2>
        <p className="text-[#555555] font-sans text-sm md:text-base mt-3 max-w-xl">
          Visual proof of autonomous code engineering, infrastructure stability, and enterprise-grade security protocols.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Card 1: AI Systems (md:col-span-2) */}
        <motion.div variants={leftCardVariants} className="md:col-span-2 h-[380px]">
          <BentoCard className="w-full h-full">
            <div className="flex items-center justify-between">
              <div className="p-2.5 bg-[#C7FF3D] border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Cpu className="w-5 h-5 text-[#111111]" />
              </div>
              <span className="font-pixel text-[9px] font-bold tracking-wider text-[#555555] bg-[#111111]/5 px-2.5 py-1 rounded-none border border-black/10 uppercase">
                AI Stack
              </span>
            </div>

            <div className="my-6">
              <h3 className="text-xl md:text-2xl font-sans font-bold text-[#111111]">
                Knowledge Graph & Vector Systems
              </h3>
              <p className="text-xs text-[#555555] mt-2 font-sans max-w-xl">
                Architecting air-gapped retrieval agents. Combining dense matrix searches in FAISS with rigid relational networks in Neo4j to mitigate Large Language Model (LLM) hallucinations.
              </p>
            </div>

            {/* Active Python code simulator rendering Ollama/LLaMA 3 wrappers */}
            <div className="w-full bg-[#111111] text-[#F7F7F5] rounded-2xl p-4 font-mono text-[11px] select-none text-left overflow-x-auto shadow-inner border border-white/5">
              <div className="flex items-center gap-1.5 border-b border-white/10 pb-2 mb-2 text-[#555555]">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="ml-2 text-[10px] text-white/50">rag_retrieval_service.py</span>
              </div>
              <pre className="text-white/95">
                <code>
{`from langchain_community.vectorstores import FAISS
from langchain_community.graphs import Neo4jGraph

class AirGappedRAGPipeline:
    def __init__(self, index_path, neo4j_uri):
        self.vector_store = FAISS.load_local(index_path, embeddings)
        self.knowledge_graph = Neo4jGraph(url=neo4j_uri, auth=(user, pwd))
        
    def query(self, prompt: str, rbac_role: str):
        # MMR search matches context cleanly, passing to LLaMA 3
        ctx = self.vector_store.max_marginal_relevance_search(prompt, k=4)
        return llm.invoke(ctx, role=rbac_role)`}
                </code>
              </pre>
            </div>
          </BentoCard>
        </motion.div>

        {/* Card 2: Full-Stack Scale (md:col-span-1) */}
        <motion.div variants={rightCardVariants} className="md:col-span-1 h-[380px]">
          <BentoCard className="w-full h-full">
            <div>
              <div className="p-2.5 bg-white border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] inline-block">
                <Server className="w-5 h-5 text-[#111111]" />
              </div>
              <h3 className="text-lg md:text-xl font-pixel font-bold text-[#111111] mt-6">
                Microservices & Scale
              </h3>
              <p className="text-xs text-[#555555] mt-2 font-sans">
                Asynchronous FastAPI applications paired with enterprise Node.js clusters, operating with clean architecture principles.
              </p>
            </div>

            {/* Telemetry charts */}
            <div className="border-2 border-black bg-white p-4 mt-6 font-mono text-[10px] space-y-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center justify-between text-[#555555]">
                <span>CLUSTER GATEWAY</span>
                <span className="text-[#4ADE80] font-bold">ONLINE</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[9px] text-[#555555]">
                  <span>FASTAPI NODE A (Azure)</span>
                  <span>48 req/s</span>
                </div>
                <div className="w-full h-1.5 bg-[#111111]/10 rounded-full overflow-hidden">
                  <div className="w-[72%] h-full bg-[#C7FF3D] rounded-full" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[9px] text-[#555555]">
                  <span>NODEJS NODE B (AWS)</span>
                  <span>32 req/s</span>
                </div>
                <div className="w-full h-1.5 bg-[#111111]/10 rounded-full overflow-hidden">
                  <div className="w-[45%] h-full bg-[#111111] rounded-full" />
                </div>
              </div>
            </div>
          </BentoCard>
        </motion.div>

        {/* Card 3: SecOps & DevOps (md:col-span-1) */}
        <motion.div variants={leftCardVariants} className="md:col-span-1 h-[380px]">
          <BentoCard className="w-full h-full">
            <div>
              <div className="p-2.5 bg-white border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] inline-block">
                <ShieldAlert className="w-5 h-5 text-[#111111]" />
              </div>
              <h3 className="text-lg md:text-xl font-sans font-bold text-[#111111] mt-6">
                SecOps & Verification
              </h3>
              <p className="text-xs text-[#555555] mt-2 font-sans">
                Proactive enforcement of OWASP Top 10 compliance: JWT token validation, rate-limiting, and validation schemas.
              </p>
            </div>

            {/* Simulated Terminal logs */}
            <div className="bg-[#111111] rounded-2xl p-4 mt-6 font-mono text-[10px] text-white/80 h-40 flex flex-col justify-between overflow-hidden text-left border border-white/5">
              <div className="flex items-center justify-between border-b border-white/10 pb-1.5 text-[#555555]">
                <span>TERMINAL STATUS</span>
                <span className="text-amber-400">MONITORING</span>
              </div>
              <div className="flex-1 flex flex-col justify-center gap-1.5 pt-2 text-[9px]">
                <span className="text-[#C7FF3D] shrink-0 truncate">
                  LISTEN &gt; {activeEndpoint}
                </span>
                {logs.map((log, idx) => (
                  <span key={idx} className="opacity-90 shrink-0 truncate text-white">
                    {idx === 0 ? "⚡ " : "• "}
                    {log}
                  </span>
                ))}
              </div>
            </div>
          </BentoCard>
        </motion.div>

        {/* Card 4: Cloud Infrastructure (md:col-span-2) */}
        <motion.div variants={rightCardVariants} className="md:col-span-2 h-[380px]">
          <BentoCard className="w-full h-full">
            <div className="flex items-center justify-between">
              <div className="p-2.5 bg-[#C7FF3D] border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <GitPullRequest className="w-5 h-5 text-[#111111]" />
              </div>
              <span className="font-pixel text-[9px] font-bold tracking-wider text-[#555555] bg-[#111111]/5 px-2.5 py-1 rounded-none border border-black/10 uppercase">
                INFRASTRUCTURE
              </span>
            </div>

            <div className="my-6">
              <h3 className="text-xl md:text-2xl font-pixel font-bold text-[#111111]">
                Cloud-Native Continuous Delivery
              </h3>
              <p className="text-xs text-[#555555] mt-2 font-sans max-w-xl">
                Containerizing microservices inside isolated Docker volumes deployed over AWS and Azure compute nodes. Controlled automated delivery cycle compressed release steps by 70%.
              </p>
            </div>

            {/* DevOps Pipeline visual flow chart */}
            <div className="w-full bg-white border-2 border-black p-4 flex items-center justify-around font-mono text-[10px] text-[#555555] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] select-none overflow-x-auto min-h-[120px]">
              <div className="flex flex-col items-center gap-2">
                <span className="bg-[#111111] text-[#F7F7F5] px-2.5 py-1 rounded-md text-[9px]">GIT ACTIONS</span>
                <span className="font-bold text-[#111111]">Auto Lint & Test</span>
              </div>
              <div className="text-[#111111]/45">&rarr;</div>
              <div className="flex flex-col items-center gap-2">
                <span className="bg-[#111111] text-[#F7F7F5] px-2.5 py-1 rounded-md text-[9px]">DOCKER BUILD</span>
                <span className="font-bold text-[#111111]">Tag Image</span>
              </div>
              <div className="text-[#111111]/45">&rarr;</div>
              <div className="flex flex-col items-center gap-2">
                <span className="bg-[#111111] text-[#F7F7F5] px-2.5 py-1 rounded-md text-[9px]">AZURE CLUSTER</span>
                <span className="font-bold text-[#111111]">Compute Nodes</span>
              </div>
              <div className="text-[#111111]/45">&rarr;</div>
              <div className="flex flex-col items-center gap-2">
                <span className="bg-[#4ADE80]/20 text-[#111111] border border-[#4ADE80] px-2.5 py-1 rounded-md text-[9px]">PRODUCTION</span>
                <span className="font-bold text-[#4ADE80]">Active Run</span>
              </div>
            </div>
          </BentoCard>
        </motion.div>
      </motion.div>
    </section>
  );
}
