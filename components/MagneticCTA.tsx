'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticCTAProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  disabled?: boolean;
}

export default function MagneticCTA({ 
  children, 
  onClick, 
  className = '',
  disabled = false
}: MagneticCTAProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    
    // Calculate distance from center
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    
    // Move the button slightly towards the cursor (magnetic effect)
    // Dividing by a factor reduces the movement range relative to cursor
    setPosition({ x: x / 3, y: y / 3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative overflow-hidden
        px-8 py-4 rounded-full 
        font-bold text-white tracking-wide
        bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500
        bg-[length:200%_auto] animate-shimmer
        shadow-lg shadow-orange-500/30
        hover:shadow-xl hover:shadow-orange-500/50
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-300
        ${className}
      `}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      
      {/* Optional: Glow effect on hover */}
      <motion.div
        className="absolute inset-0 -z-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 hover:opacity-100 transition-opacity duration-300"
      />
    </motion.button>
  );
}
