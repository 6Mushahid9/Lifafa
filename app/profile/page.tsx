"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProfileSidebar } from "@/components/profile-sidebar"
import { ProfileOverview } from "@/components/profile-overview"
import { ProfileEdit } from "@/components/profile-edit"
import { PasswordChange } from "@/components/password-change"
import { OrderHistory } from "@/components/order-history"
import { AccountSettings } from "@/components/account-settings"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

type ProfileSection = "overview" | "edit" | "password" | "orders" | "settings"

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState<ProfileSection>("overview")
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="container py-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (!user) {
    return null
  }

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <ProfileOverview />
      case "edit":
        return <ProfileEdit />
      case "password":
        return <PasswordChange />
      case "orders":
        return <OrderHistory />
      case "settings":
        return <AccountSettings />
      default:
        return <ProfileOverview />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Account</h1>
          <p className="text-gray-600 mt-2">Manage your profile, orders, and account settings</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ProfileSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
          </div>
          <div className="lg:col-span-3">{renderContent()}</div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
