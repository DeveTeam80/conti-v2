"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { MapPin } from "lucide-react";
import { Reveal } from "./Reveal";
import { useSmooth } from "../hooks/useSmooth";

interface Location {
  id: string;
  name: string;
  x: number;
  y: number;
  image: string;
  description: string;
}

const LOCATIONS: Location[] = [
  {
    id: "byculla-station",
    name: "Byculla Station",
    x: 9,
    y: 28,
    image: "/assets/images/location/byculla.webp",
    description: "1.4 km",
  },
  {
    id: "rani-baug",
    name: "Rani Baug",
    x: 25,
    y: 20,
    image: "/assets/images/location/jijamata-udyan.jpg",
    description: "1.5 km",
  },
  {
    id: "continental-heights",
    name: "Continental Heights",
    x: 35,
    y: 15,
    image: "/assets/images/heights/heights-front.JPG",
    description: "0 m",
  },
  {
    id: "jamali-masjid",
    name: "Jamali Masjid",
    x: 27,
    y: 33,
    image: "/assets/images/location/jamali-masjid.png",
    description: "500 m",
  },
  {
    id: "continental-horizon",
    name: "Continental Horizon",
    x: 35,
    y: 33,
    image: "/assets/images/horizon/horizon-reveal.jpeg",
    description: "550m",
  },
  {
    id: "reay-road",
    name: "Reay Road Station",
    x: 48.5,
    y: 23,
    image: "/assets/images/location/reay-road.jpg",
    description: "600 m",
  },
  {
    id: "msb-school",
    name: "M.S.B School",
    x: 18,
    y: 59,
    image: "/assets/images/location/msb.jpg",
    description: "1.8 km",
  },
  {
    id: "dockyard-road",
    name: "Dockyard Road",
    x: 36,
    y: 63,
    image: "/assets/images/location/dockyard.jpg",
    description: "1.2 km",
  },
  {
    id: "raudat-tahera",
    name: "Raudat Tahera",
    x: 8,
    y: 97,
    image: "/assets/images/location/raudat-tahera.png",
    description: "3.5 km",
  },
];

const InteractiveMap: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeLocation = LOCATIONS.find((l) => l.id === activeId);
  const sectionRef = useRef<HTMLElement>(null);

  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothScroll = useSmooth(scrollYProgress, 0.09);
  const textY = useTransform(smoothScroll, [0, 1], [100, -100]);

  // Scroll mobile carousel to selected pin
  useEffect(() => {
    if (isMobile && activeId && carouselRef.current) {
      const activeElement = document.getElementById(`card-${activeId}`);
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [activeId, isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-brown-deep py-12 md:py-20 overflow-hidden"
    >
      <div className="max-w-9xl mx-auto px-6 mb-8 md:mb-12">
        <Reveal>
          <motion.div
            style={{ y: isMobile ? 0 : textY }}
            className="text-center relative z-0"
          >
            <h2 className="text-5xl md:text-[7vw] leading-tight mb-4 text-gradient-gold uppercase font-serif">
              The Privilege <br />
              of Address
            </h2>
          </motion.div>
        </Reveal>

        <div className="relative mt-6 md:mt-10">
          <div className="w-full">
            <Reveal delay={0.2}>
              <p className="text-lg md:text-2xl font-normal font-sans leading-relaxed mb-4 md:mb-8 text-warm-1/80">
                Located in the heart of Mazgaon, Continental Heights places you
                within a setting where heritage, connectivity, and everyday life
                come together seamlessly. With essential places, familiar
                surroundings, and meaningful connections always within reach,
                life here feels centered, balanced, and complete.
              </p>
            </Reveal>
          </div>
          <div className="clear-both" />
        </div>
      </div>

      {/* Main Container */}
      <div className="relative flex flex-col md:flex-row w-full h-[90vh] md:h-screen bg-brown-deep overflow-hidden md:overflow-visible">
        {/* DESKTOP Sidebar */}
        <div className="hidden md:flex w-full md:w-80 h-full p-10 z-30 flex-col justify-center bg-brown-deep/90 backdrop-blur-md">
          <div className="space-y-4">
            {LOCATIONS.map((loc) => {
              const isBrandProperty =
                loc.id === "continental-heights" ||
                loc.id === "continental-horizon";

              return (
                <div
                  key={loc.id}
                  onMouseEnter={() => setActiveId(loc.id)}
                  onMouseLeave={() => setActiveId(null)}
                  className="cursor-pointer group relative"
                >
                  <span
                    className={`text-xl md:text-2xl font-normal tracking-tight font-serif transition-all duration-300 block
                      ${
                        activeId === loc.id || isBrandProperty
                          ? "text-gradient-gold translate-x-4"
                          : "text-offWhite hover:text-gold-a"
                      }`}
                  >
                    {loc.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Map Area Wrapper */}
        <div className="relative flex-1 h-full overflow-visible">
          <div className="absolute inset-0 z-10 overflow-hidden">
            <img
              src="/assets/images/map.jpeg"
              className="w-full h-full object-cover grayscale contrast-125 mix-blend-luminosity opacity-85"
              alt="Map"
            />
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[60px_60px]" />
          </div>

          {/* Pins Container */}
          <div className="absolute inset-0 z-20">
            {LOCATIONS.map((loc) => {
              const isActive = activeId === loc.id;
              const isBrandProperty =
                loc.id === "continental-heights" ||
                loc.id === "continental-horizon";

              // Handle distinct inner logos safely depending on property reference
              const logoSrc =
                loc.id === "continental-horizon"
                  ? "/assets/images/horizon/horizon-logo-2.png" // Update template path if unique asset filename differs
                  : "/assets/images/heights/heights-logo-golden.png";

              return (
                <div
                  key={loc.id}
                  style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 ${
                    isBrandProperty ? "z-40" : "z-20"
                  }`}
                >
                  <motion.div
                    onClick={() => setActiveId(isActive ? null : loc.id)}
                    onMouseEnter={() => !isMobile && setActiveId(loc.id)}
                    onMouseLeave={() => !isMobile && setActiveId(null)}
                    animate={{ scale: isActive && !isBrandProperty ? 1.25 : 1 }}
                    className="relative cursor-pointer transition-all duration-300 flex flex-col items-center justify-center"
                  >
                    {isBrandProperty ? (
                      <div className="relative flex flex-col items-center">
                        <motion.div
                          initial={{ scale: 1, opacity: 0.8 }}
                          animate={{ scale: 2.5, opacity: 0 }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gold-mid pointer-events-none"
                        />
                        <div className="relative z-10 flex items-center justify-center">
                          <MapPin
                            size={isMobile ? 50 : 62}
                            strokeWidth={1.5}
                            className="text-brown-deep fill-brown-deep drop-shadow-2xl"
                          />
                          <div className="absolute top-[5px] md:top-[7px] w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden bg-brown-deep">
                            <img
                              src={logoSrc}
                              alt={`${loc.name} Logo`}
                              className="w-full h-full object-contain p-0.5"
                            />
                          </div>
                        </div>
                        <div className="absolute bottom-0 w-1.5 h-1.5 bg-gold-mid rounded-full blur-[1px]" />
                      </div>
                    ) : (
                      <div
                        className={`p-2 rounded-full flex items-center justify-center transition-colors ${
                          isActive
                            ? "bg-brown-deep text-gold-a shadow-xl border border-gold-a/30"
                            : "text-brown-deep"
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            initial={{ scale: 1, opacity: 0.6 }}
                            animate={{ scale: 2.2, opacity: 0 }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="absolute inset-0 rounded-full bg-brown-deep"
                          />
                        )}
                        <MapPin
                          size={isMobile ? 20 : 24}
                          strokeWidth={2}
                          fill={isActive ? "none" : "currentColor"}
                          className="relative z-10"
                        />
                      </div>
                    )}
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* DESKTOP Preview Card */}
          {!isMobile && (
            <AnimatePresence>
              {activeId && activeLocation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  style={{
                    left: `${activeLocation.x}%`,
                    top: `${activeLocation.y}%`,
                  }}
                  className="absolute z-[100] w-64 -translate-x-1/2 -translate-y-[calc(100%+50px)] pointer-events-none"
                >
                  <div className="bg-brown border border-warm-3/20 p-2 rounded-2xl shadow-2xl">
                    <div className="aspect-video w-full rounded-xl overflow-hidden border border-warm-3/10">
                      <img
                        src={activeLocation.image}
                        className="w-full h-full object-cover"
                        alt={activeLocation.name}
                      />
                    </div>
                    <div className="pt-3 pb-2 text-center">
                      <p className="text-offWhite text-[10px] tracking-widest uppercase font-bold px-2 font-sans">
                        {activeLocation.name} - {activeLocation.description}
                      </p>
                    </div>
                  </div>
                  <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-brown mx-auto" />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

        {/* MOBILE Bottom Carousel */}
        {isMobile && (
          <div
            ref={carouselRef}
            className="relative w-full shrink-0 z-20 flex overflow-x-auto snap-x snap-mandatory px-6 gap-4 py-6 bg-brown-deep [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {LOCATIONS.map((loc) => {
              const isBrandProperty =
                loc.id === "continental-heights" ||
                loc.id === "continental-horizon";

              return (
                <div
                  id={`card-${loc.id}`}
                  key={loc.id}
                  onClick={() => setActiveId(loc.id)}
                  className={`relative flex-shrink-0 w-[85%] max-w-[320px] snap-center rounded-2xl overflow-hidden aspect-[4/3] transition-all shadow-2xl border-2 ${
                    activeId === loc.id || isBrandProperty
                      ? "border-gold-mid scale-100 opacity-100"
                      : "border-transparent scale-95 opacity-80"
                  }`}
                >
                  <img
                    src={loc.image}
                    alt={loc.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brown-deep/90 via-brown-deep/30 to-transparent pointer-events-none" />

                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
                    <h3 className="text-offWhite text-2xl font-semibold leading-tight drop-shadow-md font-serif">
                      {loc.name}
                    </h3>
                    <span className="text-gradient-gold text-2xl font-bold bg-brown/90 px-2 py-1 rounded-md backdrop-blur-sm whitespace-nowrap ml-2 font-sans border border-warm-3/10">
                      {loc.description}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default InteractiveMap;