"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SectionHeading } from "./section-heading"
import { ScrollReveal } from "./scroll-reveal"

type SkillCategory = "all" | "languages" | "ml-data" | "ai-automation" | "backend" | "tools"

interface Skill {
  name: string
  category: SkillCategory[]
  level: "proficient" | "familiar"
}

const categories: { key: SkillCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "languages", label: "Languages" },
  { key: "ml-data", label: "ML & Data" },
  { key: "ai-automation", label: "AI & Automation" },
  { key: "backend", label: "Backend & DB" },
  { key: "tools", label: "Tools" },
]

const skills: Skill[] = [
  { name: "Python", category: ["languages"], level: "proficient" },
  { name: "SQL", category: ["languages"], level: "proficient" },
  { name: "Pandas", category: ["ml-data"], level: "proficient" },
  { name: "NumPy", category: ["ml-data"], level: "proficient" },
  { name: "Scikit-learn", category: ["ml-data"], level: "familiar" },
  { name: "Keras", category: ["ml-data"], level: "familiar" },
  { name: "Matplotlib", category: ["ml-data"], level: "proficient" },
  { name: "Seaborn", category: ["ml-data"], level: "proficient" },
  { name: "Power BI", category: ["ml-data", "tools"], level: "proficient" },
  { name: "XGBoost", category: ["ml-data"], level: "familiar" },
  { name: "LangChain", category: ["ai-automation"], level: "familiar" },
  { name: "LangGraph", category: ["ai-automation"], level: "familiar" },
  { name: "RAG", category: ["ai-automation"], level: "familiar" },
  { name: "ReAct Agents", category: ["ai-automation"], level: "familiar" },
  { name: "Prompt Engineering", category: ["ai-automation"], level: "familiar" },
  { name: "Streamlit", category: ["ai-automation", "tools"], level: "familiar" },
  { name: "Hugging Face", category: ["ai-automation", "tools"], level: "familiar" },
  { name: "FastAPI", category: ["backend"], level: "familiar" },
  { name: "MongoDB", category: ["backend"], level: "familiar" },
  { name: "Redis", category: ["backend"], level: "familiar" },
  { name: "MySQL", category: ["backend"], level: "proficient" },
  { name: "FAISS", category: ["backend", "ai-automation"], level: "familiar" },
  { name: "Qdrant", category: ["backend", "ai-automation"], level: "familiar" },
  { name: "Git & GitHub", category: ["tools"], level: "proficient" },
  { name: "JupyterLab", category: ["tools"], level: "proficient" },
  { name: "VS Code", category: ["tools"], level: "proficient" },
  { name: "GCP", category: ["tools"], level: "familiar" },
  { name: "Langfuse", category: ["tools", "ai-automation"], level: "familiar" },
  { name: "ARQ", category: ["tools", "backend"], level: "familiar" },
]

const levelStyles = {
  proficient: "bg-primary/10 text-primary border-primary/20",
  familiar: "bg-secondary text-secondary-foreground border-border",
}

export function Skills() {
  const [active, setActive] = useState<SkillCategory>("all")

  const filtered = active === "all" ? skills : skills.filter((s) => s.category.includes(active))

  return (
    <section id="skills" className="py-20 md:py-28" aria-label="Skills and tech stack">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Skills"
          title="Tech Stack"
        />

        <ScrollReveal>
          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-6" role="group" aria-label="Filter skills by category">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActive(cat.key)}
                aria-pressed={active === cat.key}
                className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  active === cat.key
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Skills grid */}
          <div className="flex flex-wrap justify-center gap-2">
            <AnimatePresence mode="popLayout">
              {filtered.map((skill) => (
                <motion.span
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border cursor-default transition-all duration-200 hover:shadow-sm hover:scale-105 ${levelStyles[skill.level]}`}
                  title={skill.level === "proficient" ? "Hands-on" : "Working Knowledge"}
                >
                  {skill.name}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>

          {/* Legend — minimal */}
          <div className="flex justify-center gap-4 mt-4 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-sm bg-primary/30 border border-primary/40" />
              Hands-on
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-sm bg-secondary border border-border" />
              Working Knowledge
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
