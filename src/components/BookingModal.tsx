"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Sparkles, CheckCircle, FileText, Compass } from 'lucide-react';
import { Suite, BookingSubmission } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  suites: Suite[];
  activeSuiteId: 'lumiere' | 'penthouse' | 'aurelia';
}

export default function BookingModal({ isOpen, onClose, suites, activeSuiteId }: BookingModalProps) {
  const [formData, setFormData] = useState<Omit<BookingSubmission, 'suiteId'>>({
    fullName: '',
    email: '',
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // 2 days from now default
    timeSlot: '05:00 PM - 07:00 PM (Sunset Viewing)',
    notes: '',
  });

  const [selectedSuiteId, setSelectedSuiteId] = useState<'lumiere' | 'penthouse' | 'aurelia'>(activeSuiteId);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketNumber] = useState(() => `ELY-${Math.floor(100000 + Math.random() * 900000)}`);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      timeSlot: '05:00 PM - 07:00 PM (Sunset Viewing)',
      notes: '',
    });
    onClose();
  };

  const activeSuiteObj = suites.find(s => s.id === selectedSuiteId);

  const timeSlots = [
    '10:00 AM - 12:00 PM (Morning Soft Light)',
    '02:00 PM - 04:00 PM (Midday Sharp Ambience)',
    '05:00 PM - 07:00 PM (Sunset Viewing)',
    '08:00 PM - 10:00 PM (Night Nocturnal Highlight)'
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-brown-deep/60 backdrop-blur-md"
        />

        {/* Modal dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-2xl bg-white border border-warm-2 rounded-3xl overflow-hidden shadow-2xl z-10"
        >
          {/* Subtle gold line on top */}
          <div className="h-1.5 w-full bg-gradient-to-r from-gold-b via-gold-mid to-gold-a" />

          {/* Close trigger */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-brown-mid/60 hover:text-brown-deep p-2 rounded-full hover:bg-warm-1 transition-all duration-200 cursor-pointer"
          >
            <X size={20} />
          </button>

          {!isSubmitted ? (
            <div className="p-6 md:p-8 max-h-[85vh] overflow-y-auto">
              <div className="mb-6 flex items-start gap-4">
                <div className="p-3 bg-gold-a/10 border border-gold-a/20 text-gold-b rounded-2xl">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-serif text-brown-deep tracking-wide uppercase">REQUEST PRIVATE VIEWING</h3>
                  <p className="text-2xl text-brown-mid mt-1">
                    Book an exclusive private viewing concierge tour of Elyse Residences.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Guest Name & Email row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold tracking-widest text-brown-mid/70 uppercase">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sebastian Vance"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-warm-1/25 border border-warm-2 hover:border-warm-3 focus:border-gold-mid text-brown-deep placeholder-brown-mid/40 text-2xl rounded-xl px-4 py-3 outline-none transition-all duration-200"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold tracking-widest text-brown-mid/70 uppercase">
                      Private Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="vance@exemplar.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-warm-1/25 border border-warm-2 hover:border-warm-3 focus:border-gold-mid text-brown-deep placeholder-brown-mid/40 text-2xl rounded-xl px-4 py-3 outline-none transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Suite selector buttons */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold tracking-widest text-brown-mid/70 uppercase">
                    Select Preferred Residence Suite
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {suites.map(s => (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => setSelectedSuiteId(s.id)}
                        className={`flex flex-col text-left p-3.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                          selectedSuiteId === s.id
                            ? 'bg-gold-a/10 border-gold-b text-brown-deep shadow-sm'
                            : 'bg-warm-1/10 border-warm-2 text-brown-mid hover:border-warm-3'
                        }`}
                      >
                        <span className="text-2xl font-serif font-medium tracking-wider">
                          {s.menuLabel}
                        </span>
                        <span className="text-[9px] text-brown-mid/60 tracking-wider mt-1">
                          {s.location}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Consultation Date & Preferred Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold tracking-widest text-brown-mid/70 uppercase">
                      Reservation Date
                    </label>
                    <div className="relative">
                      <Calendar size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-brown-mid/50" />
                      <input
                        type="date"
                        required
                        value={formData.date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-warm-1/25 border border-warm-2 hover:border-warm-3 focus:border-gold-mid text-brown-deep text-2xl rounded-xl pl-10 pr-4 py-3 outline-none transition-all duration-200 cursor-pointer"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold tracking-widest text-brown-mid/70 uppercase">
                      Lighting & Time Ambience
                    </label>
                    <div className="relative">
                      <Clock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-brown-mid/50" />
                      <select
                        value={formData.timeSlot}
                        onChange={e => setFormData({ ...formData, timeSlot: e.target.value })}
                        className="w-full bg-warm-1/25 border border-warm-2 hover:border-warm-3 focus:border-gold-mid text-brown-deep text-2xl rounded-xl pl-10 pr-10 py-3 outline-none appearance-none transition-all duration-200 cursor-pointer"
                      >
                        {timeSlots.map(ts => (
                          <option key={ts} value={ts} className="bg-white text-brown-deep">
                            {ts}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brown-mid/50 text-2xl font-mono">•</div>
                    </div>
                  </div>
                </div>

                {/* Additional Requests */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold tracking-widest text-brown-mid/70 uppercase">
                    Bespoke Requests & Portfolio Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Dietary details, helicopter arrival landing, private wealth broker affiliation..."
                    value={formData.notes}
                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-warm-1/25 border border-warm-2 hover:border-warm-3 focus:border-gold-mid text-brown-deep placeholder-brown-mid/40 text-2xl rounded-xl px-4 py-3 outline-none transition-all duration-200 resize-none"
                  />
                </div>

                {/* CTA Submit Button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-brown-deep text-white font-semibold text-2xl tracking-[0.2em] uppercase rounded-xl py-4 hover:bg-gold-b transition-all duration-300 shadow-md cursor-pointer mt-4"
                >
                  Confirm Viewing Request
                  <Compass size={14} className="animate-spin" style={{ animationDuration: '8s' }} />
                </button>

                <p className="text-[9px] text-center text-brown-mid/50 tracking-wider">
                  BY BOOKING, YOU COVENANT TO ELYS-CO PRIVATE ARCHIVE PRIVACY TERMS. ALL DATA REMAINS ABSOLUTELY END-TO-END SECRET.
                </p>
              </form>
            </div>
          ) : (
            <div className="p-6 md:p-8 flex flex-col items-center text-center bg-white">
              {/* Success Badge */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-16 h-16 bg-gold-a/10 border border-gold-a/25 text-gold-b rounded-full flex items-center justify-center mb-4"
              >
                <CheckCircle size={36} />
              </motion.div>

              <h3 className="text-2xl font-serif text-brown-deep tracking-wide uppercase">
                Viewing Reserved
              </h3>
              <p className="text-2xl text-brown-mid mt-2 max-w-sm">
                Your private viewing request has been securely archived. A Residence Director will reach out to you within the next 2 hours.
              </p>

              {/* VIP Ticket Layout */}
              <div className="w-full max-w-sm bg-[#faf8f4] border border-warm-2 rounded-2xl p-5 my-6 text-left relative overflow-hidden shadow-sm">
                <div className="absolute right-[-20px] top-[-20px] w-24 h-24 border border-brown-deep/5 rounded-full pointer-events-none" />
                <div className="flex justify-between items-start border-b border-warm-2 pb-4 mb-4">
                  <div>
                    <span className="text-[8px] font-semibold tracking-widest text-brown-mid/60 uppercase">
                      Reservation ID
                    </span>
                    <span className="block text-2xl font-mono text-gold-b font-bold mt-0.5">
                      {ticketNumber}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] font-semibold tracking-widest text-brown-mid/60 uppercase">
                      PRESTIGE LEVEL
                    </span>
                    <span className="block text-[10px] tracking-wider text-gold-mid font-bold uppercase mt-0.5">
                      ★ PRIVATE VISITING
                    </span>
                  </div>
                </div>

                <div className="space-y-3.5">
                  <div>
                    <span className="text-[8px] tracking-widest text-brown-mid/50 uppercase block">Host Location</span>
                    <span className="text-2xl text-brown-deep font-serif tracking-wide">
                      Elyse Residence, {activeSuiteObj?.menuLabel} – {activeSuiteObj?.location}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[8px] tracking-widest text-brown-mid/50 uppercase block">Guest Patron</span>
                      <span className="text-2xl text-brown-deep mt-0.5 block truncate">
                        {formData.fullName}
                      </span>
                    </div>
                    <div>
                      <span className="text-[8px] tracking-widest text-brown-mid/50 uppercase block">Tour Schedule</span>
                      <span className="text-2xl text-brown-deep mt-0.5 block truncate">
                        {formData.date}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[8px] tracking-widest text-brown-mid/50 uppercase block">Time & Lighting</span>
                    <span className="text-2xl text-brown-deep mt-0.5 block">
                      {formData.timeSlot}
                    </span>
                  </div>
                </div>

                {/* Jagged border at the bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-1 flex justify-between">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="w-2.5 h-1 bg-white rounded-t-full -mb-0.5" />
                  ))}
                </div>
              </div>

              <div className="flex gap-3 w-full max-w-sm">
                <button
                  onClick={handleReset}
                  className="w-full flex items-center justify-center gap-2 bg-brown-deep text-white font-semibold text-2xl tracking-widest uppercase rounded-xl py-3.5 hover:bg-gold-b transition-all duration-300 cursor-pointer shadow-sm"
                >
                  <FileText size={12} />
                  Done
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
