"use client"

import { useState, useEffect } from "react"
import type { CursorType } from "@/components/custom-cursor"

interface UseCursorOptions {
  /**
   * Initial cursor type
   */
  initialType?: CursorType
  /**
   * Whether to hide the native cursor
   */
  hideNativeCursor?: boolean
  /**
   * Custom color for the cursor
   */
  color?: string
  /**
   * Custom size for the cursor
   */
  size?: number
}

export function useCursor(options: UseCursorOptions = {}) {
  const { initialType = "default", hideNativeCursor = true, color = "black", size = 24 } = options

  const [type, setType] = useState<CursorType>(initialType)
  const [visible, setVisible] = useState(true)
  const [label, setLabel] = useState<string | undefined>(undefined)

  // Apply body style to hide native cursor if needed
  useEffect(() => {
    if (hideNativeCursor && visible) {
      document.body.style.cursor = "none"
    } else {
      document.body.style.cursor = ""
    }

    return () => {
      document.body.style.cursor = ""
    }
  }, [hideNativeCursor, visible])

  return {
    type,
    setType,
    visible,
    setVisible,
    label,
    setLabel,
    color,
    size,
  }
}
