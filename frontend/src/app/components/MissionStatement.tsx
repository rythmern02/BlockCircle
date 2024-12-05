'use client'

import { forwardRef, useEffect, useRef } from 'react'
import { Wand2, Rocket, Shield } from 'lucide-react'

export default function MissionStatement() {
  const iconRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('light-up')
          } else {
            entry.target.classList.remove('light-up')
          }
        })
      },
      { threshold: 0.5 }
    )

    iconRefs.current.forEach((icon) => {
      if (icon) observer.observe(icon)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="mission" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 text-purple-400">Our Mission</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <MissionItem
            icon={<Wand2 size={40} />}
            title="Innovative Magic"
            description="Crafting cutting-edge DeFi spells for the modern wizard."
            ref={(el): any => (iconRefs.current[0] = el)}
          />
          <MissionItem
            icon={<Rocket size={40} />}
            title="Cosmic Growth"
            description="Propelling your assets to new dimensions of prosperity."
            ref={(el): any => (iconRefs.current[1] = el)}
          />
          <MissionItem
            icon={<Shield size={40} />}
            title="Arcane Security"
            description="Shielding your treasure with impenetrable mystical barriers."
            ref={(el): any => (iconRefs.current[2] = el)}
          />
        </div>
      </div>
    </section>
  )
}

const MissionItem = forwardRef(({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }, ref: React.Ref<HTMLDivElement>) => (
  <div className="text-center" ref={ref}>
    <div className="inline-block p-4 bg-gray-700 rounded-full mb-4 transition-all duration-300">
      {icon}
    </div>
    <h3 className="text-2xl font-semibold mb-2 text-purple-300">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
))

