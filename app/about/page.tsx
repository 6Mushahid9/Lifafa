import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { FAQ } from "@/components/faq"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-black text-white py-20 lg:py-32">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 tracking-tight">Our Story</h1>
            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed">
              Founded on the belief that first impressions deserve extraordinary attention, Lifafa has been crafting
              premium envelope designs since 2015.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                At Lifafa, we believe that the vessel carrying your message should be as thoughtfully crafted as the
                message itself. Our mission is to elevate the art of correspondence through meticulously designed
                envelopes that make lasting impressions.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                We combine traditional craftsmanship with modern design sensibilities to create envelope templates that
                stand out in an increasingly digital world.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Whether for corporate communication, special occasions, or personal correspondence, our designs ensure
                your message arrives with distinction.
              </p>
            </div>
            <div className="relative h-[500px] bg-gray-100">
              <Image
                src="/seven.jpeg?height=500&width=600"
                alt="Lifafa design process"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl font-bold mb-16 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-black text-white rounded-full mb-6 text-3xl font-bold">
                1
              </div>
              <h3 className="text-2xl font-semibold mb-4">Craftsmanship</h3>
              <p className="text-gray-700">
                We believe in attention to detail and quality materials. Every template is meticulously designed to
                ensure perfection.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-black text-white rounded-full mb-6 text-3xl font-bold">
                2
              </div>
              <h3 className="text-2xl font-semibold mb-4">Innovation</h3>
              <p className="text-gray-700">
                We continuously explore new design techniques and materials to create envelope solutions that are both
                timeless and contemporary.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-black text-white rounded-full mb-6 text-3xl font-bold">
                3
              </div>
              <h3 className="text-2xl font-semibold mb-4">Sustainability</h3>
              <p className="text-gray-700">
                We are committed to environmentally responsible practices, using recycled materials and eco-friendly
                printing processes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="text-4xl font-bold mb-16 text-center">Meet Our Team</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                name: "Mushahid Khisal Ansari",
                role: "Founder & Creative Director",
                image: "/mush.png?height=300&width=300",
              },
              {
                name: "Mushahid Boss",
                role: "Head of Design",
                image: "/rabbit.png?height=300&width=300",
              },
              {
                name: "Shamikh",
                role: "Production Manager",
                image: "/shamikh.png?height=300&width=300",
              },
              {
                name: "Da Vinci",
                role: "Client Relations",
                image: "/vinci.png?height=300&width=300",
              },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative h-64 mb-6 bg-gray-100">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl font-bold mb-16 text-center">Our Journey</h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-16">
              <div className="flex">
                <div className="mr-8">
                  <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold">
                    2015
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">The Beginning</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Lifafa was founded in Mumbai with a simple mission: to revive the art of elegant correspondence in
                    the digital age. Starting with just five template designs, we began serving local businesses.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="mr-8">
                  <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold">
                    2018
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Expansion</h3>
                  <p className="text-gray-700 leading-relaxed">
                    After gaining recognition for our distinctive designs, we expanded our operations nationwide and
                    introduced our online customization platform, making premium envelope design accessible to all.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="mr-8">
                  <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold">
                    2021
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Innovation</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We launched our sustainable materials initiative and introduced our signature collection, featuring
                    collaborations with renowned artists and designers from across India.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="mr-8">
                  <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold">
                    Today
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Present Day</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Today, Lifafa serves thousands of clients across the country, from individual professionals to
                    Fortune 500 companies. Our library includes over 200 premium templates and a state-of-the-art
                    customization platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to make an impression?</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Explore our collection of premium envelope templates or create your own custom design.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg font-medium">
              Explore Templates
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-black hover:bg-gray-200 px-8 py-6 text-lg font-medium"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
