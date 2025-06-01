"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface Template {
  id: number
  name: string
  category: string
  image: string
}

interface TemplatesSidebarProps {
  templates: Template[]
  selectedTemplate: Template
  onSelectTemplate: (template: Template) => void
  isOpen: boolean
}

export function TemplatesSidebar({ templates, selectedTemplate, onSelectTemplate, isOpen }: TemplatesSidebarProps) {
  if (!isOpen) return null

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-screen overflow-y-auto fixed left-0 top-16 z-20">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Templates</h2>

        <Link href="/customize">
          <Button className="w-full mb-6 bg-black text-white hover:bg-gray-800">Customize From Scratch</Button>
        </Link>

        <div className="space-y-4">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => onSelectTemplate(template)}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedTemplate.id === template.id
                  ? "bg-black text-white shadow-lg"
                  : "hover:bg-gray-50 border-2 border-transparent hover:border-gray-200"
              }`}
            >
              <Image
                src={template.image || "/placeholder.svg"}
                alt={template.name}
                width={100}
                height={150}
                className="w-full h-32 object-cover rounded mb-3"
              />
              <h3 className="font-medium">{template.name}</h3>
              <p className={`text-sm ${selectedTemplate.id === template.id ? "text-gray-300" : "text-gray-600"}`}>
                {template.category}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
