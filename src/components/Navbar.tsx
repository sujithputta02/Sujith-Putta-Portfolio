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
      <div className="bg-[#FAF9F6] py-3 px-6 rounded-none flex items-center justify-between border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
        {/* Brand signature */}
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 16 16" className="w-5 h-5 text-[#111111]" fill="none">
            <path d="M 4 4 L 8 7 L 4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
            <line x1="9" y1="10" x2="12" y2="10" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span className="font-sacramento text-2xl font-bold tracking-wide select-none text-[#111111]">
            Sujith Putta
          </span>
          <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-none text-[9px] font-bold bg-[#111111] text-[#C7FF3D] border-2 border-black font-pixel shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
            <svg viewBox="0 0 16 16" className="w-3 h-3 animate-pulse" fill="currentColor">
              <rect x="5" y="5" width="6" height="6" />
              <line x1="3" y1="6" x2="5" y2="6" stroke="currentColor" strokeWidth="1" />
              <line x1="3" y1="8" x2="5" y2="8" stroke="currentColor" strokeWidth="1" />
              <line x1="3" y1="10" x2="5" y2="10" stroke="currentColor" strokeWidth="1" />
              <line x1="11" y1="6" x2="13" y2="6" stroke="currentColor" strokeWidth="1" />
              <line x1="11" y1="8" x2="13" y2="8" stroke="currentColor" strokeWidth="1" />
              <line x1="11" y1="10" x2="13" y2="10" stroke="currentColor" strokeWidth="1" />
            </svg>
            AI & PRODUCTS
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 font-pixel text-xs">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[#555555] hover:text-[#111111] transition-colors relative group py-1 font-bold"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#111111] transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#connect"
            className="bg-[#111111] text-[#F7F7F5] hover:bg-[#C7FF3D] hover:text-[#111111] border-2 border-black px-4 py-2 rounded-none font-pixel font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-100"
          >
            Hire Developer
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-1.5 text-[#111111] hover:bg-black/5 border-2 border-black rounded-none transition-colors shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] bg-white cursor-pointer"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg viewBox="0 0 16 16" className="w-5 h-5" fill="currentColor">
              <path d="M 3 3 L 5 3 L 8 6 L 11 3 L 13 3 L 9 8 L 13 13 L 11 13 L 8 10 L 5 13 L 3 13 L 7 8 Z" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" className="w-5 h-5" fill="currentColor">
              <rect x="2" y="3" width="12" height="2" />
              <rect x="2" y="7" width="12" height="2" />
              <rect x="2" y="11" width="12" height="2" />
            </svg>
          )}
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
            className="md:hidden absolute top-16 left-0 right-0 bg-[#FAF9F6] border-2 border-black p-6 rounded-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4 text-center font-pixel text-sm"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="py-2 text-[#555555] hover:text-[#111111] transition-colors border-b-2 border-black/10 font-bold"
              >
                {item.label}
              </a>
            ))}

            <a
              href="#connect"
              onClick={() => setIsOpen(false)}
              className="bg-[#111111] text-[#F7F7F5] hover:bg-[#C7FF3D] hover:text-[#111111] border-2 border-black py-3 rounded-none font-pixel font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              Hire Developer
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
