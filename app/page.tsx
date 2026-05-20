'use client'
import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Statement from '@/components/Statement'
import Services from '@/components/Services'
import Quote from '@/components/Quote'
import Process from '@/components/Process'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  // Parallax suave en la esfera del hero
  useEffect(() => {
    const handleScroll = () => {
      const visual = document.querySelector('.hero-visual') as HTMLElement
      if (visual) visual.style.transform = `translateY(${window.scrollY * 0.07}px)`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main style={{ background: 'var(--black)', minHeight: '100vh' }}>
      <Navbar />
      <Hero />
      <Statement />
      <Services />
      <Quote />
      <Process />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
