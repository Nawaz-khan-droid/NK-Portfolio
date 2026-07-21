"use client"

import { Navbar } from "@/components/portfolio/navbar"
import { Hero } from "@/components/portfolio/hero"
import { About } from "@/components/portfolio/about"
import { EducationTimeline } from "@/components/portfolio/timeline"
import { Skills } from "@/components/portfolio/skills"
import { Projects } from "@/components/portfolio/projects"
import { Experience } from "@/components/portfolio/experience"
import { Connect } from "@/components/portfolio/connect"
import { Footer } from "@/components/portfolio/footer"
import { Chatbot } from "@/components/portfolio/chatbot"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Hero />
        <About />
        <EducationTimeline />
        <Skills />
        <Projects />
        <Experience />
        <Connect />
      </main>
      <Footer />
      {/* Floating chatbot — fixed overlay, no layout impact */}
      <Chatbot />
    </div>
  )
}

