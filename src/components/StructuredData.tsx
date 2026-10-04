import React from "react";
import { profileData } from "@/data/profile";

export default function StructuredData() {
  const BASE_URL = "https://sujith-putta-portfolio.vercel.app";

  const personId = `${BASE_URL}/#person`;
  const websiteId = `${BASE_URL}/#website`;
  const webpageId = `${BASE_URL}/#webpage`;

  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      // 1. PERSON SCHEMA (Authority Entity)
      {
        "@type": "Person",
        "@id": personId,
        name: "Sujith Putta",
        givenName: "Sujith",
        familyName: "Putta",
        additionalName: "sujithputta02",
        jobTitle: "Generative AI Developer & Product Developer",
        description:
          "Generative AI Developer and Full-Stack Systems Architect specializing in Sovereign RAG pipelines, FastAPI microservices, deterministic Rust safety gates, and production web systems.",
        url: BASE_URL,
        image: {
          "@type": "ImageObject",
          "@id": `${BASE_URL}/#profile-image`,
          url: `${BASE_URL}/Sujith%20Putta%20Profile.png`,
          caption: "Sujith Putta — Generative AI Developer & Product Developer",
        },
        email: "mailto:sujithputta02@gmail.com",
        telephone: "+917386777701",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bengaluru",
          addressRegion: "Karnataka",
          addressCountry: "IN",
        },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Dayananda Sagar University",
          url: "https://www.dsu.edu.in",
        },
        knowsAbout: [
          "Generative AI",
          "Retrieval-Augmented Generation (RAG)",
          "Vector Databases (FAISS)",
          "Graph Databases (Neo4j)",
          "FastAPI",
          "Rust",
          "Axum",
          "Tokio",
          "TypeScript",
          "Next.js 16",
          "React 19",
          "Python",
          "PyTorch",
          "Docker",
          "Microsoft Azure",
          "Amazon Web Services (AWS)",
          "OWASP Top 10 Security",
          "System Design & Microservices",
        ],
        sameAs: [
          "https://github.com/sujithputta02",
          "https://linkedin.com/in/sujithputta02",
          "https://huggingface.co/sujithputta02",
          "https://www.kaggle.com/sujithputta",
          "https://esapay.vercel.app",
          "https://dine-in-go.vercel.app",
        ],
        hasCredential: profileData.credentials.map((cred) => ({
          "@type": "EducationalOccupationalCredential",
          name: cred.title,
          credentialCategory: cred.issuer,
          recognizedBy: {
            "@type": "Organization",
            name: cred.issuer.split("(")[0].trim(),
          },
          ...(cred.link ? { url: cred.link } : {}),
        })),
      },

      // 2. WEBSITE SCHEMA
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: BASE_URL,
        name: "Sujith Putta Portfolio",
        alternateName: "Sujith Putta AI Developer Showcase",
        headline: "Sujith Putta | Generative AI Developer & Product Developer",
        description:
          "Official interactive portfolio of Sujith Putta showcasing Sovereign RAG architectures, FastAPI microservices, Rust safety engines, and production web products.",
        publisher: { "@id": personId },
        author: { "@id": personId },
        inLanguage: "en-US",
      },

      // 3. PROFILEPAGE SCHEMA
      {
        "@type": "ProfilePage",
        "@id": webpageId,
        url: BASE_URL,
        name: "Sujith Putta — Generative AI Developer & Product Developer",
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
        about: { "@id": personId },
        description:
          "Explore technical projects, interactive RAG architecture pipelines, published open-source libraries, and credentials of Sujith Putta.",
        primaryImageOfPage: { "@id": `${BASE_URL}/#profile-image` },
        inLanguage: "en-US",
      },

      // 4. SOFTWARE PROJECTS ITEMLIST (SoftwareSourceCode & SoftwareApplication)
      {
        "@type": "ItemList",
        "@id": `${BASE_URL}/#projects-list`,
        name: "Engineered AI & Full-Stack Projects by Sujith Putta",
        description: "Portfolio of software applications, AI models, and open-source engines built by Sujith Putta.",
        itemListElement: profileData.projects.map((project, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          item: {
            "@type": "SoftwareApplication",
            name: project.title,
            headline: project.metadata,
            description: project.engineeredCore,
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Cross-platform, Cloud, Docker, Linux, macOS, Windows",
            programmingLanguage: project.techStack.join(", "),
            ...(project.liveLink ? { url: project.liveLink } : {}),
            ...(project.githubLink
              ? {
                  codeRepository: project.githubLink,
                  sameAs: project.githubLink,
                }
              : {}),
          },
        })),
      },

      // 5. FAQ SCHEMA (High-intent Generative Engine Optimization for SearchGPT, Perplexity, Gemini & Google Snippets)
      {
        "@type": "FAQPage",
        "@id": `${BASE_URL}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Who is Sujith Putta?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sujith Putta is a Generative AI Developer, Full-Stack Systems Architect, and Product Builder based in Bengaluru, India. He specializes in Sovereign RAG pipelines, FastAPI microservices, deterministic Rust safety gates, and cloud-native systems on Azure & AWS.",
            },
          },
          {
            "@type": "Question",
            name: "What technologies and skills does Sujith Putta specialize in?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sujith specializes in Python, Rust (Axum, Tokio), TypeScript, React 19, Next.js 16, FastAPI, Node.js, vector databases (FAISS), graph databases (Neo4j), SQL and NoSQL (MySQL, MongoDB), PyTorch, LLaMA 3, Ollama, Docker, Microsoft Azure, and Amazon Web Services (AWS).",
            },
          },
          {
            "@type": "Question",
            name: "What key projects has Sujith Putta engineered?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Key engineering projects include ESA (Autonomous Payment Resilience with Rust safety gate), DineInGo (smart dining platform with 3D AR menu preview and Socket.IO), NEXORA (offline hybrid RAG for aerospace intelligence with FAISS & Neo4j), LifeFlow (Microsoft Imagine Cup 2026 administrative workflow navigation with DeepSeek & Azure AI Search), RunaGen AI (Google Cloud Gen AI Hackathon winner), and LumaForge (Apple Silicon-optimized image generation engine).",
            },
          },
          {
            "@type": "Question",
            name: "What credentials and achievements does Sujith Putta have?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sujith is an AWS Academy Graduate, Google Cloud CI/CD badge holder, Kaggle 5-Day AI Agents course graduate, 2x NASA Space Apps Challenge global participant (2024 & 2025), and Microsoft Imagine Cup 2026 competitor. He holds a 9.05 CGPA in Computer Science and Technology at Dayananda Sagar University.",
            },
          },
          {
            "@type": "Question",
            name: "Is Sujith Putta available for full-time engineering or consulting roles?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, Sujith Putta is open to opportunities in Generative AI engineering, backend systems, and full-stack product development. You can get in touch directly via email at sujithputta02@gmail.com or connect on LinkedIn at https://linkedin.com/in/sujithputta02.",
            },
          },
          {
            "@type": "Question",
            name: "How can I contact Sujith Putta?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can reach Sujith Putta via email at sujithputta02@gmail.com, phone at +91 7386777701, LinkedIn at https://linkedin.com/in/sujithputta02, or through his GitHub profile at https://github.com/sujithputta02.",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredDataGraph),
      }}
    />
  );
}
