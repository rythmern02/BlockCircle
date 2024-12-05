'use client'

import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MissionStatement from './components/MissionStatement'
import Features from './components/Features'
import FeaturesPage from './features/page'

export default function Home() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [account, setAccount] = useState<string>('')
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', moveCursor)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
    }
  }, [])

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0])
        setIsConnected(true)
      } else {
        alert('Please install MetaMask!')
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error)
    }
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white overflow-hidden">
      <div 
        className="cursor"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
        }}
      />
      <Navbar />
      <button 
        onClick={connectWallet}
        className="fixed top-4 right-4 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
      >
        {isConnected ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
      </button>
      <Hero cursorPos={cursorPos} />
      <MissionStatement />
      <FeaturesPage />
    </main>
  )
}

