"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { INTERIOR_SLIDES } from "@/constants";
import { useSmooth } from "../hooks/useSmooth";

const EniteoGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const [scrollRange, setScrollRange] = useState(0);
  const [containerHeight, setContainerHeight] = useState("auto");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const calculateLayout = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // 1. Calculate how many pixels the track needs to slide horizontally
        const range = trackWidth - viewportWidth;
        const finalRange = range > 0 ? range : 0;
        setScrollRange(finalRange);

        // 2. Dynamic Scroll Height Matching: 
        // We set the vertical height of the container to be the viewport height 
        // PLUS the exact horizontal scroll distance. This creates a perfect 1:1 pixel mapping.
        if (finalRange > 0) {
          setContainerHeight(`${viewportHeight + finalRange}px`);
        }
      }
    };

    // Run layout math immediately on mount
    calculateLayout();

    // Re-run whenever window sizes shift or layout updates
    window.addEventListener("resize", calculateLayout);
    return () => window.removeEventListener("resize", calculateLayout);
  }, []);

  const smoothProgress = useSmooth(scrollYProgress, 0.07);

  const x = useTransform(smoothProgress, [0, 1], [0, -scrollRange]);
  const newRaw = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      style={{ height: containerHeight }} // Dynamically forces the page to stay locked
      className="relative bg-secondary w-full"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        {/* Title */}
        <div className="absolute top-6 left-6 md:top-10 md:left-10 z-10 text-gradient-gold mix-blend-difference pointer-events-none">
          <h2 className="text-5xl md:text-8xl font-light uppercase tracking-tighter font-decart">
            Step Inside
          </h2>
        </div>

        {/* Horizontal Track */}
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex gap-4 md:gap-[40px] px-[16px] md:px-[60px] items-center h-full w-max"
        >
          {/* Intro Text Card */}
          <div className="w-[60vw] md:w-[25vw] h-full flex flex-col justify-end p-6 md:p-10 pointer-events-none shrink-0">
            <p className="text-2xl md:text-4xl font-light leading-snug text-white font-decart max-w-md">
              A Vision of Home.
            </p>
          </div>

          {/* Map through Slides */}
          {INTERIOR_SLIDES.map((item) => (
            <GalleryItem
              key={item.id}
              item={item}
              parentScrollProgress={scrollYProgress}
            />
          ))}

          {/* End spacer */}
          <div className="w-[16px] md:w-[60px] h-full flex-shrink-0" />
        </motion.div>

        {/* Progress Bar */}
        <div className="absolute bottom-10 left-10 right-10 h-[1px] bg-white/20 overflow-hidden">
          <motion.div className="h-full bg-accent" style={{ width: newRaw }} />
        </div>
      </div>
    </section>
  );
};

const GalleryItem = ({
  item,
  parentScrollProgress,
}: {
  item: (typeof INTERIOR_SLIDES)[0];
  parentScrollProgress: any;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { amount: 0.4, once: false });

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const imageX = useTransform(
    parentScrollProgress,
    [0, 1],
    ["0%", isMobile ? "6%" : "15%"],
  );

  return (
    <div
      ref={cardRef}
      className="relative w-[80vw] h-[72vh] md:w-[45vw] md:h-[92vh] lg:w-[35vw] flex-shrink-0 group overflow-hidden bg-black/20"
    >
      {/* Parallax image container */}
      <motion.div
        className="absolute inset-0 w-[140%] -left-[25%] h-full"
        style={{ x: imageX }}
      >
        <img
          src={item.img}
          alt={item.name}
          loading="eager"
          className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,0.74,0.22,0.99)] group-hover:scale-105 select-none"
        />
      </motion.div>

      {/* Gradient scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

      {/* Area name */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-4 md:p-6 pointer-events-none"
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="w-8 h-px bg-[var(--color-accent)] mb-2 md:mb-3" />
        <p className="text-white/90 text-sm md:text-base uppercase tracking-[0.25em] font-light">
          {item.name}
        </p>
      </motion.div>
    </div>
  );
};

export default EniteoGallery;