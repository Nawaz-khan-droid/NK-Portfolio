"use client"

import { SectionHeading } from "./section-heading"
import { ScrollReveal, StaggerContainer, StaggerItem } from "./scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, MonitorSmartphone, Search, Brain, Briefcase, FileText, Headphones } from "lucide-react"

interface Project {
  title: string
  tagline: string
  highlights: string[]
  tech: string[]
  github: string
  demo?: string
  demoLabel?: string
  icon: React.ElementType
  category: string
}

const projects: Project[] = [
  {
    title: "CAWNCADE AI",
    tagline: "Multi-agent fact verification system",
    highlights: ["5-tier fallback search with circuit breaker", "Deepfake & AI-image detection", "Llama 3.1 ReAct agent with transparency UI"],
    tech: ["Python", "FastAPI", "React", "Llama 3.1", "ChromaDB"],
    github: "https://github.com/Nawaz-khan-droid/cawncade-ai",
    icon: Search,
    category: "AI / NLP",
  },
  {
    title: "Hybrid RAG Agent",
    tagline: "BM25 + FAISS hybrid retrieval with ReAct",
    highlights: ["Weighted score fusion of keyword + vector search", "Manual ReAct loop — no LangChain", "Dual-layer input/output security guardrails"],
    tech: ["Python", "Streamlit", "Gemini", "FAISS", "BM25"],
    github: "https://github.com/Nawaz-khan-droid/Hybrid-RAG-Agent",
    demo: "https://huggingface.co/spaces/Nawaz-khan-Droid/Hybrid-RAG-Agent",
    demoLabel: "Live Demo",
    icon: Brain,
    category: "AI / RAG",
  },
  {
    title: "JARVIS Voice Assistant",
    tagline: "Real-time voice AI with 20 tools",
    highlights: ["Dual personas with cross-session memory", "20 tools: weather, search, email, reminders", "Cloud-first + local ONNX fallback for resilience"],
    tech: ["Python", "FastAPI", "React", "Groq", "Deepgram", "LiveKit"],
    github: "https://github.com/Nawaz-khan-droid/Personal-AI-Assistant",
    icon: MonitorSmartphone,
    category: "AI / Voice",
  },
  {
    title: "Talvex",
    tagline: "AI-powered job application pipeline",
    highlights: ["ATS resume scoring & keyword gap detection", "Dual-engine job search with smart match", "Zero-trust security: JWT, Redis, CSRF, RBAC"],
    tech: ["Next.js", "FastAPI", "PostgreSQL", "Redis", "OpenRouter"],
    github: "https://github.com/Nawaz-khan-droid/Talvex",
    icon: Briefcase,
    category: "Full-Stack",
  },
  {
    title: "SEO Autopilot",
    tagline: "Zero-hallucination SEO report generator",
    highlights: ["Evidence wrapper — every metric sourced & timestamped", "Client report (15 cards) + action plan (9 cards)", "Multi-client architecture with auto-research"],
    tech: ["Python", "Groq", "Tavily", "python-docx", "Matplotlib"],
    github: "https://github.com/Nawaz-khan-droid/seo-autopilot",
    icon: FileText,
    category: "AI / Automation",
  },
  {
    title: "Closira",
    tagline: "AI customer support agent with hallucination prevention",
    highlights: ["4-stage pipeline: FAQ → Lead Qualification → Escalation → Summary", "6-layer hallucination defense with SOP-only knowledge base", "Multi-channel simulation with tone adaptation"],
    tech: ["Python", "OpenRouter", "JSON SOP", "CLI"],
    github: "https://github.com/Nawaz-khan-droid/Closira",
    icon: Headphones,
    category: "AI / Agents",
  },
]

export function Projects() {
  return (
    <section id="projects" className="py-20 md:py-28 bg-muted/30" aria-label="Projects portfolio">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Projects"
          title="Proof of Work"
        />

        <StaggerContainer className="grid gap-5 md:grid-cols-2" role="list" aria-label="Project cards">
          {projects.map((project) => (
            <StaggerItem key={project.title}>
              <div className="group h-full p-5 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all duration-300 flex flex-col" role="listitem">
                {/* Header */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <project.icon className="h-4.5 w-4.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm sm:text-base font-bold text-foreground">{project.title}</h3>
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{project.category}</Badge>
                    </div>
                    <p className="text-xs text-primary font-medium">{project.tagline}</p>
                  </div>
                </div>

                {/* Highlights — bullet points, scannable */}
                <ul className="mt-3 space-y-1 flex-1">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex gap-2 text-xs sm:text-sm text-muted-foreground">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-primary shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Tech stack */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-[11px] font-medium rounded bg-secondary text-secondary-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action links */}
                <div className="mt-3 pt-3 border-t border-border flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-1.5 text-xs h-8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} source code on GitHub (opens in new tab)`}>
                      <Github className="h-3 w-3" aria-hidden="true" />
                      Source
                    </a>
                  </Button>
                  {project.demo && (
                    <Button size="sm" className="gap-1.5 text-xs h-8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" asChild>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live demo (opens in new tab)`}>
                        <ExternalLink className="h-3 w-3" aria-hidden="true" />
                        {project.demoLabel || "Demo"}
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
