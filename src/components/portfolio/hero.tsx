"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowDown, FileText, Github, Linkedin, Brain, Code2, Cpu, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

// Read basePath from env — set in next.config.ts, empty string locally
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
const RESUME_URL = `${BASE_PATH}/resume.pdf`

const PHRASES = [
  "AI & ML Engineer",
  "RAG Systems Builder",
  "Agentic AI Developer",
  "Python Developer",
]

const STATUSES = [
  "Open to Work",
  "Open to AI Internships",
]

export function Hero() {
  const { toast } = useToast()

  // Status Badge vertical swap state
  const [statusIndex, setStatusIndex] = useState(0)

  useEffect(() => {
    const statusInterval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % STATUSES.length)
    }, 3500)
    return () => clearInterval(statusInterval)
  }, [])

  // Typewriter animation state
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [currentText, setCurrentText] = useState(PHRASES[0])
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const targetPhrase = PHRASES[phraseIndex]
    let timer: NodeJS.Timeout

    if (!isDeleting) {
      if (currentText.length < targetPhrase.length) {
        // Typing: 65ms / char
        timer = setTimeout(() => {
          setCurrentText(targetPhrase.slice(0, currentText.length + 1))
        }, 65)
      } else {
        // Pause: 2.2s (2200ms)
        timer = setTimeout(() => {
          setIsDeleting(true)
        }, 2200)
      }
    } else {
      if (currentText.length > 0) {
        // Deleting: 38ms / char
        timer = setTimeout(() => {
          setCurrentText(targetPhrase.slice(0, currentText.length - 1))
        }, 38)
      } else {
        // Transition to next phrase
        setIsDeleting(false)
        setPhraseIndex((prev) => (prev + 1) % PHRASES.length)
      }
    }

    return () => clearTimeout(timer)
  }, [currentText, isDeleting, phraseIndex])

  const handleResumeClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      const res = await fetch(RESUME_URL, { method: "HEAD" })
      if (res.ok) {
        window.open(RESUME_URL, "_blank", "noopener,noreferrer")
      } else {
        toast({
          title: "📄 Resume File Notice",
          description: "Resume is currently being updated! Please reach out via Email or LinkedIn in the meantime.",
        })
      }
    } catch {
      // Fallback if fetch is blocked or CORS error occurs
      window.open(RESUME_URL, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-screen flex items-center justify-center hero-gradient grid-pattern noise-overlay overflow-hidden"
    >
      {/* Decorative floating elements — each carries a subtle AI/tech icon */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">


        <motion.div
          className="absolute top-[15%] left-[10%] w-16 h-16 sm:w-24 sm:h-24 rounded-2xl bg-primary/5 border border-primary/10 float-animation flex items-center justify-center"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Code2 className="w-6 h-6 sm:w-8 sm:h-8 text-primary/20" />
        </motion.div>
        <motion.div
          className="absolute bottom-[20%] right-[12%] w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center"
          animate={{ y: [-10, 10, -10], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <Brain className="w-5 h-5 sm:w-7 sm:h-7 text-primary/20" />
        </motion.div>
        <motion.div
          className="absolute top-[60%] left-[8%] w-8 h-8 sm:w-14 sm:h-14 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center"
          animate={{ y: [-5, 8, -5], rotate: [-5, 5, -5] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <Cpu className="w-4 h-4 sm:w-6 sm:h-6 text-primary/20" />
        </motion.div>
        {/* Sparkles — hidden on xs to avoid badge overlap */}
        <motion.div
          className="absolute top-[25%] right-[18%] hidden sm:flex w-10 h-10 rounded-md bg-primary/5 border border-primary/10 items-center justify-center"
          animate={{ y: [0, -12, 0], x: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="w-5 h-5 text-primary/20" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Status badge with Vertical Text Swap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-medium max-w-[90vw]">
            <span className="relative flex h-2 w-2 flex-shrink-0" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="relative inline-block overflow-hidden h-[1.3em] min-w-[130px] sm:min-w-[165px] text-left">
              <AnimatePresence mode="wait">
                <motion.span
                  key={STATUSES[statusIndex]}
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="absolute inset-0 whitespace-nowrap"
                >
                  {STATUSES[statusIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground"
        >
          Nawaz{" "}
          <span className="gradient-text">Khan</span>
        </motion.h1>

        {/* Typewriter Title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-4 text-lg sm:text-xl md:text-2xl text-muted-foreground font-medium flex items-center justify-center min-h-[2.25rem]"
        >
          <span className="inline-flex items-center justify-center whitespace-nowrap">
            <span>{currentText}</span>
            <span className="animate-blink font-mono font-bold text-primary ml-0.5 select-none" aria-hidden="true">
              |
            </span>
          </span>
        </motion.p>

        {/* One-line tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="mt-3 text-sm sm:text-base text-muted-foreground/80 max-w-lg mx-auto"
        >
          RAG systems · Agentic workflows · Automation
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button
            size="lg"
            className="group gap-2 px-6"
            onClick={() => {
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            <Brain className="h-4 w-4" aria-hidden="true" />
            View Projects
            <ArrowDown className="h-3 w-3 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="gap-2 px-6"
            asChild
          >
            <a href="/NK-Portfolio/resume.pdf" target="_blank" rel="noopener noreferrer">
              <FileText className="h-4 w-4" aria-hidden="true" />
              View Resume
            </a>
          </Button>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-8 flex items-center justify-center gap-3"
        >
          <Button variant="ghost" size="icon" asChild className="h-10 w-10 rounded-full hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            <a href="https://github.com/Nawaz-khan-droid" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile (opens in new tab)">
              <Github className="h-5 w-5" aria-hidden="true" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild className="h-10 w-10 rounded-full hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            <a href="https://in.linkedin.com/in/nawaz-n-khan" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile (opens in new tab)">
              <Linkedin className="h-5 w-5" aria-hidden="true" />
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
          <ArrowDown className="h-4 w-4 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  )
}
