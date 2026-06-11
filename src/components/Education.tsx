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
          className="hover-radial-card relative p-6 md:p-10 rounded-3xl overflow-hidden group transition-all duration-300 shadow-sm hover:shadow-md border border-[#111111]/8 text-left"
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
              <div className="flex items-center gap-2 border-b border-[#111111]/5 pb-4">
                <BookOpen className="w-5 h-5 text-[#111111]" />
                <span className="font-mono text-[9px] text-[#555555] uppercase tracking-wider">
                  University Affiliation
                </span>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border border-[#111111]/8 bg-white flex items-center justify-center shrink-0 shadow-sm">
                  {!logoError ? (
                    <img
                      src="/dayananda-sagar-logo.jpg"
                      alt="Dayananda Sagar University Logo"
                      className="w-full h-full object-cover"
                      onError={() => setLogoError(true)}
                    />
                  ) : (
                    <GraduationCap className="w-10 h-10 text-[#111111]/60" />
                  )}
                </div>
                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-[#555555] uppercase tracking-widest block font-bold">
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
                  <GraduationCap className="w-5 h-5 text-[#111111]" />
                  <div>
                    <h4 className="text-sm font-sans font-bold text-[#111111]">
                      {edu.degree}
                    </h4>
                    <p className="text-xs text-[#555555] mt-0.5">
                      Ongoing CST Specialization — <span className="font-semibold text-[#111111]">{edu.years}</span>
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C7FF3D]/30 border border-[#C7FF3D]/50 rounded-full font-mono text-xs text-[#111111] font-bold">
                  <Award className="w-3.5 h-3.5" />
                  <span>CGPA: {edu.cgpa} / 10.0</span>
                </div>
              </div>
            </div>

            {/* Right block: Coursework Tags list */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 border-b border-[#111111]/5 pb-4">
                <span className="font-mono text-[9px] text-[#555555] uppercase tracking-wider block">
                  Core Specialization Coursework
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {edu.coursework.map((course, idx) => (
                  <motion.div
                    key={course}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#111111]/5 text-xs text-[#555555] font-sans hover:border-[#111111]/15 hover:text-[#111111] hover:bg-white transition-all duration-300 flex items-center justify-between group/item cursor-default"
                  >
                    <span>{course}</span>
                    <span className="font-mono text-[8px] text-[#555555]/45 group-hover/item:text-[#111111]/70 transition-colors">
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
