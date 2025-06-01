"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"

interface Element {
  id: string
  type: string
  x: number
  y: number
  content?: string
  imageUrl?: string
  width?: number
  height?: number
}

interface EditorCanvasProps {
  elements: Element[]
  selectedElement: string | null
  onSelectElement: (id: string | null) => void
  onUpdateElements: (elements: Element[]) => void
}

export function EditorCanvas({ elements, selectedElement, onSelectElement, onUpdateElements }: EditorCanvasProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent, elementId: string) => {
    e.preventDefault()
    const element = elements.find((el) => el.id === elementId)
    if (!element) return

    setIsDragging(true)
    onSelectElement(elementId)

    const rect = e.currentTarget.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedElement) return

    const canvasRect = canvasRef.current?.getBoundingClientRect()
    if (!canvasRect) return

    const newX = e.clientX - canvasRect.left - dragOffset.x
    const newY = e.clientY - canvasRect.top - dragOffset.y

    const updatedElements = elements.map((el) =>
      el.id === selectedElement ? { ...el, x: Math.max(0, newX), y: Math.max(0, newY) } : el,
    )
    onUpdateElements(updatedElements)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const renderElement = (element: Element) => {
    const isSelected = selectedElement === element.id

    switch (element.type) {
      case "text":
        return (
          <div
            key={element.id}
            style={{ left: element.x, top: element.y }}
            className={`absolute cursor-move p-2 border-2 ${
              isSelected ? "border-black" : "border-transparent"
            } hover:border-gray-400`}
            onMouseDown={(e) => handleMouseDown(e, element.id)}
          >
            <span className="text-lg">{element.content}</span>
          </div>
        )
      case "rectangle":
        return (
          <div
            key={element.id}
            style={{ left: element.x, top: element.y, width: element.width || 96, height: element.height || 64 }}
            className={`absolute bg-gray-200 border-2 cursor-move ${
              isSelected ? "border-black" : "border-gray-400"
            } hover:border-gray-600`}
            onMouseDown={(e) => handleMouseDown(e, element.id)}
          />
        )
      case "circle":
        return (
          <div
            key={element.id}
            style={{ left: element.x, top: element.y, width: element.width || 64, height: element.height || 64 }}
            className={`absolute bg-gray-200 rounded-full border-2 cursor-move ${
              isSelected ? "border-black" : "border-gray-400"
            } hover:border-gray-600`}
            onMouseDown={(e) => handleMouseDown(e, element.id)}
          />
        )
      case "uploaded-image":
        return (
          <div
            key={element.id}
            style={{ left: element.x, top: element.y }}
            className={`absolute cursor-move border-2 ${
              isSelected ? "border-black" : "border-transparent"
            } hover:border-gray-400`}
            onMouseDown={(e) => handleMouseDown(e, element.id)}
          >
            <Image
              src={element.imageUrl || "/placeholder.svg"}
              alt="Uploaded design"
              width={element.width || 200}
              height={element.height || 150}
              className="rounded"
            />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div
      ref={canvasRef}
      className="bg-white rounded-lg shadow-sm relative overflow-hidden"
      style={{ width: "600px", height: "800px" }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={() => onSelectElement(null)}
    >
      <div className="absolute inset-0 bg-gray-50 opacity-50" />
      {elements.map(renderElement)}
    </div>
  )
}
