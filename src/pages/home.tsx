import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Preloader } from '@/components/preloader'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Hero } from '@/components/sections/hero'
import { WhyChooseUs } from '@/components/sections/why-choose-us'
import { About } from '@/components/sections/about'
import { Process } from '@/components/sections/process'
import { Services } from '@/components/sections/services'
import { Trust } from '@/components/sections/trust'
import { Testimonials } from '@/components/sections/testimonials'
import { Faq } from '@/components/sections/faq'
import { Consultation } from '@/components/sections/consultation'
import { FloatingContact } from '@/components/FloatingContact'
import { FloatingValuation } from '@/components/FloatingValuation'

export function HomePage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
    const id = window.setTimeout(() => setLoading(false), 2400)
    return () => {
      window.clearTimeout(id)
      document.body.style.overflow = ''
    }
  }, [loading])

  return (
    <>
      <AnimatePresence mode="wait">{loading && <Preloader />}</AnimatePresence>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <WhyChooseUs />
        <About />
        <Process />
        <Services />
        <Trust />
        <Testimonials />
        <Faq />
        <Consultation />
      </main>
      <FloatingContact />
      <FloatingValuation />
      <Footer />
    </>
  )
}

export default HomePage
