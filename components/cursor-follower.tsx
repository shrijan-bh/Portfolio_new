'use client'

import { useEffect, useRef } from 'react'

export default function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      ref={cursorRef}
      className="fixed w-8 h-8 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50 hidden lg:block"
      style={{
        boxShadow: '0 0 20px rgba(6, 182, 212, 0.6)',
        borderRadius: '50%',
        border: '2px solid rgba(6, 182, 212, 0.8)',
      }}
    />
  )
}
