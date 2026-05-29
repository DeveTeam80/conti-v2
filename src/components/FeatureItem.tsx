"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface FeatureItemProps {
  label: string;
  value: string;
  sub?: string;
  delay?: number;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ label, value, sub, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative group p-8 md:p-10 rounded-[35px] border border-gold/30 overflow-hidden"
    >
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-brown-deep transition-colors duration-500 group-hover:bg-brown-deep" />
      
      <div className="relative z-10 flex items-center justify-between gap-6">
        <div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-4xl md:text-6xl font-bold text-gradient-gold">
              {value}
            </span>
            {sub && (
              <span className="text-sm md:text-lg font-bold text-gradient-gold font-light uppercase tracking-widest">
                {sub}
              </span>
            )}
          </div>
          <p className="text-xs md:text-sm font-bold text-gradient-gold uppercase tracking-[0.3em] group-hover:text-secondary/80 transition-colors duration-500">
            {label}
          </p>
        </div>
        
      </div>

      {/* Hover Shine Effect */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
    </motion.div>
  );
};

export default FeatureItem;