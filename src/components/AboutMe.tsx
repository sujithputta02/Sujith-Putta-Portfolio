"use client";

import React, { useRef } from "react";
import { Sparkles, HeartHandshake, Cpu } from "lucide-react";

interface PhilosophyCardProps {
  title: string;
  icon: React.ReactNode;
  subtitle: string;
  description: string;
  isDark?: boolean;
}

function PhilosophyCard({ title, icon, subtitle, description, isDark = false }: PhilosophyCardProps) {
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
      style={{ backgroundColor: isDark ? "#111111" : "#ffffff" }}
      className={`hover-radial-card relative p-6 md:p-8 rounded-3xl overflow-hidden group transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between min-h-[260px] ${
        isDark ? "border-white/5 text-white shadow-xl" : "border-[#111111]/8 text-[#111111]"
      }`}
    >
      {/* Glow highlight */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500"
        style={{
          background: "radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), #C7FF3D 0%, transparent 80%)"
        }}
      />

      {isDark && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
          style={{
            border: "1px solid rgba(199, 255, 61, 0.15)",
            background: "radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(199, 255, 61, 0.08) 0%, transparent 85%)"
          }}
        />
      )}

      <div className="relative z-10">
        <div className={`flex items-center gap-2 border-b pb-4 mb-6 ${isDark ? "border-white/10" : "border-[#111111]/5"}`}>
          <div className={`p-2 rounded-xl shrink-0 ${isDark ? "bg-white/5 text-[#C7FF3D]" : "bg-[#C7FF3D]/20 text-[#111111]"}`}>
            {icon}
          </div>
          <span className={`font-mono text-[9px] uppercase tracking-wider ${isDark ? "text-white/55" : "text-[#555555]"}`}>
            {subtitle}
          </span>
        </div>

        <h3 className={`text-lg font-sans font-bold ${isDark ? "text-white" : "text-[#111111]"}`}>
          {title}
        </h3>
        <p className={`text-xs mt-2 leading-relaxed ${isDark ? "text-white/70" : "text-[#555555]"}`}>
          {description}
        </p>
      </div>

      <div className={`relative z-10 border-t pt-4 mt-6 font-mono text-[8px] flex justify-between ${isDark ? "border-white/10 text-white/45" : "border-[#111111]/5 text-[#555555]"}`}>
        <span>MINDSET: DEV & DESIGN</span>
        <span className={isDark ? "text-[#C7FF3D]" : "text-[#111111] font-semibold"}>SOLID DESIGN</span>
      </div>
    </div>
  );
}

export default function AboutMe() {
  return (
    <section id="about" className="py-24 bg-white border-b border-[#111111]/8 relative overflow-hidden scroll-mt-20 select-none">
      {/* Dynamic background element */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-radial from-[#C7FF3D]/10 to-transparent blur-[100px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Editorial Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-4 text-left">
            <span className="font-mono text-xs text-[#555555] tracking-widest uppercase">
              00 // IDENTITY & CORE
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-[#111111] mt-3 leading-tight">
              About Me
            </h2>
          </div>
          <div className="lg:col-span-8 text-left">
            <p className="text-base md:text-lg font-sans font-light text-[#555555] leading-relaxed">
              Computer Science and Technology undergraduate with hands-on experience building and shipping production-grade features using Python/FastAPI, React/TypeScript, and REST microservices on Azure and AWS. Proven track record as an AI Engineer and UI/UX Designer, delivering scalable backend APIs, intelligent RAG pipelines, CI/CD integrations, and component-driven frontends with polished user interactions. Hands-on experience with Docker, Git workflows, and system design paradigms. Looking to get on board with a fast-paced SaaS engineering team.
            </p>
          </div>
        </div>

        {/* 3-Column Philosophy Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <PhilosophyCard
            title="AI Autonomy & Agents"
            subtitle="Agentic Intelligence"
            icon={<Sparkles className="w-4.5 h-4.5" />}
            description="Deploying containerized RAG chains, dense FAISS vectors, and offline Neo4j graph schemas to build highly responsive, air-gapped system orchestrations."
          />
          <PhilosophyCard
            title="UX-First Architecture"
            subtitle="Interface Engineering"
            icon={<HeartHandshake className="w-4.5 h-4.5" />}
            description="Focusing heavily on responsive grids, coordinate hover glow highlights, custom easing variables, and clean components for elegant user workflows."
          />
          <PhilosophyCard
            isDark
            title="Scalable System Design"
            subtitle="Microservices & Scale"
            icon={<Cpu className="w-4.5 h-4.5" />}
            description="Structuring microservice frameworks (FastAPI/NodeJS) running isolated Docker volumes on AWS/Azure, optimizing production release cycles."
          />
        </div>

      </div>
    </section>
  );
}
