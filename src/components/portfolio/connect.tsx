"use client"

import { motion } from "framer-motion"
import { ScrollReveal } from "./scroll-reveal"
import { Mail, Linkedin, Github, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Connect() {
  return (
    <section id="connect" className="py-20 md:py-28 bg-muted/30" aria-label="Contact and connect">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full bg-primary/10 text-primary mb-4">
            Let&apos;s Connect
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Want to work together?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
            I&apos;m actively looking for entry-level roles in AI, ML, and Data Analytics. If you have an opportunity that aligns, I&apos;d love to hear from you.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" className="group gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" asChild>
              <a href="mailto:nawazkhanwork@gmail.com">
                <Mail className="h-4 w-4" aria-hidden="true" />
                Get in Touch
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" asChild>
              <a href="https://in.linkedin.com/in/nawaz-n-khan" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile (opens in new tab)">
                <Linkedin className="h-4 w-4" aria-hidden="true" />
                LinkedIn
              </a>
            </Button>
            <Button size="lg" variant="outline" className="gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" asChild>
              <a href="https://github.com/Nawaz-khan-droid" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile (opens in new tab)">
                <Github className="h-4 w-4" aria-hidden="true" />
                GitHub
              </a>
            </Button>
          </div>

          {/* Decorative dots */}
          <motion.div
            className="mt-12 flex items-center justify-center gap-1.5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            aria-hidden="true"
          >
            {[...Array(5)].map((_, i) => (
              <motion.span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-primary/30"
                animate={{ scale: [1, 1.4, 1] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  )
}
