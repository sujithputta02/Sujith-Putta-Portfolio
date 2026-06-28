"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profileData } from "@/data/profile";
import { 
  LayoutTemplate,
  Server,
  Network,
  KeyRound,
  UserCheck,
  ShieldAlert,
  Shield,
  Globe,
  Sparkles,
  Compass,
  Cpu,
  Search,
  HelpCircle,
  Code,
  X
} from "lucide-react";

// Mappings & Metadata definitions
interface SkillDetail {
  slug?: string;
  color: string;
  lucideIcon?: string;
  desc: string;
}

interface SkillItem {
  name: string;
  category: string;
  categoryLabel: string;
  slug?: string;
  color: string;
  lucideIcon?: string;
  desc: string;
}

const skillMetadata: Record<string, SkillDetail> = {
  // Languages
  "Python": { slug: "python", color: "3776AB", desc: "Primary language for AI pipelines, FastAPI backend services, and PyTorch deep learning." },
  "TypeScript": { slug: "typescript", color: "3178C6", desc: "Ensures type safety across the React frontend and modular Node.js API structures." },
  "JavaScript": { slug: "javascript", color: "F7DF1E", desc: "Used for core browser animation dynamics, DOM manipulation, and dynamic scroll handlers." },
  "Java": { slug: "openjdk", color: "EA2D2E", desc: "Academic software architecture, class-based object-oriented design patterns, and DSA." },
  "C": { slug: "c", color: "A8B9CC", desc: "Low-level compiler execution frameworks, memory allocation models, and hardware links." },

  // Frontend
  "React.js": { slug: "react", color: "61DAFB", desc: "Constructing modular SPA frameworks, state context trees, and responsive DOM components." },
  "Tailwind CSS": { slug: "tailwindcss", color: "06B6D4", desc: "Utility-first CSS compiler for responsive structural design systems and premium transitions." },
  "HTML5/CSS3": { slug: "html5", color: "E34F26", desc: "Semantic structural hierarchy coupled with custom properties and CSS Grid layouts." },
  "Vite": { slug: "vite", color: "646CFF", desc: "High-speed frontend builder utilizing native ES modules for instant hot reloads." },
  "Component-driven UI": { lucideIcon: "LayoutTemplate", color: "FF007F", desc: "Structuring atomic, fully isolated, testable React components from design mockups." },
  "Figma (UI/UX)": { slug: "figma", color: "F24E1E", desc: "Prototyping responsive developer portfolios, designing screen interactions, and asset grids." },

  // Backend
  "FastAPI": { slug: "fastapi", color: "009688", desc: "High-speed Python microservices supporting concurrent async operations in the NEXORA RAG platform." },
  "Node.js": { slug: "nodedotjs", color: "339933", desc: "Asynchronous backend platform orchestration running the core services for DineInGo." },
  "Express.js": { slug: "express", color: "000000", desc: "Minimalist server routing engine running REST endpoints with middleware security chains." },
  "REST APIs": { lucideIcon: "Server", color: "5A67D8", desc: "Architecting standardized JSON request-response channels conforming strictly to HTTP specs." },
  "GraphQL": { slug: "graphql", color: "E10098", desc: "Formulating queries and resolvers for granular, single-trip multi-table relational schema fetches." },
  "Microservices": { lucideIcon: "Network", color: "4299E1", desc: "Decoupling monolithic backend logic into isolated, fault-tolerant containerized execution packages." },
  "SOLID principles": { lucideIcon: "KeyRound", color: "48BB78", desc: "Applying standard software patterns to ensure single-responsibility and open-closed code design." },

  // Databases
  "MySQL (SQL, JOINs, query optimization)": { slug: "mysql", color: "4479A1", desc: "Writing optimized database queries, handling complex JOIN arrays, and creating targeted indices." },
  "MongoDB (NoSQL)": { slug: "mongodb", color: "47A248", desc: "Handling scalable document-based JSON records dynamically within the DineInGo databases." },
  "FAISS (vector)": { slug: "meta", color: "044F8E", desc: "Indexing dense vectors for fast inner-product similarity search in the NEXORA hybrid search engine." },
  "Neo4j (graph)": { slug: "neo4j", color: "008CC1", desc: "Mapping relationships as nodes and edges to query structural knowledge networks dynamically." },

  // DevOps & Cloud
  "Microsoft Azure": { slug: "microsoftazure", color: "0089D6", desc: "Hosting cloud server stacks, managing container registries, and serverless compute functions." },
  "AWS": { slug: "amazonwebservices", color: "FF9900", desc: "Managing foundational computing clouds, virtual servers, secure networks, and file buckets." },
  "Docker": { slug: "docker", color: "2496ED", desc: "Packaging systems into clean containers to guarantee environment consistency between dev and prod." },
  "GitHub Actions CI/CD": { slug: "githubactions", color: "2088FF", desc: "Automating unit tests, format checking, and multi-tier production builds on git branch pushes." },
  "Linux (Ubuntu)": { slug: "ubuntu", color: "E95420", desc: "Configuring security parameters, process execution daemons, and storage directories via SSH terminal." },

  // Security
  "OWASP Top 10": { slug: "owasp", color: "000000", desc: "Securing systems against injection, data leaks, cross-site scripting, and broken authentication." },
  "JWT auth": { slug: "jsonwebtokens", color: "D63AFF", desc: "Stateless session validation token framework ensuring absolute route authorization." },
  "RBAC": { lucideIcon: "UserCheck", color: "319795", desc: "Configuring multi-tier user privilege roles protecting sensitive workspace routes." },
  "rate limiting": { lucideIcon: "ShieldAlert", color: "DD6B20", desc: "Implementing API limits (e.g. 100 req/15min) to prevent brute-force attacks and resource exhaustion." },
  "Zod/Joi validation": { slug: "zod", color: "3E67B1", desc: "Strict schema verification of incoming POST payloads before DB persistence loops." },
  "Helmet.js": { lucideIcon: "Shield", color: "29B5F6", desc: "Injecting secure HTTP response headers to defend against clickjacking and browser sniffing." },
  "CORS": { lucideIcon: "Globe", color: "805AD5", desc: "Restricting cross-origin API request vectors strictly to trusted and verified domains." },

  // AI & Tools
  "Gemini AI": { slug: "googlegemini", color: "8E75C2", desc: "Interfacing with Google Gemini models for multimodal generation and prompt workflows." },
  "Kiro": { lucideIcon: "Sparkles", color: "FFB900", desc: "Leveraging custom agent logic for complex, autonomous reasoning flows." },
  "Antigravity": { lucideIcon: "Compass", color: "00D2FF", desc: "Utilizing advanced developer assistant environments for rapid context exploration." },
  "Cursor": { slug: "cursor", color: "5E5E5E", desc: "Using AI-assisted developer IDE layouts to accelerate codebase refactoring loops." },
  "Claude Code": { slug: "anthropic", color: "CC9966", desc: "Executing automated terminal code audit checks and quick hotfixes." },
  "Ollama (LLaMA 3)": { slug: "ollama", color: "000000", desc: "Hosting completely local, air-gapped language models to avoid exposing sensitive workspace queries." },
  "RAG pipelines": { lucideIcon: "Cpu", color: "C7FF3D", desc: "Structuring document ingestion, chunk overlap indexing, and semantic search context assembly." },
  "scikit-learn": { slug: "scikitlearn", color: "F7931E", desc: "Applying mathematical algorithms for data clustering, regressions, and metric tracking." },
  "pandas": { slug: "pandas", color: "150458", desc: "Transforming tabular data, parsing dirty data sheets, and doing mathematical aggregations." },
  "PyTorch": { slug: "pytorch", color: "EE4C2C", desc: "Building, training, and running forward/backward passes for machine learning tensor models." }
};

const categories = [
  { 
    id: "ai", 
    label: "AI & Machine Learning", 
    num: "01",
    summary: "Engineering localized retrieval systems (RAG), high-dimensional vector databases (FAISS), and relational graph networks (Neo4j) to build air-gapped intelligent agents."
  },
  { 
    id: "languages", 
    label: "Programming Languages", 
    num: "02",
    summary: "Compiling native software, running asynchronous script engines, and writing strict, type-safe structures across Python, TypeScript, and standard OOP languages."
  },
  { 
    id: "backend", 
    label: "Backend Architecture", 
    num: "03",
    summary: "Designing robust REST/GraphQL routing, microservice components, and SOLID architectures to power reliable production backend structures."
  },
  { 
    id: "frontend", 
    label: "Frontend Engineering", 
    num: "04",
    summary: "Crafting component-driven modular UI layouts, fast client bundlers, and visually optimized, responsive web interfaces."
  },
  { 
    id: "databases", 
    label: "Databases & Storage", 
    num: "05",
    summary: "Optimizing relational schema query structures, handling complex document stores, and managing high-speed vector retrieval paths."
  },
  { 
    id: "devops", 
    label: "Cloud & DevOps", 
    num: "06",
    summary: "Configuring continuous delivery pipelines, deploying isolated container setups, and hosting microservice networks on major cloud platforms."
  },
  { 
    id: "security", 
    label: "SecOps & OWASP Defense", 
    num: "07",
    summary: "Mitigating web vulnerabilities, deploying token validation filters, enforcing rate-limiting layers, and checking input validations."
  }
];

const getLucideIcon = (name: string) => {
  switch (name) {
    case "LayoutTemplate": return LayoutTemplate;
    case "Server": return Server;
    case "Network": return Network;
    case "KeyRound": return KeyRound;
    case "UserCheck": return UserCheck;
    case "ShieldAlert": return ShieldAlert;
    case "Shield": return Shield;
    case "Globe": return Globe;
    case "Sparkles": return Sparkles;
    case "Compass": return Compass;
    case "Cpu": return Cpu;
    default: return HelpCircle;
  }
};

const headerVariants = {
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

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04
    }
  }
};

// Skill Card Component
function SkillCard({ skill }: { skill: SkillItem }) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const IconComponent = skill.lucideIcon ? getLucideIcon(skill.lucideIcon) : null;
  const brandColor = `#${skill.color}`;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 15, scale: 0.98 },
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative p-5 rounded-none bg-white border-2 border-black flex flex-col justify-between min-h-[145px] transition-all duration-150 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
    >
      {/* Dynamic top brand colored strip on hover */}
      <div 
        className="absolute top-0 left-0 right-0 h-[3px] transition-transform duration-300 origin-left"
        style={{
          backgroundColor: brandColor,
          transform: isHovered ? "scaleX(1)" : "scaleX(0)"
        }}
      />

      <div className="relative z-10 flex flex-col h-full justify-between gap-4">
        <div>
          {/* Logo & Category tag row */}
          <div className="flex items-center justify-between gap-3 mb-2.5">
            <div 
              className="w-10 h-10 rounded-none flex items-center justify-center border-2 border-black transition-all duration-150 bg-white"
              style={{ 
                boxShadow: isHovered ? "2.5px 2.5px 0px 0px rgba(0,0,0,1)" : "1.5px 1.5px 0px 0px rgba(0,0,0,1)",
                transform: isHovered ? "translate(-1px, -1px)" : "none"
              }}
            >
              {!imageError && skill.slug ? (
                <img 
                  src={`https://cdn.simpleicons.org/${skill.slug}/${skill.color}`}
                  className="w-5.5 h-5.5 object-contain"
                  alt={skill.name}
                  onError={() => setImageError(true)}
                />
              ) : (
                IconComponent ? (
                  <IconComponent className="w-5.5 h-5.5" style={{ color: brandColor }} />
                ) : (
                  <Code className="w-5.5 h-5.5" style={{ color: brandColor }} />
                )
              )}
            </div>
            
            <span 
              className="font-pixel text-[8px] px-2.5 py-0.5 rounded-none border text-[#555555] bg-white transition-all duration-150"
              style={{ 
                borderColor: isHovered ? brandColor : "rgba(17,17,17,0.15)",
                color: isHovered ? brandColor : "#555555"
              }}
            >
              {skill.categoryLabel}
            </span>
          </div>

          {/* Skill Title */}
          <h4 className="font-sans font-bold text-sm text-[#111111] leading-tight">
            {skill.name}
          </h4>
          
          {/* Skill Application Context Description */}
          <p className="font-sans text-[11px] text-[#555555] mt-1.5 leading-relaxed font-light">
            {skill.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState("ai");
  const [searchQuery, setSearchQuery] = useState("");
  const { skills } = profileData;

  // Mouse drag-to-scroll controls for mobile layout categories menu on desktop browsers
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragged, setDragged] = useState(false);

  // Category list scrollability indicator states
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft: elScrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftFade(elScrollLeft > 5);
    setShowRightFade(elScrollLeft + clientWidth < scrollWidth - 5);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll);
      // Run once on load/render to check if scrollable
      handleScroll();
      
      // Also observe resize to update bounds if window changes
      const observer = new ResizeObserver(() => handleScroll());
      observer.observe(el);
      
      return () => {
        el.removeEventListener("scroll", handleScroll);
        observer.disconnect();
      };
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDown(true);
    setDragged(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(x - startX) > 5) {
      setDragged(true);
    }
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // Compile unique flat list of skills
  const allSkills: SkillItem[] = [];

  Object.entries(skills).forEach(([categoryKey, skillNames]) => {
    const catInfo = categories.find(c => c.id === categoryKey);
    const categoryLabel = catInfo ? catInfo.label : categoryKey;
    
    skillNames.forEach((name) => {
      const meta = skillMetadata[name] || { color: "111111", desc: "Technical skill used in enterprise-grade product engineering." };
      allSkills.push({
        name,
        category: categoryKey,
        categoryLabel: categoryLabel.replace(" & SecOps", "").replace(" & ML", "").replace(" & Cloud", ""),
        slug: meta.slug,
        color: meta.color || "111111",
        lucideIcon: meta.lucideIcon,
        desc: meta.desc
      });
    });
  });

  const isSearching = searchQuery.trim() !== "";

  // Filter logic:
  // - If searching: filter flat list by query
  // - If not searching: filter list by active category (deduplicating duplicates)
  const displayedSkills = isSearching
    ? allSkills.filter((skill, index, self) => self.findIndex(s => s.name === skill.name) === index)
    : allSkills.filter((skill) => skill.category === selectedCategory);

  const filteredSkills = displayedSkills.filter((skill) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    
    return (
      skill.name.toLowerCase().includes(query) ||
      skill.desc.toLowerCase().includes(query) ||
      skill.categoryLabel.toLowerCase().includes(query)
    );
  });

  return (
    <section id="skills" className="py-24 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Header Info */}
      <motion.div
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="mb-16 text-center md:text-left"
      >
        <span className="font-mono text-xs text-[#555555] tracking-widest uppercase">
          01 // EXPERTISE MATRIX
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-medium text-[#111111] leading-tight mt-3">
          Technical Stack & Skills
        </h2>
        <p className="text-[#555555] font-sans text-sm md:text-base mt-3 max-w-xl">
          An interactive index of my programming languages, architectures, AI pipelines, databases, and deployment platforms.
        </p>
      </motion.div>

      {/* Sleek Search Control */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0 }
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex items-center justify-between gap-6 mb-12 bg-white border-2 border-black p-4 rounded-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] relative z-10"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-none bg-[#C7FF3D] border border-black animate-pulse" />
          <span className="font-pixel text-[10px] tracking-widest text-[#555555] uppercase">
            {isSearching ? `FILTERED SEARCH INDEX` : `EXPLORING CATEGORIES`}
          </span>
        </div>

        {/* Live Search Input */}
        <div className="relative flex items-center w-full sm:w-80">
          <Search className="absolute left-4 w-4 h-4 text-[#111111] z-10" />
          <input
            type="text"
            placeholder="Search stack (e.g. Python, Docker, FAISS)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border-2 border-black rounded-none px-5 py-2.5 text-xs font-pixel focus:outline-none pl-11 pr-12 text-[#111111] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[-1px] focus:translate-y-[-1px] focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
          />
          {searchQuery ? (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-4 p-0.5 rounded-none border border-black bg-white hover:bg-[#C7FF3D] text-[#111111] transition-colors cursor-pointer z-10"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <kbd className="absolute right-4 hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-none border border-black bg-[#111111] font-pixel text-[8px] text-white select-none pointer-events-none shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] z-10">
              <span>⌘</span>K
            </kbd>
          )}
        </div>
      </motion.div>

      {/* Main Layout Area */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {isSearching ? (
            /* Search Results Grid View (Full Width) */
            <motion.div
              key="search-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <div className="mb-6 flex justify-between items-center">
                <span className="font-mono text-[10px] text-[#555555]">
                  FOUND {filteredSkills.length} MATCHING TOOLS
                </span>
                {filteredSkills.length > 0 && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="font-pixel text-[9px] text-[#555555] underline hover:text-[#111111]"
                  >
                    CLEAR SEARCH
                  </button>
                )}
              </div>

              <motion.div
                variants={gridVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {filteredSkills.map((skill) => (
                  <SkillCard key={`${skill.name}-${skill.category}`} skill={skill} />
                ))}
              </motion.div>

              {filteredSkills.length === 0 && (
                <div className="py-20 text-center bg-[#F7F7F5] border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <HelpCircle className="w-10 h-10 mx-auto text-[#111111] mb-3" />
                  <h4 className="font-pixel font-bold text-[#111111] text-base">No matching tools found</h4>
                  <p className="font-sans text-xs text-[#555555] mt-1 max-w-sm mx-auto font-light leading-relaxed">
                    We couldn&apos;t find anything matching &quot;{searchQuery}&quot; in the expertise database. Try checking the spelling.
                  </p>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="mt-5 px-5 py-2 border-2 border-black rounded-none text-xs font-pixel font-bold text-[#111111] bg-white hover:bg-[#C7FF3D] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-100"
                  >
                    Reset Search
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            /* Luxury Split-Screen explorer layout */
            <motion.div
              key="split-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
            >
              {/* Left Column: Sticky Index Menu (Desktop) */}
              <div className="lg:col-span-5">
                {/* Mobile horizontal category index with fading gradient indicators */}
                <div className="relative lg:hidden mb-8 -mx-4">
                  {/* Left fade gradient */}
                  {showLeftFade && (
                    <div className="absolute left-0 top-0 bottom-3 w-12 bg-gradient-to-r from-[#F7F7F5] to-transparent pointer-events-none z-20" />
                  )}
                  
                  {/* Right fade gradient */}
                  {showRightFade && (
                    <div className="absolute right-0 top-0 bottom-3 w-12 bg-gradient-to-l from-[#F7F7F5] to-transparent pointer-events-none z-20" />
                  )}
                  
                  <div 
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    className="flex items-center gap-6 overflow-x-auto pb-3 border-b border-[#111111]/8 px-4 scrollbar-visible select-none cursor-grab active:cursor-grabbing"
                  >
                    {categories.map((category) => {
                      const isActive = selectedCategory === category.id;
                      return (
                        <button
                          key={category.id}
                          onClick={(e) => {
                            if (dragged) {
                              e.preventDefault();
                              return;
                            }
                            setSelectedCategory(category.id);
                          }}
                          className="flex flex-col items-start gap-1 text-left cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C7FF3D]/50 focus-visible:ring-offset-2 rounded-none px-2 py-1 -mx-2 -my-1"
                        >
                          <span className="font-pixel text-[9px] text-[#555555]">{category.num}</span>
                          <span 
                            className="font-pixel font-bold text-xs transition-colors duration-200"
                            style={{ 
                              color: isActive ? "#111111" : "#555555",
                              fontWeight: isActive ? "700" : "500" 
                            }}
                          >
                            {category.label}
                          </span>
                          <div 
                            className="h-[2px] bg-[#111111] w-full transition-transform duration-300 origin-left"
                            style={{ transform: isActive ? "scaleX(1)" : "scaleX(0)" }}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Mobile active summary overview */}
                <div className="block lg:hidden mb-6 bg-[#F7F7F5] border border-[#111111]/5 p-4 rounded-2xl">
                  <span className="font-mono text-[9px] text-[#555555] uppercase">CATEGORY OVERVIEW</span>
                  <p className="font-sans text-xs text-[#555555] mt-1 leading-relaxed font-light">
                    {categories.find(c => c.id === selectedCategory)?.summary}
                  </p>
                </div>

                {/* Desktop vertical sticky accordion index */}
                <div className="hidden lg:flex flex-col gap-6 lg:sticky lg:top-28">
                  {categories.map((category) => {
                    const isActive = selectedCategory === category.id;
                    return (
                      <div 
                        key={category.id} 
                        className="group cursor-pointer select-none text-left"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <div className="flex items-center gap-4 relative py-1">
                          {/* Active Line indicator */}
                          <div className="w-8 h-2 relative flex-shrink-0">
                            {isActive && (
                              <motion.div 
                                layoutId="skillsActiveLine"
                                className="absolute left-0 top-0 w-6 h-2 bg-[#C7FF3D] border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                              />
                            )}
                          </div>
                          
                          <div>
                            <div className="flex items-baseline gap-2">
                              <span className="font-pixel text-[9px] text-[#555555] tracking-widest">
                                {category.num}
                              </span>
                              <h3 
                                className="font-pixel font-bold text-base transition-colors duration-300"
                                style={{
                                  color: isActive ? "#111111" : "#555555",
                                  fontWeight: isActive ? "800" : "500"
                                }}
                              >
                                {category.label}
                              </h3>
                            </div>
                          </div>
                        </div>

                        {/* Summary Narrative */}
                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <p className="font-sans text-xs text-[#555555] pl-12 mt-2 leading-relaxed max-w-sm font-light">
                                {category.summary}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Active Category Cards Grid */}
              <div className="lg:col-span-7">
                <motion.div
                  key={selectedCategory} // Forces staggered wave animations on active index change
                  variants={gridVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {filteredSkills.map((skill) => (
                    <SkillCard key={`${skill.name}-${skill.category}`} skill={skill} />
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
