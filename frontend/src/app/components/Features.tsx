'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const features = [
  { title: 'Spell Staking', description: 'Lock your magical tokens and watch them multiply.' },
  { title: 'Potion Swapping', description: 'Instantly exchange your mystical assets with no slippage.' },
  { title: 'Crystal Ball Predictions', description: 'AI-powered market insights to guide your enchanted investments.' },
  { title: 'Wizards Council', description: 'Decentralized governance for the magical realm.' },
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 text-purple-400">Magical Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} title={feature.title} description={feature.description} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <motion.div
      className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer perspective"
      whileHover={{ scale: 1.05 }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full transition-all duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        <div className="front absolute w-full h-full backface-hidden">
          <div className="p-6 h-full flex flex-col justify-between">
            <h3 className="text-xl font-semibold mb-2 text-purple-300">{title}</h3>
            <div className="magical-sparkle" />
          </div>
        </div>
        <div className="back absolute w-full h-full backface-hidden" style={{ transform: 'rotateY(180deg)' }}>
          <div className="p-6 h-full flex items-center justify-center">
            <p className="text-gray-300">{description}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

