'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [secretSequence, setSecretSequence] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase()
      if (['S', 'H', 'E'].includes(key)) {
        setSecretSequence(prev => {
          const newSequence = [...prev, key].slice(-3)
          if (newSequence.join('') === 'SHE') {
            router.push('/admin')
            return []
          }
          return newSequence
        })
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [router])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const { clientX, clientY } = e
      const { width, height, top, left } = containerRef.current.getBoundingClientRect()
      const x = (clientX - left - width / 2) / 50
      const y = (clientY - top - height / 2) / 50

      containerRef.current.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`
    }

    const handleMouseLeave = () => {
      if (containerRef.current) {
        containerRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden pb-20">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse opacity-50"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse opacity-50 animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-accent/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse opacity-30 animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Profile badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-6 slide-in-down">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          <span className="text-sm text-primary font-medium">Full-Stack Developer & Designer</span>
        </div>

        {/* Main heading with parallax effect */}
        <div
          ref={containerRef}
          className="transition-transform duration-300"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <h1 className="text-5xl sm:text-7xl font-bold mb-4 slide-in-up">
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Shrijan
            </span>
            <br />
            <span className="text-foreground">Bhandari</span>
          </h1>
        </div>

        <p className="text-lg sm:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto slide-in-up">
          Full-Stack Developer <span className="text-primary">|</span> Data Specialist <span className="text-primary">|</span> Software Engineer
        </p>

        <p className="text-base sm:text-lg text-muted-foreground/80 mb-12 max-w-2xl mx-auto slide-in-up">
          A versatile developer skilled in programming, data processing, and full-stack development. Passionate about performance, UX, and modern engineering.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center slide-in-up">
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 flex items-center justify-center gap-2"
          >
            View Projects
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          <a
            href="/resume.pdf"
            className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-all duration-300"
          >
            Download Resume
          </a>
        </div>

        <div className="relative mt-20 pt-8 flex justify-center">
          <svg className="w-6 h-6 text-primary animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
