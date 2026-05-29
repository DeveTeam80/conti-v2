"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';

/* ─────────────────────────────────────────
   COUNTER HOOK
   Counts from 0 → target over `duration` ms
   once the element scrolls into view.
───────────────────────────────────────── */
function useCounter(target: number, duration: number = 1800, started: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) {
      setCount(0); // reset when out of view
      return;
    }
    let startTime: number | null = null;
    let raf: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf); // cleanup if leaves view mid-count
  }, [started, target, duration]);

  return count;
}

/* ─────────────────────────────────────────
   SINGLE METRIC ITEM
───────────────────────────────────────── */
interface MetricProps {
  num: string;       // e.g. "20+", "500+", "55"
  label: string;
  sub: string;
  delay: number;
}

function MetricItem({ num, label, sub, delay }: MetricProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.4 });

  // Parse numeric part and suffix ("+", "", etc.)
  const match = num.match(/^(\d+)(\D*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : '';

  const count = useCounter(target, 1800, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col px-10 first:pl-0 last:pr-0"
    >
      {/* Large counter number */}
      <span
        className="font-light leading-none tracking-[-0.02em] text-[#0f395c]"
        style={{ fontSize: 'clamp(48px, 5.5vw, 80px)' }}
      >
        {count}{suffix}
      </span>

      {/* Bold label */}
      <span className="text-[14px] font-semibold tracking-[0.22em] uppercase text-[#0f395c] mt-3 leading-snug">
        {label}
      </span>

      {/* Small caps sub */}
      <span className="text-[12px] font-normal tracking-[0.3em] uppercase text-[#0f395c] mt-1">
        {sub}
      </span>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   METRICS STRIP DATA
───────────────────────────────────────── */
const METRICS = [
  {
    id: 1,
    num: '30+',
    label: 'YEARS OF EXPERIENCE IN',
    sub: 'CONSTRUCTION INDUSTRY',
  },
  {
    id: 2,
    num: '16+',
    label: 'YEARS OF EXPERIENCE IN',
    sub: 'REAL ESTATE DEVELOPMENT',
  },
  {
    id: 3,
    num: '1M+',
    label: 'SQ. FT.',
    sub: 'DELIVERED WITH PRECISION',
  },
  {
    id: 4,
    num: '250+',
    label: 'FAMILIES',
    sub: 'CURRENTLY IN RESIDENCE',
  },
];

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export default function GlassCardsSection() {
  return (
    <section
      id="why-continental"
      className="relative w-full overflow-hidden z-20"
    >
      {/* ══════════════════════════════════
          GLASS CARDS
      ══════════════════════════════════ */}

      {/* ambient glow blobs */}
      <div className="absolute top-[30%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#eec06b]/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-[#0f395c]/5 blur-[140px] pointer-events-none" />

      <div className="relative z-10 px-[60px] pt-[120px]">

        {/* Section header */}
        <div className="flex items-end justify-between mb-20">
          <div>
            {/* eyebrow */}
            <div className="flex items-center gap-[14px] mb-5">
          <span className="font-sans text-[12px] font-medium tracking-[0.4em] uppercase text-[#ca8c19] border border-[#ca8c19] rounded-full py-2 px-3">
                Why Continental
              </span>
            </div>
            <h2
              className="font-serif text-[clamp(42px,5vw,62px)]
            font-normal leading-[1.06] tracking-[0.005em]
            text-[#352b2b] mb-12"
              style={{ fontSize: 'clamp(40px, 4.8vw, 60px)' }}
            >
              Built with foresight.<br />
              <em className="not-italic text-[#0f395c]">Measured in more than just years.</em>
            </h2>
          </div>

          {/* <p className="font-sans text-[14.5px] font-light text-[#7a726a] leading-[1.95] max-w-sm text-right">
            Four principles that have guided every Continental project since the first foundation was poured.
          </p> */}
        </div>
      <div className="w-full border-t border-b border-[#e0d5c4] px-[60px] py-12">
        <div className="grid grid-cols-4 divide-x divide-[#e0d5c4]">
          {METRICS.map((m, idx) => (
            <MetricItem
              key={m.id}
              num={m.num}
              label={m.label}
              sub={m.sub}
              delay={idx * 0.12}
            />
          ))}
        </div>
      </div>


      </div>
    </section>
  );
}