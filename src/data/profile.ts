export interface Project {
  title: string;
  metadata: string;
  status?: string;
  techStack: string[];
  engineeredCore: string;
  securityMatrix?: string;
  dataOrchestration?: string;
  performanceVector?: string;
  securityInfrastructure?: string;
  cicdMetric?: string;
  uiOptimization?: string;
  liveLink?: string;
  githubLink?: string;
  earlyAccessLink?: string;
  businessLink?: string;
}

export interface Credential {
  title: string;
  issuer: string;
  badgeType?: string;
  link?: string;
}

export interface TimelineNode {
  years: string;
  title: string;
  description: string;
}

export interface ProfileData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  education: {
    degree: string;
    school: string;
    years: string;
    cgpa: string;
    coursework: string[];
  };
  skills: {
    languages: string[];
    frontend: string[];
    backend: string[];
    databases: string[];
    devops: string[];
    security: string[];
    ai: string[];
  };
  credentials: Credential[];
  projects: Project[];
  timeline: TimelineNode[];
  socialProof: {
    text: string;
    subtext: string;
  }[];
}

export const profileData: ProfileData = {
  name: "SUJITH PUTTA",
  title: "Premium AI Engineer & Product Developer",
  email: "sujithputta02@gmail.com",
  phone: "+91 7386777701",
  location: "Bangalore, India",
  education: {
    degree: "Bachelor of Technology - Computer Science and Technology",
    school: "Dayananda Sagar University",
    years: "2023–Present",
    cgpa: "8.92",
    coursework: [
      "Full Stack Development",
      "Computer Network Fundamentals",
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "DBMS",
      "Python",
      "MySQL",
      "System Design Basics",
      "Data Engineering"
    ]
  },
  skills: {
    languages: ["Python", "TypeScript", "JavaScript", "Java", "C"],
    frontend: ["React.js", "TypeScript", "Tailwind CSS", "HTML5/CSS3", "Vite", "Component-driven UI", "Figma (UI/UX)"],
    backend: ["FastAPI", "Node.js", "Express.js", "REST APIs", "GraphQL", "Microservices", "SOLID principles"],
    databases: ["MySQL (SQL, JOINs, query optimization)", "MongoDB (NoSQL)", "FAISS (vector)", "Neo4j (graph)"],
    devops: ["Microsoft Azure", "AWS", "Docker", "GitHub Actions CI/CD", "Linux (Ubuntu)"],
    security: ["OWASP Top 10", "JWT auth", "RBAC", "rate limiting", "Zod/Joi validation", "Helmet.js", "CORS"],
    ai: ["Gemini AI", "Kiro", "Antigravity", "Cursor", "Claude Code", "Ollama (LLaMA 3)", "RAG pipelines", "scikit-learn", "pandas", "PyTorch"]
  },
  credentials: [
    {
      title: "AWS Academy Graduate",
      issuer: "Cloud Foundations Training Badge",
      link: "https://www.credly.com/badges/f079205c-a51e-4f6b-b728-502b1a043c2c/linked_in_profile"
    },
    {
      title: "Google Cloud",
      issuer: "Implement CI/CD Pipelines on Google Cloud Skill Badge",
      link: "https://www.credly.com/badges/77692e49-10ca-4368-a7be-c7e6ab553216/linked_in_profile"
    },
    {
      title: "Kaggle",
      issuer: "5-Day AI Agents Intensive Course Completion Badge",
      link: "https://www.kaggle.com/certification/badges/sujithputta/105"
    },
    {
      title: "NASA Space Apps Challenge",
      issuer: "Global Participant (Consecutive years: 2024 & 2025)"
    },
    {
      title: "Accenture Nordics",
      issuer: "Software Engineering Job Simulation",
      link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/xhih9yFWsf6AYfngd/HNpZwZcuYwona2d8Y_xhih9yFWsf6AYfngd_eZtKTZSq69ca7RBi5_1751731418940_completion_certificate.pdf"
    },
    {
      title: "dbt Labs",
      issuer: "DBT Fundamentals",
      link: "https://credentials.getdbt.com/9b47ca8c-44e7-44d8-9775-514ac7fdad9d"
    },
    {
      title: "ChatGPT Prompt Engineering for Developers",
      issuer: "DeepLearning.AI (Issued Jul 2025)",
      link: "https://learn.deeplearning.ai/accomplishments/ed12897d-8324-43a8-bc81-67619f2f35b8?usp=sharing"
    },
    {
      title: "Google Gen AI Exchange Hackathon",
      issuer: "Hack2skill (Issued Jan 2026)",
      link: "https://certificate.hack2skill.com/user/genaicareerandskill/2025H2S08GH-P1000037"
    },
    {
      title: "Gen AI Exchange Program",
      issuer: "Hack2skill (Issued Aug 2025)",
      link: "https://certificate.hack2skill.com/legacy/2025H2S04GENAI-A1100119"
    }
  ],
  projects: [
    {
      title: "DineInGo",
      metadata: "Smart Full-Stack Restaurant & Event Booking Platform",
      status: "Beta V-1.0",
      techStack: ["React 18", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Firebase Auth", "Socket.IO", "PWA"],
      engineeredCore: "Designed a comprehensive dining reservation and event ticketing platform featuring a 3D AR Menu preview engine, dynamic multi-floor plans, and automatic table allocation schemas.",
      securityMatrix: "Implemented OWASP-compliant identity bonding (Email + Google linking), multi-tier rate limiting, schema validation (Express Validator), Helmet headers, and restricted CORS parameters.",
      dataOrchestration: "Integrated Socket.IO for real-time table status updates, capacity metrics tracking, waitlist queues, and Nodemailer/PDFKit engines generating digital QR-code invoices.",
      liveLink: "https://dine-in-go.vercel.app",
      earlyAccessLink: "https://dine-in-go-early-access.vercel.app",
      businessLink: "https://dine-in-go.vercel.app/business",
      githubLink: "https://github.com/sujithputta02/DineInGo"
    },
    {
      title: "NEXORA",
      metadata: "Sovereign Hybrid RAG for Air-Gapped Aerospace Intelligence",
      status: "Under Review – NMITCON 2026",
      techStack: ["Python", "FAISS", "Neo4j", "FastAPI", "Ollama (LLaMA 3)", "REST APIs", "RBAC", "JSON", "YAML"],
      engineeredCore: "Architected an offline RAG intelligence system processing highly sensitive document queries utilizing a split vector store (FAISS) and structural graph networks (Neo4j) connected via fault-tolerant semantic retrieval pipelines.",
      performanceVector: "Sub-second query response times accomplished via optimized FAISS + Maximal Marginal Relevance (MMR) scoring, beating baseline KNN paradigms—proven conclusively via internal ablation benchmarks.",
      securityInfrastructure: "Custom Role-Based Access Control (RBAC) schemas coupled with native structural input/output schema validation to safeguard complete multi-tenant execution inside fully isolated, air-gapped environments.",
      githubLink: "https://github.com/sujithputta02/Nexora"
    },
    {
      title: "LifeFlow",
      metadata: "Microsoft Imagine Cup 2026 Innovation",
      status: "Imagine Cup 2026",
      techStack: ["Next.js 15", "React 19", "Three.js (R3F)", "Tailwind CSS", "Node.js", "MongoDB Atlas", "Azure AI Search", "OpenRouter (DeepSeek)", "Zustand"],
      engineeredCore: "Designed and compiled an intelligent administrative navigation system that converts complex real-world processes (hospital admissions, government paperwork) into step-by-step interactive workflows guided by DeepSeek R1 and GPT-4o.",
      dataOrchestration: "Structured a hybrid search pipeline querying a private Azure Search Index for curated administrative guides with a smart automatic fallback to the Bing Web Search API for wide coverage.",
      uiOptimization: "Engineered a gamified 3D badge achievement visualization system using Three.js and React Three Fiber, alongside professional PDF checklist generation and voice navigation guidelines.",
      liveLink: "https://lifeflow-webapp-c2e7habzdmc3bpbr.southeastasia-01.azurewebsites.net/",
      githubLink: "https://github.com/sujithputta02/LifeFlow-AI"
    },
    {
      title: "RunaGen AI",
      metadata: "Google Cloud Gen AI Exchange Hackathon 2025",
      status: "Hackathon Prototype",
      techStack: ["React 18", "TypeScript", "Three.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Vertex AI (Gemini 2.5 Flash)", "YouTube API v3", "Vector Search"],
      engineeredCore: "Architected a comprehensive career companion utilizing Google Cloud Vertex AI (Gemini 2.5 Flash) and RAG architecture for context-aware resume analysis, skills gap detection, and personalized learning roadmaps.",
      dataOrchestration: "Engineered a semantic Vector Search service using Google Cloud text embeddings to match candidate profiles to roles with confidence scoring, integrated with MongoDB persistence and Multer file streaming.",
      uiOptimization: "Designed an interactive career simulation interface and 3-stage visual roadmaps (Critical, Important, Nice-to-have) using React 18, Three.js, and custom Tailwind components.",
      liveLink: "https://classy-llama-a6740f.netlify.app/",
      githubLink: "https://github.com/sujithputta02/Google-GenAI-Hackathon-RunaGen-AI"
    },
    {
      title: "Spitch AI",
      metadata: "JARVIS-Level Local AI Desktop Assistant",
      status: "Production Ready",
      techStack: ["Python", "Ollama", "Google Gemini API", "Selenium", "PyAutoGUI", "Eel", "HTML5/CSS3/JS", "SpeechRecognition"],
      engineeredCore: "Architected a local desktop assistant integrating Ollama offline models and Google Gemini Vision for multimodal chat, context-aware command parsing, and file intelligence.",
      dataOrchestration: "Engineered an automated Selenium web browsing controller with visual indicator overlays, integrated with dynamic python-based system checks and custom safety sandboxes.",
      uiOptimization: "Created a lightweight, modern web interface using Eel framework for python-to-JS bridge, supporting real-time voice waveforms, image upload previews, and settings dashboards.",
      githubLink: "https://github.com/sujithputta02/Spitch-AI-Assistant"
    },
    {
      title: "MuseVerse",
      metadata: "AI Museum Curator (Kaggle ADK Capstone)",
      status: "Production Ready",
      techStack: ["Python", "Google Gemini 2.5 Flash", "Nano Banana (Images)", "Google ADK", "Streamlit", "NetworkX", "SQLite", "Plotly"],
      engineeredCore: "Architected an autonomous 14-agent curation pipeline using Google ADK to generate complete museum exhibitions (artifacts, narratives, timelines, quizzes) from any prompt under 2 minutes.",
      dataOrchestration: "Designed parallel ThreadPoolExecutor search and visual context pipelines, structured JSONL tracing dashboards, and mapped semantic concepts via NetworkX knowledge graphs.",
      uiOptimization: "Built a multi-tab Streamlit interface containing real-time performance metrics, 3D Plotly spatial visualizers, and base64-optimized JPEG thumbnail caches compressing payloads by ~95%.",
      githubLink: "https://github.com/sujithputta02/-MuseVerse-AI-Museum-Curator"
    },
    {
      title: "Amazon ML Challenge 2025",
      metadata: "Product Price Prediction (Machine Learning Solution)",
      status: "SMAPE: 56.2%",
      techStack: ["Python", "LightGBM", "XGBoost", "scikit-learn", "TF-IDF", "SVD", "K-Means", "Pandas"],
      engineeredCore: "Developed a comprehensive machine learning pipeline using 230+ engineered features (IPQ regex, measurements, TF-IDF text embeddings reduced via SVD, and K-Means clustering) to predict product prices from text descriptions.",
      dataOrchestration: "Structured target encoding and clustering pipelines to map pricing patterns. Orchestrated an ensemble of 5 gradient boosting models optimized via distinct loss criteria (MAE, Huber, RMSE).",
      performanceVector: "Achieved a competitive leaderboard SMAPE score of 56.2% on the full competition test set, utilizing 3-fold stratified cross-validation bins based on price quantiles.",
      githubLink: "https://github.com/sujithputta02/Team-Dataminers"
    },
    {
      title: "CyberConstituent-SLM",
      metadata: "Constitutional AI-Aligned Cybersecurity Threat Classifier",
      status: "89% Val Accuracy",
      techStack: ["DistilBERT", "PyTorch", "Transformers", "Streamlit", "Hugging Face", "Python", "Google Colab", "FP16 Mixed-Precision"],
      engineeredCore: "Fine-tuned a DistilBERT Small Language Model (SLM) on a Google Colab T4 GPU to classify cybersecurity logs into 6 threat vectors under an Anthropic-inspired Constitutional AI alignment layer.",
      securityMatrix: "Aligned under Constitutional AI guidelines to filter out actionable exploit syntax (malicious scripts, SQL injections) and sanitize logs of unverified geopolitical attribution bias.",
      dataOrchestration: "Built a tokenization and classification data pipeline routing raw threat descriptions, predicting threat categories, and generating confidence metrics.",
      performanceVector: "Achieved 89% validation accuracy with a compact 67M parameter architecture optimized for low-latency inference and resource-constrained environment deployments.",
      liveLink: "https://huggingface.co/sujithputta02/cyber-threat-constitutional-slm",
      githubLink: "https://github.com/sujithputta02/cyber-constituent-slm"
    }
  ],
  timeline: [
    {
      years: "2023 – PRESENT",
      title: "B.Tech Computer Science & Technology",
      description: "Matriculated into Computer Science and Technology B.Tech at Dayananda Sagar University. Mastery of Core Foundations: Algorithms, Data Engineering, and System Design."
    },
    {
      years: "2024",
      title: "NASA Space Apps Arena & Hackathons",
      description: "Entered NASA Space Apps Challenge global hacking arenas, pioneering rapid prototyping methods."
    },
    {
      years: "2025",
      title: "Enterprise Deployments & ERP Backends",
      description: "Produced institutional scale products (FlowGrid ERP backend engineering, DineInGo baseline conceptualization) and acquired enterprise systems credentials (AWS Cloud Foundations, Google Cloud Automated Delivery systems)."
    },
    {
      years: "2026",
      title: "Advanced Engineering Milestones",
      description: "Advanced Engineering Milestones. Participated in Microsoft Imagine Cup, completed complex RAG architectural research papers, and finalized full-stack microservices platforms."
    }
  ],
  socialProof: [
    {
      text: "Microsoft Imagine Cup Participant",
      subtext: "Global Tech Hackathon"
    },
    {
      text: "NMITCON 2026 Research Review",
      subtext: "Hybrid Aerospace RAG System"
    },
    {
      text: "NASA Space Apps Participant",
      subtext: "2024 & 2025 Contributions"
    },
    {
      text: "Google Prompt Wars",
      subtext: "Cleared Round 1"
    },
    {
      text: "AWS & Google Cloud Certified",
      subtext: "Enterprise Infrastructure"
    }
  ]
};
