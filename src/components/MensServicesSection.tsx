import React from 'react';
import {
  ArrowUpRight,
  Check,
  Droplets,
  Layers,
  Shield,
  Sparkles,
  SunMedium,
} from 'lucide-react';
import { MENS_SERVICES, MensServiceItem } from '../data/salonData';
import { ChampagneDivider, Reveal, TiltCard } from './ui/MotionPrimitives';

interface MensServicesSectionProps {
  onSelectServiceForBooking: (category: 'men', serviceId: string) => void;
}

function renderMensIcon(iconKey: MensServiceItem['iconKey']) {
  switch (iconKey) {
    case 'oil-wash':
      return <Droplets className="w-5 h-5" />;
    case 'hydra':
      return <Sparkles className="w-5 h-5" />;
    case 'scalp':
      return <Shield className="w-5 h-5" />;
    case 'facial':
      return <SunMedium className="w-5 h-5" />;
    case 'skin':
      return <Layers className="w-5 h-5" />;
  }
}

export const MensServicesSection: React.FC<MensServicesSectionProps> = ({
  onSelectServiceForBooking,
}) => {
  return (
    <section
      id="mens-services"
      className="py-16 sm:py-24 bg-[#390E15] text-[#FAF7F2] border-b border-[#D4AF7A]/25 relative overflow-hidden"
    >
      {/* Subtle Architectural Hairline Borders */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
      >
        <div className="max-w-7xl mx-auto h-full border-x border-[#D4AF7A]/15" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#4F101E] border border-[#D4AF7A]/40 text-[#E3C89E] text-[11px] uppercase tracking-[0.18em] font-semibold mb-3">
            Dedicated Men’s Grooming &amp; Clinical Care
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#FAF7F2] leading-tight">
            Men’s Services
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#FAF7F2]/80 leading-relaxed">
            Precision scalp therapy, purifying hair wash rituals, and facial and
            skin treatments delivered with single-use hygiene standards in Hyderabad
            and Chennai.
          </p>
          <ChampagneDivider light className="mt-5" />
        </Reveal>

        <div className="space-y-8">
          {/* Featured Service 01: Head Oil Massage + Neck Massage + Hair Wash — ₹1,200 TOTAL */}
          {MENS_SERVICES.slice(0, 1).map((featured) => (
            <Reveal key={featured.id}>
              <TiltCard maxTilt={2.5} className="rounded-2xl">
                <article className="rounded-2xl bg-[#FAF7F2] text-[#1D1716] border-2 border-[#D4AF7A]/60 p-5 sm:p-7 lg:p-8 shadow-[0_22px_52px_rgba(0,0,0,0.3)]">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                    {/* Uploaded Male Studio Photograph in Premium Rounded Frame */}
                    <div className="lg:col-span-5">
                      <div className="relative rounded-2xl overflow-hidden bg-[#2C060F] border border-[#5A0B1C]/25 shadow-md aspect-[4/3]">
                        <img
                          src={featured.image}
                          onError={(e) => {
                            const t = e.currentTarget;
                            if (t.src !== featured.fallbackImage) {
                              t.src = featured.fallbackImage;
                            }
                          }}
                          alt={featured.imageAlt}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2C060F]/75 via-transparent to-transparent" />
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                          <span className="px-2.5 py-1 rounded-md bg-[#390E15]/90 text-[#E3C89E] border border-[#D4AF7A]/40 text-[11px] font-semibold tracking-[0.12em]">
                            {featured.number}
                          </span>
                          <span className="px-3 py-1 rounded-full bg-[#FAF7F2]/95 text-[#4F101E] text-[11px] font-semibold">
                            {featured.availabilityTag}
                          </span>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3">
                          <span className="inline-block px-3.5 py-1.5 rounded-lg bg-[#4F101E] text-[#FAF7F2] border border-[#D4AF7A]/45 text-xs sm:text-sm font-bold tracking-wide shadow-sm">
                            {featured.priceDisplay}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Service Details, Neck Massage Inclusion & CTA */}
                    <div className="lg:col-span-7 space-y-4">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#4F101E] text-[#E3C89E]">
                          {renderMensIcon(featured.iconKey)}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#5F1123]">
                          Service {featured.number} • {featured.availabilityTag}
                        </span>
                      </div>

                      <h3 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#390E15] leading-snug">
                        {featured.name}
                      </h3>

                      {featured.inclusionNote && (
                        <p className="inline-block px-3.5 py-1 rounded-md bg-[#4F101E] text-[#E3C89E] text-xs font-semibold tracking-wide">
                          {featured.inclusionNote}
                        </p>
                      )}

                      <p className="text-sm sm:text-base text-[#5C524E] leading-relaxed">
                        {featured.description}
                      </p>

                      {featured.highlights.filter((p) => p.trim().length > 0)
                        .length > 0 && (
                        <ul className="pt-2 space-y-2 border-t border-[#5A0B1C]/15">
                          {featured.highlights
                            .map((p) => p.trim())
                            .filter(Boolean)
                            .map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2.5 text-xs sm:text-sm text-[#1D1716]/90"
                              >
                                <Check className="w-4 h-4 text-[#5F1123] shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                        </ul>
                      )}

                      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.16em] text-[#5C524E] font-semibold">
                            Confirmed Combo Price
                          </p>
                          <p className="font-serif-display text-3xl sm:text-4xl font-bold text-[#4F101E]">
                            {featured.priceDisplay}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            onSelectServiceForBooking('men', featured.id)
                          }
                          className="btn-royal-sheen w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-xl bg-[#4F101E] text-[#FAF7F2] hover:bg-[#5F1123] text-xs font-semibold uppercase tracking-[0.08em] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                        >
                          <span>Book — {featured.priceDisplay}</span>
                          <ArrowUpRight className="w-4 h-4 text-[#E3C89E]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}

          {/* Services 02 – 05: Male Photographs in Premium Rounded Burgundy & Ivory Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7">
            {MENS_SERVICES.slice(1).map((service, idx) => {
              const isIvoryCard = idx % 2 === 1;

              return (
                <Reveal key={service.id} delay={(idx + 1) * 0.06}>
                  <TiltCard maxTilt={3} className="h-full rounded-2xl">
                    <article
                      className={`h-full rounded-2xl overflow-hidden flex flex-col justify-between transition-all ${
                        isIvoryCard
                          ? 'bg-[#FAF7F2] text-[#1D1716] border border-[#D4AF7A]/55 shadow-lg'
                          : 'bg-[#4F101E] text-[#FAF7F2] border border-[#D4AF7A]/35 shadow-lg'
                      }`}
                    >
                      <div>
                        {/* Rounded Male Photograph Frame */}
                        <div className="p-3.5 pb-0">
                          <div className="relative h-56 sm:h-60 rounded-xl overflow-hidden bg-[#2C060F] border border-[#D4AF7A]/35">
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
                            <div className="absolute inset-0 bg-gradient-to-t from-[#2C060F]/80 via-[#2C060F]/10 to-transparent" />

                            <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                              <span className="px-2.5 py-1 rounded-md bg-[#390E15]/90 text-[#E3C89E] border border-[#D4AF7A]/35 text-[11px] font-semibold tracking-[0.12em]">
                                {service.number}
                              </span>
                              <span className="px-3 py-1 rounded-full bg-[#FAF7F2]/95 text-[#4F101E] text-[11px] font-semibold">
                                {service.availabilityTag}
                              </span>
                            </div>

                            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                              <span className="inline-block px-3.5 py-1.5 rounded-lg bg-[#390E15]/95 text-[#E3C89E] border border-[#D4AF7A]/40 text-xs sm:text-sm font-bold tracking-wide">
                                {service.priceDisplay}
                              </span>
                              <span className="w-9 h-9 rounded-lg bg-[#4F101E]/90 border border-[#D4AF7A]/35 text-[#E3C89E] flex items-center justify-center">
                                {renderMensIcon(service.iconKey)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Card Text Content */}
                        <div className="p-5 sm:p-6 space-y-3.5">
                          <h3
                            className={`font-serif-display text-2xl sm:text-[1.7rem] font-semibold leading-snug ${
                              isIvoryCard ? 'text-[#390E15]' : 'text-[#FAF7F2]'
                            }`}
                          >
                            {service.name}
                          </h3>

                          <p
                            className={`text-sm leading-relaxed ${
                              isIvoryCard
                                ? 'text-[#5C524E]'
                                : 'text-[#FAF7F2]/82'
                            }`}
                          >
                            {service.description}
                          </p>

                          {service.highlights.filter((p) => p.trim().length > 0)
                            .length > 0 && (
                            <ul
                              className={`space-y-2 pt-2.5 border-t ${
                                isIvoryCard
                                  ? 'border-[#5A0B1C]/15'
                                  : 'border-[#D4AF7A]/20'
                              }`}
                            >
                              {service.highlights
                                .map((p) => p.trim())
                                .filter(Boolean)
                                .map((point) => (
                                  <li
                                    key={point}
                                    className={`flex items-start gap-2 text-xs sm:text-[13px] ${
                                      isIvoryCard
                                        ? 'text-[#1D1716]/85'
                                        : 'text-[#FAF7F2]/85'
                                    }`}
                                  >
                                    <Check
                                      className={`w-4 h-4 shrink-0 mt-0.5 ${
                                        isIvoryCard
                                          ? 'text-[#5F1123]'
                                          : 'text-[#E3C89E]'
                                      }`}
                                    />
                                    <span>{point}</span>
                                  </li>
                                ))}
                            </ul>
                          )}
                        </div>
                      </div>

                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1">
                        <button
                          type="button"
                          onClick={() =>
                            onSelectServiceForBooking('men', service.id)
                          }
                          className={`w-full min-h-[46px] px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-[0.08em] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                            isIvoryCard
                              ? 'bg-[#4F101E] text-[#FAF7F2] hover:bg-[#5F1123]'
                              : 'bg-[#FAF7F2] text-[#4F101E] hover:bg-[#E3C89E] hover:text-[#2C060F]'
                          }`}
                        >
                          <span>Select &amp; Enquire in Booking Portal</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    </article>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
