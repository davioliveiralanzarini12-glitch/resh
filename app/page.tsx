import { AboutSection } from '../components/AboutSection'
import { ContactSection } from '../components/ContactSection'
import { ExperienceSection } from '../components/ExperienceSection'
import { Footer } from '../components/Footer'
import { GallerySection } from '../components/GallerySection'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { ReviewsSection } from '../components/ReviewsSection'
import { ServicesSection } from '../components/ServicesSection'

export default function HomePage() {
  return (
    <main className="relative overflow-hidden bg-[#050505] text-white">
      <Header />
      <div className="pt-24">
        <Hero />
        <ExperienceSection />
        <AboutSection />
        <ServicesSection />
        <GallerySection />
        <ReviewsSection />
        <ContactSection />
      </div>
      <Footer />
    </main>
  )
}
