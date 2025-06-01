"use client"

import Image from "next/image"
import { User, Edit, Lock, Package, Settings, LogOut } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"

type ProfileSection = "overview" | "edit" | "password" | "orders" | "settings"

interface ProfileSidebarProps {
  activeSection: ProfileSection
  onSectionChange: (section: ProfileSection) => void
}

const menuItems = [
  { id: "overview" as ProfileSection, label: "Profile Overview", icon: User },
  { id: "edit" as ProfileSection, label: "Edit Profile", icon: Edit },
  { id: "password" as ProfileSection, label: "Change Password", icon: Lock },
  { id: "orders" as ProfileSection, label: "Order History", icon: Package },
  { id: "settings" as ProfileSection, label: "Account Settings", icon: Settings },
]

export function ProfileSidebar({ activeSection, onSectionChange }: ProfileSidebarProps) {
  const { user, logout } = useAuth()

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="text-center mb-6 pb-6 border-b border-gray-200">
        <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 border-2 border-gray-200">
          {user?.profilePicture ? (
            <Image
              src={user.profilePicture || "/placeholder.svg"}
              alt="Profile"
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-black text-white flex items-center justify-center text-2xl font-bold">
              {user?.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <h3 className="font-semibold text-lg">{user?.name}</h3>
        <p className="text-gray-600 text-sm">{user?.email}</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
              activeSection === item.id ? "bg-black text-white" : "text-gray-700 hover:bg-gray-50 hover:text-black"
            }`}
          >
            <item.icon size={20} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <Button onClick={logout} variant="outline" className="w-full text-red-600 border-red-600 hover:bg-red-50">
          <LogOut size={16} className="mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
