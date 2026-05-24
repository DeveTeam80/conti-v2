"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Slide {
  id: string;
  title: string;
  description: string;
  smallImage: string;
  largeImage: string;
}

const SLIDES: Slide[] = [
  {
    id: 'wellness',
    title: 'WELLNESS-\nCENTERED\nAMENITIES',
    description: 'From private fitness studios to guided meditation sessions, our amenities are designed to enhance your well-being and foster a sense of harmony.',
    smallImage: '/assets/images/elyse_penthouse_1779429579656.png',
    largeImage: '/assets/images/elyse_suites_1779429601103.png',
  },
  {
    id: 'spaces',
    title: 'INSPIRED\nSPACES',
    description: 'From artful communal lounges to thoughtfully curated design details, every environment celebrates a rich sense of place.',
    smallImage: '/assets/images/elyse_meditation_small_1779444539846.png',
    largeImage: '/assets/images/elyse_inspired_lounge_1779444556252.png',
  },
  {
    id: 'curated',
    title: 'CURATED\nLIVING',
    description: 'Every detail is crafted with absolute precision. A dedicated residential concierge and steward curate tailored dining and fine life elements.',
    smallImage: '/assets/images/elyse_living_about_1779430108456.png',
    largeImage: '/assets/images/elyse_house_hero_1779429540872.png',
  },
];

// Reusable horizontal shutter/stripe image reveal component
interface ShutterImageProps {
  src: string;
  prevSrc: string | null;
  isTransitioning: boolean;
  slideIndex: number;
}

function ShutterImage({ src, prevSrc, isTransitioning, slideIndex }: ShutterImageProps) {
  const slices = 10;

  // Render static image when not transitioning
  if (!isTransitioning || !prevSrc) {
    return (
      <img
        src={src}
        alt="Core Venue View"
        className="w-full h-full object-cover border border-warm-2 shadow-xl transition-all duration-300"
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden border border-warm-2 shadow-xl bg-warm-1">
      {/* Base: Previous Image under the stripes */}
      <img
        src={prevSrc}
        alt="Previous Scene"
        className="absolute inset-0 w-full h-full object-cover scale-[1.02] filter brightness-90 shrink-0"
        referrerPolicy="no-referrer"
      />

      {/* Slices Overlay: New Image unfurls bottom to top */}
      <div className="absolute inset-0 flex flex-col w-full h-full">
        {Array.from({ length: slices }).map((_, idx) => {
          // Bottom slices have index = slices - 1, and should animate first
          const staggerIndex = slices - 1 - idx;
          const delay = staggerIndex * 0.016; // rapid snappy staggered intervals

          return (
            <div
              key={`${slideIndex}-${idx}`}
              className="relative w-full overflow-hidden"
              style={{
                height: `${100 / slices}%`,
              }}
            >
              <motion.img
                src={src}
                alt="Incoming Scene Stripe"
                referrerPolicy="no-referrer"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{
                  duration: 0.4, // ultra-crisp responsive timing
                  delay,
                  ease: [0.16, 1, 0.3, 1], // premium luxury cubic-bezier
                }}
                className="absolute left-0 w-full object-cover origin-center"
                style={{
                  height: `${slices * 100}%`,
                  top: `-${idx * 100}%`,
                }}
              />
              {/* Ultra-subtle stripe divider line matching Picture 3 pattern */}
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black/10 z-10" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function AmenitiesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Tracks overall scroll count across 3 slides * 3 steps = 9 settings (0 to 8)
  const [globalStep, setGlobalStep] = useState(0);
  const [prevSlideIdx, setPrevSlideIdx] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const scrollCooldownRef = useRef(false);

  // Compute active slide idx and current slide tick step (0, 1, 2)
  const slideIdx = Math.floor(globalStep / 3);
  const tick = globalStep % 3;

  const activeSlide = SLIDES[slideIdx];
  const lastActiveSlide = prevSlideIdx !== null ? SLIDES[prevSlideIdx] : null;

  // Intercept scroll/wheel and touch interactions
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const handleWheel = (e: WheelEvent) => {
      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      // Skip tiny trackpad vibration
      if (Math.abs(e.deltaY) < 12) return;

      // Case 1: Scrolling UP on step 0 -> let page scroll up to previous section
      if (isScrollingUp && globalStep === 0) {
        return; // Bubble normally
      }
      // Case 2: Scrolling DOWN on step 8 -> let page scroll down to next section
      if (isScrollingDown && globalStep === 8) {
        return; // Bubble normally to let the page slide to the next section
      }

      // Intercept the wheel event inside this section
      e.preventDefault();

      if (scrollCooldownRef.current) return;
      scrollCooldownRef.current = true;
      setTimeout(() => {
        scrollCooldownRef.current = false;
      }, 450); // Snappy cooldown matching faster animations

      if (isScrollingDown) {
        const nextStep = globalStep + 1;
        const currentSlide = Math.floor(globalStep / 3);
        const nextSlide = Math.floor(nextStep / 3);
        
        if (nextSlide !== currentSlide) {
          setPrevSlideIdx(currentSlide);
          setIsTransitioning(true);
        }
        setGlobalStep(nextStep);
      } else if (isScrollingUp) {
        const prevStep = globalStep - 1;
        const currentSlide = Math.floor(globalStep / 3);
        const nextSlide = Math.floor(prevStep / 3);

        if (nextSlide !== currentSlide) {
          setPrevSlideIdx(currentSlide);
          setIsTransitioning(true);
        }
        setGlobalStep(prevStep);
      }
    };

    // Touch gesture variables for mobile/tablet swipes
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;

      const deltaY = touchStartY - e.touches[0].clientY;

      if (Math.abs(deltaY) > 40) { // significant swipe trigger
        const isSwipingDown = deltaY > 0;
        const isSwipingUp = deltaY < 0;

        if (isSwipingUp && globalStep === 0) {
          return; // bubble outer touch action
        }
        if (isSwipingDown && globalStep === 8) {
          return; // bubble outer touch action
        }

        if (e.cancelable) {
          e.preventDefault();
        }

        if (scrollCooldownRef.current) return;
        scrollCooldownRef.current = true;
        setTimeout(() => {
          scrollCooldownRef.current = false;
        }, 450); // Snappy cooldown

        if (isSwipingDown) {
          const nextStep = globalStep + 1;
          const currentSlide = Math.floor(globalStep / 3);
          const nextSlide = Math.floor(nextStep / 3);

          if (nextSlide !== currentSlide) {
            setPrevSlideIdx(currentSlide);
            setIsTransitioning(true);
          }
          setGlobalStep(nextStep);
        } else if (isSwipingUp) {
          const prevStep = globalStep - 1;
          const currentSlide = Math.floor(globalStep / 3);
          const nextSlide = Math.floor(prevStep / 3);

          if (nextSlide !== currentSlide) {
            setPrevSlideIdx(currentSlide);
            setIsTransitioning(true);
          }
          setGlobalStep(prevStep);
        }
        touchStartY = 0; // Reset
      }
    };

    element.addEventListener('wheel', handleWheel, { passive: false });
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    return () => {
      element.removeEventListener('wheel', handleWheel);
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
    };
  }, [globalStep]);

  // Transition finish handler: shortened for rapid interaction
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 600); //snappy completion match
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  // Handle dot or indicators click directly
  const handleSlideJump = (targetIdx: number) => {
    if (targetIdx === slideIdx) return;
    setPrevSlideIdx(slideIdx);
    setGlobalStep(targetIdx * 3); // Position on first step of that slide
    setIsTransitioning(true);
  };

  // Compute Overall Left Indicator height (reaches exactly 100% when globalStep is 8 / 9th scroll)
  const indicatorPercent = ((globalStep + 1) / 9) * 100;

  return (
    <section 
      ref={containerRef}
      id="wellness-amenities"
      className="relative w-full bg-white text-brown-deep py-24 md:py-32 px-6 sm:px-12 md:px-16 border-t border-warm-2 z-20 overflow-hidden select-none"
    >

      <div className="max-w-9xl mx-auto flex flex-col justify-center min-h-[550px] md:min-h-[660px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 lg:gap-12 items-center">
          
          {/* LEFT CONTENT COLUMN (Grid Span 4 on desktop) */}
          <div className="md:col-span-5 lg:col-span-4 flex items-stretch text-left">
            
            {/* Fine typographic layout with left tracking bar integrated directly on narrative block container border */}
            <div className="relative pl-8 md:pl-10 flex-1 flex flex-col justify-center border-l border-brown-deep/10">
              
              {/* Cinematic white indicator segments layered natively over the border line */}
              <div 
                className="absolute left-[-1px] top-0 w-[2px] bg-gold-b transition-all duration-500 ease-[0.16,1,0.3,1]"
                style={{ height: `${indicatorPercent}%` }}
              />

              <div className="min-h-[140px] md:min-h-[220px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide.id}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Exquisite display text */}
                    <h2 className="font-serif text-[7.5vw] md:text-[3vw] leading-[1.1] tracking-[0.03em] font-normal text-brown-deep uppercase whitespace-pre-line select-text">
                      {activeSlide.title}
                    </h2>

                    <p className="font-sans text-[15px] sm:text-[13px] text-brown-mid font-normal mt-5 sm:mt-6 leading-relaxed tracking-wide select-text">
                      {activeSlide.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Staggered Quick Indices Buttons to easily click/drag slide jumps */}
              <div className="flex items-center gap-4 mt-8 pt-4 border-t border-brown-deep/10">
                {SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => handleSlideJump(idx)}
                    className={`text-[10px] font-mono tracking-widest focus:outline-none transition-all cursor-pointer py-1 ${
                      slideIdx === idx 
                        ? 'text-brown-deep border-b border-brown-deep font-semibold' 
                        : 'text-brown-mid/50 hover:text-brown-deep'
                    }`}
                  >
                    0{idx + 1}
                  </button>
                ))}
              </div>

            </div>

          </div>

          {/* RIGHT VIEWPORTS CONTAINER (Grid Span 8 on desktop to contain overlapping visuals) */}
          <div className="md:col-span-7 lg:col-span-8 relative flex items-center justify-center py-6">
            <div className="relative w-full max-w-[620px] h-[340px] sm:h-[450px] md:h-[500px] lg:h-[530px] flex items-center">
              
              {/* LARGE IMAGE VIEWPORT (Slices / horizontal blinds reveal transition) */}
              <div className="absolute right-0 w-[68%] sm:w-[70%] md:w-[72%] h-full z-10">
                <ShutterImage
                  src={activeSlide.largeImage}
                  prevSrc={lastActiveSlide ? lastActiveSlide.largeImage : null}
                  isTransitioning={isTransitioning}
                  slideIndex={slideIdx}
                />
              </div>

              {/* SMALL OVERLAPPING IMAGE VIEWPORT (Curtain bottom-to-top reveal transition) */}
              {/* Positioned elevated on top of the larger background image */}
              <div className="absolute left-[2%] sm:left-[5%] md:left-[8%] w-[38%] h-[74%] z-20 shadow-xl overflow-hidden bg-warm-1 border border-warm-2">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={activeSlide.id}
                    initial={{ y: "100%", opacity: 1 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 1 }}
                    transition={{ 
                      duration: 0.45, 
                      ease: [0.16, 1, 0.3, 1] // synchronous luxurious timing
                    }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={activeSlide.smallImage}
                      alt="Overlapping Detail Scene"
                      className="w-full h-full object-cover scale-[1.02]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/5 z-1 pointer-events-none" />
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
