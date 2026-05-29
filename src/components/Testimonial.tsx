import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, Heart, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  residence: string;
  quote: string;
  rating: number;
  backstory: string;
  familySize: string;
  yearpurchased: string;
  avatar: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Al-Haj Shabbir Mazgaonwala",
    role: "Retired Industrialist & Elder",
    residence: "Suite 1201, Continuous East Wing",
    quote: "Finding a home in Mazgaon with 100% direct outright land ownership, without standard landlord configurations, gave our family unmatched peace of mind. The monolithic Mivan casting is robust and quiet.",
    rating: 5,
    backstory: "A resident of Mazgaon for 62 years, looking for an uncompromising, modern sanctuary for three culinary generations.",
    familySize: "6 Members",
    yearpurchased: "2025",
    avatar: "SM"
  },
  {
    id: 2,
    name: "Dr. Farida Merchant",
    role: "Senior Consultant, Saifee Hospital",
    residence: "Suite 1603, The Aurelia Penthouse",
    quote: "The dual-aspect wind alignment is marvelous. The cross ventilation keeps the apartment perfectly cool even in the heat, and walking to Saifee Hospital takes me less than 10 minutes.",
    rating: 5,
    backstory: "Passionate about light orientation and medical-grade serenity after long, demanding clinical shifts.",
    familySize: "3 Members",
    yearpurchased: "2026",
    avatar: "FM"
  },
  {
    id: 3,
    name: "Zainab & Murtaza Kanchwala",
    role: "Co-Founders, Studio Kova",
    residence: "Suite 0804, Sunset Horizon Wing",
    quote: "As interior designers, the precision of the finishing here is what blew us away. The natural Tuscan travertine flows into continuous lines, and there are no awkward beams or structural column offsets.",
    rating: 5,
    backstory: "Global spatial designers looking for a minimalist aesthetic combined with direct proximity to Raudat Tahera.",
    familySize: "2 Members",
    yearpurchased: "2025",
    avatar: "ZK"
  },
  {
    id: 4,
    name: "Yusuf & Rashida Soni",
    role: "Diamond Merchant & Global Exporter",
    residence: "Suite 1402, Radiant Sky-Aloft Wing",
    quote: "Positioned perfectly near critical institutions and the quiet gardens, it is an architectural gem. The complete absence of standard developer debts or commercial joint Ventures guarantees a worry-free legacy.",
    rating: 5,
    backstory: "Seeking safe high-capital security for multigenerational assets combined with premium materials.",
    familySize: "4 Members",
    yearpurchased: "2025",
    avatar: "YS"
  },
  {
    id: 5,
    name: "Abbas Contractor",
    role: "Senior Consultant Civil Engineer",
    residence: "Suite 1004, The Marble Arch Wing",
    quote: "Being a structural engineer myself, I audited the foundation layouts. The continuous heavy structural pile grids and Mivan cast-grade specifications are of unmatched global standards.",
    rating: 5,
    backstory: "Audited construction blueprints personally to guarantee maximum concrete density & sound attenuation layers.",
    familySize: "5 Members",
    yearpurchased: "2026",
    avatar: "AC"
  },
  {
    id: 6,
    name: "Sakina & Taher Kapasi",
    role: "Co-Founders, Kapasi Techlabs",
    residence: "Suite 1102, Heliocentric Sunrise Wing",
    quote: "The high-altitude sea-facing air circulation is brilliant, and the security systems are remarkably advanced for peace of mind. Truly a home made for multi-generational comfort.",
    rating: 5,
    backstory: "Passionate about home automation, IoT integration, and low thermal leakage structures.",
    familySize: "3 Members",
    yearpurchased: "2025",
    avatar: "TK"
  }
];

export default function TestimonialsSection() {
  const [startIndex, setStartIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [expandedCardId, setExpandedCardId] = useState<number | null>(null);
  const timerRef = useRef<any>(null);

  const startAutoplay = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4500);
  };

  const stopAutoplay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    if (isPlaying) {
      startAutoplay();
    } else {
      stopAutoplay();
    }
    return () => stopAutoplay();
  }, [isPlaying, startIndex]);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const toggleBackstory = (id: number) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  // Get 3 visible testimonials wrapping around the collection
  const getVisibleTestimonials = () => {
    const visible: Testimonial[] = [];
    for (let i = 0; i < 3; i++) {
      const idx = (startIndex + i) % TESTIMONIALS.length;
      visible.push(TESTIMONIALS[idx]);
    }
    return visible;
  };

  const visibleDeck = getVisibleTestimonials();

  return (
    <section 
      id="testimonials" 
      className="relative w-full py-24 md:py-32 px-6 sm:px-12 md:px-16 lg:px-24 border-t border-warm-2 overflow-hidden z-20"
      onMouseEnter={() => stopAutoplay()}
      onMouseLeave={() => { if (isPlaying) startAutoplay(); }}
    >
      {/* Radiant atmospheric warm background gradient blur */}
      <div className="absolute top-[25%] left-[-15%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-tr from-gold-mid/10 to-amber-200/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-[#8b7355]/5 to-rose-200/5 blur-[140px] pointer-events-none" />

      <div className="max-w-full mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 select-none">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              {/* <span className="w-8 h-[1px] bg-brown-deep/30" /> */}
<span className="font-sans text-[12px] font-medium tracking-[0.4em] uppercase text-[#ca8c19] border border-[#ca8c19] rounded-full py-2 px-3">
                Testimonials
              </span>
            </div>
            
            <h2 className="font-serif text-4xl sm:text-5xl md:text-[54px] leading-[1.1] tracking-[0.02em] font-light text-brown-deep uppercase w-max">
              What <span className="font-serif italic font-light text-gradient-gold">Our Happy Residents</span> Say
            </h2>
          </div>
          
        </div>

        {/* Dynamic Card Grid with sliding AnimatePresence transition */}
        <div className="relative overflow-visible pb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleDeck.map((testimonial) => {
                const isExpanded = expandedCardId === testimonial.id;

                return (
                  <motion.div
                    key={testimonial.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -30 }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex flex-col justify-between p-6 sm:p-8 rounded-[28px] bg-white/45 backdrop-blur-[20px] border transition-all duration-500 relative group overflow-hidden ${
                      isExpanded 
                        ? 'border-gold-mid/50 shadow-[0_12px_40px_rgba(139,115,85,0.06)] bg-white/70' 
                        : 'border-white/80 hover:border-gold-mid/30 shadow-[0_8px_32px_rgba(139,115,85,0.03)] hover:bg-white/60'
                    }`}
                  >
                    {/* Visual Ambient Sheen Top Light */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    
                    {/* Header: Quotes Icon and Stars */}
                    <div className="flex justify-between items-start mb-6 select-none relative z-10">
                      <div className="w-10 h-10 rounded-full bg-white/90 border border-brown-deep/5 flex items-center justify-center text-gold-b shadow-2xs">
                        <Quote size={16} className="fill-gold-b/5" />
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={12} className="text-gold-b fill-gold-b" />
                        ))}
                      </div>
                    </div>

                    {/* Body Content: Serif Quote Statement */}
                    <div className="mb-6 relative z-10 select-text min-h-[140px] flex flex-col justify-center">
                      <p className="text-[15px] sm:text-[18px] text-brown-deep leading-relaxed font-base tracking-normal">
                        "{testimonial.quote}"
                      </p>
                    </div>

                    {/* Homeowner Signature Details */}
                    <div className="relative z-10 flex items-center gap-3 border-t border-brown-deep/5 pt-5 pb-4 select-text">
                      <div className="w-10 h-10 rounded-full bg-brown-deep text-white flex items-center justify-center text-xs font-semibold tracking-wider shrink-0 select-none">
                        {testimonial.avatar}
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="text-[15px] sm:text-[14px] font-semibold text-brown-deep tracking-wide uppercase truncate">
                          {testimonial.name}
                        </h4>
                        {/* <p className="font-sans text-[10px] text-brown-deep font-light tracking-wide truncate mt-0.5">
                          {testimonial.role}
                        </p>
                        <p className="font-mono text-[8.5px] text-gold-b tracking-widest uppercase font-semibold mt-0.5 truncate">
                          {testimonial.residence}
                        </p> */}
                      </div>
                    </div>

                    {/* Expandable Origin Story Trigger Accordion */}
                    {/* <div className="border-t border-brown-deep/5 pt-4 mt-1 select-none relative z-10">
                      <button
                        type="button"
                        onClick={() => toggleBackstory(testimonial.id)}
                        className="w-full flex items-center justify-between text-left text-brown-deep hover:text-gold-b transition-colors cursor-pointer group/btn"
                      >
                        <div className="flex items-center gap-1.5">
                          <Heart size={11} className={`${isExpanded ? 'text-gold-b fill-gold-b' : 'text-brown-deep'} transition-colors duration-300`} />
                          <span className="font-mono text-[9px] tracking-wider uppercase font-semibold block sm:inline">
                            {isExpanded ? 'CLOSE GENESIS' : 'HOMEOWNER GENESIS'}
                          </span>
                        </div>
                        {isExpanded ? (
                          <ChevronUp size={12} className="text-brown-deep group-hover/btn:text-gold-b" />
                        ) : (
                          <ChevronDown size={12} className="text-brown-deep group-hover/btn:text-gold-b" />
                        )}
                      </button>
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 pb-1 space-y-4 text-left select-text">
                              <div>
                                <span className="block text-[8px] font-mono text-brown-deep/55 uppercase mb-1">
                                  Origin Story
                                </span>
                                <p className="font-sans text-[12px] text-brown-deep font-light leading-relaxed tracking-wide">
                                  {testimonial.backstory}
                                </p>
                              </div>

                              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-brown-deep/5">
                                <div>
                                  <span className="block text-[8px] font-mono text-brown-deep/55 uppercase mb-1">
                                    Family Unit
                                  </span>
                                  <span className="font-serif text-[11px] text-brown-deep font-semibold tracking-wide">
                                    {testimonial.familySize}
                                  </span>
                                </div>
                                <div>
                                  <span className="block text-[8px] font-mono text-brown-deep/55 uppercase mb-1">
                                    Completion Goal
                                  </span>
                                  <span className="font-serif text-[11px] text-brown-deep font-semibold tracking-wide">
                                    Winter {testimonial.yearpurchased}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div> */}

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Dot trackers at bottom showing active cycle state */}
        <div className="flex items-center justify-center gap-1.5 mt-8 select-none">
          {TESTIMONIALS.map((_, i) => {
            const isActive = i === startIndex;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setStartIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                  isActive ? 'w-6 bg-gold-b' : 'w-1.5 bg-brown-deep/10 hover:bg-brown-deep/35'
                }`}
                title={`Go to slide ${i + 1}`}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}
