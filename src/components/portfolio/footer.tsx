"use client"

import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { LinkedInBadge } from "./linkedin-badge"
import { useSyncExternalStore } from "react"

const emptySubscribe = () => () => {}

export function Footer() {
  // Avoid hydration mismatch from new Date().getFullYear() differing between server and client
  const year = useSyncExternalStore(
    emptySubscribe,
    () => new Date().getFullYear().toString(),
    () => "2025"
  )

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {/* Intro */}
          <div>
            <h3 className="text-lg font-bold text-foreground">
              Nawaz Khan<span className="text-primary">.</span>
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              AI &amp; ML Engineer · Open to roles in AI, ML, and Data Analytics
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Quick Links</h4>
            <nav className="space-y-1.5" aria-label="Footer navigation">
              {[
                { href: "#about", label: "About" },
                { href: "#education", label: "Education" },
                { href: "#skills", label: "Skills" },
                { href: "#projects", label: "Projects" },
                { href: "#experience", label: "Experience" },
                { href: "#connect", label: "Connect" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-sm"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Connect</h4>
            <ul className="space-y-2" aria-label="Social links">
              <li>
                <a
                  href="https://github.com/Nawaz-khan-droid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-sm"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a
                  href="https://in.linkedin.com/in/nawaz-n-khan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-sm"
                >
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:nawazkhanwork@gmail.com"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-sm"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <span>Email</span>
                </a>
              </li>
            </ul>

            {/* LinkedIn badge — client-only to prevent hydration mismatch */}
            <div className="mt-4" aria-label="LinkedIn profile badge">
              <LinkedInBadge />
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; {year} Nawaz Khan. Built with{" "}
            <Heart className="inline h-3 w-3 text-primary" aria-hidden="true" /> and Next.js
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="gap-1.5 text-xs text-muted-foreground hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            Back to top
          </Button>
        </div>
      </div>
    </footer>
  )
}
