"use client";

import React from 'react';
import { motion } from 'motion/react';
import AnimateReveal from './AnimateReveal';

export default function StatsSection() {
  return (
    <section 
      id="residence-attributes font-sans" 
      className="relative w-full bg-white text-brown-deep py-28 px-6 md:px-12 lg:px-24 border-t border-warm-2 overflow-hidden z-20"
    >
      {/* Decorative premium architectural coordinates grid backgrounds */}
      <div className="absolute top-0 left-12 w-[1px] h-full bg-warm-2/45 pointer-events-none" />
      <div className="absolute top-0 right-12 w-[1px] h-full bg-warm-2/45 pointer-events-none" />

      <div className="max-w-9xl mx-auto relative">
        
        {/* SMALL INTRODUCTORY STRAPLINE LEVEL */}
        <div className="mb-20">
          <AnimateReveal duration={1.1}>
            <span className="font-serif text-[10px] sm:text-2xl md:text-2xl tracking-[0.3em] text-gold-b uppercase block">
              (BY THE NUMBERS)
            </span>
          </AnimateReveal>
          <AnimateReveal delay={0.08} duration={1.2}>
            <h2 className="font-serif text-2xl md:text-3xl tracking-wide uppercase text-brown-deep mt-2">
              QUANTITATIVE EXCELLENCE
            </h2>
          </AnimateReveal>
        </div>

        {/* ASYMMETRIC LANDSCAPE STRUCTURE FOR STATS */}
        <div className="space-y-16 lg:space-y-12">
          
          {/* ROW 1: Right-aligned stats block */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            {/* Left Spacer Column (takes 5 cols on lg, empty) */}
            <div className="hidden md:block lg:col-span-5 md:col-span-4" />
            
            {/* Stat: 60% */}
            <div className="lg:col-span-3 md:col-span-4 flex flex-col justify-start">
              <AnimateReveal duration={1.3}>
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-7xl sm:text-8xl lg:text-[6.5vw] xl:text-[7vw] leading-none tracking-tight font-normal text-brown-deep">
                    60
                  </span>
                  <span className="font-serif text-3xl sm:text-4xl lg:text-[2.2vw] leading-none font-normal text-gold-b">
                    %
                  </span>
                </div>
              </AnimateReveal>
              <AnimateReveal delay={0.15} duration={1.2} className="mt-4">
                <p className="text-2xl md:text-base text-brown-mid font-normal leading-relaxed max-w-xs select-text">
                  green spaces for tranquility & wellness.
                </p>
              </AnimateReveal>
            </div>

            {/* Stat: 30 */}
            <div className="lg:col-span-4 md:col-span-4 flex flex-col justify-start">
              <AnimateReveal duration={1.3} delay={0.1}>
                <div className="flex items-baseline">
                  <span className="font-serif text-7xl sm:text-8xl lg:text-[6.5vw] xl:text-[7vw] leading-none tracking-tight font-normal text-brown-deep">
                    30
                  </span>
                </div>
              </AnimateReveal>
              <AnimateReveal delay={0.25} duration={1.2} className="mt-4">
                <p className="text-2xl md:text-base text-brown-mid font-normal leading-relaxed max-w-xs select-text">
                  exclusive residences, each tailored for comfort & elegance.
                </p>
              </AnimateReveal>
            </div>
          </div>

          {/* ROW 2: Left-aligned stats block */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            {/* Stat: 150k sq. ft. */}
            <div className="lg:col-span-7 md:col-span-8 flex flex-col justify-start md:pl-6 lg:pl-12">
              <AnimateReveal duration={1.4}>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-7xl sm:text-8xl lg:text-[7.2vw] xl:text-[8vw] leading-none tracking-tight font-normal text-brown-deep">
                    150k
                  </span>
                  <span className="font-serif text-2xl sm:text-3xl lg:text-[1.8vw] leading-none font-normal text-brown-mid/70 whitespace-nowrap">
                    sq. ft.
                  </span>
                </div>
              </AnimateReveal>
              <AnimateReveal delay={0.18} duration={1.2} className="mt-4">
                <p className="text-2xl md:text-base text-brown-mid font-normal leading-relaxed max-w-sm select-text">
                  green spaces for tranquility & wellness.
                </p>
              </AnimateReveal>
            </div>

            {/* Right spacer column */}
            <div className="hidden md:block lg:col-span-5 md:col-span-4" />
          </div>

          {/* ROW 3: Center-aligned stats block */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            {/* Spacer Column */}
            <div className="hidden md:block lg:col-span-4 md:col-span-3" />
            
            {/* Stat: 24/7 */}
            <div className="lg:col-span-5 md:col-span-6 flex flex-col justify-start md:pl-12">
              <AnimateReveal duration={1.4} delay={0.15}>
                <div className="flex items-baseline">
                  <span className="font-serif text-7xl sm:text-8xl lg:text-[7.5vw] xl:text-[8vw] leading-none tracking-tight font-normal text-brown-deep">
                    24/7
                  </span>
                </div>
              </AnimateReveal>
              <AnimateReveal delay={0.28} duration={1.2} className="mt-4">
                <p className="text-2xl md:text-base text-brown-mid font-normal leading-relaxed max-w-sm select-text">
                  concierge services, meeting every need effortlessly.
                </p>
              </AnimateReveal>
            </div>

            {/* Spacer Column */}
            <div className="hidden md:block lg:col-span-3 md:col-span-3" />
          </div>

        </div>

      </div>
    </section>
  );
}
