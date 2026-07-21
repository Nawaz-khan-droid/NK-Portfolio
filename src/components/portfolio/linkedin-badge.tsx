"use client"

import { useEffect, useRef } from "react"

export function LinkedInBadge() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load LinkedIn script dynamically (avoids SSR issues and hydration mismatch)
    if (!document.querySelector('script[src*="platform.linkedin.com"]')) {
      const script = document.createElement("script")
      script.src = "https://platform.linkedin.com/badges/js/profile.js"
      script.async = true
      script.defer = true
      document.body.appendChild(script)
    }

    // Create badge DOM only on the client after hydration
    if (!containerRef.current) return

    // Small delay to let the script load if it hasn't yet
    const timer = setTimeout(() => {
      if (!containerRef.current) return

      // Only create if not already there
      if (containerRef.current.querySelector(".LI-profile-badge")) return

      const badgeDiv = document.createElement("div")
      badgeDiv.className = "badge-base LI-profile-badge"
      badgeDiv.setAttribute("data-locale", "en_US")
      badgeDiv.setAttribute("data-size", "medium")
      badgeDiv.setAttribute("data-theme", "light")
      badgeDiv.setAttribute("data-type", "HORIZONTAL")
      badgeDiv.setAttribute("data-vanity", "nawaz-n-khan")
      badgeDiv.setAttribute("data-version", "v1")

      const link = document.createElement("a")
      link.className = "badge-base__link LI-simple-link"
      link.href = "https://in.linkedin.com/in/nawaz-n-khan?trk=profile-badge"
      link.textContent = "Nawaz Khan"

      badgeDiv.appendChild(link)
      containerRef.current.appendChild(badgeDiv)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return <div ref={containerRef} suppressHydrationWarning />
}
