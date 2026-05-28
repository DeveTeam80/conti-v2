"use client";

import React from "react";
import { motion } from "motion/react";
import AnimateReveal from "./AnimateReveal";

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
            src="/assets/images/heights/heights-1.jpeg"
            alt="Warm elegant living interior"
            className="w-full h-full object-cover object-right"
            referrerPolicy="no-referrer"
          />
          {/* Subtle vignette/shading changed to warm light tone overlay to keep background pristine */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-white/10 pointer-events-none" />
        </div>

        {/* RIGHT COLUMN: Sleek Editorial white background */}
        <div className="relative w-full bg-white flex flex-col p-8 sm:p-12 md:p-16 lg:p-24 z-10 min-h-[220px] md:min-h-0">
          {/* SMALL PARAGRAPH OF DESCRIPTION IN LOWER RIGHT */}
          <div className="mt-auto max-w-xs md:max-w-sm xl:max-w-3xl mx-auto select-text">
            <AnimateReveal delay={0.2} duration={1.2}>
              <p className="text-brown-mid text-2xl sm:text-2xl font-normal leading-relaxed tracking-wide text-left sm:text-left select-text">
                South Mumbai's most respected address for our community. 55
                floors, 500+ families, and every amenity planned around the way
                we live, from the Namaz hall to the thaal space to separate
                pools for men and women. Floors 45 to 55 are now open for sale.
              </p>
            </AnimateReveal>
          </div>
        </div>

        {/* DECORATIVE OVERLAY HEADER: A VISION OF INSPIRED LIVING */}
        {/* Starts exactly at ~38% on desktop so it crosses the 50% split perfectly */}
        <div className="absolute inset-x-0 top-[18%] md:top-[12%] lg:top-[15%] z-20 pointer-events-none select-none px-6 md:px-0 md:pl-[38%] lg:pl-[37%] xl:pl-[53%]">
          <AnimateReveal duration={1.2}>
            <h2 className="text-5xl md:text-[5vw] leading-tight mb-4 text-gradient-gold uppercase font-serif">
              <span className="block font-normal">CONTINENTAL HEIGHTS DEFINED</span>
              <span className="block font-normal mt-1 md:mt-2">
                THE ADDRESS
              </span>
            </h2>
          </AnimateReveal>
        </div>
      </div>
    </section>
  );
}
