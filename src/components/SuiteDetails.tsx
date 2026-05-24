"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Home, Award, Droplets, Layers, ShieldCheck, Wind, Sparkles } from 'lucide-react';
import { Suite, MaterialItem } from '../types';
import AnimateReveal from './AnimateReveal';

interface SuiteDetailsProps {
  suite: Suite;
}

// Icon resolver for dynamic rendering of lucide-icons based on string specifications in data.ts
const IconMap: { [key: string]: React.ComponentType<{ size?: number | string; className?: string }> } = {
  Compass,
  Home,
  Award,
  Droplets,
  Layers,
  ShieldCheck,
  Wind,
  Sparkles
};

export default function SuiteDetails({ suite }: SuiteDetailsProps) {
  const [activeMaterial, setActiveMaterial] = useState<MaterialItem>(suite.materials[0]);

  // Handle auto-updating selected material if we switch suites (prevent stale state displays)
  const isMaterialInSuite = suite.materials.some(m => m.name === activeMaterial.name);
  const currentMaterial = isMaterialInSuite ? activeMaterial : suite.materials[0];

  return (
    <section id="residence-specifications" className="relative w-full bg-[#faf8f4] text-brown-deep py-20 px-6 md:px-12 lg:px-20 border-t border-warm-2 z-20">
      <div className="max-w-9xl mx-auto">
        
        {/* Editorial Subheader Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          <div className="lg:col-span-5 space-y-3">
            <AnimateReveal duration={1.1}>
              <span className="text-[10px] font-semibold tracking-[0.3em] text-gold-b uppercase block">
                ARCHITECTURAL FORM
              </span>
            </AnimateReveal>
            <AnimateReveal delay={0.1} duration={1.2}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif tracking-wide text-brown-deep font-normal leading-tight uppercase">
                The {suite.menuLabel} Specification
              </h2>
            </AnimateReveal>
          </div>
          <div className="lg:col-span-7 flex flex-col justify-end">
            <AnimateReveal delay={0.15} duration={1.3}>
              <p className="text-brown-mid font-sans text-2xl md:text-base leading-relaxed font-normal max-w-2xl select-text">
                Every detail is meticulously engineered to compose a serene framework for high-living. We integrate artisan stone surfaces, custom-milled timbers, and cutting-edge closed-loop air filtration to assure perfect structural restoration.
              </p>
            </AnimateReveal>
          </div>
        </div>

        {/* Structural Matrices Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white border border-warm-2 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
            <span className="text-[10px] font-semibold tracking-widest text-brown-mid/60 uppercase">
              VERTICAL LEVEL
            </span>
            <h3 className="text-2xl font-serif text-brown-deep tracking-wide mt-3 select-text">
              {suite.location}
            </h3>
            <p className="text-2xl text-brown-mid mt-2">
              Exclusive orientation with dedicated private lift lobbies.
            </p>
          </div>
          <div className="bg-white border border-warm-2 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
            <span className="text-[10px] font-semibold tracking-widest text-brown-mid/60 uppercase">
              CEILING CLEARANCE
            </span>
            <h3 className="text-2xl font-serif text-brown-deep tracking-wide mt-3 select-text">
              {suite.ceilingHeight}
            </h3>
            <p className="text-2xl text-brown-mid mt-2">
              Deep floor plates engineered to amplify spatial freedom.
            </p>
          </div>
          <div className="bg-white border border-warm-2 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
            <span className="text-[10px] font-semibold tracking-widest text-brown-mid/60 uppercase">
              SOLAR ORIENTATION
            </span>
            <h3 className="text-2xl font-serif text-brown-deep tracking-wide mt-3 select-text">
              {suite.orientation}
            </h3>
            <p className="text-2xl text-brown-mid mt-2">
              Positioned carefully to ingest perfect golden-hour rays.
            </p>
          </div>
        </div>

        {/* Materials Interactive Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 bg-warm-1/30 border border-warm-2 p-8 rounded-3xl">
          
          {/* Material Board Panel */}
          <div>
            <div className="mb-6">
              <span className="text-[10px] font-semibold tracking-[0.25em] text-brown-mid/60 uppercase block mb-1">
                MATERIAL INTEGRATION
              </span>
              <h3 className="text-xl font-serif tracking-wider text-brown-deep uppercase">
                CURATED MATERIALS PALETTE
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {suite.materials.map(mat => (
                <button
                  type="button"
                  key={mat.name}
                  onClick={() => setActiveMaterial(mat)}
                  className={`flex items-center gap-4 text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                    currentMaterial.name === mat.name
                      ? 'bg-white border-brown-deep text-brown-deep shadow-md'
                      : 'bg-white/45 border-warm-2 hover:border-warm-3 text-brown-mid'
                  }`}
                >
                  {/* Swatch color representation */}
                  <div
                    className="w-10 h-10 rounded-lg shrink-0 shadow-inner border border-brown-deep/10"
                    style={{ backgroundColor: mat.colorHex }}
                  />
                  <div>
                    <span className="block text-2xl font-serif font-medium tracking-wide">
                      {mat.name}
                    </span>
                    <span className="block text-[9px] text-brown-mid/60 tracking-wider uppercase mt-0.5">
                      {mat.category}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Material Inspector Display */}
          <div className="p-6 md:p-8 bg-white rounded-2xl border border-warm-2/80 shadow-md flex flex-col min-h-[240px] justify-between relative overflow-hidden">
            {/* Ambient subtle color background highlight matching the swatch */}
            <div
              className="absolute right-[-40px] bottom-[-40px] w-48 h-48 rounded-full blur-[80px] opacity-15 transition-all duration-700"
              style={{ backgroundColor: currentMaterial.colorHex }}
            />
            
            <div className="relative z-10">
              <span className="text-[10px] bg-warm-1 px-2.5 py-1 rounded-full text-gold-b font-semibold tracking-widest border border-gold-a/10 uppercase inline-block">
                {currentMaterial.category}
              </span>
              <h4 className="text-2xl font-serif tracking-wide text-brown-deep mt-4 select-text">
                {currentMaterial.name}
              </h4>
              <p className="text-2xl text-brown-mid leading-relaxed font-normal mt-3 select-text">
                {currentMaterial.description}
              </p>
            </div>

            <div className="border-t border-warm-2 pt-4 mt-6 flex justify-between items-center relative z-10">
              <span className="text-[10px] text-brown-mid/60 font-mono tracking-widest uppercase">
                HEX {currentMaterial.colorHex}
              </span>
              <span className="text-[10px] text-gold-b font-sans font-medium tracking-wider flex items-center gap-1">
                PREMIUM ARTISANAL FINISH <Sparkles size={10} className="animate-pulse" />
              </span>
            </div>
          </div>

        </div>

        {/* Premium Amenities segment */}
        <div className="space-y-6">
          <div>
            <span className="text-[10px] font-semibold tracking-[0.3em] text-gold-b uppercase block mb-1">
              EXCLUSIVE COMFORTS
            </span>
            <h3 className="text-2xl font-serif tracking-wider text-brown-deep uppercase">
              INTEGRATED AMENITIES
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {suite.amenities.map(amenity => {
              const IconComponent = IconMap[amenity.iconName] || Home;
              return (
                <div
                  key={amenity.name}
                  className="bg-white border border-warm-2 rounded-2xl p-5 hover:border-gold-mid/85 transition-all duration-300 group shadow-sm hover:shadow"
                >
                  <div className="w-10 h-10 rounded-xl bg-gold-a/10 text-gold-b flex items-center justify-center border border-gold-a/20 mb-4 group-hover:bg-gold-a/20 transition-all">
                    <IconComponent size={20} />
                  </div>
                  <h4 className="text-base font-serif tracking-wide text-brown-deep mb-2 select-text">
                    {amenity.name}
                  </h4>
                  <p className="text-2xl text-brown-mid leading-relaxed font-normal select-text">
                    {amenity.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
