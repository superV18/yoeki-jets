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
        
        // Stagger menu items animation
        const menuItems = mobileMenuRef.current.querySelectorAll('.menu-item')
        gsap.fromTo(menuItems,
          { x: 50, opacity: 0 },
          { 
            x: 0, 
            opacity: 1, 
            duration: 0.4, 
            stagger: 0.08,
            ease: 'power3.out',
            delay: 0.2
          }
        )
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
            <div ref={logoRef} className="absolute left-1/2 -translate-x-1/2">
              <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-light tracking-[0.3em] hover:tracking-[0.35em] transition-all duration-300 cursor-pointer" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                Yoeki Jets
              </h1>
            </div>

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
        className="fixed top-0 right-0 h-screen w-[85vw] sm:w-[400px] bg-gradient-to-br from-black via-gray-900 to-black backdrop-blur-2xl border-l border-white/20 z-[105] md:hidden shadow-2xl pointer-events-none overflow-y-auto"
        style={{ 
          boxShadow: '-20px 0 50px rgba(0, 0, 0, 0.8)',
          transform: 'translateX(100%)',
          opacity: 0,
        }}
      >
        {/* Close Button */}
        <button
          onClick={closeMobileMenu}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300 pointer-events-auto group z-10"
          aria-label="Close menu"
        >
          <svg className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col h-full justify-between p-6 sm:p-8 pt-20 pb-8 pointer-events-auto">
          {/* Logo Section */}
          <div className="mb-12">
            <h2 className="text-white text-3xl font-light tracking-[0.3em] mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              Yoeki Jets
            </h2>
            <div className="h-px w-20 bg-gradient-to-r from-blue-400 to-cyan-400"></div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 flex flex-col gap-1">
            <a 
              href="#about" 
              onClick={closeMobileMenu}
              className="menu-item group relative text-white text-xl sm:text-2xl font-light tracking-wide hover:tracking-wider transition-all duration-300 w-full py-4 px-4 rounded-lg hover:bg-white/5 active:bg-white/10"
            >
              <div className="flex items-center justify-between">
                <span className="relative z-10">About</span>
                <svg className="w-5 h-5 text-white/40 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <span className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></span>
            </a>
            <a 
              href="#fleet" 
              onClick={closeMobileMenu}
              className="menu-item group relative text-white text-xl sm:text-2xl font-light tracking-wide hover:tracking-wider transition-all duration-300 w-full py-4 px-4 rounded-lg hover:bg-white/5 active:bg-white/10"
            >
              <div className="flex items-center justify-between">
                <span className="relative z-10">Our Fleet</span>
                <svg className="w-5 h-5 text-white/40 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <span className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></span>
            </a>
            <a 
              href="#advantages" 
              onClick={closeMobileMenu}
              className="menu-item group relative text-white text-xl sm:text-2xl font-light tracking-wide hover:tracking-wider transition-all duration-300 w-full py-4 px-4 rounded-lg hover:bg-white/5 active:bg-white/10"
            >
              <div className="flex items-center justify-between">
                <span className="relative z-10">Advantages</span>
                <svg className="w-5 h-5 text-white/40 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <span className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></span>
            </a>
            <a 
              href="#global" 
              onClick={closeMobileMenu}
              className="menu-item group relative text-white text-xl sm:text-2xl font-light tracking-wide hover:tracking-wider transition-all duration-300 w-full py-4 px-4 rounded-lg hover:bg-white/5 active:bg-white/10"
            >
              <div className="flex items-center justify-between">
                <span className="relative z-10">Global</span>
                <svg className="w-5 h-5 text-white/40 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <span className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></span>
            </a>
          </nav>

          {/* Contact Section */}
          <div className="menu-item mt-auto pt-6 border-t border-white/10">
            <p className="text-white/50 text-xs uppercase tracking-widest mb-4 font-semibold">Get in Touch</p>
            <div className="flex flex-col gap-3">
              <a 
                href="tel:+971544325050" 
                onClick={closeMobileMenu}
                className="group flex items-center gap-3 text-white/90 text-sm hover:text-white transition-all duration-300 bg-gradient-to-r from-white/5 to-white/10 p-4 rounded-xl border border-white/10 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/40 uppercase tracking-wide">Phone</span>
                  <span className="font-light">+971 54 432 5050</span>
                </div>
              </a>
              <a 
                href="mailto:info@yoekijets.com" 
                onClick={closeMobileMenu}
                className="group flex items-center gap-3 text-white/90 text-sm hover:text-white transition-all duration-300 bg-gradient-to-r from-white/5 to-white/10 p-4 rounded-xl border border-white/10 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/40 uppercase tracking-wide">Email</span>
                  <span className="font-light">info@yoekijets.com</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[104] md:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={closeMobileMenu}
      />
    </>
  )
}
