"use client"

import Image from "next/image"

interface Template {
  id: number
  name: string
  category: string
  image: string
}

interface Customizations {
  recipientName: string
  recipientAddress: string
  senderName: string
  senderAddress: string
}

interface TemplateCanvasProps {
  template: Template
  customizations: Customizations
  onCustomizationsChange: (customizations: Customizations) => void
}

export function TemplateCanvas({ template, customizations, onCustomizationsChange }: TemplateCanvasProps) {
  const handleInputChange = (field: keyof Customizations, value: string) => {
    onCustomizationsChange({
      ...customizations,
      [field]: value,
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
      <h2 className="text-2xl font-bold mb-6">{template.name} Preview</h2>

      <div className="flex gap-8">
        <div className="flex-1">
          <div className="relative bg-gray-50 p-8 rounded-lg" style={{ aspectRatio: "3/4", maxWidth: "400px" }}>
            <Image
              src={template.image || "/placeholder.svg"}
              alt={template.name}
              fill
              className="object-cover rounded-lg opacity-20"
            />

            {/* Sender Address (Top Left) */}
            <div className="absolute top-8 left-8 text-sm">
              <div className="font-medium">{customizations.senderName}</div>
              <div className="whitespace-pre-line text-gray-700">{customizations.senderAddress}</div>
            </div>

            {/* Recipient Address (Center) */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="font-medium text-lg">{customizations.recipientName}</div>
              <div className="whitespace-pre-line text-gray-700 mt-2">{customizations.recipientAddress}</div>
            </div>
          </div>
        </div>

        <div className="w-80 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Recipient Name</label>
            <input
              type="text"
              value={customizations.recipientName}
              onChange={(e) => handleInputChange("recipientName", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Recipient Address</label>
            <textarea
              value={customizations.recipientAddress}
              onChange={(e) => handleInputChange("recipientAddress", e.target.value)}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Sender Name</label>
            <input
              type="text"
              value={customizations.senderName}
              onChange={(e) => handleInputChange("senderName", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Sender Address</label>
            <textarea
              value={customizations.senderAddress}
              onChange={(e) => handleInputChange("senderAddress", e.target.value)}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
