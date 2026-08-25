import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

interface DynamicBackgroundProps {
  theme: 'dark' | 'light';
}

export const DynamicBackground: React.FC<DynamicBackgroundProps> = ({ theme }) => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  // Transform background gradient opacity and position based on scroll
  const blobY1 = useTransform(smoothProgress, [0, 1], ['0%', '120%']);
  const blobY2 = useTransform(smoothProgress, [0, 1], ['0%', '-80%']);
  const blobRotate = useTransform(smoothProgress, [0, 1], [0, 360]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Organic Moving Color Field 1 (Hot Magenta/Crimson) */}
      <motion.div
        style={{ y: blobY1, rotate: blobRotate }}
        className={`absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full filter blur-[120px] opacity-25 transition-opacity duration-700 ${
          theme === 'dark' ? 'bg-[#ff2a5f]' : 'bg-[#e60040]'
        }`}
      />

      {/* Organic Moving Color Field 2 (Electric Cobalt / Blue) */}
      <motion.div
        style={{ y: blobY2 }}
        className={`absolute top-1/2 -right-32 w-[600px] h-[600px] rounded-full filter blur-[140px] opacity-20 transition-opacity duration-700 ${
          theme === 'dark' ? 'bg-[#3b82f6]' : 'bg-[#2563eb]'
        }`}
      />

      {/* Organic Moving Color Field 3 (Acid Chartreuse / Yellow) */}
      <motion.div
        style={{ y: blobY1, rotate: blobRotate }}
        className={`absolute bottom-10 left-1/3 w-[450px] h-[450px] rounded-full filter blur-[130px] opacity-15 transition-opacity duration-700 ${
          theme === 'dark' ? 'bg-[#ccff00]' : 'bg-[#84cc16]'
        }`}
      />

      {/* Soft Noise Grain Overlay */}
      <div className="absolute inset-0 bg-grain opacity-60" />

      {/* Animated Subtle Floral Outline Lines floating in background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10 stroke-current text-[var(--text-primary)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <pattern id="grid-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
          <circle cx="40" cy="40" r="1.5" fill="currentColor" opacity="0.4" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>
    </div>
  );
};
