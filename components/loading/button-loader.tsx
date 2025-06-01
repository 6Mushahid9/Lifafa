"use client"

interface ButtonLoaderProps {
  /**
   * Size of the loader
   */
  size?: "sm" | "md" | "lg"
  /**
   * Color of the loader
   */
  color?: "white" | "black" | "gray"
}

export function ButtonLoader({ size = "md", color = "white" }: ButtonLoaderProps) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }

  const colorClasses = {
    white: "border-white/30 border-t-white",
    black: "border-black/30 border-t-black",
    gray: "border-gray-300 border-t-gray-600",
  }

  return <div className={`${sizeClasses[size]} border-2 ${colorClasses[color]} rounded-full animate-spin`} />
}
