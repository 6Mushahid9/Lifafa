"use client"

import { usePageTransition } from "@/contexts/page-transition-context"
import { useState, useEffect } from "react"

export function PageTransitionOverlay() {
  const { isInitialLoading } = usePageTransition()
  const [progress, setProgress] = useState(0)
  const [showOverlay, setShowOverlay] = useState(true)

  useEffect(() => {
    if (isInitialLoading) {
      // Animate progress during initial load
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(progressInterval)
            return 95
          }
          return prev + Math.random() * 15
        })
      }, 150)

      // Complete progress when loading finishes
      const completeTimer = setTimeout(() => {
        setProgress(100)
        // Hide overlay after progress completes
        setTimeout(() => setShowOverlay(false), 500)
      }, 2000)

      return () => {
        clearInterval(progressInterval)
        clearTimeout(completeTimer)
      }
    } else {
      setShowOverlay(false)
    }
  }, [isInitialLoading])

  if (!showOverlay) return null

  return (
    <div
      className={`fixed inset-0 z-50 bg-white transition-opacity duration-500 ${
        isInitialLoading ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative flex flex-col items-center justify-center h-full">
        {/* Animated Logo */}
        <div className="mb-8">
          <div className="relative">
            {/* Outer Ring */}
            <div className="w-24 h-24 border-3 border-gray-200 rounded-full animate-spin-slow">
              <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2" />
            </div>

            {/* Inner Ring */}
            <div className="absolute inset-3 border-2 border-black/20 rounded-full animate-spin-reverse">
              <div className="absolute top-0 left-1/2 w-2 h-2 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2" />
            </div>

            {/* Center Logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-3xl font-bold tracking-tight animate-pulse">L</div>
            </div>
          </div>
        </div>

        {/* Brand Name with Staggered Animation */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold tracking-tight">
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

        {/* Welcome Message */}
        <div className="mb-8">
          <p className="text-xl text-gray-600 animate-fade-in">Welcome to Lifafa</p>
        </div>

        {/* Progress Bar */}
        <div className="w-96 mb-6">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-black h-1.5 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Loading</span>
            <span>{Math.round(progress)}%</span>
            <span>Ready</span>
          </div>
        </div>

        {/* Loading Dots */}
        <div className="flex space-x-2">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="w-2.5 h-2.5 bg-black rounded-full animate-bounce"
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
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-gray-500 text-sm animate-fade-in-up">Because First Impressions Matter</p>
      </div>

      {/* Completion Animation */}
      {progress >= 100 && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform transition-transform duration-700 translate-x-full"
          style={{ width: "200%" }}
        />
      )}
    </div>
  )
}
