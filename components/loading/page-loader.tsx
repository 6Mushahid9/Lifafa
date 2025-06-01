"use client"

import { useEffect, useState } from "react"

interface PageLoaderProps {
  /**
   * Whether the loader is visible
   */
  isLoading?: boolean
  /**
   * Custom message to display
   */
  message?: string
  /**
   * Minimum loading time in milliseconds
   */
  minLoadTime?: number
}

export function PageLoader({ isLoading = true, message = "Loading", minLoadTime = 800 }: PageLoaderProps) {
  const [show, setShow] = useState(isLoading)

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShow(false), minLoadTime)
      return () => clearTimeout(timer)
    } else {
      setShow(true)
    }
  }, [isLoading, minLoadTime])

  if (!show) return null

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative flex flex-col items-center">
        {/* Brand Logo Animation */}
        <div className="mb-8">
          <div className="relative">
            {/* Outer Ring */}
            <div className="w-20 h-20 border-2 border-gray-200 rounded-full animate-spin-slow">
              <div className="absolute top-0 left-1/2 w-1 h-1 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2" />
            </div>

            {/* Inner Ring */}
            <div className="absolute inset-2 border-2 border-black/20 rounded-full animate-spin-reverse">
              <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2" />
            </div>

            {/* Center Logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-2xl font-bold tracking-tight animate-pulse">L</div>
            </div>
          </div>
        </div>

        {/* Brand Name */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold tracking-tight animate-fade-in">
            {"Lifafa".split("").map((letter, index) => (
              <span
                key={index}
                className="inline-block animate-bounce"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationDuration: "1s",
                  animationFillMode: "both",
                }}
              >
                {letter}
              </span>
            ))}
          </h1>
        </div>

        {/* Loading Message */}
        <div className="text-gray-600 animate-pulse">
          <p className="text-lg">{message}...</p>
        </div>

        {/* Progress Dots */}
        <div className="flex space-x-2 mt-6">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="w-2 h-2 bg-black rounded-full animate-bounce"
              style={{
                animationDelay: `${index * 0.2}s`,
                animationDuration: "1.4s",
                animationIterationCount: "infinite",
              }}
            />
          ))}
        </div>
      </div>

      {/* Tagline */}
      <div className="absolute bottom-12 text-center">
        <p className="text-gray-500 text-sm animate-fade-in-up">Because First Impressions Matter</p>
      </div>
    </div>
  )
}
