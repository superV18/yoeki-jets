'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text reveal animation - character by character filling with white
      const text = textRef.current
      if (text) {
        const chars = text.textContent?.split('') || []
        text.innerHTML = chars
          .map((char, i) => `<span class="char opacity-0" data-index="${i}">${char === ' ' ? '&nbsp;' : char}</span>`)
          .join('')

        const charElements = text.querySelectorAll('.char')

        gsap.to(charElements, {
          opacity: 1,
          stagger: 0.02,
          scrollTrigger: {
            trigger: text,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 1,
          },
        })
      }

      // Cards animation
      gsap.fromTo(
        '.about-card',
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 px-4 sm:px-6 md:px-8 lg:px-10 bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/cloud.webp')",
      }}
    >
      {/* Dark overlay for better text readability */}
      {/* <div className="absolute inset-0 bg-black/30"></div> */}

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Company intro */}
        <div className="mb-10 sm:mb-12 md:mb-14 lg:mb-16">
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 mb-5 sm:mb-6 md:mb-8">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-2 border-white rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-white text-[10px] sm:text-xs md:text-sm font-light tracking-wide">EST. BY EVGENY DEMIDENKO</p>
              <p className="text-white text-[10px] sm:text-xs md:text-sm font-light">2013</p>
            </div>
          </div>

          <p
            ref={textRef}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-snug sm:leading-snug md:leading-relaxed text-white mb-6 sm:mb-8 md:mb-10 lg:mb-12 break-words"
          >
            YoekiJets® is a private aviation operator with over 5,000 missions completed across 150+ countries. From international executives to global industries, our clients trust us to deliver on time, every time.
          </p>
        </div>

        {/* Feature cards */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          <div className="about-card bg-white/10 backdrop-blur-md p-5 sm:p-6 md:p-7 lg:p-8 rounded-lg">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              Direct Access to Private Travel
            </h3>
            <div className="w-10 sm:w-12 h-1 bg-white mb-4 sm:mb-5 md:mb-6"></div>
            <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed">
              Fly beyond boundaries with YoekiJets. Our global operations ensure seamless,
              personalized travel experiences — from the first call to landing. Every journey is
              tailored to your comfort, privacy, and schedule.
            </p>
          </div>

          <div className="about-card bg-white/10 backdrop-blur-md p-5 sm:p-6 md:p-7 lg:p-8 rounded-lg">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              Your Freedom to Enjoy Life
            </h3>
            <div className="w-10 sm:w-12 h-1 bg-white mb-4 sm:mb-5 md:mb-6"></div>
            <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed">
              We value your time above all. YoekiJets gives you the freedom to live, work, and relax
              wherever life takes you — without compromise.
            </p>
          </div>

          <div className="about-card bg-white/10 backdrop-blur-md p-5 sm:p-6 md:p-7 lg:p-8 rounded-lg">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              Precision and Excellence
            </h3>
            <div className="w-10 sm:w-12 h-1 bg-white mb-4 sm:mb-5 md:mb-6"></div>
            <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed">
              Each detail of your flight — from route planning to in-flight service — reflects our
              dedication to perfection. Our crew and fleet meet the highest global standards,
              ensuring reliability in every mission.
            </p>
          </div>

          <div className="about-card bg-white/10 backdrop-blur-md p-5 sm:p-6 md:p-7 lg:p-8 rounded-lg">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              Global Reach, Personal Touch
            </h3>
            <div className="w-10 sm:w-12 h-1 bg-white mb-4 sm:mb-5 md:mb-6"></div>
            <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed">
              With access to destinations in over 150 countries, YoekiJets brings the world closer
              to you. Our experts manage every aspect of your flight, guaranteeing a smooth and
              effortless journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}