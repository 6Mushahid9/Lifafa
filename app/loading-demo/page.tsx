"use client"

import { useState } from "react"
import {
  PageLoader,
  ComponentLoader,
  ButtonLoader,
  SkeletonLoader,
  LoadingOverlay,
  ProgressLoader,
} from "@/components/loading"
import { Button } from "@/components/ui/button"

export default function LoadingDemoPage() {
  const [showPageLoader, setShowPageLoader] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)
  const [progress, setProgress] = useState(0)

  const startProgress = () => {
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Loading Animations Demo</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Page Loader */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Page Loader</h2>
            <Button onClick={() => setShowPageLoader(true)} className="w-full">
              Show Page Loader
            </Button>
            {showPageLoader && <PageLoader isLoading={showPageLoader} message="Loading Lifafa" minLoadTime={3000} />}
          </div>

          {/* Component Loaders */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Component Loaders</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Default</p>
                <ComponentLoader />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Minimal</p>
                <ComponentLoader variant="minimal" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Dots</p>
                <ComponentLoader variant="dots" />
              </div>
            </div>
          </div>

          {/* Button Loaders */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Button Loaders</h2>
            <div className="space-y-3">
              <Button className="w-full bg-black text-white">
                <ButtonLoader color="white" />
                <span className="ml-2">Loading...</span>
              </Button>
              <Button variant="outline" className="w-full">
                <ButtonLoader color="black" />
                <span className="ml-2">Processing...</span>
              </Button>
            </div>
          </div>

          {/* Skeleton Loaders */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Skeleton Loaders</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Text</p>
                <SkeletonLoader type="text" lines={3} />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Profile</p>
                <SkeletonLoader type="profile" />
              </div>
            </div>
          </div>

          {/* Progress Loader */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Progress Loader</h2>
            <div className="space-y-4">
              <ProgressLoader progress={progress} message="Uploading" />
              <Button onClick={startProgress} className="w-full">
                Start Progress
              </Button>
            </div>
          </div>

          {/* Loading Overlay */}
          <div className="bg-white p-6 rounded-lg shadow-sm relative">
            <h2 className="text-xl font-semibold mb-4">Loading Overlay</h2>
            <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
              <p>Content behind overlay</p>
            </div>
            <Button
              onClick={() => {
                setShowOverlay(true)
                setTimeout(() => setShowOverlay(false), 3000)
              }}
              className="w-full mt-4"
            >
              Show Overlay (3s)
            </Button>
            <LoadingOverlay isLoading={showOverlay} message="Processing" />
          </div>

          {/* Template Skeletons */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Template Skeletons</h2>
            <div className="grid grid-cols-2 gap-4">
              <SkeletonLoader type="template" />
              <SkeletonLoader type="template" />
            </div>
          </div>

          {/* Card Skeletons */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Card Skeletons</h2>
            <SkeletonLoader type="card" />
          </div>

          {/* Size Variations */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Size Variations</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm w-12">Small:</span>
                <ComponentLoader size="sm" showText={false} />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm w-12">Medium:</span>
                <ComponentLoader size="md" showText={false} />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm w-12">Large:</span>
                <ComponentLoader size="lg" showText={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
