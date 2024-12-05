'use client'

import { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import TeamPhilosophy from './_components/TeamPhilosophy'
import DynamicHeader from './_components/DynamicHeader'
import FounderCards from './_components/FounderCards'
import ProgressTimeline from './_components/ProgressTimeline'

export default function AboutPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY })
    }

    window.addEventListener('mousemove', updateMousePosition)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])

  return (
    <main className="min-h-screen bg-gray-900 text-white overflow-hidden">
        
      <DynamicHeader mousePosition={mousePosition} />
      <FounderCards />
      <ProgressTimeline />
      <TeamPhilosophy />
      <Footer />
    </main>
  )
}

