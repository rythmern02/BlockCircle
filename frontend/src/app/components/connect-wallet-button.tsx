"use client"

import { useState } from "react"
import { Wallet } from "lucide-react"
import { Button, type ButtonProps } from "@/components/ui/button"

interface ConnectWalletButtonProps extends ButtonProps {}

export function ConnectWalletButton({ className, variant = "default", size, ...props }: ConnectWalletButtonProps) {
  const [connecting, setConnecting] = useState(false)

  const handleConnect = () => {
    setConnecting(true)

    // Simulate connection delay
    setTimeout(() => {
      setConnecting(false)
    }, 1500)
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleConnect}
      disabled={connecting}
      {...props}
    >
      <Wallet className="mr-2 h-4 w-4" />
      {connecting ? "Connecting..." : "Connect Wallet"}
    </Button>
  )
}
