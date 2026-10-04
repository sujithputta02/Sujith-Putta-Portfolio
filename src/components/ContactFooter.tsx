"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, ArrowUpRight, MapPin, Phone, Mail, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LiquidGlassCard } from "@/components/LiquidGlassCard";

// Clean SVG Icons for Social Cards
const GithubIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const HuggingFaceIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-3.5 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-7 8c-.28 0-.5-.22-.5-.5 0-1.66 1.79-3 4-3s4 1.34 4 3c0 .28-.22.5-.5.5-.28 0-.5-.22-.5-.5 0-1.1-1.34-2-3-2s-3 .9-3 2c0 .28-.22.5-.5.5z" />
  </svg>
);

// Form schema with name, email, phone, website, message
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional(),
  website: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactFooter() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const subject = encodeURIComponent(`Portfolio inquiry from ${data.name}`);
    const bodyLines = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.phone ? `Contact Number: ${data.phone}` : null,
      data.website ? `Website: ${data.website}` : null,
      ``,
      `Message:`,
      data.message,
    ]
      .filter(Boolean)
      .join("\n");

    const mailtoUrl = `mailto:sujithputta02@gmail.com?subject=${subject}&body=${encodeURIComponent(bodyLines)}`;
    window.location.href = mailtoUrl;

    setIsSubmitting(false);
    setIsSent(true);
    reset();
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <footer id="connect" className="w-full px-4 sm:px-6 md:px-12 py-10 sm:py-16 bg-[#070707] text-white select-none">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* ─────────────────────────────────────────────────────────────
            MAIN 2-COLUMN GRID (Matching User's Reference Layout)
           ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          
          {/* ─── LEFT COLUMN (5 Columns): 2 Stacked Cards ─── */}
          <div className="lg:col-span-5 flex flex-col gap-5 sm:gap-6 justify-between">
            
            {/* TOP CARD: "Let's Work Together" & Email (with Liquid Glass) */}
            <LiquidGlassCard
              className="relative rounded-[28px] sm:rounded-[32px] border border-white/[0.08] p-7 sm:p-9 overflow-hidden flex flex-col justify-center min-h-[170px] sm:min-h-[190px] transition-all hover:border-white/20 shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
              options={{ radius: 28, scale: -85, chroma: 4, border: 0.05, mapBlur: 8, blur: 0, fallbackBlur: 0 }}
              style={{
                background:
                  "radial-gradient(circle at 92% 50%, rgba(255, 94, 0, 0.22) 0%, rgba(18, 18, 18, 0.96) 70%)",
              }}
            >
              <h2 className="font-serif font-normal text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
                Let&apos;s Work Together
              </h2>
              <a
                href="mailto:sujithputta02@gmail.com"
                className="font-sans text-sm sm:text-base text-white/70 hover:text-white transition-colors mt-2 inline-flex items-center gap-1.5 group/email"
              >
                <span>sujithputta02@gmail.com</span>
                <ArrowUpRight className="w-4 h-4 text-white/40 group-hover/email:text-[#FF5E00] transition-colors" />
              </a>
            </LiquidGlassCard>

            {/* BOTTOM CARD: Developer Coordinates & Telemetry (with Liquid Glass) */}
            <LiquidGlassCard
              className="relative rounded-[28px] sm:rounded-[32px] border border-white/[0.08] p-7 sm:p-8 overflow-hidden flex-1 flex flex-col justify-between min-h-[220px] transition-all hover:border-white/20 shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
              options={{ radius: 28, scale: -85, chroma: 4, border: 0.05, mapBlur: 8, blur: 0, fallbackBlur: 0 }}
              style={{
                background:
                  "radial-gradient(circle at 15% 85%, rgba(255, 94, 0, 0.12) 0%, rgba(18, 18, 18, 0.96) 75%)",
              }}
            >
              {/* Top status indicator */}
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>AVAILABLE FOR ROLES</span>
                </div>
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
                  IST / UTC+5:30
                </span>
              </div>

              {/* Center narrative */}
              <div className="my-4">
                <p className="font-display font-bold text-lg sm:text-xl text-white tracking-tight leading-snug">
                  Engineering sovereign AI systems, RAG pipelines, and enterprise microservice architectures.
                </p>
                <div className="mt-3 flex flex-wrap gap-2 font-mono text-[10px] text-white/50">
                  <span className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10">Bangalore, IN</span>
                  <span className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10">Full-Time</span>
                  <span className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10">Direct Inquiries</span>
                </div>
              </div>

              {/* Bottom direct line */}
              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-white/60 font-mono">
                <a
                  href="tel:+917386777701"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#FF5E00]" />
                  <span>+91 7386777701</span>
                </a>
                <span className="text-white/40 text-[10px] uppercase">Latency: &lt; 24h</span>
              </div>
            </LiquidGlassCard>

          </div>

          {/* ─── RIGHT COLUMN (7 Columns): Elegant Minimal Form Card (with Liquid Glass) ─── */}
          <LiquidGlassCard
            className="lg:col-span-7 rounded-[28px] sm:rounded-[32px] border border-white/[0.08] p-7 sm:p-10 relative flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
            options={{ radius: 28, scale: -95, chroma: 4, border: 0.05, mapBlur: 8, blur: 0, fallbackBlur: 0 }}
            style={{
              background: "rgba(18, 18, 18, 0.96)",
            }}
          >
            {/* Success Overlay Banner */}
            <AnimatePresence>
              {isSent && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="absolute inset-0 bg-[#121212]/95 border border-emerald-500/30 rounded-[28px] sm:rounded-[32px] z-30 flex flex-col items-center justify-center p-6 text-center backdrop-blur-md"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 font-bold mb-3">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-white">Inquiry Dispatched</h3>
                  <p className="text-xs text-white/60 mt-1 max-w-sm font-sans leading-relaxed">
                    Opening your default email client with your message drafted to Sujith Putta.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-7">
              {/* Field 1: NAME */}
              <div className="space-y-1">
                <label className="block font-sans text-[11px] font-bold text-white/50 uppercase tracking-widest">
                  Name
                </label>
                <input
                  type="text"
                  autoComplete="name"
                  {...register("name")}
                  className={`w-full bg-transparent border-b py-2 text-sm sm:text-base text-white placeholder-white/20 outline-none transition-colors ${
                    errors.name ? "border-red-500" : "border-white/15 focus:border-[#FF5E00]"
                  }`}
                />
                {errors.name && (
                  <span className="text-[10px] text-red-400 font-mono block mt-1">{errors.name.message}</span>
                )}
              </div>

              {/* Field 2: EMAIL */}
              <div className="space-y-1">
                <label className="block font-sans text-[11px] font-bold text-white/50 uppercase tracking-widest">
                  Email
                </label>
                <input
                  type="email"
                  autoComplete="email"
                  {...register("email")}
                  className={`w-full bg-transparent border-b py-2 text-sm sm:text-base text-white placeholder-white/20 outline-none transition-colors ${
                    errors.email ? "border-red-500" : "border-white/15 focus:border-[#FF5E00]"
                  }`}
                />
                {errors.email && (
                  <span className="text-[10px] text-red-400 font-mono block mt-1">{errors.email.message}</span>
                )}
              </div>

              {/* Field 3: 2-COLUMN ROW (CONTACT NUMBER & WEBSITE OPTIONAL) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div className="space-y-1">
                  <label className="block font-sans text-[11px] font-bold text-white/50 uppercase tracking-widest">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    autoComplete="tel"
                    {...register("phone")}
                    className="w-full bg-transparent border-b border-white/15 focus:border-[#FF5E00] py-2 text-sm sm:text-base text-white placeholder-white/20 outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-sans text-[11px] font-bold text-white/50 uppercase tracking-widest">
                    Website (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="https://"
                    {...register("website")}
                    className="w-full bg-transparent border-b border-white/15 focus:border-[#FF5E00] py-2 text-sm sm:text-base text-white placeholder-white/20 outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Field 4: MESSAGE */}
              <div className="space-y-1">
                <label className="block font-sans text-[11px] font-bold text-white/50 uppercase tracking-widest">
                  Message
                </label>
                <textarea
                  rows={3}
                  {...register("message")}
                  className={`w-full bg-transparent border-b py-2 text-sm sm:text-base text-white placeholder-white/20 outline-none transition-colors resize-none ${
                    errors.message ? "border-red-500" : "border-white/15 focus:border-[#FF5E00]"
                  }`}
                />
                {errors.message && (
                  <span className="text-[10px] text-red-400 font-mono block mt-1">{errors.message.message}</span>
                )}
              </div>

              {/* Field 5: FULL-WIDTH ORANGE GRADIENT SUBMIT BUTTON */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#FF7A00] via-[#FF5E00] to-[#E63900] hover:from-[#FF8A1A] hover:to-[#FF5E00] text-white font-sans text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_25px_rgba(255,94,0,0.35)] hover:shadow-[0_0_35px_rgba(255,94,0,0.6)] hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>DISPATCHING...</span>
                    </>
                  ) : (
                    <span>SUBMIT</span>
                  )}
                </button>
              </div>
            </form>
          </LiquidGlassCard>

        </div>

        {/* ─────────────────────────────────────────────────────────────
            BOTTOM ROW: 3 EQUAL SOCIAL SQUIRCLE CARDS (with Liquid Glass)
           ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-3 sm:gap-5 pt-2">
          
          {/* Card 1: GitHub */}
          <LiquidGlassCard
            className="rounded-[20px] sm:rounded-[24px] border border-white/[0.08] hover:border-white/25 transition-all flex items-center justify-center group shadow-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] overflow-hidden"
            options={{ radius: 20, scale: -75, chroma: 3, border: 0.05, mapBlur: 6, blur: 0, fallbackBlur: 0 }}
            style={{ background: "rgba(18, 18, 18, 0.95)" }}
          >
            <a
              href="https://github.com/sujithputta02"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="w-full h-full p-5 sm:p-6 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            >
              <GithubIcon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:scale-110" />
            </a>
          </LiquidGlassCard>

          {/* Card 2: LinkedIn */}
          <LiquidGlassCard
            className="rounded-[20px] sm:rounded-[24px] border border-white/[0.08] hover:border-white/25 transition-all flex items-center justify-center group shadow-sm hover:shadow-[0_0_20px_rgba(10,102,194,0.2)] overflow-hidden"
            options={{ radius: 20, scale: -75, chroma: 3, border: 0.05, mapBlur: 6, blur: 0, fallbackBlur: 0 }}
            style={{ background: "rgba(18, 18, 18, 0.95)" }}
          >
            <a
              href="https://www.linkedin.com/in/sujith-putta-13257a322"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              className="w-full h-full p-5 sm:p-6 flex items-center justify-center text-white/70 hover:text-[#0A66C2] transition-colors"
            >
              <LinkedinIcon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:scale-110" />
            </a>
          </LiquidGlassCard>

          {/* Card 3: Hugging Face */}
          <LiquidGlassCard
            className="rounded-[20px] sm:rounded-[24px] border border-white/[0.08] hover:border-white/25 transition-all flex items-center justify-center group shadow-sm hover:shadow-[0_0_20px_rgba(255,210,30,0.2)] overflow-hidden"
            options={{ radius: 20, scale: -75, chroma: 3, border: 0.05, mapBlur: 6, blur: 0, fallbackBlur: 0 }}
            style={{ background: "rgba(18, 18, 18, 0.95)" }}
          >
            <a
              href="https://huggingface.co/sujithputta"
              target="_blank"
              rel="noreferrer"
              aria-label="Hugging Face Profile"
              className="w-full h-full p-5 sm:p-6 flex items-center justify-center text-white/70 hover:text-[#FFD21E] transition-colors"
            >
              <HuggingFaceIcon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:scale-110" />
            </a>
          </LiquidGlassCard>

        </div>

        {/* ─────────────────────────────────────────────────────────────
            CENTERED COPYRIGHT LINE (from Reference Image)
           ───────────────────────────────────────────────────────────── */}
        <div className="pt-4 text-center">
          <p className="font-sans text-xs text-white/40 font-light tracking-wide">
            © {new Date().getFullYear()} Sujith Putta | All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
