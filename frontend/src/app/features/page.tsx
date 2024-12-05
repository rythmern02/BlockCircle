'use client'

import { motion } from 'framer-motion'
import FeatureCard from '../components/FeatureCard'
import Timeline from '../components/Timeline'
import AnimatedText from '../components/AnimatedText'
import { Wand2, Lock, Globe, Shuffle } from 'lucide-react'

const features = [
  { 
    title: 'Tokenized Loans', 
    description: 'Summon liquidity from thin air with our mystical tokenized loan spells.',
    icon: Wand2
  },
  { 
    title: 'Zero-Knowledge Privacy', 
    description: 'Cloak your transactions in secrecy with our advanced ZKP enchantments.',
    icon: Lock
  },
  { 
    title: 'Geolocation Yield Farming', 
    description: 'Harvest yields from magical hotspots around the globe.',
    icon: Globe
  },
  { 
    title: 'Cross-Chain Compatibility', 
    description: 'Bridge the gap between realms with our inter-chain portals.',
    icon: Shuffle
  },
]

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedText 
            text="Discover the Magic of WizardFund" 
            className="text-4xl md:text-5xl font-bold text-center mb-12 text-purple-400"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <AnimatedText 
            text="Your Magical Journey" 
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-400"
          />
          <Timeline />
        </div>
      </section>

      <motion.section 
        className="py-20 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedText 
            text="Join the Wizarding World of DeFi" 
            className="text-3xl md:text-4xl font-bold mb-6 text-purple-400"
          />
          <p className="text-lg mb-8 text-gray-300">
            Embark on a mystical journey through the realms of decentralized finance. 
            Let WizardFund be your magical companion in this enchanted adventure.
          </p>
          <motion.button
            className="px-8 py-3 bg-purple-600 text-white rounded-full text-lg font-semibold hover:bg-purple-700 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Magical Journey
          </motion.button>
        </div>
      </motion.section>
    </main>
  )
}

