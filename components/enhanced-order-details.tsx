"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ButtonLoader } from "@/components/loading/button-loader"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import { Minus, Plus, ShoppingCart, CreditCard } from "lucide-react"

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

interface EnhancedOrderDetailsProps {
  template: Template
  copies: number
  onCopiesChange: (copies: number) => void
  customizations: Customizations
  onSaveToCart: () => void
}

export function EnhancedOrderDetails({
  template,
  copies,
  onCopiesChange,
  customizations,
  onSaveToCart,
}: EnhancedOrderDetailsProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isBuying, setIsBuying] = useState(false)
  const { user } = useAuth()
  const { addToCart } = useCart()

  const pricePerCopy = 1.2
  const totalPrice = copies * pricePerCopy

  // Bulk discount calculation
  const getDiscount = () => {
    if (copies >= 1000) return 0.25
    if (copies >= 500) return 0.15
    if (copies >= 100) return 0.05
    return 0
  }

  const discount = getDiscount()
  const discountAmount = totalPrice * discount
  const finalPrice = totalPrice - discountAmount

  const handleCopiesChange = (newCopies: number) => {
    onCopiesChange(Math.max(1, newCopies))
  }

  const handleAddToCart = async () => {
    if (!user) {
      onSaveToCart()
      return
    }

    setIsAddingToCart(true)

    const cartItem = {
      id: `${template.id}-${Date.now()}`,
      templateId: template.id,
      templateName: template.name,
      templateImage: template.image,
      copies,
      pricePerCopy,
      customizations,
    }

    addToCart(cartItem)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsAddingToCart(false)
  }

  const handleBuyNow = async () => {
    setIsBuying(true)
    // Simulate purchase process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    alert("Purchase successful! (This is a demo)")
    setIsBuying(false)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h3 className="text-xl font-semibold">Order Details</h3>
        <p className="text-sm text-gray-600 mt-1">Configure your order and pricing</p>
      </div>

      <div className="p-6">
        {/* Quantity Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-3">Number of Copies</label>
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => handleCopiesChange(copies - 1)}
                className="p-3 hover:bg-gray-50 transition-colors"
                disabled={copies <= 1}
              >
                <Minus size={16} />
              </button>
              <input
                type="number"
                value={copies}
                onChange={(e) => handleCopiesChange(Number.parseInt(e.target.value) || 1)}
                min="1"
                className="w-20 p-3 text-center border-0 focus:ring-0 focus:outline-none"
              />
              <button onClick={() => handleCopiesChange(copies + 1)} className="p-3 hover:bg-gray-50 transition-colors">
                <Plus size={16} />
              </button>
            </div>

            {/* Quick quantity buttons */}
            <div className="flex gap-2">
              {[50, 100, 250, 500].map((qty) => (
                <button
                  key={qty}
                  onClick={() => handleCopiesChange(qty)}
                  className={`px-3 py-1 text-sm rounded-md border transition-colors ${
                    copies === qty
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {qty}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing Breakdown */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>
                {copies} copies × ₹{pricePerCopy}
              </span>
              <span>₹{totalPrice.toFixed(0)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Bulk discount ({(discount * 100).toFixed(0)}% off)</span>
                <span>-₹{discountAmount.toFixed(0)}</span>
              </div>
            )}

            <div className="border-t border-gray-300 pt-2 mt-2">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-lg">₹{finalPrice.toFixed(0)}</span>
              </div>
            </div>
          </div>

          {/* Bulk discount info */}
          {copies < 100 && <div className="mt-3 text-xs text-gray-600">💡 Order 100+ copies to get 5% discount</div>}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleBuyNow}
            disabled={isBuying}
            className="w-full bg-black text-white hover:bg-gray-800 py-3 text-lg font-medium"
          >
            {isBuying ? (
              <>
                <ButtonLoader size="md" color="white" />
                <span className="ml-2">Processing...</span>
              </>
            ) : (
              <>
                <CreditCard className="mr-2" size={20} />
                Buy Now - ₹{finalPrice.toFixed(0)}
              </>
            )}
          </Button>

          {user ? (
            <Button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              variant="outline"
              className="w-full border-black text-black hover:bg-black hover:text-white py-3 text-lg font-medium"
            >
              {isAddingToCart ? (
                <>
                  <ButtonLoader size="md" color="black" />
                  <span className="ml-2">Adding to Cart...</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2" size={20} />
                  Add to Cart
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={onSaveToCart}
              variant="outline"
              className="w-full border-black text-black hover:bg-black hover:text-white py-3 text-lg font-medium"
            >
              <ShoppingCart className="mr-2" size={20} />
              Save to Cart (Login Required)
            </Button>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <strong>Delivery:</strong> 3-5 business days
            </div>
            <div>
              <strong>Express:</strong> 24-48 hours
            </div>
            <div>
              <strong>Paper:</strong> Premium 250gsm
            </div>
            <div>
              <strong>Finish:</strong> Matte coating
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
