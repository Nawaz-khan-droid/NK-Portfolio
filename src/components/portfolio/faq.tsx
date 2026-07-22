"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, HelpCircle, Mic, Sparkles } from "lucide-react"
import { SectionHeading } from "./section-heading"

interface FAQItem {
  id: string
  question: string
  answer: string
  voiceKeywords: string[]
}

const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "Who is Nawaz Khan and what is his background in AI?",
    answer:
      "Nawaz Khan is an AI & Machine Learning Engineer pursuing a BCA at B.K. Birla College, University of Mumbai (CGPA: 9.20/10, 95th Percentile in MAH-BCA-CET 2024). He specializes in Retrieval-Augmented Generation (RAG), agentic workflows, voice AI assistants, and automated Python applications.",
    voiceKeywords: ["who is Nawaz Khan", "Nawaz Khan AI background", "about Nawaz Khan"],
  },
  {
    id: "faq-2",
    question: "What AI projects has Nawaz Khan developed?",
    answer:
      "Nawaz has built several production-ready AI projects: CAWNCADE AI (a multi-agent fact verification system with Llama 3.1 & ChromaDB), Hybrid RAG Agent (combining BM25 & FAISS vector search with score fusion), JARVIS (a real-time voice assistant with 20+ tools built on LiveKit & Groq), Talvex (an AI ATS job application pipeline), and Closira (AI customer communication platform).",
    voiceKeywords: ["Nawaz Khan projects", "CAWNCADE AI", "Hybrid RAG Agent", "JARVIS voice assistant"],
  },
  {
    id: "faq-3",
    question: "Is Nawaz Khan open to AI internships and full-time roles?",
    answer:
      "Yes! Nawaz is actively looking for AI Engineering Internships and Developer roles focused on RAG architectures, Agentic AI systems, LLM application development, and Python backend automation. You can get in touch via email or LinkedIn.",
    voiceKeywords: ["Nawaz Khan hiring", "is Nawaz Khan looking for internships", "hire Nawaz Khan AI"],
  },
  {
    id: "faq-4",
    question: "What technologies and AI tools does Nawaz Khan use?",
    answer:
      "His core technical stack includes Python (pandas, NumPy, scikit-learn, FastAPI), AI Frameworks (LangChain, LangGraph, Llama 3.1, Gemini, Ollama), Vector Databases (FAISS, ChromaDB, Qdrant), Databases (MongoDB, PostgreSQL, SQLite, Prisma), and Frontend UI (Next.js, React, Tailwind CSS, TypeScript).",
    voiceKeywords: ["Nawaz Khan tech stack", "Python AI developer skills", "LangChain developer Mumbai"],
  },
  {
    id: "faq-5",
    question: "How can I contact Nawaz Khan or view his resume?",
    answer:
      "You can connect directly with Nawaz through the Contact form on this portfolio, view his code on GitHub (@Nawaz-khan-droid), message him on LinkedIn (in/nawaz-n-khan), or download his updated resume directly from the Hero section.",
    voiceKeywords: ["contact Nawaz Khan", "Nawaz Khan resume", "Nawaz Khan LinkedIn"],
  },
]

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // Schema.org structured data for Voice Assistant & Search Engine indexing
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <section id="faq" aria-label="Frequently Asked Questions" className="py-20 bg-muted/30 relative">
      {/* Inject FAQ structured JSON-LD schema for Search & Voice Assistants */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title="Voice-Search FAQs"
          subtitle="Frequently asked questions optimized for natural voice queries, search engines, and quick assistance."
          icon={<Mic className="w-5 h-5 text-primary" aria-hidden="true" />}
        />

        <div className="mt-12 space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm overflow-hidden transition-colors hover:border-primary/30"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <span className="flex items-center gap-3 font-semibold text-foreground text-base sm:text-lg">
                    <HelpCircle className="w-5 h-5 text-primary/70 shrink-0" aria-hidden="true" />
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 text-muted-foreground text-sm sm:text-base border-t border-border/40 leading-relaxed">
                        <p>{faq.answer}</p>

                        <div className="mt-3 flex flex-wrap items-center gap-2 pt-2">
                          <span className="text-xs font-medium text-muted-foreground/70 flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-primary/60" /> Voice Keywords:
                          </span>
                          {faq.voiceKeywords.map((kw) => (
                            <span
                              key={kw}
                              className="px-2 py-0.5 rounded-md bg-primary/5 border border-primary/10 text-primary text-[11px]"
                            >
                              "{kw}"
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
