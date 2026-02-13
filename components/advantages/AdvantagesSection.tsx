'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface Advantage {
  title: string
  description: string
  image: string
}

const advantages: Advantage[] = [
  {
    title: 'Pets',
    description:
      'Traveling with pets on a private jet means comfort and peace of mind for both owners and their companions. Our dedicated team ensures seamless arrangements, from documentation and safety to onboard care, so that your pet enjoys the same level of attention and luxury as you do. Every detail is managed to create a stress-free and enjoyable journey for everyone on board.',
    image: '/img-1.webp',
  },
  {
    title: '24/7 availability',
    description:
      'Our team is available around the clock to accommodate your travel needs. Whether it\'s a last-minute charter or urgent changes to your itinerary, we\'re here to ensure your journey proceeds smoothly at any hour.',
    image: '/img-2.webp',
  },
  {
    title: 'Onboard services',
    description:
      'Experience exceptional in-flight service tailored to your preferences. From gourmet catering to personalized amenities, every aspect of your journey is designed for your comfort and satisfaction.',
    image: '/jet.webp',
  },
  {
    title: 'Efficient',
    description:
      'Time is precious. Our streamlined processes and direct routes minimize travel time, allowing you to maximize productivity and reach your destination faster than commercial alternatives.',
    image: '/jet-bg.webp',
  },
]

export default function AdvantagesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.advantage-item',
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
      )
    }
  }, [activeIndex])

  const handleAccordionClick = (index: number) => {
    setActiveIndex(index === activeIndex ? -1 : index)
  }

  return (
    <section
      id="advantages"
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-b from-gray-200 to-gray-100 py-12 sm:py-16 md:py-20 scroll-mt-16 md:scroll-mt-20"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-8 sm:mb-12 md:mb-16">
          A BETTER WAY TO FLY
        </h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Left: Accordion */}
          <div className="space-y-3 sm:space-y-4">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="advantage-item border-b border-gray-300 pb-4"
              >
                <button
                  onClick={() => handleAccordionClick(index)}
                  className="w-full flex items-center justify-between text-left py-4 hover:text-gray-600 transition-colors group"
                >
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 group-hover:text-gray-600 transition-colors">
                    {advantage.title}
                  </h3>
                  <span className="text-3xl md:text-4xl text-gray-800 group-hover:text-gray-600 transition-all transform">
                    {activeIndex === index ? '−' : '+'}
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-base md:text-lg text-gray-700 py-4 leading-relaxed">
                    {advantage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Image */}
          <div className="relative h-[600px] rounded-lg overflow-hidden shadow-2xl">
            {activeIndex >= 0 && (
              <div
                ref={imageRef}
                key={activeIndex}
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('${advantages[activeIndex].image}')`,
                }}
              />
            )}
            {activeIndex < 0 && (
              <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                <p className="text-gray-500 text-xl">Select an option</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 sm:mt-24 md:mt-32 border-t border-gray-300 pt-6 sm:pt-8">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center text-gray-600 text-xs sm:text-sm">
          <p>©2026 Yoeki JETS. ALL RIGHTS RESERVED</p>
          <a href="#" className="hover:text-gray-800 transition-colors mt-3 md:mt-0">
            PRIVACY POLICY
          </a>
        </div>
      </footer>
    </section>
  )
}