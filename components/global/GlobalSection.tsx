'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const locations = [
  'São Paulo', 'Abu Dhabi', 'Sydney', 'Miami', 'Toronto',
  'Hong Kong', 'London', 'Dubai', 'Tokyo', 'New York',
  'Mumbai', 'Singapore', 'Paris', 'Shanghai', 'Los Angeles',
]

export default function GlobalSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  
  // Globe Refs
  const globeParallaxRef = useRef<HTMLDivElement>(null) // New ref for the scroll movement
  const globeRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLImageElement>(null)
  const bgTextRef = useRef<HTMLHeadingElement>(null)
  
  // Content Refs
  const section1Ref = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const magneticBtnWrapRef = useRef<HTMLDivElement>(null)
  const magneticBtnRef = useRef<HTMLDivElement>(null)
  
  // Number counter refs
  const count5kRef = useRef<HTMLSpanElement>(null)
  const count174Ref = useRef<HTMLParagraphElement>(null)

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. EPIC INITIAL LOAD SEQUENCE
      const tl = gsap.timeline()

      tl.fromTo(bgTextRef.current,
        { scale: 1.2, opacity: 0, filter: 'blur(10px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 2.5, ease: 'power3.out' },
        0
      )
      
      tl.fromTo(globeRef.current,
        { scale: 0.6, opacity: 0, y: 100 },
        { scale: 1, opacity: 1, y: 0, duration: 2, ease: 'expo.out' },
        0.2
      )

      const sec1Texts = section1Ref.current?.querySelectorAll('.reveal-text')
      if (sec1Texts) {
        tl.fromTo(sec1Texts,
          { y: 100, opacity: 0, rotateX: -20 },
          { y: 0, opacity: 1, rotateX: 0, duration: 1.5, stagger: 0.1, ease: 'power4.out' },
          1
        )
      }

      // 2. CONTINUOUS GLOBE ANIMATIONS (Rotation & Orbits)
      const globeImage = globeRef.current?.querySelector('.globe-image')
      if (globeImage) {
        gsap.to(globeImage, {
          rotation: 360,
          duration: 150,
          repeat: -1,
          ease: 'none',
        })
      }

      if (overlayRef.current) {
        const radius = 50
        const timeline = gsap.timeline({ repeat: -1 })
        for (let i = 0; i <= 8; i++) {
          const angle = (i / 8) * Math.PI * 2
          timeline.to(overlayRef.current, {
            x: `${Math.cos(angle) * radius}%`,
            y: `${Math.sin(angle) * radius}%`,
            rotation: angle * (180 / Math.PI) + 90,
            duration: 1.875,
            ease: 'none',
          }, i * 1.875)
        }
      }

      gsap.to('.location-item', {
        y: '-100%',
        duration: 25,
        repeat: -1,
        ease: 'none',
      })

      // 3. SCROLL TRIGGERED GLOBE DOWNWARD MOVEMENT (NEW)
      gsap.to(globeParallaxRef.current, {
        y: '75vh', // Moves the globe down towards the bottom of the screen
        scale: 0.85, // Shrinks slightly to frame the footer nicely
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1, // Smoothly ties the movement to the scrollbar
        }
      })

      // Parallax for the massive background text
      gsap.to(bgTextRef.current, {
        y: -300,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      })

      // Section 2: Card Parallax & 3D entrance
      gsap.fromTo(cardRef.current,
        { y: 100, opacity: 0, scale: 0.5, rotateX: 20 },
        {
          y: -50, 
          opacity: 1,
          scale: 1,
          rotateX: 0,
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 90%',
            end: 'top 30%',
            scrub: 1.5,
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Section 2: Number Counter
      const count5k = { val: 0 }
      gsap.to(count5k, {
        val: 5,
        duration: 2.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
          onEnter: () => {
        if (count5kRef.current) count5kRef.current.innerText = '0'
          }
        },
        onUpdate: () => {
          if (count5kRef.current) count5kRef.current.innerText = Math.floor(count5k.val).toString()
        }
      })

      // Section 3: Footer Reveal
      const footerTexts = footerRef.current?.querySelectorAll('.footer-reveal')
      if (footerTexts) {
        gsap.fromTo(footerTexts,
          { y: 80, opacity: 0, filter: 'blur(5px)' },
          {
            y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.5, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            }
          }
        )
      }

      // Section 3: Number Counter
      const count174 = { val: 0 }
      gsap.to(count174, {
        val: 174,
        duration: 2.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
        onUpdate: () => {
          if (count174Ref.current) count174Ref.current.innerText = Math.floor(count174.val).toString()
        }
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Magnetic Button Logic
  useEffect(() => {
    const magneticWrap = magneticBtnWrapRef.current
    const magneticBtn = magneticBtnRef.current
    if (!magneticWrap || !magneticBtn) return

    const xTo = gsap.quickTo(magneticBtn, "x", { duration: 0.6, ease: "elastic.out(1, 0.3)" })
    const yTo = gsap.quickTo(magneticBtn, "y", { duration: 0.6, ease: "elastic.out(1, 0.3)" })

    const handleBtnMove = (e: MouseEvent) => {
      const rect = magneticWrap.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      xTo(x * 0.3)
      yTo(y * 0.3)
    }

    const handleBtnLeave = () => {
      xTo(0)
      yTo(0)
    }

    magneticWrap.addEventListener('mousemove', handleBtnMove)
    magneticWrap.addEventListener('mouseleave', handleBtnLeave)

    return () => {
      magneticWrap.removeEventListener('mousemove', handleBtnMove)
      magneticWrap.removeEventListener('mouseleave', handleBtnLeave)
    }
  }, [])

  // Globe 3D Mouse Parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovering) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20
    setMousePosition({ x, y })
  }

  return (
    <section
      id="global"
      ref={sectionRef}
      className="relative min-h-[300vh] bg-[#050505] overflow-hidden font-sans"
    >
      {/* Sticky Background & Globe */}
      <div className="sticky top-0 w-full h-screen flex items-center justify-center z-0 overflow-hidden pointer-events-none">
        
        <div className="absolute top-0 w-full flex justify-center pt-8 md:pt-12 select-none z-0">
          <h1 
            ref={bgTextRef}
            className="text-[28vw] leading-[0.75] font-black tracking-tighter will-change-transform"
            style={{ color: '#111111' }} 
          >
            Global
          </h1>
        </div>

        {/* NEW: Scroll Parallax Wrapper for the Globe */}
        <div ref={globeParallaxRef} className="absolute flex items-center justify-center will-change-transform">
          <div
            className="relative w-[90vw] h-[90vw] sm:w-[75vw] sm:h-[75vw] md:w-[65vw] md:h-[65vw] lg:w-[600px] lg:h-[600px] xl:w-[700px] xl:h-[700px] max-w-[700px] max-h-[700px] pointer-events-auto z-10"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => { setIsHovering(false); setMousePosition({ x: 0, y: 0 }) }}
          >
            <div
              ref={globeRef}
              className="w-full h-full relative rounded-full overflow-visible will-change-transform"
              style={{
                transform: `rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg) scale(${isHovering ? 1.03 : 1})`,
                transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transformStyle: 'preserve-3d',
              }}
            >
              <div 
                className="w-full h-full relative rounded-full overflow-hidden"
                style={{ boxShadow: 'inset -30px -30px 60px rgba(0,0,0,0.9), inset 10px 10px 40px rgba(255,255,255,0.05)' }}
              >
                <img 
                  src="/globe.webp" 
                  alt="globe" 
                  className="globe-image w-full h-full object-cover rounded-full" 
                  style={{ filter: 'grayscale(100%) contrast(1.2) brightness(0.6)' }}
                />
              </div>
              
              <img 
                ref={overlayRef}
                src="/globe-overlay.svg" 
                alt="overlay" 
                className="absolute pointer-events-none w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28" 
                style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', filter: 'grayscale(100%) brightness(1.5)', opacity: 0.6 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content Container */}
      <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
        
        {/* SECTION 1: Fly anywhere */}
        <div ref={section1Ref} className="relative h-screen flex items-center justify-center px-4 pointer-events-auto">
          <div className="flex flex-col sm:flex-row items-center sm:space-x-4 md:space-x-8 text-white backdrop-blur-md bg-[#0a0a0a]/80 p-8 sm:p-10 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
            <div className="overflow-hidden">
              <h3 className="reveal-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-0 tracking-tight text-white will-change-transform">
                Fly anywhere
              </h3>
            </div>
            
            <div className="overflow-hidden">
              <div className="reveal-text w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 mb-4 sm:mb-0 text-white opacity-80 rotate-[-90deg] sm:rotate-0">
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>

            <div className="overflow-hidden">
              <div className="reveal-text h-48 sm:h-56 md:h-64 relative min-w-[200px] text-center sm:text-left">
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
                <div className="flex flex-col space-y-3 sm:space-y-4">
                  {[...locations, ...locations].map((location, index) => (
                    <p key={index} className="location-item text-2xl sm:text-3xl md:text-4xl font-light whitespace-nowrap text-gray-400 hover:text-white transition-colors cursor-pointer">
                      {location}
                    </p>
                  ))}
                </div>
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: 5K+ flights card */}
        <div className="relative h-screen flex items-center justify-center px-4 sm:px-6 pointer-events-auto">
          <div
            ref={cardRef}
            className="bg-[#111] backdrop-blur-lg p-8 sm:p-10 md:p-12 lg:p-16 rounded-3xl max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-2xl border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] will-change-transform"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="flex items-center justify-center mb-8">
              <div className="bg-white text-black px-6 py-2 sm:py-3 rounded-full flex items-baseline gap-1">
                <h4 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
                  <span ref={count5kRef}>0</span>K+
                </h4>
                <span className="text-sm sm:text-base font-bold">flights</span>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-400 mb-5 uppercase tracking-[0.2em] text-center font-bold">
              SUCCESSFULLY ARRANGED
            </p>
            <div className="w-16 h-[1px] bg-white/30 mx-auto mb-6"></div>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed text-center font-light">
              Each journey reflects years of expertise, precision, and trust. From last-minute
              charters to intercontinental business routes — Yoeki Jets ensures safety, discretion, and
              excellence in every flight.
            </p>
          </div>
        </div>

        {/* SECTION 3: Footer content */}
        <div ref={footerRef} className="relative h-screen flex flex-col items-center justify-center text-white px-4 sm:px-6 pointer-events-auto">
          <div className="backdrop-blur-md bg-[#0a0a0a]/90 p-8 sm:p-12 md:p-16 rounded-[2.5rem] border border-white/10 shadow-2xl max-w-6xl w-full">
            
            <div className="text-center mb-12 sm:mb-16">
              <div className="overflow-hidden inline-block w-full">
                <h3 className="footer-reveal text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-tight will-change-transform">
                  Fly anywhere with total
                </h3>
              </div>
              <div className="overflow-hidden inline-block w-full mt-1 sm:mt-2">
                <h3 className="footer-reveal text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-tight will-change-transform">
                  comfort and control
                </h3>
              </div>
            </div>

            <div className="flex justify-center mb-16">
              <div ref={magneticBtnWrapRef} className="p-8 -m-8 cursor-pointer group">
                <div 
                  ref={magneticBtnRef} 
                  className="flex items-center bg-[#181818] rounded-full p-1.5 border border-white/10 hover:border-white/30 transition-colors duration-300 shadow-[0_0_40px_rgba(255,255,255,0.05)]"
                >
                  <span className="bg-transparent text-white px-6 sm:px-10 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-lg tracking-wide whitespace-nowrap">
                    Book the Flight
                  </span>
                  <div className="bg-white text-black w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center ml-1 group-hover:scale-110 transition-transform duration-300">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                      <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center mb-16 w-full divide-y sm:divide-y-0 sm:divide-x divide-white/10 border-y border-white/10 py-10">
              <div className="py-2 overflow-hidden">
                <div className="footer-reveal">
                  <p className="text-[10px] sm:text-xs text-gray-500 mb-2 uppercase tracking-[0.2em] font-bold">COUNTRIES SUPPORTED</p>
                  <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"><span ref={count174Ref}>0</span></p>
                </div>
              </div>
              <div className="py-2 overflow-hidden">
                <div className="footer-reveal" style={{ transitionDelay: '0.1s' }}>
                  <p className="text-[10px] sm:text-xs text-gray-500 mb-2 uppercase tracking-[0.2em] font-bold">BASED IN</p>
                  <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">DUBAI, UAE</p>
                </div>
              </div>
              <div className="py-2 overflow-hidden">
                <div className="footer-reveal" style={{ transitionDelay: '0.2s' }}>
                  <p className="text-[10px] sm:text-xs text-gray-500 mb-2 uppercase tracking-[0.2em] font-bold">LOCAL TIME</p>
                  <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">14:16</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 text-sm sm:text-base">
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 overflow-hidden">
                <div className="footer-reveal flex items-center gap-6 flex-col md:flex-row">
                  <a href="mailto:info@yoekijets.com" className="text-white hover:text-gray-400 font-semibold transition-colors">
                    info@yoekijets.com
                  </a>
                  <span className="hidden md:inline text-white/20">|</span>
                  <a href="tel:+971544325050" className="text-white hover:text-gray-400 font-semibold transition-colors">
                    +971 54 432 5050
                  </a>
                </div>
              </div>
              
              <div className="flex flex-col items-center md:items-end overflow-hidden">
                <div className="footer-reveal">
                  <span className="text-[10px] sm:text-xs text-gray-500 font-bold tracking-[0.2em] uppercase block">FOR</span>
                  <span className="text-[10px] sm:text-xs text-gray-500 font-bold tracking-[0.2em] uppercase block">INQUIRIES</span>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-[10px] sm:text-xs text-gray-500 font-bold tracking-[0.1em] uppercase">
              <p>©2026 Yoeki JETS. ALL RIGHTS RESERVED</p>
              <div className="flex items-center space-x-4">
                <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
                <span className="text-white/20">|</span>
                <p>MADE BY THE FIRST THE LAST</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  )
}