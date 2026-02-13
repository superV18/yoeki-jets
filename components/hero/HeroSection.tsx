'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import BookingModal from '@/components/booking/BookingModal'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function HeroSection() {
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

  const screenSize = typeof window !== 'undefined' ? window.innerWidth : 475
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup - hide everything
      gsap.set([leftTextRef.current, rightTextRef.current, logoTextRef.current, bookButtonRef.current, scrollIndicatorRef.current], {
        opacity: 0,
      })

      // Check if window animation has played
      const hasWindowOpened = sessionStorage.getItem('windowOpened')

      if (!hasWindowOpened) {
        // Window opening animation sequence
        const openTl = gsap.timeline({
          delay: 0.5,
          onComplete: () => {
            sessionStorage.setItem('windowOpened', 'true')
            setIsWindowOpen(true)
          }
        })

        // Shutter slides up
        openTl.to(windowShutterRef.current, {
          y: '-100%',
          duration: 1.5,
          ease: 'power3.inOut',
        })
          // Knob fades out with shutter
          .to(windowKnobRef.current, {
            opacity: 0,
            duration: 0.5,
          }, '-=1')
          // Fade in content after window opens
          .to([leftTextRef.current, rightTextRef.current, logoTextRef.current, bookButtonRef.current, scrollIndicatorRef.current], {
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
          }, '-=0.5')
      } else {
        // Skip window animation, show content immediately
        setIsWindowOpen(true)
        gsap.set(windowShutterRef.current, { y: '-100%' })
        gsap.set(windowKnobRef.current, { opacity: 0 })
        gsap.set([leftTextRef.current, rightTextRef.current, logoTextRef.current, bookButtonRef.current, scrollIndicatorRef.current], {
          opacity: 1,
        })
      }

      // Continuous clouds moving animation
      gsap.to(cloudsRef.current, {
        x: '-25%',
        duration: 30,
        repeat: -1,
        ease: 'elastic.out(1,0.3)',
      })

      // Scroll-triggered zoom animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200%',
          scrub: 1.5,
          pin: true,
        },
      })

      // Phase 1: Initial zoom into window (0-40%)
      scrollTl.to(windowContainerRef.current, {
        scale: 3,
        duration: 0.3,
        ease: 'power2.in',
      })
        // Fade out window frame
        .to(
          windowFrameRef.current,
          {
            opacity: 0,
            duration: 0.2,
          },
          0.1
        )
        // Left text flows OUT to the left with scale and rotation
        .to(
          leftTextRef.current,
          {
            x: -window.innerWidth * 0.4,
            opacity: 0,
            scale: 0.8,
            rotateY: -15,
            duration: 0.25,
            ease: 'power2.in',
          },
          0
        )
        // Right text flows OUT to the right with scale and rotation
        .to(
          rightTextRef.current,
          {
            x: window.innerWidth * 0.4,
            opacity: 0,
            scale: 0.8,
            rotateY: 15,
            duration: 0.25,
            ease: 'power2.in',
          },
          0
        )
        // Book button scales down and fades
        .to(
          bookButtonRef.current,
          {
            y: 100,
            opacity: 0,
            scale: 0.7,
            duration: 0.2,
            ease: 'power2.in',
          },
          0
        )
        // Scroll indicator fades and moves down
        .to(
          scrollIndicatorRef.current,
          {
            y: 50,
            opacity: 0,
            duration: 0.2,
            ease: 'power2.in',
          },
          0
        )

        // Phase 2: Massive zoom to fill screen (40-70%)
        .to(
          windowContainerRef.current,
          {
            scale: 6,
            duration: 0.2,
            ease: 'power1.inOut',
          }
        )

        // Phase 3: Logo moves to navbar (60-100%)
        .to(
          logoTextRef.current,
          {
            y: -window.innerHeight * 0.45,
            scale: 0.35,
            duration: 0.3,
            ease: 'power2.out',
          },
          '-=0.1'
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-gray-800 via-gray-900 to-black"
    >
      {/* Airplane window container */}
      <div
        ref={windowContainerRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] h-[95vw] sm:w-[75vw] sm:h-[75vw] md:w-[650px] md:h-[650px] lg:w-full lg:h-full"
      >
        {/* Layer 1: Outer frame - Base layer */}
        <div className="absolute inset-0 z-10">
          <Image
            src="/window-frame.webp"
            alt="Outer window frame"
            fill
            className="pointer-events-none object-contain"
            priority
          />
        </div>

        {/* Layer 2: Middle frame - Creates depth */}
        <div className="absolute inset-0 z-20" style={{ transform: 'scale(1.2)' }}>
          <Image
            src="/window-frame.webp"
            alt="Middle window frame"
            fill
            className="pointer-events-none object-contain opacity-80"
            priority
          />
        </div>

        {/* Layer 3: Inner frame - Closest to glass */}
        <div className="absolute inset-0 z-30" style={{ transform: 'scale(1.1)' }}>
          <Image
            src="/window-frame.webp"
            alt="Inner window frame"
            fill
            className="pointer-events-none object-contain opacity-60"
            priority
          />
        </div>
        <div className="absolute inset-0 z-50 -top-[350px] left-2" style={{ transform: 'scale(0.10)' }}>
          <Image
            src="/window-frame3.webp"
            alt="Inner window frame"
            fill
            className="pointer-events-none object-contain opacity-60"
            priority
          />
        </div>
        <div className="absolute inset-0 z-30" style={{ transform: 'scale(1.3)' }}>
          <Image
            src="/window-frame2.webp"
            alt="Inner window frame"
            fill
            className="pointer-events-none object-contain opacity-60"
            priority
          />
        </div>

        {/* Moving clouds background - inside window */}
        <div className="absolute inset-0 z-5 overflow-hidden" style={{
          clipPath: 'ellipse(38% 41% at 50% 50%)'
        }}>
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

        {/* Window shutter - slides up to reveal clouds */}
        <div
          ref={windowShutterRef}
          className="absolute inset-0 z-15 overflow-hidden"
          style={{
            clipPath: 'ellipse(38% 41% at 50% 50%)'
          }}
        >
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: "url('/window-frame2.webp')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>

        {/* Window knob - visible before shutter opens */}
        <div
          ref={windowKnobRef}
          className="absolute top-[12%] left-1/2 -translate-x-1/2 z-40 w-[20%] h-auto"
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

        {/* Yoeki Jets text on window */}
        <div
          ref={logoTextRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-25"
        >
          <h2
            className="text-xl xs:text-2xl sm:text-xl md:text-2xl lg:text-3xl font-light text-white tracking-[0.15em] xs:tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.35em]"
            style={{
              textShadow: '0 4px 30px rgba(255,255,255,0.4), 0 2px 10px rgba(0,0,0,0.3)',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontWeight: 600,
            }}
          >
            Yoeki Jets
          </h2>
        </div>
      </div>

      {/* Left side text - "We are movement" */}
      <div
        ref={leftTextRef}
        className="absolute left-4 sm:left-6 md:left-8 lg:left-12 top-[8%] xs:top-[10%] sm:top-[15%] md:top-1/2 md:-translate-y-1/2 z-10 max-w-[40%] xs:max-w-[42%] sm:max-w-xs md:max-w-md lg:max-w-lg"
        style={{ perspective: '1000px' }}
      >
        <h1
          className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-white mb-2 xs:mb-3 sm:mb-6 md:mb-10 leading-tight"
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontWeight: 700,
          }}
        >
          We are<br />movement
        </h1>
        <div className="space-y-2 xs:space-y-3 sm:space-y-4 md:space-y-6 hidden xs:block">
          <h3 className="text-xs xs:text-sm sm:text-base md:text-2xl lg:text-3xl text-white font-light leading-snug">
            Your<br />freedom to<br />enjoy life
          </h3>
          <div className="w-8 xs:w-10 md:w-14 lg:w-16 h-px bg-white/60" />
          <p className="text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-lg text-white/85 leading-relaxed max-w-md">
            Every flight is designed around your comfort, time, and ambitions — so you can focus on what truly matters, while we take care of everything else.
          </p>
        </div>
      </div>

      {/* Right side text - "We are distinction" */}
      <div
        ref={rightTextRef}
        style={{ perspective: '1000px' }}
        className="absolute right-4 sm:right-6 md:right-8 lg:right-12 top-[8%] xs:top-[10%] sm:top-[15%] md:top-1/2 md:-translate-y-1/2 z-10 max-w-[40%] xs:max-w-[42%] sm:max-w-xs md:max-w-md"
      >
        <h1
          className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-white text-right leading-tight"
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontWeight: 700,
          }}
        >
          We are<br />distinction
        </h1>
      </div>

      {/* Book the Flight button */}
      <div
        ref={bookButtonRef}
        className="absolute bottom-20 xs:bottom-24 left-1/2 -translate-x-1/2 z-10"
      >
        <style jsx>{`
          @keyframes textSlideUp {
            0% { 
              transform: translateY(0);
              opacity: 1;
            }
            50% { 
              transform: translateY(-100%);
              opacity: 0;
            }
            51% { 
              transform: translateY(100%);
              opacity: 0;
            }
            100% { 
              transform: translateY(0);
              opacity: 1;
            }
          }
          
          @keyframes planeFly {
            0% { 
              transform: translate(0, 0) rotate(-45deg) scale(1);
            }
            30% { 
              transform: translate(20px, -20px) rotate(-35deg) scale(1.2);
            }
            60% { 
              transform: translate(60px, -35px) rotate(-30deg) scale(1.5);
            }
            100% { 
              transform: translate(0, 0) rotate(-45deg) scale(1);
            }
          }
          
          .text-container {
            position: relative;
            display: inline-block;
            overflow: hidden;
          }
          
          .group:hover .text-animate {
            animation: textSlideUp 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          }
          
          .group:hover .plane-animate {
            animation: planeFly 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          
          .button-glow {
            position: relative;
            overflow: hidden;
          }
          
          .button-glow::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: translate(-50%, -50%);
            transition: width 0.6s, height 0.6s;
          }
          
          .group:hover .button-glow::before {
            width: 300px;
            height: 300px;
          }
        `}</style>
        <button 
          onClick={() => setIsBookingModalOpen(true)}
          className="group relative bg-white text-gray-900 px-5 py-2.5 xs:px-6 xs:py-3 sm:px-8 sm:py-3.5 md:px-10 md:py-4 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition-all duration-500 hover:shadow-2xl text-xs xs:text-sm sm:text-base md:text-lg shadow-xl active:scale-95 flex items-center gap-2 xs:gap-3 md:gap-4 overflow-hidden"
        >
          <div className="button-glow absolute inset-0 rounded-full pointer-events-none"></div>
          <span className="text-container relative z-10">
            <span className="text-animate inline-block">Book the Flight</span>
          </span>
          <div className="plane-animate relative w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 z-10" style={{ transform: 'rotate(-45deg)' }}>
            <Image 
              src="/aeroplane-black.svg" 
              alt="Plane" 
              fill
              className="object-contain group-hover:brightness-0 group-hover:invert transition-all duration-500" 
            />
          </div>
        </button>
      </div>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-4 xs:bottom-6 right-3 xs:right-4 sm:bottom-8 sm:right-6 md:bottom-10 md:right-16 lg:bottom-12 lg:right-20 z-10 flex flex-col items-end gap-1 xs:gap-2"
      >
        <div className="flex items-center gap-1 xs:gap-2 md:gap-3 text-white text-[10px] xs:text-xs md:text-sm">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="animate-bounce xs:w-4 xs:h-4 md:w-5 md:h-5">
            <path d="M8 2L8 14M8 14L12 10M8 14L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-light tracking-[0.15em] xs:tracking-[0.2em] hidden sm:inline">SCROLL DOWN</span>
          <span className="font-light tracking-[0.1em] xs:tracking-[0.15em] sm:hidden">SCROLL</span>
        </div>
        <div className="w-full h-px bg-white/40" />
        <span className="text-white/70 text-[8px] xs:text-[10px] md:text-xs tracking-[0.1em] xs:tracking-[0.15em] hidden xs:inline">TO START</span>
        <span className="text-white/70 text-[10px] md:text-xs tracking-[0.15em] hidden sm:inline">TO START THE JOURNEY</span>
      </div>
    </section>
  )
}