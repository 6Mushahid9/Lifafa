"use client"

import { useState } from "react"
import Image from "next/image"
import { Package, Eye, Download, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Order {
  id: string
  date: string
  status: "delivered" | "processing" | "shipped" | "cancelled"
  total: number
  items: {
    templateName: string
    templateImage: string
    copies: number
    price: number
  }[]
}

const mockOrders: Order[] = [
  {
    id: "LF-2024-001",
    date: "2024-05-15",
    status: "delivered",
    total: 1250,
    items: [
      {
        templateName: "Classic Formal",
        templateImage: "/placeholder.svg?height=150&width=100",
        copies: 100,
        price: 120,
      },
      {
        templateName: "Modern Minimal",
        templateImage: "/placeholder.svg?height=150&width=100",
        copies: 250,
        price: 300,
      },
    ],
  },
  {
    id: "LF-2024-002",
    date: "2024-05-20",
    status: "processing",
    total: 850,
    items: [
      {
        templateName: "Elegant Border",
        templateImage: "/placeholder.svg?height=150&width=100",
        copies: 500,
        price: 600,
      },
    ],
  },
  {
    id: "LF-2024-003",
    date: "2024-05-25",
    status: "shipped",
    total: 450,
    items: [
      {
        templateName: "Corporate Style",
        templateImage: "/placeholder.svg?height=150&width=100",
        copies: 200,
        price: 240,
      },
    ],
  },
]

export function OrderHistory() {
  const [orders] = useState<Order[]>(mockOrders)

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "Delivered"
      case "shipped":
        return "Shipped"
      case "processing":
        return "Processing"
      case "cancelled":
        return "Cancelled"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Package size={24} />
        <h2 className="text-2xl font-bold">Order History</h2>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <Package size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Orders Yet</h3>
          <p className="text-gray-600 mb-6">You haven't placed any orders yet. Start browsing our templates!</p>
          <Button className="bg-black text-white hover:bg-gray-800">Browse Templates</Button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Order {order.id}</h3>
                  <p className="text-gray-600">
                    Placed on{" "}
                    {new Date(order.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
                  >
                    {getStatusText(order.status)}
                  </span>
                  <p className="text-lg font-semibold mt-1">₹{order.total}</p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <Image
                      src={item.templateImage || "/placeholder.svg"}
                      alt={item.templateName}
                      width={60}
                      height={80}
                      className="object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.templateName}</h4>
                      <p className="text-sm text-gray-600">{item.copies} copies</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Eye size={16} />
                  View Details
                </Button>
                {order.status === "delivered" && (
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Download size={16} />
                    Download Invoice
                  </Button>
                )}
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <RefreshCw size={16} />
                  Reorder
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
