import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Award, Calendar, GraduationCap, MapPin, Sparkles } from 'lucide-react';
import { BRAND_INFO } from '../data/salonData';
import { OriginalBrandLogo, ParallaxFrame, TiltCard } from './ui/MotionPrimitives';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#390E15] text-[#FAF7F2] pt-8 pb-16 sm:pt-12 sm:pb-24 lg:py-24 border-b border-[#D4AF7A]/25"
    >
      {/* Subtle Architectural Background Rings & Champagne Linework */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute -top-40 -left-32 w-[480px] h-[480px] rounded-full opacity-20"
          style={{
            background:
              'radial-gradient(circle, rgba(114,22,43,0.85) 0%, rgba(57,14,21,0) 70%)',
          }}
        />
        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : { y: [0, -10, 0], rotate: [0, 2, 0] }
          }
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden lg:block absolute top-16 right-[8%] w-72 h-72 rounded-full border border-[#D4AF7A]/15"
        />
        <div className="hidden lg:block absolute bottom-12 left-[4%] w-48 h-48 rounded-full border border-[#D4AF7A]/10" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Brand Crest, Tagline, Supporting Copy, 3 CTAs, Highlights */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 min-w-0">
            {/* Brand Seal Pill */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex flex-wrap items-center gap-3 p-2 pr-4 rounded-xl bg-[#4F101E]/90 border border-[#D4AF7A]/35 max-w-full"
            >
              <OriginalBrandLogo sizeClass="w-12 h-12 sm:w-14 sm:h-14 rounded-lg" priority />
              <div className="min-w-0">
                <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#E3C89E] font-semibold">
                  Hyderabad &amp; Chennai • Open Daily, 10 AM–8 PM
                </p>
                <p className="text-xs sm:text-sm text-[#FAF7F2]/95 font-medium break-words">
                  {BRAND_INFO.businessName}
                </p>
              </div>
            </motion.div>

            {/* Primary Headline */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4"
            >
              <h1 className="font-serif-display text-[2.15rem] min-[375px]:text-[2.45rem] sm:text-5xl lg:text-[3.65rem] font-semibold leading-[1.1] tracking-[-0.01em] text-[#FAF7F2]">
                “Where Clinical Luminosity Meets{' '}
                <span className="italic text-[#E3C89E] font-normal">
                  South Indian Grace.
                </span>
                ”
              </h1>

              <p className="text-sm sm:text-base lg:text-[17px] leading-relaxed text-[#FAF7F2]/84 max-w-2xl">
                Led by{' '}
                <strong className="text-[#FAF7F2] font-semibold">
                  {BRAND_INFO.founderName}
                </strong>{' '}
                ({BRAND_INFO.founderTitle}), our sanctuaries in{' '}
                <span className="text-[#E3C89E]">Hyderabad</span> and{' '}
                <span className="text-[#E3C89E]">Chennai</span> unite clinical skin
                and scalp health with timeless South Indian beauty artistry —
                offering dedicated Women’s Services, Men’s Services, bridal couture,
                and certified beauty academy training.
              </p>
            </motion.div>

            {/* 3 Functional Hero Action Buttons */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-3.5"
            >
              <button
                type="button"
                onClick={() => onNavigate('booking')}
                className="btn-royal-sheen min-h-[48px] px-6 py-3.5 rounded-full bg-[#FAF7F2] text-[#4F101E] hover:bg-[#E3C89E] hover:text-[#2C060F] font-semibold text-xs sm:text-sm tracking-[0.06em] uppercase inline-flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span>Book Appointment</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('womens-services')}
                className="min-h-[48px] px-6 py-3.5 rounded-full bg-[#5F1123] text-[#FAF7F2] border border-[#D4AF7A]/45 hover:bg-[#72162B] font-semibold text-xs sm:text-sm tracking-[0.06em] uppercase inline-flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4 shrink-0 text-[#E3C89E]" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('academy')}
                className="min-h-[48px] px-5 py-3.5 rounded-full bg-transparent text-[#FAF7F2]/92 border border-[#FAF7F2]/25 hover:border-[#D4AF7A] hover:text-[#E3C89E] font-medium text-xs sm:text-sm tracking-[0.05em] uppercase inline-flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <GraduationCap className="w-4 h-4 shrink-0 text-[#D4AF7A]" />
                <span>Discover Our Academy</span>
              </button>
            </motion.div>

            {/* Business Highlights Strip: 6+ Years | 1,000+ Glows | 2 Branches */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="pt-3 border-t border-[#D4AF7A]/25"
            >
              <div className="grid grid-cols-3 gap-2 sm:gap-6">
                <div className="p-3 sm:p-4 rounded-xl bg-[#4F101E]/65 border border-[#D4AF7A]/20">
                  <div className="flex items-center gap-1.5 text-[#E3C89E] mb-1">
                    <Award className="w-4 h-4 shrink-0 hidden min-[380px]:inline" />
                    <span className="font-serif-display text-2xl sm:text-3xl font-bold text-[#FAF7F2]">
                      6+ Years
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#FAF7F2]/75 leading-snug">
                    Cosmetology Experience
                  </p>
                </div>

                <div className="p-3 sm:p-4 rounded-xl bg-[#4F101E]/65 border border-[#D4AF7A]/20">
                  <div className="flex items-center gap-1.5 text-[#E3C89E] mb-1">
                    <Sparkles className="w-4 h-4 shrink-0 hidden min-[380px]:inline" />
                    <span className="font-serif-display text-2xl sm:text-3xl font-bold text-[#FAF7F2]">
                      1,000+
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#FAF7F2]/75 leading-snug">
                    Glows Created
                  </p>
                </div>

                <div className="p-3 sm:p-4 rounded-xl bg-[#4F101E]/65 border border-[#D4AF7A]/20">
                  <div className="flex items-center gap-1.5 text-[#E3C89E] mb-1">
                    <MapPin className="w-4 h-4 shrink-0 hidden min-[380px]:inline" />
                    <span className="font-serif-display text-2xl sm:text-3xl font-bold text-[#FAF7F2]">
                      2 Branches
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#FAF7F2]/75 leading-snug">
                    Hyderabad &amp; Chennai
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Authentic Bridal & Beauty Visual Composition */}
          <div className="lg:col-span-5">
            <TiltCard maxTilt={3.5} className="rounded-2xl">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Arch / Frame */}
                <div className="relative rounded-2xl overflow-hidden border border-[#D4AF7A]/40 bg-[#2C060F] shadow-[0_24px_60px_rgba(0,0,0,0.45)] aspect-[4/5]">
                  <ParallaxFrame
                    src="/images/bridal-muhurtham-mandapam.jpg"
                    fallbackSrc="https://www.designarena.ai/u/9b472b01-f216-4ce6-bc06-56b865cda0b2"
                    alt="Traditional South Indian Bridal Artistry by Maha Lakshmi"
                    className="w-full h-full"
                    offset={18}
                    eager
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C060F]/90 via-transparent to-transparent" />

                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 flex items-end justify-between gap-3">
                    <div>
                      <span className="inline-block px-2.5 py-1 rounded-full bg-[#4F101E]/90 border border-[#D4AF7A]/40 text-[10px] uppercase tracking-[0.14em] text-[#E3C89E] mb-2">
                        Personalised Aesthetic Care
                      </span>
                      <p className="font-serif-display text-xl sm:text-2xl text-[#FAF7F2] leading-snug">
                        Skin Health, Bridal Grace &amp; Certified Mastery
                      </p>
                    </div>
                  </div>
                </div>

                {/* Secondary Inset Card (Desktop & Tablet) */}
                <div className="hidden sm:flex items-center gap-3 absolute -bottom-5 -left-5 bg-[#FAF7F2] text-[#1D1716] p-3 rounded-xl shadow-xl border border-[#D4AF7A]/50 max-w-[260px]">
                  <img
                    src="/images/bridal-reception-evening.jpg"
                    onError={(e) => {
                      const t = e.currentTarget;
                      if (t.src !== 'https://www.designarena.ai/u/c9c66cf4-cc12-4348-9f20-a22204e52271') {
                        t.src = 'https://www.designarena.ai/u/c9c66cf4-cc12-4348-9f20-a22204e52271';
                      }
                    }}
                    alt="Luminous Evening Bridal Look"
                    loading="eager"
                    className="w-14 h-16 rounded-lg object-cover shrink-0 border border-[#5A0B1C]/20"
                  />
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-[#5F1123] font-bold">
                      Open {BRAND_INFO.workingHours}
                    </p>
                    <p className="text-xs font-semibold text-[#1D1716] leading-snug mt-0.5">
                      Separate Women’s &amp; Men’s Studio Protocols
                    </p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
};
