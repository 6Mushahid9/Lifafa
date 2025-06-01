"use client"

import { usePageTransition } from "@/contexts/page-transition-context"

export function NavigationIndicator() {
  const { isNavigating } = usePageTransition()

  if (!isNavigating) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-40">
      <div className="h-1 bg-gray-200">
        <div className="h-full bg-black animate-pulse" style={{ width: "30%" }} />
      </div>
    </div>
  )
}
