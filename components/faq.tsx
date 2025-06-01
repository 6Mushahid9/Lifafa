"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "What types of envelope templates do you offer?",
    answer:
      "We offer over 200 premium envelope templates across various categories including Business & Corporate, Wedding & Events, Personal Correspondence, Holiday & Seasonal, and Custom Artistic designs. Each template is professionally designed and can be customized to match your specific needs.",
  },
  {
    question: "Can I customize the templates with my own text and logos?",
    answer:
      "Our online customization platform allows you to add your own text, logos, addresses, and even adjust colors within our design framework. You can preview your changes in real-time before placing your order.",
  },
  {
    question: "What paper quality and sizes do you offer?",
    answer:
      "We use premium quality paper ranging from 120gsm to 300gsm, including options like textured, linen, and recycled papers. We offer standard sizes (A4, A5, DL) as well as custom dimensions. All our papers are sourced from certified sustainable suppliers.",
  },
  {
    question: "What is your minimum order quantity?",
    answer:
      "Our minimum order is just 25 envelopes, making our services accessible for both small personal projects and large corporate orders. We offer competitive pricing tiers based on quantity, with better rates for larger orders.",
  },
  {
    question: "How long does printing and delivery take?",
    answer:
      "Standard orders are processed within 3-5 business days, with delivery taking an additional 2-3 days within major cities. We also offer express printing (24-48 hours) and same-day delivery in Mumbai, Delhi, and Bangalore for urgent requirements.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Currently, we serve customers across India. For international orders, please contact our team directly at hello@lifafa.com, and we'll work out a custom solution for your requirements.",
  },
  {
    question: "Can you create completely custom designs?",
    answer:
      "Yes! Our design team can create completely bespoke envelope designs tailored to your brand or event. Custom design projects typically take 7-10 business days and include multiple revision rounds to ensure perfection.",
  },
  {
    question: "What file formats do you accept for logos and artwork?",
    answer:
      "We accept high-resolution files in PNG, JPG, PDF, AI, and EPS formats. For best results, we recommend vector files (AI, EPS) or high-resolution images (300 DPI minimum). Our team can also help optimize your artwork if needed.",
  },
  {
    question: "Do you offer bulk discounts for large orders?",
    answer:
      "Yes, we offer tiered pricing with significant discounts for bulk orders. Orders over 500 pieces receive a 15% discount, over 1000 pieces get 25% off, and orders over 5000 pieces qualify for our corporate pricing with up to 35% savings.",
  },
  {
    question: "What is your return and refund policy?",
    answer:
      "We stand behind our quality. If you're not satisfied with your order due to printing defects or errors on our part, we'll reprint your order at no cost. For custom orders, we provide digital proofs for approval before printing to ensure satisfaction.",
  },
  {
    question: "Do you offer design consultation services?",
    answer:
      "Yes! Our design experts offer free consultation calls to help you choose the right template and customization options. For complex projects, we also provide premium design consultation services with dedicated account management.",
  },
  {
    question: "Can I see a physical sample before placing a large order?",
    answer:
      "We can send you physical samples of paper quality and printing for a nominal fee (₹200), which is fully refundable on orders over ₹5000. This helps ensure you're completely satisfied with the quality before committing to a large order.",
  },
]

export function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]))
  }

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 mb-16 text-center">
            Everything you need to know about our envelope design and printing services
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center"
                >
                  <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                  {openItems.includes(index) ? (
                    <ChevronUp size={20} className="text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-500 flex-shrink-0" />
                  )}
                </button>

                {openItems.includes(index) && (
                  <div className="px-6 pb-5 bg-gray-50">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center p-8 bg-gray-50 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Still have questions?</h3>
            <p className="text-gray-600 mb-6">
              Our customer service team is here to help you with any specific questions about your project.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium"
              >
                Contact Us
              </a>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center justify-center px-6 py-3 border border-black text-black rounded-lg hover:bg-black hover:text-white transition-colors duration-200 font-medium"
              >
                Call +91 98765 43210
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
