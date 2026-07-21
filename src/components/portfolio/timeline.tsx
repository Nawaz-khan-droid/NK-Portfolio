"use client"

import { SectionHeading } from "./section-heading"
import { ScrollReveal } from "./scroll-reveal"
import { GraduationCap, School, Award } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimelineEntry {
  period: string
  title: string
  institution: string
  grade: string
  gradeLabel: string
  coursework?: string[]
  icon: React.ElementType
  highlight?: boolean
}

const timeline: TimelineEntry[] = [
  {
    period: "2024 — 2027",
    title: "BCA — Computer Applications",
    institution: "B.K. Birla College | University of Mumbai",
    grade: "9.20 / 10",
    gradeLabel: "CGPA",
    coursework: ["Data Structures", "DBMS", "Statistics", "Python", "ML", "AI"],
    icon: GraduationCap,
    highlight: true,
  },
  {
    period: "2024",
    title: "12th HSC — Science",
    institution: "K.V. Pendharkar Junior College, Dombivli",
    grade: "71%",
    gradeLabel: "Score",
    icon: School,
  },
  {
    period: "2022",
    title: "10th SSC",
    institution: "National English High School, Kalyan",
    grade: "85%",
    gradeLabel: "Score",
    icon: Award,
  },
]

export function EducationTimeline() {
  return (
    <section id="education" className="py-20 md:py-28 bg-muted/30" aria-label="Education timeline">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Education"
          title="Academic Journey"
        />

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-border" aria-hidden="true" />

          <ol className="space-y-6" role="list" aria-label="Academic qualifications">
            {timeline.map((entry, i) => (
              <ScrollReveal key={entry.title} delay={i * 0.1}>
                <li className="relative pl-12 sm:pl-20">
                  {/* Timeline dot */}
                  <div
                    className={cn(
                      "absolute left-2 sm:left-6 top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center",
                      entry.highlight
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-background border-border"
                    )}
                  >
                    <entry.icon className="h-2.5 w-2.5" />
                    {entry.highlight && (
                      <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                    )}
                  </div>

                  {/* Card */}
                  <div
                    className={cn(
                      "p-4 sm:p-5 rounded-xl border transition-all duration-300",
                      "bg-card border-border hover:border-primary/30 hover:shadow-sm",
                      entry.highlight && "border-primary/20"
                    )}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <div>
                        <h3 className="text-sm sm:text-base font-semibold text-foreground">{entry.title}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">{entry.institution}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-medium text-primary">{entry.period}</span>
                        <span className={cn(
                          "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold",
                          entry.highlight
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-foreground"
                        )}>
                          {entry.gradeLabel}: {entry.grade}
                        </span>
                      </div>
                    </div>

                    {entry.coursework && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {entry.coursework.map((course) => (
                          <span
                            key={course}
                            className="px-2 py-0.5 text-[11px] font-medium rounded bg-secondary text-secondary-foreground"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
