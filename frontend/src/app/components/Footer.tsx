'use client'

import { motion } from 'framer-motion'
import { FaTwitter, FaDiscord, FaGithub, FaMedium } from 'react-icons/fa'

const socialLinks = [
  { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: FaDiscord, href: '#', label: 'Discord' },
  { icon: FaGithub, href: '#', label: 'GitHub' },
  { icon: FaMedium, href: '#', label: 'Medium' },
]

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 border-t border-[#01CE8D]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-bold text-[#01CE8D] mb-2 flex items-center">
              <span className="relative">
                BlockCircle
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#01CE8D] to-transparent"></div>
              </span>
            </h3>
            <p className="text-gray-400">Redefining decentralized finance, one circle at a time.</p>
          </div>
          <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                className="text-gray-400 hover:text-[#01CE8D] transition-colors duration-300"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <link.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>
        </div>
        
        <div className="mt-10 pt-8 flex flex-col md:flex-row justify-between items-center relative">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#01CE8D]/30 to-transparent"></div>
          
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-black border border-[#01CE8D]/20 rounded-lg px-4 py-2 shadow-sm"
            >
              <p className="text-gray-300 text-sm">&copy; 2024 BlockCircle. All rights reserved.</p>
            </motion.div>
          </div>
          
          <nav className="mt-6 md:mt-0">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <li>
                <motion.a 
                  href="#" 
                  className="text-sm text-gray-400 hover:text-[#01CE8D] transition-colors duration-300 relative group"
                  whileHover={{ y: -1 }}
                >
                  Privacy Policy
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#01CE8D] transition-all duration-300 group-hover:w-full"></span>
                </motion.a>
              </li>
              <li>
                <motion.a 
                  href="#" 
                  className="text-sm text-gray-400 hover:text-[#01CE8D] transition-colors duration-300 relative group"
                  whileHover={{ y: -1 }}
                >
                  Terms of Service
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#01CE8D] transition-all duration-300 group-hover:w-full"></span>
                </motion.a>
              </li>
              <li>
                <motion.a 
                  href="#" 
                  className="text-sm text-gray-400 hover:text-[#01CE8D] transition-colors duration-300 relative group"
                  whileHover={{ y: -1 }}
                >
                  Contact Us
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#01CE8D] transition-all duration-300 group-hover:w-full"></span>
                </motion.a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}

