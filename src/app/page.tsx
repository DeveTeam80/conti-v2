"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowDown } from "lucide-react";

import { SUITES } from "../data";
import BookingModal from "../components/BookingModal";
import VisionSection from "../components/VisionSection";
import StorySection from "../components/StorySection";
import AboutSection from "../components/AboutSection";
import GlassCardsSection from "../components/GlassCards";
import StatsSection from "../components/StatsSection";
import ChoiceSection from "../components/UpcomingSection";
import SuiteDetails from "../components/SuiteDetails";
import AmenitiesSection from "../components/AmenitiesSection";
import EniteoGallery from "../components/CarouselSection";
import InteractiveMap from "../components/Map";
import NewEraSection from "../components/CTA";
import Footer from "../components/Footer";

export default function App() {
  const [selectedSuiteId, setSelectedSuiteId] = useState<
    "lumiere" | "penthouse" | "aurelia"
  >("lumiere");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // References to scroll sections easily
  const mainRef = useRef<HTMLDivElement>(null);

  // Track page scroll to toggle overlay blending or sticky styles
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeSuiteObj =
    SUITES.find((s) => s.id === selectedSuiteId) || SUITES[0];

  const handleScrollToSpecs = () => {
    const element = document.getElementById("residence-specifications");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSuiteChange = (id: "lumiere" | "penthouse" | "aurelia") => {
    setSelectedSuiteId(id);
    setMobileMenuOpen(false);
  };

  // Nav dynamic state styling parameters matching the white theme
  const logoColor = scrollY > 60 ? "text-brown-deep" : "text-white";
  const navLinkColor = (id: "lumiere" | "penthouse" | "aurelia") => {
    if (scrollY > 60) {
      return selectedSuiteId === id
        ? "text-brown-deep font-semibold"
        : "text-brown-mid/75 hover:text-brown-deep";
    } else {
      return selectedSuiteId === id
        ? "text-white font-semibold"
        : "text-white/70 hover:text-white";
    }
  };
  const activeIndicatorColor = scrollY > 60 ? "bg-gold-b" : "bg-gold-a";
  const headerBtnClass =
    scrollY > 60
      ? "bg-brown-deep text-white hover:bg-gold-b transition-all duration-300"
      : "bg-white text-brown-deep hover:bg-gold-a transition-all duration-300";
  const navLineColor = scrollY > 60 ? "bg-brown-deep/10" : "bg-white/15";

  return (
    <div
      ref={mainRef}
      className="relative bg-white text-brown-deep overflow-x-hidden font-sans select-none"
    >
      {/* 1. TOP PREMIUM NAV BAR */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrollY > 60
            ? "bg-white/95 backdrop-blur-md md:py-4 py-4 shadow-[0_4px_25px_rgba(26,20,20,0.04)]"
            : "bg-transparent py-5 lg:py-6"
        }`}
      >
        <div className="max-w-9xl mx-auto px-6 md:px-12 flex justify-between items-center relative">
          {/* Brand Logo - Serif */}
          <button
            onClick={() => handleSuiteChange("lumiere")}
            className="flex items-center gap-1 group focus:outline-none cursor-pointer"
          >
            <span
              className={`font-serif text-2xl tracking-[0.25em] font-medium transition-all uppercase ${logoColor}`}
            >
              ELYSE
            </span>
          </button>

          {/* Centered Desktop Menu */}
          <nav className="hidden md:flex items-center gap-10 lg:gap-14">
            {SUITES.map((suite) => (
              <button
                key={suite.id}
                onClick={() => handleSuiteChange(suite.id)}
                className={`relative py-2 text-[10px] lg:text-[12px] font-semibold tracking-[0.25em] transition-colors duration-300 focus:outline-none uppercase cursor-pointer ${navLinkColor(suite.id)}`}
              >
                <span>{suite.menuLabel}</span>
                {selectedSuiteId === suite.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className={`absolute bottom-0 left-[10%] right-[10%] h-[1.5px] ${activeIndicatorColor}`}
                    transition={{ type: "spring", damping: 18, stiffness: 200 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Callouts */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setIsBookingOpen(true)}
              className={`text-[10px] lg:text-[12px] font-semibold tracking-[0.2em] rounded-full px-6 py-2.5 uppercase cursor-pointer ${headerBtnClass}`}
            >
              BOOK A VISIT
            </button>
          </div>

          {/* Mobile hamburger toggle */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="bg-brown-deep text-white px-4 py-2 rounded-full text-[9px] font-semibold tracking-wider uppercase cursor-pointer"
            >
              TOUR
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-full hover:bg-neutral-800/5 transition-colors ${
                scrollY > 60 ? "text-brown-deep" : "text-white"
              }`}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Horizontal Line under navbar */}
          <div
            className={`absolute bottom-0 left-6 right-6 h-[1px] transition-colors duration-300 ${navLineColor}`}
          />
        </div>
      </motion.header>

      {/* MOBILE DRAWER CURTAIN */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-40 flex flex-col justify-between p-8 pt-32 md:hidden"
          >
            <div className="space-y-12">
              <span className="text-[10px] tracking-[0.3em] text-brown-mid/60 uppercase font-semibold block">
                SUITE CHOICES
              </span>
              <div className="flex flex-col gap-6">
                {SUITES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSuiteChange(s.id)}
                    className="text-left py-1 focus:outline-none"
                  >
                    <span
                      className={`block font-serif text-2xl tracking-wide uppercase ${
                        selectedSuiteId === s.id
                          ? "text-gold-b font-medium"
                          : "text-brown-mid/60"
                      }`}
                    >
                      {s.menuLabel}
                    </span>
                    <span className="text-[9px] text-brown-mid/40 tracking-widest uppercase block mt-1">
                      {s.location} – {s.orientation}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsBookingOpen(true);
                }}
                className="w-full text-center bg-brown-deep text-white py-4 rounded-xl text-2xl font-semibold tracking-widest uppercase cursor-pointer"
              >
                BOOK A VISIT
              </button>

              <div className="flex justify-between items-center text-[10px] text-brown-mid/50 tracking-widest pt-4 border-t border-warm-2">
                <span>ELYSE CLIENT HOTLINE</span>
                <span>+1 800 - ELYSE - RES</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. ATMOSPHERIC HERO LAYOUT SECTION (HEIGHT: 100VH) */}
      <section className="relative h-screen w-full flex items-end justify-between overflow-hidden">
        {/* Dynamic Image backdrop layers with full scaling animations */}
        <div className="absolute inset-0 bg-[#0a0a0a] z-0">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeSuiteObj.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={activeSuiteObj.heroImage}
                alt={activeSuiteObj.menuLabel}
                className="w-full h-full object-cover origin-center"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </AnimatePresence>

          {/* Subtle dark layout gradients to ensure typography readability, removing any white overlay wash */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-transparent to-neutral-950/40 z-1 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-l from-neutral-950/20 via-transparent to-neutral-950/50 z-1 pointer-events-none" />
        </div>

        {/* Dynamic interactive elements - Ambient status badge in the margin */}
        <div className="absolute top-28 left-6 md:left-12 lg:left-16 z-20 hidden md:flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-gold-mid rounded-full animate-pulse" />
          <span className="text-[10px] font-semibold tracking-widest text-[#ece3d6] font-mono">
            {activeSuiteObj.location} AVAILABLE
          </span>
        </div>

        {/* Content container layer */}
        <div className="w-full max-w-9xl mx-auto px-6 md:px-12 lg:px-16 pb-12 lg:pb-20 relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-12 md:gap-6 mt-auto">
          {/* GIANT "ELYSE" TITLE COMPRESSION LOCKUP with beautiful bottom-to-top masked transition */}
          <div className="w-full md:w-1/2 select-none">
            <div className="relative overflow-hidden py-2">
              <motion.div
                key={activeSuiteObj.id}
                initial={{ y: "100%", opacity: 0.5 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1.4,
                  delay: 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative"
              >
                {/* Custom title designed with pristine white luxury styling */}
                <h1 className="font-serif text-[13vw] leading-[0.75] tracking-[-0.04em] font-normal text-white drop-shadow-[0_2px_15px_rgba(0,0,0,0.5)]">
                  ELYSE
                </h1>
              </motion.div>
            </div>
          </div>

          {/* DESCRIPTIVE CARD (SIDEBAR PANEL ALIGNMENT) */}
          <div className="w-full md:w-1/2 flex flex-col items-start md:items-end text-left md:text-right space-y-5 max-w-lg md:max-w-md ml-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSuiteObj.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                {/* Custom Header Sequence with nested line-by-line reveals */}
                <h2 className="space-y-1 block">
                  <div className="overflow-hidden relative h-auto py-0.5">
                    <motion.span
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{
                        duration: 1.1,
                        delay: 0.1,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="block font-serif text-xl md:text-2xl lg:text-3xl font-normal tracking-widest text-white leading-tight uppercase select-text"
                    >
                      {activeSuiteObj.title1}
                    </motion.span>
                  </div>
                  <div className="overflow-hidden relative h-auto py-0.5">
                    <motion.span
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{
                        duration: 1.1,
                        delay: 0.18,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="block font-serif text-xl md:text-2xl lg:text-3xl font-normal tracking-widest text-white leading-tight uppercase select-text"
                    >
                      {activeSuiteObj.title2}
                    </motion.span>
                  </div>
                </h2>

                {/* Body details text block reveal */}
                <div className="overflow-hidden relative">
                  <motion.p
                    initial={{ y: "100%", opacity: 0.4 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 1.2,
                      delay: 0.25,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="text-neutral-300 text-2xl md:text-2xl leading-relaxed font-normal select-text"
                  >
                    {activeSuiteObj.description}
                  </motion.p>
                </div>

                {/* Subtle Specs Pills underneath narrative body */}
                <div className="overflow-hidden relative">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 1.1,
                      delay: 0.32,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="flex flex-wrap md:justify-end gap-2.5 pt-2"
                  >
                    <span className="bg-white/10 border border-white/10 text-white text-[10px] px-3 py-1 rounded-full font-medium whitespace-nowrap">
                      {activeSuiteObj.specifications[0].value}
                    </span>
                    <span className="bg-white/10 border border-white/10 text-white text-[10px] px-3 py-1 rounded-full font-medium whitespace-nowrap">
                      {activeSuiteObj.specifications[1].value}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Float Scroll Link Icon */}
            <motion.button
              onClick={handleScrollToSpecs}
              whileHover={{ y: 4 }}
              className="flex items-center gap-3.5 text-white/80 hover:text-gold-a group pt-6 focus:outline-none cursor-pointer"
            >
              <span className="text-[10px] font-semibold tracking-[0.25em] uppercase">
                SCROLL
              </span>
              <div className="w-7 h-7 rounded-full border border-white/20 group-hover:border-gold-a flex items-center justify-center transition-colors">
                <ArrowDown
                  size={12}
                  className="group-hover:translate-y-0.5 transition-transform"
                />
              </div>
            </motion.button>
          </div>
        </div>
      </section>
      {/* 2.86 OUR STORY VERTICAL TAB SECTION */}
      <StorySection />
      <AboutSection />
      <GlassCardsSection />
      <StatsSection />
      {/* 2.85 VISION INSPIRED LIVING SECTION */}
      <VisionSection />
      <ChoiceSection />
      <SuiteDetails suite={activeSuiteObj} />
      {/* 2.87 AMENITIES VERTICAL INTERACTIVE CAROUSEL */}
      <AmenitiesSection />

      <EniteoGallery />
      <InteractiveMap />

      <NewEraSection />
      <Footer />

      {/* 5. IMMERSIVE VISITING BOOKER MODAL */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        suites={SUITES}
        activeSuiteId={selectedSuiteId}
      />
    </div>
  );
}
