import React from 'react';
import { motion } from 'motion/react';

interface ValueCardProps {
  num: string;
  title: string;
  desc: string;
  delay?: number;
  wave: 1 | 2;
}

function NotchedCard({ num, title, desc, delay = 0, wave }: ValueCardProps) {
  // Use a softer trigger viewport margin for the 2nd wave to ensure it requires "more scroll/next scroll"
  const viewportSettings = wave === 1 
    ? { once: true, margin: "-10% 0px -5% 0px", amount: 0.1 }
    : { once: true, margin: "-25% 0px -5% 0px", amount: 0.25 };

  return (
    <div className="flex items-end gap-3 sm:gap-4 w-full">
      {/* Left numbering indicator aligned with the bottom edge */}
      <span className="font-serif text-[15px] text-brown-mid/60 tracking-wider mb-3 shrink-0 select-none">
        ({num})
      </span>

      {/* The elegant frosted glass container */}
      <motion.div
        initial={{ y: 120, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={viewportSettings}
        transition={{
          duration: 1.2,
          delay,
          ease: [0.16, 1, 0.3, 1], // cinematic luxury curve
        }}
        className="relative flex-1 bg-white/70 backdrop-blur-[15px] rounded-[24px] border border-brown-deep/10 py-16 px-6 text-center min-h-[350px] flex flex-col justify-center items-center group overflow-hidden shadow-sm hover:bg-white/95 transition-all duration-300"
      >
        {/* TOP CIRCULAR NOTCH */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#faf8f4] border border-brown-deep/10 z-10" />
        
        {/* BOTTOM CIRCULAR NOTCH */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-7 h-7 rounded-full bg-[#faf8f4] border border-brown-deep/10 z-10" />

        {/* Content */}
        <h3 className="font-serif text-lg sm:text-[21px] leading-[1.25] text-brown-deep tracking-[0.06em] font-normal uppercase transition-transform duration-500 group-hover:scale-[1.02] whitespace-pre-line">
          {title}
        </h3>
        
        <p className="font-sans text-[15px] sm:text-[12px] text-brown-mid font-normal tracking-wide max-w-[190px] mx-auto leading-relaxed mt-5 sm:mt-6 whitespace-pre-line select-text">
          {desc}
        </p>
      </motion.div>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section 
      id="about-residence" 
      className="relative w-full bg-[#faf8f4] py-28 md:py-36 px-4 md:px-12 lg:px-20 xl:px-24 border-t border-warm-2 z-20 overflow-hidden"
    >
      {/* Background High-Resolution Luxury Couch Interior Render (Loads first, bottom-to-top animation) */}
      <motion.div 
        initial={{ y: 140, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 w-full h-full z-0 overflow-hidden"
      >
        <img 
          src="/assets/images/elyse_living_about_1779430108456.png" 
          alt="Elyse Residence luxurious lounge setting" 
          className="w-full h-full object-cover object-center scale-[1.02]"
          referrerPolicy="no-referrer"
        />
        {/* Extreme dark luxury veil changed to warm-light overlay to fit white theme */}
        <div className="absolute inset-0 bg-[#faf8f4]/90 backdrop-blur-[2px] z-10" />
      </motion.div>

      <div className="max-w-9xl mx-auto relative z-10">
        
        {/* Staggered double-row columns layout matching screenshot column paths */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-14 xl:gap-16 items-stretch md:min-h-[880px] lg:min-h-[920px]">
          
          {/* COLUMN 1: Box 1 (Wave 1) & Box 3 (Wave 2) */}
          <div className="flex flex-col justify-between space-y-12 md:space-y-24">
            
            {/* Box 1 (Wave 1) */}
            <div className="w-full">
              <NotchedCard 
                num="1"
                title={"HOLISTIC\nWELL-BEING"}
                desc={"Spaces designed\nto nurture the mind, body, and\nsoul."}
                delay={0}
                wave={1}
              />
            </div>

            {/* Box 3 (Wave 2 - appears on next scroll) */}
            <div className="w-full">
              <NotchedCard 
                num="3"
                title={"CULTURAL\nENRICHMENT"}
                desc={"Spaces designed\nto nurture the mind, body, and\nsoul."}
                delay={0}
                wave={2}
              />
            </div>

          </div>

          {/* COLUMN 2: Box 2 (Wave 1) & Box 4 (Wave 2) */}
          <div className="flex flex-col justify-between space-y-12 md:space-y-24">
            
            {/* Box 2 (Wave 1) */}
            <div className="w-full">
              <NotchedCard 
                num="2"
                title={"DISCRETION &\nEXCLUSIVITY"}
                desc={"Privacy and personal growth at\nthe forefront."}
                delay={0.15}
                wave={1}
              />
            </div>

            {/* Box 4 (Wave 2 - appears on next scroll) */}
            <div className="w-full">
              <NotchedCard 
                num="4"
                title={"COMMUNITY &\nCONNECTION"}
                desc={"Privacy and personal growth at\nthe forefront."}
                delay={0.15}
                wave={2}
              />
            </div>

          </div>

          {/* COLUMN 3: Editorial Paragraphs (Wave 1) & Box 5 (Wave 2) */}
          <div className="flex flex-col justify-between space-y-12 md:space-y-24">
            
            {/* Top Paragraph Group (Wave 1, aligned with top row) */}
            <div className="flex flex-col space-y-6 sm:space-y-8 pr-2 md:pr-4 pt-6 md:pt-10 max-w-sm md:max-w-none text-left">
              <motion.p 
                initial={{ opacity: 0, y: 120 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px -5% 0px", amount: 0.1 }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-brown-deep text-2xl sm:text-[15px] leading-relaxed font-normal tracking-wide select-text"
              >
                At Elyse Residence, we believe that a home is more than a physical space — it’s a reflection of your aspirations, well-being, and values.
              </motion.p>
              
              <motion.p 
                initial={{ opacity: 0, y: 120 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px -5% 0px", amount: 0.1 }}
                transition={{ duration: 1.2, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="text-brown-mid text-2xl sm:text-[13px] leading-relaxed font-normal tracking-wide select-text border-l border-brown-deep/20 pl-4"
              >
                Our mission is to immerse you in a lifestyle that balances refined aesthetics, architectural excellence, and a profound sense of community.
              </motion.p>
            </div>

            {/* Box 5 (Wave 2 - appears on next scroll) */}
            <div className="w-full">
              <NotchedCard 
                num="5"
                title={"SUSTAINABLE\nELEGANCE"}
                desc={"Luxury that respects our\nenvironment."}
                delay={0.3}
                wave={2}
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
