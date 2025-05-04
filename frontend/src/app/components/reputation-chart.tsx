"use client"

import { useEffect, useRef } from "react"

export function ReputationChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Data points for the chart (reputation over time)
    const data = [320, 350, 410, 480, 520, 590, 650, 680, 720]
    const maxValue = Math.max(...data) * 1.1 // Add 10% padding

    // Chart settings
    const padding = 20
    const chartWidth = canvas.width - padding * 2
    const chartHeight = canvas.height - padding * 2
    const pointRadius = 4
    const lineWidth = 2

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = "rgba(1, 206, 141, 0.1)"
    ctx.lineWidth = 0.5

    // Horizontal grid lines
    for (let i = 0; i <= 4; i++) {
      const y = padding + (chartHeight / 4) * i
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(padding + chartWidth, y)
      ctx.stroke()
    }

    // Vertical grid lines
    for (let i = 0; i <= data.length - 1; i++) {
      const x = padding + (chartWidth / (data.length - 1)) * i
      ctx.beginPath()
      ctx.moveTo(x, padding)
      ctx.lineTo(x, padding + chartHeight)
      ctx.stroke()
    }

    // Draw line chart
    ctx.strokeStyle = "#01CE8D"
    ctx.lineWidth = lineWidth
    ctx.lineJoin = "round"

    // Create gradient for the area under the line
    const gradient = ctx.createLinearGradient(0, padding, 0, padding + chartHeight)
    gradient.addColorStop(0, "rgba(1, 206, 141, 0.3)")
    gradient.addColorStop(1, "rgba(1, 206, 141, 0)")

    // Draw area under the line
    ctx.beginPath()
    ctx.moveTo(padding, padding + chartHeight)

    for (let i = 0; i < data.length; i++) {
      const x = padding + (chartWidth / (data.length - 1)) * i
      const y = padding + chartHeight - (data[i] / maxValue) * chartHeight
      ctx.lineTo(x, y)
    }

    ctx.lineTo(padding + chartWidth, padding + chartHeight)
    ctx.closePath()
    ctx.fillStyle = gradient
    ctx.fill()

    // Draw the line
    ctx.beginPath()

    for (let i = 0; i < data.length; i++) {
      const x = padding + (chartWidth / (data.length - 1)) * i
      const y = padding + chartHeight - (data[i] / maxValue) * chartHeight

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }

    ctx.stroke()

    // Draw points
    for (let i = 0; i < data.length; i++) {
      const x = padding + (chartWidth / (data.length - 1)) * i
      const y = padding + chartHeight - (data[i] / maxValue) * chartHeight

      ctx.beginPath()
      ctx.arc(x, y, pointRadius, 0, Math.PI * 2)
      ctx.fillStyle = "#01CE8D"
      ctx.fill()
      ctx.strokeStyle = "#000"
      ctx.lineWidth = 1
      ctx.stroke()
    }

    // Draw latest value
    const latestValue = data[data.length - 1]
    const latestX = padding + chartWidth
    const latestY = padding + chartHeight - (latestValue / maxValue) * chartHeight

    ctx.beginPath()
    ctx.arc(latestX, latestY, pointRadius * 1.5, 0, Math.PI * 2)
    ctx.fillStyle = "#01CE8D"
    ctx.fill()
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 1
    ctx.stroke()

    // Draw glow effect on the latest point
    ctx.beginPath()
    ctx.arc(latestX, latestY, pointRadius * 3, 0, Math.PI * 2)
    const glowGradient = ctx.createRadialGradient(latestX, latestY, pointRadius, latestX, latestY, pointRadius * 3)
    glowGradient.addColorStop(0, "rgba(1, 206, 141, 0.5)")
    glowGradient.addColorStop(1, "rgba(1, 206, 141, 0)")
    ctx.fillStyle = glowGradient
    ctx.fill()
  }, [])

  return (
    <div className="relative h-40 w-full overflow-hidden rounded-md border border-green-500/20 p-2">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}
