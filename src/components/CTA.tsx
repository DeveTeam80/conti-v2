"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSmooth } from "../hooks/useSmooth";

const NewEraSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // LIGHTWEIGHT SMOOTHING
  const smoothScroll = useSmooth(scrollYProgress, 0.07);

  /* Subtle parallax — unchanged */
  const imgY = useTransform(smoothScroll, [0, 1], ["0%", "-12%"]);

  const textOpacity = useTransform(smoothScroll, [0.15, 0.35], [0, 1]);
  const textY = useTransform(smoothScroll, [0.15, 0.35], [40, 0]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white">
      {/* BACKGROUND IMAGE — unchanged */}
      <motion.div
        style={{ y: imgY }}
        className="absolute  h-[103%] top-5 inset-0 z-0"
      >
        <img
          src="/assets/images/horizon/map.png"
          alt="Architecture"
          className="w-full h-full object-contain scale-[1.15]"
        />
      </motion.div>

      {/* CONTENT */}
      <div className="relative z-20 min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        {/* Eyebrow — unchanged */}
        <motion.p
          style={{ opacity: textOpacity, y: textY }}
          className="text-white text-md tracking-[0.4em] uppercase mb-8"
        >
          Calm. Confident. Considered.
        </motion.p>

        {/* Main Title — unchanged */}
        <h2 className="text-5xl md:text-8xl text-gradient-gold mb-6">
          We Invite <span>Conversations</span>
        </h2>

        {/* Subtitle — unchanged */}
        {/* <p className="text-xl md:text-2xl text-gradient-gold/80 font-normal mb-12 tracking-wide">
          Trust is built face to face.
        </p> */}

        {/* Button
            Desktop: w-64 h-64 (256×256px) — UNCHANGED
            Mobile:  w-44 h-44 (176×176px) — the 256px circle was nearly
                     full-width on a 390px screen, visually overwhelming
        */}
        <a href="/contact">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
            relative
            w-44 h-44
            md:w-64 md:h-64
            rounded-full
            bg-gradient-to-r from-[#eec06b] to-[#ca8c19]
            text-secondary
            flex flex-col items-center justify-center
            shadow-xl
            group
            overflow-hidden
          "
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[#eec06b] to-[#ca8c19]" />
            <span className="relative z-10 text-center px-4 text-2xl md:text-base">
              Request a <br />
              Private Preview
            </span>
          </motion.button>
        </a>
      </div>
    </section>
  );
};

export default NewEraSection;
