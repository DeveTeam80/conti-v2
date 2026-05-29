"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/* ─────────────────────────────────────────
    DATA
───────────────────────────────────────── */
interface PanelData {
  id: number;
  num: string;
  tabLabel: string;
  image: string;
  heading: string;
  italicHeading: string;
  paragraphs: string[];
  quote: string;
  position: string;
}

const STORY_PANELS: PanelData[] = [
  {
    id: 0,
    num: "01",
    tabLabel: "The Beginning",
    image: "/assets/images/how-we-build.png",
    heading: "Twenty years in the trade.",
    italicHeading: "Eight in our own name.",
    paragraphs: [
      "Continental Group began in 1990 as a construction company. For the first 20 years, we built for others. learning the discipline, the materials, the patience required to deliver a building exactly as promised.",
      "Eight years ago, we started developing premium residential projects under our own name. That long apprenticeship is the reason we don't cut corners. We have spent two decades watching what happens when builders do.",
    ],
    quote: "We are builders first. Developers second.",
    position: "center",
  },
  {
    id: 1,
    num: "02",
    tabLabel: "Why Mazgaon",
    image: "/assets/images/mazgaon.png",
    heading: "A neighbourhood",
    italicHeading: "that knows itself.",
    paragraphs: [
      "Mazgaon is not just a postcode. It is a community — a network of families, masjids, schools, hospitals, and businesses that have grown together for decades.",
      "Our buildings are on R.B. Marg, within walking distance of Jamali Masjid, 12 minutes from Raudat Tahera, 10 from Saifee Hospital. We build here because this is where our community lives.",
    ],
    quote: "We don't build where the market is. We build where we belong.",
    position: "top",
  },
  {
    id: 2,
    num: "03",
    tabLabel: "How We Build",
    image: "/assets/images/how-we-build.jpeg",
    heading: "No joint development.",
    italicHeading: "No shortcuts.",
    paragraphs: [
      "Every Continental project sits on land we own outright. No landowner partners, no joint development agreements, no third-party delays. When we say a building will be ready on a particular date, it will be.",
      "We use Mivan aluminium formwork construction, keep density low, and apply the same quality fittings on every floor. The premium is the baseline, not reserved for the top floors.",
    ],
    quote: "Self-owned land. Proven delivery. No compromises.",
    position: "right",
  },
  {
    id: 3,
    num: "04",
    tabLabel: "Our Vision",
    image: "/assets/images/mumbai-skyline.jpg",
    heading: "To be a brand",
    italicHeading: "admired for what it builds.",
    paragraphs: [
      "Our vision is to be recognised as an industry leader for thoughtfully designed, high-quality homes, and to be known for strong, long-term relationships with every customer and stakeholder.",
      "We don't build more than we can build well. One project at a time, finished before the next begins. That is the Continental Group way.",
    ],
    quote: "Quality is not a feature. It is the standard we start from.",
    position: "right",
  },
];

/* ─────────────────────────────────────────
    COMPONENT
───────────────────────────────────────── */
export default function StorySection() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const panel = STORY_PANELS[activeTab];

  return (
    <section
      id="story"
      className="
        bg-[#faf8f4]
        py-[130px] px-[60px]
        grid grid-cols-[380px_1fr]
        gap-[80px]
        items-stretch
      "
    >
      {/* ═══════════════════════════════
          LEFT — sticky tab navigation (Now top-aligned with right content)
          ═══════════════════════════════ */}
      <div className="sticky h-fit flex flex-col justify-start">
        {/* Eyebrow */}
        <div className="flex items-center gap-[14px] mb-5">
          <span className="font-sans text-[12px] font-medium tracking-[0.4em] uppercase text-[#ca8c19] border border-[#ca8c19] rounded-full py-2 px-3">
            Our Story
          </span>
        </div>

        {/* Title */}
        <h2
          className="
            font-serif text-[clamp(42px,5vw,62px)]
            font-normal leading-[1.06] tracking-[0.005em]
            text-[#352b2b] mb-6
          "
        >
          Two Decades of Craft.
          {/* <em className="not-italic text-[#0f395c]">The Continental Way.</em> */}
        </h2>

        {/* Tabs */}
        <div className="flex flex-col gap-0.5">
          {STORY_PANELS.map((p) => {
            const isActive = activeTab === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActiveTab(p.id)}
                className={`
                  px-6 py-5 cursor-pointer
                  text-left outline-none
                  border-l-2 transition-all duration-300
                  ${
                    isActive
                      ? "bg-[#f4ede2] border-l-[#ca8c19]"
                      : "bg-transparent border-l-transparent hover:bg-[#f4ede2]"
                  }
                `}
              >
                {/* Number */}
                <span
                  className={`
                    block font-sans text-[15px] font-medium tracking-[0.4em] uppercase
                    text-[#ca8c19] mb-1.5
                    transition-opacity duration-300
                    ${isActive ? "opacity-100" : "opacity-50"}
                  `}
                >
                  {p.num}
                </span>

                {/* Label */}
                <span
                  className={`
                    block font-serif text-3xl font-bold leading-[1.2]
                    transition-colors duration-300
                    ${isActive ? "text-[#0f395c]" : "text-[#7a726a]"}
                  `}
                >
                  {p.tabLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ═══════════════════════════════
          RIGHT — animated panel
          ═══════════════════════════════ */}
      <div className="min-h-[600px] flex flex-col justify-start">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Added items-start here to ensure text and image share an immediate top boundary */}
            <div className="flex flex-row gap-10 items-start w-full">
              {/* Image — right-to-left clip reveal, portrait aspect */}
              <div className="relative w-full aspect-[3/4] overflow-hidden flex-shrink-0 basis-[45%]">
                <motion.img
                  key={`img-${activeTab}`}
                  src={panel.image}
                  alt={panel.tabLabel}
                  referrerPolicy="no-referrer"
                  // Dynamic class using a template literal
                  className={`w-full h-full object-cover block object-${panel.position}`}
                  initial={{ clipPath: "inset(0 100% 0 0)", scale: 1.06 }}
                  animate={{ clipPath: "inset(0 0% 0 0)", scale: 1 }}
                  transition={{
                    clipPath: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
                    scale: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
                  }}
                />
                {/* ambient veil */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/15 to-transparent pointer-events-none" />
              </div>

              {/* Text content */}
              <div className="flex flex-col flex-1 pt-5">
                {/* Heading */}
                <h3
                  className="
                    font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold
                    leading-[1.15] tracking-[0.005em]
                    text-[#352b2b] mb-6
                  "
                >
                  {panel.heading} <br />
                  <em className="text-[#0f395c]">{panel.italicHeading}</em>
                </h3>

                {/* Body paragraphs */}
                <div className="space-y-[18px]">
                  {panel.paragraphs.map((para, i) => (
                    <p
                      key={i}
                      className="
                        font-sans text-2xl font-normal
                        text-[#7a726a] leading-[1.95]
                      "
                    >
                      {para}
                    </p>
                  ))}
                </div>

                {/* Pull quote */}
                <blockquote
                  className="
                    mt-9 px-8 py-7
                    border-l-2 border-l-[#ca8c19]
                    bg-[#f4ede2]
                    font-serif text-[21px] font-normal
                    text-[#352b2b] leading-[1.5]
                  "
                >
                  {panel.quote}
                </blockquote>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
