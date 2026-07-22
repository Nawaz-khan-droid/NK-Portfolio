"use client"

import { useEffect, useRef } from "react"

interface Layer {
  freq: number
  amp: number
  speed: number
  phase: number
  lw: number
  glow: number
  c1: string
  c2: string
}

const LAYERS: Layer[] = [
  { freq: 0.0016, amp: 60, speed: 0.9, phase: 0, lw: 2.2, glow: 22,
    c1: "rgba(34,197,94,0.95)", c2: "rgba(16,185,129,0.45)" },
  { freq: 0.0022, amp: 38, speed: 1.2, phase: 1.1, lw: 1.6, glow: 14,
    c1: "rgba(6,182,212,0.7)", c2: "rgba(34,197,94,0.25)" },
  { freq: 0.0012, amp: 72, speed: 0.5, phase: 2.4, lw: 1.0, glow: 10,
    c1: "rgba(255,255,255,0.45)", c2: "rgba(16,185,129,0.12)" },
  { freq: 0.0028, amp: 22, speed: 1.7, phase: 3.8, lw: 0.9, glow: 6,
    c1: "rgba(139,92,246,0.35)", c2: "rgba(6,182,212,0.12)" },
  { freq: 0.0035, amp: 14, speed: 2.1, phase: 0.6, lw: 0.6, glow: 4,
    c1: "rgba(255,255,255,0.25)", c2: "rgba(255,255,255,0.05)" },
]

export function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf: number
    let t = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = 220 * dpr
      canvas.style.width = window.innerWidth + "px"
      canvas.style.height = "220px"
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener("resize", resize)

    const draw = () => {
      const w = window.innerWidth
      const h = 220
      ctx.clearRect(0, 0, w, h)
      const cy = h / 2

      LAYERS.forEach((layer) => {
        const grad = ctx.createLinearGradient(0, 0, w, 0)
        grad.addColorStop(0,    layer.c1)
        grad.addColorStop(0.35, layer.c2)
        grad.addColorStop(0.65, layer.c2)
        grad.addColorStop(1,    layer.c1)

        ctx.beginPath()
        for (let x = 0; x <= w; x += 2) {
          const y =
            cy +
            Math.sin(x * layer.freq + t * layer.speed + layer.phase) * layer.amp +
            Math.sin(x * layer.freq * 2.1 + t * layer.speed * 0.55 + layer.phase + 0.9) *
              (layer.amp * 0.28)
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }

        ctx.strokeStyle = grad
        ctx.lineWidth   = layer.lw
        ctx.shadowBlur  = layer.glow
        ctx.shadowColor = layer.c1
        ctx.stroke()
        ctx.shadowBlur  = 0
      })

      t += 0.022
      raf = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none"
      aria-hidden="true"
      style={{ opacity: 0.65 }}
    />
  )
}
