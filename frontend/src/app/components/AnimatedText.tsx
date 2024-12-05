'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface AnimatedTextProps {
  text: string
  className?: string
}

export default function AnimatedText({ text, className = '' }: AnimatedTextProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.h2
      ref={ref}
      className={`${className} overflow-hidden`}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ staggerChildren: 0.05 }}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={letterVariants}
          transition={{ type: "spring", damping: 12, stiffness: 200 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.h2>
  )
}

