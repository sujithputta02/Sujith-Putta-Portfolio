"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profileData } from "@/data/profile";
import { Terminal, Shield, Cpu, Activity, Award, ChevronLeft, ChevronRight, BookOpen, Database, Lock } from "lucide-react";

// DineInGo Reservation Simulator
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
    <div className="w-full bg-[#151514]/90 border border-white/10 p-5 rounded-2xl flex flex-col gap-3 font-sans text-xs">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <span className="font-mono text-[9px] text-[#C7FF3D] uppercase font-bold">DINEINGO RESERVATION SYSTEM</span>
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>

      {bookingStep === "idle" && (
        <>
          <div className="space-y-1">
            <label className="text-[#A3A3A3] text-[9px] uppercase font-mono">Select Table Type</label>
            <select className="w-full bg-[#1C1C1A] border border-white/10 text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#C7FF3D] text-[11px] cursor-pointer">
              <option>Window Booth (2 Guests)</option>
              <option>Main Dining Room (4 Guests)</option>
              <option>Outdoor Terrace (6 Guests)</option>
              <option>Chef's Counter (1 Guest)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[#A3A3A3] text-[9px] uppercase font-mono">Available Time Slots</label>
            <div className="grid grid-cols-3 gap-1.5">
              {["07:00 PM", "08:00 PM", "09:00 PM"].map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTime(t)}
                  className={`py-1 rounded text-[10px] border transition-all cursor-pointer ${selectedTime === t
                      ? "border-[#C7FF3D] text-[#C7FF3D] bg-[#C7FF3D]/5"
                      : "border-white/10 text-white/60 hover:border-white/25"
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleBook}
            className="w-full mt-2 bg-[#C7FF3D] text-[#111111] font-bold py-2 rounded-lg hover:bg-white transition-colors text-xs cursor-pointer"
          >
            Confirm Reservation
          </button>
        </>
      )}

      {bookingStep === "loading" && (
        <div className="py-8 flex flex-col items-center justify-center gap-3">
          <div className="w-6 h-6 border-2 border-[#C7FF3D] border-t-transparent rounded-full animate-spin" />
          <span className="text-[#A3A3A3] font-mono text-[9px] uppercase">Securing session token...</span>
        </div>
      )}

      {bookingStep === "success" && (
        <div className="py-6 flex flex-col items-center justify-center text-center gap-2">
          <div className="w-8 h-8 bg-emerald-500/20 border border-emerald-500 rounded-full flex items-center justify-center text-emerald-400">
            ✓
          </div>
          <span className="font-bold text-white text-sm">Table Confirmed!</span>
          <p className="text-[10px] text-[#A3A3A3] font-mono">
            Booking secured for {selectedTime}. Firebase session synced.
          </p>
          <button
            onClick={() => setBookingStep("idle")}
            className="mt-2 text-[10px] text-[#C7FF3D] underline font-mono cursor-pointer"
          >
            New Reservation
          </button>
        </div>
      )}
    </div>
  );
}

// NEXORA Hybrid RAG Simulator
function NEXORAWidget() {
  const [activeQuery, setActiveQuery] = useState<string | null>(null);
  const [pipelineStep, setPipelineStep] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>([
    "NEXORA v1.4 // SECURE OFFLINE SYSTEM STANDBY",
    "Air-gapped database connected (FAISS vector store, Neo4j graphs)"
  ]);

  const runRAG = (query: string, ans: string) => {
    if (pipelineStep > 0 && pipelineStep < 5) return;
    setActiveQuery(query);
    setPipelineStep(1);
    setLogs([
      `visitor@nexora:~$ query-rag --secure "${query}"`,
      "Initializing hybrid query analyzer..."
    ]);

    // Step 1: FAISS Search
    setTimeout(() => {
      setPipelineStep(2);
      setLogs(prev => [...prev, "✔ [FAISS]: Scanned dense index space (Similarity: 0.96)"]);
    }, 700);

    // Step 2: Neo4j validation
    setTimeout(() => {
      setPipelineStep(3);
      setLogs(prev => [...prev, "✔ [Neo4j]: Relationship graph resolved. Semantic nodes matched."]);
    }, 1400);

    // Step 3: LLaMA 3 local compilation
    setTimeout(() => {
      setPipelineStep(4);
      setLogs(prev => [...prev, "✔ [LLaMA 3]: Sovereign local inference compiled in 24ms."]);
    }, 2100);

    // Step 4: RBAC gate audit
    setTimeout(() => {
      setPipelineStep(5);
      setLogs(prev => [
        ...prev,
        "✔ [RBAC]: Role privileges verified. Security barrier cleared.",
        `RESULT: ${ans}`
      ]);
    }, 2800);
  };

  return (
    <div className="w-full bg-[#0d0f1a]/95 border border-[#6c5dd3]/20 rounded-2xl p-4 flex flex-col justify-between h-[230px] font-mono text-[9px] relative overflow-hidden">
      {/* Console Display */}
      <div className="flex-1 overflow-y-auto space-y-1.5 scrollbar-dark pr-1 mb-2 max-h-[110px]">
        {logs.map((log, i) => {
          const isResult = log.startsWith("RESULT:");
          const isCommand = log.startsWith("visitor@nexora");
          const isCheck = log.startsWith("✔");
          return (
            <div
              key={i}
              className={
                isResult
                  ? "text-[#C7FF3D] font-bold border-l border-[#C7FF3D] pl-1.5 mt-1"
                  : isCommand
                    ? "text-[#C7FF3D]"
                    : isCheck
                      ? "text-purple-300 font-semibold"
                      : "text-white/60"
              }
            >
              {log}
            </div>
          );
        })}
        {pipelineStep > 0 && pipelineStep < 5 && (
          <div className="text-[#C7FF3D] animate-pulse flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF3D] animate-ping" />
            Processing RAG Pipeline...
          </div>
        )}
      </div>

      {/* Visual Pipeline flow chart */}
      <div className="bg-white/5 rounded-lg border border-white/5 p-1.5 mb-2 flex items-center justify-between text-[7px] text-white/50 tracking-wider">
        <span className={pipelineStep >= 1 ? "text-[#C7FF3D] font-bold" : ""}>FAISS</span>
        <span>→</span>
        <span className={pipelineStep >= 2 ? "text-purple-300 font-bold" : ""}>NEO4J</span>
        <span>→</span>
        <span className={pipelineStep >= 3 ? "text-indigo-300 font-bold" : ""}>LLAMA3</span>
        <span>→</span>
        <span className={pipelineStep >= 4 ? "text-emerald-400 font-bold" : ""}>RBAC</span>
      </div>

      {/* Action buttons */}
      <div className="border-t border-white/5 pt-2 flex flex-col gap-1 flex-shrink-0">
        <button
          onClick={() =>
            runRAG(
              "F16 wing stress anomaly",
              "Anomaly localized at joint L24. Struct fatigue: 12%. Check mandated."
            )
          }
          disabled={pipelineStep > 0 && pipelineStep < 5}
          className="text-left bg-white/5 hover:bg-[#C7FF3D]/10 hover:text-[#C7FF3D] border border-white/10 hover:border-[#C7FF3D]/30 py-1 px-2 rounded transition-colors cursor-pointer disabled:opacity-50 text-[8px]"
        >
          &gt; Query F16 Structural logs
        </button>
        <button
          onClick={() =>
            runRAG(
              "Access permissions audit",
              "Access Approved. Authenticated via RBAC Level 2 Clearance."
            )
          }
          disabled={pipelineStep > 0 && pipelineStep < 5}
          className="text-left bg-white/5 hover:bg-[#C7FF3D]/10 hover:text-[#C7FF3D] border border-white/10 hover:border-[#C7FF3D]/30 py-1 px-2 rounded transition-colors cursor-pointer disabled:opacity-50 text-[8px]"
        >
          &gt; Run RBAC clearance test
        </button>
      </div>
    </div>
  );
}

// LifeFlow Checklist & AI Verification Simulator
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
      { id: 3, text: "Submit Digital Signature & Photo Check", completed: false, verified: false }
    ]
  };

  const handleTemplateChange = (t: "hospital" | "passport") => {
    setSelectedTemplate(t);
    setSteps(templates[t]);
    setVerifyStatus("idle");
  };

  const toggleStep = (id: number) => {
    if (id === 1) return; // keep first step verified for demo
    setSteps(prev =>
      prev.map(step =>
        step.id === id
          ? { ...step, completed: !step.completed, verified: false }
          : step
      )
    );
    setVerifyStatus("idle");
  };

  const runVerification = () => {
    setVerifyStatus("verifying");
    setTimeout(() => {
      setSteps(prev =>
        prev.map(step =>
          step.completed ? { ...step, verified: true } : step
        )
      );
      setVerifyStatus("verified");
    }, 1200);
  };

  return (
    <div className="w-full bg-[#151514]/90 border border-white/10 rounded-2xl p-4 flex flex-col gap-3 font-sans text-xs">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <span className="font-mono text-[9px] text-[#C7FF3D] uppercase font-bold">LIFEFLOW WORKFLOW GENERATOR</span>
        <span className="text-[9px] text-[#A3A3A3] font-mono">MODEL: GPT-4o</span>
      </div>

      {/* Select Flow Template */}
      <div className="space-y-1">
        <label className="text-[#A3A3A3] text-[8px] uppercase font-mono tracking-wider">Select Administrative Goal</label>
        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={() => handleTemplateChange("hospital")}
            className={`py-1 rounded text-[10px] font-mono border transition-all cursor-pointer ${selectedTemplate === "hospital"
                ? "border-[#C7FF3D] text-[#C7FF3D] bg-[#C7FF3D]/5"
                : "border-white/10 text-white/50 hover:border-white/20"
              }`}
          >
            Hospital Admission
          </button>
          <button
            onClick={() => handleTemplateChange("passport")}
            className={`py-1 rounded text-[10px] font-mono border transition-all cursor-pointer ${selectedTemplate === "passport"
                ? "border-[#C7FF3D] text-[#C7FF3D] bg-[#C7FF3D]/5"
                : "border-white/10 text-white/50 hover:border-white/20"
              }`}
          >
            Passport Application
          </button>
        </div>
      </div>

      {/* Interactive Checklist steps */}
      <div className="space-y-1.5">
        <span className="text-[#A3A3A3] text-[8px] uppercase font-mono tracking-wider">Interactive Checklist</span>
        <div className="space-y-1">
          {steps.map((step) => (
            <div
              key={step.id}
              onClick={() => toggleStep(step.id)}
              className={`flex items-center justify-between p-2 rounded-lg border transition-all text-[10px] cursor-pointer ${step.completed
                  ? "bg-white/5 border-white/10 text-white"
                  : "bg-[#1C1C1A]/50 border-white/5 text-white/40 hover:border-white/10"
                }`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={step.completed}
                  onChange={() => { }} // handled by onClick
                  className="rounded border-white/20 accent-[#C7FF3D] pointer-events-none"
                />
                <span className={step.completed ? "" : "line-through opacity-50"}>{step.text}</span>
              </div>

              {step.completed && (
                <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded ${step.verified
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse"
                  }`}>
                  {step.verified ? "VERIFIED" : "PENDING"}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Verification Action */}
      <div className="border-t border-white/5 pt-2 flex flex-col gap-2">
        {verifyStatus === "idle" && (
          <button
            onClick={runVerification}
            className="w-full bg-[#C7FF3D] text-[#111111] font-bold py-1.5 rounded-lg hover:bg-white transition-colors text-[10px] cursor-pointer"
          >
            Run AI Case Verification
          </button>
        )}

        {verifyStatus === "verifying" && (
          <div className="flex items-center justify-center gap-2 py-1 text-[9px] font-mono text-white/50">
            <div className="w-3.5 h-3.5 border border-[#C7FF3D] border-t-transparent rounded-full animate-spin" />
            <span>Scanning submissions & verifying documents...</span>
          </div>
        )}

        {verifyStatus === "verified" && (
          <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-lg p-2 text-center flex flex-col gap-0.5">
            <span className="text-[10px] font-bold text-emerald-400 flex items-center justify-center gap-1">
              ✓ Flow Checklist Validated
            </span>
            <p className="text-[8px] font-mono text-[#A3A3A3]">
              AI verified all complete tasks. Safe to download offline PDF.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// RunaGen AI Career Companion Simulator
function RunaGenWidget() {
  const [state, setState] = useState<"upload" | "loading" | "result">("upload");
  const [progress, setProgress] = useState(0);

  const handleUpload = () => {
    setState("loading");
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setState("result");
          return 100;
        }
        return p + 25;
      });
    }, 450);
  };

  return (
    <div className="w-full bg-[#0d131f]/95 border border-[#3b82f6]/20 rounded-2xl p-4 flex flex-col justify-between h-[230px] font-sans text-xs">
      <div className="flex items-center justify-between border-b border-white/5 pb-2 flex-shrink-0">
        <span className="font-mono text-[9px] text-[#C7FF3D] uppercase font-bold">RUNAGEN AI COMPANION</span>
        <span className="text-[9px] text-[#C7FF3D] font-mono">● GEMINI 2.5</span>
      </div>

      {state === "upload" && (
        <div className="flex-1 flex flex-col justify-between pt-3">
          <div className="border border-dashed border-white/10 hover:border-[#3b82f6]/40 bg-white/5 rounded-xl p-3 flex flex-col items-center justify-center text-center cursor-pointer transition-colors" onClick={handleUpload}>
            <span className="text-xl">📄</span>
            <span className="text-[10px] text-white/80 font-mono mt-1">drag & drop resume here</span>
            <span className="text-[8px] text-white/45 mt-0.5">PDF, Word, or JPG formats</span>
          </div>
          <button
            onClick={handleUpload}
            className="w-full bg-[#C7FF3D] text-[#111111] font-bold py-1.5 rounded-lg hover:bg-white transition-colors text-[10px] cursor-pointer"
          >
            Start Auto-Analysis
          </button>
        </div>
      )}

      {state === "loading" && (
        <div className="flex-1 flex flex-col items-center justify-center gap-3">
          <div className="w-6 h-6 border-2 border-[#3b82f6] border-t-transparent rounded-full animate-spin" />
          <div className="text-center space-y-1">
            <span className="text-[9px] font-mono text-white/60 block uppercase">Vertex AI semantic indexing...</span>
            <div className="w-32 bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#C7FF3D] h-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      )}

      {state === "result" && (
        <div className="flex-1 flex flex-col justify-between pt-2">
          <div className="bg-white/5 border border-white/5 p-2 rounded-xl text-[9px] space-y-1.5 font-mono text-white/85">
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="text-white">Detected Role:</span>
              <span className="text-[#C7FF3D] font-bold">Full Stack Engineer</span>
            </div>
            <div className="flex justify-between">
              <span>Match Score:</span>
              <span className="text-emerald-400">92% Match</span>
            </div>
            <div className="flex justify-between text-white/55 text-[8px]">
              <span>Skills Gap:</span>
              <span className="text-amber-400">GCP Vertex, TypeScript</span>
            </div>
          </div>

          <button
            onClick={() => setState("upload")}
            className="w-full mt-1.5 bg-white/10 hover:bg-white/15 text-white py-1 rounded text-[9px] font-mono transition-colors cursor-pointer"
          >
            ← Analyze New Profile
          </button>
        </div>
      )}
    </div>
  );
}

// Spitch AI Assistant Simulator
function SpitchWidget() {
  const [status, setStatus] = useState<string>("Standing by. Say a command or select a shortcut.");
  const [activeAction, setActiveAction] = useState<"none" | "vision" | "selenium" | "spotify">("none");
  const [pulse, setPulse] = useState(false);

  const runAction = (type: "vision" | "selenium" | "spotify", text: string, response: string) => {
    if (activeAction !== "none") return;
    setActiveAction(type);
    setPulse(true);
    setStatus(`Hearing: "${text}"`);

    // Step 1: Processing
    setTimeout(() => {
      if (type === "vision") {
        setStatus("Spitch: Capturing active display and running Gemini Vision 1.5 scan...");
      } else if (type === "selenium") {
        setStatus("Spitch: Initializing Selenium node (flashing violet-cyan-rose border active)...");
      } else {
        setStatus("Spitch: Querying Spotify desktop registry and playing song tracks...");
      }
    }, 900);

    // Step 2: Final Response
    setTimeout(() => {
      setStatus(`Spitch: "${response}"`);
      setPulse(false);
      setActiveAction("none");
    }, 3000);
  };

  return (
    <div className="w-full bg-[#0a0c16]/95 border border-[#7b2cbf]/20 rounded-2xl p-4 flex flex-col justify-between h-[230px] font-sans text-xs">
      <div className="flex items-center justify-between border-b border-white/5 pb-2 flex-shrink-0">
        <span className="font-mono text-[9px] text-[#C7FF3D] uppercase font-bold">SPITCH ASSISTANT CORE</span>
        <span className={`w-2 h-2 rounded-full ${pulse ? "bg-purple-500 animate-ping" : "bg-emerald-500 animate-pulse"}`} />
      </div>

      {/* Voice Waveform pulsing visual */}
      <div className="flex-1 flex flex-col justify-center items-center py-2 relative">
        <div className={`w-11 h-11 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 flex items-center justify-center text-lg cursor-pointer transition-colors shadow-lg ${pulse ? "scale-110 border-purple-500 shadow-purple-500/10" : ""
          }`}
          onClick={() => runAction("vision", "Take a screenshot and tell me what's on my screen", "I see a web browser showing your developer portfolio page. Everything is compiling clean!")}
        >
          🎙️
        </div>

        {/* Soundwave lines */}
        <div className="flex items-center gap-1.5 mt-3 h-4">
          {[0.6, 1.2, 0.4, 1.4, 0.8].map((scale, i) => (
            <div
              key={i}
              className="w-0.5 bg-gradient-to-t from-purple-500 to-[#C7FF3D] rounded-full transition-all duration-300"
              style={{
                height: pulse ? "100%" : "30%",
                transform: pulse ? `scaleY(${scale + Math.random() * 0.4})` : "none"
              }}
            />
          ))}
        </div>

        <p className="text-[9px] font-mono text-center text-white/70 px-2 mt-2 leading-relaxed min-h-[24px]">
          {status}
        </p>
      </div>

      {/* Interactive skill shortcuts */}
      <div className="border-t border-white/5 pt-2 grid grid-cols-3 gap-1 flex-shrink-0">
        <button
          onClick={() => runAction("vision", "Analyze current screenshot", "I scanned the display: React components layout checks out. UI metrics verified.")}
          disabled={activeAction !== "none"}
          className="bg-white/5 hover:bg-purple-950/20 border border-white/10 text-white/80 py-1 rounded text-[8px] transition-colors cursor-pointer text-center font-mono disabled:opacity-50 text-[8px]"
        >
          👁️ vision
        </button>
        <button
          onClick={() => runAction("selenium", "Open browser and go to google.com", "Selenium launched Chrome. Spitch border overlay initialized. Completed.")}
          disabled={activeAction !== "none"}
          className="bg-white/5 hover:bg-purple-950/20 border border-white/10 text-white/80 py-1 rounded text-[8px] transition-colors cursor-pointer text-center font-mono disabled:opacity-50 text-[8px]"
        >
          🌐 selenium
        </button>
        <button
          onClick={() => runAction("spotify", "Play Singari song on Spotify", "Spotify window focus secure. Play command dispatched for Singari song.")}
          disabled={activeAction !== "none"}
          className="bg-white/5 hover:bg-purple-950/20 border border-white/10 text-white/80 py-1 rounded text-[8px] transition-colors cursor-pointer text-center font-mono disabled:opacity-50 text-[8px]"
        >
          🎵 music
        </button>
      </div>
    </div>
  );
}

// MuseVerse Gallery Curator Simulator
function MuseVerseWidget() {
  const [topic, setTopic] = useState<string>("Ancient Egyptian Astronomy");
  const [curationState, setCurationState] = useState<"idle" | "curating" | "exhibition">("idle");
  const [currentAgent, setCurrentAgent] = useState<string>("");

  const runCuration = () => {
    setCurationState("curating");

    const agentsSequence = [
      "TopicIntakeAgent: Enriched keyword semantic nodes...",
      "ResearchAgent: Pulled 14 Google Search fact indexes...",
      "ExhibitGeneratorAgent: Structured 8 historical exhibits...",
      "AccessibilityAgent: Compiled English, Arabic & French captions...",
      "ImageGeneratorAgent: Compressed Gemini Nano Banana base64 frames...",
      "EvaluatorAgent: Computed overall quality score: 88.4% (Approved!)"
    ];

    let step = 0;
    setCurrentAgent(agentsSequence[0]);

    const interval = setInterval(() => {
      step++;
      if (step < agentsSequence.length) {
        setCurrentAgent(agentsSequence[step]);
      } else {
        clearInterval(interval);
        setCurationState("exhibition");
      }
    }, 600);
  };

  return (
    <div className="w-full bg-[#1c1917]/95 border border-[#b45309]/20 rounded-2xl p-4 flex flex-col justify-between h-[230px] font-sans text-xs">
      <div className="flex items-center justify-between border-b border-white/5 pb-2 flex-shrink-0">
        <span className="font-mono text-[9px] text-[#C7FF3D] uppercase font-bold">MUSEVERSE curation matrix</span>
        <span className="text-[9px] text-[#b45309] font-mono font-bold">14 AGENTS ACTIVE</span>
      </div>

      {curationState === "idle" && (
        <div className="flex-1 flex flex-col justify-between pt-3 text-left">
          <div className="space-y-1">
            <label className="text-white/50 text-[8px] uppercase font-mono tracking-wider">exhibition prompt</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#C7FF3D] text-[10px] font-mono"
            />
          </div>
          <button
            onClick={runCuration}
            className="w-full bg-[#C7FF3D] text-[#111111] font-bold py-1.5 rounded-lg hover:bg-white transition-colors text-[10px] cursor-pointer"
          >
            Curate Immersive Exhibition
          </button>
        </div>
      )}

      {curationState === "curating" && (
        <div className="flex-1 flex flex-col items-center justify-center gap-3">
          <div className="w-6 h-6 border-2 border-[#b45309] border-t-transparent rounded-full animate-spin" />
          <div className="text-center px-2">
            <span className="text-[9px] font-mono text-[#C7FF3D] block uppercase animate-pulse">ADK Multi-Agent Orchestrator</span>
            <p className="text-[8px] text-white/50 font-mono mt-1 leading-snug">{currentAgent}</p>
          </div>
        </div>
      )}

      {curationState === "exhibition" && (
        <div className="flex-1 flex flex-col justify-between pt-2 text-left">
          <div className="bg-white/5 border border-white/5 p-2 rounded-xl text-[9px] space-y-1.5 font-mono text-white/85">
            <div className="flex justify-between border-b border-white/5 pb-1 text-[8px] text-white/50">
              <span>curated room:</span>
              <span className="text-[#C7FF3D] font-bold">Egyptian Mathematics</span>
            </div>
            <p className="text-[9px] text-[#A3A3A3] leading-snug">
              Room 1: The Celestial Calendar. Exhibit: Dendera Zodiac. Timeline mapping completed.
            </p>
            <div className="flex justify-between items-center text-[8px] text-emerald-400">
              <span>Quality Score: 88.4%</span>
              <span className="bg-emerald-500/10 px-1 rounded">SQLite Synced</span>
            </div>
          </div>

          <button
            onClick={() => setCurationState("idle")}
            className="w-full mt-1.5 bg-white/10 hover:bg-white/15 text-white py-1 rounded text-[9px] font-mono transition-colors cursor-pointer"
          >
            ← Curate Another Topic
          </button>
        </div>
      )}
    </div>
  );
}

// Amazon ML Challenge Price Predictor Simulator
function AmazonMLWidget() {
  const [description, setDescription] = useState("Pack of 6 organic cotton kitchen towels, ultra absorbent machine washable, 12x12 inches.");
  const [predictionState, setPredictionState] = useState<"idle" | "running" | "result">("idle");
  const [extractedFeatures, setExtractedFeatures] = useState<any>(null);
  const [predictedPrice, setPredictedPrice] = useState<number>(0);

  const samples = [
    {
      desc: "Pack of 3 premium glass food storage containers with airtight lids, 30 oz each.",
      features: { ipq: 3, weight: "90 oz", category: "Home & Kitchen", cluster: 114 },
      price: 24.99
    },
    {
      desc: "Bulk 50 count black ballpoint pens, smooth writing 1.0mm medium point.",
      features: { ipq: 50, weight: "6.5 oz", category: "Office Products", cluster: 73 },
      price: 9.75
    },
    {
      desc: "Organic lavender essential oil, 10ml bottle for diffusers.",
      features: { ipq: 1, weight: "0.34 oz", category: "Beauty & Personal Care", cluster: 188 },
      price: 6.50
    }
  ];

  const handleSelectSample = (sample: any) => {
    setDescription(sample.desc);
    setPredictionState("idle");
  };

  const handlePredict = () => {
    setPredictionState("running");

    // Simulate feature extraction and model inference
    setTimeout(() => {
      const matched = samples.find(s => s.desc === description) || {
        features: { ipq: 6, weight: "14 oz", category: "Home & Kitchen", cluster: 142 },
        price: 18.45
      };

      setExtractedFeatures(matched.features);
      setPredictedPrice(matched.price);
      setPredictionState("result");
    }, 1500);
  };

  return (
    <div className="w-full bg-[#0f1115]/95 border border-[#ff9900]/25 rounded-2xl p-4 flex flex-col justify-between h-[230px] font-sans text-xs">
      <div className="flex items-center justify-between border-b border-white/5 pb-2 flex-shrink-0">
        <span className="font-mono text-[9px] text-[#C7FF3D] uppercase font-bold">AMAZON ML PREDICTOR</span>
        <span className="text-[9px] text-[#ff9900] font-mono font-bold">SMAPE: 56.2%</span>
      </div>

      {predictionState === "idle" && (
        <div className="flex-1 flex flex-col justify-between pt-2 text-left">
          <div className="space-y-1">
            <label className="text-white/50 text-[8px] uppercase font-mono tracking-wider">Product Catalog Text</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-2 py-1 focus:outline-none focus:border-[#C7FF3D] text-[10px] resize-none font-sans"
            />
          </div>

          <div className="space-y-1">
            <label className="text-white/50 text-[8px] uppercase font-mono tracking-wider">Load Sample Data</label>
            <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-dark">
              {samples.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectSample(s)}
                  className="px-2 py-0.5 rounded text-[8px] bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 whitespace-nowrap cursor-pointer"
                >
                  Sample {idx + 1}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handlePredict}
            className="w-full bg-[#C7FF3D] text-[#111111] font-bold py-1.5 rounded-lg hover:bg-white transition-colors text-[10px] cursor-pointer"
          >
            Predict Catalog Price
          </button>
        </div>
      )}

      {predictionState === "running" && (
        <div className="flex-1 flex flex-col items-center justify-center gap-3">
          <div className="w-6 h-6 border-2 border-[#ff9900] border-t-transparent rounded-full animate-spin" />
          <div className="text-center px-2">
            <span className="text-[9px] font-mono text-[#C7FF3D] block uppercase animate-pulse">Running Ensemble Pipeline</span>
            <p className="text-[8px] text-white/50 font-mono mt-1 leading-snug">Extracting features & running LightGBM + XGBoost...</p>
          </div>
        </div>
      )}

      {predictionState === "result" && extractedFeatures && (
        <div className="flex-1 flex flex-col justify-between pt-2 text-left">
          <div className="bg-white/5 border border-white/5 p-2 rounded-xl text-[9px] space-y-1 font-mono text-white/85">
            <div className="flex justify-between border-b border-white/5 pb-1 text-[8px] text-white/50">
              <span>Features Extracted:</span>
              <span className="text-emerald-400">Success</span>
            </div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[8px]">
              <div>IPQ: <span className="text-[#C7FF3D]">{extractedFeatures.ipq}</span></div>
              <div>Weight: <span className="text-white">{extractedFeatures.weight}</span></div>
              <div className="col-span-2 truncate">Category: <span className="text-white">{extractedFeatures.category}</span></div>
              <div>KMeans Cluster: <span className="text-[#ff9900]">{extractedFeatures.cluster}</span></div>
              <div>SVD Features: <span className="text-white">150 comps</span></div>
            </div>
            <div className="flex justify-between items-center text-[10px] text-white pt-1 border-t border-white/5">
              <span>Predicted Price:</span>
              <span className="text-emerald-400 font-bold font-sans text-xs">${predictedPrice.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => setPredictionState("idle")}
            className="w-full mt-1.5 bg-white/10 hover:bg-white/15 text-white py-1 rounded text-[9px] font-mono transition-colors cursor-pointer"
          >
            ← Predict Another Product
          </button>
        </div>
      )}
    </div>
  );
}

// CyberConstituent-SLM Classifier Simulator
function CyberConstituentWidget() {
  const [logInput, setLogInput] = useState("ALERT: Database validation form bypass query manipulation. SELECT * FROM users WHERE admin = 1; --");
  const [classifierState, setClassifierState] = useState<"idle" | "running" | "result">("idle");
  const [confidence, setConfidence] = useState<number>(0);
  const [prediction, setPrediction] = useState<string>("");
  const [chartData, setChartData] = useState<number[]>([]);

  const samples = [
    {
      text: "ALERT: Database validation form bypass query manipulation. SELECT * FROM users WHERE admin = 1; --",
      label: "💉 SQL Injection",
      confidence: 94.6,
      chart: [5, 2, 4, 1, 94, 2]
    },
    {
      text: "WARNING: Cryptographic file encryption process active. Bulk directory extension modification to .locked.",
      label: "🔒 Ransomware Attack",
      confidence: 91.2,
      chart: [3, 91, 1, 2, 1, 2]
    },
    {
      text: "URGENT: Credential harvesting portal discovered. Spoofed Microsoft login forms redirecting to external domain.",
      label: "🎣 Phishing Campaign",
      confidence: 88.7,
      chart: [2, 3, 88, 1, 2, 4]
    }
  ];

  const runClassifier = (text: string) => {
    setLogInput(text);
    setClassifierState("running");

    setTimeout(() => {
      const found = samples.find(s => text.toLowerCase().includes(s.text.substring(0, 30).toLowerCase()) || s.text.toLowerCase().includes(text.toLowerCase()));
      if (found) {
        setPrediction(found.label);
        setConfidence(found.confidence);
        setChartData(found.chart);
      } else {
        setPrediction("🦠 Malware Attack");
        setConfidence(86.4);
        setChartData([86, 2, 3, 4, 2, 3]);
      }
      setClassifierState("result");
    }, 1400);
  };

  return (
    <div className="w-full bg-[#0a0f1d]/95 border border-[#3b82f6]/20 rounded-2xl p-4 flex flex-col justify-between h-[230px] font-sans text-xs">
      <div className="flex items-center justify-between border-b border-white/5 pb-2 flex-shrink-0">
        <span className="font-mono text-[9px] text-[#C7FF3D] uppercase font-bold">CYBERCONSTITUENT CLASSIFIER</span>
        <span className="text-[9px] text-emerald-400 font-mono">CONSTITUTIONAL ALIGNED</span>
      </div>

      {classifierState === "idle" && (
        <div className="flex-1 flex flex-col justify-between pt-2 text-left">
          <div className="space-y-1">
            <label className="text-white/50 text-[8px] uppercase font-mono tracking-wider">Raw Security Log Input</label>
            <textarea
              value={logInput}
              onChange={(e) => setLogInput(e.target.value)}
              rows={2}
              className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-2 py-1 focus:outline-none focus:border-[#C7FF3D] text-[10px] resize-none font-sans"
            />
          </div>

          <div className="space-y-1">
            <label className="text-white/50 text-[8px] uppercase font-mono tracking-wider">Inject Threat Alert Logs</label>
            <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-dark">
              {samples.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => runClassifier(s.text)}
                  className="px-2 py-0.5 rounded text-[8px] bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 whitespace-nowrap cursor-pointer"
                >
                  {s.label.split(" ")[1]} Log
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => runClassifier(logInput)}
            className="w-full bg-[#C7FF3D] text-[#111111] font-bold py-1.5 rounded-lg hover:bg-white transition-colors text-[10px] cursor-pointer"
          >
            Analyze Log Safety & Vector
          </button>
        </div>
      )}

      {classifierState === "running" && (
        <div className="flex-1 flex flex-col items-center justify-center gap-3">
          <div className="w-6 h-6 border-2 border-[#3b82f6] border-t-transparent rounded-full animate-spin" />
          <div className="text-center px-2">
            <span className="text-[9px] font-mono text-[#C7FF3D] block uppercase animate-pulse">Aligning & Preprocessing</span>
            <p className="text-[8px] text-white/50 font-mono mt-1 leading-snug">Constitutional AI Layer scrubbing exploit payload strings...</p>
          </div>
        </div>
      )}

      {classifierState === "result" && (
        <div className="flex-1 flex flex-col justify-between pt-2 text-left">
          <div className="bg-white/5 border border-white/5 p-2 rounded-xl text-[9px] space-y-1.5 font-mono text-white/85">
            <div className="flex justify-between border-b border-white/5 pb-1 text-[8px] text-white/50">
              <span>Threat Category:</span>
              <span className="text-[#C7FF3D] font-bold">{prediction}</span>
            </div>

            <div className="space-y-1 text-[8px] font-sans">
              <div className="flex justify-between">
                <span className="text-white/60">Confidence:</span>
                <span className="text-emerald-400 font-bold">{confidence.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Constitutional Safe Check:</span>
                <span className="text-emerald-400">🛡️ Sanitized & Approved</span>
              </div>
            </div>

            {/* Micro bar chart */}
            <div className="pt-1.5 border-t border-white/5">
              <div className="flex items-end justify-between h-5 gap-1 pt-1">
                {chartData.map((val, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div
                      className={`w-full rounded-t-sm transition-all duration-300 ${idx === chartData.indexOf(Math.max(...chartData)) ? "bg-[#C7FF3D]" : "bg-white/20"
                        }`}
                      style={{ height: `${Math.max(2, val * 0.18)}px` }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[6px] text-white/40 pt-1 font-mono">
                <span>MAL</span>
                <span>RANS</span>
                <span>PHISH</span>
                <span>DDOS</span>
                <span>SQLI</span>
                <span>MITM</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setClassifierState("idle")}
            className="w-full mt-1.5 bg-white/10 hover:bg-white/15 text-white py-1 rounded text-[9px] font-mono transition-colors cursor-pointer"
          >
            ← Input New Log
          </button>
        </div>
      )}
    </div>
  );
}

// LumaForge Image Generation Platform Simulator
function LumaForgeWidget() {
  const [prompt, setPrompt] = useState("A futuristic cyberpunk city at sunset");
  const [pipelineState, setPipelineState] = useState<"idle" | "generating" | "result" | "sketch" | "bg_removed">("idle");
  const [generationStep, setGenerationStep] = useState(0);

  const runPipeline = () => {
    setPipelineState("generating");
    setGenerationStep(0);
    
    // Simulate generation pipeline phases
    const timers = [
      setTimeout(() => setGenerationStep(1), 800),  // Ollama Check
      setTimeout(() => setGenerationStep(2), 1600), // Prompt Expansion
      setTimeout(() => setGenerationStep(3), 2400), // MPS Diffusion
      setTimeout(() => {
        setPipelineState("result");
        setGenerationStep(4);
      }, 3500)
    ];
    return () => timers.forEach(clearTimeout);
  };

  return (
    <div className="w-full bg-[#0a0515]/95 border border-[#8b5cf6]/25 rounded-2xl p-4 flex flex-col justify-between h-[230px] font-sans text-xs text-white">
      <div className="flex items-center justify-between border-b border-white/5 pb-2 flex-shrink-0">
        <span className="font-mono text-[9px] text-[#C7FF3D] uppercase font-bold">LumaForge Core Pipeline</span>
        <span className="text-[9px] text-[#ec4899] font-mono">Apple Silicon MPS Acceleration</span>
      </div>

      {pipelineState === "idle" && (
        <div className="flex-1 flex flex-col justify-between pt-2 text-left">
          <div className="space-y-1">
            <label className="text-white/50 text-[8px] uppercase font-mono tracking-wider">Image Prompt</label>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-2 py-1 focus:outline-none focus:border-[#C7FF3D] text-[10px] font-sans"
            />
          </div>

          <div className="space-y-1">
            <label className="text-white/50 text-[8px] uppercase font-mono tracking-wider">Presets</label>
            <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-dark">
              {[
                "futuristic cyberpunk city",
                "studio ghibli landscape",
                "steampunk portrait"
              ].map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setPrompt(p)}
                  className={`px-2 py-0.5 rounded text-[8px] border whitespace-nowrap cursor-pointer transition-colors ${
                    prompt.toLowerCase().includes(p.substring(0, 10))
                      ? "bg-[#C7FF3D] border-[#C7FF3D] text-[#111111] font-bold"
                      : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={runPipeline}
            className="w-full bg-[#C7FF3D] text-[#111111] font-bold py-1.5 rounded-lg hover:bg-white transition-colors text-[10px] cursor-pointer"
          >
            Generate Image (Real Diffusion)
          </button>
        </div>
      )}

      {pipelineState === "generating" && (
        <div className="flex-1 flex flex-col justify-center gap-3">
          <div className="relative flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-t-transparent border-[#ec4899] rounded-full animate-spin z-10" />
            <div className="absolute w-12 h-12 border border-[#8b5cf6]/20 rounded-full animate-ping opacity-35" />
          </div>
          <div className="text-center px-2">
            <span className="text-[9px] font-mono text-[#C7FF3D] block uppercase animate-pulse">
              {generationStep === 0 && "Checking Safety (Ollama)..."}
              {generationStep === 1 && "Expanding Prompt (llama3.2)..."}
              {generationStep === 2 && "Denoising U-Net (MPS GPU)..."}
              {generationStep === 3 && "Finalizing Rendering..."}
            </span>
            <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden max-w-[180px] mx-auto">
              <div 
                className="h-full bg-gradient-to-r from-[#ec4899] to-[#8b5cf6] transition-all duration-700" 
                style={{ width: `${(generationStep + 1) * 25}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {(pipelineState === "result" || pipelineState === "sketch" || pipelineState === "bg_removed") && (
        <div className="flex-1 flex gap-3 pt-2 text-left items-stretch min-h-0">
          {/* Image Display */}
          <div className="w-[110px] h-[140px] rounded-lg border border-white/10 overflow-hidden relative bg-[#121212] flex-shrink-0 flex items-center justify-center">
            {pipelineState === "result" && (
              <img
                src="/lumaforge_cyberpunk.png"
                alt="Cyberpunk generated"
                className="w-full h-full object-cover animate-fade-in"
              />
            )}
            {pipelineState === "sketch" && (
              <img
                src="/lumaforge_sketch.png"
                alt="Cyberpunk sketch"
                className="w-full h-full object-cover animate-fade-in"
              />
            )}
            {pipelineState === "bg_removed" && (
              <div className="w-full h-full relative flex items-center justify-center bg-[radial-gradient(#ffffff22_1px,transparent_1px)] bg-[size:8px_8px]">
                <img
                  src="/lumaforge_cyberpunk.png"
                  alt="Background removed"
                  className="w-[85%] h-[85%] object-cover rounded-md shadow-2xl border border-emerald-400/50"
                  style={{
                    filter: "drop-shadow(0 0 8px rgba(52, 211, 153, 0.4))"
                  }}
                />
                <span className="absolute bottom-1 right-1 bg-emerald-500 text-black font-mono text-[6px] px-1 py-0.2 rounded font-bold">~8.9ms</span>
              </div>
            )}
            {/* Status indicator overlay */}
            <div className="absolute top-1 left-1 bg-black/60 px-1 py-0.5 rounded font-mono text-[7px] text-[#C7FF3D]">
              {pipelineState === "result" && "COLOR MODE"}
              {pipelineState === "sketch" && "SKETCH MODE"}
              {pipelineState === "bg_removed" && "BG SEGMENTED"}
            </div>
          </div>

          {/* Controls & Metrics */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-1.5 font-mono text-[8px] text-white/70">
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>Latency:</span>
                <span className="text-[#C7FF3D]">
                  {pipelineState === "result" && "1.2s (Mock Mode)"}
                  {pipelineState === "sketch" && "4.1ms (Vectorized)"}
                  {pipelineState === "bg_removed" && "8.9ms (Vectorized)"}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>Device:</span>
                <span className="text-white">Apple Silicon MPS</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>Safety Status:</span>
                <span className="text-emerald-400">🛡️ APPROVED</span>
              </div>
            </div>

            {/* Action Toggles */}
            <div className="flex flex-col gap-1">
              {pipelineState === "result" && (
                <>
                  <button
                    onClick={() => setPipelineState("bg_removed")}
                    className="w-full bg-[#ec4899]/20 hover:bg-[#ec4899]/35 text-[#ec4899] border border-[#ec4899]/30 font-bold py-1 rounded text-[9px] transition-colors cursor-pointer text-center"
                  >
                    ⚡ Remove Background (8.9ms)
                  </button>
                  <button
                    onClick={() => setPipelineState("sketch")}
                    className="w-full bg-[#8b5cf6]/20 hover:bg-[#8b5cf6]/35 text-[#8b5cf6] border border-[#8b5cf6]/30 font-bold py-1 rounded text-[9px] transition-colors cursor-pointer text-center"
                  >
                    🎨 Apply Sketch Filter (4.1ms)
                  </button>
                </>
              )}

              {pipelineState !== "result" && (
                <button
                  onClick={() => setPipelineState("result")}
                  className="w-full bg-white/10 hover:bg-white/15 text-white font-bold py-1.5 rounded text-[9px] transition-colors cursor-pointer text-center"
                >
                  ← Back to Original Color
                </button>
              )}

              <button
                onClick={() => setPipelineState("idle")}
                className="w-full bg-white/5 hover:bg-white/10 text-white/50 py-1 rounded text-[8px] font-mono transition-colors cursor-pointer text-center"
              >
                Reset Workstation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProjectGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getProjectIcon = (idx: number, isDark = true) => {
    const cls = `w-5 h-5 ${isDark ? "text-[#111111]" : "text-white"}`;
    switch (idx % 8) {
      case 0:
        return (
          <svg viewBox="0 0 16 16" className={cls} fill="none">
            <path d="M 4 4 L 8 7 L 4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
            <line x1="9" y1="10" x2="12" y2="10" stroke="currentColor" strokeWidth="2" />
          </svg>
        );
      case 1:
        return (
          <svg viewBox="0 0 16 16" className={cls} fill="currentColor">
            <rect x="5" y="5" width="6" height="6" />
            <line x1="3" y1="6" x2="5" y2="6" stroke="currentColor" strokeWidth="1.2" />
            <line x1="3" y1="8" x2="5" y2="8" stroke="currentColor" strokeWidth="1.2" />
            <line x1="3" y1="10" x2="5" y2="10" stroke="currentColor" strokeWidth="1.2" />
            <line x1="11" y1="6" x2="13" y2="6" stroke="currentColor" strokeWidth="1.2" />
            <line x1="11" y1="8" x2="13" y2="8" stroke="currentColor" strokeWidth="1.2" />
            <line x1="11" y1="10" x2="13" y2="10" stroke="currentColor" strokeWidth="1.2" />
            <line x1="6" y1="3" x2="6" y2="5" stroke="currentColor" strokeWidth="1.2" />
            <line x1="8" y1="3" x2="8" y2="5" stroke="currentColor" strokeWidth="1.2" />
            <line x1="10" y1="3" x2="10" y2="5" stroke="currentColor" strokeWidth="1.2" />
            <line x1="6" y1="11" x2="6" y2="13" stroke="currentColor" strokeWidth="1.2" />
            <line x1="8" y1="11" x2="8" y2="13" stroke="currentColor" strokeWidth="1.2" />
            <line x1="10" y1="11" x2="10" y2="13" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        );
      case 2:
        return (
          <svg viewBox="0 0 16 16" className={cls} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
            <path d="M 2 8 H 5 L 7 4 L 9 12 L 11 8 H 14" />
          </svg>
        );
      case 3:
        return (
          <svg viewBox="0 0 16 16" className={cls} fill="currentColor">
            <rect x="5" y="2" width="6" height="6" />
            <rect x="4" y="3" width="8" height="4" />
            <path d="M 5 8 V 13 L 7 11 L 8 12 L 9 11 L 11 13 V 8 Z" />
          </svg>
        );
      case 4:
        return (
          <svg viewBox="0 0 16 16" className={cls} fill="currentColor">
            <path d="M 3 2 H 13 V 7 C 13 11 8 14 8 14 C 8 14 3 11 3 7 Z" />
            <path d="M 4 3 H 12 V 7 C 12 10 8 13 8 13 C 8 13 4 10 4 7 Z" fill="white" />
            <path d="M 8 3 V 13" stroke="currentColor" strokeWidth="1" />
          </svg>
        );
      case 5:
        return (
          <svg viewBox="0 0 16 16" className={cls} fill="currentColor">
            <rect x="2" y="3" width="6" height="10" />
            <rect x="8" y="3" width="6" height="10" />
            <line x1="8" y1="3" x2="8" y2="13" stroke="white" strokeWidth="1" />
          </svg>
        );
      case 6:
        return (
          <svg viewBox="0 0 16 16" className={cls} fill="currentColor">
            <rect x="3" y="2" width="10" height="3" />
            <rect x="3" y="6" width="10" height="3" />
            <rect x="3" y="10" width="10" height="3" />
            <circle cx="5" cy="3.5" r="0.7" fill="white" />
            <circle cx="5" cy="7.5" r="0.7" fill="white" />
            <circle cx="5" cy="11.5" r="0.7" fill="white" />
          </svg>
        );
      case 7:
        return (
          <svg viewBox="0 0 16 16" className={cls} fill="currentColor">
            <path d="M 5 3 C 5 2 6 2 7 2 H 9 C 10 2 11 2 11 3 V 6 H 5 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <rect x="3" y="6" width="10" height="8" />
            <rect x="7" y="9" width="2" height="3" fill="white" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 16 16" className={cls} fill="currentColor">
            <rect x="2" y="3" width="6" height="10" />
            <rect x="8" y="3" width="6" height="10" />
            <line x1="8" y1="3" x2="8" y2="13" stroke="white" strokeWidth="1" />
          </svg>
        );
    }
  };

  const getProjectWidget = (idx: number) => {
    switch (idx) {
      case 0:
        return <DineInGoWidget />;
      case 1:
        return <NEXORAWidget />;
      case 2:
        return <LifeFlowWidget />;
      case 3:
        return <RunaGenWidget />;
      case 4:
        return <SpitchWidget />;
      case 5:
        return <MuseVerseWidget />;
      case 6:
        return <AmazonMLWidget />;
      case 7:
        return <CyberConstituentWidget />;
      case 8:
        return <LumaForgeWidget />;
      default:
        return null;
    }
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + profileData.projects.length) % profileData.projects.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % profileData.projects.length);
  };

  // Pure CSS branding configurations for cards to match the double exposure visual theme
  const cardBrandings = [
    {
      // DineInGo
      gradient: "from-[#2d1916] via-[#d65f49] to-[#f7a599]",
      title: "dineingo",
      orbs: [
        { className: "bg-[#d65f49]/35 w-56 h-56 -top-12 -right-12", delay: "0s" },
        { className: "bg-[#ffd3b6]/25 w-48 h-48 -bottom-10 -left-10", delay: "3s" }
      ]
    },
    {
      // NEXORA
      gradient: "from-[#0d0f21] via-[#2d2254] to-[#6c5dd3]",
      title: "nexora",
      orbs: [
        { className: "bg-[#6c5dd3]/30 w-60 h-60 -top-10 -right-10", delay: "1.5s" },
        { className: "bg-[#00e5ff]/15 w-52 h-52 -bottom-12 -left-12", delay: "4.5s" }
      ]
    },
    {
      // LifeFlow
      gradient: "from-[#081c19] via-[#224d47] to-[#4ade80]",
      title: "lifeflow",
      orbs: [
        { className: "bg-[#224d47]/45 w-52 h-52 -top-8 -right-8", delay: "0.8s" },
        { className: "bg-[#4ade80]/18 w-48 h-48 -bottom-10 -left-6", delay: "3.8s" }
      ]
    },
    {
      // RunaGen AI
      gradient: "from-[#0a1224] via-[#ea580c] to-[#eab308]",
      title: "runagenai",
      orbs: [
        { className: "bg-[#ea580c]/30 w-56 h-56 -top-10 -right-10", delay: "0s" },
        { className: "bg-[#3b82f6]/20 w-48 h-48 -bottom-10 -left-10", delay: "3.2s" }
      ]
    },
    {
      // Spitch AI
      gradient: "from-[#05060f] via-[#4d1979] to-[#d90062]",
      title: "spitchai",
      orbs: [
        { className: "bg-[#7b2cbf]/35 w-56 h-56 -top-10 -right-10", delay: "0s" },
        { className: "bg-[#00f5ff]/15 w-48 h-48 -bottom-10 -left-10", delay: "3.5s" }
      ]
    },
    {
      // MuseVerse
      gradient: "from-[#1c1917] via-[#b45309] to-[#fef3c7]",
      title: "museverse",
      orbs: [
        { className: "bg-[#b45309]/30 w-56 h-56 -top-10 -right-10", delay: "0s" },
        { className: "bg-[#d97706]/15 w-48 h-48 -bottom-10 -left-10", delay: "3.6s" }
      ]
    },
    {
      // Amazon ML Challenge
      gradient: "from-[#0f1115] via-[#232f3e] to-[#ff9900]",
      title: "amazonml",
      orbs: [
        { className: "bg-[#ff9900]/25 w-56 h-56 -top-12 -right-12", delay: "0s" },
        { className: "bg-[#146eb4]/15 w-48 h-48 -bottom-10 -left-10", delay: "3s" }
      ]
    },
    {
      // CyberConstituent-SLM
      gradient: "from-[#050b14] via-[#111e38] to-[#1e3a8a]",
      title: "cyberconstituent-slm",
      orbs: [
        { className: "bg-[#3b82f6]/30 w-56 h-56 -top-12 -right-12", delay: "0s" },
        { className: "bg-[#ef4444]/15 w-48 h-48 -bottom-10 -left-10", delay: "3s" }
      ]
    },
    {
      // LumaForge
      gradient: "from-[#070514] via-[#5b21b6] to-[#ec4899]",
      title: "lumaforge",
      orbs: [
        { className: "bg-[#ec4899]/30 w-56 h-56 -top-12 -right-12", delay: "0s" },
        { className: "bg-[#8b5cf6]/15 w-48 h-48 -bottom-10 -left-10", delay: "3s" }
      ]
    }
  ];

  return (
    <section id="projects" className="py-24 bg-[#111111] text-[#F7F7F5] overflow-hidden scroll-mt-20 relative">
      {/* Dynamic Header Block matches reference layout */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 mb-16 flex flex-row items-end justify-between border-b border-white/10 pb-6">
        <div className="text-left">
          <span className="font-mono text-xs tracking-widest text-[#C7FF3D] uppercase">
            01 // ENGINEERED WORKS
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-medium text-white mt-3 leading-tight lowercase">
            projects portfolio
          </h2>
        </div>

        {/* Dynamic Slide Counter */}
        <div className="font-sans font-light text-2xl md:text-3xl text-white/50 tracking-wider">
          <span className="text-white font-medium">0{activeIndex + 1}</span> / 0{profileData.projects.length}
        </div>
      </div>

      {/* Main 3D Perspective Carousel Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 relative flex items-center justify-center h-[590px] md:h-[630px] overflow-visible">
        <button
          onClick={handlePrev}
          className="absolute left-4 md:left-12 lg:left-24 z-30 w-12 h-12 rounded-none bg-white border-2 border-black text-[#111111] hover:bg-[#C7FF3D] flex items-center justify-center transition-all duration-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
        >
          <svg viewBox="0 0 16 16" className="w-5 h-5" fill="currentColor">
            <path d="M 10 4 L 6 8 L 10 12 V 10 H 11 V 6 H 10 Z" />
          </svg>
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 md:right-12 lg:right-24 z-30 w-12 h-12 rounded-none bg-white border-2 border-black text-[#111111] hover:bg-[#C7FF3D] flex items-center justify-center transition-all duration-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
        >
          <svg viewBox="0 0 16 16" className="w-5 h-5" fill="currentColor">
            <path d="M 6 4 L 10 8 L 6 12 V 10 H 5 V 6 H 6 Z" />
          </svg>
        </button>

        {/* Carousel Tracks */}
        <div className="relative w-full max-w-[840px] h-full flex items-center justify-center overflow-visible [perspective:1200px]">
          {profileData.projects.map((project, idx) => {
            const diff = (idx - activeIndex + profileData.projects.length) % profileData.projects.length;
            const isActive = diff === 0;
            const isLeft = diff === profileData.projects.length - 1;
            const isRight = diff === 1;

            const bgData = cardBrandings[idx];

            let positionStyles = {};
            if (isMobile) {
              if (isActive) {
                positionStyles = { x: 0, rotateY: 0, width: "310px", height: "540px", scale: 1.0, opacity: 1, zIndex: 20, pointerEvents: "auto" };
              } else if (isRight) {
                positionStyles = { x: 190, rotateY: -12, width: "240px", height: "380px", scale: 0.82, opacity: 0.35, zIndex: 10, pointerEvents: "auto" };
              } else if (isLeft) {
                positionStyles = { x: -190, rotateY: 12, width: "240px", height: "380px", scale: 0.82, opacity: 0.35, zIndex: 10, pointerEvents: "auto" };
              } else {
                positionStyles = { x: 0, rotateY: 0, width: "240px", height: "380px", scale: 0.7, opacity: 0, zIndex: 0, pointerEvents: "none" };
              }
            } else {
              if (isActive) {
                positionStyles = { x: 0, rotateY: 0, width: "780px", height: "500px", scale: 1.0, opacity: 1, zIndex: 20, pointerEvents: "auto" };
              } else if (isRight) {
                positionStyles = { x: 440, rotateY: -15, width: "320px", height: "420px", scale: 0.85, opacity: 0.45, zIndex: 10, pointerEvents: "auto" };
              } else if (isLeft) {
                positionStyles = { x: -440, rotateY: 15, width: "320px", height: "420px", scale: 0.85, opacity: 0.45, zIndex: 10, pointerEvents: "auto" };
              } else {
                positionStyles = { x: 0, rotateY: 0, width: "320px", height: "420px", scale: 0.7, opacity: 0, zIndex: 0, pointerEvents: "none" };
              }
            }

            return (
              <motion.div
                layout
                key={project.title}
                animate={positionStyles}
                transition={{ type: "spring", stiffness: 220, damping: 26 }}
                onClick={() => {
                  if (!isActive) {
                    setActiveIndex(idx);
                  }
                }}
                className={`absolute rounded-[2.5rem] border transition-colors duration-500 overflow-hidden shadow-2xl group flex flex-col justify-between select-none [transform-style:preserve-3d] ${isActive
                    ? "border-white/15 cursor-default"
                    : "border-white/10 cursor-pointer hover:border-white/20"
                  }`}
              >
                {/* CSS-Branded Background Container */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${bgData.gradient} overflow-hidden rounded-[2.5rem] z-0`}>
                  {/* Floating Orbs */}
                  {bgData.orbs.map((orb, oIdx) => (
                    <div
                      key={oIdx}
                      className={`absolute rounded-full blur-[45px] mix-blend-screen filter ${orb.className} ${oIdx === 0 ? "animate-orb-1" : "animate-orb-2"
                        }`}
                      style={{ animationDelay: orb.delay }}
                    />
                  ))}
                  {/* Subtle grid pattern overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-35 z-0" />
                  <div className="absolute inset-0 bg-radial from-transparent to-black/35 z-0" />
                </div>

                {/* Main Content container */}
                <div className="relative z-10 w-full h-full flex flex-col justify-between">
                  {isActive ? (
                    /* Centered Focus View: Glassmorphic Specs details + Simulator Overlay */
                    <div className="absolute inset-2 md:inset-3 bg-[#121212]/30 backdrop-blur-xl border border-white/10 rounded-[2.2rem] p-5 md:p-7 flex flex-col justify-between z-10 text-left">
                      <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0 items-stretch justify-between">

                        {/* Left Column: Full Specifications */}
                        <div className="flex-1 flex flex-col justify-between min-h-0 text-left">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-between">
                              <div className="p-2.5 bg-white/5 border-2 border-white/20 rounded-none text-white shadow-[1.5px_1.5px_0px_0px_rgba(255,255,255,0.1)]">
                                {getProjectIcon(idx, false)}
                              </div>
                              {project.status && (
                                <span className="flex items-center gap-1.5 px-3 py-1 rounded-none border border-black/10 text-[9px] font-pixel font-bold bg-[#C7FF3D] text-[#111111] shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                                  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 animate-pulse" fill="currentColor">
                                    <rect x="5" y="2" width="6" height="6" />
                                    <rect x="4" y="3" width="8" height="4" />
                                    <path d="M 5 8 V 13 L 7 11 L 8 12 L 9 11 L 11 13 V 8 Z" />
                                  </svg>
                                  {project.status}
                                </span>
                              )}
                            </div>

                            <h3 className="text-2xl md:text-3xl font-display text-white mt-5 lowercase">
                              {bgData.title}
                            </h3>
                            <p className="text-xs font-sans text-white/60 mt-1 uppercase tracking-wide">
                              {project.metadata}
                            </p>

                            {/* Tech badges */}
                            <div className="flex flex-wrap gap-1 mt-3">
                              {project.techStack.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-2 py-0.5 rounded text-[9px] font-mono bg-white/5 border border-white/8 text-white/60"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Specification texts scrolling field */}
                          <div className="mt-4 space-y-4 transition-all duration-500 overflow-y-auto pr-2 scrollbar-dark flex-1 min-h-0 text-white/80">
                            <div className="space-y-1">
                              <span className="text-[10px] font-mono text-[#C7FF3D] tracking-wider uppercase block">
                                Engineered Core
                              </span>
                              <p className="text-xs font-sans text-white/90 leading-relaxed">
                                {project.engineeredCore}
                              </p>
                            </div>

                            {project.securityMatrix && (
                              <div className="space-y-1 border-t border-white/5 pt-3">
                                <span className="text-[10px] font-mono text-[#C7FF3D] tracking-wider uppercase block">
                                  Security Framework
                                </span>
                                <p className="text-xs font-sans text-white/70 leading-relaxed">
                                  {project.securityMatrix}
                                </p>
                              </div>
                            )}

                            {project.dataOrchestration && (
                              <div className="space-y-1 border-t border-white/5 pt-3">
                                <span className="text-[10px] font-mono text-[#C7FF3D] tracking-wider uppercase block">
                                  Data Orchestration
                                </span>
                                <p className="text-xs font-sans text-white/70 leading-relaxed">
                                  {project.dataOrchestration}
                                </p>
                              </div>
                            )}

                            {project.performanceVector && (
                              <div className="space-y-1 border-t border-white/5 pt-3">
                                <span className="text-[10px] font-mono text-[#C7FF3D] tracking-wider uppercase block">
                                  Performance Metrics
                                </span>
                                <p className="text-xs font-sans text-white/70 leading-relaxed">
                                  {project.performanceVector}
                                </p>
                              </div>
                            )}

                            {project.securityInfrastructure && (
                              <div className="space-y-1 border-t border-white/5 pt-3">
                                <span className="text-[10px] font-mono text-[#C7FF3D] tracking-wider uppercase block">
                                  Security Credentials
                                </span>
                                <p className="text-xs font-sans text-white/70 leading-relaxed">
                                  {project.securityInfrastructure}
                                </p>
                              </div>
                            )}

                            {project.cicdMetric && (
                              <div className="space-y-1 border-t border-white/5 pt-3">
                                <span className="text-[10px] font-mono text-[#C7FF3D] tracking-wider uppercase block">
                                  CI/CD Metric
                                </span>
                                <p className="text-xs font-sans text-white/70 leading-relaxed">
                                  {project.cicdMetric}
                                </p>
                              </div>
                            )}

                            {project.uiOptimization && (
                              <div className="space-y-1 border-t border-white/5 pt-3">
                                <span className="text-[10px] font-mono text-[#C7FF3D] tracking-wider uppercase block">
                                  UI Optimization
                                </span>
                                <p className="text-xs font-sans text-white/70 leading-relaxed">
                                  {project.uiOptimization}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Right Column: Live App Simulator (Desktop view) */}
                        <div className="hidden md:flex flex-1 flex-col justify-center items-center max-w-[320px] transition-all duration-500 delay-100 flex-shrink-0">
                          {getProjectWidget(idx)}
                        </div>
                      </div>

                      {/* Active Card Bottom link actions */}
                      <div className="border-t border-white/5 pt-3 mt-3 flex flex-col sm:flex-row gap-4 items-center justify-between text-[10px] font-mono text-white/40 w-full flex-shrink-0">
                        <span>LIVE INTERACTIVE PREVIEW RUNNING</span>

                        {(project.liveLink || project.githubLink) && (
                          <div
                            className="flex flex-wrap items-center gap-3 relative z-20 pointer-events-auto"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {project.githubLink && (
                              <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/75 hover:text-[#C7FF3D] transition-colors border border-white/10 hover:border-[#C7FF3D]/30 px-2.5 py-1 rounded-full bg-white/5"
                              >
                                GitHub ↗
                              </a>
                            )}
                            {project.earlyAccessLink && (
                              <a
                                href={project.earlyAccessLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/75 hover:text-[#C7FF3D] transition-colors border border-white/10 hover:border-[#C7FF3D]/30 px-2.5 py-1 rounded-full bg-white/5"
                              >
                                Early Access ↗
                              </a>
                            )}
                            {project.liveLink && (
                              <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#111111] bg-[#C7FF3D] hover:bg-white hover:text-[#111111] transition-colors px-2.5 py-1 rounded-full font-bold"
                              >
                                {project.liveLink.includes("huggingface.co") ? "Hugging Face ↗" : "Live Site ↗"}
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* Offset side cards: Simplified Cover View to match the reference image */
                    <div className="flex flex-col items-center justify-center h-full text-center py-20 px-6 relative z-10 select-none">
                      {/* Glass icon badge */}
                      <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 mb-6 flex items-center justify-center shadow-lg text-white">
                        {getProjectIcon(idx, false)}
                      </div>

                      {/* Lowercase Title in large typography exactly like the floral screenshot */}
                      <h3 className="text-4xl md:text-5xl font-sans font-light text-white tracking-tighter mix-blend-overlay opacity-90 drop-shadow-md select-none mt-2 lowercase">
                        {bgData.title}
                      </h3>

                      {/* Subtitle / Metadata */}
                      <p className="text-[10px] font-mono text-white/75 mt-3 uppercase tracking-widest bg-black/20 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
                        {project.metadata.split(" - ")[0]}
                      </p>

                      {/* Click to explore hint */}
                      <span className="absolute bottom-8 font-mono text-[9px] text-[#C7FF3D] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse">
                        Click to explore
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Progress Dash Indicators at bottom */}
      <div className="flex items-center justify-center gap-2.5 mt-12 z-20 relative">
        {profileData.projects.map((_, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className="h-[3px] rounded-full transition-all duration-300 cursor-pointer select-none"
              style={{
                width: isActive ? "32px" : "12px",
                backgroundColor: isActive ? "#C7FF3D" : "rgba(255, 255, 255, 0.15)"
              }}
            />
          );
        })}
      </div>
    </section>
  );
}
