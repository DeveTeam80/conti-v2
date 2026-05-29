import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronRight, FileText, Info, Award, Compass, Layers } from 'lucide-react';

interface FaqItem {
  id: number;
  category: string;
  categoryKey: 'Titles' | 'Engineering' | 'Materials';
  question: string;
  answer: string;
}

const CATEGORIES = [
  { key: 'Titles', label: 'Sovereign Titles', icon: Award, desc: 'Outright land ownership, legal titles, and freedom from financial JV liabilities.', count: 2 },
  { key: 'Engineering', label: 'Monolithic Engineering', icon: Compass, desc: 'Mivan continuous mold casting, concrete density, structural acoustics & basement specs.', count: 2 },
  { key: 'Materials', label: 'Materials & Handover', icon: Layers, desc: 'Natural Tuscan travertine details, timeline metrics, and RERA certifications.', count: 3 },
] as const;

const FAQS_DATA: FaqItem[] = [
  {
    id: 1,
    category: "Sovereign Titles",
    categoryKey: "Titles",
    question: "Is the land plot owned outright by the developer?",
    answer: "Yes, absolutely. The entire parcel of land in Mazgaon (R.B. Marg) is owned outright. There are zero landlord partners, third-party consent clauses, or tenant stakes in this project plot. This offers unmatched title integrity, guaranteeing that no partner conflict or third-party disputes can delay construction progression."
  },
  {
    id: 2,
    category: "Sovereign Titles",
    categoryKey: "Titles",
    question: "Is there any joint developer liability or financial debt linked to the land?",
    answer: "No. Continental Group holds sole proprietary stake under complete outright seignorage of the development. No complex commercial loans, construct loans, or joint venture covenants are registered on the land, shielding homeowners from developer insolvency risks."
  },
  {
    id: 3,
    category: "Monolithic Engineering",
    categoryKey: "Engineering",
    question: "What are the structural benefits of the monolithic Mivan Aluminum formwork?",
    answer: "Continuous Mivan monolithic casting means that all walls, columns, slabs, and lintel grids are poured on-site simultaneously using high-grade continuous core concrete. This provides unmatched seismic dissipation, completely prevents cracks, eliminates standard joint-seepage points, and delivers 100% millimeter-precise geometry."
  },
  {
    id: 4,
    category: "Monolithic Engineering",
    categoryKey: "Engineering",
    question: "Are automated tower systems or ramp-based basements being utilized for private parking?",
    answer: "We employ column-free, high-clearance direct-ramp parking basements with comfortable turning circles. We avoid automated tower platforms entirely. This eliminates the risk of technical glitches during power blackouts, preserves car paint, protects low-slung performance vehicles, and guarantees zero wait-times."
  },
  {
    id: 5,
    category: "Materials & Handover",
    categoryKey: "Materials",
    question: "Which organic materials are standard in the common areas?",
    answer: "We source authentic Tuscan travertine for primary lift vestibules and lobby facings. Stair networks employ split-face thermal granite, whereas apartments are finished with multi-glazed sound-dissipating acoustic glass, real copper facade components, and weather-resistant cedar highlights."
  },
  {
    id: 6,
    category: "Materials & Handover",
    categoryKey: "Materials",
    question: "When is the scheduled property possession date?",
    answer: "Superstructure completion is scheduled for Summer 2026, with final structural finish audits and handovers locked for Winter 2026. Because our continuous Mivan aluminum casting technology slashes typical casting timelines, our schedule is robust and guaranteed under strict regulatory clauses."
  },
  {
    id: 7,
    category: "Materials & Handover",
    categoryKey: "Materials",
    question: "How close is Elyse Residence to essential neighborhood centers?",
    answer: "Located in the heart of Mazgaon. It sits within 5 minutes of Jamali Syedna Mosque (Raudat Tahera area is directly accessible) and Saifee Hospital is within a brief 10-minute commute, perfectly balancing spiritual sanctuary and medical access."
  }
];

export default function FaqSection() {
  const [activeCategory, setActiveCategory] = useState<'Titles' | 'Engineering' | 'Materials'>('Titles');
  const [openId, setOpenId] = useState<number | null>(1); // keeps first item within category open ideally

  const handleCategoryChange = (key: 'Titles' | 'Engineering' | 'Materials') => {
    setActiveCategory(key);
    // Auto open the first item of that category when switched
    const items = FAQS_DATA.filter(faq => faq.categoryKey === key);
    if (items.length > 0) {
      setOpenId(items[0].id);
    } else {
      setOpenId(null);
    }
  };

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaqs = FAQS_DATA.filter(faq => faq.categoryKey === activeCategory);

  return (
    <section 
      id="faqs" 
      className="relative w-full bg-[#faf8f4] py-24 md:py-32 px-6 sm:px-12 md:px-16 lg:px-24 border-t border-warm-2 overflow-hidden z-20"
    >
      {/* Decorative radial refractions matching brand palette */}
      <div className="absolute top-[15%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-tr from-gold-mid/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-15%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-[#8b7355]/5 to-transparent blur-[130px] pointer-events-none" />

      <div className="max-w-full mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20 select-none">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              
              <span className="font-sans text-[12px] font-medium tracking-[0.4em] uppercase text-[#ca8c19] border border-[#ca8c19] rounded-full py-2 px-3">
                FAQs
              </span>
            </div>
            
            <h2 className="font-serif text-4xl sm:text-5xl md:text-[54px] leading-[1.1] tracking-[0.02em] font-normal text-brown-deep uppercase w-max">
              Frequently Asked <span className="font-serif italic font-normal text-brown-deep">Questions</span>
            </h2>
          </div>
          
        </div>

        {/* Dynamic Split Layout: Interactive Tabs left, details right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT PANEL: Curated Category Tabs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-2 bg-white/40 backdrop-blur-md rounded-[24px] border border-white/80 space-y-2 select-none">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.key;
                const Icon = cat.icon;

                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => handleCategoryChange(cat.key)}
                    className={`w-full text-left p-4 rounded-2xl flex items-start gap-4 transition-all duration-300 group cursor-pointer ${
                      isActive 
                        ? 'bg-brown-deep text-white shadow-md border border-brown-deep' 
                        : 'hover:bg-white/60 text-brown-deep border border-transparent'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-serif text-[15px] font-semibold tracking-wide">
                          {cat.label}
                        </span>
                      </div>
                      <p className={`text-[15px] font-sans font-normal leading-relaxed ${
                        isActive ? 'text-amber-100/70' : 'text-brown-deep'
                      }`}>
                        {cat.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT PANEL: Smoothly transitioning details accordion */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                {filteredFaqs.map((faq, idx) => {
                  const isOpen = openId === faq.id;

                  return (
                    <div
                      key={faq.id}
                      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                        isOpen 
                          ? 'bg-white border-gold-mid/40 shadow-sm' 
                          : 'bg-white/45 border-brown-deep/5 hover:bg-white/70 hover:border-brown-deep/15'
                      }`}
                    >
                      {/* Accordion Trigger Header */}
                      <button
                        type="button"
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full flex items-center justify-between text-left p-5 sm:p-6 gap-4 focus:outline-none cursor-pointer select-text"
                      >
                        <div className="space-y-1">
                          <h3 className="font-serif text-[15px] sm:text-[16px] text-brown-deep font-medium tracking-wide leading-snug">
                            {faq.question}
                          </h3>
                        </div>

                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-500 transform shrink-0 select-none ${
                          isOpen
                            ? 'bg-brown-deep border-brown-deep text-white rotate-90'
                            : 'bg-white/80 border-brown-deep/10 text-brown-deep'
                        }`}>
                          <ChevronRight size={12} />
                        </div>
                      </button>

                      {/* Accordion Answer Content */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-brown-deep/5 select-text">
                              <p className="font-sans text-[15px] sm:text-[15px] text-brown-deep font-normal leading-relaxed tracking-wide whitespace-pre-line">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
