'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface BookingButtonProps {
  onClick: () => void
}

export default function BookingButton({ onClick }: BookingButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // Floating animation
    gsap.to(buttonRef.current, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    })
  }, [])

  return (
  <div className="absolute bottom-16 sm:bottom-24 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
        <div className="flex items-center bg-[#181818] rounded-full p-1.5 border border-white/10 hover:border-white/30 hover:bg-[#222] transition-all duration-300 cursor-pointer group shadow-2xl">
          
          {/* Button Text */}
          <button className="bg-white text-black px-6 sm:px-8 py-3 rounded-full font-bold text-sm sm:text-base tracking-wide whitespace-nowrap group-hover:bg-gray-200 transition-colors">
            Book the Flight
          </button>
          
          {/* Circle Icon */}
          <button className="bg-white text-black w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ml-1 sm:ml-2 group-hover:bg-gray-200 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
              <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>
  )
}