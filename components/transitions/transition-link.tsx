"use client"

import type React from "react"

import Link from "next/link"
import { usePageTransition } from "@/contexts/page-transition-context"
import { useRouter } from "next/navigation"
import type { ReactNode } from "react"

interface TransitionLinkProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
  prefetch?: boolean
}

export function TransitionLink({ href, children, className = "", onClick, prefetch = true }: TransitionLinkProps) {
  const { setIsNavigating, hasInitialLoadCompleted } = usePageTransition()
  const router = useRouter()

  const handleClick = (e: React.MouseEvent) => {
    // Only prevent default and show navigation indicator after initial load
    if (hasInitialLoadCompleted) {
      e.preventDefault()

      // Call custom onClick if provided
      onClick?.()

      // Show brief navigation indicator
      setIsNavigating(true)

      // Navigate immediately (no delay needed)
      router.push(href)
    } else {
      // During initial load, just call onClick if provided
      onClick?.()
    }
  }

  return (
    <Link href={href} className={className} onClick={handleClick} prefetch={prefetch}>
      {children}
    </Link>
  )
}
