"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { EditorSidebar } from "@/components/editor-sidebar"
import { EditorCanvas } from "@/components/editor-canvas"
import { Button } from "@/components/ui/button"

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

export default function CustomizePage() {
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [elements, setElements] = useState<Element[]>([])

  const addElement = (type: string) => {
    const newElement: Element = {
      id: Date.now().toString(),
      type,
      x: 100,
      y: 100,
      content: type === "text" ? "Sample Text" : "",
    }
    setElements([...elements, newElement])
  }

  const addUploadedImage = (imageUrl: string) => {
    const newElement: Element = {
      id: Date.now().toString(),
      type: "uploaded-image",
      x: 50,
      y: 50,
      imageUrl,
      width: 200,
      height: 150,
    }
    setElements([...elements, newElement])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="flex">
        <EditorSidebar onAddElement={addElement} onImageUpload={addUploadedImage} />

        <div className="flex-1 p-8">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold">Custom Editor</h1>
            <Button className="bg-black text-white hover:bg-gray-800">Next →</Button>
          </div>

          <EditorCanvas
            elements={elements}
            selectedElement={selectedElement}
            onSelectElement={setSelectedElement}
            onUpdateElements={setElements}
          />
        </div>
      </div>
    </div>
  )
}
