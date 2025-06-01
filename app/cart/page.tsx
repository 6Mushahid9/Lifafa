"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  if (!user) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="container py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Please Login</h1>
          <p className="text-gray-600 mb-8">You need to be logged in to view your cart.</p>
          <Link href="/login">
            <Button className="bg-black text-white hover:bg-gray-800">Login</Button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="container py-20 text-center">
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-6" />
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Start browsing our templates to add items to your cart.</p>
          <Link href="/templates">
            <Button className="bg-black text-white hover:bg-gray-800">Browse Templates</Button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const handleCheckout = async () => {
    setIsCheckingOut(true)
    // Simulate checkout process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    alert("Checkout successful! (This is a demo)")
    clearCart()
    setIsCheckingOut(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <Button onClick={clearCart} variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
            <Trash2 size={16} className="mr-2" />
            Clear Cart
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex gap-6">
                  <Image
                    src={item.templateImage || "/placeholder.svg"}
                    alt={item.templateName}
                    width={120}
                    height={160}
                    className="object-cover rounded"
                  />

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{item.templateName}</h3>

                    <div className="text-sm text-gray-600 mb-4">
                      <p>
                        <strong>To:</strong> {item.customizations.recipientName}
                      </p>
                      <p>
                        <strong>From:</strong> {item.customizations.senderName}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.copies - 1))}
                          className="p-2 border border-gray-300 rounded hover:bg-gray-50"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-12 text-center font-medium">{item.copies}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.copies + 1)}
                          className="p-2 border border-gray-300 rounded hover:bg-gray-50"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-semibold">₹{(item.copies * item.pricePerCopy).toFixed(0)}</p>
                        <p className="text-sm text-gray-600">₹{item.pricePerCopy} per copy</p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{getTotalPrice().toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₹50</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{(getTotalPrice() * 0.18).toFixed(0)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>₹{(getTotalPrice() + 50 + getTotalPrice() * 0.18).toFixed(0)}</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-black text-white hover:bg-gray-800 py-3 text-lg font-medium"
              >
                {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
              </Button>

              <div className="mt-6 text-sm text-gray-600">
                <p className="mb-2">🚚 Free shipping on orders over ₹2000</p>
                <p className="mb-2">⚡ Express delivery available</p>
                <p>🔒 Secure payment processing</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
