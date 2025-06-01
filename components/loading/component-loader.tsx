"use client"

interface ComponentLoaderProps {
  /**
   * Size of the loader
   */
  size?: "sm" | "md" | "lg"
  /**
   * Whether to show with text
   */
  showText?: boolean
  /**
   * Custom loading text
   */
  text?: string
  /**
   * Variant style
   */
  variant?: "default" | "minimal" | "dots"
}

export function ComponentLoader({
  size = "md",
  showText = true,
  text = "Loading",
  variant = "default",
}: ComponentLoaderProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }

  if (variant === "minimal") {
    return (
      <div className="flex items-center justify-center space-x-2">
        <div className={`${sizeClasses[size]} border-2 border-gray-200 border-t-black rounded-full animate-spin`} />
        {showText && <span className={`text-gray-600 ${textSizeClasses[size]}`}>{text}...</span>}
      </div>
    )
  }

  if (variant === "dots") {
    return (
      <div className="flex items-center justify-center space-x-1">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`bg-black rounded-full animate-bounce ${
              size === "sm" ? "w-1 h-1" : size === "md" ? "w-2 h-2" : "w-3 h-3"
            }`}
            style={{
              animationDelay: `${index * 0.2}s`,
              animationDuration: "1.4s",
              animationIterationCount: "infinite",
            }}
          />
        ))}
        {showText && <span className={`ml-3 text-gray-600 ${textSizeClasses[size]}`}>{text}...</span>}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className="relative">
        {/* Outer ring */}
        <div className={`${sizeClasses[size]} border-2 border-gray-200 rounded-full animate-spin`}>
          <div className="absolute top-0 left-1/2 w-0.5 h-0.5 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        </div>

        {/* Inner ring */}
        <div className={`absolute inset-1 border border-black/30 rounded-full animate-spin-reverse`}>
          <div className="absolute top-0 left-1/2 w-1 h-1 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>

      {showText && <p className={`text-gray-600 animate-pulse ${textSizeClasses[size]}`}>{text}...</p>}
    </div>
  )
}
