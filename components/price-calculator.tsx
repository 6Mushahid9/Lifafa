"use client"

import { Button } from "@/components/ui/button"

interface PriceCalculatorProps {
  copies: number
  onCopiesChange: (copies: number) => void
}

export function PriceCalculator({ copies, onCopiesChange }: PriceCalculatorProps) {
  const pricePerCopy = 1.2
  const totalPrice = copies * pricePerCopy

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Order Details</h3>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <label className="text-sm font-medium">Number of Copies:</label>
        <input
          type="number"
          value={copies}
          onChange={(e) => onCopiesChange(Math.max(1, Number.parseInt(e.target.value) || 1))}
          min="1"
          className="w-24 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent"
        />
        <span className="text-lg font-semibold">= ₹{totalPrice.toFixed(0)}</span>
      </div>

      <div className="flex gap-4">
        <Button className="flex-1 bg-black text-white hover:bg-gray-800">Add to Cart</Button>
        <Button variant="outline" className="flex-1 border-black text-black hover:bg-black hover:text-white">
          Save for Later
        </Button>
      </div>
    </div>
  )
}
