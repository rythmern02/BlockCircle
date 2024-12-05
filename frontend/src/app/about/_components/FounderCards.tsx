'use client'

import { motion } from 'framer-motion'

const founders = [
  {
    name: 'Swarna Nagrani',
    role: 'Co-Founder & CEO',
    image: '/rythme.jpg',
    bio: 'Swarna brings years of experience in traditional finance and blockchain technology.',
  },
  {
    name: 'Rythme Nagrani',
    role: 'Co-Founder & CTO',
    image: '/rythme.jpg',
    bio: 'Rythme is a visionary technologist with a passion for decentralized systems.',
  },
]

export default function FounderCards() {
  return (
    <section className="py-20 px-4 bg-gray-800">
      <h2 className="text-4xl font-bold text-center mb-12 text-purple-400">Our Founders</h2>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        {founders.map((founder, index) => (
          <motion.div
            key={founder.name}
            className="bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-purple-500/50 transition-shadow duration-300"
            whileHover={{ scale: 1.05, rotateY: 5 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="relative h-80">
              <img
                src={founder.image}
                alt={founder.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-white">{founder.name}</h3>
                <p className="text-purple-300">{founder.role}</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-300">{founder.bio}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
