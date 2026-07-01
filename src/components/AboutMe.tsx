"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Sparkles, HeartHandshake, Cpu, Award, GraduationCap } from "lucide-react";

export default function AboutMe() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeSkillBadge, setActiveSkillBadge] = useState<string>("Click a bar to view achievements");

  const skillGauges = [
    { 
      label: "AI & Agent RAG", 
      percent: 95, 
      color: "bg-[#C7FF3D]", 
      badge: "Kaggle 5-Day Agents badge, FAISS vector indexes, Neo4j graphs" 
    },
    { 
      label: "Full Stack APIs", 
      percent: 90, 
      color: "bg-white", 
      badge: "FastAPI REST microservices, Node.js controllers, React/TypeScript client views" 
    },
    { 
      label: "Security Alignment", 
      percent: 88, 
      color: "bg-white/80", 
      badge: "Constitutional AI Log validation, OWASP top 10 controls, JWT sessions" 
    },
    { 
      label: "DevOps & Cloud", 
      percent: 85, 
      color: "bg-white/60", 
      badge: "AWS Academics foundation, Google Cloud CI/CD badge, Docker containment" 
    }
  ];

  const stats = [
    { value: "3+ Years", label: "Active Code", desc: "FastAPI/React builds" },
    { value: "5+ Hacks", label: "Rapid Prototypes", desc: "Space Apps & Hackathons" },
    { value: "25+ Repos", label: "GitHub Repos", desc: "Public code bases" },
    { value: "9 Badges", label: "Credentials", desc: "AWS, GCP & Kaggle certs" }
  ];

  // Framer Motion Spring entry animations
  const bentoItemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 75,
        damping: 15,
        mass: 0.9
      }
    }
  };

  return (
    <section id="about" className="py-24 bg-white border-b border-[#111111]/8 relative overflow-hidden scroll-mt-20 select-none text-left">
      {/* Editorial background gradient overlay */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-radial from-[#C7FF3D]/8 to-transparent blur-[100px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Editorial Heading */}
        <div className="mb-12">
          <span className="font-mono text-xs text-[#555555] tracking-widest uppercase">
            00 // IDENTITY & CORE
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-medium text-[#111111] mt-3">
            Identity Profile
          </h2>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          
          {/* Bento Card 1: Biography */}
          <motion.div
            variants={bentoItemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="col-span-1 md:col-span-2 lg:col-span-2 hover-radial-card rounded-none p-6 sm:p-8 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-[#C7FF3D]/20 border border-black/10 rounded-none text-[#111111] shrink-0">
                  <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor">
                    <path d="M 8 2 L 14 5 L 8 8 L 2 5 Z M 5 7 V 9.5 H 11 V 7 M 12 5 V 9 H 13 V 5 Z" />
                  </svg>
                </span>
                <span className="font-pixel text-[9px] text-[#555555] uppercase tracking-wider font-bold">CST Undergraduate</span>
              </div>
              <h3 className="text-xl md:text-2xl font-pixel font-bold text-[#111111] leading-relaxed">
                I build sovereign AI engines and high-end interactive interfaces.
              </h3>
              <p className="text-xs md:text-sm font-sans font-light text-[#555555] leading-relaxed">
                Computer Science and Technology undergraduate with hands-on experience building and shipping production-grade features using Python/FastAPI, React/TypeScript, and REST microservices on Azure and AWS. Proven track record as a Generative AI Developer and UI/UX Designer, delivering scalable backend APIs, intelligent RAG pipelines, CI/CD integrations, and component-driven frontends with polished user interactions. Hands-on experience with Docker, Git workflows, and system design paradigms.
              </p>
            </div>
            <div className="border-t border-[#111111]/5 pt-4 mt-6 flex justify-between items-center text-[10px] text-[#555555] font-mono">
              <span>DAYANANDA SAGAR UNIVERSITY</span>
              <span className="font-bold text-[#111111]">EST. 2023</span>
            </div>
          </motion.div>

          {/* Bento Card 2: Philosophy Flip Card */}
          <motion.div
            variants={bentoItemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            onClick={() => setIsFlipped(!isFlipped)}
            className="col-span-1 md:col-span-1 lg:col-span-1 relative h-full min-h-[260px] md:min-h-[280px] [perspective:1000px] cursor-pointer group select-none text-left"
          >
            <div 
              className="relative w-full h-full duration-700 [transform-style:preserve-3d]"
              style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
            >
              {/* Front Side */}
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-[#111111] text-white rounded-none p-6 sm:p-8 flex flex-col justify-between border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center justify-between">
                  <span className="font-pixel text-[9px] text-[#C7FF3D] uppercase tracking-wider">01 // CORE MINDSET</span>
                  <span className="p-2 bg-[#C7FF3D]/10 rounded-none border border-[#C7FF3D]/20 text-[#C7FF3D] shrink-0">
                    <svg viewBox="0 0 16 16" className="w-4 h-4 animate-pulse" fill="currentColor">
                      <rect x="7" y="2" width="2" height="12" />
                      <rect x="2" y="7" width="12" height="2" />
                      <rect x="6" y="5" width="4" height="6" />
                      <rect x="5" y="6" width="6" height="4" />
                    </svg>
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-display text-white mt-4 lowercase">dev & design</h3>
                  <p className="text-[9px] text-white/50 font-pixel mt-2">Click to rotate panel card</p>
                </div>
                <div className="border-t border-white/10 pt-4 font-pixel text-[8px] text-white/40 flex justify-between items-center">
                  <span>PHILOSOPHY</span>
                  <span>FLIP CARD ↗</span>
                </div>
              </div>

              {/* Back Side */}
              <div 
                className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-[#FAF9F6] text-[#111111] rounded-none p-6 sm:p-8 flex flex-col justify-between border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-left"
                style={{ transform: "rotateY(180deg)" }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-pixel text-[9px] text-[#555555] uppercase tracking-wider font-bold">01 // REVEALED</span>
                  <span className="p-1.5 bg-[#111111]/5 border border-black/10 rounded-none text-[#111111] shrink-0">
                    <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor">
                      <path d="M 4 8 H 12 V 12 H 4 Z M 6 6 H 10 V 8 H 6 Z M 3 9 H 4 V 11 H 3 Z M 12 9 H 13 V 11 H 12 Z" />
                    </svg>
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-[#555555] font-sans mt-4">
                  Structuring decoupled backends (FastAPI/Node) containerized on isolated volumes, paired with cursor coordinate highlights and custom cubic easings.
                </p>
                <div className="border-t border-[#111111]/5 pt-4 font-mono text-[8px] text-[#555555]/55 flex justify-between items-center">
                  <span>SYSTEM VALUES</span>
                  <span>CLICK TO ROTATE</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bento Card 3: Skills Proficiency Meter Gauge */}
          <motion.div
            variants={bentoItemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="col-span-1 md:col-span-1 lg:col-span-1 bg-[#111111] text-[#F7F7F5] border-2 border-black p-5 sm:p-6 rounded-none flex flex-col justify-between min-h-[300px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group"
          >
            {/* Subtle background glow grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] opacity-40 z-0" />
            
            <div className="relative z-10 flex flex-col justify-between h-full gap-6">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-pixel text-[9px] text-white/55 tracking-wider uppercase">02 // CAPABILITIES MATRIX</span>
                <span className="p-1.5 bg-white/5 border border-white/10 rounded-none text-[#C7FF3D] shrink-0">
                  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor">
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
                </span>
              </div>

              {/* Dynamic Bar Charts */}
              <div className="space-y-3">
                {skillGauges.map((skill, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setActiveSkillBadge(skill.badge)}
                    className="space-y-1 cursor-pointer group/bar text-left animate-fade-in"
                  >
                    <div className="flex justify-between text-[10px] font-pixel text-white/70 group-hover/bar:text-white transition-colors">
                      <span>{skill.label}</span>
                      <span className="font-bold">{skill.percent}%</span>
                    </div>
                    <div className="w-full bg-white/5 border border-white/20 h-3.5 p-[2px] rounded-none overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 rounded-none ${skill.color}`}
                        style={{ width: `${skill.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Dynamic badge readout panel */}
              <div className="bg-white/5 border border-white/5 rounded-2xl p-3 text-left min-h-[60px] flex items-center">
                <p className="text-[9px] font-mono text-white/80 leading-relaxed truncate-3-lines">
                  {activeSkillBadge}
                </p>
              </div>

            </div>
          </motion.div>

          {/* Bento Card 4: Quick Stats */}
          <motion.div
            variants={bentoItemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="col-span-1 md:col-span-2 lg:col-span-2 hover-radial-card rounded-none p-5 sm:p-6 flex flex-col justify-between"
          >
            <div className="flex items-center gap-2 border-b-2 border-black/10 pb-3">
              <span className="p-1.5 bg-[#111111]/5 border border-black/10 rounded-none text-[#111111] shrink-0">
                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 animate-pulse" fill="currentColor">
                  <rect x="5" y="2" width="6" height="6" />
                  <rect x="4" y="3" width="8" height="4" />
                  <path d="M 5 8 V 13 L 7 11 L 8 12 L 9 11 L 11 13 V 8 Z" />
                </svg>
              </span>
              <span className="font-pixel text-[9px] text-[#555555] uppercase tracking-wider font-bold">Production Credentials</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {stats.map((stat, sIdx) => (
                <div 
                  key={sIdx} 
                  className="bg-white border-2 border-black rounded-none p-5 flex flex-col justify-between min-h-[110px] transition-all duration-150 hover:translate-x-[-1.5px] hover:translate-y-[-1.5px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-default text-left"
                >
                  <span className="text-2xl font-pixel font-bold tracking-tight text-[#111111]">{stat.value}</span>
                  <div className="space-y-0.5 mt-2">
                    <span className="text-[9px] font-pixel font-bold text-[#111111] uppercase tracking-wide block">{stat.label}</span>
                    <span className="text-[8px] font-sans font-normal text-[#555555] block leading-snug">{stat.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
