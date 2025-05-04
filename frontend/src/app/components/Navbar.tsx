'use client'

import Link from 'next/link'
import React, {useState, useEffect} from "react";
import { ethers, Provider } from 'ethers';
declare var ethereum: any;


export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [signer, setSigner] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)

    checkMetaMask();

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const checkMetaMask = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.BrowserProvider(window.ethereum);
      try {
        const accounts = await provider.listAccounts();
        const signer = provider.getSigner()
        const wallet = await (await signer).getAddress()
        setSigner(wallet)
        
        if (accounts.length > 0) {
          setIsConnected(true)

          const network = await provider.getNetwork();
          if(network.chainId !== BigInt(656476)){
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0xa045c' }],
            });
          }
        } else {
          setIsConnected(false)
        }
      } catch (error) {
        console.error('Error checking MetaMask connection:', error)
        setIsConnected(false)
      }
    } else {
      setIsConnected(false)
    }
  }

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask to use this feature')
      return
    }

    try {
      setIsConnecting(true)
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      await checkMetaMask();
    } catch (error) {
      console.error('Error connecting wallet:', error)
      alert('Failed to connect wallet')
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setSigner('')
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-[#01CE8D]/20' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-[#01CE8D] relative group">
              BlockCircle
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#01CE8D]/70 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/dashboard">Dashboard</NavLink>
              <NavLink href="/borrowing">Borrow</NavLink>
              <NavLink href="/about">About us</NavLink>
              
              {/* Wallet Connection Button */}
              <button
                onClick={isConnected ? disconnectWallet : connectWallet}
                disabled={isConnecting}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  isConnected
                    ? 'bg-black hover:bg-black/80 text-white border border-[#01CE8D]/30 hover:border-[#01CE8D]/60'
                    : 'bg-[#01CE8D] hover:bg-[#01CE8D]/90 text-black hover:shadow-lg hover:shadow-[#01CE8D]/20'
                } ${isConnecting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isConnecting ? (
                  'Connecting...'
                ) : isConnected ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-[#01CE8D]"></div>
                    <span>{`${signer.slice(0, 6)}...${signer.slice(-4)}`}</span>
                  </div>
                ) : (
                  'Connect Wallet'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-[#01CE8D] hover:bg-black/40 transition-all duration-300 relative group"
    >
      {children}
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#01CE8D]/50 group-hover:w-4/5 transition-all duration-300"></span>
    </Link>
  )
}

