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
import ChoiceSection from "../components/UpcomingSection";
import AmenitiesSection from "../components/AmenitiesSection";
import EniteoGallery from "../components/CarouselSection";
import InteractiveMap from "../components/Map";
import NewEraSection from "../components/CTA";
import Footer from "../components/Footer";
import { usePreloader } from "@/components/PreloaderProvider";
import LocationHeightsSection from "@/components/Location";
import ProjectsSection from "@/components/ProjectsSection";
import TestimonialsSection from "@/components/Testimonial";
import BlogSection from "@/components/BlogSection";
import FaqSection from "@/components/FaqSection";

export default function App() {
  const [selectedSuiteId, setSelectedSuiteId] = useState<"lumiere" | "penthouse" | "aurelia">("lumiere");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [scrollY, setScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const isScrolled = scrollY > 60;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 60) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setScrollY(currentScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleScrollToSpecs = () => {
    const element = document.getElementById("story-section");
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const { isLoaded } = usePreloader();

  return (
    <>
    <div className="relative text-white overflow-x-hidden font-sans select-none">
      <AnimatePresence>
        {isLoaded && (
          <motion.header
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: showNavbar ? 0 : -100, opacity: showNavbar ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
              isScrolled
                ? "bg-white/95 backdrop-blur-md py-3 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
                : "bg-transparent py-6"
            }`}
          >
            <div className="max-w-9xl mx-auto px-6 md:px-12 flex justify-between items-center relative">
              {/* Logo */}
              <button onClick={() => window.scrollTo(0, 0)} className="group">
                <img
                  src="/assets/images/CH-horizontal-logo.png"
                  alt="Logo"
                  className={`h-8 lg:h-18 w-auto transition-all duration-500 ${
                    isScrolled ? "brightness-100 invert-0" : "invert brightness-0 filter"
                  }`}
                />
              </button>

              {/* Navigation */}
              <nav className="hidden md:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
                {SUITES.map((suite) => (
                  <button
                    key={suite.id}
                    onClick={() => setSelectedSuiteId(suite.id)}
                    className={`text-[11px] uppercase tracking-[0.2em] transition-colors ${
                      isScrolled
                        ? selectedSuiteId === suite.id ? "text-brown-deep font-semibold" : "text-neutral-500"
                        : selectedSuiteId === suite.id ? "text-white font-semibold" : "text-white/70"
                    }`}
                  >
                    {suite.menuLabel}
                  </button>
                ))}
              </nav>

              {/* Action Button */}
              <button
                onClick={() => setIsBookingOpen(true)}
                className={`text-[11px] font-semibold tracking-[0.2em] px-6 py-2 rounded-full uppercase transition-all duration-500 ${
                  isScrolled ? "bg-brown-deep text-white" : "bg-white text-black"
                }`}
              >
                Request a Call
              </button>

              {/* Divider: Only visible when scrolled (Sticky state) */}
              <div
                className={`absolute -bottom-3 left-0 right-0 h-[1px] bg-neutral-200 transition-opacity duration-500 ${
                  isScrolled ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </motion.header>
        )}
      </AnimatePresence>
        {/* MOBILE DRAWER CURTAIN */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="fixed inset-0 bg-neutral-950 z-40 flex flex-col justify-between p-8 pt-32 md:hidden text-white"
            >
              <div className="space-y-12">
                <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase font-semibold block">
                  SUITE CHOICES
                </span>
                <div className="flex flex-col gap-6">
                  {SUITES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        setMobileMenuOpen(false);
                      }}
                      className="text-left py-1 focus:outline-none"
                    >
                      <span
                        className={`block font-serif text-2xl tracking-wide uppercase ${
                          selectedSuiteId === s.id
                            ? "text-white font-medium"
                            : "text-white/40"
                        }`}
                      >
                        {s.menuLabel}
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
                  className="w-full text-center bg-white text-black py-4 rounded-full text-sm font-semibold tracking-widest uppercase cursor-pointer"
                >
                  Request a Call
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HERO SECTION */}
        <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden">
          {/* Background Image Layer */}
          <div className="absolute inset-0 bg-[#0a0a0a] z-0">
            <div className="absolute inset-0 w-full h-full">
              <img
                src={
                  SUITES[0]?.heroImage || "/assets/images/mumbai-skyline.jpg"
                }
                alt="Main Destination View"
                className="w-full h-full object-cover origin-center"
              />
            </div>
            {/* <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-transparent to-neutral-950/40 z-1 pointer-events-none" />*/}
            {/* <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/10 via-transparent to-neutral-950/50 z-1 pointer-events-none" />  */}
          </div>

          {/* Content Container */}
          <div className="w-full max-w-9xl mx-auto px-6 md:px-12 lg:px-16 pb-12 lg:pb-20 relative z-10 flex flex-col flex-1 justify-between">
            {/* ─── TOP SECTION: Fixed Navbar Clearance Padding Added ───────────────── */}
            <div className="w-full pt-32 lg:pt-40 select-none">
              <div className="relative overflow-hidden py-2">
                <motion.div
                  initial={{ y: "100%", opacity: 0.5 }}
                  animate={
                    isLoaded
                      ? { y: 0, opacity: 1 }
                      : { y: "100%", opacity: 0.5 }
                  }
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  <h1 className="font-serif text-[9vw] lg:text-[13vw] leading-none tracking-[-0.04em] font-normal text-gradient-gold drop-shadow-[0_2px_15px_rgba(0,0,0,0.5)] whitespace-nowrap">
                    Driven By Values
                  </h1>
                </motion.div>
              </div>
            </div>

            {/* ─── BOTTOM SECTION: Right-Aligned Information ───────────────────────── */}
            <div className="w-full md:w-1/2 flex flex-col items-start md:items-end text-left md:text-right space-y-5 max-w-lg md:max-w-xl ml-auto mt-12 md:mt-auto">
              <div className="space-y-4">
                <h2 className="space-y-1 block">
                  <div className="overflow-hidden relative h-auto py-0.5">
                    <motion.span
                      initial={{ y: "100%" }}
                      animate={
                        isLoaded
                          ? { y: 0, opacity: 1 }
                          : { y: "100%", opacity: 0.5 }
                      }
                      transition={{
                        duration: 1.1,
                        delay: 0.1,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="block font-serif text-xl md:text-2xl lg:text-4xl font-normal tracking-widest text-white leading-tight uppercase select-text w-max"
                    >
                      {/* {SUITES[0]?.title1 || "Luxury Living"} */}
                       premium homes in mazgaon
                    {/* </motion.span>
                  </div>
                  <div className="overflow-hidden relative h-auto py-0.5">
                    <motion.span
                      initial={{ y: "100%" }}
                      animate={
                        isLoaded
                          ? { y: 0, opacity: 1 }
                          : { y: "100%", opacity: 0.5 }
                      }
                      transition={{
                        duration: 1.1,
                        delay: 0.18,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="block font-serif text-xl md:text-2xl lg:text-4xl font-normal tracking-widest text-white leading-tight uppercase select-text"
                    > */}
                      {/* {SUITES[0]?.title2 || "Redefined"} */}
                    </motion.span>
                  </div>
                </h2>

                <div className="overflow-hidden relative">
                  <motion.p
                    initial={{ y: "100%", opacity: 0.4 }}
                    animate={
                      isLoaded
                        ? { y: 0, opacity: 1 }
                        : { y: "100%", opacity: 0.5 }
                    }
                    transition={{
                      duration: 1.2,
                      delay: 0.25,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="text-white text-base md:text-xl leading-relaxed font-normal select-text drop-shadow-[0_2px_15px_rgba(0,0,0,0.5)]"
                  >
                    {SUITES[0]?.description ||
                      "Experience panoramic seaside horizons paired with unparalleled architectural design layouts."}
                  </motion.p>
                </div>
              </div>

              <motion.button
                onClick={handleScrollToSpecs}
                whileHover={{ y: 4 }}
                className="flex items-center gap-3.5 text-white/80 hover:text-gold-a group pt-4 focus:outline-none cursor-pointer"
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
      </div>
      {/* Added ID property layout link wrapper for smooth viewport shifting */}
      <div id="story-section">
        <StorySection />
      </div>
      <GlassCardsSection />
      <ProjectsSection/>
      <LocationHeightsSection />
      <VisionSection />
      <EniteoGallery />
      <ChoiceSection />
      <AmenitiesSection />
      <TestimonialsSection/>
      <FaqSection/>
      <BlogSection/>
      <NewEraSection />
      <Footer />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        suites={SUITES}
        activeSuiteId={selectedSuiteId}
      />
    </>
  );
}