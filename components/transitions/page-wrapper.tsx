"use client"

import type React from "react"

import { usePageTransition } from "@/contexts/page-transition-context"
import { useEffect, useState } from "react"

interface PageWrapperProps {
  children: React.ReactNode
  className?: string
}

export function PageWrapper({ children, className = "" }: PageWrapperProps) {
  const { isInitialLoading, isNavigating, hasInitialLoadCompleted } = usePageTransition()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (hasInitialLoadCompleted && !isNavigating) {
      // Show content immediately after initial load completes
      setIsVisible(true)
    } else if (!hasInitialLoadCompleted) {
      // During initial load, wait for it to complete
      setIsVisible(false)
    } else if (isNavigating) {
      // During navigation, keep content visible (no hiding)
      setIsVisible(true)
    }
  }, [isInitialLoading, isNavigating, hasInitialLoadCompleted])

  return (
    <div
      className={`transition-all duration-300 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      } ${className}`}
    >
      {children}
    </div>
  )
}
