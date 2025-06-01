"use client"

import { Type, Square, Circle, ImageIcon, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DesignUpload } from "@/components/design-upload"

interface EditorSidebarProps {
  onAddElement: (type: string) => void
  onImageUpload: (imageUrl: string) => void
}

const elements = [
  { type: "text", icon: Type, label: "Text" },
  { type: "rectangle", icon: Square, label: "Rectangle" },
  { type: "circle", icon: Circle, label: "Circle" },
  { type: "image", icon: ImageIcon, label: "Image" },
]

export function EditorSidebar({ onAddElement, onImageUpload }: EditorSidebarProps) {
  return (
    <div className="w-80 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Design Tools</h2>

        {/* Upload Your Design */}
        <div className="mb-8">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Upload size={20} />
            Upload Design
          </h3>
          <DesignUpload onImageUpload={onImageUpload} />
        </div>

        {/* Elements */}
        <div className="mb-8">
          <h3 className="font-semibold mb-4">Elements</h3>
          <div className="space-y-3">
            {elements.map((element) => (
              <Button
                key={element.type}
                onClick={() => onAddElement(element.type)}
                variant="outline"
                className="w-full justify-start gap-3 h-12 border-gray-300 hover:bg-gray-50"
              >
                <element.icon size={20} />
                {element.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Properties */}
        <div>
          <h3 className="font-semibold mb-4">Properties</h3>
          <div className="space-y-4 text-sm text-gray-600">
            <p>Select an element to edit its properties</p>
          </div>
        </div>
      </div>
    </div>
  )
}
