"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { MapPin } from "lucide-react";
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
    description: "550 m",
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

const BRAND_IDS = ["continental-heights", "continental-horizon"];
const isBrand = (id: string) => BRAND_IDS.includes(id);

const InteractiveMap: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeLocation = LOCATIONS.find((l) => l.id === activeId);
  const sectionRef = useRef<HTMLElement>(null);

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
  const headerY = useTransform(smoothScroll, [0, 1], [50, -50]);

  // Scroll mobile carousel to selected pin
  useEffect(() => {
    if (isMobile && activeId && carouselRef.current) {
      const activeElement = document.getElementById(`card-${activeId}`);
      activeElement?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeId, isMobile]);

  // Smart placement so preview cards never clip off the top / left edges
  const placement = activeLocation
    ? { below: activeLocation.y < 34, left: activeLocation.x < 22 }
    : null;

  return (
    <section
      ref={sectionRef}
      className="relative h-full w-full overflow-hidden bg-brown-deep"
    >
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-brown-deep md:flex-row">
        {/* ───────────── DESKTOP SIDEBAR ───────────── */}
        {/* <aside className="relative z-30 hidden h-full w-[360px] flex-shrink-0 flex-col justify-center border-r border-gold-a/10 bg-brown-deep/95 px-12 py-12 backdrop-blur-md box-border md:flex xl:w-[400px]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_0%_50%,rgba(202,140,25,0.07),transparent_60%)]" />

          <motion.div style={{ y: headerY }} className="relative mb-9">
            <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.32em] text-gold-a/80">
              The Neighbourhood
            </span>
            <h2 className="mt-3 font-serif text-3xl font-normal leading-[1.08] text-offWhite xl:text-4xl">
              Everything,
              <span className="block text-gradient-gold">within reach</span>
            </h2>
            <div className="mt-5 h-px w-16 bg-gradient-to-r from-gold-a to-transparent" />
          </motion.div>

          <nav className="relative flex flex-col">
            {LOCATIONS.map((loc) => {
              const active = activeId === loc.id;
              const brand = isBrand(loc.id);
              return (
                <button
                  key={loc.id}
                  type="button"
                  onMouseEnter={() => setActiveId(loc.id)}
                  onMouseLeave={() => setActiveId(null)}
                  className="group relative flex items-baseline justify-between gap-4 border-b border-white/[0.05] py-3 text-left last:border-b-0"
                >

                  <span
                    className={`absolute left-0 top-1/2 h-6 w-[2px] origin-center -translate-y-1/2 rounded-full bg-gold-a transition-all duration-300 ${
                      active ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                    }`}
                  />
                  <span className="flex items-center gap-2.5">
                    {brand && (
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-mid shadow-[0_0_8px_rgba(202,140,25,0.85)]" />
                    )}
                    <span
                      className={`font-serif text-xl leading-tight tracking-tight transition-all duration-300 xl:text-[1.45rem] ${
                        active || brand
                          ? "translate-x-3 text-gradient-gold"
                          : "text-offWhite/90 group-hover:translate-x-1.5 group-hover:text-gold-a"
                      }`}
                    >
                      {loc.name}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 font-sans text-[11px] font-medium uppercase tracking-[0.18em] tabular-nums transition-colors duration-300 ${
                      active || brand ? "text-gold-a/90" : "text-offWhite/35"
                    }`}
                  >
                    {loc.description}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside> */}

        {/* ───────────── MAP AREA ───────────── */}
        <div className="relative h-full min-w-0 flex-1 overflow-hidden">
          <div className="absolute inset-0 z-10">
            <img
              src="/assets/images/map.jpeg"
              className="h-full w-full object-cover mix-blend-luminosity"
              alt="Area map"
            />
            {/* <div className="absolute inset-0 bg-gradient-to-br from-brown-deep/30 via-transparent to-brown-deep/60 mix-blend-multiply" /> */}
            {/* hairline grid */}
            {/* <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[64px_64px]" /> */}
            {/* edge vignette */}
            {/* <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_50%,transparent_55%,rgba(28,20,14,0.55)_100%)]" />
            <div className="absolute inset-y-0 left-0 hidden w-32 bg-gradient-to-r from-brown-deep/80 to-transparent md:block" /> */}
          </div>

          {/* Pins */}
          {/* <div className="absolute inset-0 z-20">
            {LOCATIONS.map((loc) => {
              const active = activeId === loc.id;
              const brand = isBrand(loc.id);
              const logoSrc =
                loc.id === "continental-horizon"
                  ? "/assets/images/horizon/horizon-logo-2.png"
                  : "/assets/images/heights/heights-logo-golden.png";

              return (
                <div
                  key={loc.id}
                  style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 ${
                    brand ? "z-40" : active ? "z-30" : "z-20"
                  }`}
                >
                  <motion.div
                    onClick={() => setActiveId(active ? null : loc.id)}
                    onMouseEnter={() => !isMobile && setActiveId(loc.id)}
                    onMouseLeave={() => !isMobile && setActiveId(null)}
                    className="group relative flex cursor-pointer flex-col items-center justify-center"
                  >
                    {brand ? (
                      <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 3.4,
                          ease: "easeInOut",
                        }}
                        className="relative flex flex-col items-center"
                      >
                        <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-mid/25 blur-xl" />
                       
                        <motion.span
                          initial={{ scale: 1, opacity: 0.55 }}
                          animate={{ scale: 2.4, opacity: 0 }}
                          transition={{
                            repeat: Infinity,
                            duration: 2.4,
                            ease: "easeOut",
                          }}
                          className="pointer-events-none absolute left-1/2 top-[22px] h-7 w-7 -translate-x-1/2 rounded-full bg-gold-mid"
                        />
                        <div className="relative z-10 flex items-center justify-center">
                          <MapPin
                            size={isMobile ? 52 : 64}
                            strokeWidth={1.25}
                            className="text-brown-deep fill-brown-deep drop-shadow-[0_8px_16px_rgba(0,0,0,0.45)]"
                          />
                          <div className="absolute top-[6px] h-9 w-9 -translate-y-px rounded-full ring-1 ring-gold-a/60 md:top-[8px] md:h-11 md:w-11" />
                          <div className="absolute top-[7px] h-8 w-8 overflow-hidden rounded-full bg-brown-deep md:top-[9px] md:h-10 md:w-10">
                            <img
                              src={logoSrc}
                              alt={`${loc.name} logo`}
                              className="h-full w-full object-contain p-0.5"
                            />
                          </div>
                        </div>
                        <div className="-mt-1 h-1.5 w-1.5 rounded-full bg-gold-mid shadow-[0_0_8px_rgba(202,140,25,0.9)]" />
                       
                        <span className="mt-1.5 whitespace-nowrap rounded-full border border-gold-a/30 bg-brown-deep/85 px-2.5 py-0.5 font-sans text-[9px] font-semibold uppercase tracking-[0.18em] text-gold-a backdrop-blur-sm">
                          {loc.name}
                        </span>
                      </motion.div>
                    ) : (
                      <div className="relative flex items-center justify-center">
                        {active && (
                          <motion.span
                            initial={{ scale: 1, opacity: 0.5 }}
                            animate={{ scale: 2.6, opacity: 0 }}
                            transition={{
                              repeat: Infinity,
                              duration: 1.6,
                              ease: "easeOut",
                            }}
                            className="pointer-events-none absolute h-5 w-5 rounded-full bg-gold-mid"
                          />
                        )}
                        <span
                          className={`relative z-10 block rounded-full ring-1 transition-all duration-300 ${
                            active
                              ? "h-3.5 w-3.5 bg-gold-a ring-gold-a/70 shadow-[0_0_12px_rgba(202,140,25,0.85)]"
                              : "h-2.5 w-2.5 bg-offWhite/85 ring-white/40 group-hover:bg-gold-a group-hover:ring-gold-a/60"
                          }`}
                        />
                      </div>
                    )}
                  </motion.div>
                </div>
              );
            })}
          </div> */}

          {/* DESKTOP Preview Card */}
          {!isMobile && (
            <AnimatePresence>
              {activeId && activeLocation && placement && (
                <motion.div
                  initial={{ opacity: 0, y: placement.below ? -8 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: placement.below ? -8 : 8 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    left: `${activeLocation.x}%`,
                    top: `${activeLocation.y}%`,
                  }}
                  className={`pointer-events-none absolute z-[100] w-64 ${
                    placement.left ? "" : "-translate-x-1/2"
                  } ${
                    placement.below
                      ? "translate-y-[46px]"
                      : "-translate-y-[calc(100%_+_46px)]"
                  }`}
                >
                  <div className="relative rounded-2xl border border-gold-a/20 bg-brown/95 p-2 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.7)] backdrop-blur-md">
                    {/* pointer */}
                    <span
                      className={`absolute h-3 w-3 rotate-45 bg-brown border-gold-a/20 ${
                        placement.below
                          ? "-top-1.5 border-l border-t"
                          : "-bottom-1.5 border-b border-r"
                      } ${placement.left ? "left-5" : "left-1/2 -translate-x-1/2"}`}
                    />
                    <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/5">
                      <img
                        src={activeLocation.image}
                        className="h-full w-full object-cover"
                        alt={activeLocation.name}
                      />
                    </div>
                    <div className="flex items-center justify-between gap-2 px-1.5 pb-1 pt-2.5">
                      <p className="font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-offWhite">
                        {activeLocation.name}
                      </p>
                      <span className="shrink-0 rounded-full bg-gold-a/15 px-2 py-0.5 font-sans text-[10px] font-bold tracking-wide text-gold-a">
                        {activeLocation.description}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

        {/* ───────────── MOBILE CAROUSEL ───────────── */}
        {isMobile && (
          <div className="relative z-20 w-full shrink-0 bg-brown-deep">
            <div className="flex items-center justify-between px-6 pb-1 pt-5">
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-a/80">
                The Neighbourhood
              </span>
              <span className="font-sans text-[10px] uppercase tracking-widest text-offWhite/40">
                {LOCATIONS.length} places
              </span>
            </div>
            <div
              ref={carouselRef}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {LOCATIONS.map((loc) => {
                const active = activeId === loc.id;
                const brand = isBrand(loc.id);
                return (
                  <button
                    id={`card-${loc.id}`}
                    key={loc.id}
                    type="button"
                    onClick={() => setActiveId(loc.id)}
                    className={`relative aspect-[4/3] w-[82%] max-w-[320px] shrink-0 snap-center overflow-hidden rounded-2xl border-2 text-left shadow-2xl transition-all duration-300 ${
                      active || brand
                        ? "border-gold-mid opacity-100 shadow-[0_12px_40px_-8px_rgba(202,140,25,0.35)]"
                        : "border-white/5 opacity-80"
                    }`}
                  >
                    <img
                      src={loc.image}
                      alt={loc.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brown-deep via-brown-deep/30 to-transparent" />
                    {brand && (
                      <span className="absolute left-3 top-3 rounded-full border border-gold-a/40 bg-brown-deep/70 px-2 py-0.5 font-sans text-[9px] font-bold uppercase tracking-[0.18em] text-gold-a backdrop-blur-sm">
                        Continental
                      </span>
                    )}
                    <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-2">
                      <h3 className="font-serif text-2xl font-semibold leading-tight text-offWhite drop-shadow-md">
                        {loc.name}
                      </h3>
                      <span className="ml-2 shrink-0 whitespace-nowrap rounded-md border border-gold-a/20 bg-brown-deep/80 px-2 py-1 font-sans text-base font-bold text-gradient-gold backdrop-blur-sm">
                        {loc.description}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default InteractiveMap;