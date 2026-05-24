"use client";

import React from 'react';
import { motion } from 'motion/react';

interface AnimateRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

/**
 * Reusable animation layout that hides overflowing translations,
 * revealing text from the bottom to the top as a premium cinematic effect.
 */
export default function AnimateReveal({
  children,
  className = '',
  delay = 0,
  duration = 1.3,
  once = true,
}: AnimateRevealProps) {
  return (
    <div className={`overflow-hidden block ${className}`}>
      <motion.div
        initial={{ y: '100%' }}
        whileInView={{ y: 0 }}
        viewport={{ once, margin: '-10%' }}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1] as const, // Premium luxury Bézier easing
        }}
        className="w-full inline-block origin-bottom"
      >
        {children}
      </motion.div>
    </div>
  );
}

interface SplitWordsRevealProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

/**
 * A specialized word-level splitter that wraps every single word in its own
 * overflow-hidden mask. This provides a staggered floating premium reveal.
 */
export function SplitWordsReveal({
  text,
  className = '',
  delay = 0,
  once = true,
}: SplitWordsRevealProps) {
  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: { y: '110%' },
    visible: {
      y: 0,
      transition: {
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1] as const, // Cinematic custom ease curve
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-10%' }}
      className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="relative overflow-hidden inline-block leading-tight">
          <motion.span variants={wordVariants} className="inline-block origin-bottom uppercase">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
