"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Bot } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  id: string
  role: "bot" | "user"
  text: string
}

interface Rule {
  patterns: string[]
  response: string
}

// ─── Knowledge base (deterministic rule matching) ─────────────────────────────

const RULES: Rule[] = [
  // Greetings
  {
    patterns: ["hello", "hi", "hey", "good morning", "good evening", "howdy", "sup", "what's up", "wassup", "hiya"],
    response:
      "Hi there! 👋 I'm Nawaz's portfolio assistant. I can tell you about his skills, projects, experience, or how to get in touch. What would you like to know?",
  },

  // About / Who
  {
    patterns: ["who are you", "about nawaz", "about you", "tell me about", "introduce", "who is nawaz", "background", "tell me more"],
    response:
      "Nawaz Khan is a final-year BCA student at B.K. Birla College, University of Mumbai. He's an AI & ML Engineer specialising in RAG systems, agentic workflows, voice assistants, and automation. He scored in the 95th percentile in MAH-BCA-CET 2024. 🎓",
  },

  // Education
  {
    patterns: ["education", "college", "university", "degree", "bca", "study", "studying", "birla", "academics", "cgpa", "gpa"],
    response:
      "Nawaz is pursuing a BCA at B.K. Birla College, University of Mumbai (2024–2027).\n\n🏆 CGPA: 9.20/10\n📌 Coursework: Data Structures, DBMS, Python, ML, AI, Statistics\n🏅 MAH-BCA-CET 2024 — 95th Percentile",
  },

  // Python
  {
    patterns: ["python"],
    response:
      "Python is Nawaz's primary language — used across all his AI/ML projects. He's proficient with pandas, NumPy, matplotlib, seaborn, and FastAPI. 🐍",
  },

  // RAG / Vector
  {
    patterns: ["rag", "retrieval augmented", "retrieval-augmented", "vector search", "faiss", "chromadb", "qdrant", "embedding", "semantic search"],
    response:
      "RAG is one of Nawaz's core specialties! His Hybrid RAG Agent uses BM25 + FAISS dual retrieval with weighted score fusion — built from scratch, no LangChain. CAWNCADE AI uses ChromaDB for fact verification. 🔍",
  },

  // LangChain / Agents
  {
    patterns: ["langchain", "langgraph", "agentic", "agent", "react agent", "workflow"],
    response:
      "Nawaz builds agentic systems with LangChain, LangGraph, and hand-rolled ReAct loops. JARVIS and CAWNCADE AI both use multi-agent architectures. He built a manual ReAct agent without any framework for the Hybrid RAG project. 🤖",
  },

  // Skills — general
  {
    patterns: ["skill", "tech stack", "technology", "tools", "expertise", "what do you know", "what can he do", "capabilities", "proficient", "familiar"],
    response:
      "Nawaz's core stack:\n\n🤖 AI/ML: RAG, ReAct agents, LangChain, LangGraph, Gemini, Llama 3.1\n🐍 Python: pandas, NumPy, scikit-learn, Keras, FastAPI\n📊 Data: Power BI, Matplotlib, Seaborn, SQL\n🗄️ Backend: FastAPI, MongoDB, Redis, MySQL, FAISS\n🛠️ Tools: Git, JupyterLab, GCP, Langfuse\n\nType \"projects\" to see what he's built with these! 💡",
  },

  // Projects — all
  {
    patterns: ["project", "portfolio", "what has he built", "what did he build", "all projects", "show projects"],
    response:
      "Nawaz's 6 key projects:\n\n🔍 CAWNCADE AI — multi-agent fact verifier (Llama 3.1 + ChromaDB)\n🧠 Hybrid RAG Agent — BM25+FAISS hybrid retrieval (Gemini)\n🎙️ JARVIS — real-time voice AI, 20 tools (FastAPI + LiveKit)\n💼 Talvex — AI job application pipeline (Next.js + PostgreSQL)\n📄 SEO Autopilot — zero-hallucination SEO reports\n🎧 Closira — AI customer support agent\n\nAsk about any specific one!",
  },

  // CAWNCADE
  {
    patterns: ["cawncade", "fact verif", "deepfake", "misinformation", "fake news"],
    response:
      "CAWNCADE AI is a multi-agent fact verification system:\n\n• 5-tier fallback search with circuit breaker\n• Deepfake & AI-image detection module\n• Llama 3.1 ReAct agent with full transparency UI\n• Tech: Python, FastAPI, React, Llama 3.1, ChromaDB\n\n🔗 github.com/Nawaz-khan-droid/cawncade-ai",
  },

  // Hybrid RAG
  {
    patterns: ["hybrid rag", "bm25", "hybrid retrieval", "bm 25"],
    response:
      "Hybrid RAG Agent combines BM25 keyword + FAISS vector search with weighted score fusion. Built from scratch with a manual ReAct loop — no LangChain. Has dual-layer input/output security guardrails. Live demo on Hugging Face Spaces! 🧠\n\nTech: Python, Streamlit, Gemini, FAISS, BM25",
  },

  // JARVIS
  {
    patterns: ["jarvis", "voice assistant", "voice ai", "livekit", "deepgram", "groq"],
    response:
      "JARVIS is Nawaz's real-time voice AI:\n\n• Dual personas with cross-session memory\n• 20 tools: weather, search, email, reminders\n• Cloud-first + local ONNX fallback for resilience\n• Tech: Python, FastAPI, React, Groq, Deepgram, LiveKit 🎙️",
  },

  // Talvex
  {
    patterns: ["talvex", "ats", "resume scoring", "job search", "job application", "job pipeline"],
    response:
      "Talvex is an AI-powered job application pipeline:\n\n• ATS resume scoring & keyword gap detection\n• Dual-engine job search with smart match\n• Zero-trust security: JWT, Redis, CSRF, RBAC\n• Tech: Next.js, FastAPI, PostgreSQL, Redis, OpenRouter 💼",
  },

  // SEO Autopilot
  {
    patterns: ["seo", "autopilot", "seo report", "search engine optimiz"],
    response:
      "SEO Autopilot generates zero-hallucination SEO reports. Every metric is sourced & timestamped. Produces client reports (15 cards) + action plans (9 cards). Multi-client architecture with auto-research. 📄\n\nTech: Python, Groq, Tavily, python-docx, Matplotlib",
  },

  // Closira
  {
    patterns: ["closira", "customer support", "support agent", "hallucination prevention", "support bot"],
    response:
      "Closira is an AI customer support agent with a 4-stage pipeline:\nFAQ → Lead Qualification → Escalation → Summary\n\n6-layer hallucination defense, SOP-only knowledge base, multi-channel tone adaptation. 🎧\n\nTech: Python, OpenRouter, JSON SOP, CLI",
  },

  // Experience / Internship
  {
    patterns: ["experience", "internship", "work experience", "worked", "intern", "imarticus", "hidigital", "marketing"],
    response:
      "Nawaz's experience:\n\n📊 Data Science Training — Imarticus Learning, Thane (Feb–Apr 2026)\n• Power BI dashboards, EDA with Python & pandas\n• MySQL: CTEs, Views, Window Functions\n• Top scorer for data storytelling (60+ interns)\n\n🌐 Digital Marketing & SEO Intern — HiDigital (Mar–Sep 2025)\n• On-page, off-page, technical SEO\n• 100+ SEO-optimised blog articles\n• GA4, Search Console, Ahrefs",
  },

  // Achievements
  {
    patterns: ["achievement", "award", "accomplish", "csi", "pitch", "competition", "percentile"],
    response:
      "Nawaz's achievements:\n\n🏅 MAH-BCA-CET 2024 — 95th Percentile\n🏆 AI Governance Business Pitch (2026)\n👥 CSI Member — Technical Events (2025–26)\n💡 AI Workshops & Case Studies (2026)",
  },

  // Contact
  {
    patterns: ["contact", "email", "reach out", "get in touch", "message", "mail"],
    response:
      "Reach Nawaz at:\n📧 nawazkhanwork@gmail.com\n💼 linkedin.com/in/nawaz-n-khan\n🐙 github.com/Nawaz-khan-droid\n\nOr use the Connect section on this page! 👇",
  },

  // LinkedIn
  {
    patterns: ["linkedin"],
    response:
      "LinkedIn: linkedin.com/in/nawaz-n-khan 💼\nHe's actively open to opportunities in AI, ML, and Data Analytics!",
  },

  // GitHub
  {
    patterns: ["github", "repository", "open source", "source code", "repo"],
    response:
      "GitHub: github.com/Nawaz-khan-droid 🐙\nAll 6 featured projects are open source — RAG systems, voice AI, fact verification, and more!",
  },

  // Hiring / Availability
  {
    patterns: ["hire", "hiring", "available", "open to work", "looking for", "opportunity", "position", "job", "role", "recruit"],
    response:
      "Yes! Nawaz is actively looking for entry-level roles in:\n• 🤖 AI Engineering\n• 📊 Machine Learning\n• 📈 Data Analytics\n\nAvailable immediately. Reach out at nawazkhanwork@gmail.com or via LinkedIn! 🚀",
  },

  // Data Science / Analytics
  {
    patterns: ["data science", "data analytics", "data analysis", "power bi", "visualization", "pandas", "numpy", "matplotlib", "seaborn", "sql"],
    response:
      "Nawaz is proficient in data analytics — Power BI dashboards, EDA with pandas/NumPy, visualization with matplotlib & seaborn, and complex SQL (CTEs, Window Functions). He topped data storytelling at Imarticus Learning. 📊",
  },

  // Resume
  {
    patterns: ["resume", "cv", "curriculum vitae", "download resume", "view resume"],
    response:
      "Click the 'View Resume' button at the top of this page to open Nawaz's resume. 📄",
  },

  // Location
  {
    patterns: ["location", "where is he", "where does he live", "india", "mumbai", "city", "based", "remote"],
    response:
      "Nawaz is based in Mumbai, India 🇮🇳. He's open to remote roles and opportunities in/around Mumbai.",
  },

  // Thank you
  {
    patterns: ["thank", "thanks", "appreciate", "helpful", "great", "awesome", "cool", "nice", "good job", "well done"],
    response:
      "You're welcome! 😊 Feel free to ask anything else, or scroll down to explore the full portfolio.",
  },

  // Bye
  {
    patterns: ["bye", "goodbye", "see you", "later", "ciao", "take care", "farewell"],
    response:
      "Goodbye! 👋 Don't forget to connect with Nawaz on LinkedIn or GitHub — he'd love to hear from you!",
  },
]

// Fallback pool — cycle deterministically on word count parity
const FALLBACKS = [
  "I don't have a specific answer for that — try asking about his projects, skills, or how to contact him! 😊",
  "That's outside my knowledge base. For anything specific, email nawazkhanwork@gmail.com. I cover skills, projects, experience, and contact info!",
  "Not sure about that one. Try: 'What are his skills?', 'Show projects', or 'How to contact?' — I handle those well! 💡",
]

// ─── Matching engine ──────────────────────────────────────────────────────────

function getResponse(input: string): string {
  const norm = input.toLowerCase().trim()
  if (!norm) return "Please type something! 😊"

  for (const rule of RULES) {
    if (rule.patterns.some((p) => norm.includes(p))) {
      return rule.response
    }
  }

  // Deterministic fallback based on input length
  return FALLBACKS[norm.length % FALLBACKS.length]
}

// ─── Quick reply chips ────────────────────────────────────────────────────────

const QUICK_REPLIES = [
  "What are his skills?",
  "Show all projects",
  "Is he open to hire?",
  "How to contact?",
]

// ─── Welcome message ──────────────────────────────────────────────────────────

const WELCOME: Message = {
  id: "welcome",
  role: "bot",
  text: "Hi! 👋 I'm Nawaz's portfolio assistant. Ask me about his skills, projects, experience, or how to get in touch!",
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const [showChips, setShowChips] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, typing])

  // Focus input when chat opens
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 300)
      return () => clearTimeout(t)
    }
  }, [open])

  const send = useCallback((text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return

    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", text: trimmed }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setShowChips(false)
    setTyping(true)

    // Natural-feeling delay: 600–900ms
    const delay = 600 + (trimmed.length % 4) * 75
    const timer = setTimeout(() => {
      const botMsg: Message = {
        id: `b-${Date.now()}`,
        role: "bot",
        text: getResponse(trimmed),
      }
      setMessages((prev) => [...prev, botMsg])
      setTyping(false)
    }, delay)

    return () => clearTimeout(timer)
  }, [])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    send(input)
  }

  return (
    <>
      {/* ── Chat window ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="chatbot-panel"
            role="dialog"
            aria-label="Portfolio assistant"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: "spring", stiffness: 340, damping: 32 }}
            className="fixed bottom-[5.5rem] right-4 sm:right-6 z-50 w-[min(22rem,calc(100vw-2rem))]"
          >
            <div
              className="flex flex-col rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
              style={{ height: "min(28rem, calc(100dvh - 7rem))" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-3 px-4 py-3 bg-primary text-primary-foreground shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="relative shrink-0">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <Bot className="w-4 h-4" aria-hidden="true" />
                    </div>
                    {/* Online dot */}
                    <span
                      className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-none">NK Assistant</p>
                    <p className="text-[11px] text-primary-foreground/70 mt-0.5">Portfolio Q&amp;A · Always online</p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="shrink-0 p-1.5 rounded-lg hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn("flex gap-2 items-end", msg.role === "user" ? "flex-row-reverse" : "flex-row")}
                  >
                    {/* Bot avatar */}
                    {msg.role === "bot" && (
                      <div
                        className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mb-0.5"
                        aria-hidden="true"
                      >
                        <Bot className="w-3.5 h-3.5 text-primary" />
                      </div>
                    )}

                    {/* Bubble */}
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.18 }}
                      className={cn(
                        "max-w-[85%] px-3 py-2 text-sm leading-relaxed whitespace-pre-line break-words rounded-2xl",
                        msg.role === "bot"
                          ? "bg-muted text-foreground rounded-tl-sm"
                          : "bg-primary text-primary-foreground rounded-tr-sm"
                      )}
                    >
                      {msg.text}
                    </motion.div>
                  </div>
                ))}

                {/* Typing indicator */}
                <AnimatePresence>
                  {typing && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex gap-2 items-end"
                      aria-label="Assistant is typing"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0" aria-hidden="true">
                        <Bot className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <div className="bg-muted px-3 py-3 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.14, ease: "easeInOut" }}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Quick reply chips — only visible after welcome, before first user message */}
                <AnimatePresence>
                  {showChips && messages.length === 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.6 }}
                      className="flex flex-wrap gap-1.5 pt-1"
                      aria-label="Quick reply suggestions"
                    >
                      {QUICK_REPLIES.map((chip) => (
                        <button
                          key={chip}
                          onClick={() => send(chip)}
                          className="text-xs px-2.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary"
                        >
                          {chip}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <form
                onSubmit={onSubmit}
                className="flex items-center gap-2 px-3 py-2.5 border-t border-border bg-background/60 shrink-0"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything about Nawaz…"
                  disabled={typing}
                  maxLength={220}
                  aria-label="Your message"
                  className="flex-1 min-w-0 bg-muted rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground/50 disabled:opacity-50 transition-shadow"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || typing}
                  aria-label="Send message"
                  className="shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <Send className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB trigger ───────────────────────────────────────────────────── */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        aria-label={open ? "Close portfolio assistant" : "Open portfolio assistant"}
        aria-expanded={open}
        aria-controls="chatbot-panel"
        className={cn(
          "fixed bottom-5 right-4 sm:right-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          open
            ? "bg-card text-foreground border border-border shadow-lg"
            : "bg-primary text-primary-foreground"
        )}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              exit={{ rotate: 90, scale: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 90, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              exit={{ rotate: -90, scale: 0 }}
              transition={{ duration: 0.18 }}
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Pulse ring — visible only when chat is closed */}
        {!open && (
          <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-25" aria-hidden="true" />
        )}
      </motion.button>
    </>
  )
}
