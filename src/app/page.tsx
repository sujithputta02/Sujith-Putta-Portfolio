import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import AboutMe from "@/components/AboutMe";
import Skills from "@/components/Skills";
import SocialProof from "@/components/SocialProof";
import Education from "@/components/Education";
import ProjectGallery from "@/components/ProjectGallery";
import CaseStudy from "@/components/CaseStudy";
import DesignSystem from "@/components/DesignSystem";
import Timeline from "@/components/Timeline";
import Credentials from "@/components/Credentials";
import ContactFooter from "@/components/ContactFooter";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col w-full relative z-10">
        {/* Section 1: Hero (Full-Screen Viewport Poster) */}
        <Hero />

        {/* Section 1.1: Architectural Manifesto */}
        <Manifesto />

        {/* Section 1.5: About Me */}
        <AboutMe />

        {/* Section 1.6: Skills Matrix Bento Board */}
        <Skills />

        {/* Section 2: Social Proof Carousel */}
        <SocialProof />

        {/* Section 2.5: Academic Education & Coursework */}
        <Education />

        {/* Section 3: Project Gallery Panels & Fanned Showcase */}
        <ProjectGallery />

        {/* Section 4: Life Flow AI Case Study */}
        <CaseStudy />

        {/* Section 5: Design System Showcase */}
        <DesignSystem />

        {/* Section 6: Production Chronicle Timeline */}
        <Timeline />

        {/* Section 11: Credentials Grid Hover Board */}
        <Credentials />

        {/* Section 12: Zod-validated Connect form & copyright footer */}
        <ContactFooter />
      </main>
    </>
  );
}
