"use client"

import { ComponentLoader } from "./component-loader"

interface LoadingOverlayProps {
  /**
   * Whether the overlay is visible
   */
  isLoading: boolean
  /**
   * Loading message
   */
  message?: string
  /**
   * Whether to blur the background
   */
  blur?: boolean
  /**
   * Opacity of the overlay
   */
  opacity?: number
}

export function LoadingOverlay({ isLoading, message = "Loading", blur = true, opacity = 0.8 }: LoadingOverlayProps) {
  if (!isLoading) return null

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center z-40 ${blur ? "backdrop-blur-sm" : ""}`}
      style={{ backgroundColor: `rgba(255, 255, 255, ${opacity})` }}
    >
      <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
        <ComponentLoader text={message} size="lg" />
      </div>
    </div>
  )
}
