"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    company: "Johnson & Associates",
    text: "Lifafa transformed our business correspondence. The quality and attention to detail is exceptional.",
  },
  {
    name: "Michael Chen",
    company: "Tech Innovations",
    text: "Professional, reliable, and beautifully designed. Our clients are always impressed.",
  },
  {
    name: "Emily Rodriguez",
    company: "Creative Studio",
    text: "The customization options are endless. Perfect for our creative agency needs.",
  },
]

export function Testimonials() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <h2 className="text-4xl font-bold text-center mb-16">What Our Clients Say</h2>

        <div className="max-w-4xl mx-auto relative">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <p className="text-lg text-gray-700 mb-6 italic">"{testimonials[current].text}"</p>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">{testimonials[current].name}</h4>
                <p className="text-gray-600">{testimonials[current].company}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setCurrent((prev) => (prev + 1) % testimonials.length)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
