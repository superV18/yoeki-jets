'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import BookingModal from '@/components/booking/BookingModal'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface HeroSectionProps {
  onBookingClick: () => void
}

export default function HeroSection({ onBookingClick }: HeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const windowContainerRef = useRef<HTMLDivElement>(null)
  const windowFrameRef = useRef<HTMLDivElement>(null)
  const windowShutterRef = useRef<HTMLDivElement>(null)
  const windowKnobRef = useRef<HTMLDivElement>(null)
  const cloudsRef = useRef<HTMLDivElement>(null)
  const logoTextRef = useRef<HTMLDivElement>(null)
  const leftTextRef = useRef<HTMLDivElement>(null)
  const rightTextRef = useRef<HTMLDivElement>(null)
  const bookButtonRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const [isWindowOpen, setIsWindowOpen] = useState(false)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 475)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  useEffect(() => {
    let mm = gsap.matchMedia()

    const ctx = gsap.context(() => {
      // Initial setup - hide everything
      gsap.set([leftTextRef.current, rightTextRef.current, logoTextRef.current, bookButtonRef.current, scrollIndicatorRef.current], {
        opacity: 0,
      })

      const hasWindowOpened = sessionStorage.getItem('windowOpened')

      if (!hasWindowOpened) {
        const openTl = gsap.timeline({
          delay: 0.5,
          onComplete: () => {
            sessionStorage.setItem('windowOpened', 'true')
            setIsWindowOpen(true)
          }
        })

        openTl.to(windowShutterRef.current, {
          y: '-100%',
          duration: 1.5,
          ease: 'power3.inOut',
        })
          .to(windowKnobRef.current, { opacity: 0, duration: 0.5 }, '-=1')
          .to([leftTextRef.current, rightTextRef.current, logoTextRef.current, bookButtonRef.current, scrollIndicatorRef.current], {
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
          }, '-=0.5')
      } else {
        setIsWindowOpen(true)
        gsap.set(windowShutterRef.current, { y: '-100%' })
        gsap.set(windowKnobRef.current, { opacity: 0 })
        gsap.set([leftTextRef.current, rightTextRef.current, logoTextRef.current, bookButtonRef.current, scrollIndicatorRef.current], {
          opacity: 1,
        })
      }

      gsap.to(cloudsRef.current, {
        x: '-25%',
        duration: 30,
        repeat: -1,
        ease: 'elastic.out(1,0.3)',
      })

      // === DESKTOP TIMELINE (Completely Untouched) ===
      mm.add("(min-width: 768px)", () => {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=200%',
            scrub: 1.5,
            pin: true,
          },
        })

        scrollTl.to(windowContainerRef.current, { scale: 3, duration: 0.3, ease: 'power2.in' }, 0)
          .to(windowFrameRef.current, { opacity: 0, duration: 0.2 }, 0.1)
          .to(leftTextRef.current, { x: -window.innerWidth * 0.4, opacity: 0, scale: 0.8, rotateY: -15, duration: 0.25, ease: 'power2.in' }, 0)
          .to(rightTextRef.current, { x: window.innerWidth * 0.4, opacity: 0, scale: 0.8, rotateY: 15, duration: 0.25, ease: 'power2.in' }, 0)
          .to(bookButtonRef.current, { y: 100, opacity: 0, scale: 0.7, duration: 0.2, ease: 'power2.in' }, 0)
          .to(scrollIndicatorRef.current, { y: 50, opacity: 0, duration: 0.2, ease: 'power2.in' }, 0)
          .to(windowContainerRef.current, { scale: 6, duration: 0.2, ease: 'power1.inOut' })
          .to(logoTextRef.current, { y: -window.innerHeight * 0.45, scale: 0.35, duration: 0.3, ease: 'power2.out' }, '-=0.1')
      })

      // === MOBILE TIMELINE (Rich & Dynamic) ===
      mm.add("(max-width: 767px)", () => {
        
        // 1. Ambient Breathing Animation for the Window Frame (Makes it feel alive)
        gsap.to(windowFrameRef.current, {
          scale: 1.05,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });

        // 2. Gentle Floating Animation for the Logo Text
        gsap.to(logoTextRef.current, {
          yPercent: -15, 
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });

        // 3. Mobile Scroll Timeline
        const scrollTlMobile = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=200%',
            scrub: 1.5,
            pin: true,
            invalidateOnRefresh: true, 
          },
        })

        // Adjusted zoom logic for the new 200vh container
        scrollTlMobile.to(windowContainerRef.current, { scale: 1.5, duration: 0.3, ease: 'power2.in' }, 0)
          .to(windowFrameRef.current, { opacity: 0, duration: 0.2 }, 0.1)
          .to(leftTextRef.current, { y: -100, opacity: 0, scale: 0.9, duration: 0.25, ease: 'power2.in' }, 0)
          .to(bookButtonRef.current, { y: 100, opacity: 0, scale: 0.8, duration: 0.2, ease: 'power2.in' }, 0)
          .to(scrollIndicatorRef.current, { y: 50, opacity: 0, duration: 0.2, ease: 'power2.in' }, 0)
          .to(windowContainerRef.current, { scale: 3.2, duration: 0.2, ease: 'power1.inOut' })
          .to(logoTextRef.current, { y: () => -window.innerHeight * 0.35, scale: 0.5, duration: 0.3, ease: 'power2.out' }, '-=0.1')
      })

    }, sectionRef)

    return () => {
      ctx.revert()
      mm.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-gray-800 via-gray-900 to-black"
    >
      {/* MOBILE GAP FIX: Container is forced to be 200vh (200% screen height) on mobile (`max-md:w-[200vh] max-md:h-[200vh]`). 
        This guarantees the image stretches tall enough to completely cover any phone aspect ratio, killing top/bottom gaps.
      */}
      <div
        ref={windowContainerRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-md:w-[200vh] max-md:h-[200vh] md:w-[650px] md:h-[650px] lg:w-full lg:h-full lg:max-w-none"
      >
        {/* Layer 1: Outer frame */}
        <div ref={windowFrameRef} className="absolute inset-0 z-10 will-change-transform">
          <Image
            src="/window-frame.webp"
            alt="Outer window frame"
            fill
            className="pointer-events-none object-contain"
            priority
          />
        </div>

        {/* Layers 2,3,4,5 are hidden on mobile to stop ugly overlapping shapes, but kept exactly as is for web */}
        <div className="hidden md:block absolute inset-0 z-20" style={{ transform: 'scale(1.2)' }}>
          <Image src="/window-frame.webp" alt="Middle window frame" fill className="pointer-events-none object-contain opacity-80" priority />
        </div>
        <div className="hidden md:block absolute inset-0 z-30" style={{ transform: 'scale(1.1)' }}>
          <Image src="/window-frame.webp" alt="Inner window frame" fill className="pointer-events-none object-contain opacity-60" priority />
        </div>
        <div className="hidden md:block absolute inset-0 z-50 -top-[350px] left-2" style={{ transform: 'scale(0.10)' }}>
          <Image src="/window-frame3.webp" alt="Inner window frame" fill className="pointer-events-none object-contain opacity-60" priority />
        </div>
        <div className="hidden md:block absolute inset-0 z-30" style={{ transform: 'scale(1.3)' }}>
          <Image src="/window-frame2.webp" alt="Inner window frame" fill className="pointer-events-none object-contain opacity-60" priority />
        </div>

        {/* Moving clouds */}
        <div className="absolute inset-0 z-5 overflow-hidden" style={{ clipPath: 'ellipse(38% 41% at 50% 50%)' }}>
          <div
            ref={cloudsRef}
            className="absolute inset-0 w-[200%] h-full"
            style={{
              backgroundImage: "url('/cloud.webp')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>

        {/* Window shutter */}
        <div
          ref={windowShutterRef}
          className="absolute inset-0 z-15 overflow-hidden"
          style={{ clipPath: 'ellipse(38% 41% at 50% 50%)' }}
        >
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: "url('/window-frame2.webp')",
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
            }}
          />
        </div>

        <div
          ref={windowKnobRef}
          className="absolute top-[12%] left-1/2 -translate-x-1/2 z-40 w-[20%] max-md:w-[4%] h-auto"
        >
          <Image
            src="/window-knob-2.webp"
            alt="Window knob"
            width={150}
            height={150}
            className="w-full h-auto drop-shadow-2xl"
            priority
          />
        </div>

        {/* Yoeki Jets text */}
        <div
          ref={logoTextRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-25 w-full flex justify-center will-change-transform"
        >
          <h2
            className="text-4xl md:text-2xl lg:text-3xl font-light text-white tracking-[0.15em] sm:tracking-[0.25em] md:tracking-[0.35em] whitespace-nowrap"
            style={{
              textShadow: '0 4px 30px rgba(255,255,255,0.6), 0 2px 10px rgba(0,0,0,0.5)',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontWeight: 600,
            }}
          >
            Yoeki Jets
          </h2>
        </div>
      </div>

      {/* Left side text - Cleanly centered on mobile */}
      <div
        ref={leftTextRef}
        className="absolute left-0 w-full px-4 max-md:top-[12%] text-center md:text-left md:left-8 lg:left-12 md:top-1/2 md:-translate-y-1/2 z-10 md:w-auto md:max-w-md lg:max-w-lg"
        style={{ perspective: '1000px' }}
      >
        <h1
          className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-white mb-2 sm:mb-6 md:mb-10 leading-tight mx-auto"
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 700 }}
        >
          We are<br className="max-md:hidden" /> movement
        </h1>
        <div className="space-y-2 sm:space-y-4 md:space-y-6 hidden sm:block">
          <h3 className="text-sm sm:text-base md:text-2xl lg:text-3xl text-white font-light leading-snug">
            Your<br />freedom to<br />enjoy life
          </h3>
          <div className="w-8 sm:w-10 md:w-14 lg:w-16 h-px bg-white/60 md:mx-0 mx-auto" />
          <p className="text-[10px] sm:text-sm md:text-base lg:text-lg text-white/85 leading-relaxed max-w-md md:mx-0 mx-auto">
            Every flight is designed around your comfort, time, and ambitions — so you can focus on what truly matters, while we take care of everything else.
          </p>
        </div>
      </div>

      {/* Right side text - Hidden on mobile to keep layout premium and uncrowded */}
      <div
        ref={rightTextRef}
        style={{ perspective: '1000px' }}
        className="hidden md:block absolute right-4 sm:right-6 md:right-8 lg:right-12 top-[10%] sm:top-[15%] md:top-1/2 md:-translate-y-1/2 z-10 md:w-auto md:max-w-md"
      >
        <h1
          className="text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-white text-right leading-tight"
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 700 }}
        >
          We are<br />distinction
        </h1>
      </div>

      {/* Book the Flight button */}
      <div
        ref={bookButtonRef}
        className="absolute max-md:bottom-[15%] md:bottom-24 left-1/2 -translate-x-1/2 z-10 max-md:w-[85%] md:w-max"
      >
        <style jsx>{`
          @keyframes textSlideUp {
            0% { transform: translateY(0); opacity: 1; }
            50% { transform: translateY(-100%); opacity: 0; }
            51% { transform: translateY(100%); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          @keyframes planeFly {
            0% { transform: translate(0, 0) rotate(-45deg) scale(1); }
            30% { transform: translate(20px, -20px) rotate(-35deg) scale(1.2); }
            60% { transform: translate(60px, -35px) rotate(-30deg) scale(1.5); }
            100% { transform: translate(0, 0) rotate(-45deg) scale(1); }
          }
          .text-container { position: relative; display: inline-block; overflow: hidden; }
          .group:hover .text-animate { animation: textSlideUp 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
          .group:hover .plane-animate { animation: planeFly 0.8s cubic-bezier(0.34, 1.56, 0.64, 1); }
          .button-glow { position: relative; overflow: hidden; }
          .button-glow::before {
            content: ''; position: absolute; top: 50%; left: 50%; width: 0; height: 0;
            border-radius: 50%; background: rgba(255, 255, 255, 0.5);
            transform: translate(-50%, -50%); transition: width 0.6s, height 0.6s;
          }
          .group:hover .button-glow::before { width: 300px; height: 300px; }
        `}</style>
        <button 
          onClick={onBookingClick}
          className="group relative bg-white text-gray-900 w-full md:w-auto justify-center px-6 py-4 sm:px-8 sm:py-3.5 md:px-10 md:py-4 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition-all duration-500 hover:shadow-2xl text-[15px] sm:text-base md:text-lg shadow-xl active:scale-95 flex items-center gap-3 sm:gap-3 md:gap-4 overflow-hidden"
        >
          <div className="button-glow absolute inset-0 rounded-full pointer-events-none"></div>
          <span className="text-container relative z-10">
            <span className="text-animate inline-block whitespace-nowrap">Book the Flight</span>
          </span>
          <div className="plane-animate relative w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 z-10" style={{ transform: 'rotate(-45deg)' }}>
            <Image 
              src="/aeroplane-black.svg" 
              alt="Plane" 
              fill
              className="object-contain group-hover:brightness-0 group-hover:invert transition-all duration-500" 
            />
          </div>
        </button>
      </div>

      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-6 sm:bottom-6 right-4 sm:right-6 md:bottom-10 md:right-16 lg:bottom-12 lg:right-20 z-10 flex flex-col items-end gap-1 sm:gap-2"
      >
        <div className="flex items-center gap-2 md:gap-3 text-white text-[10px] sm:text-xs md:text-sm">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="animate-bounce w-4 h-4 md:w-5 md:h-5">
            <path d="M8 2L8 14M8 14L12 10M8 14L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-light tracking-[0.15em] sm:tracking-[0.2em] hidden sm:inline">SCROLL DOWN</span>
          <span className="font-light tracking-[0.1em] sm:tracking-[0.15em] sm:hidden">SCROLL</span>
        </div>
        <div className="w-full h-px bg-white/40" />
        <span className="text-white/70 text-[8px] sm:text-[10px] md:text-xs tracking-[0.1em] sm:tracking-[0.15em] hidden sm:inline">TO START THE JOURNEY</span>
      </div>
    </section>
  )
}