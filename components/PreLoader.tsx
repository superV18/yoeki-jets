'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface PreLoaderProps {
  onComplete?: () => void
}

export default function PreLoader({ onComplete }: PreLoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const [hasPlayed, setHasPlayed] = useState(false)

  useEffect(() => {
    const hasPlayedBefore = sessionStorage.getItem('preloaderPlayed')
    
    if (hasPlayedBefore) {
      setHasPlayed(true)
      if (onComplete) onComplete()
      return
    }

    const ctx = gsap.context(() => {
      const chars = textRef.current?.querySelectorAll('.char')
      const subtext = textRef.current?.querySelector('.subtext')
      const particles = particlesRef.current?.querySelectorAll('.particle')
      
      if (!chars || !subtext || !particles) return

      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem('preloaderPlayed', 'true')
          setHasPlayed(true)
          if (onComplete) onComplete()
        }
      })

      // === PHASE 1: DRAMATIC 3D ENTRANCE ===
      gsap.set(chars, {
        opacity: 0,
        z: -1200,
        rotateY: -360,
        rotateX: -180,
        rotateZ: -90,
        scale: 0.1,
        duration: 1,
      })

      // Slower, smoother spiral in
      tl.to(chars, {
        opacity: 1,
        z: -200,
        rotateY: -90,
        rotateX: -45,
        rotateZ: -20,
        scale: 0.5,
        duration: 2.5, // Increased from 1.5
        stagger: {
          each: 0.18, // Increased from 0.12
          from: 'random',
          ease: 'power2.inOut', // Smoother distribution
        },
        ease: 'power3.out', // Softer deceleration
      })
      
      // === PHASE 2: ROTATION & ALIGNMENT ===
      .to(chars, {
        z: 0,
        rotateY: 0,
        rotateX: 0,
        rotateZ: 0,
        scale: 1,
        duration: 2.0, // Increased from 1.2
        stagger: {
          each: 0.15, // Increased from 0.1
          ease: 'sine.inOut',
        },
        ease: 'back.out(1.2)', // Lowered tension from 1.5 to make it glide into place
      }, '-=1.5') // Increased overlap to blend phases
      
      // === PHASE 3: PULSING GLOW EFFECT ===
      .to(chars, {
        textShadow: `
          0 0 20px rgba(255,255,255,0.8),
          0 0 40px rgba(255,255,255,0.6),
          0 0 60px rgba(255,255,255,0.4),
          0 0 80px rgba(135,206,250,0.3)
        `,
        duration: 1.5, // Increased from 0.8
        stagger: {
          each: 0.12, // Increased from 0.08
          yoyo: true,
          repeat: 1,
        },
        ease: 'sine.inOut',
      }, '-=1.2')
      
      // === PHASE 4: WAVE ANIMATION ===
      .to(chars, {
        y: -25,
        duration: 0.8, // Increased from 0.5
        stagger: {
          each: 0.08,
          ease: 'sine.inOut',
        },
        ease: 'power2.out',
      }, '-=0.5')
      .to(chars, {
        y: 0,
        duration: 1.0, // Increased from 0.6
        stagger: {
          each: 0.08,
          ease: 'sine.inOut',
        },
        // Replaced 'bounce.out' with 'power2.out' for a fluid settle instead of a jerky bounce
        ease: 'power2.out', 
      }, '-=0.5')
      
      // === PHASE 5: SUBTEXT ENTRANCE ===
      .fromTo(
        glowRef.current,
        {
          opacity: 0,
          scale: 0.5,
        },
        {
          opacity: 0.6,
          scale: 1.5,
          duration: 2.5, // Increased from 1.5
          ease: 'power2.out',
        },
        '-=1.5'
      )
      
      .fromTo(
        subtext,
        {
          opacity: 0,
          y: 100,
          z: -500,
          rotateX: -90,
          scale: 0.5,
        },
        {
          opacity: 1,
          y: 0,
          z: 0,
          rotateX: 0,
          scale: 1,
          duration: 2.0, // Increased from 1.2
          ease: 'power3.out', // Replaced 'back.out' for a smoother glide up
        },
        '-=1.8'
      )
      
      // === PHASE 6: PARTICLES ANIMATION ===
      .to(particles, {
        opacity: 1,
        scale: 1,
        duration: 1.5, // Increased from 0.8
        stagger: {
          each: 0.08,
          from: 'random',
        },
        ease: 'sine.out',
      }, '-=1.5')
      
      // === PHASE 7: HOLD & SHOWCASE ===
      .to(chars, {
        scale: 1.03, // Reduced scale slightly for subtlety
        duration: 1.5, // Increased from 0.8
        stagger: {
          each: 0.08,
          yoyo: true,
          repeat: 1,
        },
        ease: 'sine.inOut',
      })
      
      .to({}, { duration: 1.2 }) // Longer hold
      
      // === PHASE 8: DRAMATIC 3D EXIT ===
      .to(particles, {
        opacity: 0,
        scale: 0,
        duration: 1.0, // Increased from 0.6
        stagger: {
          each: 0.05,
          from: 'random',
        },
        ease: 'power2.inOut',
      })
      
      .to(chars, {
        rotateY: 90,
        scale: 1.1,
        duration: 1.2, // Increased from 0.7
        stagger: {
          each: 0.1,
          ease: 'power2.inOut',
        },
        ease: 'sine.inOut',
      }, '-=0.8')
      
      .to(chars, {
        opacity: 0,
        z: 1500,
        rotateY: 360,
        rotateX: 180,
        rotateZ: 90,
        scale: 0.1,
        duration: 2.0, // Increased from 1.3
        stagger: {
          each: 0.12,
          ease: 'power3.in',
        },
        ease: 'power3.in',
      }, '-=1.0')
      
      .to(
        subtext,
        {
          opacity: 0,
          y: -80,
          z: 500,
          rotateX: 90,
          rotateZ: 180,
          scale: 0.3,
          duration: 1.5, // Increased from 1.0
          ease: 'power3.inOut',
        },
        '-=2.0'
      )
      
      .to(
        glowRef.current,
        {
          opacity: 0,
          scale: 2,
          duration: 1.5,
          ease: 'power2.inOut',
        },
        '-=1.5'
      )
      
      // === PHASE 9: FINAL FADE ===
      .to(
        loaderRef.current,
        {
          opacity: 0,
          duration: 1.2, // Increased from 0.8
          ease: 'power2.inOut',
        },
        '-=0.8'
      )
    }, loaderRef)

    return () => ctx.revert()
  }, [onComplete])

  if (hasPlayed) return null

  const text = "Yoeki Jets"
  
  const particleCount = 20
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 2,
  }))
  
  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] bg-gradient-to-br from-black via-gray-950 to-black flex items-center justify-center overflow-hidden"
      style={{ perspective: '2500px' }}
    >
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(135,206,250,0.15) 0%, transparent 70%)',
        }}
      />
      
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle absolute rounded-full bg-white opacity-0"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              boxShadow: '0 0 10px rgba(255,255,255,0.5)',
            }}
          />
        ))}
      </div>

      <div 
        ref={textRef} 
        className="text-center relative z-10" 
        style={{ transformStyle: 'preserve-3d' }}
      >
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl xl:text-[10rem] font-bold text-white tracking-[0.15em] sm:tracking-[0.25em] mb-8 sm:mb-12">
          {text.split('').map((char, index) => (
            <span
              key={index}
              className="char inline-block will-change-transform"
              style={{ 
                transformOrigin: '50% 50% -100px',
                transformStyle: 'preserve-3d',
                textShadow: '0 0 1px rgba(255,255,255,0.1)',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>
        
        <p 
          className="subtext text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-300 tracking-[0.3em] sm:tracking-[0.4em] font-light"
          style={{ 
            transformStyle: 'preserve-3d',
            textShadow: '0 2px 20px rgba(255,255,255,0.1)',
          }}
        >
          WE ARE MOVEMENT
        </p>
      </div>
    </div>
  )
}