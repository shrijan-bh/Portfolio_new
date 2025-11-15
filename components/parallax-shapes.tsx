'use client'

import { useEffect, useState } from 'react'

export default function ParallaxShapes() {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating shapes with parallax */}
      <div
        className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl"
        style={{ transform: `translateY(${offset * 0.3}px)` }}
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl"
        style={{ transform: `translateY(${offset * -0.2}px)` }}
      />
      <div
        className="absolute top-1/2 left-1/3 w-96 h-96 bg-accent/5 rounded-full mix-blend-multiply filter blur-3xl"
        style={{ transform: `translateY(${offset * 0.5}px)` }}
      />
    </div>
  )
}
