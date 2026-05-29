import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, ArrowUpRight, Sun, Wind, Eye, ShieldCheck, FileText, ChevronRight, Info } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  status: string;
  statusBadge: string;
  location: string;
  description: string;
  detailedSpecs: { label: string; value: string; desc: string }[];
  image: string;
  blueprintDetails: {
    title: string;
    description: string;
    hotspots: { x: string; y: string; title: string; desc: string }[];
  };
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Continental Heights",
    subtitle: "The Signature Sky-Tower Monolith",
    status: "Ready Possession",
    statusBadge: "Immediate Handover",
    location: "R.B. Marg, Mazgaon",
    description: "Our core soaring high-end residential masterpiece built around continuous Mivan monolithic aluminum casting, dual-aspect heliotropic sunrise exposure, and completely private, freehold ownership records with no landlord liabilities.",
    detailedSpecs: [
      { label: "Casting Grade", value: "M45 Continuous Concrete", desc: "Monolithic flow eliminates mechanical joints entirely" },
      { label: "Acoustic Shielding", value: "STC 54 Double Glazing", desc: "Complete noise isolation from urban environments" },
      { label: "Land Ownership", value: "100% Fee-Simple Clear Title", desc: "Outright sovereign tenure of the entire cadastral plot" },
      { label: "Thermal Rating", value: "Low-E Heliocentric Glass", desc: "Minimum heat ingress with premium natural light path" }
    ],
    image: "/assets/images/heights/heights-2.jpeg",
    blueprintDetails: {
      title: "Mivan Monolithic Frame (Continental Heights)",
      description: "Our continuous cast-aluminum formwork layout provides unmatched structural density and crack-free longevity.",
      hotspots: [
        { x: "25%", y: "30%", title: "Continuous Shear Wall", desc: "M45 structural reinforcement eliminates standard columns entirely." },
        { x: "70%", y: "45%", title: "Double-Glazed Facade", desc: "German-engineered insulated aluminum frames with acoustic gap seals." },
        { x: "50%", y: "85%", title: "Outright Land Boundary", desc: "Clear land tenure lines with zero developer-landlord shares." }
      ]
    }
  },
  {
    id: 2,
    title: "Continental Horizon",
    subtitle: "The High-Altitude Sanctuary",
    status: "Newly Launched",
    statusBadge: "RERA Certified Approved",
    location: "Mazgaon South West Wing",
    description: "A single-tower architectural masterpiece forged on sole freehold titles with no tenant liability. Features triple-aspect aerodynamics to harness prevailing coastal trade winds.",
    detailedSpecs: [
      { label: "Wind Safety", value: "Class V Wind Shear Rating", desc: "Aerodynamic balconies redirect high-velocity sea drafts" },
      { label: "Floor Clearance", value: "3.6 Meter Floor-To-Floor", desc: "Magnificent vertical space providing high-volume air flow" },
      { label: "Sanitary Core", value: "Isolated Dual Shaft Glands", desc: "Zero noise transmission across kitchen and drainage cores" },
      { label: "Automated Systems", value: "Direct Ramp Access Only", desc: "Eliminates tower platform lifts for trouble-free parking" }
    ],
 image: "/assets/images/horizon/day_view.jpg",
    blueprintDetails: {
      title: "Triple-Aspect Structure (Continental Horizon)",
      description: "The architectural wing structure maximizes continuous cross-ventilation while providing high seismic load resistance.",
      hotspots: [
        { x: "40%", y: "20%", title: "Aerodynamic Balcony", desc: "Angled wind-deflectors channeling coastal sea breezes safely." },
        { x: "80%", y: "60%", title: "Direct-Ramp Substructure", desc: "High clearance column-free parking system with direct security." },
        { x: "20%", y: "75%", title: "Isolated Plumbing Core", desc: "Dual acoustic shafts ensuring zero water vibration noise." }
      ]
    }
  },
  {
    id: 3,
    title: "Sahar Business Center",
    subtitle: "The Ultimate Grade-A Monolith",
    status: "Sold Out",
    statusBadge: "100% Occupancy Locked",
    location: "Sahar Road, Andheri East",
    description: "Our monumental Grade-A commercial tech-park enclave finished with triple-glazed thermal sound-dampening facade panels, redundant corporate power girders, and massive post-tensioned wide-span spatial grids.",
    detailedSpecs: [
      { label: "Grid Structure", value: "12m x 12m Column-Free Span", desc: "Post-tensioned long-span slab technology maximizes usable commercial space" },
      { label: "Cladding Facade", value: "Unitized Low-E Glass Walls", desc: "Premium acoustic curtain walls reducing external Decibels by STC 48" },
      { label: "Reserve Power", value: "3000 KVA Dual-Grid Backup", desc: "Direct failure-free redundant generators supporting seamless technical workloads" },
      { label: "HVAC Efficiency", value: "Water-Cooled Centrifugal Chiller", desc: "Smart environment controls offering low power consumption footprints" }
    ],
    image: "/assets/images/sahar.png",
    blueprintDetails: {
      title: "Grade-A Structural System (Sahar Business Center)",
      description: "Precision engineered post-tensioning matrix layout designed for high load capacity and flexible space allocation.",
      hotspots: [
        { x: "30%", y: "35%", title: "Unitized Glass Panel", desc: "Pressure-equalized structural glazing protecting against heavy monsoon load pressures." },
        { x: "65%", y: "25%", title: "Post-Tensioned Cable Tendons", desc: "High-grade steel cables tensioned within the slab to eliminate interior columns." },
        { x: "45%", y: "80%", title: "Reinforced Shear Plinth", desc: "Dual core shear concrete cores offering high seismic safety index values." }
      ]
    }
  }
];

const getProjectLogo = (id: number, isActive: boolean) => {
  // Define image paths - ensure these files exist in your public directory
  const logoPaths: { [key: number]: string } = {
    1: "/assets/images/heights/heights-logo-golden.png",
    2: "/assets/images/horizon/horizon-logo-2.png",
    3: "",
  };
const imageSrc = logoPaths[id];
  const opacityClass = isActive ? 'opacity-100' : 'opacity-40 group-hover:opacity-100';

  // Fallback: If imageSrc exists, show it; otherwise, show the Building2 icon
  if (imageSrc) {
    return (
      <img 
        src={imageSrc} 
        alt="Project Logo" 
        className={`w-8 h-8 object-contain shrink-0 transition-all duration-300 ${opacityClass}`}
      />
    );
  }

  // Fallback Icon for Sahar Business Center
  return (
    <div className={`w-8 h-8 flex items-center justify-center shrink-0 transition-all duration-300 ${opacityClass}`}>
      <Building2 size={24} className={isActive ? "text-gold-mid" : "text-brown-deep"} />
    </div>
  );
};
export default function ProjectsSection() {
  const [activeId, setActiveId] = useState<number>(1);
  const [sunlightMode, setSunlightMode] = useState<'morning' | 'noon' | 'sunset'>('noon');
  const [showWindForces, setShowWindForces] = useState<boolean>(false);
  const [showXRay, setShowXRay] = useState<boolean>(false);
  const [activeHotspot, setActiveHotspot] = useState<{ title: string; desc: string } | null>(null);

  const activeProject = PROJECTS.find(p => p.id === activeId) || PROJECTS[0];

  // Sunlight filter styles
  const getSunlightStyles = () => {
    switch (sunlightMode) {
      case 'morning':
        return {
          filter: "brightness(1.05) contrast(1.02) sepia(0.08) hue-rotate(-5deg)",
          overlay: "bg-gradient-to-tr from-amber-500/15 via-rose-400/5 to-transparent",
          timeLabel: "7:30 AM Golden Ingress"
        };
      case 'sunset':
        return {
          filter: "brightness(0.9) contrast(1.05) sepia(0.3) saturate(1.2) hue-rotate(10deg)",
          overlay: "bg-gradient-to-t from-orange-600/30 via-amber-500/10 to-transparent",
          timeLabel: "18:45 PM Amber Horizon"
        };
      case 'noon':
      default:
        return {
          filter: "brightness(1.1) contrast(1.0) saturate(1.0)",
          overlay: "bg-gradient-to-b from-white/10 to-transparent",
          timeLabel: "12:00 PM Heliocentric Zenith"
        };
    }
  };

  const sunlightStyles = getSunlightStyles();

  return (
    <section 
      id="projects" 
      className="relative w-full bg-white py-24 md:py-32 px-6 sm:px-12 md:px-16 lg:px-24 border-t border-warm-2 overflow-hidden z-20"
    >
      {/* Absolute decorative high-contrast blur patterns */}
      <div className="absolute top-[10%] left-[-15%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-tr from-gold-mid/10 to-transparent blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-15%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-[#8b7355]/5 to-transparent blur-[160px] pointer-events-none" />

      <div className="max-w-full mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20 select-none"
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
         <span className="font-sans text-[12px] font-medium tracking-[0.4em] uppercase text-[#ca8c19] border border-[#ca8c19] rounded-full py-2 px-3">
                Our Projects
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-[54px] leading-[1.1] tracking-[0.02em] font-normal text-brown-deep uppercase w-max">
              The Flagship 
              <span className="font-normal text-gradient-gold ml-1">Monoliths.</span>
            </h2>
          </div>
        </motion.div>

        {/* 2-Column Desktop Studio Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* COLUMN 1: PROJECT NAVIGATION BAR (lg:col-span-4) */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 space-y-4"
          >
            {/* Vertical high-tactile select cards */}
            <div className="space-y-3">
              {PROJECTS.map((project) => {
                const isActive = project.id === activeId;

                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => {
                      setActiveId(project.id);
                      setActiveHotspot(null);
                    }}
                    className={`w-full text-left p-6 rounded-[24px] border transition-all duration-500 relative group cursor-pointer ${
                      isActive 
                        ? 'bg-brown-deep border-brown-deep text-white shadow-lg shadow-brown-deep/10' 
                        : 'bg-[#faf8f4]/60 hover:bg-[#faf8f4] border-brown-deep/5 hover:border-gold-mid/30 text-brown-deep'
                    }`}
                  >
                    {/* Status beacon indicator */}
                    <div className="flex items-center justify-between gap-4 mb-3 select-none">
                      <span className={`text-[12px]  tracking-widest uppercase font-semibold px-2.5 py-0.5 rounded ${
                        isActive ? 'bg-white/10 text-gold-mid' : 'bg-brown-deep/5 text-gradient-gold'
                      }`}>
                        {project.status}
                      </span>
                    </div>

                    <div className="flex items-start gap-4">
                      {/* Brand Logo emblem */}
                      {getProjectLogo(project.id, isActive)}

                      <div className="space-y-1">
                        <h3 className="text-[18px] sm:text-[20px] font-bold leading-none uppercase tracking-wide">
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    <p className={`font-sans text-[13px] font-normal leading-relaxed tracking-wide mt-3 line-clamp-2 ${
                      isActive ? 'text-white/70' : 'text-brown-deep'
                    }`}>
                      {project.description}
                    </p>

                    {/* Chevron trigger helper */}
                    <div className={`absolute bottom-6 right-6 transition-all duration-300 ${
                      isActive ? 'text-gold-b translate-x-1' : 'text-gradient-gold/45 opacity-0 group-hover:opacity-100 group-hover:translate-x-1'
                    }`}>
                      <ChevronRight size={16} />
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* COLUMN 2: CINEMATIC DYNAMIC VIEWPORT Studio (lg:col-span-8) */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 space-y-6"
          >
            
            {/* 1. VIEWPORT STAGE */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] rounded-[32px] overflow-hidden border border-brown-deep/10 shadow-sm bg-[#efebe4]">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeProject.id}-${showXRay}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.65, ease: "easeInOut" }}
                  className="w-full h-full relative"
                >
                  {/* REAL PROJECT PHOTO VIEW */}
                  {!showXRay ? (
                    <div className="w-full h-full relative overflow-hidden">
                      <motion.img
                        src={activeProject.image}
                        alt={activeProject.title}
                        className="w-full h-full object-cover transition-all duration-[1s]"
                        style={{ filter: sunlightStyles.filter }}
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Dynamic Sunlight Warm Overlay Gradient */}
                      <div className={`absolute inset-0 z-5 transition-all duration-[1s] ${sunlightStyles.overlay}`} />

                      {/* Animated Wind Currents flow vector particle system lines */}
                      {showWindForces && (
                        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden bg-sky-950/10">
                          <svg className="w-full h-full opacity-45" xmlns="http://www.w3.org/2000/svg">
                            <motion.path
                              d="M -50,60 C 200,40 400,120 1000,100"
                              fill="none"
                              stroke="#ffffff"
                              strokeWidth="2.5"
                              strokeDasharray="10, 15"
                              animate={{ strokeDashoffset: [-100, 0] }}
                              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                            />
                            <motion.path
                              d="M -50,150 C 250,120 450,220 1000,180"
                              fill="none"
                              stroke="#ffffff"
                              strokeWidth="1.5"
                              strokeDasharray="6, 12"
                              animate={{ strokeDashoffset: [-80, 0] }}
                              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                            />
                            <motion.path
                              d="M -50,260 C 150,280 400,180 1000,220"
                              fill="none"
                              stroke="#93c5fd"
                              strokeWidth="2"
                              strokeDasharray="8, 16"
                              animate={{ strokeDashoffset: [-120, 0] }}
                              transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                            />
                          </svg>
                          <div className="absolute top-4 right-4 bg-sky-950/80 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 select-none">
                            <span className="text-[8.5px]  text-sky-200 tracking-widest uppercase font-bold animate-pulse">
                              CROSS WIND VENTILATION PATHS ACTIVE
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    // ARCHITECTURAL BLUEPRINT X-RAY VIEW
                    <div className="w-full h-full bg-[#11141a] text-sky-400 p-8 flex flex-col justify-between relative overflow-hidden border border-sky-500/20">
                      
                      {/* Blueprint Grid Overlay background */}
                      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-40" />

                      {/* Dynamic Blueprint schematic circles */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-sky-500/5 pointer-events-none animate-[spin_50s_linear_infinite]" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] rounded-full border border-sky-500/10 border-dashed pointer-events-none animate-[spin_80s_linear_infinite]" />

                      {/* Header in Blueprint style */}
                      <div className="relative z-10 flex justify-between items-start border-b border-sky-500/20 pb-4 select-none">
                        <div>
                          <span className="text-[8px]  text-sky-400/50 uppercase tracking-widest">
                            MONOLITH FRAME SCHEMATIC // FREEHOLD DETECT
                          </span>
                          <h4 className="font-serif text-[18px] text-sky-1200 font-normal text-white tracking-wider uppercase mt-1">
                            {activeProject.blueprintDetails.title}
                          </h4>
                        </div>
                        <span className="text-[12px]  border border-sky-500/30 text-sky-300 px-2 py-0.5 rounded tracking-widest font-semibold bg-sky-500/5 uppercase">
                          MIVAN CAST FORM
                        </span>
                      </div>

                      {/* Center narrative descriptor */}
                      <div className="relative z-10 max-w-md my-auto border-l border-sky-500/30 pl-4 py-2">
                        <p className=" text-[11.5px] text-sky-300/80 leading-relaxed font-normal">
                          {activeProject.blueprintDetails.description}
                        </p>
                        <p className="text-[12px]  text-sky-400/50 tracking-wider uppercase mt-2">
                          *CLICK BLUEPRINT CIRCLES TO DETECT SENSOR BLUEPRINTS
                        </p>
                      </div>

                      {/* Blueprint interactive hotspots */}
                      {activeProject.blueprintDetails.hotspots.map((hs, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveHotspot(hs)}
                          style={{ left: hs.x, top: hs.y }}
                          className={`absolute z-20 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 -translate-x-1/2 -translate-y-1/2 ${
                            activeHotspot?.title === hs.title
                              ? 'bg-sky-500 border-white text-white scale-110 shadow-[0_0_15px_rgba(14,165,233,0.5)]'
                              : 'bg-sky-950/70 border-sky-500 text-sky-450 hover:bg-sky-500 hover:text-white cursor-pointer'
                          }`}
                          title={`Inspect ${hs.title}`}
                        >
                          <span className=" text-[10px] font-bold">{idx + 1}</span>
                        </button>
                      ))}

                      {/* Hotspot details overlay cabinet */}
                      {activeHotspot && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute bottom-6 left-6 right-6 bg-[#0c0f13]/95 border border-sky-500/35 p-4 rounded-xl z-25 shadow-lg select-text"
                        >
                          <div className="flex items-center justify-between gap-4 mb-1">
                            <span className="text-[11px]  font-bold text-sky-200 uppercase tracking-wider">
                              {activeHotspot.title}
                            </span>
                            <button
                              type="button"
                              onClick={() => setActiveHotspot(null)}
                              className="text-[12px]  text-sky-400/60 hover:text-sky-300 cursor-pointer"
                            >
                              DISMISS
                            </button>
                          </div>
                          <p className=" text-[11px] text-sky-300/70 font-normal leading-relaxed">
                            {activeHotspot.desc}
                          </p>
                        </motion.div>
                      )}

                      {/* Blueprint Footer */}
                      <div className="relative z-10 flex justify-between items-center border-t border-sky-500/20 pt-3 select-none text-[8.5px]  text-sky-500/60 font-medium">
                        <span>SYS_STATUS: ACTIVE SECURITY DETECT</span>
                        <span>GRID REF: MZ-A0{activeProject.id}</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
