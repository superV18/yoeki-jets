'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function FleetSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const planeRef = useRef<HTMLDivElement>(null)
  const contentLeftRef = useRef<HTMLDivElement>(null)
  const contentRightRef = useRef<HTMLDivElement>(null)
  const specsRef = useRef<HTMLDivElement>(null)
  const leftTitleRef = useRef<HTMLHeadingElement>(null)
  const leftSubtitleRef = useRef<HTMLParagraphElement>(null)
  const rightTitleRef = useRef<HTMLHeadingElement>(null)
  const rightModelRef = useRef<HTMLHeadingElement>(null)
  const rightDescRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main scroll timeline for airplane
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200%',
          scrub: 1.5,
          pin: true,
        },
      })

      // Enhanced airplane animation with smooth motion blur effect
      tl.fromTo(
        planeRef.current,
        {
          y: window.innerHeight * 0.5,
          x: -window.innerWidth * 0.2,
          scale: 0.5,
          opacity: 0,
          rotate: -15,
          filter: 'blur(8px)',
        },
        {
          y: 0,
          x: 0,
          scale: 2.8,
          opacity: 1,
          rotate: 0,
          filter: 'blur(0px)',
          duration: 0.35,
          ease: 'power2.out',
        }
      )
      // Cruising phase
      .to(planeRef.current, {
        y: -window.innerHeight * 0.08,
        scale: 2.2,
        rotate: 2,
        duration: 0.25,
        ease: 'power1.inOut',
      })
      // Exit with style
      .to(planeRef.current, {
        y: -window.innerHeight * 0.4,
        x: window.innerWidth * 0.15,
        rotate: 10,
        scale: 0.8,
        opacity: 0.3,
        filter: 'blur(5px) brightness(0.4)',
        duration: 0.3,
        ease: 'power2.in',
      })

      // Left content animation - title with character reveal
      if (leftTitleRef.current) {
        const titleText = leftTitleRef.current.innerText
        const chars = titleText.split('')
        leftTitleRef.current.innerHTML = chars
          .map(char => `<span style="display:inline-block;transform-style:preserve-3d">${char === ' ' ? '&nbsp;' : char === '\n' ? '<br/>' : char}</span>`)
          .join('')

        gsap.fromTo(
          leftTitleRef.current.querySelectorAll('span'),
          {
            opacity: 0,
            y: 100,
            rotateX: -90,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top center',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      // Left subtitle animation
      if (leftSubtitleRef.current) {
        gsap.fromTo(
          leftSubtitleRef.current,
          {
            opacity: 0,
            y: 30,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: 0.3,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top center',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      // Right content animations
      if (rightTitleRef.current) {
        gsap.fromTo(
          rightTitleRef.current,
          {
            opacity: 0,
            x: 100,
            rotateY: 90,
          },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top center',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      if (rightModelRef.current) {
        gsap.fromTo(
          rightModelRef.current,
          {
            opacity: 0,
            scale: 2,
            y: -50,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            delay: 0.2,
            ease: 'elastic.out(1, 0.6)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top center',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      if (rightDescRef.current) {
        gsap.fromTo(
          rightDescRef.current,
          {
            opacity: 0,
            y: 20,
            filter: 'blur(5px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            delay: 0.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top center',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      // Specs animation with stagger and 3D effect
      const specItems = specsRef.current?.children
      if (specItems) {
        gsap.fromTo(
          Array.from(specItems),
          {
            opacity: 0,
            y: 80,
            scale: 0.8,
            rotateX: -45,
            filter: 'blur(10px)',
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            filter: 'blur(0px)',
            duration: 1,
            stagger: {
              amount: 0.6,
              from: 'start',
              ease: 'power2.out',
            },
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'center center',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      // CTA button animation
      gsap.fromTo(
        ctaRef.current,
        {
          opacity: 0,
          scale: 0.5,
          rotate: -10,
        },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 1.2,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'center center',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Continuous hover animation for CTA
      if (ctaRef.current) {
        gsap.to(ctaRef.current, {
          y: -5,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="fleet"
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200"
    >
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 py-8">
        {/* Left content */}
        <div ref={contentLeftRef} className="max-w-md text-center md:text-left mb-4 md:mb-0" style={{ perspective: '1000px' }}>
          <h2 
            ref={leftTitleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-800 mb-3 sm:mb-6 leading-tight"
            style={{ transformStyle: 'preserve-3d' }}
          >
            Fly in <br /> Luxury
          </h2>
          <p 
            ref={leftSubtitleRef}
            className="text-lg sm:text-xl md:text-2xl text-gray-700 font-light"
          >
            Luxury that moves with you
          </p>
        </div>

        {/* Right content - Hidden on mobile */}
        <div ref={contentRightRef} className="max-w-md text-center md:text-right hidden md:block" style={{ perspective: '1000px' }}>
          <h3 
            ref={rightTitleRef}
            className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-800 mb-2 lg:mb-4 tracking-wider"
            style={{ transformStyle: 'preserve-3d' }}
          >
            GULFSTREAM
          </h3>
          <h4 
            ref={rightModelRef}
            className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 lg:mb-6"
            style={{ transformStyle: 'preserve-3d' }}
          >
            650ER
          </h4>
          <p 
            ref={rightDescRef}
            className="text-sm lg:text-base xl:text-lg text-gray-700 mb-8 leading-relaxed"
          >
            Featuring wings designed to minimize any thing that could disrupt its natural
            aerodynamic balance, and powered by high-thrust Rolls-Royce BR725 AI-12 engines,
            the Gulfstream G650 is engineered for exceptional range and top-end speed.
          </p>
        </div>
      </div>

      {/* Airplane */}
      <div
        ref={planeRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[700px] h-auto aspect-[700/360] pointer-events-none"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <img 
          src="/jet.webp" 
          alt="Gulfstream 650ER" 
          className="w-full h-full object-contain drop-shadow-2xl" 
          style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))' }}
        />
      </div>

      {/* Specifications - Responsive Grid */}
      <div
        ref={specsRef}
        className="absolute bottom-16 sm:bottom-20 left-4 sm:left-6 md:left-12 right-4 sm:right-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-x-4 sm:gap-x-8 md:gap-x-16 gap-y-3 sm:gap-y-4"
        style={{ perspective: '1000px' }}
      >
        <div className="backdrop-blur-sm bg-white/30 p-3 sm:p-4 rounded-lg transition-all duration-300 hover:bg-white/50 hover:scale-105 hover:shadow-xl" style={{ transformStyle: 'preserve-3d' }}>
          <p className="text-xs sm:text-sm text-gray-600 uppercase tracking-wider font-semibold">Max Range</p>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mt-1">11,263 KM</p>
        </div>
        <div className="backdrop-blur-sm bg-white/30 p-3 sm:p-4 rounded-lg transition-all duration-300 hover:bg-white/50 hover:scale-105 hover:shadow-xl" style={{ transformStyle: 'preserve-3d' }}>
          <p className="text-xs sm:text-sm text-gray-600 uppercase tracking-wider font-semibold">Speed</p>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mt-1">480 KNOTS</p>
        </div>
        <div className="backdrop-blur-sm bg-white/30 p-3 sm:p-4 rounded-lg transition-all duration-300 hover:bg-white/50 hover:scale-105 hover:shadow-xl" style={{ transformStyle: 'preserve-3d' }}>
          <p className="text-xs sm:text-sm text-gray-600 uppercase tracking-wider font-semibold">Capacity</p>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mt-1">UP TO 12</p>
        </div>
        <div className="backdrop-blur-sm bg-white/30 p-3 sm:p-4 rounded-lg transition-all duration-300 hover:bg-white/50 hover:scale-105 hover:shadow-xl" style={{ transformStyle: 'preserve-3d' }}>
          <p className="text-xs sm:text-sm text-gray-600 uppercase tracking-wider font-semibold">Endurance</p>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mt-1">14 HRS</p>
        </div>
        <div className="hidden md:block backdrop-blur-sm bg-white/30 p-3 sm:p-4 rounded-lg transition-all duration-300 hover:bg-white/50 hover:scale-105 hover:shadow-xl" style={{ transformStyle: 'preserve-3d' }}>
          <p className="text-xs sm:text-sm text-gray-600 uppercase tracking-wider font-semibold">Baggage</p>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mt-1">5.52 M³</p>
        </div>
        <div className="hidden md:block backdrop-blur-sm bg-white/30 p-3 sm:p-4 rounded-lg transition-all duration-300 hover:bg-white/50 hover:scale-105 hover:shadow-xl" style={{ transformStyle: 'preserve-3d' }}>
          <p className="text-xs sm:text-sm text-gray-600 uppercase tracking-wider font-semibold">Altitude</p>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mt-1">15,544 M</p>
        </div>
      </div>

      {/* CTA - Responsive Position */}
      <div ref={ctaRef} className="absolute bottom-4 sm:bottom-8 md:bottom-20 right-4 sm:right-6 md:right-12">
        <button className="group relative bg-gradient-to-r from-gray-900 to-gray-800 text-white px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-full font-semibold hover:from-gray-800 hover:to-gray-700 transition-all duration-500 shadow-2xl flex items-center space-x-2 sm:space-x-3 text-sm sm:text-base overflow-hidden hover:scale-110 active:scale-95">
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          <span className="relative hidden sm:inline font-bold tracking-wide">Book the Flight</span>
          <span className="relative sm:hidden font-bold">Book</span>
          <svg className="relative w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>
    </section>
  )
}
