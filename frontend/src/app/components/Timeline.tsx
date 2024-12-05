'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const timelineSteps = [
  "Connect Wallet",
  "Choose Spell",
  "Set Parameters",
  "Confirm Transaction",
  "Watch Magic Unfold"
]

export default function Timeline() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <div className="relative">
      <div className="w-full h-2 bg-gray-700 rounded-full">
        <motion.div
          className="h-full bg-purple-600 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${(activeStep / (timelineSteps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="flex justify-between mt-4">
        {timelineSteps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <motion.div
              className={`w-6 h-6 rounded-full ${index <= activeStep ? 'bg-purple-600' : 'bg-gray-700'} cursor-pointer`}
              whileHover={{ scale: 1.2 }}
              onClick={() => setActiveStep(index)}
            >
              {index <= activeStep && (
                <motion.div
                  className="w-full h-full rounded-full bg-purple-400"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.div>
            <p className="mt-2 text-sm text-gray-400">{step}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <h3 className="text-xl font-semibold mb-2 text-purple-300">{timelineSteps[activeStep]}</h3>
        <p className="text-gray-400">
          {activeStep === 0 && "Begin your magical journey by connecting your enchanted wallet."}
          {activeStep === 1 && "Browse our spellbook and choose the perfect incantation for your needs."}
          {activeStep === 2 && "Adjust the arcane parameters to fine-tune your spell's potency."}
          {activeStep === 3 && "Review and confirm your magical transaction in your grimoire."}
          {activeStep === 4 && "Sit back and watch as the ethereal forces bring your spell to life."}
        </p>
      </div>
    </div>
  )
}

