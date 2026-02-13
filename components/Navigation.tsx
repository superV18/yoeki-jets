'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initially hide the nav
      gsap.set(navRef.current, {
        y: -100,
        opacity: 0,
      })

      // Show nav when scrolling starts
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top -50',
        onEnter: () => {
          gsap.to(navRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
          })
        },
        onLeaveBack: () => {
          gsap.to(navRef.current, {
            y: -100,
            opacity: 0,
            duration: 0.4,
            ease: 'power2.in',
          })
        },
      })
    }, navRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (mobileMenuRef.current) {
      // Set initial state
      gsap.set(mobileMenuRef.current, {
        x: '100%',
        opacity: 0,
      })
    }
  }, [])

  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        mobileMenuRef.current.style.pointerEvents = 'auto'
        gsap.to(mobileMenuRef.current, {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
        })
      } else {
        gsap.to(mobileMenuRef.current, {
          x: '100%',
          opacity: 0,
          duration: 0.4,
          ease: 'power2.in',
          onComplete: () => {
            if (mobileMenuRef.current) {
              mobileMenuRef.current.style.pointerEvents = 'none'
            }
          }
        })
      }
    }
  }, [isMobileMenuOpen])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[100] bg-black/30 backdrop-blur-xl border-b border-white/10 shadow-2xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left Navigation */}
            <div className="hidden md:flex items-center gap-8 lg:gap-12">
              <a 
                href="#about" 
                className="group relative text-white/90 hover:text-white transition-all duration-300 text-sm lg:text-base font-light tracking-wider"
              >
                <span className="relative z-10">About</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-black to-white group-hover:w-full transition-all duration-500 ease-out"></span>
                {/* <span className="absolute inset-0 bg-white/5 rounded-lg scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></span> */}
              </a>
              <a 
                href="#fleet" 
                className="group relative text-white/90 hover:text-white transition-all duration-300 text-sm lg:text-base font-light tracking-wider"
              >
                <span className="relative z-10">Our Fleet</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-black to-white group-hover:w-full transition-all duration-500 ease-out"></span>
                {/* <span className="absolute inset-0 bg-white/5 rounded-lg scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></span> */}
              </a>
              <a 
                href="#advantages" 
                className="group relative text-white/90 hover:text-white transition-all duration-300 text-sm lg:text-base font-light tracking-wider"
              >
                <span className="relative z-10">Advantages</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-black to-white group-hover:w-full transition-all duration-500 ease-out"></span>
                {/* <span className="absolute inset-0 bg-white/5 rounded-lg scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></span> */}
              </a>
              <a 
                href="#global" 
                className="group relative text-white/90 hover:text-white transition-all duration-300 text-sm lg:text-base font-light tracking-wider"
              >
                <span className="relative z-10">Global</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-black to-white group-hover:w-full transition-all duration-500 ease-out"></span>
                {/* <span className="absolute inset-0 bg-white/5 rounded-lg scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></span> */}
              </a>
            </div>

            {/* Center Logo */}
            <a href="#" ref={logoRef} className="absolute left-1/2 -translate-x-1/2">
              <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-light tracking-[0.3em] hover:tracking-[0.35em] transition-all duration-300 cursor-pointer" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                Yoeki Jets
              </h1>
            </a>

            {/* Right Contact */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <a 
                href="tel:+971544325050" 
                className="group relative text-white/90 hover:text-white transition-all duration-300 text-sm lg:text-base font-light px-3 py-1.5 rounded-lg"
              >
                <span className="relative z-10">+971 54 432 5050</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                <span className="absolute inset-0 border border-white/0 group-hover:border-white/20 rounded-lg transition-all duration-300"></span>
              </a>
              <a 
                href="mailto:info@yoekijets.com" 
                className="group relative text-white/90 hover:text-white transition-all duration-300 text-sm lg:text-base font-light px-3 py-1.5 rounded-lg"
              >
                <span className="relative z-10">info@yoekijets.com</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                <span className="absolute inset-0 border border-white/0 group-hover:border-white/20 rounded-lg transition-all duration-300"></span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden relative text-white p-2 hover:bg-white/10 rounded-lg transition-all duration-300 z-[110]"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`block h-0.5 w-full bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block h-0.5 w-full bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block h-0.5 w-full bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        ref={mobileMenuRef}
        className="fixed top-0 right-0 h-screen w-full sm:w-80 bg-black/95 backdrop-blur-2xl border-l border-white/10 z-[105] md:hidden shadow-2xl pointer-events-none"
        style={{ 
          boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.5)',
          transform: 'translateX(100%)',
          opacity: 0,
        }}
      >
        <div className="flex flex-col items-start gap-8 p-8 pt-24 pointer-events-auto">
          <a 
            href="#about" 
            onClick={closeMobileMenu}
            className="group relative text-white text-2xl font-light tracking-wider hover:text-blue-400 transition-all duration-300 w-full py-3 border-b border-white/10 hover:border-blue-400/50"
          >
            <span className="relative z-10">About</span>
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-8 transition-all duration-500 -ml-10"></span>
          </a>
          <a 
            href="#fleet" 
            onClick={closeMobileMenu}
            className="group relative text-white text-2xl font-light tracking-wider hover:text-blue-400 transition-all duration-300 w-full py-3 border-b border-white/10 hover:border-blue-400/50"
          >
            <span className="relative z-10">Our Fleet</span>
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-8 transition-all duration-500 -ml-10"></span>
          </a>
          <a 
            href="#advantages" 
            onClick={closeMobileMenu}
            className="group relative text-white text-2xl font-light tracking-wider hover:text-blue-400 transition-all duration-300 w-full py-3 border-b border-white/10 hover:border-blue-400/50"
          >
            <span className="relative z-10">Advantages</span>
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-8 transition-all duration-500 -ml-10"></span>
          </a>
          <a 
            href="#global" 
            onClick={closeMobileMenu}
            className="group relative text-white text-2xl font-light tracking-wider hover:text-blue-400 transition-all duration-300 w-full py-3 border-b border-white/10 hover:border-blue-400/50"
          >
            <span className="relative z-10">Global</span>
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-8 transition-all duration-500 -ml-10"></span>
          </a>

          <div className="flex flex-col gap-4 mt-8 w-full">
            <a 
              href="tel:+971544325050" 
              onClick={closeMobileMenu}
              className="text-white/80 text-base hover:text-white transition-all duration-300 backdrop-blur-sm bg-white/5 p-4 rounded-lg border border-white/10 hover:border-blue-400/50 hover:bg-white/10"
            >
              +971 54 432 5050
            </a>
            <a 
              href="mailto:info@yoekijets.com" 
              onClick={closeMobileMenu}
              className="text-white/80 text-base hover:text-white transition-all duration-300 backdrop-blur-sm bg-white/5 p-4 rounded-lg border border-white/10 hover:border-blue-400/50 hover:bg-white/10"
            >
              info@yoekijets.com
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[104] md:hidden"
          onClick={closeMobileMenu}
        />
      )}
    </>
  )
}
