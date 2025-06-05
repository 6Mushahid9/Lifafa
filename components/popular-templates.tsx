import Image from "next/image"
import { Button } from "@/components/ui/button"
import { TransitionLink } from "@/components/transitions/transition-link"

const templates = [
  { id: 1, name: "Classic Formal", image: "/one.jpeg?height=300&width=200" },
  { id: 2, name: "Modern Minimal", image: "/two.jpeg?height=300&width=200" },
  { id: 3, name: "Elegant Border", image: "/three.jpeg?height=300&width=200" },
  { id: 4, name: "Corporate Style", image: "/four.jpeg?height=300&width=200" },
  { id: 5, name: "Vintage Design", image: "/five.jpeg?height=300&width=200" },
  { id: 6, name: "Contemporary", image: "/six.jpeg?height=300&width=200" },
]

export function PopularTemplates() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <h2 className="text-4xl font-bold text-center mb-16">Most Popular Templates</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {templates.map((template) => (
            <div key={template.id} className="group cursor-pointer">
              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <Image
                  src={template.image || "/placeholder.svg"}
                  alt={template.name}
                  width={200}
                  height={300}
                  className="w-full h-48 object-cover rounded mb-3"
                />
                <h3 className="text-sm font-medium text-center">{template.name}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <TransitionLink href="/templates">
            <Button variant="outline" size="lg" className="border-black text-black hover:bg-black hover:text-white">
              See All Templates
            </Button>
          </TransitionLink>
        </div>
      </div>
    </section>
  )
}
