'use client'

import { useEffect, useState } from 'react'
import PreLoader from '@/components/PreLoader'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/hero/HeroSection'
import AboutSection from '@/components/about/AboutSection'
import FleetSection from '@/components/fleet/FleetSection'
import AdvantagesSection from '@/components/advantages/AdvantagesSection'
import GlobalSection from '@/components/global/GlobalSection'
import BookingButton from '@/components/booking/BookingButton'
import BookingModal from '@/components/booking/BookingModal'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const openBookingModal = () => setIsBookingOpen(true)

  useEffect(() => {
    // Check if preloader has been shown before
    const hasSeenPreloader = sessionStorage.getItem('hasSeenPreloader')
    
    if (!hasSeenPreloader) {
      sessionStorage.setItem('hasSeenPreloader', 'true')
      const timer = setTimeout(() => {
        setLoading(false)
      }, 2200)
      return () => clearTimeout(timer)
    } else {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return <PreLoader onComplete={() => setLoading(false)} />
  }

  return (
    <main className="relative">
      <Navigation />
      <HeroSection onBookingClick={openBookingModal} />
      <AboutSection />
      <FleetSection onBookingClick={openBookingModal} />
      <AdvantagesSection />
      <GlobalSection onBookingClick={openBookingModal} />
      <BookingButton onClick={openBookingModal} />
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
    </main>
  )
}