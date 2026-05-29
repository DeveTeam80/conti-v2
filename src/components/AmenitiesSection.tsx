"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion";

interface Slide {
  id: string;
  title: string;
  description: string;
  smallImage: string;
  largeImage: string;
}

const SLIDES: Slide[] = [
  {
    id: "arrival",
    title: "A GRAND\nARRIVAL\nEVERY DAY",
    description:
      "The moment you step in, you know you are home. A double-height grand lobby, premium finishes, and a low-density building mean you are never waiting, for a lift, for space, or for quiet.",
    smallImage: "/assets/images/horizon/horizon-internal/Continental Horizon_Lobby_01.jpg",
    largeImage: "/assets/images/horizon/horizon-internal/Continental Horizon_Lobby_02.jpg",
  },
  {
    id: "wellness",
    title: "WELLNESS\n& RECREATION",
    description:
      "Separate swimming pools for men and women, a fully equipped gym and yoga centre with independent timings, a games room, and a dedicated kids room, everything your family needs, planned with care.",
    smallImage: "/assets/images/horizon/amenities-gallery/amenities-2.png",
    largeImage: "/assets/images/horizon/amenities-gallery/amenities-5.png",
  },
  {
    id: "home",
    title: "A HOME\nTHAT KNOWS\nYOU",
    description:
      "Continental is not just a building. It is a neighbourhood where over 250+ families know each other, where the lifts arrive on time, and where every detail was planned around the way our community actually lives.",
    smallImage: "/assets/images/elyse_meditation_small_1779444539846.png",
    largeImage: "/assets/images/horizon/horizon-internal/3BHK/Continental Heights_3BHK_Still Cam3.jpg",
  },
];

export default function AmenitiesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Track native scroll across the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 2. Dampen input jitters using a spring hook
  const smoothScrollProgress = useSpring(scrollYProgress, {
    damping: 32,
    stiffness: 90,
    mass: 0.5
  });

  // 3. FIXED: Step mapping to give each slide exactly 1/3 of the total scroll height
  // We explicitly step the indices at even intervals.
  const slideIdx = useTransform(
    smoothScrollProgress,
    [0, 0.33, 0.34, 0.66, 0.67, 1],
    [0, 0,    1,    1,    2,    2]
  );

  // Smooth out the visual progress bar tracking line
  const indicatorPercent = useTransform(
    smoothScrollProgress,
    [0, 1],
    ["33%", "100%"],
  );

  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    return slideIdx.on("change", (latest) => {
      // With our new step function, we can rely on Math.round to safely hold index frames
      const rounded = Math.round(latest);
      if (rounded !== currentIdx && rounded >= 0 && rounded < SLIDES.length) {
        setCurrentIdx(rounded);
      }
    });
  }, [slideIdx, currentIdx]);

  const activeSlide = SLIDES[currentIdx];

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-white">
      {/* Sticky layout pinned viewport container */}
      <section className="sticky top-0 h-screen w-full text-brown-deep flex items-center px-6 sm:px-12 md:px-16 overflow-hidden select-none">
        <div className="max-w-9xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 lg:gap-12 items-center">
            
            {/* LEFT CONTENT CONTAINER */}
            <div className="md:col-span-5 lg:col-span-4 flex items-stretch text-left">
              <div className="relative pl-8 md:pl-10 flex-1 flex flex-col justify-center border-l border-brown-deep/10">
                
                {/* Smooth Progress Tracking Line */}
                <motion.div
                  className="absolute left-[-1px] top-0 w-[2px] bg-gold-b"
                  style={{ height: indicatorPercent }}
                />

                <div className="min-h-[160px] md:min-h-[240px] flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSlide.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                    >
                      <h2 className="font-serif text-[7.5vw] md:text-[3vw] leading-[1.1] tracking-[0.03em] font-normal text-brown-deep uppercase whitespace-pre-line">
                        {activeSlide.title}
                      </h2>
                      <p className="font-sans text-2xl text-brown-deep font-normal mt-5 sm:mt-6 leading-relaxed tracking-wide">
                        {activeSlide.description}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Subtext Index Indicators */}
                <div className="flex items-center gap-4 mt-8 pt-4 border-t border-brown-deep/10">
                  {SLIDES.map((slide, idx) => (
                    <div
                      key={slide.id}
                      className={`text-lg font-mono tracking-widest transition-all duration-500 py-1 ${
                        currentIdx === idx
                          ? "text-brown-deep border-b border-brown-deep font-semibold"
                          : "text-brown-deep/50"
                      }`}
                    >
                      0{idx + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT IMAGES LAYER WITH SYNCED CROSS-FADE */}
            <div className="md:col-span-7 lg:col-span-8 relative flex items-center justify-center py-6">
              <div className="relative w-full max-w-[720px] h-[340px] sm:h-[450px] md:h-[500px] lg:h-[530px] flex items-center">
                
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeSlide.id}
                    className="absolute inset-0 w-full h-full flex items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    {/* Main Large Image */}
                    <div className="absolute right-0 w-[68%] sm:w-[70%] md:w-[85%] h-full z-10 overflow-hidden border border-warm-2 shadow-xl">
                      <motion.img
                        initial={{ scale: 1.05 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        src={activeSlide.largeImage}
                        alt="Life at Continental"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Secondary Small Overlap Image */}
                    <div className="absolute left-[2%] sm:left-[5%] md:left-[-17%] w-[38%] h-[74%] z-20 shadow-xl overflow-hidden bg-warm-1 border border-warm-2">
                      <motion.img
                        initial={{ y: 20, scale: 1.05 }}
                        animate={{ y: 0, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                        src={activeSlide.smallImage}
                        alt="Life at Continental detail"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>

              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}