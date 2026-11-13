import React from 'react';
import { ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { WOMENS_SERVICES, WomensServiceItem } from '../data/salonData';
import { ChampagneDivider, Reveal, TiltCard } from './ui/MotionPrimitives';

interface WomensServicesSectionProps {
  onSelectServiceForBooking: (category: 'women', serviceId: string) => void;
}

export const WomensServicesSection: React.FC<WomensServicesSectionProps> = ({
  onSelectServiceForBooking,
}) => {
  return (
    <section
      id="womens-services"
      className="py-16 sm:py-24 bg-[#F2ECE1] text-[#1D1716] border-b border-[#E4DCD0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#4F101E] text-[#FAF7F2] text-[11px] uppercase tracking-[0.16em] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#E3C89E]" />
            <span>Women’s Salon Sanctuary</span>
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#390E15] leading-tight">
            Women’s Services
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5C524E] leading-relaxed">
            Personalised scalp nourishment, purifying hair care, and clinical skin
            luminosity crafted for women across our Hyderabad and Chennai branches.
          </p>
          <ChampagneDivider className="mt-5" />
        </Reveal>

        {/* Women's Service Cards with Relevant Uploaded Photographs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {WOMENS_SERVICES.map((service: WomensServiceItem, idx: number) => {
            const isConfirmedPrice = service.confirmedPrice !== null;

            return (
              <Reveal
                key={service.id}
                delay={idx * 0.06}
                className={idx === 0 ? 'md:col-span-2 lg:col-span-1' : ''}
              >
                <TiltCard maxTilt={3} className="h-full rounded-2xl">
                  <article className="h-full flex flex-col rounded-2xl overflow-hidden bg-[#FFFEFC] border border-[#E4DCD0] hover:border-[#5F1123]/45 shadow-[0_12px_32px_rgba(57,14,21,0.06)] transition-all">
                    {/* Uploaded Photograph Header */}
                    <div className="relative h-60 sm:h-64 overflow-hidden bg-[#390E15]">
                      <img
                        src={service.image}
                        onError={(e) => {
                          const t = e.currentTarget;
                          if (t.src !== service.fallbackImage) {
                            t.src = service.fallbackImage;
                          }
                        }}
                        alt={service.imageAlt}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2C060F]/80 via-[#2C060F]/15 to-transparent" />

                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-[#390E15]/90 text-[#E3C89E] border border-[#D4AF7A]/35 text-[11px] font-semibold tracking-[0.12em]">
                          {service.number}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-[#FAF7F2]/95 text-[#4F101E] text-[11px] font-semibold">
                          {service.availabilityTag}
                        </span>
                      </div>

                      <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between gap-2">
                        <span
                          className={`inline-block px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold tracking-wide shadow-sm ${
                            isConfirmedPrice
                              ? 'bg-[#FAF7F2] text-[#4F101E]'
                              : 'bg-[#4F101E]/95 text-[#E3C89E] border border-[#D4AF7A]/40'
                          }`}
                        >
                          {service.priceDisplay}
                        </span>
                      </div>
                    </div>

                    {/* Service Body */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-5">
                      <div className="space-y-3">
                        <h3 className="font-serif-display text-2xl font-semibold text-[#390E15] leading-snug">
                          {service.name}
                        </h3>
                        {service.inclusionNote && (
                          <p className="inline-block px-3 py-1 rounded-md bg-[#F2ECE1] border border-[#5A0B1C]/20 text-xs font-semibold text-[#4F101E]">
                            {service.inclusionNote}
                          </p>
                        )}
                        <p className="text-sm text-[#5C524E] leading-relaxed">
                          {service.description}
                        </p>

                        {service.highlights.filter((p) => p.trim().length > 0)
                          .length > 0 && (
                          <ul className="pt-2 space-y-2 border-t border-[#E4DCD0]/80">
                            {service.highlights
                              .map((p) => p.trim())
                              .filter(Boolean)
                              .map((point) => (
                                <li
                                  key={point}
                                  className="flex items-start gap-2 text-xs sm:text-[13px] text-[#1D1716]/85"
                                >
                                  <Check className="w-4 h-4 text-[#5F1123] shrink-0 mt-0.5" />
                                  <span>{point}</span>
                                </li>
                              ))}
                          </ul>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          onSelectServiceForBooking('women', service.id)
                        }
                        className="w-full min-h-[46px] px-4 py-3 rounded-xl bg-[#4F101E] text-[#FAF7F2] hover:bg-[#5F1123] text-xs font-semibold uppercase tracking-[0.08em] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <span>
                          {isConfirmedPrice
                            ? `Book Service — ${service.priceDisplay}`
                            : 'Select & Enquire Price'}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-[#E3C89E]" />
                      </button>
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
