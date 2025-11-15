'use client'

import { useEffect, useRef, useState } from 'react'
import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import About from '@/components/about'
import Skills from '@/components/skills'
import Experience from '@/components/experience'
import Projects from '@/components/projects'
import Education from '@/components/education'
import Contact from '@/components/contact'
import CursorFollower from '@/components/cursor-follower'
import ParallaxShapes from '@/components/parallax-shapes'

export default function Home() {
  useEffect(() => {
    const handleScroll = () => {
      document.querySelectorAll('.scroll-animate').forEach((el) => {
        const rect = el.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight - 100
        if (isVisible) {
          el.classList.add('slide-in-up')
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <ParallaxShapes />
      <CursorFollower />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
    </div>
  )
}
