import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedText from "./AnimatedText";
import FeatureItem from "./FeatureItem";

const ChoiceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const heading = "A New Chapter Rises in Mazgaon";
  const backgroundImage = "/assets/images/horizon/day_view.jpg";
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

  const imageWidth = useTransform(
    scrollYProgress,
    [0, 0.5],
    isMobile ? ["85vw", "100vw"] : ["45vw", "100vw"],
  );
  const imageHeight = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["65vh", "100vh"],
  );
  const imageRadius = useTransform(scrollYProgress, [0, 0.5], ["40px", "0px"]);
  // const bgOpacity = useTransform(scrollYProgress, [0, 0.4], [0.5, 0.8]);

  const contentOpacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 1.5]);
  const contentY = useTransform(scrollYProgress, [0.5, 0.8], ["50px", "0px"]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-[#0f395c]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Expanding Background Image */}
        <motion.div
          style={{
            width: imageWidth,
            height: imageHeight,
            borderRadius: imageRadius,
            // opacity: bgOpacity,
          }}
          className="relative z-0 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
          <img
            src={backgroundImage}
            alt="Continental Horizon"
            className="w-full h-full object-cover"
          />
          {/* <div className="absolute inset-0 bg-linear-to-t from-secondary/30 via-secondary/5 to-transparent" /> */}
        </motion.div>

        {/* Content Overlay */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute inset-0 z-10 flex items-center justify-center px-6 md:px-16 pointer-events-none"
        >
          <div className="w-full max-w-9xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20 pointer-events-auto">
            {/* Left: Heading, Branding & CTAs */}
            <div className="flex flex-col">
              <div className="max-w-xl">
                <h2 className="text-6xl md:text-8xl font-extrabold tracking-tighter leading-[0.9] flex flex-col">
                  <span className="text-white mb-1">
                    <AnimatedText text="A New" />
                  </span>
                  <span className="text-white mb-1">
                    <AnimatedText text="Chapter in" />
                  </span>
                  <span
                    className="text-[#ca8c19] font-display font-bold"
                    style={{ lineHeight: "90px" }}
                  >
                    <AnimatedText text="Mazgaon" delay={0.4} />
                  </span>
                </h2>

                {/* --- ADDED CTA BUTTONS --- */}
                <div className="mt-10 flex sm:flex-row gap-4">
                  <button className="px-8 py-4 bg-[#ca8c19] text-brown-deep font-bold uppercase tracking-wider rounded transition-transform hover:scale-105 active:scale-95 shadow-lg">
                    Enquire Now
                  </button>
                  <button className="px-8 py-4 border border-[#ca8c19] text-[#ca8c19] font-bold uppercase tracking-wider rounded transition-all hover:bg-[#ca8c19] hover:text-brown-deep active:scale-95">
                    View Details
                  </button>
                </div>
                {/* ------------------------- */}
              </div>
            </div>

            {/* Middle: Empty Spacer */}
            <div className="mt-32 relative hidden lg:block"></div>

            {/* Right: The Cards (using FeatureItem) */}
            <div className="flex flex-col gap-6 max-w-[290px] justify-self-end">
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
