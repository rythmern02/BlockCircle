import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useMagicalCursor } from '../../../hooks/useMagicalCursor'


interface LayoutProps {
  children: ReactNode
  pageColor: string
}

export default function Layout({ children, pageColor }: LayoutProps) {
  const { position, isPointer, color } = useMagicalCursor(pageColor)

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-screen"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{ type: 'spring', damping: 10, stiffness: 50 }}
        style={{ backgroundColor: color }}
      />
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-50 mix-blend-screen"
        animate={{
          x: position.x - 8,
          y: position.y - 8,
          scale: isPointer ? 0.5 : 1,
        }}
        transition={{ type: 'spring', damping: 10, stiffness: 50 }}
        style={{ backgroundColor: color }}
      />
      {children}
    </div>
  )
}

