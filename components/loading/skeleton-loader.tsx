"use client"

interface SkeletonLoaderProps {
  /**
   * Type of skeleton to show
   */
  type?: "text" | "card" | "profile" | "template" | "custom"
  /**
   * Number of lines for text skeleton
   */
  lines?: number
  /**
   * Custom className
   */
  className?: string
  /**
   * Whether to animate
   */
  animate?: boolean
}

export function SkeletonLoader({ type = "text", lines = 3, className = "", animate = true }: SkeletonLoaderProps) {
  const baseClasses = `bg-gray-200 rounded ${animate ? "animate-pulse" : ""}`

  if (type === "text") {
    return (
      <div className={`space-y-3 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <div key={index} className={`${baseClasses} h-4`} style={{ width: `${Math.random() * 40 + 60}%` }} />
        ))}
      </div>
    )
  }

  if (type === "card") {
    return (
      <div className={`${className}`}>
        <div className={`${baseClasses} h-48 mb-4`} />
        <div className={`${baseClasses} h-4 mb-2`} />
        <div className={`${baseClasses} h-4 w-3/4`} />
      </div>
    )
  }

  if (type === "profile") {
    return (
      <div className={`flex items-center space-x-4 ${className}`}>
        <div className={`${baseClasses} w-12 h-12 rounded-full`} />
        <div className="space-y-2 flex-1">
          <div className={`${baseClasses} h-4 w-1/2`} />
          <div className={`${baseClasses} h-3 w-1/3`} />
        </div>
      </div>
    )
  }

  if (type === "template") {
    return (
      <div className={`${className}`}>
        <div className={`${baseClasses} aspect-[3/4] mb-3`} />
        <div className={`${baseClasses} h-3 mb-1`} />
        <div className={`${baseClasses} h-3 w-2/3`} />
      </div>
    )
  }

  return <div className={`${baseClasses} ${className}`} />
}
