"use client"
import { useEffect, useRef, useState } from "react"

export default function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setVisible(true)
        })
      },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={
        (className ? className + " " : "") +
        (visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2") +
        " transition-all duration-500 will-change-transform"
      }
    >
      {children}
    </div>
  )
}
