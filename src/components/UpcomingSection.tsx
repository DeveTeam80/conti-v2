"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedText from "./AnimatedText";
import FeatureItem from "./FeatureItem";

const ChoiceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const backgroundImage = "/assets/images/horizon/horizon-render.png";
  const cards = [
    {
      label: "A skyline presence shaped with restraint",
      value: "22",
      sub: "Storeys",
    },
    {
      label: "Seamless access, thoughtfully planned",
      value: "8",
      sub: "Level Ramp Parking",
    },
    {
      label: "Balanced living with privacy and flow",
      value: "10",
      sub: "Residences / Floor",
    },
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Map out image expansion bounds comfortably across the scroll track
  const imageWidth = useTransform(
    scrollYProgress,
    [0, 0.4],
    isMobile ? ["85vw", "100vw"] : ["45vw", "100vw"],
  );
  
  const imageHeight = useTransform(
    scrollYProgress,
    [0, 0.4],
    ["65vh", "100vh"],
  );

  // FIXED: Keeps the asset crisp, vibrant, and opaque throughout the motion reveal sequence
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [0.85, 1]);

  // Content layers gracefully fade in right after the image hits full screen dimensions
  const contentOpacity = useTransform(scrollYProgress, [0.45, 0.75], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.45, 0.75], ["40px", "0px"]);

  return (
    <section ref={containerRef} className="relative h-screen bg-secondary w-full">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-secondary">
        
        {/* Expanding Background Image Mask Frame */}
        <motion.div
          style={{
            width: imageWidth,
            height: imageHeight,
            opacity: imageOpacity,
          }}
          className="relative z-0 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] w-full h-full"
        >
          <img
            src={backgroundImage}
            alt="Continental Horizon"
            className="w-full h-full object-cover select-none"
          />
          {/* Ambient Contrast Scrim */}
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        </motion.div>

        {/* Content Typography Overlay Container */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute inset-0 z-10 flex items-center justify-center px-6 md:px-16 pointer-events-none"
        >
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20 pointer-events-auto">
            
            {/* Left Pillar: Main Titles */}
            <div className="flex flex-col justify-center">
              <div className="max-w-xl">
                <h2 className="text-6xl md:text-8xl font-extrabold tracking-tighter leading-[0.9] flex flex-col">
                  <span className="text-white mb-2">
                    <AnimatedText text="A New" />
                  </span>
                  <span className="text-white mb-2">
                    <AnimatedText text="Chapter in" />
                  </span>
                  <span className="text-gold font-display italic font-medium">
                    <AnimatedText text="Mazgaon" delay={0.4} />
                  </span>
                </h2>
              </div>
            </div>

            {/* Layout Spacer */}
            <div className="hidden lg:block relative" />

            {/* Right Pillar: Property Metrics */}
            <div className="flex flex-col gap-6 justify-center">
              {cards.map((card, index) => (
                <FeatureItem
                  key={index}
                  label={card.label}
                  value={card.value}
                  sub={card.sub}
                  delay={index * 0.1}
                />
              ))}
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ChoiceSection;