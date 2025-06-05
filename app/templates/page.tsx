"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { TemplatesSidebar } from "@/components/templates-sidebar"
import { TemplateCanvas } from "@/components/template-canvas"
import { EnhancedOrderDetails } from "@/components/enhanced-order-details"
import { LoginModal } from "@/components/login-modal"
import { useAuth } from "@/contexts/auth-context"
import { Menu, X } from "lucide-react"
import { ComponentLoader } from "@/components/loading/component-loader"
import { SkeletonLoader } from "@/components/loading/skeleton-loader"
import { PageWrapper } from "@/components/transitions/page-wrapper"
import { FadeInSection } from "@/components/transitions/fade-in-section"

const templates = [
  { id: 1, name: "Classic Formal", category: "Business", image: "/one.jpeg?height=300&width=200" },
  { id: 2, name: "Modern Minimal", category: "Contemporary", image: "/two.jpeg?height=300&width=200" },
  { id: 3, name: "Elegant Border", category: "Formal", image: "/three.jpeg?height=300&width=200" },
  { id: 4, name: "Corporate Style", category: "Business", image: "/four.jpeg?height=300&width=200" },
  { id: 5, name: "Vintage Design", category: "Classic", image: "/five.jpeg?height=300&width=200" },
  { id: 6, name: "Contemporary", category: "Modern", image: "/six.jpeg?height=300&width=200" },
  { id: 7, name: "Royal Invitation", category: "Formal", image: "/seven.jpeg?height=300&width=200" },
  { id: 8, name: "Simple Clean", category: "Minimal", image: "/eight.jpeg?height=300&width=200" },
]

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0])
  const [copies, setCopies] = useState(100)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [customizations, setCustomizations] = useState({
    recipientName: "John Doe",
    recipientAddress: "123 Main Street\nNew York, NY 10001",
    senderName: "Your Name",
    senderAddress: "456 Oak Avenue\nLos Angeles, CA 90210",
  })
  const { user } = useAuth()

  // Add a loading state
  const [isLoading, setIsLoading] = useState(true)

  // Add useEffect to simulate loading
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleSaveToCart = () => {
    if (!user) {
      setShowLoginModal(true)
      return
    }
    // Add to cart logic will be handled in the EnhancedOrderDetails component
  }

  return (
    <PageWrapper className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="flex relative">
        {/* Sidebar Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed top-20 left-4 z-30 bg-white border border-gray-200 rounded-lg p-2 shadow-md hover:shadow-lg transition-shadow"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Sidebar */}
        <FadeInSection
          direction="left"
          className={`transition-all duration-300 ease-in-out ${sidebarOpen ? "w-80" : "w-0"} overflow-hidden`}
        >
          <TemplatesSidebar
            templates={templates}
            selectedTemplate={selectedTemplate}
            onSelectTemplate={setSelectedTemplate}
            isOpen={sidebarOpen}
          />
        </FadeInSection>

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? "ml-0" : "ml-16"} p-8`}>
          {isLoading ? (
            <div className="space-y-8">
              <div className="flex justify-center py-12">
                <ComponentLoader size="lg" text="Loading template" />
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <SkeletonLoader type="card" />
                <div className="space-y-4">
                  <SkeletonLoader type="text" lines={1} className="h-8 w-3/4" />
                  <SkeletonLoader type="text" lines={4} />
                </div>
              </div>
            </div>
          ) : (
            <>
              <FadeInSection delay={100}>
                <TemplateCanvas
                  template={selectedTemplate}
                  customizations={customizations}
                  onCustomizationsChange={setCustomizations}
                />
              </FadeInSection>
              <FadeInSection delay={200}>
                <EnhancedOrderDetails
                  template={selectedTemplate}
                  copies={copies}
                  onCopiesChange={setCopies}
                  customizations={customizations}
                  onSaveToCart={handleSaveToCart}
                />
              </FadeInSection>
            </>
          )}
        </div>
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={() => {
          // After successful login, the cart option will become visible
          console.log("Login successful, cart now available")
        }}
      />
    </PageWrapper>
  )
}
