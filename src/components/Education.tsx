"use client";

import React, { useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import { profileData } from "@/data/profile";
import { BookOpen, Award, GraduationCap } from "lucide-react";

// Staggered grid entrance variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

// Luxury ease card transition
const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 45,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 14,
    },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function Education() {
  const edu = profileData.education;
  const cardRef = useRef<HTMLDivElement>(null);
  const [logoError, setLogoError] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section id="education" className="py-24 px-4 md:px-8 max-w-6xl mx-auto scroll-mt-20">
      <motion.div
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="mb-16 text-center md:text-left"
      >
        <span className="font-mono text-xs text-[#555555] tracking-widest uppercase">
          02 // ACADEMIC PROFILE
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-medium text-[#111111] leading-tight mt-3">
          Education & Coursework
        </h2>
        <p className="text-[#555555] font-sans text-sm md:text-base mt-3 max-w-xl">
          Detailed academic records, specialized focus modules, and ongoing university credentials.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        className="w-full"
      >
        <motion.div
          variants={cardVariants}
          ref={cardRef}
          onMouseMove={handleMouseMove}
          style={{ backgroundColor: "#ffffff" }}
          className="hover-radial-card relative p-6 md:p-10 rounded-none overflow-hidden group border-2 border-black text-left shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          {/* Mouse coordinate hover light glow */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500"
            style={{
              background: "radial-gradient(450px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), #C7FF3D 0%, transparent 80%)"
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Info block: Logo and Degree */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-2 border-b-2 border-black/10 pb-4">
                <svg viewBox="0 0 16 16" className="w-5 h-5 text-[#111111]" fill="currentColor">
                  <rect x="2" y="3" width="6" height="10" />
                  <rect x="8" y="3" width="6" height="10" />
                  <line x1="8" y1="3" x2="8" y2="13" stroke="white" strokeWidth="1" />
                </svg>
                <span className="font-pixel text-[9px] text-[#555555] uppercase tracking-wider font-bold">
                  University Affiliation
                </span>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-none overflow-hidden border-2 border-black bg-white flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  {!logoError ? (
                    <img
                      src="/dayananda-sagar-logo.jpg"
                      alt="Dayananda Sagar University Logo"
                      className="w-full h-full object-cover"
                      onError={() => setLogoError(true)}
                    />
                  ) : (
                    <svg viewBox="0 0 16 16" className="w-10 h-10 text-[#111111]/60" fill="currentColor">
                      <path d="M 8 2 L 14 5 L 8 8 L 2 5 Z M 5 7 V 9.5 H 11 V 7 M 12 5 V 9 H 13 V 5 Z" />
                    </svg>
                  )}
                </div>
                <div className="space-y-1">
                  <span className="font-pixel text-[10px] text-[#555555] uppercase tracking-widest block font-bold">
                    DSU CST DEPT
                  </span>
                  <h3 className="text-xl font-sans font-bold text-[#111111] leading-tight">
                    {edu.school}
                  </h3>
                  <p className="text-xs text-[#555555] font-medium font-sans">
                    Bengaluru, India
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#111111]/5 space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-[#C7FF3D]/20 border border-black/10 rounded-none text-[#111111] shrink-0">
                    <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor">
                      <path d="M 8 2 L 14 5 L 8 8 L 2 5 Z M 5 7 V 9.5 H 11 V 7 M 12 5 V 9 H 13 V 5 Z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-sans font-bold text-[#111111]">
                      {edu.degree}
                    </h4>
                    <p className="text-xs text-[#555555] mt-0.5">
                      Ongoing CST Specialization — <span className="font-semibold text-[#111111]">{edu.years}</span>
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C7FF3D]/20 border-2 border-black rounded-none font-pixel text-xs text-[#111111] font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor">
                    <rect x="5" y="2" width="6" height="6" />
                    <rect x="4" y="3" width="8" height="4" />
                    <path d="M 5 8 V 13 L 7 11 L 8 12 L 9 11 L 11 13 V 8 Z" />
                  </svg>
                  <span>CGPA: {edu.cgpa} / 10.0</span>
                </div>
              </div>
            </div>

            {/* Right block: Coursework Tags list */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 border-b-2 border-black/10 pb-4">
                <span className="font-pixel text-[9px] text-[#555555] uppercase tracking-wider block font-bold">
                  Core Specialization Coursework
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {edu.coursework.map((course, idx) => (
                  <motion.div
                    key={course}
                    variants={itemVariants}
                    whileHover={{ scale: 1.01, y: -1 }}
                    transition={{ duration: 0.15 }}
                    className="p-3.5 rounded-none bg-[#FAF9F6] border-2 border-black text-xs text-[#555555] font-pixel font-bold hover:border-black hover:text-[#111111] hover:bg-[#C7FF3D]/10 hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-100 flex items-center justify-between group/item cursor-default"
                  >
                    <span>{course}</span>
                    <span className="font-pixel text-[8px] text-[#555555]/60 group-hover/item:text-[#111111]/80 transition-colors">
                      [0{idx + 1}]
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
