"use client"

import { SectionHeading } from "./section-heading"
import { ScrollReveal } from "./scroll-reveal"
import { Briefcase, Award, Users, Trophy } from "lucide-react"

interface ExperienceItem {
  period: string
  role: string
  company: string
  type: string
  points: string[]
}

const experiences: ExperienceItem[] = [
  {
    period: "Feb — Apr 2026",
    role: "Data Science Training",
    company: "Imarticus Learning Ltd., Thane",
    type: "On-site",
    points: [
      "Built Power BI dashboards for customer behaviour & sales analysis",
      "Performed EDA using Python, Pandas, Seaborn",
      "MySQL with CTEs, Views, and Window Functions",
      "Top scorer for data storytelling out of 60+ interns",
    ],
  },
  {
    period: "Mar — Sep 2025",
    role: "Digital Marketing & SEO Intern",
    company: "HiDigital Marketing Solutions LLP, Kalyan",
    type: "6 Months",
    points: [
      "On-page, off-page, technical & local SEO execution",
      "Keyword research, SERP analysis, competitor audits",
      "Authored 100+ SEO-optimized blog articles",
      "GA4, Search Console, Ahrefs for data-driven insights",
    ],
  },
]

const achievements = [
  { icon: Trophy, text: "MAH-BCA-CET 2024 — 95th Percentile" },
  { icon: Award, text: "AI Governance Business Pitch (2026)" },
  { icon: Users, text: "CSI Member — Technical Events (2025–26)" },
  { icon: Briefcase, text: "AI Workshops & Case Studies (2026)" },
]

export function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28" aria-label="Internships and achievements">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Experience"
          title="Internships & Training"
        />

        <div className="space-y-4" role="list" aria-label="Internships">
          {experiences.map((exp, i) => (
            <ScrollReveal key={exp.role} delay={i * 0.1}>
              <div className="p-4 sm:p-5 rounded-xl border border-border bg-card hover:border-primary/20 transition-all duration-300" role="listitem">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-foreground">{exp.role}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{exp.company}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-medium text-primary">{exp.period}</span>
                    <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-primary/10 text-primary">
                      {exp.type}
                    </span>
                  </div>
                </div>
                <ul className="space-y-1.5">
                  {exp.points.map((point) => (
                    <li key={point} className="flex gap-2 text-xs sm:text-sm text-muted-foreground">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-primary shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Achievements — compact row */}
        <div className="mt-10">
          <ScrollReveal>
            <h3 className="text-center text-xs font-semibold tracking-widest uppercase text-primary mb-5">
              Achievements
            </h3>
          </ScrollReveal>
          <div className="grid grid-cols-2 gap-3" role="list" aria-label="Achievements">
            {achievements.map((item, i) => (
              <ScrollReveal key={item.text} delay={i * 0.08}>
                <div className="flex items-center gap-2.5 p-3 rounded-xl border border-border bg-card hover:border-primary/20 transition-all duration-300" role="listitem">
                  <div className="flex-shrink-0 w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                    <item.icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm text-foreground font-medium">{item.text}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
