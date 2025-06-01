import { Truck, Award, Settings } from "lucide-react"

const facilities = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick turnaround times for all your printing needs",
  },
  {
    icon: Award,
    title: "Premium Print",
    description: "High-quality materials and professional finishing",
  },
  {
    icon: Settings,
    title: "Easy Customization",
    description: "Simple tools to personalize your envelope designs",
  },
]

export function Facilities() {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-12">
          {facilities.map((facility, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
                <facility.icon size={32} className="text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{facility.title}</h3>
              <p className="text-gray-600">{facility.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
