"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  phone?: string
  profilePicture?: string
  address?: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  joinDate: string
  preferences: {
    emailNotifications: boolean
    smsNotifications: boolean
    marketingEmails: boolean
  }
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  updateProfile: (updates: Partial<User>) => Promise<boolean>
  updateProfilePicture: (file: File) => Promise<string | null>
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem("lifafa_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock authentication - in real app, this would be an API call
    if (email && password) {
      const mockUser: User = {
        id: "1",
        name: email.split("@")[0],
        email: email,
        phone: "+91 98765 43210",
        profilePicture: undefined,
        address: {
          street: "123 Main Street",
          city: "Mumbai",
          state: "Maharashtra",
          zipCode: "400001",
          country: "India",
        },
        joinDate: "2023-01-15",
        preferences: {
          emailNotifications: true,
          smsNotifications: false,
          marketingEmails: true,
        },
      }
      setUser(mockUser)
      localStorage.setItem("lifafa_user", JSON.stringify(mockUser))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("lifafa_user")
    localStorage.removeItem("lifafa_cart")
  }

  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem("lifafa_user", JSON.stringify(updatedUser))
      return true
    }
    return false
  }

  const updateProfilePicture = async (file: File): Promise<string | null> => {
    // Simulate API call for file upload
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real app, you would upload to a cloud service and get back a URL
    // For demo purposes, we'll create a local object URL
    const imageUrl = URL.createObjectURL(file)

    if (user) {
      const updatedUser = { ...user, profilePicture: imageUrl }
      setUser(updatedUser)
      localStorage.setItem("lifafa_user", JSON.stringify(updatedUser))
      return imageUrl
    }
    return null
  }

  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    // In a real app, you would validate the current password and update it
    return true
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout, updateProfile, updateProfilePicture, changePassword, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
