"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, Variants } from "framer-motion";
import { profileData } from "@/data/profile";
import { Calendar, BookOpen, Rocket, Award, ShieldAlert } from "lucide-react";

// Framer motion variants for cards, dots, and icons to synchronize animations
const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: -30, 
    scale: 0.96,
    filter: "blur(4px)" 
  },
  visible: { 
    opacity: 1, 
    x: 0, 
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 18,
      mass: 0.9
    }
  }
};

const dotVariants: Variants = {
  hidden: { 
    scale: 0, 
    backgroundColor: "#ffffff",
    borderColor: "rgba(17, 17, 17, 0.08)"
  },
  visible: { 
    scale: 1, 
    backgroundColor: "#C7FF3D",
    borderColor: "rgba(17, 17, 17, 0)",
    transition: {
      type: "spring",
      stiffness: 140,
      damping: 12
    }
  }
};

const iconVariants: Variants = {
  hidden: { 
    scale: 0.5, 
    rotate: -40, 
    opacity: 0.3 
  },
  visible: { 
    scale: 1, 
    rotate: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 160,
      damping: 10
    }
  }
};

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position of the timeline container relative to the viewport
  // Offset start 70% and end 60% ensures the line draws and retracts matching the user's scanning area
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 60%"]
  });

  // Smooth spring physics for drawing the timeline line
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 28,
    restDelta: 0.001
  });

  const getTimelineIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <BookOpen className="w-4 h-4 text-[#111111]" />;
      case 1:
        return <Rocket className="w-4 h-4 text-[#111111]" />;
      case 2:
        return <ShieldAlert className="w-4 h-4 text-[#111111]" />;
      default:
        return <Award className="w-4 h-4 text-[#111111]" />;
    }
  };

  return (
    <section id="timeline" className="py-24 bg-[#FAF9F6] border-b border-[#111111]/8 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left">
          <span className="font-mono text-xs text-[#555555] tracking-widest uppercase">
            07 // CHRONOLOGY
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-medium text-[#111111] mt-3">
            Production Chronicle
          </h2>
          <p className="text-[#555555] font-sans text-sm mt-3 max-w-md">
            The chronological mapping of my academic foundations, hackathons, and systems integration work.
          </p>
        </div>

        {/* Timeline Vector Map Container */}
        <div ref={containerRef} className="relative pl-6 ml-4 space-y-12">
          
          {/* Static background track line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-[1px] bg-[#111111]/8" />
          
          {/* Animated active track line draws as user scrolls */}
          <motion.div 
            style={{ scaleY }}
            className="absolute left-[11px] top-2 bottom-2 w-[1.5px] bg-[#C7FF3D] origin-top"
          />
          
          {profileData.timeline.map((node, idx) => (
            <motion.div
              key={node.years}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-10% 0px -20% 0px" }}
              className="relative group select-none text-left"
            >
              {/* Dynamic node point that pops in and lights up */}
              <motion.div 
                variants={dotVariants}
                className="absolute -left-[35px] top-1 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 group-hover:scale-115 shadow-sm z-10"
              >
                <motion.div variants={iconVariants}>
                  {getTimelineIcon(idx)}
                </motion.div>
              </motion.div>

              {/* Card Container */}
              <motion.div 
                variants={cardVariants}
                className="bg-white border border-[#111111]/8 rounded-3xl p-6 md:p-8 hover:border-[#111111]/15 hover:shadow-md transition-all duration-300 relative overflow-hidden"
              >
                {/* Visual hover background glow */}
                <div className="absolute inset-0 bg-radial from-[#C7FF3D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#111111]/5 pb-3 mb-4">
                  <span className="font-mono text-xs font-bold text-[#C7FF3D] bg-[#111111] px-2.5 py-1 rounded-full uppercase">
                    {node.years}
                  </span>
                  <span className="font-mono text-[9px] text-[#555555] opacity-50 uppercase tracking-widest">
                    Milestone 0{idx + 1}
                  </span>
                </div>

                <h3 className="text-lg md:text-xl font-sans font-bold text-[#111111] relative z-10">
                  {node.title}
                </h3>
                <p className="text-xs md:text-sm font-sans text-[#555555] mt-2 leading-relaxed relative z-10">
                  {node.description}
                </p>

                {/* Additional metrics highlight */}
                {idx === 0 && (
                  <div className="mt-4 pt-3 border-t border-[#111111]/5 flex items-center gap-1.5 text-xs text-[#111111] font-semibold">
                    <span className="bg-[#C7FF3D]/30 px-2 py-0.5 rounded font-mono text-[10px]">CGPA: 8.92</span>
                    <span className="text-[#555555] font-light font-sans">Dayananda Sagar University CST</span>
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}
