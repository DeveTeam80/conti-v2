"use client";

import React from 'react';
import { motion } from 'motion/react';
import { 
  Compass, 
  Wind, 
  Layers, 
  Sun,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

interface CardData {
  id: number;
  num: string;
  icon: React.ComponentType<{ className?: string; size?: number | string }>;
  title: string;
  description: string;
  accentText: string;
}

const CARDS_DATA: CardData[] = [
  {
    id: 1,
    num: '01',
    icon: Compass,
    title: 'Travertine Quarry',
    description: 'Sourced directly from Tuscan valleys, every block of travertine is hand-selected representing centuries of structural integrity, organic patterning, and deep geological character.',
    accentText: 'ITALIAN TRAVERTINE'
  },
  {
    id: 2,
    num: '02',
    icon: Sun,
    title: 'Lumnis Aura Skylines',
    description: 'Curated double-aspect elevations designed precisely with solar orientation in mind, capturing dynamic golden rays and diffuse light through performance sound-damped floor glazing.',
    accentText: 'DOUBLE-ASPECT GLAZING'
  },
  {
    id: 3,
    num: '03',
    icon: Layers,
    title: 'Mivan Monoliths',
    description: 'Constructed utilising continuous cast aluminium formwork grids that guarantee millimeter-precise jointing, high thermal isolation, and lifetime water-tight reassurance.',
    accentText: 'ALUMINIUM MONOLITHIC CAST'
  },
  {
    id: 4,
    num: '04',
    icon: Wind,
    title: 'Sanctuary Terraces',
    description: 'Deep cantilevers sheltering private outdoor pocket gardens on alternating floor planes, pre-established with mature perimeter foliage and automated micro-drip irrigation.',
    accentText: 'SELF-SUSTAINING PERIMETERS'
  }
];

export default function GlassCardsSection() {
  return (
    <section 
      id="residence-highlights" 
      className="relative w-full bg-[#faf8f4] py-24 md:py-32 px-6 sm:px-12 md:px-16 border-t border-warm-2 overflow-hidden z-20"
    >
      {/* Absolute decorative high-contrast ambient gold & terracotta glow patterns to showcase refraction through the frosted glass */}
      <div className="absolute top-[10%] left-[-15%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-tr from-gold-a/20 to-amber-200/10 blur-[130px] pointer-events-none animate-pulse duration-[12s]" />
      <div className="absolute bottom-[10%] right-[-15%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-gold-b/15 to-rose-200/10 blur-[160px] pointer-events-none animate-pulse duration-[16s]" />
      <div className="absolute top-[45%] left-[25%] w-[25vw] h-[25vw] rounded-full bg-orange-100/15 blur-[100px] pointer-events-none" />
      <div className="absolute top-[30%] right-[20%] w-[30vw] h-[30vw] rounded-full bg-amber-100/15 blur-[110px] pointer-events-none" />

      <div className="max-w-9xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24 select-none">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-brown-mid/30" />
              <span className="text-[15px] font-sans text-brown-mid tracking-[0.2em] uppercase">
                Structural Baseline
              </span>
            </div>
            
            <h2 className="font-serif text-4xl sm:text-5xl md:text-[54px] leading-[1.1] tracking-[0.02em] font-normal text-brown-deep uppercase">
              The Artisan <br />
              <span className="font-serif font-normal text-brown-mid">Core Values.</span>
            </h2>
          </div>
          
          <div className="max-w-md">
            <p className="font-sans text-2xl text-brown-mid font-normal leading-relaxed tracking-wide select-text">
              Every millimeter of Elyse represents a deliberate, high-contrast structural philosophy. We build single-site signatures where premium materials are the standard, never downplayed.
            </p>
          </div>
        </div>

        {/* 4 Grid Columns of Glass morphed cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {CARDS_DATA.map((card, idx) => {
            const IconComponent = card.icon;
            
            return (
              <motion.div
                key={card.id}
                id={`glass-card-${card.id}`}
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px -5% 0px", amount: 0.1 }}
                transition={{ 
                  duration: 0.95, 
                  delay: idx * 0.15, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                whileHover={{ 
                  y: -6, 
                  boxShadow: '0 24px 50px rgba(139, 115, 85, 0.12)',
                  backgroundColor: 'rgba(255, 255, 255, 0.45)',
                  borderColor: 'rgba(255, 255, 255, 0.95)',
                  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                }}
                className="relative flex flex-col justify-between p-8 min-h-[390px] rounded-[28px] bg-white/25 backdrop-blur-[24px] border border-white/65 shadow-[0_8px_32px_rgba(139,115,85,0.04)] hover:shadow-[0_24px_50px_rgba(139,115,85,0.12)] transition-all duration-500 overflow-hidden group hover:border-gold-mid/40"
              >
                {/* Frosted Shimmer Sheen effect overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Decorative delicate gold edge highlight line on top */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold-mid/0 to-transparent group-hover:via-gold-mid/40 transition-all duration-700" />

                {/* Card Top: Numbering and Luxurious Micro Icon */}
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-10 select-none">
                    <span className="font-serif text-[13px] text-brown-mid/60 tracking-wider font-normal">
                      ({card.num})
                    </span>
                    <div className="p-2.5 rounded-full bg-white/75 backdrop-blur-md border border-white/60 text-brown-mid/80 group-hover:text-gold-b group-hover:border-gold-b/30 group-hover:bg-white/90 shadow-xs transition-all duration-300">
                      <IconComponent size={16} />
                    </div>
                  </div>

                  {/* Main Title & Descriptive Narrative */}
                  <h3 className="font-serif text-[22px] sm:text-[24px] leading-tight text-brown-deep tracking-wide font-normal uppercase mb-4 group-hover:text-gold-b transition-colors duration-300">
                    {card.title}
                  </h3>
                  
                  <p className="font-sans text-[12px] text-brown-mid/85 font-normal leading-relaxed tracking-wide select-text">
                    {card.description}
                  </p>
                </div>

                {/* Card Footer: Subtle aesthetic indicator & hover link */}
                <div className="relative z-10 mt-8 pt-5 border-t border-white/50 flex items-center justify-between select-none">
                  <span className="font-sans text-[9px] text-brown-mid/60 tracking-widest font-semibold uppercase">
                    {card.accentText}
                  </span>
                  
                  <div className="w-6 h-6 rounded-full border border-brown-deep/10 bg-white/30 text-brown-mid flex items-center justify-center group-hover:bg-brown-deep group-hover:text-white group-hover:border-brown-deep transition-all duration-300">
                    <ArrowUpRight size={10} className="group-hover:rotate-45 transition-transform duration-300" />
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
