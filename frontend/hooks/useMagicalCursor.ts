import { useState, useEffect } from 'react'

export const useMagicalCursor = (color: string) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const updateCursor = () => {
      const target = document.elementFromPoint(position.x, position.y)
      setIsPointer(window.getComputedStyle(target as Element).cursor === 'pointer')
    }

    window.addEventListener('mousemove', updatePosition)
    window.addEventListener('mouseover', updateCursor)

    return () => {
      window.removeEventListener('mousemove', updatePosition)
      window.removeEventListener('mouseover', updateCursor)
    }
  }, [position])

  return { position, isPointer, color }
}

