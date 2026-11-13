import React from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';
import { HYGIENE_STANDARDS, PROFESSIONAL_BRANDS } from '../data/salonData';
import { ChampagneDivider, Reveal, TiltCard } from './ui/MotionPrimitives';

export const HygieneProductsSection: React.FC = () => {
  return (
    <section
      id="standards"
      className="py-16 sm:py-24 bg-[#FAF7F2] text-[#1D1716] border-b border-[#E4DCD0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-18">
        {/* Required Headline: "The Maha Lakshmi Standard." */}
        <Reveal className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#4F101E] text-[#FAF7F2] text-[11px] uppercase tracking-[0.16em] font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E3C89E]" />
            <span>Products &amp; Studio Hygiene</span>
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#390E15] leading-tight">
            “The Maha Lakshmi Standard.”
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5C524E] leading-relaxed">
            Every skin, scalp, and bridal session across our Hyderabad and Chennai
            branches upholds uncompromising studio cleanliness and thoughtful
            consultation.
          </p>
          <ChampagneDivider className="mt-5" />
        </Reveal>

        {/* 6 Required Hygiene & Consultation Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {HYGIENE_STANDARDS.map((item, idx) => (
            <Reveal key={item.number} delay={idx * 0.05}>
              <TiltCard maxTilt={2.5} className="h-full rounded-2xl">
                <div className="h-full p-6 rounded-2xl bg-[#FFFEFC] border border-[#E4DCD0] hover:border-[#5F1123]/40 shadow-xs transition-all space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-serif-display text-2xl italic font-semibold text-[#5F1123]">
                      {item.number}
                    </span>
                    <span className="w-8 h-8 rounded-lg bg-[#F2ECE1] flex items-center justify-center text-[#4F101E]">
                      <ShieldCheck className="w-4 h-4" />
                    </span>
                  </div>
                  <h3 className="font-serif-display text-2xl font-semibold text-[#390E15]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#5C524E] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* 5 Referenced Professional Formulations Banner */}
        <Reveal>
          <div className="rounded-2xl bg-[#390E15] text-[#FAF7F2] border border-[#D4AF7A]/35 p-6 sm:p-10 space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D4AF7A]/20 pb-5">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#E3C89E] font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>In-Studio Product Selection</span>
                </p>
                <h3 className="font-serif-display text-2xl sm:text-3xl font-semibold mt-1">
                  Professional Brands Used in Selected Salon Protocols
                </h3>
              </div>
              <p className="text-xs text-[#FAF7F2]/75 max-w-md">
                Selected based on individual skin and hair suitability after
                pre-session consultation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
              {PROFESSIONAL_BRANDS.map((brand) => (
                <div
                  key={brand.name}
                  className="p-4 rounded-xl bg-[#4F101E] border border-[#D4AF7A]/25 flex flex-col justify-between gap-1.5"
                >
                  <p className="font-serif-display text-xl font-semibold text-[#FAF7F2]">
                    {brand.name}
                  </p>
                  <p className="text-[11px] text-[#E3C89E]/85">{brand.category}</p>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-[#FAF7F2]/65 leading-relaxed pt-1">
              Note: All brand names belong to their respective trademark owners and
              are referenced strictly to indicate authentic professional products
              used in studio services; no claim of official brand partnership,
              sponsorship, or authorisation is made.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
