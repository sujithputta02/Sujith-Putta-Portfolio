"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" fill="currentColor" className={props.className}>
    <path d="M8 1C4.1 1 1 4.1 1 8C1 11.1 3 13.7 5.9 14.7C6.3 14.8 6.4 14.5 6.4 14.3C6.4 14.1 6.4 13.5 6.4 12.8C4.5 13.2 4.1 11.9 4.1 11.9C3.8 11.1 3.3 10.9 3.3 10.9C2.7 10.5 3.3 10.5 3.3 10.5C4 10.6 4.4 11.2 4.4 11.2C5 12.2 6 11.9 6.4 11.7C6.5 11.2 6.7 10.9 6.9 10.7C5.4 10.5 3.8 9.9 3.8 7.3C3.8 6.6 4.1 6 4.5 5.5C4.4 5.3 4.2 4.6 4.6 3.7C4.6 3.7 5.1 3.5 6.3 4.3C6.8 4.2 7.3 4.1 7.8 4.1C8.3 4.1 8.8 4.2 9.3 4.3C10.5 3.5 11 3.7 11 3.7C11.4 4.6 11.2 5.3 11.1 5.5C11.5 6 11.8 6.6 11.8 7.3C11.8 9.9 10.2 10.5 8.7 10.7C8.9 10.9 9.1 11.3 9.1 11.9C9.1 12.8 9.1 13.5 9.1 13.7C9.1 13.9 9.2 14.2 9.6 14.1C12.5 13.1 14.6 10.8 14.6 8C14.6 4.1 11.5 1 8 1Z" />
  </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" fill="currentColor" className={props.className}>
    <rect x="2" y="5" width="3" height="9" />
    <circle cx="3.5" cy="2.5" r="1.5" />
    <path d="M 8 5 H 10 V 7 H 11 C 12 5.5 14 5.5 14 8 V 14 H 11 V 9 C 11 7.5 9.5 7.5 9.5 9 V 14 H 6.5 V 5 Z" />
  </svg>
);

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactFooter() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [dispatchMethod, setDispatchMethod] = useState<"email" | "sms">("email");

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
    
    // Simulate payload verification delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (dispatchMethod === "email") {
      const mailtoUrl = `mailto:sujithputta02@gmail.com?subject=Portfolio inquiry from ${encodeURIComponent(data.name)}&body=${encodeURIComponent(
        `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
      )}`;
      window.location.href = mailtoUrl;
    } else {
      const smsUrl = `sms:+917386777701?body=${encodeURIComponent(
        `Hi Sujith, this is ${data.name} (${data.email}). Msg: ${data.message}`
      )}`;
      window.open(smsUrl, "_blank");
    }

    setIsSubmitting(false);
    setIsSent(true);
    reset();
    setTimeout(() => setIsSent(false), 6000);
  };

  return (
    <section
      id="connect"
      className="relative bg-[#111111] text-[#F7F7F5] py-24 overflow-hidden border-t-2 border-black select-none scroll-mt-20"
    >
      {/* Dark Micro-pattern dot canvas */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "20px 20px"
        }}
      />

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Split Section Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-20 border-b-2 border-white/10">
          
          {/* Info Side (col-span-5) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 18 }}
            className="lg:col-span-5 text-left"
          >
            <span className="font-pixel text-xs text-[#C7FF3D] tracking-widest uppercase font-bold">
              09 // CONVERSION CORE
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-medium text-white mt-4 leading-none">
              Let&apos;s Build Something Meaningful.
            </h2>
            <p className="text-[#A3A3A3] font-sans text-sm mt-6 leading-relaxed">
              Have an enterprise backend scale requirement, a vector index pipeline to design, or a complex React interactive dashboard to compile? Let&apos;s align.
            </p>

            {/* Direct communication coordinates */}
            <div className="mt-12 space-y-6 font-pixel text-xs text-[#A3A3A3]">
              <a
                href="mailto:sujithputta02@gmail.com"
                className="flex items-center gap-4 hover:text-[#C7FF3D] transition-colors group"
              >
                <div className="p-3 bg-white/5 rounded-none border border-white/10 text-white group-hover:bg-[#C7FF3D] group-hover:text-[#111111] group-hover:border-black transition-all duration-150 shadow-[1.5px_1.5px_0px_0px_rgba(255,255,255,0.1)] group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
                    <rect x="2" y="3" width="12" height="10" />
                    <path d="M 2 3 L 8 8 L 14 3" />
                  </svg>
                </div>
                <div>
                  <span className="block text-[9px] text-white/55 font-bold">EMAIL APPOINTMENT</span>
                  <span className="text-sm font-bold text-white tracking-wide">sujithputta02@gmail.com</span>
                </div>
              </a>

              <a
                href="tel:+917386777701"
                className="flex items-center gap-4 hover:text-[#C7FF3D] transition-colors group"
              >
                <div className="p-3 bg-white/5 rounded-none border border-white/10 text-white group-hover:bg-[#C7FF3D] group-hover:text-[#111111] group-hover:border-black transition-all duration-150 shadow-[1.5px_1.5px_0px_0px_rgba(255,255,255,0.1)] group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor">
                    <path d="M 3 2 H 6 L 7 5 L 5.5 6.5 C 6.5 8.5 8 10 10 11 L 11.5 9.5 L 14 10.5 V 13.5 H 13 C 7 13.5 2.5 9 2.5 3 Z" />
                  </svg>
                </div>
                <div>
                  <span className="block text-[9px] text-white/55 font-bold">DIRECT VOICE LINE</span>
                  <span className="text-sm font-bold text-white tracking-wide">+91 7386777701</span>
                </div>
              </a>
            </div>

            {/* External social portals */}
            <div className="flex gap-4 mt-12">
              <a
                href="https://www.linkedin.com/in/sujith-putta-13257a322"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-white/5 rounded-none border border-white/10 text-[#A3A3A3] hover:text-[#111111] hover:bg-[#C7FF3D] hover:border-black transition-all cursor-pointer shadow-[1.5px_1.5px_0px_0px_rgba(255,255,255,0.1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/sujithputta02"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-white/5 rounded-none border border-white/10 text-[#A3A3A3] hover:text-[#111111] hover:bg-[#C7FF3D] hover:border-black transition-all cursor-pointer shadow-[1.5px_1.5px_0px_0px_rgba(255,255,255,0.1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                aria-label="GitHub Portal"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Form Side (col-span-7) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 18 }}
            className="lg:col-span-7 bg-[#1C1C1A] border-2 border-black rounded-none p-6 md:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative text-left"
          >
            <AnimatePresence>
              {isSent && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 bg-[#111111]/95 z-20 flex flex-col items-center justify-center rounded-none border-2 border-black text-center p-6"
                >
                  <div className="p-4 bg-[#C7FF3D] rounded-none border-2 border-black text-[#111111] mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <svg viewBox="0 0 16 16" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square">
                      <path d="M 3 8 L 6 11 L 13 4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-pixel font-bold text-white">Client Dispatched</h3>
                  <p className="text-sm text-[#A3A3A3] mt-2 max-w-sm font-sans">
                    Form payload validated. Redirecting to your local {dispatchMethod === "email" ? "Email" : "SMS"} client to complete sending.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <span className="font-pixel text-[9px] text-[#C7FF3D] tracking-widest uppercase block mb-6 font-bold">
              // TELEMETRY GATEWAY FORM
            </span>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name field */}
              <div className="space-y-1.5">
                <label className="block font-pixel text-[10px] text-white/55 uppercase font-bold">
                  Identification Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Alexis Carter"
                  {...register("name")}
                  className={`w-full bg-[#111111] border-2 rounded-none py-3 px-4 text-sm text-white placeholder-white/20 outline-none transition-all ${
                    errors.name ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-[#C7FF3D] focus:shadow-[2px_2px_0px_0px_rgba(199,255,61,0.2)]"
                  }`}
                />
                {errors.name && (
                  <span className="block font-pixel text-[10px] text-red-500 font-bold">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Email field */}
              <div className="space-y-1.5">
                <label className="block font-pixel text-[10px] text-white/55 uppercase font-bold">
                  Communication Mail
                </label>
                <input
                  type="email"
                  placeholder="e.g. alexis@company.com"
                  {...register("email")}
                  className={`w-full bg-[#111111] border-2 rounded-none py-3 px-4 text-sm text-white placeholder-white/20 outline-none transition-all ${
                    errors.email ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-[#C7FF3D] focus:shadow-[2px_2px_0px_0px_rgba(199,255,61,0.2)]"
                  }`}
                />
                {errors.email && (
                  <span className="block font-pixel text-[10px] text-red-500 font-bold">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Message field */}
              <div className="space-y-1.5">
                <label className="block font-pixel text-[10px] text-white/55 uppercase font-bold">
                  Project System Specifications
                </label>
                <textarea
                  rows={4}
                  placeholder="Summarize database volumes, pipeline targets, or dashboard designs..."
                  {...register("message")}
                  className={`w-full bg-[#111111] border-2 rounded-none py-3 px-4 text-sm text-white placeholder-white/20 outline-none transition-all resize-none ${
                    errors.message ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-[#C7FF3D] focus:shadow-[2px_2px_0px_0px_rgba(199,255,61,0.2)]"
                  }`}
                />
                {errors.message && (
                  <span className="block font-pixel text-[10px] text-red-500 font-bold">
                    {errors.message.message}
                  </span>
                )}
              </div>

              {/* Submit buttons row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Email dispatch button */}
                <button
                  type="submit"
                  onClick={() => setDispatchMethod("email")}
                  disabled={isSubmitting}
                  className="w-full relative flex items-center justify-center gap-2 bg-[#C7FF3D] hover:bg-[#DFFF72] text-[#111111] font-bold py-4 rounded-none border-2 border-black transition-all select-none text-xs font-pixel disabled:opacity-50 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                >
                  {isSubmitting && dispatchMethod === "email" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying Draft...</span>
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
                        <rect x="2" y="3" width="12" height="10" />
                        <path d="M 2 3 L 8 8 L 14 3" />
                      </svg>
                      <span>Dispatch via Email</span>
                    </>
                  )}
                </button>

                {/* SMS dispatch button */}
                <button
                  type="submit"
                  onClick={() => setDispatchMethod("sms")}
                  disabled={isSubmitting}
                  className="w-full relative flex items-center justify-center gap-2 bg-[#1c1c1a] hover:bg-[#2c2c2a] text-white border-2 border-white/15 font-bold py-4 rounded-none transition-all select-none text-xs font-pixel disabled:opacity-50 cursor-pointer shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]"
                >
                  {isSubmitting && dispatchMethod === "sms" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying Draft...</span>
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 16 16" className="w-4 h-4 text-[#C7FF3D]" fill="currentColor">
                        <path d="M 2 2 L 14 8 L 2 14 L 4 8 Z" />
                      </svg>
                      <span>Dispatch via SMS</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Footer Row */}
        <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-4 font-pixel text-[10px] text-white/45 uppercase tracking-wider font-bold">
          <div className="flex items-center gap-2">
            <span className="font-sacramento text-lg text-white font-bold tracking-wide normal-case">
              Sujith Putta
            </span>
            <span className="opacity-50">— Generative AI Developer & Product Developer</span>
          </div>
          <div>Bengaluru, India</div>
          <div>© {new Date().getFullYear()} All Rights Reserved.</div>
        </div>

      </div>
    </section>
  );
}
