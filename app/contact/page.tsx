"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bestTime: "",
    contactMethod: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission here
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="flex min-h-[80vh]">
        {/* Left Section - Dark */}
        <div className="flex-1 bg-black text-white p-12 lg:p-16 flex flex-col justify-center">
          <div className="max-w-lg">
            <p className="text-sm font-medium tracking-wider uppercase mb-6 text-gray-300">CONTACT US</p>

            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Create impressions that matter, with Lifafa
            </h1>

            <p className="text-lg text-gray-300 mb-8">
              Send us a message and we'll get your questions answered as soon as possible.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone size={20} />
                <span className="text-lg">+91 98765 43210</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={20} />
                <span className="text-lg">hello@lifafa.com</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={20} />
                <span className="text-lg">Mumbai, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Light */}
        <div className="flex-1 bg-gray-50 p-12 lg:p-16 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="max-w-lg w-full">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First name*
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent bg-white"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last name*
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent bg-white"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email address*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent bg-white"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone number*
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent bg-white"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="bestTime" className="block text-sm font-medium text-gray-700 mb-2">
                Best time to contact you?
              </label>
              <select
                id="bestTime"
                name="bestTime"
                value={formData.bestTime}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent bg-white"
              >
                <option value="">Select a time</option>
                <option value="morning">Morning (9 AM - 12 PM)</option>
                <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                <option value="evening">Evening (5 PM - 8 PM)</option>
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="contactMethod" className="block text-sm font-medium text-gray-700 mb-2">
                What's your preferred method of contact?
              </label>
              <select
                id="contactMethod"
                name="contactMethod"
                value={formData.contactMethod}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent bg-white"
              >
                <option value="">Select method</option>
                <option value="phone">Phone</option>
                <option value="email">Email</option>
                <option value="whatsapp">WhatsApp</option>
              </select>
            </div>

            <div className="mb-8">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Do you have any additional information?
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent bg-white"
                placeholder="Tell us about your project requirements..."
              />
            </div>

            <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800 py-3 text-lg font-medium">
              Submit your message
            </Button>

            <p className="text-xs text-gray-500 mt-4">
              By submitting this form, you agree to our privacy policy and terms of service. We respect your privacy and
              will never share your information.
            </p>
          </form>
        </div>
      </div>

      {/* Additional Contact Information */}
      <div className="bg-white py-16">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-4">General Inquiries</h3>
              <p className="text-gray-600 mb-2">
                Reach us at{" "}
                <a href="mailto:hello@lifafa.com" className="text-black hover:underline">
                  hello@lifafa.com
                </a>
              </p>
              <p className="text-gray-600">and we will get back to you asap.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Working at Lifafa?</h3>
              <p className="text-gray-600 mb-2">
                Visit our careers page or send us an email at{" "}
                <a href="mailto:careers@lifafa.com" className="text-black hover:underline">
                  careers@lifafa.com
                </a>
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Business Partnerships</h3>
              <p className="text-gray-600 mb-2">
                Become a business partner by contacting us at{" "}
                <a href="mailto:partners@lifafa.com" className="text-black hover:underline">
                  partners@lifafa.com
                </a>
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Follow us</span>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800"
                >
                  <span className="text-sm font-bold">f</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800"
                >
                  <span className="text-sm font-bold">in</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800"
                >
                  <span className="text-sm font-bold">@</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
