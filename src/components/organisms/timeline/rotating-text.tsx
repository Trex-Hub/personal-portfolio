'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { JSX } from 'react/jsx-runtime';

interface AnimatedTextProps {
  text: string | string[];
  interval?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export function AnimatedText({
  text,
  interval = 3000,
  className = '',
  as: Component = 'span',
}: AnimatedTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Convert single string to array for consistent handling
  const textArray = Array.isArray(text) ? text : [text];
  const shouldAnimate = Array.isArray(text) && text.length > 1;

  useEffect(() => {
    if (!shouldAnimate) return;

    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % textArray.length);
    }, interval);

    return () => clearInterval(timer);
  }, [textArray.length, interval, shouldAnimate]);

  if (!shouldAnimate) {
    return <Component className={className}>{textArray[0]}</Component>;
  }

  return (
    <Component className={`relative inline-block overflow-hidden ${className}`}>
      <AnimatePresence mode='wait'>
        <motion.span
          key={currentIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
            opacity: { duration: 0.2 },
          }}
          className='block'>
          {textArray[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </Component>
  );
}

// Export with old name for backward compatibility
export const RotatingText = AnimatedText;
