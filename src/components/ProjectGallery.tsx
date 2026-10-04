"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { profileData } from "@/data/profile";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
  Terminal,
  Shield,
  Cpu,
  Layers,
  ExternalLink,
  Code,
  Ticket
} from "lucide-react";
import { LiquidGlassCard } from "@/components/LiquidGlassCard";
import LiquidGlassButton from "@/components/LiquidGlassButton";
import { ParallaxOrb } from "@/components/Parallax";

// ─────────────────────────────────────────────────────────────
// REALISTIC VECTOR BARCODE COMPONENT (From Image 4)
// ─────────────────────────────────────────────────────────────
function BarcodeGraphic({ code = "40181 700982", isDark = false }: { code?: string; isDark?: boolean }) {
  const bars = [
    3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 2, 3, 1, 4, 2, 1, 3, 2, 1, 4, 1, 3, 2, 1, 4, 2, 1, 3
  ];

  return (
    <div className="flex flex-col gap-1 select-none">
      <div className="flex items-stretch h-8 sm:h-9 gap-[2px]">
        {bars.map((w, idx) => (
          <div
            key={idx}
            className={`${isDark ? "bg-[#181818]" : "bg-white"}`}
            style={{ width: `${w}px` }}
          />
        ))}
      </div>
      <span className={`font-mono text-[9px] tracking-[0.22em] uppercase ${isDark ? "text-[#181818]/70" : "text-white/80"}`}>
        {code}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 1. DineInGo Interactive Reservation Simulator Widget
// ─────────────────────────────────────────────────────────────
function DineInGoWidget() {
  const [bookingStep, setBookingStep] = useState<"idle" | "loading" | "success">("idle");
  const [selectedTime, setSelectedTime] = useState("08:00 PM");

  const handleBook = () => {
    setBookingStep("loading");
    setTimeout(() => {
      setBookingStep("success");
    }, 1200);
  };

  return (
    <div className="w-full bg-[#121212]/95 border border-white/10 p-4 rounded-2xl flex flex-col justify-between h-[235px] font-sans text-xs text-white">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <span className="font-mono text-[9px] text-[#FF5E00] uppercase font-bold tracking-wider">
          DINEINGO RESERVATION SYSTEM
        </span>
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      </div>

      {bookingStep === "idle" && (
        <div className="flex flex-col justify-between flex-1 pt-2">
          <div className="space-y-1">
            <label className="text-white/50 text-[9px] uppercase font-mono">Select Table Type</label>
            <select className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#FF5E00] text-[11px] cursor-pointer">
              <option className="bg-[#181818]">Window Booth (2 Guests)</option>
              <option className="bg-[#181818]">Main Dining Room (4 Guests)</option>
              <option className="bg-[#181818]">Outdoor Terrace (6 Guests)</option>
              <option className="bg-[#181818]">Chef&apos;s Counter (1 Guest)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-white/50 text-[9px] uppercase font-mono">Available Time Slots</label>
            <div className="grid grid-cols-3 gap-1.5">
              {["07:00 PM", "08:00 PM", "09:00 PM"].map((t) => (
                <LiquidGlassButton
                  key={t}
                  onClick={() => setSelectedTime(t)}
                  variant={selectedTime === t ? "orange" : "crystal"}
                  size="sm"
                  className="!py-1 !rounded !text-[10px]"
                >
                  {t}
                </LiquidGlassButton>
              ))}
            </div>
          </div>

          <LiquidGlassButton
            onClick={handleBook}
            variant="orange"
            size="sm"
            className="w-full mt-2 !py-1.5 !rounded-lg text-xs font-bold shadow-[0_0_12px_rgba(255,94,0,0.4)]"
          >
            Confirm Reservation
          </LiquidGlassButton>
        </div>
      )}

      {bookingStep === "loading" && (
        <div className="flex-1 flex flex-col items-center justify-center gap-3">
          <div className="w-6 h-6 border-2 border-[#FF5E00] border-t-transparent rounded-full animate-spin" />
          <span className="text-white/60 font-mono text-[9px] uppercase">Securing session token...</span>
        </div>
      )}

      {bookingStep === "success" && (
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-2">
          <div className="w-8 h-8 bg-emerald-500/20 border border-emerald-500 rounded-full flex items-center justify-center text-emerald-400 font-bold">
            ✓
          </div>
          <span className="font-bold text-white text-sm">Table Confirmed!</span>
          <p className="text-[10px] text-white/60 font-mono">
            Booking secured for {selectedTime}. Firebase session synced.
          </p>
          <LiquidGlassButton
            onClick={() => setBookingStep("idle")}
            variant="crystal"
            size="sm"
            className="mt-1 !py-0.5 !px-2.5 !text-[10px] font-mono text-[#FF5E00]"
          >
            New Reservation
          </LiquidGlassButton>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 2. NEXORA Hybrid RAG Simulator Widget
// ─────────────────────────────────────────────────────────────
function NEXORAWidget() {
  const [pipelineStep, setPipelineStep] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>([
    "NEXORA v1.4 // SECURE OFFLINE SYSTEM STANDBY",
    "Air-gapped database connected (FAISS vector store, Neo4j graphs)"
  ]);

  const runRAG = (query: string, ans: string) => {
    if (pipelineStep > 0 && pipelineStep < 5) return;
    setPipelineStep(1);
    setLogs([
      `visitor@nexora:~$ query-rag --secure "${query}"`,
      "Initializing hybrid query analyzer..."
    ]);

    setTimeout(() => {
      setPipelineStep(2);
      setLogs(prev => [...prev, "✔ [FAISS]: Scanned dense index space (Similarity: 0.96)"]);
    }, 600);

    setTimeout(() => {
      setPipelineStep(3);
      setLogs(prev => [...prev, "✔ [Neo4j]: Relationship graph resolved. Semantic nodes matched."]);
    }, 1200);

    setTimeout(() => {
      setPipelineStep(4);
      setLogs(prev => [...prev, "✔ [LLaMA 3]: Sovereign local inference compiled in 24ms."]);
    }, 1800);

    setTimeout(() => {
      setPipelineStep(5);
      setLogs(prev => [
        ...prev,
        "✔ [RBAC]: Role privileges verified. Security barrier cleared.",
        `RESULT: ${ans}`
      ]);
    }, 2400);
  };

  return (
    <div className="w-full bg-[#0B0D17]/95 border border-[#3B82F6]/30 rounded-2xl p-4 flex flex-col justify-between h-[235px] font-mono text-[9px] text-white">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <span className="font-mono text-[9px] text-[#00E5FF] uppercase font-bold tracking-wider">
          NEXORA SOVEREIGN RAG ENGINE
        </span>
        <span className="text-emerald-400 text-[8px] font-bold">AIR-GAPPED</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-1.5 my-2 pr-1 max-h-[110px] scrollbar-none">
        {logs.map((log, i) => {
          const isResult = log.startsWith("RESULT:");
          const isCommand = log.startsWith("visitor@nexora");
          const isCheck = log.startsWith("✔");
          return (
            <div
              key={i}
              className={
                isResult
                  ? "text-[#00F0FF] font-bold border-l-2 border-[#00F0FF] pl-1.5 mt-1"
                  : isCommand
                  ? "text-[#FF5E00]"
                  : isCheck
                  ? "text-sky-300 font-semibold"
                  : "text-white/60"
              }
            >
              {log}
            </div>
          );
        })}
      </div>

      <div className="bg-white/5 rounded-lg border border-white/10 p-1.5 mb-2 flex items-center justify-between text-[7px] text-white/50 tracking-wider">
        <span className={pipelineStep >= 1 ? "text-[#00F0FF] font-bold" : ""}>FAISS</span>
        <span>→</span>
        <span className={pipelineStep >= 2 ? "text-purple-300 font-bold" : ""}>NEO4J</span>
        <span>→</span>
        <span className={pipelineStep >= 3 ? "text-sky-300 font-bold" : ""}>LLAMA3</span>
        <span>→</span>
        <span className={pipelineStep >= 4 ? "text-emerald-400 font-bold" : ""}>RBAC</span>
      </div>

      <div className="border-t border-white/10 pt-1.5 flex gap-2">
        <LiquidGlassButton
          onClick={() => runRAG("F16 wing stress anomaly", "Anomaly localized at joint L24. Struct fatigue: 12%. Check mandated.")}
          disabled={pipelineStep > 0 && pipelineStep < 5}
          variant="crystal"
          size="sm"
          className="flex-1 !justify-start !text-left !py-1 !px-2 !rounded !text-[8px] truncate"
        >
          &gt; Query F16 Structural logs
        </LiquidGlassButton>
        <LiquidGlassButton
          onClick={() => runRAG("Access permissions audit", "Access Approved. Authenticated via RBAC Level 2 Clearance.")}
          disabled={pipelineStep > 0 && pipelineStep < 5}
          variant="crystal"
          size="sm"
          className="flex-1 !justify-start !text-left !py-1 !px-2 !rounded !text-[8px] truncate"
        >
          &gt; Run RBAC clearance test
        </LiquidGlassButton>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 3. LifeFlow AI Workflow Verification Simulator Widget
// ─────────────────────────────────────────────────────────────
function LifeFlowWidget() {
  const [selectedTemplate, setSelectedTemplate] = useState<"hospital" | "passport">("hospital");
  const [steps, setSteps] = useState([
    { id: 1, text: "Upload National ID & Health Card", completed: true, verified: true },
    { id: 2, text: "Complete Admission Form-A", completed: false, verified: false },
    { id: 3, text: "Obtain Insurance Pre-Auth Token", completed: false, verified: false }
  ]);
  const [verifyStatus, setVerifyStatus] = useState<"idle" | "verifying" | "verified">("idle");

  const templates = {
    hospital: [
      { id: 1, text: "Upload National ID & Health Card", completed: true, verified: true },
      { id: 2, text: "Complete Admission Form-A", completed: false, verified: false },
      { id: 3, text: "Obtain Insurance Pre-Auth Token", completed: false, verified: false }
    ],
    passport: [
      { id: 1, text: "Biometric Appointment Booking", completed: true, verified: true },
      { id: 2, text: "Upload Resident Address Verification", completed: false, verified: false },
      { id: 3, text: "Submit Digital Signature Check", completed: false, verified: false }
    ]
  };

  const handleTemplateChange = (t: "hospital" | "passport") => {
    setSelectedTemplate(t);
    setSteps(templates[t]);
    setVerifyStatus("idle");
  };

  const toggleStep = (id: number) => {
    if (id === 1) return;
    setSteps(prev =>
      prev.map(step =>
        step.id === id ? { ...step, completed: !step.completed, verified: false } : step
      )
    );
    setVerifyStatus("idle");
  };

  const runVerification = () => {
    setVerifyStatus("verifying");
    setTimeout(() => {
      setSteps(prev =>
        prev.map(step => (step.completed ? { ...step, verified: true } : step))
      );
      setVerifyStatus("verified");
    }, 1100);
  };

  return (
    <div className="w-full bg-[#081816]/95 border border-[#10B981]/30 rounded-2xl p-4 flex flex-col justify-between h-[235px] font-sans text-xs text-white">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <span className="font-mono text-[9px] text-[#10B981] uppercase font-bold tracking-wider">
          LIFEFLOW AI WORKFLOW VALIDATOR
        </span>
        <span className="text-[9px] text-white/50 font-mono">DEEPSEEK R1 + GPT-4o</span>
      </div>

      <div className="space-y-1.5 flex-1 pt-1.5">
        <div className="grid grid-cols-2 gap-1.5">
          <LiquidGlassButton
            onClick={() => handleTemplateChange("hospital")}
            variant={selectedTemplate === "hospital" ? "lime" : "crystal"}
            size="sm"
            className="!py-1 !rounded font-mono !text-[9px]"
          >
            Hospital Admission
          </LiquidGlassButton>
          <LiquidGlassButton
            onClick={() => handleTemplateChange("passport")}
            variant={selectedTemplate === "passport" ? "lime" : "crystal"}
            size="sm"
            className="!py-1 !rounded font-mono !text-[9px]"
          >
            Passport Application
          </LiquidGlassButton>
        </div>

        <div className="space-y-1">
          {steps.map((step) => (
            <div
              key={step.id}
              onClick={() => toggleStep(step.id)}
              className="flex items-center justify-between p-1.5 rounded-lg border border-white/10 bg-white/5 text-[9px] cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <input
                  type="checkbox"
                  checked={step.completed}
                  onChange={() => {}}
                  className="rounded accent-[#10B981] pointer-events-none"
                />
                <span className={step.completed ? "text-white" : "text-white/40 line-through"}>
                  {step.text}
                </span>
              </div>
              {step.completed && (
                <span className={`text-[7px] font-mono px-1 py-0.2 rounded ${
                  step.verified ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300 animate-pulse"
                }`}>
                  {step.verified ? "VERIFIED" : "PENDING"}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 pt-2">
        {verifyStatus !== "verified" ? (
          <LiquidGlassButton
            onClick={runVerification}
            disabled={verifyStatus === "verifying"}
            variant="lime"
            size="sm"
            className="w-full !py-1.5 !rounded-lg !text-[10px] font-bold text-black"
          >
            {verifyStatus === "verifying" ? "Validating Submissions..." : "Run AI Case Verification"}
          </LiquidGlassButton>
        ) : (
          <div className="text-center text-[9px] font-mono text-emerald-400 font-bold">
            ✓ Complete Workflow Checklist Validated
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 4. Spitch AI Assistant Voice Simulator Widget
// ─────────────────────────────────────────────────────────────
function SpitchWidget() {
  const [status, setStatus] = useState<string>("Standing by. Say a command or tap a shortcut.");
  const [pulse, setPulse] = useState(false);

  const runCommand = (cmd: string, reply: string) => {
    setPulse(true);
    setStatus(`Hearing: "${cmd}"`);
    setTimeout(() => {
      setStatus(`Spitch: "${reply}"`);
      setPulse(false);
    }, 1500);
  };

  return (
    <div className="w-full bg-[#0C061A]/95 border border-[#8B5CF6]/30 rounded-2xl p-4 flex flex-col justify-between h-[235px] font-sans text-xs text-white">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <span className="font-mono text-[9px] text-[#A78BFA] uppercase font-bold tracking-wider">
          SPITCH LOCAL DESKTOP CORE
        </span>
        <span className={`w-2 h-2 rounded-full ${pulse ? "bg-purple-400 animate-ping" : "bg-emerald-400 animate-pulse"}`} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center py-2">
        <div
          onClick={() => runCommand("Scan active display", "I see your portfolio compiling with 0 errors!")}
          className={`w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xl cursor-pointer transition-transform ${
            pulse ? "scale-110 border-purple-400 shadow-[0_0_15px_rgba(167,139,250,0.5)]" : ""
          }`}
        >
          🎙️
        </div>
        <p className="text-[9px] font-mono text-center text-white/70 px-2 mt-2 min-h-[22px]">
          {status}
        </p>
      </div>

      <div className="border-t border-white/10 pt-2 grid grid-cols-3 gap-1">
        <LiquidGlassButton
          onClick={() => runCommand("Gemini Vision Scan", "Scanned viewport: React component tree checks out.")}
          variant="crystal"
          size="sm"
          className="!py-1 !rounded !text-[8px] font-mono"
        >
          👁️ Vision
        </LiquidGlassButton>
        <LiquidGlassButton
          onClick={() => runCommand("Launch Selenium", "Chrome headless node dispatched.")}
          variant="crystal"
          size="sm"
          className="!py-1 !rounded !text-[8px] font-mono"
        >
          🌐 Selenium
        </LiquidGlassButton>
        <LiquidGlassButton
          onClick={() => runCommand("Play Spotify track", "Spotify window focus secure.")}
          variant="crystal"
          size="sm"
          className="!py-1 !rounded !text-[8px] font-mono"
        >
          🎵 Spotify
        </LiquidGlassButton>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 5. ESA Autonomous Payment Resilience Simulator Widget
// ─────────────────────────────────────────────────────────────
function ESAWidget() {
  const [phase, setPhase] = useState<"healthy" | "surge" | "diagnosing" | "failover" | "resolved">("healthy");
  const [activeGateway, setActiveGateway] = useState<"Razorpay" | "PhonePe">("Razorpay");
  const [p95Latency, setP95Latency] = useState<number>(84);
  const [logs, setLogs] = useState<string[]>([
    "ESA v1.0.5 // CONTROL PLANE OPERATIONAL",
    "Stream: 250ms cadence • Razorpay Primary (P95: 84ms) • 0 Violations"
  ]);

  const triggerSpike = () => {
    if (phase !== "healthy" && phase !== "resolved") return;
    setPhase("surge");
    setP95Latency(342);
    setLogs([
      "⚡ [SURGE DETECTED]: Razorpay UPI bank rail timeout spike (>250ms SLA).",
      "Queue Backlog: 520 req/s. Initiating multi-signal stream ingestion..."
    ]);

    setTimeout(() => {
      setPhase("diagnosing");
      setLogs((prev) => [
        ...prev,
        "🧠 [4-Agent Loop]: Diagnosis confirmed upstream bank outage (NOT CPU).",
        "Planning proposed: SHIFT_ROUTE(Razorpay → PhonePe) + REPLICA(+2)."
      ]);
    }, 700);

    setTimeout(() => {
      setPhase("failover");
      setLogs((prev) => [
        ...prev,
        "🛡️ [Rust Safety Gate]: Validated OCC token v482 & policy invariants.",
        "⚡ [Action Gateway]: Atomic route shift to PhonePe executed in 1.2ms."
      ]);
      setActiveGateway("PhonePe");
      setP95Latency(146);
    }, 1500);

    setTimeout(() => {
      setPhase("resolved");
      setLogs((prev) => [
        ...prev,
        "✔ [Resolved in 4.1s]: P95 dropped to 146ms. 0 checkout failures.",
        "📜 Merkle Audit: Block #1092 SHA-256 committed (0x7f4e...89a2)."
      ]);
    }, 2300);
  };

  const resetState = () => {
    setPhase("healthy");
    setActiveGateway("Razorpay");
    setP95Latency(84);
    setLogs([
      "ESA v1.0.5 // CONTROL PLANE OPERATIONAL",
      "Stream: 250ms cadence • Razorpay Primary (P95: 84ms) • 0 Violations"
    ]);
  };

  return (
    <div className="w-full bg-[#080B14]/95 border border-[#1F51FF]/40 rounded-2xl p-4 flex flex-col justify-between h-[235px] font-mono text-[9px] text-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#1F51FF] animate-pulse" />
          <span className="font-mono text-[9px] text-[#4D88FF] uppercase font-bold tracking-wider">
            ESA RESILIENCE ENGINE
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[7px] bg-[#1F51FF]/20 text-[#60A5FA] border border-[#1F51FF]/40 px-1.5 py-0.5 rounded font-mono">
            RUST SAFETY GATE
          </span>
          <span className="text-[7px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-1.5 py-0.5 rounded font-mono font-bold">
            &lt;2ms SLA
          </span>
        </div>
      </div>

      {/* Corridor & Metric Status Bar */}
      <div className="grid grid-cols-3 gap-1.5 my-1.5 text-center">
        <div className="bg-white/5 border border-white/10 rounded p-1">
          <span className="text-[7px] text-white/50 uppercase block">Corridor</span>
          <span className={`font-bold text-[9px] truncate block ${activeGateway === "PhonePe" ? "text-emerald-400" : "text-[#4D88FF]"}`}>
            {activeGateway} {activeGateway === "PhonePe" ? "(Failover)" : "(Primary)"}
          </span>
        </div>
        <div className="bg-white/5 border border-white/10 rounded p-1">
          <span className="text-[7px] text-white/50 uppercase block">P95 Tail Latency</span>
          <span className={`font-bold text-[9px] block ${p95Latency > 250 ? "text-red-400 animate-pulse" : "text-emerald-400"}`}>
            {p95Latency} ms {p95Latency > 250 ? "(!SLA)" : "(SLA <250)"}
          </span>
        </div>
        <div className="bg-white/5 border border-white/10 rounded p-1">
          <span className="text-[7px] text-white/50 uppercase block">Safety Gate</span>
          <span className="font-bold text-[9px] text-emerald-400 block">
            0 / 650 Violations
          </span>
        </div>
      </div>

      {/* Action / Stream Log */}
      <div className="flex-1 overflow-y-auto space-y-1 my-1 pr-1 max-h-[70px] scrollbar-none text-[8px]">
        {logs.map((log, i) => {
          const isSurge = log.includes("SURGE") || log.includes("timeout");
          const isRust = log.includes("Rust Safety Gate") || log.includes("Action Gateway");
          const isResolved = log.includes("Resolved") || log.includes("Merkle");
          const isAgent = log.includes("4-Agent Loop");
          return (
            <div
              key={i}
              className={
                isSurge
                  ? "text-red-400 font-semibold"
                  : isRust
                  ? "text-[#60A5FA] font-bold"
                  : isResolved
                  ? "text-emerald-400 font-bold"
                  : isAgent
                  ? "text-purple-300"
                  : "text-white/60"
              }
            >
              {log}
            </div>
          );
        })}
      </div>

      {/* Interactive Controls */}
      <div className="border-t border-white/10 pt-1.5 flex items-center gap-1.5">
        {phase === "healthy" ? (
          <LiquidGlassButton
            onClick={triggerSpike}
            variant="crystal"
            size="sm"
            className="flex-1 !py-1 !px-2 !rounded text-[8px] font-bold text-sky-400 border-sky-500/30 flex items-center justify-center gap-1"
          >
            <span>⚡ Trigger UPI Bank Outage & Auto-Remediate</span>
          </LiquidGlassButton>
        ) : phase === "resolved" ? (
          <div className="flex-1 flex items-center justify-between">
            <span className="text-emerald-400 font-bold text-[8px] flex items-center gap-1">
              ✓ 72.3% Failure Window Cut (4.1s)
            </span>
            <LiquidGlassButton
              onClick={resetState}
              variant="crystal"
              size="sm"
              className="!py-0.5 !px-2 !rounded text-[8px] font-bold"
            >
              Reset Stream
            </LiquidGlassButton>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center gap-2 py-0.5 text-[8px] text-[#60A5FA]">
            <div className="w-2.5 h-2.5 border-2 border-[#1F51FF] border-t-transparent rounded-full animate-spin" />
            <span className="uppercase font-bold">
              {phase === "surge"
                ? "Streaming Anomaly Ingest..."
                : phase === "diagnosing"
                ? "4-Agent Deliberation..."
                : "Rust Action Gateway Executing..."}
            </span>
          </div>
        )}

        <a
          href="https://github.com/sujithputta02/Esapay"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/5 hover:bg-white/10 border border-white/10 py-1 px-2 rounded text-[8px] text-white/70 hover:text-white transition-colors"
          title="Inspect repository"
        >
          CLI: npx esapay-cli
        </a>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SHOWCASE PROJECTS DEFINITION
// ─────────────────────────────────────────────────────────────
interface ShowcaseItem {
  id: string;
  name: string;
  signature: string;
  punchline: string;
  style: string;
  type: string;
  barcode: string;
  theme: "cream" | "blue";
  desc: string;
  liveLink?: string;
  githubLink?: string;
  tags: string[];
  widget: React.ReactNode;
}

const showcaseItems: ShowcaseItem[] = [
  {
    id: "esapay",
    name: "ESA",
    signature: "Esapay",
    punchline: "AUTONOMOUS PAYMENT INFRASTRUCTURE RESILIENCE.",
    style: "Neuro-Symbolic & Rust Safety",
    type: "Autonomous Incident Engine",
    barcode: "84729 019284",
    theme: "blue",
    desc: "Autonomous incident remediation engine for payment gateways: neuro-symbolic and LLM agents diagnose multi-signal failures and propose joint recovery actions, while a deterministic Rust safety gate ensures zero unverified mutations.",
    liveLink: "https://esapay.vercel.app",
    githubLink: "https://github.com/sujithputta02/Esapay",
    tags: ["Rust", "Python", "TypeScript", "Ollama Llama 3.2", "Axum", "Razorpay"],
    widget: <ESAWidget />
  },
  {
    id: "dineingo",
    name: "DineInGo",
    signature: "DineInGo",
    punchline: "ZERO-LATENCY TABLE RESERVATION PLATFORM.",
    style: "Full-Stack Microservices",
    type: "Production SaaS Engine",
    barcode: "40181 700982",
    theme: "cream",
    desc: "Comprehensive restaurant reservation system with 3D AR menu previews, dynamic floor plans, and real-time Socket.IO synchronization.",
    liveLink: "https://dine-in-go.vercel.app",
    githubLink: "https://github.com/sujithputta02/DineInGo",
    tags: ["React 18", "TypeScript", "Node.js", "MongoDB", "Socket.IO", "Firebase"],
    widget: <DineInGoWidget />
  },
  {
    id: "nexora",
    name: "NEXORA",
    signature: "Nexora RAG",
    punchline: "SOVEREIGN AIR-GAPPED AEROSPACE INTELLIGENCE.",
    style: "Deep Learning & Graph Vector",
    type: "Air-Gapped Hybrid RAG",
    barcode: "08081 982279",
    theme: "blue",
    desc: "Offline RAG intelligence system processing sensitive queries across dense FAISS vector spaces and Neo4j relational graph networks with sub-second latency.",
    githubLink: "https://github.com/sujithputta02/Nexora",
    tags: ["Python", "FastAPI", "FAISS", "Neo4j", "Ollama LLaMA 3", "RBAC"],
    widget: <NEXORAWidget />
  },
  {
    id: "lifeflow",
    name: "LifeFlow",
    signature: "LifeFlow AI",
    punchline: "AUTONOMOUS ADMINISTRATIVE WORKFLOW NAVIGATION.",
    style: "Multi-Model Agent RAG",
    type: "Microsoft Imagine Cup 2026",
    barcode: "92834 110293",
    theme: "cream",
    desc: "Navigates complex real-world processes (hospital admissions, paperwork) through step-by-step interactive workflows powered by DeepSeek R1 and Azure AI.",
    liveLink: "https://lifeflow-webapp-c2e7habzdmc3bpbr.southeastasia-01.azurewebsites.net/",
    githubLink: "https://github.com/sujithputta02/LifeFlow-AI",
    tags: ["Next.js 15", "React 19", "Three.js", "DeepSeek R1", "Azure Search"],
    widget: <LifeFlowWidget />
  },
  {
    id: "spitch",
    name: "Spitch AI",
    signature: "Spitch Desktop",
    punchline: "LOCAL MULTIMODAL JARVIS-LEVEL DESKTOP ASSISTANT.",
    style: "Offline Vision & Speech",
    type: "Desktop System Engine",
    barcode: "55102 384729",
    theme: "blue",
    desc: "Local desktop assistant combining Ollama offline models and Google Gemini Vision for multimodal chat, automated Selenium browsing, and voice waveforms.",
    githubLink: "https://github.com/sujithputta02/Spitch-AI-Assistant",
    tags: ["Python", "Ollama", "Gemini Vision", "Selenium", "Eel Bridge"],
    widget: <SpitchWidget />
  }
];

function HorizontalTicketRibbon({ item, idx }: { item: (typeof showcaseItems)[0]; idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-40px" });
  const isBlue = item.theme === "blue";

  return (
    <motion.div
      ref={cardRef}
      data-ticket-card
      initial={{ opacity: 0, y: 35 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
      className={`group rounded-[28px] sm:rounded-[36px] shadow-[0_25px_60px_rgba(0,0,0,0.6)] border border-black/10 relative overflow-hidden flex flex-col lg:flex-row items-stretch select-none transition-all duration-500 hover:shadow-[0_30px_70px_rgba(0,0,0,0.7)] ${
        isBlue
          ? "bg-[#1254F5] text-white"
          : "bg-[#F3EFE9] text-[#121212]"
      }`}
    >
      {/* ─────────────────────────────────────────────────────────────
          1. MAIN TICKET BODY (LEFT ~60% ON DESKTOP)
         ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 p-6 sm:p-8 md:p-10 flex flex-col justify-between gap-6">
        
        {/* Brand Header: Cursive signature + Specimen Pill */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className={`font-signature text-3xl sm:text-4xl lg:text-5xl leading-none ${isBlue ? "text-white" : "text-[#121212]"}`}>
              {item.signature}
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse hidden xs:inline-block" />
          </div>

          <div className="flex items-center gap-2">
            <span className={`font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border ${
              isBlue ? "border-white/30 text-white/90 bg-white/10" : "border-black/20 text-black/80 bg-black/5"
            }`}>
              SPECIMEN 0{idx + 1}
            </span>
            <span className={`font-mono text-[9px] uppercase px-2.5 py-1 rounded-full border hidden sm:inline-block ${
              isBlue ? "border-white/20 text-white/70" : "border-black/15 text-black/60"
            }`}>
              PASS VERIFIED
            </span>
          </div>
        </div>

        {/* Editorial Punchline & Description */}
        <div className="space-y-3">
          <h3 className={`font-display font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight leading-[0.98] ${
            isBlue ? "text-white" : "text-[#121212]"
          }`}>
            {item.punchline}
          </h3>
          <p className={`font-sans text-xs sm:text-sm leading-relaxed font-light max-w-2xl ${
            isBlue ? "text-white/80" : "text-[#121212]/75"
          }`}>
            {item.desc}
          </p>
        </div>

        {/* 4-Column Technical Specification Matrix */}
        <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t text-xs font-sans ${
          isBlue ? "border-white/15" : "border-black/10"
        }`}>
          <div>
            <span className={`font-mono text-[8px] sm:text-[9px] uppercase tracking-wider block font-bold ${
              isBlue ? "text-white/60" : "text-black/50"
            }`}>
              STYLE
            </span>
            <span className="font-bold text-xs sm:text-sm leading-tight block truncate mt-0.5">
              {item.style}
            </span>
          </div>

          <div>
            <span className={`font-mono text-[8px] sm:text-[9px] uppercase tracking-wider block font-bold ${
              isBlue ? "text-white/60" : "text-black/50"
            }`}>
              NAME
            </span>
            <span className="font-bold text-xs sm:text-sm leading-tight block truncate mt-0.5">
              {item.name}
            </span>
          </div>

          <div>
            <span className={`font-mono text-[8px] sm:text-[9px] uppercase tracking-wider block font-bold ${
              isBlue ? "text-white/60" : "text-black/50"
            }`}>
              TYPE
            </span>
            <span className="font-bold text-xs sm:text-sm leading-tight block truncate mt-0.5">
              {item.type}
            </span>
          </div>

          <div>
            <span className={`font-mono text-[8px] sm:text-[9px] uppercase tracking-wider block font-bold ${
              isBlue ? "text-white/60" : "text-black/50"
            }`}>
              STATUS
            </span>
            <span className="font-bold text-xs sm:text-sm leading-tight block text-emerald-500 mt-0.5">
              ● Production Ready
            </span>
          </div>
        </div>

        {/* Barcode & Tags Ribbon Footer */}
        <div className={`pt-4 border-t flex flex-col sm:flex-row sm:items-end justify-between gap-4 ${
          isBlue ? "border-white/15" : "border-black/10"
        }`}>
          <div className="flex items-center gap-4">
            <BarcodeGraphic code={item.barcode} isDark={!isBlue} />
            <div className="hidden md:block font-mono text-[8px] uppercase tracking-widest opacity-60 leading-tight">
              <span>BOARDING PASS // TICKET 0{idx + 1}</span><br />
              <span>SERIES 2026 // BENGALURU</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {item.tags.slice(0, 4).map((tag, tIdx) => (
              <span
                key={tIdx}
                className={`font-mono text-[9px] px-2.5 py-1 rounded-full border ${
                  isBlue
                    ? "border-white/20 bg-white/10 text-white/90"
                    : "border-black/15 bg-black/5 text-black/80"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. PERFORATED TEAR SEAM (AUTHENTIC TICKET RIBBON PERFORATION)
         ───────────────────────────────────────────────────────────── */}
      {/* Desktop Vertical Perforation */}
      <div className="relative hidden lg:flex flex-col items-center justify-between w-8 shrink-0 self-stretch my-[-1px] pointer-events-none">
        {/* Top Circular Notch Cutout */}
        <div className="w-8 h-8 rounded-full bg-[#060606] absolute -top-4 left-1/2 -translate-x-1/2 z-20 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)]" />
        
        {/* Vertical Dashed Perforation Line */}
        <div className={`w-0 h-full border-r-2 border-dashed ${isBlue ? "border-white/30" : "border-black/25"}`} />

        {/* Micro-text running along perforation */}
        <span className={`absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 font-mono text-[7px] uppercase tracking-[0.3em] whitespace-nowrap [writing-mode:vertical-rl] rotate-180 opacity-40 select-none ${
          isBlue ? "text-white" : "text-black"
        }`}>
          TEAR ALONG PERFORATION ✂ SPECIMEN {idx + 1}
        </span>

        {/* Bottom Circular Notch Cutout */}
        <div className="w-8 h-8 rounded-full bg-[#060606] absolute -bottom-4 left-1/2 -translate-x-1/2 z-20 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]" />
      </div>

      {/* Mobile Horizontal Perforation (< lg) */}
      <div className="relative flex lg:hidden items-center justify-center w-full h-8 shrink-0 mx-[-1px] pointer-events-none">
        {/* Left Circular Notch Cutout */}
        <div className="w-8 h-8 rounded-full bg-[#060606] absolute -left-4 top-1/2 -translate-y-1/2 z-20 shadow-[inset_-2px_0_4px_rgba(0,0,0,0.6)]" />

        {/* Horizontal Dashed Perforation Line */}
        <div className={`h-0 w-full border-b-2 border-dashed ${isBlue ? "border-white/30" : "border-black/25"}`} />

        {/* Right Circular Notch Cutout */}
        <div className="w-8 h-8 rounded-full bg-[#060606] absolute -right-4 top-1/2 -translate-y-1/2 z-20 shadow-[inset_2px_0_4px_rgba(0,0,0,0.6)]" />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. TICKET STUB (RIGHT ~40% ON DESKTOP: LIVE TESTBENCH & DISPATCH)
         ───────────────────────────────────────────────────────────── */}
      <div className={`lg:w-[440px] xl:w-[480px] 2xl:w-[520px] shrink-0 p-6 sm:p-8 flex flex-col justify-between gap-4 relative ${
        isBlue ? "bg-black/15" : "bg-black/[0.04]"
      }`}>
        
        {/* Stub Header */}
        <div className={`flex items-center justify-between border-b pb-3 text-xs font-mono ${
          isBlue ? "border-white/15" : "border-black/10"
        }`}>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isBlue ? "bg-[#00F0FF]" : "bg-[#FF5E00]"} animate-pulse`} />
            <span className={`text-[10px] uppercase font-bold tracking-widest ${
              isBlue ? "text-white/90" : "text-black/80"
            }`}>
              TESTBENCH STUB // ENGINE
            </span>
          </div>

          <span className={`text-[9px] uppercase px-2 py-0.5 rounded border ${
            isBlue ? "border-white/20 text-white/70" : "border-black/15 text-black/60"
          }`}>
            INTERACTIVE
          </span>
        </div>

        {/* Embedded Interactive Live Simulation */}
        <div className="rounded-2xl overflow-hidden border border-black/10 shadow-xl my-auto">
          {item.widget}
        </div>

        {/* Stub Action Buttons Row */}
        <div className={`flex items-center justify-between gap-3 pt-3 border-t ${
          isBlue ? "border-white/15" : "border-black/10"
        }`}>
          <span className={`font-mono text-[9px] uppercase tracking-wider ${
            isBlue ? "text-white/50" : "text-black/40"
          }`}>
            STUB ID: #{item.id.toUpperCase()}-0{idx + 1}
          </span>

          <div className="flex items-center gap-2">
            {item.githubLink && (
              <a
                href={item.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                  isBlue
                    ? "bg-white/15 hover:bg-white text-white hover:text-black"
                    : "bg-black/10 hover:bg-black text-black hover:text-white"
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>Code</span>
              </a>
            )}

            {item.liveLink && (
              <a
                href={item.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                  isBlue
                    ? "bg-white text-black hover:bg-white/90 shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                    : "bg-[#121212] text-white hover:bg-black shadow-[0_0_15px_rgba(0,0,0,0.3)]"
                }`}
              >
                <span>Live Site</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

      </div>

    </motion.div>
  );
}

export default function ProjectGallery() {
  const [fannedIndex, setFannedIndex] = useState(0);
  const [activeRibbonIdx, setActiveRibbonIdx] = useState(0);
  const ribbonTrackRef = useRef<HTMLDivElement>(null);

  const handlePrevFan = () => {
    setFannedIndex((prev) => (prev - 1 + showcaseItems.length) % showcaseItems.length);
  };

  const handleNextFan = () => {
    setFannedIndex((prev) => (prev + 1) % showcaseItems.length);
  };

  const scrollToTicket = (index: number) => {
    setActiveRibbonIdx(index);
    if (!ribbonTrackRef.current) return;
    const cards = ribbonTrackRef.current.querySelectorAll<HTMLElement>("[data-ticket-card]");
    if (cards[index]) {
      cards[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  const handlePrevRibbon = () => {
    const nextIdx = (activeRibbonIdx - 1 + showcaseItems.length) % showcaseItems.length;
    scrollToTicket(nextIdx);
  };

  const handleNextRibbon = () => {
    const nextIdx = (activeRibbonIdx + 1) % showcaseItems.length;
    scrollToTicket(nextIdx);
  };

  const handleRibbonScroll = () => {
    if (!ribbonTrackRef.current) return;
    const container = ribbonTrackRef.current;
    const scrollLeft = container.scrollLeft;
    const cards = container.querySelectorAll<HTMLElement>("[data-ticket-card]");
    let closestIdx = 0;
    let minDiff = Infinity;
    cards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const viewCenter = scrollLeft + container.clientWidth / 2;
      const diff = Math.abs(cardCenter - viewCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });
    if (closestIdx !== activeRibbonIdx) {
      setActiveRibbonIdx(closestIdx);
    }
  };

  const galleryRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.001,
  });

  const fannedDeckY = useTransform(smoothScroll, [0, 0.55], [35, -20]);
  const ribbonDeckY = useTransform(smoothScroll, [0.35, 1], [30, -25]);

  return (
    <section id="showcase" ref={galleryRef} className="w-full px-2 sm:px-4 md:px-5 py-4 sm:py-6 flex flex-col gap-10 text-left relative overflow-hidden">

      {/* ─────────────────────────────────────────────────────────────
          SECTION FRAME 1: OVERLAPPING FANNED CARD CAROUSEL (Image 3)
         ───────────────────────────────────────────────────────────── */}
      <div className="editorial-frame w-full p-6 sm:p-10 md:p-12 relative overflow-hidden">
        {/* Parallax Depth Orb */}
        <ParallaxOrb color="#00F0FF" speed={0.35} size={380} top="15%" right="-8%" opacity={0.1} />

        {/* Frame Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8 font-mono text-xs text-white/50 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
            <span className="uppercase tracking-widest text-white/70">
              FEATURED WORKS // FANNED CARD DECK
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span>Slide 0{fannedIndex + 1} / 0{showcaseItems.length}</span>
            <div className="w-16 h-1.5 rounded-full spectrum-pill" />
          </div>
        </div>

        {/* Title */}
        <div className="mb-10 text-center sm:text-left relative z-10">
          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl text-white tracking-tight leading-none font-normal">
            Featured Systems<sup className="font-sans text-xs sm:text-sm font-mono text-white/50 ml-1.5 top-[-1.5em] sm:top-[-2.2em] font-normal">(03)</sup>
          </h2>
          <p className="font-sans text-sm sm:text-base text-white/60 mt-3 max-w-xl font-light">
            Interactive fanned showcase deck. Click any card in the stack to rotate and inspect its production parameters.
          </p>
        </div>

        {/* 3D FANNED CAROUSEL STACK CONTAINER (Matches Image 3) */}
        <motion.div
          style={{ y: fannedDeckY }}
          className="relative w-full h-[480px] sm:h-[540px] flex items-center justify-center perspective-carousel select-none my-4"
        >
          
          {/* Controls */}
          <LiquidGlassCard
            onClick={handlePrevFan}
            className="absolute left-2 sm:left-6 z-40 p-3 rounded-full text-white hover:text-[#FF5E00] transition-all shadow-[0_10px_25px_rgba(0,0,0,0.8)] cursor-pointer flex items-center justify-center border border-white/20"
            options={{ radius: 999, scale: -120, chroma: 6, border: 0.08, mapBlur: 8, blur: 0, fallbackBlur: 0 }}
            aria-label="Previous card"
            role="button"
          >
            <ChevronLeft className="w-5 h-5" />
          </LiquidGlassCard>

          <LiquidGlassCard
            onClick={handleNextFan}
            className="absolute right-2 sm:right-6 z-40 p-3 rounded-full text-white hover:text-[#FF5E00] transition-all shadow-[0_10px_25px_rgba(0,0,0,0.8)] cursor-pointer flex items-center justify-center border border-white/20"
            options={{ radius: 999, scale: -120, chroma: 6, border: 0.08, mapBlur: 8, blur: 0, fallbackBlur: 0 }}
            aria-label="Next card"
            role="button"
          >
            <ChevronRight className="w-5 h-5" />
          </LiquidGlassCard>

          {/* Fanned Cards Deck */}
          <div className="relative w-full max-w-[340px] sm:max-w-[400px] h-[440px] sm:h-[480px] flex items-center justify-center">
            {showcaseItems.map((item, idx) => {
              const diff = (idx - fannedIndex + showcaseItems.length) % showcaseItems.length;
              const isActive = diff === 0;
              const isRight = diff === 1;
              const isLeft = diff === showcaseItems.length - 1;

              let x = 0;
              let rotate = 0;
              let scale = 1;
              let zIndex = 30;
              let opacity = 1;

              if (isActive) {
                x = 0;
                rotate = 0;
                scale = 1.0;
                zIndex = 30;
                opacity = 1;
              } else if (isRight) {
                x = 120;
                rotate = 6;
                scale = 0.92;
                zIndex = 20;
                opacity = 0.85;
              } else if (isLeft) {
                x = -120;
                rotate = -6;
                scale = 0.92;
                zIndex = 20;
                opacity = 0.85;
              } else {
                x = 0;
                rotate = 0;
                scale = 0.8;
                zIndex = 10;
                opacity = 0;
              }

              return (
                <motion.div
                  key={item.id}
                  animate={{ x, rotate, scale, zIndex, opacity }}
                  transition={{ type: "spring", stiffness: 240, damping: 24 }}
                  onClick={() => setFannedIndex(idx)}
                  className={`absolute inset-0 rounded-[32px] border-4 border-white overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.85)] cursor-pointer flex flex-col justify-between p-6 sm:p-8 ${
                    item.theme === "blue" ? "bg-[#1254F5] text-white" : "bg-[#EDE8DF] text-[#151413]"
                  }`}
                >
                  {/* Top card brand & signature */}
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-widest font-bold opacity-70 block mb-1">
                        {item.style}
                      </span>
                      <span className="font-signature text-3xl sm:text-4xl leading-none">
                        {item.signature}
                      </span>
                    </div>

                    <span className="font-mono text-xs font-black px-2.5 py-1 rounded-full border border-current opacity-70">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Bold condensed editorial headline (like "BETTER TOGETHER." in Image 3) */}
                  <div className="my-auto py-4">
                    <h3 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight leading-[0.95]">
                      {item.punchline}
                    </h3>
                    <p className="font-sans text-xs mt-3 opacity-80 leading-relaxed font-light line-clamp-3">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom tags & action */}
                  <div className="border-t border-current/20 pt-4 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.slice(0, 3).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="font-mono text-[8px] px-2 py-0.5 rounded-full border border-current/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <span>Inspect</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </motion.div>

        {/* Frame Footer */}
        <div className="border-t border-white/10 mt-6 pt-6 flex items-center justify-between text-white/40 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="text-xl font-display font-black text-white">34</span>
            <span className="uppercase tracking-widest text-[10px]">Overlapping Fanned Card Carousel</span>
          </div>
          <span className="text-[10px] uppercase">Designed to Wow</span>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION FRAME 2: HORIZONTAL SPECIMEN TICKET RIBBON
         ───────────────────────────────────────────────────────────── */}
      <div className="editorial-frame w-full p-6 sm:p-10 md:p-12 relative overflow-hidden">
        {/* Parallax Orbs for Multi-plane Depth */}
        <ParallaxOrb color="#FF5E00" speed={-0.3} size={360} top="15%" left="-6%" opacity={0.08} />
        <ParallaxOrb color="#00F0FF" speed={0.35} size={340} top="65%" right="-8%" opacity={0.07} />
        
        {/* Frame Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8 font-mono text-xs text-white/50 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF5E00] animate-pulse" />
            <span className="uppercase tracking-widest text-white/70">
              SPECIMEN LABELS // HORIZONTAL TICKET RIBBON
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden xs:inline">Ticket 0{activeRibbonIdx + 1} of 0{showcaseItems.length}</span>
            <div className="w-16 h-1.5 rounded-full spectrum-pill" />
          </div>
        </div>

        {/* Title & Quick Controls */}
        <div className="mb-8 text-center sm:text-left flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
          <div>
            <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl text-white tracking-tight leading-none font-normal">
              Product Specimen Tickets<sup className="font-sans text-xs sm:text-sm font-mono text-white/50 ml-1.5 top-[-1.5em] sm:top-[-2.2em] font-normal">(04)</sup>
            </h2>
            <p className="font-sans text-sm sm:text-base text-white/60 mt-3 max-w-2xl font-light">
              Crafted as continuous horizontal boarding pass ticket ribbons: perforated tear seams, signature brand stamps, live interactive testbenches, and technical barcodes.
            </p>
          </div>

          {/* Quick Ribbon Navigation Controls */}
          <div className="flex items-center gap-2 self-center sm:self-start md:self-end shrink-0">
            <LiquidGlassButton
              onClick={handlePrevRibbon}
              aria-label="Previous ticket"
              size="sm"
              variant="crystal"
              className="p-3 rounded-full"
            >
              <ChevronLeft className="w-4 h-4" />
            </LiquidGlassButton>
            <div className="font-mono text-xs text-white/60 px-3.5 py-2 rounded-full border border-white/10 bg-white/5 flex items-center gap-2 select-none">
              <Ticket className="w-3.5 h-3.5 text-[#FF5E00]" />
              <span>0{activeRibbonIdx + 1} / 0{showcaseItems.length}</span>
            </div>
            <LiquidGlassButton
              onClick={handleNextRibbon}
              aria-label="Next ticket"
              size="sm"
              variant="crystal"
              className="p-3 rounded-full"
            >
              <ChevronRight className="w-4 h-4" />
            </LiquidGlassButton>
          </div>
        </div>

        {/* TICKET RIBBON TABS SELECTOR */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none relative z-10">
          {showcaseItems.map((item, idx) => {
            const isActive = activeRibbonIdx === idx;
            return (
              <LiquidGlassButton
                key={item.id}
                onClick={() => scrollToTicket(idx)}
                size="sm"
                variant={isActive ? "white" : "crystal"}
                className={`font-mono text-xs px-4 py-2 rounded-full whitespace-nowrap shrink-0 ${
                  isActive ? "text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.35)]" : "text-white/70"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-[#FF5E00]" : "bg-white/30"}`} />
                <span>0{idx + 1} // {item.name.toUpperCase()}</span>
                <span className="opacity-50 text-[10px]">({item.style.split("&")[0].trim()})</span>
              </LiquidGlassButton>
            );
          })}
        </div>

        {/* HORIZONTAL CONTINUOUS TICKET RIBBON TRACK WITH PARALLAX */}
        <motion.div
          style={{ y: ribbonDeckY }}
          ref={ribbonTrackRef}
          onScroll={handleRibbonScroll}
          className="w-full flex flex-row overflow-x-auto snap-x snap-mandatory gap-6 sm:gap-8 pb-8 pt-2 scrollbar-none scroll-smooth select-none cursor-grab active:cursor-grabbing relative z-10"
        >
          {showcaseItems.map((item, idx) => (
            <div
              key={item.id}
              className="w-[92vw] sm:w-[88vw] lg:w-[94%] xl:w-[92%] 2xl:w-[88%] max-w-[1240px] shrink-0 snap-center"
            >
              <HorizontalTicketRibbon item={item} idx={idx} />
            </div>
          ))}
        </motion.div>

        {/* RIBBON FOOTER WITH PERFORATION HINT & CONTROLS */}
        <div className="border-t border-white/10 mt-6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/40 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="text-xl font-display font-black text-white">35</span>
            <div className="flex flex-col">
              <span className="uppercase tracking-widest text-[10px] text-white/70">
                Continuous Horizontal Ticket Ribbon
              </span>
              <span className="text-[9px] text-white/40">
                Perforated specimen series · Sujith Putta Architecture
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase text-white/50 hidden md:inline">
              [ Drag or scroll horizontally to tear through ribbon ]
            </span>
            <div className="flex items-center gap-1.5 ml-2">
              {showcaseItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToTicket(idx)}
                  aria-label={`Jump to ticket ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    activeRibbonIdx === idx ? "w-6 bg-[#FF5E00]" : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
