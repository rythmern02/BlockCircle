'use client'

import { motion } from 'framer-motion'

const milestones = [
  { year: 2021, title: 'WizardFund Conception', description: 'The magical idea is born' },
  { year: 2022, title: 'Seed Funding', description: 'Raised $5M in seed round' },
  { year: 2023, title: 'Beta Launch', description: 'First spells cast in the wild' },
  { year: 2024, title: 'Global Expansion', description: 'Spreading magic worldwide' },
]

export default function ProgressTimeline() {
  return (
    <section className="py-20 px-4 bg-gray-900">
      <h2 className="text-4xl font-bold text-center mb-12 text-purple-400">Timeline of Progress</h2>
      <div className="max-w-4xl mx-auto relative">
        {milestones.map((milestone, index) => (
          <motion.div
            key={milestone.year}
            className="flex items-center mb-8"
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <motion.div
              className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold z-10"
              whileHover={{ scale: 1.2, boxShadow: '0 0 15px rgba(147, 51, 234, 0.7)' }}
            >
              {milestone.year}
            </motion.div>
            <motion.div
              className="flex-grow ml-4 bg-gray-800 p-4 rounded-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-bold text-purple-300">{milestone.title}</h3>
              <p className="text-gray-400">{milestone.description}</p>
            </motion.div>
          </motion.div>
        ))}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-purple-600" />
      </div>
    </section>
  )
}

