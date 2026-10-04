"use client";

import React, { useRef, useState, useEffect } from "react";
import { Terminal, Cpu, ShieldAlert, Server, GitPullRequest, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function BentoGrid() {
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
    }, 3800);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="bento" className="w-full px-2 sm:px-4 md:px-5 py-4 sm:py-6 scroll-mt-20 text-left select-none">
      <div className="editorial-frame w-full p-6 sm:p-10 md:p-12 relative overflow-hidden">
        
        {/* Frame Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8 font-mono text-xs text-white/50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
            <span className="uppercase tracking-widest text-white/70">
              04 // RECRUITER ARCHITECTURE MATRIX
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>Live Telemetry & Schemas</span>
            <div className="w-16 h-1.5 rounded-full spectrum-pill" />
          </div>
        </div>

        <div className="mb-10">
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-none">
            System Capability Matrix
          </h2>
          <p className="font-sans text-sm sm:text-base text-white/60 mt-3 max-w-xl font-light">
            Verifiable architectures: local vector indexes, async microservices, OWASP Top 10 defenses, and cloud CI/CD pipelines.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Card 1: AI Systems (md:col-span-2) */}
          <div className="md:col-span-2 bg-[#111111] border border-white/12 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-white">
                  <Cpu className="w-5 h-5 text-[#FF5E00]" />
                </div>
                <span className="font-mono text-[9px] font-bold tracking-wider text-white/50 bg-white/5 px-2.5 py-1 rounded-full uppercase border border-white/10">
                  AI Architecture
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                Knowledge Graph & Vector Systems
              </h3>
              <p className="text-xs sm:text-sm text-white/60 mt-2 font-sans max-w-xl font-light leading-relaxed">
                Architecting air-gapped retrieval agents. Combining dense matrix searches in FAISS with rigid relational networks in Neo4j to eliminate hallucinations.
              </p>
            </div>

            {/* Code Block */}
            <div className="w-full bg-[#080808] border border-white/10 rounded-xl p-4 font-mono text-[11px] text-white/90 mt-6 select-none overflow-x-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2 text-white/40 text-[10px]">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500/80" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
                  <div className="w-2 h-2 rounded-full bg-green-500/80" />
                  <span className="ml-2 font-mono">rag_retrieval_service.py</span>
                </div>
                <span className="text-[#FF5E00]">FAISS + Neo4j</span>
              </div>
              <pre className="text-white/80">
                <code>{`from langchain_community.vectorstores import FAISS
from langchain_community.graphs import Neo4jGraph

class AirGappedRAGPipeline:
    def __init__(self, index_path, neo4j_uri):
        self.vector_store = FAISS.load_local(index_path, embeddings)
        self.knowledge_graph = Neo4jGraph(url=neo4j_uri, auth=(user, pwd))
        
    def query(self, prompt: str, rbac_role: str):
        ctx = self.vector_store.max_marginal_relevance_search(prompt, k=4)
        return llm.invoke(ctx, role=rbac_role)`}</code>
              </pre>
            </div>
          </div>

          {/* Card 2: Full-Stack Scale (md:col-span-1) */}
          <div className="md:col-span-1 bg-[#111111] border border-white/12 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-white inline-block mb-4">
                <Server className="w-5 h-5 text-[#00E5FF]" />
              </div>
              <h3 className="text-lg sm:text-xl font-display font-bold text-white">
                Microservices & Scale
              </h3>
              <p className="text-xs text-white/60 mt-2 font-sans font-light leading-relaxed">
                Asynchronous FastAPI applications paired with enterprise Node.js clusters, operating with clean architecture principles.
              </p>
            </div>

            {/* Telemetry charts */}
            <div className="border border-white/10 bg-[#080808] p-4 mt-6 rounded-xl font-mono text-[10px] space-y-3">
              <div className="flex items-center justify-between text-white/50">
                <span>CLUSTER GATEWAY</span>
                <span className="text-emerald-400 font-bold">ONLINE</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[9px] text-white/60">
                  <span>FASTAPI NODE A (Azure)</span>
                  <span className="text-[#00E5FF]">48 req/s</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-[72%] h-full bg-[#00E5FF] rounded-full" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[9px] text-white/60">
                  <span>NODEJS NODE B (AWS)</span>
                  <span className="text-[#FF5E00]">32 req/s</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-[45%] h-full bg-[#FF5E00] rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: SecOps & DevOps (md:col-span-1) */}
          <div className="md:col-span-1 bg-[#111111] border border-white/12 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-white inline-block mb-4">
                <ShieldAlert className="w-5 h-5 text-[#A800FF]" />
              </div>
              <h3 className="text-lg sm:text-xl font-display font-bold text-white">
                SecOps & Verification
              </h3>
              <p className="text-xs text-white/60 mt-2 font-sans font-light leading-relaxed">
                Proactive enforcement of OWASP Top 10 compliance: JWT token validation, rate-limiting, and validation schemas.
              </p>
            </div>

            {/* Simulated Terminal logs */}
            <div className="bg-[#080808] border border-white/10 rounded-xl p-4 mt-6 font-mono text-[10px] text-white/80 h-36 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-1.5 text-white/40 text-[9px]">
                <span>TERMINAL STATUS</span>
                <span className="text-amber-400 font-bold">MONITORING</span>
              </div>
              <div className="flex-1 flex flex-col justify-center gap-1.5 pt-1 text-[9px]">
                <span className="text-[#FF5E00] truncate">
                  LISTEN &gt; {activeEndpoint}
                </span>
                {logs.map((log, idx) => (
                  <span key={idx} className="opacity-80 truncate text-white/90">
                    {idx === 0 ? "⚡ " : "• "}
                    {log}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Card 4: Cloud Infrastructure (md:col-span-2) */}
          <div className="md:col-span-2 bg-[#111111] border border-white/12 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-white">
                  <GitPullRequest className="w-5 h-5 text-[#10B981]" />
                </div>
                <span className="font-mono text-[9px] font-bold tracking-wider text-white/50 bg-white/5 px-2.5 py-1 rounded-full uppercase border border-white/10">
                  INFRASTRUCTURE
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                Cloud-Native Continuous Delivery
              </h3>
              <p className="text-xs sm:text-sm text-white/60 mt-2 font-sans max-w-xl font-light leading-relaxed">
                Containerizing microservices inside isolated Docker volumes deployed over AWS and Azure compute nodes. Automated multi-tier pipelines with branch testing.
              </p>
            </div>

            {/* Pipeline visual flow */}
            <div className="w-full bg-[#080808] border border-white/10 rounded-xl p-4 flex items-center justify-around font-mono text-[10px] text-white/60 mt-6 overflow-x-auto">
              <div className="flex flex-col items-center gap-1.5">
                <span className="bg-white/10 text-white px-2 py-0.5 rounded text-[8px]">GIT ACTIONS</span>
                <span className="font-bold text-white text-[10px]">Lint & Test</span>
              </div>
              <div className="text-white/30">&rarr;</div>
              <div className="flex flex-col items-center gap-1.5">
                <span className="bg-white/10 text-white px-2 py-0.5 rounded text-[8px]">DOCKER</span>
                <span className="font-bold text-white text-[10px]">Build & Tag</span>
              </div>
              <div className="text-white/30">&rarr;</div>
              <div className="flex flex-col items-center gap-1.5">
                <span className="bg-white/10 text-white px-2 py-0.5 rounded text-[8px]">AZURE CLUSTER</span>
                <span className="font-bold text-white text-[10px]">Compute Nodes</span>
              </div>
              <div className="text-white/30">&rarr;</div>
              <div className="flex flex-col items-center gap-1.5">
                <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-[8px] border border-emerald-500/30">PROD</span>
                <span className="font-bold text-emerald-400 text-[10px]">Active Run</span>
              </div>
            </div>
          </div>

        </div>

        {/* Section Corner Index */}
        <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between text-white/40 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="text-xl font-display font-black text-white">42</span>
            <span className="uppercase tracking-widest text-[10px]">Architecture Capability Matrix</span>
          </div>
          <span className="text-[10px] uppercase">Telemetry Active</span>
        </div>

      </div>
    </section>
  );
}
