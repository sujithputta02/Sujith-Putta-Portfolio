import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import Skills from "@/components/Skills";
import SocialProof from "@/components/SocialProof";
import Education from "@/components/Education";
import BentoGrid from "@/components/BentoGrid";
import ProjectGallery from "@/components/ProjectGallery";
import CaseStudy from "@/components/CaseStudy";
import Capabilities from "@/components/Capabilities";
import AIPipeline from "@/components/AIPipeline";
import DesignSystem from "@/components/DesignSystem";
import Research from "@/components/Research";
import Timeline from "@/components/Timeline";
import Credentials from "@/components/Credentials";
import ContactFooter from "@/components/ContactFooter";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col w-full relative z-10">
        {/* Section 1: Hero */}
        <Hero />

        {/* Section 1.5: About Me */}
        <AboutMe />

        {/* Section 1.6: Skills Matrix Bento Board */}
        <Skills />

        {/* Section 2: Social Proof Carousel */}
        <SocialProof />

        {/* Section 2.5: Academic Education & Coursework */}
        <Education />

        {/* Section 3: Recruiter Bento Grid */}
        <BentoGrid />


        {/* Section 4: Project Gallery Panels */}
        <ProjectGallery />

        {/* Section 5: Life Flow AI Case Study */}
        <CaseStudy />

        {/* Section 6: Capabilities Marquee */}
        <Capabilities />

        {/* Section 7: NEXORA AI Pipeline Visualizer */}
        <AIPipeline />

        {/* Section 8: Design System Showcase */}
        <DesignSystem />

        {/* Section 9: Academic & Research Column */}
        <Research />

        {/* Section 10: Production Chronicle Timeline */}
        <Timeline />

        {/* Section 11: Credentials Grid Hover Board */}
        <Credentials />

        {/* Section 12: Zod-validated Connect form & copyright footer */}
        <ContactFooter />
      </main>
    </>
  );
}
