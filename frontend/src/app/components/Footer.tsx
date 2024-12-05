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
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-bold text-purple-400 mb-2">WizardFund</h3>
            <p className="text-gray-400">Empowering the future of finance, one spell at a time.</p>
          </div>
          <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
              >
                <link.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">&copy; 2024 WizardFund. All rights reserved.</p>
          <nav className="mt-4 md:mt-0">
            <ul className="flex space-x-4">
              <li><a href="#" className="text-sm text-gray-400 hover:text-purple-400 transition-colors duration-300">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-purple-400 transition-colors duration-300">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-purple-400 transition-colors duration-300">Contact Us</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}

