"use client";

import React, { useState } from "react";
import { Menu, X, Terminal, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Systems", href: "#bento" },
    { label: "Projects", href: "#projects" },
    { label: "Connect", href: "#connect" },
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-6xl">
      <div className="glass-panel py-3 px-6 rounded-full flex items-center justify-between shadow-lg">
        {/* Brand signature */}
        <div className="flex items-center gap-3">
          <Terminal className="w-5 h-5 text-[#111111]" />
          <span className="font-sacramento text-2xl font-bold tracking-wide select-none">
            Sujith Putta
          </span>
          <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#111111] text-[#C7FF3D] border border-transparent font-mono">
            <Cpu className="w-3 h-3 animate-pulse" /> AI & PRODUCTS
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 font-mono text-xs">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[#555555] hover:text-[#111111] transition-colors relative group py-1"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#111111] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#connect"
            className="bg-[#111111] text-[#F7F7F5] hover:bg-[#C7FF3D] hover:text-[#111111] transition-all duration-300 px-4 py-2 rounded-full font-bold shadow-sm"
          >
            Hire Developer
          </a>
        </div>


        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-1.5 text-[#111111] hover:bg-black/5 rounded-full transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="md:hidden absolute top-16 left-0 right-0 glass-panel p-6 rounded-3xl shadow-xl flex flex-col gap-4 text-center font-mono text-sm"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="py-2 text-[#555555] hover:text-[#111111] transition-colors border-b border-[#111111]/5"
              >
                {item.label}
              </a>
            ))}

            <a
              href="#connect"
              onClick={() => setIsOpen(false)}
              className="bg-[#111111] text-[#F7F7F5] hover:bg-[#C7FF3D] hover:text-[#111111] transition-all duration-300 py-3 rounded-xl font-bold"
            >
              Hire Developer
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
