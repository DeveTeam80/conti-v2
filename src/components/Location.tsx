"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  useInView,
} from "framer-motion";
import { useSmooth } from "../hooks/useSmooth";
import InteractiveMap from "./Map";

const isLowGPU = (() => {
  if (typeof window === "undefined") return false;
  const isMobileUA = /Mobi|Android|iPhone|iPad|MacBook/i.test(
    navigator.userAgent,
  );
  const isWeakCPU = navigator.hardwareConcurrency
    ? navigator.hardwareConcurrency <= 8
    : false;
  return isMobileUA || isWeakCPU;
})();

interface Location {
  name: string;
  description: string;
  distance: string;
  unit: string;
  image: string;
  position: { top: string; left?: string; right?: string };
  isDestination?: boolean;
}

const locations = [
  {
    name: "Jamali Masjid",
    description: "A short walk that keeps daily moments of reflection close.",
    distance: "3",
    unit: "min walk",
    image: "/assets/images/location/jamali-masjid.png",
    position: { top: "8%", left: "5%" },
  },
  {
    name: "Rani Baug",
    description: "Green spaces that bring openness into the neighborhood.",
    distance: "3",
    unit: "min drive",
    image: "/assets/images/location/RaniBaugh.jpg",
    position: { top: "8%", right: "5%" },
  },
  {
    name: "Raudat Tahera",
    description: "A place of significance, just minutes away.",
    distance: "12",
    unit: "min drive",
    image: "/assets/images/location/raudat-tahera.png",
    position: { top: "54%", right: "8%" },
  },
  {
    name: "Saifee Hospital",
    description: "Trusted healthcare within easy reach.",
    distance: "10",
    unit: "min drive",
    image: "/assets/images/location/saifee-hospital.png",
    position: { top: "54%", left: "8%" },
  },
];

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
const LocationHeightsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const isInView = useInView(containerRef, {
    margin: "0px 0px -20% 0px",
    once: false,
  });

  const smoothProgress = useSmooth(scrollYProgress, 0.07);

  // 1. Pop out from the center (Opacities & Fade Windows)
  const mapOpacity = useTransform(
    smoothProgress,
    [0.32, 0.38, 0.88, 0.94],
    [0, 1, 1, 0]
  );
  
  const mapScale = useTransform(
    smoothProgress,
    [0.32, 0.42, 0.55, 0.82],
    [0.75, 1, 1.05, 1.05]
  );

  // 2. Continuous expansion to absolute full layout based on scroll progress
  const mapWidth = useTransform(
    smoothProgress,
    [0.42, 0.65],
    [isMobile ? "90vw" : "45vw", "95vw"]
  );

  const mapHeight = useTransform(
    smoothProgress,
    [0.42, 0.65],
    [isMobile ? "55vh" : "70vh", "100vh"]
  );

  const mapBorderRadius = useTransform(
    smoothProgress,
    [0.42, 0.60],
    ["24px", "0px"]
  );

  const mapY = useTransform(
    smoothProgress,
    [0.32, 0.42, 0.82, 0.92],
    ["12vh", "0vh", "0vh", "-8vh"]
  );

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh] md:h-[350vh] lg:h-[400vh] bg-[#faf8f4]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <BackgroundAtmosphere progress={smoothProgress} />
        <CenterText progress={smoothProgress} />
        <ConnectingLines progress={smoothProgress} />

        {/* Location cards layer */}
        <div className="absolute inset-0 z-10 overflow-hidden">
          {/* ── Desktop: absolute-positioned cards (≥1024px) ── */}
          <div className="hidden lg:block h-full w-full relative max-w-350 mx-auto">
            {locations.map((loc, i) => (
              <LocationCard
                key={loc.name}
                data={loc}
                index={i}
                total={locations.length}
                progress={smoothProgress}
              />
            ))}
          </div>

          {/* ── Tablet: 2-column richer card layout (768–1023px) ── */}
          <div className="hidden md:flex lg:hidden h-full w-full items-center justify-center px-6">
            <div className="grid grid-cols-2 gap-4 w-full max-w-xl">
              {locations.map((loc, i) => (
                <LocationCardTablet
                  key={loc.name}
                  data={loc}
                  index={i}
                  total={locations.length}
                  progress={smoothProgress}
                />
              ))}
            </div>
          </div>

          {/* ── Mobile: compact 2×2 grid (<768px) — anchored to bottom ── */}
          <div className="flex md:hidden h-full w-full items-end justify-center px-3 pb-[25vh]">
            <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
              {locations.map((loc, i) => (
                <LocationCardMobile
                  key={loc.name}
                  data={loc}
                  index={i}
                  total={locations.length}
                  progress={smoothProgress}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Map Layer Canvas */}
        <div className="absolute inset-0 z-[15] flex items-center justify-center pointer-events-none">
          <motion.div
            style={{
              opacity: mapOpacity,
              scale: mapScale,
              width: mapWidth,
              height: mapHeight,
              borderRadius: mapBorderRadius,
              y: mapY,
            }}
            className="relative overflow-hidden bg-brown-deep shadow-[0_0_60px_rgba(0,0,0,0.6)] pointer-events-auto border border-white/5 will-change-[width,height,transform,border-radius]"
          >
            <InteractiveMap />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─── CENTER TEXT ─────────────────────────────────────────────────────────────
const CenterText: React.FC<{ progress: MotionValue<number> }> = ({
  progress,
}) => {
  const opacity = useTransform(progress, [0, 0.01, 0.08, 0.12], [0, 1, 1, 0]);
  const scale = useTransform(progress, [0, 0.025, 0.08, 0.12], [0.9, 1, 1, 0.95]);
  const y = useTransform(progress, [0.08, 0.12], [0, -40]);

  const mobileOpacity = useTransform(progress, [0, 0.01, 0.25, 0.32], [0, 1, 1, 0]);
  const mobileY = useTransform(progress, [0.25, 0.32], [0, -40]);

  return (
    <>
      {/* Desktop / Tablet heading */}
      <motion.div
        style={{ opacity, scale, y }}
        className="hidden md:flex absolute inset-0 z-20 flex-col items-center justify-center pointer-events-none px-6"
      >
        <span className="text-gradient-gold uppercase tracking-[0.25em] text-xl font-medium mb-4">
          The Neighbourhood
        </span>
        <h2 className="text-art-deco text-[13vw] md:text-[10vw] lg:text-9xl text-gradient-gold drop-shadow-lg py-2 sm:py-4 text-center">
          Mazgaon.
        </h2>
        <p className="mt-1 text-art-deco text-[10vw] md:text-[6vw] lg:text-8xl text-gradient-gold/60 py-2 sm:py-3">
          The Heart.
        </p>
        <p className="mt-4 sm:mt-6 text-gradient-gold/50 text-base md:text-xl tracking-wide font-light uppercase">
          Where everyday life remains connected, familiar, and complete.
        </p>
      </motion.div>

      {/* Mobile heading */}
      <motion.div
        style={{ opacity: mobileOpacity, y: mobileY }}
        className="md:hidden absolute top-0 left-0 right-0 z-20 flex flex-col items-center justify-center pointer-events-none px-6 pt-[12vh]"
      >
        <span className="text-gradient-gold uppercase tracking-[0.25em] text-[1px] font-medium mb-3">
          The Neighbourhood
        </span>
        <h2 className="text-art-deco text-[16vw] text-gradient-gold drop-shadow-lg py-1 text-center">
          Mazgaon.
        </h2>
        <p className="mt-1 text-art-deco text-[9vw] text-gradient-gold/60 py-1">
          The Heart.
        </p>
      </motion.div>
    </>
  );
};

// ─── BACKGROUND ATMOSPHERE ────────────────────────────────────────────────────
const BackgroundAtmosphere: React.FC<{ progress: MotionValue<number> }> = ({
  progress,
}) => {
  const orb1Y = useTransform(progress, [0, 1], [0, -200]);
  const orb2Y = useTransform(progress, [0, 1], [0, 150]);
  const orb1Opacity = useTransform(progress, [0, 0.15, 0.7, 1], [0.1, 0.2, 0.2, 0.1]);
  const orb2Opacity = useTransform(progress, [0, 0.15, 0.7, 1], [0.08, 0.15, 0.15, 0.08]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <motion.div
        style={{ y: orb1Y, opacity: orb1Opacity }}
        className="absolute -top-[20%] -right-[15%] w-[80vh] h-[80vh] rounded-full"
      >
        <div
          className="w-full h-full"
          style={{
            background: "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)",
          }}
        />
      </motion.div>
      <motion.div
        style={{ y: orb2Y, opacity: orb2Opacity }}
        className="absolute -bottom-[20%] -left-[15%] w-[70vh] h-[70vh] rounded-full"
      >
        <div
          className="w-full h-full"
          style={{
            background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
          }}
        />
      </motion.div>
    </div>
  );
};

// ─── CONNECTING LINES (LOGO LEAF ARCHITECTURE) ───────────────────────────────
const PETAL_PATH = "m 1034.0328,2161.6698 c -3.7215,-0.3623 -9.0224,-2.684 -12.6394,-5.5359 -4.6021,-3.6285 -13.7324,-12.0107 -28.96423,-26.5909 -4.05001,-3.8767 -10.60201,-10.0675 -14.56,-13.7572 -34.5893,-32.245 -65.38094,-62.1642 -123.34681,-119.8521 -65.82319,-65.5076 -84.62614,-84.0442 -111.57203,-109.9918 l -11.70619,-11.2725 -3.19767,-5.2075 c -23.96167,-39.0224 -38.30152,-76.3566 -43.42086,-113.0475 -1.71824,-12.3148 -1.94265,-15.9483 -1.94671,-31.52 -0.004,-15.5789 0.22744,-19.3395 1.93057,-31.36 6.52521,-46.0542 27.3951,-92.1403 63.84902,-140.9951 20.649,-27.6734 54.66663,-65.7491 102.16818,-114.3562 5.07862,-5.1968 34.47162,-34.6487 65.31777,-65.4487 55.81229,-55.7288 70.57965,-70.7747 94.13546,-95.9109 l 2.607,-2.782 22.3319,21.3464 c 12.2825,11.7406 56.8293,54.273 98.9929,94.5165 70.8611,67.634 76.7408,73.3247 77.7144,75.2157 2.0747,4.03 1.6768,8.8699 -1.2177,14.8143 -4.7311,9.7159 -15.8547,19.1388 -25.5321,21.6284 -4.5908,1.181 -9.9972,0.6995 -12.6061,-1.1228 -0.4055,-0.2833 -28.8723,-26.829 -63.2595,-58.9904 -34.3871,-32.1613 -62.6471,-58.5232 -62.8,-58.5819 -0.1562,-0.06 -0.2779,16.8765 -0.2779,38.69 v 38.7966 l 46.9035,46.9996 c 25.7969,25.8498 46.8569,47.1341 46.8,47.2985 -0.1232,0.3557 -38.7326,36.344 -38.9149,36.273 -0.069,-0.027 -18.6346,-17.0909 -41.2566,-37.92 -22.622,-20.8291 -41.2553,-37.871 -41.4072,-37.871 -0.1519,0 -34.01013,35.7945 -75.24049,79.5433 l -74.96429,79.5433 -2.05806,3.6358 c -16.32682,28.8431 -15.13596,64.2363 3.15249,93.6939 2.58914,4.1704 6.14767,8.9946 8.29669,11.2477 0.81888,0.8586 34.60888,32.5538 75.08888,70.4339 40.48,37.8801 74.47368,69.7223 75.54158,70.7604 l 1.9416,1.8874 76.9384,-82.9322 76.9384,-82.9323 1.6399,-3.2406 c 10.8248,-21.3916 12.0814,-48.1723 3.3127,-70.6006 -1.5828,-4.0486 -4.1519,-9.2499 -6.4436,-13.0459 -1.7552,-2.9073 -6.7897,-9.7698 -7.8305,-10.6739 -0.5696,-0.4946 -2.3791,1.316 -37.5182,37.5418 l -36.9198,38.0616 -0.8402,-0.766 c -0.4622,-0.4213 -9.2324,-7.9427 -19.4895,-16.7142 -10.257,-8.7716 -18.609,-16.0573 -18.56,-16.1906 0.1496,-0.4061 112.651,-121.5728 112.8785,-121.5728 0.5709,0 13.0265,11.6645 21.1463,19.8032 11.4113,11.4379 16.8162,17.5374 23.9278,27.0027 20.8371,27.734 30.4615,56.1768 30.4522,89.9941 -0.01,25.4962 -4.398,43.744 -15.2006,63.1717 -8.1272,14.6162 -18.135,27.8341 -38.004,50.1944 -17.3201,19.4918 -23.0154,25.4169 -63.5884,66.1539 -40.3325,40.4955 -49.9683,50.5298 -64.8705,67.5533 -3.4453,3.9356 -6.4599,7.4352 -6.6992,7.7769 -0.3627,0.5177 -0.4217,7.8339 -0.354,43.9055 l 0.081,43.2842 97.6314,-101.26 c 53.6973,-55.6929 98.4215,-102.1959 99.3872,-103.3399 5.2277,-6.193 12.9766,-16.7716 17.5802,-24 20.5086,-32.2024 31.8604,-65.6238 34.5088,-101.6 0.4201,-5.7064 0.4273,-21.0919 0.012,-26.72 -2.4208,-32.8446 -12.1867,-63.3762 -29.5299,-92.32 -6.0185,-10.0441 -7.9714,-12.5286 -26.7883,-34.08 -11.855,-13.5779 -14.8708,-17.1492 -17.698,-20.9583 l -1.8989,-2.5584 0.1637,-1.9216 c 0.3091,-3.6293 2.5152,-8.4682 6.7845,-14.8817 6.5869,-9.8951 16.4865,-19.3862 22.382,-21.4583 2.0688,-0.7271 4.5717,-0.8029 6.0547,-0.1833 3.5201,1.4708 20.0148,17.8328 35.5655,35.2795 6.2953,7.0628 8.4491,9.7353 13.1246,16.286 39.4273,55.2395 55.0694,125.6597 43.358,195.1961 -5.8499,34.7336 -18.5167,67.7973 -37.3042,97.3737 -4.0798,6.4227 -10.4939,15.4377 -14.96,21.0263 -2.3199,2.9029 -43.226,45.6438 -135.3682,141.44 -72.6241,75.504 -132.3739,137.5375 -132.7775,137.8523 -0.8871,0.692 -4.3912,1.1076 -7.1081,0.8431 z";

// ─── CONNECTING LINES (LOGO LEAF ARCHITECTURE) ───────────────────────────────
const ConnectingLines: React.FC<{ progress: MotionValue<number> }> = ({
  progress,
}) => {
  // Graceful fade-in window synchronized with your card animations
  const opacity = useTransform(
    progress,
    [0.05, 0.15, 0.45, 0.55, 0.68],
    [0, 0.6, 0.6, 0.1, 0]
  );

  // Traces the exact structural lines as the user scrolls
  const pathLength = useTransform(progress, [0.08, 0.42], [0, 1]);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-x-0 top-0 bottom-0 max-w-7xl mx-auto z-[1] pointer-events-none hidden md:flex items-center justify-center -translate-y-[250px] overflow-visible"
    >
      <svg
        className="w-full h-full absolute inset-0 overflow-visible"
        viewBox="0 0 2000 2400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* TUNED VECTOR GEOMETRY:
          - Replaced raw translate with a full scale transform matrix context.
          - Multiplied the scale factor up to 1.28x to increase the petal's footprint size across the page grid.
          - Adjusted the X/Y coordinate origin offset values to lock it dead center on the vertical stem as it expands.
        */}
        <g transform="matrix(1.28, 0, 0, 1.28, -314, -220)">
          
          {/* Main Structural Petal Contour Line */}
          <motion.path
            d={PETAL_PATH}
            stroke="url(#leafLogoGradient)"
            strokeWidth="4" // Adjusted stroke thickness slightly to match the upscale balance
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            style={{ pathLength }}
          />

          {/* Inner Shell Duplicate: Fixed syntax via standard SVG matrix markup */}
          <motion.path
            d={PETAL_PATH}
            stroke="url(#leafLogoGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            style={{ pathLength }}
            transform="matrix(0.85, 0, 0, 0.85, 155.1, 247.5)"
            opacity="0.5"
          />
        </g>

        {/* Central Vertical stem anchor centered relative to the 2000px coordinate grid */}
        <motion.path
          d="M1000 200 L1000 2100"
          stroke="url(#leafLogoGradient)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          style={{ pathLength }}
          opacity="0.3"
        />

        <defs>
          <linearGradient
            id="leafLogoGradient"
            x1="1000"
            y1="200"
            x2="1000"
            y2="2100"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#1A5276" stopOpacity="0" />
            <stop offset="0.15" stopColor="#0F395C" stopOpacity="0.85" />
            <stop offset="0.5" stopColor="#1A5276" stopOpacity="1" />
            <stop offset="0.85" stopColor="#061629" stopOpacity="0.75" />
            <stop offset="1" stopColor="#061629" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};
// ─── SHARED CARD PROPS ───────────────────────────────────────────────────────
interface LocationCardProps {
  data: Location;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

// ─── DESKTOP LOCATION CARD ────────────────────────────────────────────────────
const LocationCard: React.FC<LocationCardProps> = ({ data, index, total, progress }) => {
  const segmentSize = 0.25 / total;
  const start = 0.08 + index * segmentSize;
  const peakStart = start + segmentSize * 0.5;

  const enterOpacity = useTransform(progress, [start, peakStart], [0, 1]);
  const enterScale = useTransform(progress, [start, peakStart], [0.85, 1]);
  const enterY = useTransform(progress, [start, peakStart], [60, 0]);
  const isLeft = "left" in data.position;
  const isTop = data.position.top === "8%";

  const exitScale = useTransform(progress, [0.42, 0.52], [1, 0.55]);
  const exitX = useTransform(progress, [0.42, 0.52], [0, isLeft ? -80 : 80]);
  const exitY = useTransform(progress, [0.42, 0.52], [0, isTop ? 60 : -60]);
  const exitOpacity = useTransform(progress, [0.42, 0.5, 0.6, 0.68], [1, 0.3, 0.3, 0]);

  const combinedScale = useTransform(
    [enterScale, exitScale] as MotionValue<number>[],
    ([eScale, xScale]: number[]) => eScale * xScale,
  );
  const opacity = useTransform(
    [enterOpacity, exitOpacity] as MotionValue<number>[],
    ([enter, exit]: number[]) => Math.min(enter, exit),
  );
  const combinedY = useTransform(
    [enterY, exitY] as MotionValue<number>[],
    ([eY, xY]: number[]) => eY + xY,
  );

  const cardClasses = data.isDestination
    ? "bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-secondary)]/95 border-[var(--color-accent)]/30"
    : "bg-[var(--color-secondary)]/80 hover:bg-[var(--color-secondary)]/90 border-white/10 hover:border-[var(--color-accent)]/50";

  return (
    <motion.div
      style={{
        position: "absolute",
        ...data.position,
        width: "clamp(280px, 22vw, 380px)",
        opacity,
        scale: combinedScale,
        y: combinedY,
        x: exitX,
      }}
      className="will-change-transform origin-center"
    >
      <div className={`group relative overflow-hidden rounded-xl border transition-all duration-500 ${cardClasses}`}>
        <div className="relative h-48 overflow-hidden pointer-events-none">
          <img
            src={data.image}
            alt={data.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-secondary)] via-transparent to-transparent" />
          <div className="absolute bottom-3 left-5 flex items-baseline gap-2">
            <span
              className={"text-7xl leading-none text-white"}
              style={{ fontFeatureSettings: "'tnum'" }}
            >
              {data.distance}
            </span>
            <span className="text-xl uppercase tracking-widest text-white pb-2">
              {data.unit}
            </span>
          </div>
        </div>
        <div className="p-5 pt-3">
          <h3 className={`text-3xl font-bold mb-1 ${data.isDestination ? "text-gradient-gold" : "text-gradient-gold"}`}>
            {data.name}
          </h3>
          <p className="text-xl text-gradient-gold/50 font-normal leading-relaxed">
            {data.description}
          </p>
        </div>
        {!isLowGPU && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
        )}
        {data.isDestination && (
          <div className="absolute top-4 right-4 w-3 h-3">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-40 animate-ping" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--color-accent)]" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ─── TABLET LOCATION CARD ────────────────────────────────────────────────────
const LocationCardTablet: React.FC<LocationCardProps> = ({ data, index, total, progress }) => {
  const segmentSize = 0.25 / total;
  const start = 0.08 + index * segmentSize;
  const peakStart = start + segmentSize * 0.5;

  const enterOpacity = useTransform(progress, [start, peakStart], [0, 1]);
  const exitOpacity = useTransform(progress, [0.42, 0.5, 0.6, 0.68], [1, 0.3, 0.3, 0]);
  const opacity = useTransform(
    [enterOpacity, exitOpacity] as MotionValue<number>[],
    ([enter, exit]: number[]) => Math.min(enter, exit),
  );
  const y = useTransform(progress, [start, peakStart], [40, 0]);
  const enterScale = useTransform(progress, [start, peakStart], [0.9, 1]);
  const exitScale = useTransform(progress, [0.42, 0.52], [1, 0.65]);
  const scale = useTransform(
    [enterScale, exitScale] as MotionValue<number>[],
    ([eS, xS]: number[]) => eS * xS,
  );

  const cardClasses = data.isDestination
    ? "bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-secondary)]/95 border-[var(--color-accent)]/30"
    : "bg-[var(--color-secondary)]/80 border-white/10";

  return (
    <motion.div style={{ opacity, y, scale }} className="will-change-transform">
      <div className={`overflow-hidden rounded-xl border ${cardClasses}`}>
        <div className="relative h-40 overflow-hidden">
          <img
            src={data.image}
            alt={data.name}
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-secondary)] via-transparent to-transparent" />
          <div className="absolute bottom-2 left-3 flex items-baseline gap-1.5">
            <span
              className={`text-5xl leading-none ${data.isDestination ? "text-gradient-gold" : "text-gradient-gold/85"}`}
              style={{ fontFeatureSettings: "'tnum'" }}
            >
              {data.distance}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-gradient-gold/50 pb-1">
              {data.unit}
            </span>
          </div>
          {data.isDestination && (
            <div className="absolute top-3 right-3 w-3 h-3">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-40 animate-ping" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--color-accent)]" />
            </div>
          )}
        </div>
        <div className="p-3.5">
          <h3 className={`text-base font-decart leading-tight mb-1 ${data.isDestination ? "text-gradient-gold" : "text-gradient-gold"}`}>
            {data.name}
          </h3>
          <p className="text-xs text-gradient-gold/45 font-light leading-relaxed">
            {data.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// ─── MOBILE LOCATION CARD ─────────────────────────────────────────────────────
const LocationCardMobile: React.FC<LocationCardProps> = ({ data, index, total, progress }) => {
  const segmentSize = 0.18 / total;
  const start = 0.12 + index * segmentSize;
  const peakStart = start + segmentSize * 0.5;

  const enterOpacity = useTransform(progress, [start, peakStart], [0, 1]);
  const exitOpacity = useTransform(progress, [0.38, 0.50], [1, 0]);
  const opacity = useTransform(
    [enterOpacity, exitOpacity] as MotionValue<number>[],
    ([enter, exit]: number[]) => Math.min(enter, exit),
  );
  const y = useTransform(progress, [start, peakStart], [30, 0]);
  const enterScale = useTransform(progress, [start, peakStart], [0.92, 1]);
  const exitScale = useTransform(progress, [0.38, 0.50], [1, 0.85]);
  const scale = useTransform(
    [enterScale, exitScale] as MotionValue<number>[],
    ([eS, xS]: number[]) => eS * xS,
  );

  const cardClasses = data.isDestination
    ? "bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-secondary)]/95 border-[var(--color-accent)]/30"
    : "bg-[var(--color-secondary)]/85 border-white/10";

  return (
    <motion.div style={{ opacity, y, scale }} className="will-change-transform">
      <div className={`overflow-hidden rounded-xl border ${cardClasses}`}>
        <div className="relative h-28 overflow-hidden">
          <img
            src={data.image}
            alt={data.name}
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-1.5 left-2.5 flex items-baseline gap-1">
            <span
              className={`text-3xl leading-none ${data.isDestination ? "text-gradient-gold" : "text-gradient-gold/90"}`}
              style={{ fontFeatureSettings: "'tnum'" }}
            >
              {data.distance}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-gradient-gold/50 pb-0.5">
              {data.unit}
            </span>
          </div>
          {data.isDestination && (
            <div className="absolute top-2 right-2 w-2.5 h-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-40 animate-ping" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--color-accent)]" />
            </div>
          )}
        </div>
        <div className="p-2.5">
          <h3 className={`text-sm font-decart leading-tight ${data.isDestination ? "text-gradient-gold" : "text-gradient-gold"}`}>
            {data.name}
          </h3>
          <p className="text-[10px] text-gradient-gold/40 font-light mt-0.5 leading-snug line-clamp-2">
            {data.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default LocationHeightsSection;