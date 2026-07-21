"use client"

import { SectionHeading } from "./section-heading"
import { ScrollReveal, StaggerContainer, StaggerItem } from "./scroll-reveal"
import { Code2, Database, Brain, Bot, BarChart3, Server } from "lucide-react"

const interests = [
  { icon: Brain, label: "AI & Machine Learning" },
  { icon: Bot, label: "AI Agents & Automation" },
  { icon: Code2, label: "Generative AI" },
  { icon: BarChart3, label: "Data Analytics & BI" },
  { icon: Database, label: "Data Engineering" },
  { icon: Server, label: "Backend Development" },
]

export function About() {
  return (
    <section id="about" className="py-20 md:py-28" aria-label="About Nawaz Khan">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="About"
          title="Who Am I"
        />

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Bio */}
          <ScrollReveal direction="left">
            <div className="space-y-4">
              <p className="text-foreground leading-relaxed">
                Final-year BCA student at B.K. Birla College (University of Mumbai) with a focus on AI, Machine Learning, and automation.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I build AI-powered applications — from RAG pipelines and agentic workflows to voice assistants and automation tools. Currently deepening my foundations in ML, data systems, and end-to-end development through hands-on projects.
              </p>

              <div className="pt-1">
                <span className="text-xs font-semibold tracking-widest uppercase text-primary">
                  MAH-BCA-CET 2024 — 95th Percentile
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Interest areas — visual, no extra text */}
          <ScrollReveal direction="right">
            <StaggerContainer className="grid grid-cols-2 gap-3" role="list" aria-label="Areas of interest">
              {interests.map((item) => (
                <StaggerItem key={item.label}>
                  <div className="group p-4 rounded-xl border border-border bg-card hover:bg-primary/5 hover:border-primary/20 transition-all duration-300 cursor-default" role="listitem">
                    <item.icon className="h-5 w-5 text-primary mb-2 transition-transform group-hover:scale-110" aria-hidden="true" />
                    <h3 className="text-sm font-semibold text-foreground">{item.label}</h3>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
