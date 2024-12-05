"use client";

import { motion } from "framer-motion";

interface DynamicHeaderProps {
  mousePosition: { x: number; y: number };
}

export default function DynamicHeader({ mousePosition }: any) {
  return (
    <header className="relative h-96 flex items-center justify-center overflow-hidden">
       <div className="absolute inset-0 overflow-hidden">
        <div className="stars" />
        <div className="twinkling" />
      </div>
      <motion.div
        className="absolute inset-0 bg-black opacity-50"
        animate={{
          backgroundPosition: `${mousePosition.x / 5}px ${
            mousePosition.y / 5
          }px`,
        }}
        transition={{ type: "spring", damping: 10, stiffness: 100 }}
      />
      <motion.h1
        className="text-6xl font-bold text-white z-10"
        animate={{
          textShadow: `0 0 8px rgb(${
            Math.sin(mousePosition.x * 0.01) * 127 + 128
          }, ${Math.sin(mousePosition.y * 0.01) * 127 + 128}, 255)`,
        }}
      >
        About WizardFund
      </motion.h1>
      <motion.div
        className="absolute w-8 h-8 bg-white rounded-full opacity-50 pointer-events-none"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </header>
  );
}
