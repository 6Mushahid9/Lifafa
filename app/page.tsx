import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { PopularTemplates } from "@/components/popular-templates"
import { Facilities } from "@/components/facilities"
import { Testimonials } from "@/components/testimonials"
import { Footer } from "@/components/footer"
import { PageWrapper } from "@/components/transitions/page-wrapper"
import { FadeInSection } from "@/components/transitions/fade-in-section"

export default function HomePage() {
  return (
    <PageWrapper className="min-h-screen">
      <Navigation />
      <FadeInSection>
        <Hero />
      </FadeInSection>
      <FadeInSection delay={200}>
        <PopularTemplates />
      </FadeInSection>
      <FadeInSection delay={400}>
        <Facilities />
      </FadeInSection>
      <FadeInSection delay={600}>
        <Testimonials />
      </FadeInSection>
      <FadeInSection delay={800}>
        <Footer />
      </FadeInSection>
    </PageWrapper>
  )
}
