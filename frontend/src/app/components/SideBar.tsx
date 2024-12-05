'use client'

import { useState } from 'react'
import { BarChart, Wallet, Award, Settings, Zap } from 'lucide-react'

export default function Sidebar({ activeTab, setActiveTab }: any) {
  const menuItems = [
    { name: 'Dashboard', icon: <BarChart className="mr-2" />, id: 'dashboard', color: 'from-purple-500 to-pink-500' },
    { name: 'My Contributions', icon: <Wallet className="mr-2" />, id: 'contributions', color: 'from-green-500 to-teal-500' },
    { name: 'Auctions', icon: <Award className="mr-2" />, id: 'auctions', color: 'from-yellow-500 to-orange-500' },
    { name: 'Lottery', icon: <Zap className="mr-2" />, id: 'lottery', color: 'from-blue-500 to-indigo-500' },
    { name: 'Settings', icon: <Settings className="mr-2" />, id: 'settings', color: 'from-red-500 to-pink-500' },
  ]

  return (
    <aside className="w-64 bg-gray-800 p-4 rounded-lg shadow-lg">
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`w-full text-left flex items-center py-2 px-4 rounded-lg transition-all duration-300 ease-in-out ${
              activeTab === item.id
                ? `bg-gradient-to-r ${item.color} text-white`
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
            onClick={() => setActiveTab(item.id)}
          >
            {item.icon}
            {item.name}
          </button>
        ))}
      </nav>
    </aside>
  )
}
