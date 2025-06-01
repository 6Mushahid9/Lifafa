"use client"

import { useEffect, useState } from "react"

interface ProgressLoaderProps {
  /**
   * Current progress (0-100)
   */
  progress?: number
  /**
   * Whether to show percentage
   */
  showPercentage?: boolean
  /**
   * Loading message
   */
  message?: string
  /**
   * Whether to animate automatically
   */
  autoAnimate?: boolean
  /**
   * Animation duration in milliseconds
   */
  duration?: number
}

export function ProgressLoader({
  progress = 0,
  showPercentage = true,
  message = "Loading",
  autoAnimate = false,
  duration = 3000,
}: ProgressLoaderProps) {
  const [currentProgress, setCurrentProgress] = useState(0)

  useEffect(() => {
    if (autoAnimate) {
      const interval = setInterval(() => {
        setCurrentProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 100 / (duration / 50)
        })
      }, 50)
      return () => clearInterval(interval)
    } else {
      setCurrentProgress(progress)
    }
  }, [progress, autoAnimate, duration])

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{message}</span>
        {showPercentage && <span className="text-sm text-gray-500">{Math.round(currentProgress)}%</span>}
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-black h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${currentProgress}%` }}
        />
      </div>
    </div>
  )
}
