'use client'

import { motion } from 'framer-motion'
import { type LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
}

export default function FeatureCard({ title, description, icon: Icon }: FeatureCardProps) {
  return (
    <motion.div
      className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-16 h-16 mb-4 mx-auto bg-purple-600 rounded-full flex items-center justify-center"
        whileHover={{ scale: 1.1, rotate: 360 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Icon className="w-8 h-8 text-white" />
      </motion.div>
      <h3 className="text-xl font-semibold mb-2 text-center text-purple-300">{title}</h3>
      <p className="text-gray-400 text-center">{description}</p>
      <div className="mt-4 flex justify-center">
        <motion.button
          className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-semibold hover:bg-purple-700 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More
        </motion.button>
      </div>
    </motion.div>
  )
}

