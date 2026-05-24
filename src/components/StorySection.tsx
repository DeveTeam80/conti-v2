"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PanelData {
  id: number;
  num: string;
  tabLabel: string;
  image: string;
  heading: string;
  italicHeading: string;
  paragraphs: string[];
  quote: string;
}

const STORY_PANELS: PanelData[] = [
  {
    id: 0,
    num: '01',
    tabLabel: 'The Beginning',
    image: 'https://continental-beige.vercel.app/assets/images/horizon/Continental%20Horizon_Cam-03.jpg.jpeg',
    heading: 'Twenty years in the trade.',
    italicHeading: 'Eight in our own name.',
    paragraphs: [
      'Continental Group began in 1990 as a construction company. For the first 20 years, we built for others — learning the discipline, the materials, the patience required to deliver a building exactly as promised.',
      'Eight years ago, we started developing premium residential projects under our own name. That long apprenticeship is the reason we don\'t cut corners. We have spent two decades watching what happens when builders do.'
    ],
    quote: 'We are builders first. Developers second.'
  },
  {
    id: 1,
    num: '02',
    tabLabel: 'Why Mazgaon',
    image: 'https://continental-beige.vercel.app/assets/images/location/jamali-masjid.png',
    heading: 'A neighbourhood',
    italicHeading: 'that knows itself.',
    paragraphs: [
      'Mazgaon is not just a postcode. It is a community — a network of families, masjids, schools, hospitals, and businesses that have grown together for decades.',
      'Our buildings are on R.B. Marg — within walking distance of Jamali Masjid, 12 minutes from Raudat Tahera, 10 from Saifee Hospital. We build here because this is where our community lives.'
    ],
    quote: 'We don\'t build where the market is. We build where we belong.'
  },
  {
    id: 2,
    num: '03',
    tabLabel: 'How We Build',
    image: 'https://continental-beige.vercel.app/assets/images/heights/heights.png',
    heading: 'No joint development.',
    italicHeading: 'No shortcuts.',
    paragraphs: [
      'Every Continental project sits on land we own outright. No landowner partners, no joint development agreements, no third-party delays. When we say a building will be ready on a particular date, it will be.',
      'We use Mivan aluminium formwork construction, keep density low, and apply the same quality fittings on every floor. The premium is the baseline — not reserved for the top floors.'
    ],
    quote: 'Self-owned land. Proven delivery. No compromises.'
  },
  {
    id: 3,
    num: '04',
    tabLabel: 'Our Vision',
    image: 'https://continental-beige.vercel.app/assets/images/Continental%20Horizon_Cam-09-Day.jpg',
    heading: 'To be a brand',
    italicHeading: 'admired for what it builds.',
    paragraphs: [
      'Our vision is to be recognised as an industry leader for thoughtfully designed, high-quality homes — and to be known for strong, long-term relationships with every customer and stakeholder.',
      'We don\'t build more than we can build well. One project at a time, finished before the next begins. That is the Continental Group way.'
    ],
    quote: 'Quality is not a feature. It is the standard we start from.'
  }
];

export default function StorySection() {
  const [activeTab, setActiveTab] = useState<number>(3); // Set default active to Panel 4 (index 3) to match active class from the requested HTML

  const activePanel = STORY_PANELS[activeTab];

  return (
    <section 
      id="story" 
      className="relative w-full bg-[#faf8f4] text-brown-deep py-24 md:py-32 px-6 sm:px-12 md:px-16 border-t border-warm-2 z-20 overflow-hidden"
    >
      <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Eyebrow, Title and Vertical Tab Navigation */}
          <div className="lg:col-span-12 xl:col-span-4 flex flex-col justify-start self-stretch">
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-8">
                <span className="w-8 h-[1px] bg-brown-mid/30" />
                <span className="text-[15px] font-sans text-brown-mid tracking-[0.2em] uppercase">
                  Our Story
                </span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-4xl sm:text-5xl md:text-[54px] leading-[1.1] tracking-[0.02em] font-normal text-brown-deep uppercase mb-12 sm:mb-16">
                Who we are.<br />
                <span className="font-serif font-normal text-brown-mid">How we build.</span>
              </h2>
            </div>

            {/* Vertical Tabs */}
            <div className="relative flex flex-col space-y-4 border-l border-brown-deep/10 pl-6 py-2">
              {/* Absolute golden active visual indicator line that slides to the active tab */}
              <div 
                className="absolute left-[-1px] w-[2px] bg-gold-b transition-all duration-500 ease-[0.16,1,0.3,1]"
                style={{
                  height: '24px',
                  transform: `translateY(${activeTab * 48}px)` // matches spaced layout precisely
                }}
              />

              {STORY_PANELS.map((panel) => {
                const isActive = activeTab === panel.id;
                return (
                  <button
                    key={panel.id}
                    onClick={() => setActiveTab(panel.id)}
                    className="group relative flex items-center text-left py-2 outline-none focus:outline-none cursor-pointer w-full"
                    style={{ height: '32px' }}
                  >
                    {/* Tab Number */}
                    <span 
                      className={`text-[15px] font-sans tracking-widest mr-4 transition-colors duration-300 ${
                        isActive ? 'text-brown-deep font-semibold' : 'text-brown-mid/50 group-hover:text-brown-deep'
                      }`}
                    >
                      {panel.num}
                    </span>

                    {/* Tab Label */}
                    <span 
                      className={`text-2xl font-sans tracking-wide transition-colors duration-300 ${
                        isActive ? 'text-brown-deep font-medium' : 'text-brown-mid/50 group-hover:text-brown-deep'
                      }`}
                    >
                      {panel.tabLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: The Dynamic Segmented Panels */}
          <div className="lg:col-span-12 xl:col-span-8 max-w-5xl w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col md:flex-row gap-10 items-start w-full"
              >
                {/* Image Showcase Frame */}
                <div className="relative w-full aspect-[3/4] overflow-hidden border border-warm-2 shadow-xl bg-warm-1 group">
                  <motion.div
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full"
                  >
                    <img 
                      src={activePanel.image} 
                      alt={activePanel.tabLabel}
                      className="w-full h-full object-cover select-none filter brightness-95"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                  {/* Luxury Ambient Shading Veil */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/15 to-transparent pointer-events-none" />
                </div>

                {/* Narrative Details */}
                <div className="flex flex-col space-y-6">
                  {/* Subtle Accent / Title */}
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-[34px] leading-snug tracking-wide font-normal text-brown-deep select-text">
                    {activePanel.heading}{' '}
                    <span className="font-serif text-brown-mid/85">
                      {activePanel.italicHeading}
                    </span>
                  </h3>

                  {/* Body Paragraphs */}
                  <div className="space-y-4 max-w-3xl">
                    {activePanel.paragraphs.map((p, i) => (
                      <p 
                        key={i} 
                        className="font-sans text-2xl text-brown-mid font-normal leading-relaxed tracking-wide select-text"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
