"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import type { CursorType } from "./types" // Declare the CursorType import

interface CustomCursorProps {
  /**
   * Current cursor type
   */
  type?: CursorType
  /**
   * Whether to show the cursor
   */
  visible?: boolean
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
  /**
   * Optional label to show next to cursor
   */
  label?: string
}

export function CustomCursor({
  type = "default",
  visible = true,
  hideNativeCursor = true,
  color = "black",
  size = 24,
  label,
}: CustomCursorProps) {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [mounted, setMounted] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Apply body style to hide native cursor if needed
    if (hideNativeCursor) {
      document.body.style.cursor = "none"
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseDown = () => {
      setIsClicking(true)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      // Clean up
      document.body.style.cursor = ""
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [hideNativeCursor])

  // Don't render on server
  if (!mounted || !visible) return null

  return createPortal(
    <div
      className="fixed pointer-events-none z-[9999] select-none"
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
      }}
    >
      {renderCursor(type, color, size, isClicking)}

      {label && (
        <div className="absolute left-6 top-0 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          {label}
        </div>
      )}
    </div>,
    document.body,
  )
}

function renderCursor(type: CursorType, color: string, size: number, isClicking: boolean): JSX.Element {
  const scale = isClicking ? 0.9 : 1
  const baseSize = size

  switch (type) {
    case "default":
      return (
        <svg
          width={baseSize}
          height={baseSize}
          viewBox="0 0 24 24"
          fill="none"
          style={{ transform: `scale(${scale})` }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.0452062 17.2693C-0.046125 17.3529 -0.0147625 17.4999 0.109331 17.5409L2.88464 18.4421C3.02184 18.4865 3.09732 18.6302 3.04487 18.7654L0.5452 24.0001C0.499456 24.1118 0.615293 24.2128 0.720612 24.1532L12.1367 16.6885C12.2826 16.5982 12.2631 16.3695 12.1056 16.3071L9.19072 15.0556C9.06239 15.0039 9.00267 14.8553 9.06239 14.7283L13.9466 4.93997C14.0026 4.81809 13.9119 4.71705 13.7836 4.77398L11.0887 5.91536C10.9844 5.96322 10.8604 5.90629 10.8184 5.80166L8.57856 0.10166C8.53611 0.00562 8.39891 -0.0307 8.32764 0.0529L5.65376 12.3673Z"
            fill={color}
          />
        </svg>
      )

    case "move":
      return (
        <svg
          width={baseSize}
          height={baseSize}
          viewBox="0 0 24 24"
          fill="none"
          style={{ transform: `scale(${scale})` }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 21.9999L8.4 18.3999H15.6L12 21.9999ZM12 1.99988L15.6 5.59988H8.4L12 1.99988ZM21.9999 12L18.3999 15.6V8.4L21.9999 12ZM1.99988 12L5.59988 8.4V15.6L1.99988 12ZM12 8.99988L15 11.9999L12 14.9999L9 11.9999L12 8.99988Z"
            fill={color}
          />
        </svg>
      )

    case "text":
      return (
        <svg
          width={baseSize}
          height={baseSize}
          viewBox="0 0 24 24"
          fill="none"
          style={{ transform: `scale(${scale})` }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13.325 3H7V5H11.325V19H13.325V5H17.65V3H13.325Z" fill={color} />
          <path d="M5 13.325H3V17.65H5V13.325Z" fill={color} />
          <path d="M21 13.325H19V17.65H21V13.325Z" fill={color} />
        </svg>
      )

    case "pen":
      return (
        <svg
          width={baseSize}
          height={baseSize}
          viewBox="0 0 24 24"
          fill="none"
          style={{ transform: `scale(${scale}) rotate(-45deg)` }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.2635 2.29289C20.873 1.90237 20.2398 1.90237 19.8493 2.29289L18.9769 3.16525C17.8618 2.63254 16.4857 2.82181 15.5621 3.74534L4.95549 14.3519L10.6066 20.0031L21.2132 9.39645C22.1367 8.47292 22.326 7.09681 21.7933 5.98175L22.6656 5.10938C23.0562 4.71885 23.0562 4.08569 22.6656 3.69516L21.2635 2.29289ZM16.9955 10.8035L10.6066 17.1924L7.76447 14.3503L14.1534 7.96136C14.5722 7.54253 15.2521 7.54253 15.671 7.96136L16.9955 9.28589C17.4143 9.70472 17.4143 10.3846 16.9955 10.8035Z"
            fill={color}
          />
          <path d="M2 22.9502L4.12171 15.1717L9.77817 20.8289L2 22.9502Z" fill={color} />
        </svg>
      )

    case "hand":
      return (
        <svg
          width={baseSize}
          height={baseSize}
          viewBox="0 0 24 24"
          fill="none"
          style={{ transform: `scale(${scale})` }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20.5 6.5L15.5 1.5V4.5H13.5V7.5H15.5V11.5L18.5 8.5L20.5 6.5Z" fill={color} />
          <path
            d="M18 12V15.5C18 19.09 15.09 22 11.5 22C7.91 22 5 19.09 5 15.5V8.5L6.5 9.5L8 8.5V15.5C8 17.43 9.57 19 11.5 19C13.43 19 15 17.43 15 15.5V12L18 12Z"
            fill={color}
          />
        </svg>
      )

    case "grab":
      return (
        <svg
          width={baseSize}
          height={baseSize}
          viewBox="0 0 24 24"
          fill="none"
          style={{ transform: `scale(${scale})` }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9 4.5C9 3.67157 8.32843 3 7.5 3C6.67157 3 6 3.67157 6 4.5V11.25H9V4.5Z" fill={color} />
          <path
            d="M13.5 6C13.5 5.17157 12.8284 4.5 12 4.5C11.1716 4.5 10.5 5.17157 10.5 6V11.25H13.5V6Z"
            fill={color}
          />
          <path d="M18 7.5C18 6.67157 17.3284 6 16.5 6C15.6716 6 15 6.67157 15 7.5V11.25H18V7.5Z" fill={color} />
          <path
            d="M13.5 16.5V15H10.5V16.5C10.5 17.3284 11.1716 18 12 18C12.8284 18 13.5 17.3284 13.5 16.5Z"
            fill={color}
          />
          <path d="M18 15H15V16.5C15 17.3284 15.6716 18 16.5 18C17.3284 18 18 17.3284 18 16.5V15Z" fill={color} />
          <path d="M9 15H6V16.5C6 17.3284 6.67157 18 7.5 18C8.32843 18 9 17.3284 9 16.5V15Z" fill={color} />
          <path
            d="M6 12.75C4.75736 12.75 3.75 13.7574 3.75 15V16.5C3.75 18.9853 5.76472 21 8.25 21H15.75C18.2353 21 20.25 18.9853 20.25 16.5V15C20.25 13.7574 19.2426 12.75 18 12.75H6Z"
            stroke={color}
            strokeWidth="1.5"
          />
        </svg>
      )

    case "grabbing":
      return (
        <svg
          width={baseSize}
          height={baseSize}
          viewBox="0 0 24 24"
          fill="none"
          style={{ transform: `scale(${scale})` }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.5 4.75C9.5 3.92157 8.82843 3.25 8 3.25C7.17157 3.25 6.5 3.92157 6.5 4.75V9H9.5V4.75Z"
            fill={color}
          />
          <path
            d="M14 6.25C14 5.42157 13.3284 4.75 12.5 4.75C11.6716 4.75 11 5.42157 11 6.25V9H14V6.25Z"
            fill={color}
          />
          <path
            d="M18.5 7.75C18.5 6.92157 17.8284 6.25 17 6.25C16.1716 6.25 15.5 6.92157 15.5 7.75V9H18.5V7.75Z"
            fill={color}
          />
          <path
            d="M14 14.25V12.75H11V14.25C11 15.0784 11.6716 15.75 12.5 15.75C13.3284 15.75 14 15.0784 14 14.25Z"
            fill={color}
          />
          <path
            d="M18.5 12.75H15.5V14.25C15.5 15.0784 16.1716 15.75 17 15.75C17.8284 15.75 18.5 15.0784 18.5 14.25V12.75Z"
            fill={color}
          />
          <path
            d="M9.5 12.75H6.5V14.25C6.5 15.0784 7.17157 15.75 8 15.75C8.82843 15.75 9.5 15.0784 9.5 14.25V12.75Z"
            fill={color}
          />
          <path
            d="M6.5 10.5C5.25736 10.5 4.25 11.5074 4.25 12.75V14.25C4.25 16.7353 6.26472 18.75 8.75 18.75H16.25C18.7353 18.75 20.75 16.7353 20.75 14.25V12.75C20.75 11.5074 19.7426 10.5 18.5 10.5H6.5Z"
            stroke={color}
            strokeWidth="1.5"
          />
        </svg>
      )

    case "resize-nw":
    case "resize-se":
      return (
        <svg
          width={baseSize}
          height={baseSize}
          viewBox="0 0 24 24"
          fill="none"
          style={{ transform: `scale(${scale}) ${type === "resize-nw" ? "rotate(180deg)" : ""}` }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M22 2L22 9L15 9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 2L13 11" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <path d="M11 13L2 22" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      )

    case "resize-ne":
    case "resize-sw":
      return (
        <svg
          width={baseSize}
          height={baseSize}
          viewBox="0 0 24 24"
          fill="none"
          style={{ transform: `scale(${scale}) ${type === "resize-ne" ? "" : "rotate(180deg)"}` }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2 2L2 9L9 9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 2L11 11" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <path d="M13 13L22 22" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      )

    case "resize-n":
    case "resize-s":
      return (
        <svg
          width={baseSize}
          height={baseSize}
          viewBox="0 0 24 24"
          fill="none"
          style={{ transform: `scale(${scale}) ${type === "resize-n" ? "rotate(180deg)" : ""}` }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2V22" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <path d="M7 17L12 22L17 17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )

    case "resize-e":
    case "resize-w":
      return (
        <svg
          width={baseSize}
          height={baseSize}
          viewBox="0 0 24 24"
          fill="none"
          style={{ transform: `scale(${scale}) ${type === "resize-w" ? "rotate(180deg)" : ""}` }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2 12H22" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <path d="M17 7L22 12L17 17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )

    case "zoom-in":
      return (
        <svg
          width={baseSize}
          height={baseSize}
          viewBox="0 0 24 24"
          fill="none"
          style={{ transform: `scale(${scale})` }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 8C11 7.44772 10.5523 7 10 7C9.44772 7 9 7.44772 9 8V10H7C6.44772 10 6 10.4477 6 11C6 11.5523 6.44772 12 7 12H9V14C9 14.5523 9.44772 15 10 15C10.5523 15 11 14.5523 11 14V12H13C13.5523 12 14 11.5523 14 11C14 10.4477 13.5523 10 13 10H11V8Z"
            fill={color}
          />
          <path
            d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
            stroke={color}
            strokeWidth="2"
          />
          <path d="M15 15L22 22" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      )

    case "zoom-out":
      return (
        <svg
          width={baseSize}
          height={baseSize}
          viewBox="0 0 24 24"
          fill="none"
          style={{ transform: `scale(${scale})` }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 11C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H13C13.5523 13 14 12.5523 14 12C14 11.4477 13.5523 11 13 11H7Z"
            fill={color}
          />
          <path
            d="M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19Z"
            stroke={color}
            strokeWidth="2"
          />
          <path d="M16 16L23 23" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      )

    case "rotate":
      return (
        <svg
          width={baseSize}
          height={baseSize}
          viewBox="0 0 24 24"
          fill="none"
          style={{ transform: `scale(${scale})` }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M20 4L20 8L16 8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )

    case "crosshair":
      return (
        <svg
          width={baseSize}
          height={baseSize}
          viewBox="0 0 24 24"
          fill="none"
          style={{ transform: `scale(${scale})` }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke={color}
            strokeWidth="2"
          />
          <path d="M12 2V22" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <path d="M2 12H22" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      )

    case "not-allowed":
      return (
        <svg
          width={baseSize}
          height={baseSize}
          viewBox="0 0 24 24"
          fill="none"
          style={{ transform: `scale(${scale})` }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke={color}
            strokeWidth="2"
          />
          <path d="M5 5L19 19" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      )

    default:
      return (
        <svg
          width={baseSize}
          height={baseSize}
          viewBox="0 0 24 24"
          fill="none"
          style={{ transform: `scale(${scale})` }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.0452062 17.2693C-0.046125 17.3529 -0.0147625 17.4999 0.109331 17.5409L2.88464 18.4421C3.02184 18.4865 3.09732 18.6302 3.04487 18.7654L0.5452 24.0001C0.499456 24.1118 0.615293 24.2128 0.720612 24.1532L12.1367 16.6885C12.2826 16.5982 12.2631 16.3695 12.1056 16.3071L9.19072 15.0556C9.06239 15.0039 9.00267 14.8553 9.06239 14.7283L13.9466 4.93997C14.0026 4.81809 13.9119 4.71705 13.7836 4.77398L11.0887 5.91536C10.9844 5.96322 10.8604 5.90629 10.8184 5.80166L8.57856 0.10166C8.53611 0.00562 8.39891 -0.0307 8.32764 0.0529L5.65376 12.3673Z"
            fill={color}
          />
        </svg>
      )
  }
}

/**
 * Hook to use the custom cursor
 */
export function useCustomCursor() {
  const [cursorType, setCursorType] = useState<CursorType>("default")
  const [cursorVisible, setCursorVisible] = useState(true)
  const [cursorLabel, setCursorLabel] = useState<string | undefined>(undefined)

  return {
    cursorType,
    setCursorType,
    cursorVisible,
    setCursorVisible,
    cursorLabel,
    setCursorLabel,
  }
}
