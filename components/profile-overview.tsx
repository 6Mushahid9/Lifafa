"use client"

import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import { Calendar, Mail, Phone, MapPin, ShoppingBag, Package } from "lucide-react"

export function ProfileOverview() {
  const { user } = useAuth()
  const { getTotalItems } = useCart()

  if (!user) return null

  const memberSince = new Date(user.joinDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-4">Welcome back, {user.name}!</h2>
        <p className="text-gray-600">
          Thank you for being a valued member of Lifafa. Here's a quick overview of your account.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <ShoppingBag size={32} className="mx-auto mb-3 text-gray-600" />
          <h3 className="text-2xl font-bold">{getTotalItems()}</h3>
          <p className="text-gray-600">Items in Cart</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <Package size={32} className="mx-auto mb-3 text-gray-600" />
          <h3 className="text-2xl font-bold">12</h3>
          <p className="text-gray-600">Total Orders</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <Calendar size={32} className="mx-auto mb-3 text-gray-600" />
          <h3 className="text-2xl font-bold">2</h3>
          <p className="text-gray-600">Years Member</p>
        </div>
      </div>

      {/* Profile Information */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-6">Profile Information</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail size={20} className="text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={20} className="text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{user.phone || "Not provided"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Member Since</p>
                <p className="font-medium">{memberSince}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-gray-500 mt-1" />
              <div>
                <p className="text-sm text-gray-600">Address</p>
                {user.address ? (
                  <div className="font-medium">
                    <p>{user.address.street}</p>
                    <p>
                      {user.address.city}, {user.address.state} {user.address.zipCode}
                    </p>
                    <p>{user.address.country}</p>
                  </div>
                ) : (
                  <p className="font-medium text-gray-500">Not provided</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-6">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
              <Package size={20} />
            </div>
            <div className="flex-1">
              <p className="font-medium">Order #LF-2024-001 delivered</p>
              <p className="text-sm text-gray-600">Classic Formal envelopes - 100 copies</p>
            </div>
            <p className="text-sm text-gray-500">2 days ago</p>
          </div>
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
              <ShoppingBag size={20} />
            </div>
            <div className="flex-1">
              <p className="font-medium">Added Modern Minimal to cart</p>
              <p className="text-sm text-gray-600">250 copies with custom addressing</p>
            </div>
            <p className="text-sm text-gray-500">1 week ago</p>
          </div>
        </div>
      </div>
    </div>
  )
}
