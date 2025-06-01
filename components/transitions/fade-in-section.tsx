"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { usePageTransition } from "@/contexts/page-transition-context"

interface FadeInSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  threshold?: number
}

export function FadeInSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  threshold = 0.1,
}: FadeInSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const { hasInitialLoadCompleted } = usePageTransition()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // If initial load hasn't completed, don't show animations yet
    if (!hasInitialLoadCompleted) {
      setIsVisible(false)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay, threshold, hasInitialLoadCompleted])

  const getTransformClass = () => {
    if (isVisible) return "translate-x-0 translate-y-0"

    switch (direction) {
      case "up":
        return "translate-y-4"
      case "down":
        return "-translate-y-4"
      case "left":
        return "translate-x-4"
      case "right":
        return "-translate-x-4"
      default:
        return ""
    }
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${getTransformClass()} ${className}`}
    >
      {children}
    </div>
  )
}
