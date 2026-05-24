"use client";

import React from 'react';
import { motion } from 'motion/react';
import AnimateReveal from './AnimateReveal';

export default function VisionSection() {
  return (
    <section 
      id="vision-section" 
      className="relative w-full bg-white text-brown-deep z-20 overflow-hidden border-t border-warm-2"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[480px] md:min-h-[650px] relative">
        
        {/* LEFT COLUMN: The luxury design interior image */}
        <div className="relative w-full h-[320px] md:h-auto overflow-hidden">
          <img 
            src="/assets/images/elyse_living_about_1779430108456.png" 
            alt="Warm elegant living interior" 
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          {/* Subtle vignette/shading changed to warm light tone overlay to keep background pristine */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-white/10 pointer-events-none" />
        </div>

        {/* RIGHT COLUMN: Sleek Editorial white background */}
        <div className="relative w-full bg-white flex flex-col justify-end p-8 sm:p-12 md:p-16 lg:p-24 z-10 min-h-[220px] md:min-h-0">
          
          {/* SMALL PARAGRAPH OF DESCRIPTION IN LOWER RIGHT */}
          <div className="mt-auto max-w-xs md:max-w-sm xl:max-w-md ml-auto md:ml-auto md:mr-10 select-text">
            <AnimateReveal delay={0.2} duration={1.2}>
              <p className="text-brown-mid text-2xl sm:text-2xl font-normal leading-relaxed tracking-wide text-left sm:text-left select-text">
                To inspire and nurture an enriched lifestyle that harmonizes beauty, wellness, and cultural connection, creating a sanctuary that feels like home.
              </p>
            </AnimateReveal>
          </div>

        </div>

        {/* DECORATIVE OVERLAY HEADER: A VISION OF INSPIRED LIVING */}
        {/* Starts exactly at ~38% on desktop so it crosses the 50% split perfectly */}
        <div className="absolute inset-x-0 top-[18%] md:top-[12%] lg:top-[15%] z-20 pointer-events-none select-none px-6 md:px-0 md:pl-[38%] lg:pl-[37%] xl:pl-[38%]">
          <AnimateReveal duration={1.2}>
            <h2 className="text-5xl md:text-[7vw] leading-tight mb-4 text-gradient-gold uppercase font-serif">
              <span className="block font-normal">A VISION OF</span>
              <span className="block font-normal mt-1 md:mt-2">INSPIRED LIVING</span>
            </h2>
          </AnimateReveal>
        </div>

      </div>
    </section>
  );
}
