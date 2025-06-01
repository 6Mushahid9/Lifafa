"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { usePathname } from "next/navigation"

interface PageTransitionContextType {
  isInitialLoading: boolean
  isNavigating: boolean
  setIsNavigating: (navigating: boolean) => void
  hasInitialLoadCompleted: boolean
}

const PageTransitionContext = createContext<PageTransitionContextType | undefined>(undefined)

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [isNavigating, setIsNavigating] = useState(false)
  const [hasInitialLoadCompleted, setHasInitialLoadCompleted] = useState(false)
  const pathname = usePathname()

  // Handle initial website load
  useEffect(() => {
    if (isInitialLoading) {
      const timer = setTimeout(() => {
        setIsInitialLoading(false)
        setHasInitialLoadCompleted(true)
      }, 2500) // Show initial loading for 2.5 seconds

      return () => clearTimeout(timer)
    }
  }, [isInitialLoading])

  // Handle route changes (only after initial load)
  useEffect(() => {
    if (hasInitialLoadCompleted) {
      // Quick navigation indicator for subsequent page changes
      setIsNavigating(true)
      const timer = setTimeout(() => {
        setIsNavigating(false)
      }, 300) // Very brief navigation indicator

      return () => clearTimeout(timer)
    }
  }, [pathname, hasInitialLoadCompleted])

  return (
    <PageTransitionContext.Provider
      value={{
        isInitialLoading,
        isNavigating,
        setIsNavigating,
        hasInitialLoadCompleted,
      }}
    >
      {children}
    </PageTransitionContext.Provider>
  )
}

export function usePageTransition() {
  const context = useContext(PageTransitionContext)
  if (context === undefined) {
    throw new Error("usePageTransition must be used within a PageTransitionProvider")
  }
  return context
}
