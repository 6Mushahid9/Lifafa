"use client"

import { useState } from "react"
import { CustomCursor, useCustomCursor, type CursorType } from "@/components/custom-cursor"
import { Button } from "@/components/ui/button"

export function CursorDemo() {
  const { cursorType, setCursorType, cursorVisible, setCursorVisible, cursorLabel, setCursorLabel } = useCustomCursor()

  const [color, setColor] = useState("black")
  const [size, setSize] = useState(24)
  const [hideNative, setHideNative] = useState(true)

  const cursorTypes: CursorType[] = [
    "default",
    "move",
    "text",
    "pen",
    "hand",
    "grab",
    "grabbing",
    "resize-nw",
    "resize-ne",
    "resize-sw",
    "resize-se",
    "resize-n",
    "resize-e",
    "resize-s",
    "resize-w",
    "zoom-in",
    "zoom-out",
    "rotate",
    "crosshair",
    "not-allowed",
  ]

  return (
    <div className="p-8">
      <CustomCursor
        type={cursorType}
        visible={cursorVisible}
        hideNativeCursor={hideNative}
        color={color}
        size={size}
        label={cursorLabel}
      />

      <h1 className="text-3xl font-bold mb-8">Custom Cursor Demo</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Cursor Types</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {cursorTypes.map((type) => (
              <Button
                key={type}
                variant={cursorType === type ? "default" : "outline"}
                className={`text-sm ${cursorType === type ? "bg-black text-white" : ""}`}
                onClick={() => setCursorType(type)}
              >
                {type}
              </Button>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Cursor Label</h2>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={cursorLabel || ""}
                onChange={(e) => setCursorLabel(e.target.value || undefined)}
                placeholder="Enter cursor label"
                className="flex-1 p-2 border border-gray-300 rounded"
              />
              <Button variant="outline" onClick={() => setCursorLabel(undefined)}>
                Clear
              </Button>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Cursor Settings</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Color</label>
              <div className="flex gap-2">
                {["black", "#0066ff", "#ff0066", "#00cc66", "#ff6600"].map((c) => (
                  <button
                    key={c}
                    className={`w-8 h-8 rounded-full border ${color === c ? "ring-2 ring-offset-2 ring-black" : ""}`}
                    style={{ backgroundColor: c }}
                    onClick={() => setColor(c)}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Size: {size}px</label>
              <input
                type="range"
                min="16"
                max="48"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="hideNative"
                checked={hideNative}
                onChange={(e) => setHideNative(e.target.checked)}
              />
              <label htmlFor="hideNative">Hide native cursor</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="visible"
                checked={cursorVisible}
                onChange={(e) => setCursorVisible(e.target.checked)}
              />
              <label htmlFor="visible">Show custom cursor</label>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-8 border border-gray-200 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Test Area</h2>
        <p className="mb-4">Move your cursor in this area to test the custom cursor.</p>
        <div className="grid grid-cols-2 gap-4">
          <div
            className="h-40 bg-gray-100 rounded flex items-center justify-center"
            onMouseEnter={() => setCursorType("move")}
            onMouseLeave={() => setCursorType("default")}
          >
            Hover for "move" cursor
          </div>
          <div
            className="h-40 bg-gray-100 rounded flex items-center justify-center"
            onMouseEnter={() => setCursorType("text")}
            onMouseLeave={() => setCursorType("default")}
          >
            Hover for "text" cursor
          </div>
          <div
            className="h-40 bg-gray-100 rounded flex items-center justify-center"
            onMouseEnter={() => {
              setCursorType("pen")
              setCursorLabel("Drawing mode")
            }}
            onMouseLeave={() => {
              setCursorType("default")
              setCursorLabel(undefined)
            }}
          >
            Hover for "pen" cursor with label
          </div>
          <div
            className="h-40 bg-gray-100 rounded flex items-center justify-center"
            onMouseDown={() => setCursorType("grabbing")}
            onMouseUp={() => setCursorType("grab")}
            onMouseEnter={() => setCursorType("grab")}
            onMouseLeave={() => setCursorType("default")}
          >
            Click and hold for "grabbing" cursor
          </div>
        </div>
      </div>
    </div>
  )
}
