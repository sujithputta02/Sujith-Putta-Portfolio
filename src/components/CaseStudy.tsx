"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle2,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Type Definitions
// ─────────────────────────────────────────────────────────────
type CaseStudyId = "esapay" | "cyberconstituent" | "lumaforge";

interface CaseStudyData {
  id: CaseStudyId;
  category: string;
  number: string;
  title: string;
  shortTitle: string;
  tagline: string;
  badges: string[];
  spreads: {
    leftPage: {
      chapter: string;
      pageNumber: string;
      title: string;
      subtitle: string;
      meta: { label: string; value: string }[];
      bodyParagraphs: string[];
      callout?: { title: string; text: string };
    };
    rightPage: {
      chapter: string;
      pageNumber: string;
      title: string;
      diagramTitle?: string;
      pipelineSteps?: { step: string; label: string; desc: string }[];
      metrics?: { label: string; value: string; note: string; color: string }[];
      techStack: string[];
      takeaways?: string[];
      links?: { label: string; href: string; icon?: string; primary?: boolean }[];
    };
  }[];
}

// ─────────────────────────────────────────────────────────────
// Case Studies Comprehensive Data (Multi-spread Book Content)
// ─────────────────────────────────────────────────────────────
const CASE_STUDIES: Record<CaseStudyId, CaseStudyData> = {
  esapay: {
    id: "esapay",
    category: "AUTONOMOUS AI",
    number: "01",
    title: "ESA Autonomous Payment Resilience Engine",
    shortTitle: "ESA Autonomous Engine™",
    tagline: "Autonomous incident remediation for payment gateways: neuro-symbolic reasoning with a deterministic Rust OCC safety gate.",
    badges: ["v1.0.5 ON NPM & PYPI", "72.3% SLA IMPROVEMENT", "100% HARD SAFETY GATE"],
    spreads: [
      {
        leftPage: {
          chapter: "CHAPTER 01 // PROBLEM STATEMENT",
          pageNumber: "PAGE 01",
          title: "The Crisis of Flaky Payment Gateways",
          subtitle: "Why microservice outages cost millions during flash sales",
          meta: [
            { label: "Status", value: "v1.0.5 Published (NPM & PyPI)" },
            { label: "Domain", value: "Autonomous Fintech Infrastructure" },
            { label: "Core Lang", value: "Rust 2024 / Python FastAPI" },
          ],
          bodyParagraphs: [
            "Modern payment orchestrators process thousands of transactions per second. During flash sale spikes or third-party acquirer outages, cascading microservice failures trigger checkout queue timeouts.",
            "Traditional alert runbooks require 15–20 minutes of engineer triage. Meanwhile, cloud LLM agents deployed for auto-remediation hallucinate cluster state modifications, occasionally wiping production cache configurations.",
            "ESA introduces a neuro-symbolic multi-signal diagnosis engine where probabilistic AI agents propose remediation actions, but an air-gapped deterministic Rust safety gate mathematically verifies system invariants before any state change is committed.",
          ],
          callout: {
            title: "Core Architectural Invariant",
            text: "Zero unverified mutations. The agent proposes; the deterministic Rust gateway proves safety via Optimistic Concurrency Control (OCC).",
          },
        },
        rightPage: {
          chapter: "SYSTEM ARCHITECTURE",
          pageNumber: "PAGE 02",
          title: "Signal Topology & Invariant Gate",
          diagramTitle: "FIG 1.1: DETERMINISTIC OCC PIPELINE",
          pipelineSteps: [
            {
              step: "01 // INGESTION",
              label: "Multi-Signal Telemetry",
              desc: "Prometheus, OTel traces, and Kafka webhook latency streams sampled at 100ms intervals.",
            },
            {
              step: "02 // REASONING",
              label: "ARC Reflex Reasoner (<2ms)",
              desc: "Induces minimal DSL remediation programs in sub-2ms before socket connection pools exhaust.",
            },
            {
              step: "03 // VERIFICATION",
              label: "Rust OCC Safety Gate",
              desc: "AST policy validator checks 650+ mathematical invariants; rejects unverified mutations.",
            },
            {
              step: "04 // EXECUTION",
              label: "Deterministic Pod Mutation",
              desc: "Applies circuit break or traffic throttle to Kubernetes Kind cluster with 3.5s auto-rollback.",
            },
          ],
          techStack: ["Rust", "FastAPI", "Kubernetes", "Prometheus", "Kafka", "LangChain"],
        },
      },
      {
        leftPage: {
          chapter: "CHAPTER 02 // BENCHMARKS",
          pageNumber: "PAGE 03",
          title: "Empirical Production Telemetry",
          subtitle: "Audited across synthetic flash sale simulations",
          meta: [
            { label: "Test Rig", value: "8-node Kubernetes Kind Cluster" },
            { label: "Load Profile", value: "1,200 RPS Locust Flash Spike" },
            { label: "Auditor", value: "Prometheus & OTel Metrics" },
          ],
          bodyParagraphs: [
            "We conducted 650 synthetic fault injection runs, simulating upstream gateway network partitions, Redis connection pool exhaustion, and memory leaks.",
            "Under raw Kubernetes native horizontal pod autoscaling, Time Above SLA (p95 > 250ms) averaged 14.8 seconds per incident. ESA compressed the failure window to just 4.1 seconds.",
            "Most importantly, across all 650 adversarial chaos engineering tests, the Rust Action Gateway maintained a 100% hard safety record with 0 illegal mutations.",
          ],
          callout: {
            title: "Audited Result",
            text: "72.3% reduction in gateway failure windows with zero human intervention required.",
          },
        },
        rightPage: {
          chapter: "RETROSPECTIVE & ARTIFACTS",
          pageNumber: "PAGE 04",
          title: "Engineering Retrospective & Artifacts",
          metrics: [
            { label: "Failure Window", value: "72.3%", note: "4.1s vs 14.8s SLA recovery", color: "#1F51FF" },
            { label: "Reflex SLA", value: "< 2ms", note: "Sub-2ms minimal program synthesis", color: "#00E5FF" },
            { label: "Safety Violations", value: "0 / 650", note: "100% invariant compliance", color: "#10B981" },
          ],
          takeaways: [
            "Neuro-symbolic separation beats pure end-to-end LLMs by eliminating hallucination risk.",
            "Local quantized reasoners circumvent cloud API latencies during critical network degradation.",
            "Optimistic Concurrency Control (OCC) is essential to prevent race conditions during traffic surges.",
          ],
          techStack: ["NPM Package v1.0.5", "PyPI Package", "Docker", "Kind", "OpenTelemetry"],
          links: [
            { label: "Launch Live Site", href: "https://esapay.vercel.app", primary: true },
            { label: "Inspect GitHub Repository", href: "https://github.com/sujithputta02/Esapay" },
            { label: "Watch 5-Min Architecture Video", href: "https://youtu.be/77qjP2yK7Og" },
          ],
        },
      },
    ],
  },
  cyberconstituent: {
    id: "cyberconstituent",
    category: "EDGE SLM",
    number: "02",
    title: "CyberConstituent-SLM Air-Gapped Intelligence",
    shortTitle: "CyberConstituent-SLM™",
    tagline: "Air-gapped edge-quantized Small Language Model paired with local FAISS vector search and strict AST grammar guarantees.",
    badges: ["AIR-GAPPED SLM", "SUB-80MS FAISS RAG", "AST INVARIANT GATE"],
    spreads: [
      {
        leftPage: {
          chapter: "CHAPTER 01 // SOVEREIGN AI",
          pageNumber: "PAGE 01",
          title: "Sovereign Intelligence at the Edge",
          subtitle: "Removing third-party cloud telemetry and API latency",
          meta: [
            { label: "Architecture", value: "Quantized 4-bit Edge SLM" },
            { label: "Vector Store", value: "FAISS Local FlatL2 / HNSW" },
            { label: "Hardware", value: "Apple Silicon / Edge GPUs" },
          ],
          bodyParagraphs: [
            "Deploying LLMs in sovereign and regulated environments is constrained by data privacy compliance and network air-gapping.",
            "Sending sensitive corporate schemas to remote API endpoints introduces security vulnerabilities and unacceptable jitter (500ms–2000ms roundtrip latency).",
            "CyberConstituent-SLM couples quantized local SLMs with dense in-memory FAISS indices and Neo4j relational graph validation, achieving deterministic answers entirely offline.",
          ],
          callout: {
            title: "Privacy Guarantee",
            text: "Zero telemetry packets leave the host machine. 100% offline mathematical certainty.",
          },
        },
        rightPage: {
          chapter: "ARCHITECTURE BLUEPRINT",
          pageNumber: "PAGE 02",
          title: "Hybrid Vector & Invariant Pipeline",
          diagramTitle: "FIG 2.1: OFFLINE KNOWLEDGE TOPOLOGY",
          pipelineSteps: [
            {
              step: "01 // EMBEDDING",
              label: "Local Matrix Embedding",
              desc: "Runs high-speed local sentence transformers directly on metal/GPU cores.",
            },
            {
              step: "02 // RETRIEVAL",
              label: "FAISS Dense Index",
              desc: "Cosine similarity search over 50,000+ technical chunks in sub-12ms.",
            },
            {
              step: "03 // VALIDATION",
              label: "AST Grammar Constrained Decoding",
              desc: "Grammar mask eliminates hallucinations by strictly enforcing JSON schema output.",
            },
            {
              step: "04 // SYNTHESIS",
              label: "Sub-80ms Quantized Inference",
              desc: "Edge SLM generates verified, context-accurate responses without cloud calls.",
            },
          ],
          techStack: ["FAISS", "Ollama", "Python", "Neo4j", "PyTorch", "GGUF"],
        },
      },
      {
        leftPage: {
          chapter: "CHAPTER 02 // BENCHMARKS",
          pageNumber: "PAGE 03",
          title: "Edge Throughput & Zero-Leak Audit",
          subtitle: "Audited across 10,000 offline schema queries",
          meta: [
            { label: "P99 Latency", value: "78.4ms (Cold Start to End)" },
            { label: "Memory Footprint", value: "3.2 GB RAM Total" },
            { label: "Cloud Packets", value: "0 Bytes Exfiltrated" },
          ],
          bodyParagraphs: [
            "We subjected CyberConstituent-SLM to 10,000 rigorous technical queries against complex database schemas and regulatory documents.",
            "Through 4-bit GGUF quantization and token caching, p99 latency dropped below 80ms while preserving 99.4% intent routing accuracy.",
            "Packet capture analysis via Wireshark confirmed zero outgoing network calls, satisfying air-gapped sovereign requirements.",
          ],
          callout: {
            title: "Audited Efficiency",
            text: "Under 3.5GB RAM utilization, running smoothly on consumer edge silicon without thermal throttling.",
          },
        },
        rightPage: {
          chapter: "RETROSPECTIVE & ARTIFACTS",
          pageNumber: "PAGE 04",
          title: "Key Learnings & Repository",
          metrics: [
            { label: "P99 Latency", value: "78ms", note: "Sub-second edge execution", color: "#FF5E00" },
            { label: "Intent Precision", value: "99.4%", note: "Constrained grammar decoding", color: "#00E5FF" },
            { label: "Network Egress", value: "0 Bytes", note: "100% air-gapped security", color: "#10B981" },
          ],
          takeaways: [
            "Constrained decoding via AST grammars guarantees 100% syntactically valid outputs.",
            "Local FAISS vector indices outperform remote vector databases by avoiding network TCP overhead.",
            "Edge quantization allows enterprise-grade SLMs to run on resource-constrained devices.",
          ],
          techStack: ["FAISS", "GGUF", "LangChain", "FastAPI", "Docker"],
          links: [
            { label: "Inspect Source Code on GitHub", href: "https://github.com/sujithputta02", primary: true },
            { label: "Request Architecture Dossier", href: "mailto:sujithputta02@gmail.com" },
          ],
        },
      },
    ],
  },
  lumaforge: {
    id: "lumaforge",
    category: "3D & GRAPHICS",
    number: "03",
    title: "LumaForge Autonomous 3D Generative Pipeline",
    shortTitle: "LumaForge Studio™",
    tagline: "High-throughput 3D mesh synthesis engine with custom Three.js WebGL shaders and parallel worker threads.",
    badges: ["GENERATIVE 3D ASSETS", "THREE.JS PIPELINE", "SUB-SEC LATENCY"],
    spreads: [
      {
        leftPage: {
          chapter: "CHAPTER 01 // GRAPHICS ENG",
          pageNumber: "PAGE 01",
          title: "Real-Time Generative 3D Pipelines",
          subtitle: "Solving WebGL frame drops and VRAM throttling in browsers",
          meta: [
            { label: "Renderer", value: "Custom Three.js WebGL Engine" },
            { label: "Parallelism", value: "Dedicated Web Worker Threads" },
            { label: "Format", value: "Draco Compressed GLTF" },
          ],
          bodyParagraphs: [
            "Browser-based 3D applications often suffer from main-thread frame locking when instantiating complex generative meshes and procedural textures.",
            "When users generate or manipulate complex geometric structures, typical WebGL pipelines freeze the user interface while compiling custom shader programs.",
            "LumaForge decouples computation from the browser DOM by offloading mesh tessellation and normal calculations to background Web Workers, maintaining a constant 60 FPS.",
          ],
          callout: {
            title: "Performance Constraint",
            text: "Zero frame drops below 60 FPS during dynamic high-poly mesh synthesis.",
          },
        },
        rightPage: {
          chapter: "PIPELINE BLUEPRINT",
          pageNumber: "PAGE 02",
          title: "WebGL Shader & Worker Threading",
          diagramTitle: "FIG 3.1: DUAL-THREAD MESH SYNTHESIS",
          pipelineSteps: [
            {
              step: "01 // WORKER",
              label: "Procedural Geometry Gen",
              desc: "Computes vertex buffers and index topologies off the UI thread.",
            },
            {
              step: "02 // DRACO",
              label: "Lossless Compression",
              desc: "Reduces geometry payload by 72% using Draco compression algorithms.",
            },
            {
              step: "03 // GPU STREAM",
              label: "Async Buffer Allocation",
              desc: "Streams vertex attributes directly into GPU VRAM via Transferable Objects.",
            },
            {
              step: "04 // SHADING",
              label: "Custom Chromatic PBR",
              desc: "Physically based liquid metal reflection shaders with specular sheen.",
            },
          ],
          techStack: ["Three.js", "WebGL", "TypeScript", "GLSL Shaders", "Web Workers"],
        },
      },
      {
        leftPage: {
          chapter: "CHAPTER 02 // PERFORMANCE",
          pageNumber: "PAGE 03",
          title: "Render Loop Telemetry",
          subtitle: "Audited across low-tier mobile and desktop GPUs",
          meta: [
            { label: "Frame Rate", value: "60.0 FPS Locked" },
            { label: "Draw Calls", value: "< 14 per Frame" },
            { label: "Mesh Load Time", value: "< 1.2 Seconds" },
          ],
          bodyParagraphs: [
            "By caching compiled shader bytecode and utilizing instanced mesh rendering, LumaForge drastically reduces GPU draw call overhead.",
            "On integrated mobile GPUs, VRAM utilization decreased by 70%, completely preventing out-of-memory browser tab crashes.",
            "Liquid metal surface shaders simulate real-time caustic highlights and dynamic Fresnel effects at 0 added CPU overhead.",
          ],
          callout: {
            title: "Framerate Benchmark",
            text: "Rock-solid 60 FPS maintained even when generating 100,000+ vertex geometries.",
          },
        },
        rightPage: {
          chapter: "RETROSPECTIVE & ARTIFACTS",
          pageNumber: "PAGE 04",
          title: "Key Learnings & Demo Links",
          metrics: [
            { label: "Frame Rate", value: "60 FPS", note: "Zero main-thread jank", color: "#A800FF" },
            { label: "VRAM Reduction", value: "70%", note: "Draco buffer optimization", color: "#00E5FF" },
            { label: "Synthesis Time", value: "< 1.2s", note: "Off-thread worker generation", color: "#FF5E00" },
          ],
          takeaways: [
            "Transferable Objects in Web Workers eliminate expensive JSON serialization penalties.",
            "Instanced meshes allow thousands of dynamic elements with a single draw call.",
            "Custom GLSL vertex deformation shaders are vastly superior to CPU geometry updates.",
          ],
          techStack: ["Three.js", "GLSL", "React Three Fiber", "Vite", "Web Workers"],
          links: [
            { label: "Inspect 3D Pipeline Code", href: "https://github.com/sujithputta02", primary: true },
            { label: "Explore Shaders Portfolio", href: "#showcase" },
          ],
        },
      },
    ],
  },
};

// ─────────────────────────────────────────────────────────────
// 1. Vector SVG Artworks for the 3 Cards (NO AI Generated Images)
// ─────────────────────────────────────────────────────────────

// Card 1: ESA Autonomous Payment Resilience Vector Artwork
function EsaAutonomousSvg() {
  return (
    <svg className="w-full h-full object-cover" viewBox="0 0 400 480" fill="none">
      <defs>
        <radialGradient id="esaBg" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#121829" />
          <stop offset="50%" stopColor="#0A0E18" />
          <stop offset="100%" stopColor="#04060A" />
        </radialGradient>
        <radialGradient id="esaAura" cx="50%" cy="45%" r="40%">
          <stop offset="0%" stopColor="#1F51FF" stopOpacity="0.45" />
          <stop offset="60%" stopColor="#00E5FF" stopOpacity="0.15" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1F51FF" />
          <stop offset="50%" stopColor="#00E5FF" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
        <pattern id="dotGrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#FFFFFF" fillOpacity="0.08" />
        </pattern>
      </defs>

      {/* Deep Midnight Background */}
      <rect width="400" height="480" fill="url(#esaBg)" />
      <rect width="400" height="480" fill="url(#dotGrid)" />

      {/* Ambient Pulsing Aura */}
      <circle cx="200" cy="210" r="170" fill="url(#esaAura)" />

      {/* Cybernetic Geometric Shield / Invariant Node Structure */}
      <g transform="translate(200, 210)">
        {/* Outer Orbit Rings */}
        <circle r="140" stroke="#1F51FF" strokeWidth="1" strokeDasharray="6 8" strokeOpacity="0.35" />
        <circle r="110" stroke="#00E5FF" strokeWidth="1" strokeDasharray="3 6" strokeOpacity="0.45" />
        <circle r="80" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.2" />

        {/* Diagonal Ray Vectors */}
        <line x1="-150" y1="-150" x2="150" y2="150" stroke="#00E5FF" strokeWidth="0.8" strokeOpacity="0.25" />
        <line x1="-150" y1="150" x2="150" y2="-150" stroke="#1F51FF" strokeWidth="0.8" strokeOpacity="0.25" />
        <line x1="0" y1="-160" x2="0" y2="160" stroke="#FFFFFF" strokeWidth="0.5" strokeOpacity="0.2" />
        <line x1="-160" y1="0" x2="160" y2="0" stroke="#FFFFFF" strokeWidth="0.5" strokeOpacity="0.2" />

        {/* Central Hard Invariant Shield Emblem */}
        <path
          d="M0 -65 L55 -35 L55 30 C55 65, 0 85, 0 85 C0 85, -55 65, -55 30 L-55 -35 Z"
          fill="#0B101E"
          stroke="url(#shieldGrad)"
          strokeWidth="2.5"
          filter="drop-shadow(0 0 20px rgba(31,81,255,0.6))"
        />

        {/* Inner Shield Circuitry */}
        <path
          d="M0 -45 L38 -25 L38 20 C38 45, 0 62, 0 62 C0 62, -38 45, -38 20 L-38 -25 Z"
          fill="#070B14"
          stroke="#00E5FF"
          strokeWidth="1.2"
          strokeOpacity="0.6"
        />

        {/* Rust OCC Cog & Lightning Sigil */}
        <circle cx="0" cy="5" r="20" fill="#121A2E" stroke="#10B981" strokeWidth="1.5" />
        <path d="M-6 -8 L3 -8 L-2 2 L6 2 L-4 18 L-1 6 L-8 6 Z" fill="#10B981" />

        {/* Surrounding Telemetry Nodes */}
        <g transform="translate(-110, -50)">
          <circle r="12" fill="#0C1220" stroke="#00E5FF" strokeWidth="1.5" />
          <text textAnchor="middle" dy="3.5" fill="#00E5FF" fontSize="7" fontFamily="monospace" fontWeight="bold">OTel</text>
        </g>
        <g transform="translate(110, -50)">
          <circle r="12" fill="#0C1220" stroke="#1F51FF" strokeWidth="1.5" />
          <text textAnchor="middle" dy="3.5" fill="#1F51FF" fontSize="7" fontFamily="monospace" fontWeight="bold">PROM</text>
        </g>
        <g transform="translate(-85, 90)">
          <circle r="12" fill="#0C1220" stroke="#10B981" strokeWidth="1.5" />
          <text textAnchor="middle" dy="3.5" fill="#10B981" fontSize="7" fontFamily="monospace" fontWeight="bold">RUST</text>
        </g>
        <g transform="translate(85, 90)">
          <circle r="12" fill="#0C1220" stroke="#FF5E00" strokeWidth="1.5" />
          <text textAnchor="middle" dy="3.5" fill="#FF5E00" fontSize="7" fontFamily="monospace" fontWeight="bold">ARC</text>
        </g>

        {/* Connecting Data Lines */}
        <path d="M-98 -50 Q-45 -55 0 -45" stroke="#00E5FF" strokeWidth="1" strokeDasharray="3 4" fill="none" />
        <path d="M98 -50 Q45 -55 0 -45" stroke="#1F51FF" strokeWidth="1" strokeDasharray="3 4" fill="none" />
        <path d="M-73 90 Q-40 60 0 62" stroke="#10B981" strokeWidth="1" strokeDasharray="3 4" fill="none" />
        <path d="M73 90 Q40 60 0 62" stroke="#FF5E00" strokeWidth="1" strokeDasharray="3 4" fill="none" />
      </g>

      {/* High-Tech Terminal Coordinates at Top Left */}
      <text x="24" y="36" fill="#1F51FF" fontSize="9" fontFamily="monospace" fontWeight="bold" letterSpacing="0.1em">
        SYS.ESA // INVARIANT.GATE.ACTIVE
      </text>
      <text x="24" y="52" fill="#FFFFFF" fillOpacity="0.4" fontSize="8" fontFamily="monospace">
        HASH: 0x8F94...B7E // OCC VERIFIED
      </text>
    </svg>
  );
}

// Card 2: CyberConstituent-SLM Phone Mockup on Perforated Mesh
function CyberConstituentPhoneSvg() {
  return (
    <svg className="w-full h-full object-cover" viewBox="0 0 400 480" fill="none">
      <defs>
        {/* Industrial Perforated Steel Mesh Pattern matching reference */}
        <pattern id="perforatedMesh" width="14" height="14" patternUnits="userSpaceOnUse">
          <rect width="14" height="14" fill="#131416" />
          <circle cx="7" cy="7" r="3.2" fill="#090A0B" stroke="#25272B" strokeWidth="0.8" />
          <circle cx="0" cy="0" r="1.5" fill="#090A0B" stroke="#25272B" strokeWidth="0.5" />
          <circle cx="14" cy="0" r="1.5" fill="#090A0B" stroke="#25272B" strokeWidth="0.5" />
          <circle cx="0" cy="14" r="1.5" fill="#090A0B" stroke="#25272B" strokeWidth="0.5" />
          <circle cx="14" cy="14" r="1.5" fill="#090A0B" stroke="#25272B" strokeWidth="0.5" />
        </pattern>

        <linearGradient id="phoneBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2E3035" />
          <stop offset="50%" stopColor="#191A1D" />
          <stop offset="100%" stopColor="#0B0C0E" />
        </linearGradient>

        <linearGradient id="screenOrange" x1="0" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#FF6B00" />
          <stop offset="100%" stopColor="#E64A00" />
        </linearGradient>

        <filter id="phoneShadow" x="-20%" y="-20%" width="150%" height="150%">
          <feDropShadow dx="-10" dy="18" stdDeviation="16" floodColor="#000000" floodOpacity="0.85" />
        </filter>
      </defs>

      {/* Perforated Mesh Surface */}
      <rect width="400" height="480" fill="url(#perforatedMesh)" />

      {/* Subtle Directional Overhead Light */}
      <circle cx="320" cy="100" r="240" fill="#FFFFFF" fillOpacity="0.04" filter="blur(40px)" />

      {/* Angled Smartphone Container matching Image 2 */}
      <g transform="translate(195, 235) rotate(-16)" filter="url(#phoneShadow)">
        {/* Smartphone Chassis */}
        <rect
          x="-105"
          y="-175"
          width="210"
          height="350"
          rx="38"
          fill="url(#phoneBody)"
          stroke="#45484F"
          strokeWidth="2.5"
        />

        {/* Screen Glass Bezel */}
        <rect
          x="-97"
          y="-167"
          width="194"
          height="334"
          rx="30"
          fill="#0D0E10"
        />

        {/* Dynamic Island / Speaker Pill */}
        <rect x="-24" y="-157" width="48" height="14" rx="7" fill="#000000" />
        <circle cx="12" cy="-150" r="2.5" fill="#1A1C20" />

        {/* Vibrant Orange Card Screen Content (Matches Image 2 orange prompt card!) */}
        <g transform="translate(-87, -135)">
          <rect
            width="174"
            height="292"
            rx="22"
            fill="url(#screenOrange)"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="1"
          />

          {/* Minimalist Tech Typography on Orange Card */}
          <text x="18" y="32" fill="#FFFFFF" fillOpacity="0.8" fontSize="8" fontFamily="monospace" letterSpacing="0.08em">
            CYBER.CONSTITUENT // v2.4
          </text>

          <text x="18" y="72" fill="#FFFFFF" fontSize="16" fontFamily="sans-serif" fontWeight="900" letterSpacing="-0.02em">
            Audit air-gapped
          </text>
          <text x="18" y="93" fill="#FFFFFF" fontSize="16" fontFamily="sans-serif" fontWeight="900" letterSpacing="-0.02em">
            SLM safety on
          </text>
          <text x="18" y="114" fill="#FFFFFF" fontSize="16" fontFamily="sans-serif" fontWeight="900" letterSpacing="-0.02em">
            edge hardware?
          </text>

          <text x="18" y="142" fill="#FFFFFF" fillOpacity="0.85" fontSize="8.5" fontFamily="sans-serif" fontWeight="400">
            Offline 4-bit FAISS dense RAG
          </text>
          <text x="18" y="155" fill="#FFFFFF" fillOpacity="0.85" fontSize="8.5" fontFamily="sans-serif" fontWeight="400">
            with strict AST grammar bounds.
          </text>

          {/* Pulsing Target Reticle Icon */}
          <g transform="translate(87, 215)">
            <circle r="22" fill="#FFFFFF" fillOpacity="0.2" />
            <circle r="14" fill="#FFFFFF" fillOpacity="0.35" />
            <circle r="6" fill="#FFFFFF" />
          </g>

          <text x="87" y="258" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
            inspect slm dossier ↗
          </text>
        </g>
      </g>
    </svg>
  );
}

// Card 3: LumaForge 3D Chrome Liquid Metal Vector Artwork (Matches Image 3)
function LumaForgeLiquidChromeSvg() {
  return (
    <svg className="w-full h-full object-cover" viewBox="0 0 400 480" fill="none">
      <defs>
        {/* Deep Obsidian Background */}
        <rect id="bgRect" width="400" height="480" fill="#050505" />

        {/* Chrome Metallic Specular Gradients */}
        <linearGradient id="chrome1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="25%" stopColor="#D2D6DC" />
          <stop offset="50%" stopColor="#4B5563" />
          <stop offset="75%" stopColor="#E5E7EB" />
          <stop offset="100%" stopColor="#1F2937" />
        </linearGradient>

        <linearGradient id="chrome2" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F9FAFB" />
          <stop offset="30%" stopColor="#6B7280" />
          <stop offset="65%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#374151" />
        </linearGradient>

        <linearGradient id="chromeSheen" x1="0" y1="0.5" x2="1" y2="0.5">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="35%" stopColor="#9CA3AF" stopOpacity="0.4" />
          <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#111827" stopOpacity="0.6" />
        </linearGradient>

        <filter id="chromeGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="10" stdDeviation="15" floodColor="#FFFFFF" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Pure Obsidian Black Floor */}
      <rect width="400" height="480" fill="#060606" />

      {/* Organic Molten Liquid Chrome Blobs matching reference Image 3 */}
      <g filter="url(#chromeGlow)">
        {/* Main Central Liquid Mercury Shape */}
        <path
          d="M170 120 C230 110, 290 140, 280 200 C270 260, 310 300, 270 350 C230 400, 160 380, 140 330 C120 280, 90 270, 100 210 C110 150, 110 130, 170 120 Z"
          fill="url(#chrome1)"
          stroke="#FFFFFF"
          strokeWidth="1.5"
        />

        {/* Specular Ridge Highlights */}
        <path
          d="M175 135 C220 128, 270 155, 260 205 C250 255, 290 290, 255 335 C220 380, 165 365, 148 322 C130 278, 105 268, 115 218 C125 168, 125 145, 175 135 Z"
          fill="none"
          stroke="url(#chromeSheen)"
          strokeWidth="5"
          opacity="0.85"
        />

        {/* Secondary Upper Droplet */}
        <path
          d="M260 70 C285 65, 305 85, 295 105 C285 125, 255 120, 250 100 C245 80, 235 75, 260 70 Z"
          fill="url(#chrome2)"
          stroke="#FFFFFF"
          strokeWidth="1"
        />

        {/* Upper Left Droplet */}
        <circle cx="110" cy="90" r="18" fill="url(#chrome1)" stroke="#FFFFFF" strokeWidth="0.8" />
        <ellipse cx="106" cy="85" rx="5" ry="8" fill="#FFFFFF" opacity="0.8" transform="rotate(-30 106 85)" />

        {/* Floating Mercury Satellite Drops */}
        <circle cx="340" cy="180" r="12" fill="url(#chrome2)" stroke="#FFFFFF" strokeWidth="0.5" />
        <circle cx="70" cy="320" r="14" fill="url(#chrome1)" stroke="#FFFFFF" strokeWidth="0.5" />
        <circle cx="330" cy="380" r="20" fill="url(#chrome2)" stroke="#FFFFFF" strokeWidth="0.8" />
        <circle cx="210" cy="430" r="9" fill="url(#chrome1)" stroke="#FFFFFF" strokeWidth="0.5" />

        {/* Specular White Light Reflections */}
        <ellipse cx="230" cy="170" rx="28" ry="12" fill="#FFFFFF" opacity="0.75" transform="rotate(-25 230 170)" />
        <ellipse cx="195" cy="270" rx="35" ry="14" fill="#FFFFFF" opacity="0.6" transform="rotate(35 195 270)" />
        <ellipse cx="150" cy="340" rx="18" ry="8" fill="#FFFFFF" opacity="0.8" transform="rotate(-15 150 340)" />
      </g>

      {/* Modern High-End Chrome Watermark */}
      <text x="24" y="36" fill="#FFFFFF" fillOpacity="0.4" fontSize="9" fontFamily="monospace" letterSpacing="0.12em">
        PBR.CHROME // 60.0 FPS LOCKED
      </text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 2. Interactive 3D Realistic Open Book Reader Modal
// ─────────────────────────────────────────────────────────────
function OpenBookReaderModal({
  caseStudy,
  onClose,
}: {
  caseStudy: CaseStudyData;
  onClose: () => void;
}) {
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [mobilePageTab, setMobilePageTab] = useState<"left" | "right">("left");
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next");

  const currentSpread = caseStudy.spreads[spreadIndex];
  const totalSpreads = caseStudy.spreads.length;

  const handleNext = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      if (mobilePageTab === "left") {
        setMobilePageTab("right");
        return;
      }
      if (spreadIndex < totalSpreads - 1) {
        setFlipDirection("next");
        setSpreadIndex((i) => i + 1);
        setMobilePageTab("left");
      }
      return;
    }

    if (spreadIndex < totalSpreads - 1) {
      setFlipDirection("next");
      setSpreadIndex((i) => i + 1);
    }
  };

  const handlePrev = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      if (mobilePageTab === "right") {
        setMobilePageTab("left");
        return;
      }
      if (spreadIndex > 0) {
        setFlipDirection("prev");
        setSpreadIndex((i) => i - 1);
        setMobilePageTab("right");
      }
      return;
    }

    if (spreadIndex > 0) {
      setFlipDirection("prev");
      setSpreadIndex((i) => i - 1);
    }
  };

  // Keyboard navigation: Left/Right arrows flip pages, ESC closes book
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [spreadIndex, totalSpreads, mobilePageTab]);

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
      {/* Click outside backdrop to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Book Container */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
        
        {/* Top Floating Control Bar */}
        <div className="w-full flex items-center justify-between pb-3 sm:pb-4 text-white font-mono text-xs select-none px-2 sm:px-0">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#FF5E00] animate-pulse" />
            <span className="text-white/60 tracking-wider uppercase text-[11px] sm:text-xs">
              ARCHITECTURE DOSSIER // {caseStudy.title}
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-white/60 text-[11px] sm:text-xs">
              Spread {spreadIndex + 1} of {totalSpreads}
            </span>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center gap-1.5 px-3 border border-white/10"
              title="Close Book (Esc)"
            >
              <X className="w-4 h-4" />
              <span className="text-[11px] uppercase font-bold hidden sm:inline">Close</span>
            </button>
          </div>
        </div>

        {/* Mobile Page Segmented Tab Switcher (Visible only on < md screens) */}
        <div className="flex md:hidden items-center justify-center gap-2 pb-2 select-none w-full">
          <button
            onClick={() => setMobilePageTab("left")}
            className={`px-4 py-1 rounded-full font-mono text-[10px] uppercase font-bold transition-all cursor-pointer border ${
              mobilePageTab === "left"
                ? "bg-white text-black border-white shadow-md"
                : "bg-white/10 text-white/70 border-white/10 hover:text-white"
            }`}
          >
            {currentSpread.leftPage.pageNumber} • Overview
          </button>
          <button
            onClick={() => setMobilePageTab("right")}
            className={`px-4 py-1 rounded-full font-mono text-[10px] uppercase font-bold transition-all cursor-pointer border ${
              mobilePageTab === "right"
                ? "bg-white text-black border-white shadow-md"
                : "bg-white/10 text-white/70 border-white/10 hover:text-white"
            }`}
          >
            {currentSpread.rightPage.pageNumber} • Blueprint
          </button>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            THE REALISTIC 3D OPEN HARDCOVER BOOK SPREAD
           ───────────────────────────────────────────────────────────── */}
        <div className="relative w-full h-[540px] xs:h-[580px] sm:h-[620px] md:h-[660px] rounded-2xl p-2.5 sm:p-4 bg-[#141414] border-2 border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.95)] flex items-stretch overflow-hidden select-none">
          
          {/* Outer Book Casing (Hardcover trim) */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none border border-white/10 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]" />

          {/* Central Silk Bookmark Ribbon */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-24 z-30 pointer-events-none drop-shadow-md hidden md:block"
            style={{
              background: "linear-gradient(to bottom, #FF5E00, #E64A00)",
              clipPath: "polygon(0% 0%, 100% 0%, 100% 85%, 50% 100%, 0% 85%)",
            }}
          />

          {/* The Two Open Pages (Left & Right Spreads) */}
          <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 rounded-xl overflow-hidden relative bg-[#F8F6F0] text-[#161514] shadow-2xl">
            
            {/* Center Book Spine Fold Shadow (Creates authentic 3D book depth) */}
            <div
              className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-10 z-20 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.06) 45%, rgba(0,0,0,0.06) 55%, rgba(0,0,0,0.3) 100%)",
              }}
            />

            {/* Left Page Shadow Vignette */}
            <div
              className="hidden md:block absolute top-0 bottom-0 left-0 w-8 z-10 pointer-events-none"
              style={{
                background: "linear-gradient(to right, rgba(0,0,0,0.12), transparent)",
              }}
            />

            {/* Right Page Shadow Vignette */}
            <div
              className="hidden md:block absolute top-0 bottom-0 right-0 w-8 z-10 pointer-events-none"
              style={{
                background: "linear-gradient(to left, rgba(0,0,0,0.12), transparent)",
              }}
            />

            {/* ─────────────────────────────────────────────────────────
                LEFT PAGE (Spread content)
               ───────────────────────────────────────────────────────── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`left-${spreadIndex}`}
                initial={{ opacity: 0, rotateY: flipDirection === "next" ? -8 : 8 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: flipDirection === "next" ? 8 : -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`p-5 sm:p-8 md:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#161514]/15 overflow-y-auto text-left relative ${
                  mobilePageTab === "left" ? "flex" : "hidden md:flex"
                }`}
              >
                {/* Page Folio Top Header */}
                <div>
                  <div className="flex items-center justify-between border-b border-[#161514]/15 pb-3 mb-6 font-mono text-[10px] text-[#161514]/60 uppercase tracking-widest font-semibold">
                    <span>{currentSpread.leftPage.chapter}</span>
                    <span>{currentSpread.leftPage.pageNumber}</span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#161514] font-bold tracking-tight leading-tight">
                    {currentSpread.leftPage.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#161514]/70 mt-1.5 font-medium leading-snug">
                    {currentSpread.leftPage.subtitle}
                  </p>

                  {/* Metadata Specs Bar */}
                  <div className="grid grid-cols-3 gap-2 my-5 p-3 rounded-lg bg-[#EFECE3] border border-[#161514]/10 font-mono text-[9px]">
                    {currentSpread.leftPage.meta.map((m, idx) => (
                      <div key={idx}>
                        <span className="text-[#161514]/50 block uppercase text-[8px] font-bold">{m.label}</span>
                        <span className="text-[#161514] font-bold truncate block">{m.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Body Paragraphs */}
                  <div className="space-y-3 font-sans text-xs sm:text-[13px] text-[#161514]/85 leading-relaxed font-normal">
                    {currentSpread.leftPage.bodyParagraphs.map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>

                  {/* Callout Invariant Box */}
                  {currentSpread.leftPage.callout && (
                    <div className="mt-5 p-3.5 rounded-lg bg-[#EAE5D9] border-l-4 border-[#FF5E00] text-left">
                      <span className="font-mono text-[10px] font-bold text-[#FF5E00] uppercase block">
                        {currentSpread.leftPage.callout.title}
                      </span>
                      <p className="font-sans text-xs text-[#161514]/90 mt-1 font-medium leading-snug">
                        {currentSpread.leftPage.callout.text}
                      </p>
                    </div>
                  )}
                </div>

                {/* Left Page Footer */}
                <div className="pt-6 border-t border-[#161514]/15 flex items-center justify-between font-mono text-[9px] text-[#161514]/50">
                  <span>SUJITH PUTTA // ARCHITECTURAL DOSSIER</span>
                  <span>{currentSpread.leftPage.pageNumber}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* ─────────────────────────────────────────────────────────
                RIGHT PAGE (Spread content)
               ───────────────────────────────────────────────────────── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`right-${spreadIndex}`}
                initial={{ opacity: 0, rotateY: flipDirection === "next" ? 8 : -8 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: flipDirection === "next" ? -8 : 8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`p-5 sm:p-8 md:p-10 flex flex-col justify-between overflow-y-auto text-left relative ${
                  mobilePageTab === "right" ? "flex" : "hidden md:flex"
                }`}
              >
                <div>
                  {/* Page Folio Top Header */}
                  <div className="flex items-center justify-between border-b border-[#161514]/15 pb-3 mb-6 font-mono text-[10px] text-[#161514]/60 uppercase tracking-widest font-semibold">
                    <span>{currentSpread.rightPage.chapter}</span>
                    <span>{currentSpread.rightPage.pageNumber}</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#161514] font-bold tracking-tight leading-tight">
                    {currentSpread.rightPage.title}
                  </h3>

                  {/* SPREAD 1: PIPELINE DIAGRAM STEPS */}
                  {currentSpread.rightPage.pipelineSteps && (
                    <div className="mt-5 space-y-2.5">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#161514]/60 font-bold block mb-1">
                        {currentSpread.rightPage.diagramTitle}
                      </span>
                      {currentSpread.rightPage.pipelineSteps.map((step, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-lg bg-[#EFECE3] border border-[#161514]/10 text-left flex items-start gap-3"
                        >
                          <span className="px-2 py-0.5 rounded font-mono text-[9px] font-bold bg-[#161514] text-white shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <div>
                            <span className="font-display font-bold text-xs text-[#161514] block">
                              {step.label}
                            </span>
                            <span className="font-sans text-[11px] text-[#161514]/75 leading-tight block mt-0.5">
                              {step.desc}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* SPREAD 2: METRICS & RETROSPECTIVE CARDS */}
                  {currentSpread.rightPage.metrics && (
                    <div className="grid grid-cols-3 gap-2.5 my-4">
                      {currentSpread.rightPage.metrics.map((m, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-lg bg-[#EFECE3] border border-[#161514]/10 text-center flex flex-col justify-between"
                        >
                          <span className="font-display font-black text-xl text-[#161514]">{m.value}</span>
                          <span className="font-mono text-[8px] uppercase tracking-wider text-[#161514]/60 font-bold mt-1 block">
                            {m.label}
                          </span>
                          <span className="font-sans text-[9px] text-[#161514]/75 mt-1 block leading-tight">
                            {m.note}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Takeaways */}
                  {currentSpread.rightPage.takeaways && (
                    <div className="mt-4 space-y-2">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#161514]/60 font-bold block">
                        ARCHITECTURAL TAKEAWAYS
                      </span>
                      {currentSpread.rightPage.takeaways.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-[#161514]/85 leading-snug">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack Pills */}
                  <div className="mt-5">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#161514]/60 font-bold block mb-2">
                      VERIFIED PRODUCTION STACK
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentSpread.rightPage.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-full font-mono text-[10px] font-semibold bg-[#EAE5D9] border border-[#161514]/15 text-[#161514]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* External Links / Action Buttons */}
                  {currentSpread.rightPage.links && (
                    <div className="mt-5 flex flex-wrap gap-2 pt-2 border-t border-[#161514]/15">
                      {currentSpread.rightPage.links.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`font-mono text-[11px] font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                            link.primary
                              ? "bg-[#161514] text-white hover:bg-[#FF5E00] shadow-md"
                              : "bg-[#EFECE3] text-[#161514] border border-[#161514]/20 hover:border-[#161514]"
                          }`}
                        >
                          <span>{link.label}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Page Footer with Page Turn Navigation */}
                <div className="pt-6 border-t border-[#161514]/15 flex items-center justify-between font-mono text-[9px] text-[#161514]/50">
                  <div className="flex items-center gap-2">
                    {spreadIndex < totalSpreads - 1 ? (
                      <button
                        onClick={handleNext}
                        className="text-[#FF5E00] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        Turn Page →
                      </button>
                    ) : (
                      <span className="text-emerald-700 font-bold">End of Dossier ✓</span>
                    )}
                  </div>
                  <span>{currentSpread.rightPage.pageNumber}</span>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

          {/* Book Edge Flap Navigation Buttons */}
          <button
            onClick={handlePrev}
            disabled={spreadIndex === 0}
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-[#181818]/90 border border-white/20 text-white flex items-center justify-center transition-all ${
              spreadIndex === 0 ? "opacity-20 cursor-not-allowed" : "hover:bg-white hover:text-black hover:scale-110 cursor-pointer shadow-xl"
            }`}
            title="Previous Page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            disabled={spreadIndex === totalSpreads - 1}
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-[#181818]/90 border border-white/20 text-white flex items-center justify-center transition-all ${
              spreadIndex === totalSpreads - 1
                ? "opacity-20 cursor-not-allowed"
                : "hover:bg-white hover:text-black hover:scale-110 cursor-pointer shadow-xl"
            }`}
            title="Next Page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

        {/* Bottom Helper Hint */}
        <div className="mt-3 text-center font-mono text-[10px] text-white/40">
          Use Keyboard Arrow Keys (← / →) to flip pages • Press ESC to close book
        </div>

      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 3. Main CaseStudy Component Matching Reference Image
// ─────────────────────────────────────────────────────────────
export default function CaseStudy() {
  const [selectedCaseId, setSelectedCaseId] = useState<CaseStudyId | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");

  const filterCategories = [
    { label: "SHOWCASE OF SELECTED PROJECT", key: "ALL" },
    { label: "AUTONOMOUS AI", key: "AUTONOMOUS AI" },
    { label: "EDGE SLM", key: "EDGE SLM" },
    { label: "3D & GRAPHICS", key: "3D & GRAPHICS" },
  ];

  return (
    <section id="casestudies" className="w-full px-2 sm:px-4 md:px-5 py-4 sm:py-6 scroll-mt-20 text-left select-none">
      <div className="editorial-frame w-full p-6 sm:p-10 md:p-12 relative overflow-hidden bg-[#0A0A0A]">
        
        {/* ─────────────────────────────────────────────────────────────
            EXACT REFERENCE HEADER (Image: Big Editorial Serif + Pill (03))
           ───────────────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6">
          {/* Left Title */}
          <div>
            <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight leading-none font-normal">
              Case Studies<sup className="font-sans text-xs sm:text-sm font-mono text-white/50 ml-1.5 top-[-1.5em] sm:top-[-2.2em] font-normal">(03)</sup>
            </h2>
          </div>

          {/* Right Editorial Subtitle */}
          <div className="max-w-md text-left md:text-right">
            <p className="font-sans text-xs sm:text-sm font-light text-white/70 leading-relaxed">
              Where high-end engineering meets deterministic AI. Explore how we transform ambitious ideas into resilient, production-grade digital architectures.
            </p>
          </div>
        </div>

        {/* Top Horizontal Clean Divider */}
        <div className="w-full h-[1px] bg-white/10 my-4 sm:my-6" />

        {/* ─────────────────────────────────────────────────────────────
            CATEGORY / FILTER PILL BAR (Matches Reference Image)
           ───────────────────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 sm:mb-10">
          {/* Left Primary Pill */}
          <div className="px-5 py-2 rounded-full bg-white text-black font-sans text-xs sm:text-xs font-bold uppercase tracking-wider shadow-md">
            SHOWCASE OF SELECTED PROJECT
          </div>

          {/* Right Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {filterCategories.slice(1).map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(activeFilter === f.key ? "ALL" : f.key)}
                className={`px-4 py-1.5 rounded-full font-sans text-[11px] uppercase tracking-wider transition-all cursor-pointer border ${
                  activeFilter === f.key
                    ? "bg-white text-black font-bold border-white"
                    : "bg-transparent text-white/70 border-white/20 hover:border-white/50 hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            3 COLUMN CARDS GRID (Matches Reference Image Exactly)
           ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">

          {/* ───────────────────────────────────────────────────────────
              CARD 1: ESA Autonomous Payment Engine (Matches Card 1)
             ─────────────────────────────────────────────────────────── */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedCaseId("esapay")}
            className="flex flex-col justify-between group cursor-pointer"
          >
            {/* Poster Card Container */}
            <div className="relative rounded-[2rem] border border-white/15 bg-[#0D0D0D] overflow-hidden aspect-[4/5] shadow-xl group-hover:border-white/35 transition-all">
              {/* Custom SVG Artwork */}
              <EsaAutonomousSvg />

              {/* Badges Stack Overlaid at Bottom Right (Matches Honey Ice Tee badges!) */}
              <div className="absolute bottom-5 right-5 flex flex-col items-end gap-2 pointer-events-none">
                <span className="px-3.5 py-1.5 rounded-full font-sans text-[10px] sm:text-[11px] font-bold bg-white text-[#111111] shadow-lg">
                  v1.0.5 ON NPM &amp; PYPI
                </span>
                <span className="px-3.5 py-1.5 rounded-full font-sans text-[10px] sm:text-[11px] font-bold bg-white text-[#111111] shadow-lg">
                  72.3% SLA IMPROVEMENT
                </span>
                <span className="px-3.5 py-1.5 rounded-full font-sans text-[10px] sm:text-[11px] font-bold bg-white text-[#111111] shadow-lg">
                  100% HARD SAFETY GATE
                </span>
              </div>
            </div>

            {/* Bottom Info Label (Matches Honey Ice Tee / See Detail) */}
            <div className="flex items-center justify-between pt-4 px-1">
              <span className="font-display font-medium text-sm sm:text-base text-white group-hover:text-[#FF5E00] transition-colors">
                ESA Autonomous Engine™
              </span>
              <span className="font-sans text-xs sm:text-sm text-white/80 group-hover:text-white flex items-center gap-1 font-medium underline underline-offset-4 decoration-white/40 group-hover:decoration-white transition-all">
                Read Book <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </motion.div>

          {/* ───────────────────────────────────────────────────────────
              CARD 2: CyberConstituent-SLM Phone Mockup (Matches Card 2)
             ─────────────────────────────────────────────────────────── */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedCaseId("cyberconstituent")}
            className="flex flex-col justify-between group cursor-pointer"
          >
            {/* Poster Card Container */}
            <div className="relative rounded-[2rem] border border-white/15 bg-[#0D0D0D] overflow-hidden aspect-[4/5] shadow-xl group-hover:border-white/35 transition-all">
              {/* Custom SVG Artwork (Phone on Perforated Mesh) */}
              <CyberConstituentPhoneSvg />

              {/* Badges Stack Overlaid at Bottom */}
              <div className="absolute bottom-5 right-5 flex flex-col items-end gap-2 pointer-events-none">
                <span className="px-3.5 py-1.5 rounded-full font-sans text-[10px] sm:text-[11px] font-bold bg-white text-[#111111] shadow-lg">
                  AIR-GAPPED SLM
                </span>
                <span className="px-3.5 py-1.5 rounded-full font-sans text-[10px] sm:text-[11px] font-bold bg-white text-[#111111] shadow-lg">
                  SUB-80MS FAISS RAG
                </span>
                <span className="px-3.5 py-1.5 rounded-full font-sans text-[10px] sm:text-[11px] font-bold bg-white text-[#111111] shadow-lg">
                  ZERO CLOUD LEAK
                </span>
              </div>
            </div>

            {/* Bottom Info Label */}
            <div className="flex items-center justify-between pt-4 px-1">
              <span className="font-display font-medium text-sm sm:text-base text-white group-hover:text-[#FF5E00] transition-colors">
                CyberConstituent-SLM™
              </span>
              <span className="font-sans text-xs sm:text-sm text-white/80 group-hover:text-white flex items-center gap-1 font-medium underline underline-offset-4 decoration-white/40 group-hover:decoration-white transition-all">
                Read Book <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </motion.div>

          {/* ───────────────────────────────────────────────────────────
              CARD 3: LumaForge Liquid Chrome Studio (Matches Card 3)
             ─────────────────────────────────────────────────────────── */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedCaseId("lumaforge")}
            className="flex flex-col justify-between group cursor-pointer"
          >
            {/* Poster Card Container */}
            <div className="relative rounded-[2rem] border border-white/15 bg-[#0D0D0D] overflow-hidden aspect-[4/5] shadow-xl group-hover:border-white/35 transition-all">
              {/* Custom SVG Artwork (Liquid Chrome Molten Metal) */}
              <LumaForgeLiquidChromeSvg />

              {/* Badges Stack Overlaid at Bottom */}
              <div className="absolute bottom-5 right-5 flex flex-col items-end gap-2 pointer-events-none">
                <span className="px-3.5 py-1.5 rounded-full font-sans text-[10px] sm:text-[11px] font-bold bg-white text-[#111111] shadow-lg">
                  GENERATIVE 3D ASSETS
                </span>
                <span className="px-3.5 py-1.5 rounded-full font-sans text-[10px] sm:text-[11px] font-bold bg-white text-[#111111] shadow-lg">
                  THREE.JS PIPELINE
                </span>
                <span className="px-3.5 py-1.5 rounded-full font-sans text-[10px] sm:text-[11px] font-bold bg-white text-[#111111] shadow-lg">
                  SUB-SEC LATENCY
                </span>
              </div>
            </div>

            {/* Bottom Info Label */}
            <div className="flex items-center justify-between pt-4 px-1">
              <span className="font-display font-medium text-sm sm:text-base text-white group-hover:text-[#FF5E00] transition-colors">
                LumaForge Studio™
              </span>
              <span className="font-sans text-xs sm:text-sm text-white/80 group-hover:text-white flex items-center gap-1 font-medium underline underline-offset-4 decoration-white/40 group-hover:decoration-white transition-all">
                Read Book <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </motion.div>

        </div>

        {/* Section Corner Index Footer */}
        <div className="mt-12 pt-6 border-t border-white/10 flex items-center justify-between text-white/40 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="text-xl font-display font-black text-white">09</span>
            <span className="uppercase tracking-widest text-[10px]">Architecture Dossiers &amp; Case Studies</span>
          </div>
          <span className="text-[10px] uppercase">Bangalore // Global Deployments</span>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          OPEN BOOK READER MODAL
         ───────────────────────────────────────────────────────────── */}
      {selectedCaseId && (
        <OpenBookReaderModal
          caseStudy={CASE_STUDIES[selectedCaseId]}
          onClose={() => setSelectedCaseId(null)}
        />
      )}
    </section>
  );
}
