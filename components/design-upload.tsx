"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { X, FileImage } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DesignUploadProps {
  onImageUpload: (imageUrl: string) => void
}

export function DesignUpload({ onImageUpload }: DesignUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (file: File) => {
    setError("")

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file")
      return
    }

    // Validate file size (max 10MB for designs)
    if (file.size > 10 * 1024 * 1024) {
      setError("Image size must be less than 10MB")
      return
    }

    setIsUploading(true)

    try {
      // Create preview and upload URL
      const imageUrl = URL.createObjectURL(file)
      setPreviewUrl(imageUrl)

      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Add to canvas
      onImageUpload(imageUrl)
      setPreviewUrl(null)
    } catch (err) {
      setError("Failed to upload image. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0])
    }
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
          dragActive ? "border-black bg-gray-50" : "border-gray-300 hover:border-gray-400"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <FileImage size={32} className="mx-auto text-gray-400 mb-3" />
        <p className="text-gray-600 mb-2">Upload your own design</p>
        <p className="text-sm text-gray-500 mb-3">Drag and drop or click to browse</p>
        <Button variant="outline" disabled={isUploading} className="pointer-events-none">
          {isUploading ? "Uploading..." : "Choose File"}
        </Button>
        <p className="text-xs text-gray-500 mt-2">PNG, JPG, SVG up to 10MB</p>
      </div>

      {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}

      {/* Preview Modal */}
      {previewUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold">Adding to Canvas</h4>
              <button onClick={() => setPreviewUrl(null)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="max-w-sm mx-auto mb-4">
              <Image
                src={previewUrl || "/placeholder.svg"}
                alt="Preview"
                width={300}
                height={200}
                className="w-full h-auto rounded-lg"
              />
            </div>
            <p className="text-center text-gray-600 text-sm">
              {isUploading ? "Processing your design..." : "Your design is being added to the canvas"}
            </p>
          </div>
        </div>
      )}

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} className="hidden" />
    </div>
  )
}
