import { Button } from "@/components/ui/button"
import { TransitionLink } from "@/components/transitions/transition-link"

export function Hero() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container">
        <div className="text-center">
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6">Lifafa</h1>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            Because First Impressions Matter
          </p>
          <TransitionLink href="/templates">
            <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg font-medium">
              Explore Templates
            </Button>
          </TransitionLink>
        </div>
      </div>
    </section>
  )
}
