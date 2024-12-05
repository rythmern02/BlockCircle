'use client'

import { useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

export default function TeamPhilosophy() {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref)

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <section ref={ref} className="py-20 px-4 bg-gray-800 relative overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              delay: 0.5,
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400 rounded-full"
            variants={{
              hidden: {
                opacity: 0,
                scale: 0,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              },
              visible: {
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                transition: {
                  duration: Math.random() * 3 + 1,
                  repeat: Infinity,
                  repeatType: 'loop',
                },
              },
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </motion.div>
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h2 className="text-4xl font-bold mb-8 text-purple-400">Our Philosophy</h2>
        <motion.p
          className="text-xl text-gray-300 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { delay: 0.7 } },
          }}
        >
          At WizardFund, we believe in the transformative power of decentralized finance. Our mission is to democratize access to financial magic, empowering individuals to take control of their financial destinies.
        </motion.p>
        <motion.p
          className="text-xl text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { delay: 0.9 } },
          }}
        >
          We strive to create innovative, secure, and user-friendly solutions that bridge the gap between traditional finance and the exciting world of DeFi. Our team of dedicated wizards works tirelessly to ensure that every spell we cast brings value to our community.
        </motion.p>
      </div>
    </section>
  )
}

