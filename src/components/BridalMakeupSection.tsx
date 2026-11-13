import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  Calendar,
  Check,
  Crown,
  Info,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
  Star,
  User,
  X,
} from 'lucide-react';
import {
  BRANCH_OPTIONS,
  BRAND_INFO,
  BRIDAL_PACKAGES,
  BRIDAL_PILLARS,
  BRIDAL_SHOWCASE_ITEMS,
  BridalPackageItem,
  BranchId,
} from '../data/salonData';
import {
  ChampagneDivider,
  ParallaxFrame,
  Reveal,
  TiltCard,
} from './ui/MotionPrimitives';
import { WhatsAppHandoffPayload } from './BookingPortalSection';

interface BridalMakeupSectionProps {
  onNavigateToBridalContact: () => void;
  onOpenWhatsAppHandoff: (payload: WhatsAppHandoffPayload) => void;
}

const BRIDAL_EVENT_TYPES = [
  'Morning Ceremony (Muhurtham)',
  'Evening Glam (Reception)',
  '2 Events • All-Inclusive (Muhurtham + Reception)',
  'Engagement / Pre-Wedding Ceremony',
] as const;

function getTodayISO(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatBridalDate(isoDate: string): string {
  if (!isoDate) return 'To be finalised';
  const parts = isoDate.split('-').map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) return isoDate;
  const dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
  return dateObj.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export const BridalMakeupSection: React.FC<BridalMakeupSectionProps> = ({
  onNavigateToBridalContact,
  onOpenWhatsAppHandoff,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeFeature = BRIDAL_SHOWCASE_ITEMS[activeIndex];

  const minDate = useMemo(() => getTodayISO(), []);

  // Bridal Package Enquiry Modal State
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string>(
    BRIDAL_PACKAGES[1].id
  );
  const [brideName, setBrideName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [eventType, setEventType] = useState<string>(
    BRIDAL_PACKAGES[1].eventTypeDefault
  );
  const [eventDate, setEventDate] = useState<string>(minDate);
  const [preferredBranch, setPreferredBranch] = useState<BranchId>('hyderabad');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const selectedPackage: BridalPackageItem =
    BRIDAL_PACKAGES.find((pkg) => pkg.id === selectedPackageId) ||
    BRIDAL_PACKAGES[0];

  const openPackageEnquiry = (pkg: BridalPackageItem) => {
    setSelectedPackageId(pkg.id);
    setEventType(pkg.eventTypeDefault);
    setFormErrors({});
    setEnquiryModalOpen(true);
  };

  const handlePackageSwitchInModal = (pkg: BridalPackageItem) => {
    setSelectedPackageId(pkg.id);
    setEventType(pkg.eventTypeDefault);
  };

  const handleBridalPackageEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};
    const cleanDigits = contactNumber.replace(/[^\d]/g, '');

    if (brideName.trim().length < 2) {
      nextErrors.brideName = 'Please enter the bride’s name.';
    }
    if (cleanDigits.length < 10 || cleanDigits.length > 15) {
      nextErrors.contactNumber = 'Please enter a valid 10-digit contact number.';
    }
    if (!eventDate) {
      nextErrors.eventDate = 'Please select your wedding / event date.';
    } else if (eventDate < minDate) {
      nextErrors.eventDate = 'Event date cannot be in the past.';
    }

    setFormErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const branchObj =
      BRANCH_OPTIONS.find((b) => b.id === preferredBranch) || BRANCH_OPTIONS[0];

    const messageLines = [
      `Hello ${BRAND_INFO.businessName},`,
      `I would like to make a Bridal Makeup Package enquiry:`,
      ``,
      `• Bride’s Name: ${brideName.trim()}`,
      `• Contact Number: ${contactNumber.trim()}`,
      `• Selected Bridal Package: ${selectedPackage.name}`,
      `• Package Price: ${selectedPackage.price} (${selectedPackage.pricingDisplayLabel})`,
      `• Event Type: ${eventType}`,
      `• Event Date: ${formatBridalDate(eventDate)} (${eventDate})`,
      `• Preferred Branch: ${branchObj.displayTitle}`,
      ``,
      `Please verify bridal calendar availability and share booking next steps during working hours (${BRAND_INFO.workingHours}).`,
    ];

    setEnquiryModalOpen(false);

    onOpenWhatsAppHandoff({
      heading: `${selectedPackage.name} — WhatsApp Bridal Enquiry`,
      subtitle:
        'Review your bridal package enquiry below and continue to WhatsApp. Please note: the appointment is confirmed only after the salon verifies availability.',
      message: messageLines.join('\n'),
      summaryRows: [
        { label: 'Bride’s Name', value: brideName.trim() },
        { label: 'Contact Number', value: contactNumber.trim() },
        { label: 'Selected Bridal Package', value: selectedPackage.name },
        {
          label: 'Package Price',
          value: `${selectedPackage.price} (${selectedPackage.pricingDisplayLabel})`,
        },
        { label: 'Event Type', value: eventType },
        { label: 'Event Date', value: formatBridalDate(eventDate) },
        { label: 'Preferred Branch', value: branchObj.displayTitle },
      ],
    });
  };

  return (
    <section
      id="bridal"
      className="py-16 sm:py-24 bg-[#2C060F] text-[#FAF7F2] border-b border-[#D4AF7A]/25 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-22">
        {/* Top Block: Headline + Bridal Artistry Showcase */}
        <div>
          <Reveal className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#4F101E] border border-[#D4AF7A]/40 text-[#E3C89E] text-[11px] uppercase tracking-[0.18em] font-semibold mb-3">
              <Crown className="w-3.5 h-3.5 text-[#E3C89E]" />
              <span>South Indian Bridal Artistry</span>
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-[3.25rem] font-semibold text-[#FAF7F2] leading-[1.15]">
              “Sacred Muhurtham Mornings. Luminous Reception Evenings.”
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#FAF7F2]/82 max-w-2xl mx-auto leading-relaxed">
              Crafted by {BRAND_INFO.founderName} for temple mandapam warmth,
              heirloom Kanjeevaram silk grandeur, and high-definition photography
              across Hyderabad and Chennai weddings.
            </p>
            <ChampagneDivider light className="mt-5" />
          </Reveal>

          {/* Interactive Bridal Couture Spotlight + 7 Bridal Offerings */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left 6 Cols: Interactive Uploaded Bridal Portfolio Viewer */}
            <Reveal className="lg:col-span-6 space-y-4">
              <TiltCard maxTilt={3} className="rounded-2xl">
                <div className="relative rounded-2xl overflow-hidden border border-[#D4AF7A]/45 bg-[#390E15] aspect-[3/4] shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                  <ParallaxFrame
                    key={activeFeature.id}
                    src={activeFeature.image}
                    fallbackSrc={activeFeature.fallbackImage}
                    alt={activeFeature.imageAlt}
                    className="w-full h-full"
                    offset={14}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C060F]/95 via-[#2C060F]/20 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-5 sm:p-7 space-y-1.5">
                    <span className="inline-block text-[11px] uppercase tracking-[0.16em] text-[#E3C89E] font-semibold">
                      {activeFeature.subtitle}
                    </span>
                    <h3 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#FAF7F2]">
                      {activeFeature.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#FAF7F2]/84 leading-relaxed">
                      {activeFeature.description}
                    </p>
                  </div>
                </div>
              </TiltCard>

              {/* Thumbnail Switcher of Supplied Bridal Photographs */}
              <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
                {BRIDAL_SHOWCASE_ITEMS.map((item, idx) => {
                  const selected = idx === activeIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      aria-label={`View ${item.title}`}
                      className={`relative rounded-xl overflow-hidden aspect-[3/4] border-2 transition-all cursor-pointer ${
                        selected
                          ? 'border-[#E3C89E] scale-[1.02] shadow-md'
                          : 'border-[#D4AF7A]/20 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={item.image}
                        onError={(e) => {
                          const t = e.currentTarget;
                          if (t.src !== item.fallbackImage) {
                            t.src = item.fallbackImage;
                          }
                        }}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-top"
                      />
                    </button>
                  );
                })}
              </div>
            </Reveal>

            {/* Right 6 Cols: All 7 Bridal Specialities + Additional Supplied Bridal Prep Visuals */}
            <Reveal delay={0.1} className="lg:col-span-6 space-y-6">
              <div className="p-6 sm:p-8 rounded-2xl bg-[#390E15] border border-[#D4AF7A]/30 space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-[#E3C89E] font-semibold">
                    Complete Bridal Couture Suite
                  </p>
                  <h3 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#FAF7F2] mt-1">
                    Tailored Around Your Wedding Rituals
                  </h3>
                </div>

                {/* Exact 7 Bridal Elements */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {BRIDAL_PILLARS.map((pillar) => (
                    <li
                      key={pillar}
                      className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#4F101E]/85 border border-[#D4AF7A]/20"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#D4AF7A]/20 border border-[#D4AF7A]/50 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#E3C89E]" />
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-[#FAF7F2]">
                        {pillar}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Craft Detail Pair: Pre-Pleated Silk & Auspicious Muhurtham */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  <div className="rounded-xl overflow-hidden border border-[#D4AF7A]/25 bg-[#2C060F]">
                    <img
                      src="/images/silk-prepleated-prep.jpg"
                      onError={(e) => {
                        const t = e.currentTarget;
                        if (
                          t.src !==
                          'https://www.designarena.ai/u/33893b0c-eec2-4630-9049-12c6d2d1871c'
                        ) {
                          t.src =
                            'https://www.designarena.ai/u/33893b0c-eec2-4630-9049-12c6d2d1871c';
                        }
                      }}
                      alt="Crisp pre-pleated silk saree and floral veni styling preparation"
                      loading="lazy"
                      className="w-full h-36 object-cover"
                    />
                    <div className="p-3">
                      <p className="text-xs font-semibold text-[#E3C89E]">
                        Crisp Pre-Pleated Silk Draping
                      </p>
                      <p className="text-[11px] text-[#FAF7F2]/75 mt-0.5">
                        Structured pleats &amp; floral veni readiness before
                        muhurtham.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl overflow-hidden border border-[#D4AF7A]/25 bg-[#2C060F]">
                    <img
                      src="/images/bridal-auspicious-yellow.jpg"
                      onError={(e) => {
                        const t = e.currentTarget;
                        if (
                          t.src !==
                          'https://www.designarena.ai/u/4abf4b64-a4a9-41bd-862a-997cad795f85'
                        ) {
                          t.src =
                            'https://www.designarena.ai/u/4abf4b64-a4a9-41bd-862a-997cad795f85';
                        }
                      }}
                      alt="Traditional South Indian ceremonial bridal styling"
                      loading="lazy"
                      className="w-full h-36 object-cover object-top"
                    />
                    <div className="p-3">
                      <p className="text-xs font-semibold text-[#E3C89E]">
                        Ceremonial &amp; Garland Harmony
                      </p>
                      <p className="text-[11px] text-[#FAF7F2]/75 mt-0.5">
                        Skin-true finish matched to silk borders &amp; fresh
                        garlands.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Transparent Bridal Package Pointer */}
                <div className="p-4 rounded-xl bg-[#2C060F] border border-[#D4AF7A]/25 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#E3C89E] shrink-0 mt-0.5" />
                  <div className="text-xs text-[#FAF7F2]/82 leading-relaxed">
                    <strong className="text-[#FAF7F2] block mb-0.5">
                      Transparent All-Inclusive Bridal Packages Below
                    </strong>
                    Choose single-event packages (Muhurtham Glow at ₹15,000 or
                    Reception Royale at ₹18,000) or our two-event Complete Bridal
                    Journey at ₹28,000 (saving ₹5,000).
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById('bridal-packages');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className="btn-royal-sheen flex-1 min-h-[48px] px-5 py-3 rounded-xl bg-[#FAF7F2] text-[#4F101E] hover:bg-[#E3C89E] hover:text-[#2C060F] text-xs font-semibold uppercase tracking-[0.08em] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Crown className="w-4 h-4 shrink-0" />
                    <span>Explore Bridal Packages</span>
                  </button>
                  <button
                    type="button"
                    onClick={onNavigateToBridalContact}
                    className="flex-1 min-h-[48px] px-5 py-3 rounded-xl bg-transparent text-[#FAF7F2] border border-[#D4AF7A]/45 hover:bg-[#4F101E] text-xs font-semibold uppercase tracking-[0.08em] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>Bridal Consultation Form</span>
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* NEW INTEGRATED SECTION: BRIDAL MAKEUP PACKAGES */}
        <div id="bridal-packages" className="pt-6 border-t border-[#D4AF7A]/20">
          <Reveal className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#4F101E] border border-[#D4AF7A]/40 text-[#E3C89E] text-[11px] uppercase tracking-[0.18em] font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#E3C89E]" />
              <span>Bridal Makeup Packages</span>
            </span>
            <h3 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#FAF7F2] leading-tight">
              Transparent All-Inclusive Bridal Packages
            </h3>
            <p className="mt-3 text-sm sm:text-base text-[#FAF7F2]/80 leading-relaxed">
              Reserve an individual ceremony look or lock in your two-event bridal
              suite with {BRAND_INFO.founderName}. Appointments are confirmed only
              after our studio verifies date availability.
            </p>
            <ChampagneDivider light className="mt-5" />
          </Reveal>

          {/* Three Bridal Couture Package Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 lg:gap-8 items-stretch">
            {BRIDAL_PACKAGES.map((pkg, idx) => {
              const isTwoEvent = Boolean(pkg.isTwoEventPackage);
              const isMostBooked = Boolean(pkg.badge);

              return (
                <Reveal key={pkg.id} delay={idx * 0.07} className="h-full">
                  <TiltCard maxTilt={3} className="h-full rounded-2xl">
                    <article
                      className={`relative h-full flex flex-col justify-between rounded-2xl overflow-hidden transition-all ${
                        isTwoEvent
                          ? 'bg-[#FAF7F2] text-[#1D1716] border-2 border-[#D4AF7A] shadow-[0_24px_60px_rgba(0,0,0,0.42)]'
                          : isMostBooked
                          ? 'bg-[#390E15] text-[#FAF7F2] border-2 border-[#D4AF7A]/75 shadow-[0_22px_55px_rgba(0,0,0,0.38)]'
                          : 'bg-[#390E15] text-[#FAF7F2] border border-[#D4AF7A]/35 shadow-[0_18px_45px_rgba(0,0,0,0.3)]'
                      }`}
                    >
                      <div>
                        {/* Uploaded Bridal Photograph Header */}
                        <div className="relative h-56 sm:h-60 overflow-hidden bg-[#2C060F]">
                          <img
                            src={pkg.image}
                            onError={(e) => {
                              const t = e.currentTarget;
                              if (t.src !== pkg.fallbackImage) {
                                t.src = pkg.fallbackImage;
                              }
                            }}
                            alt={pkg.imageAlt}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#2C060F]/90 via-[#2C060F]/20 to-transparent" />

                          {/* Top Badges */}
                          <div className="absolute top-3.5 left-3.5 right-3.5 flex flex-wrap items-center justify-between gap-2">
                            <span className="px-2.5 py-1 rounded-md bg-[#2C060F]/90 border border-[#D4AF7A]/40 text-[10px] font-semibold tracking-[0.14em] uppercase text-[#E3C89E]">
                              {pkg.eyebrow}
                            </span>

                            {pkg.badge && (
                              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#E3C89E] text-[#2C060F] text-[10px] font-bold tracking-[0.14em] uppercase shadow-md">
                                <Star className="w-3 h-3 fill-current" />
                                <span>{pkg.badge}</span>
                              </span>
                            )}

                            {pkg.savingsBadge && (
                              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#4F101E] text-[#FAF7F2] border border-[#D4AF7A]/60 text-[10px] font-bold tracking-[0.12em] uppercase shadow-md">
                                <Crown className="w-3 h-3 text-[#E3C89E]" />
                                <span>{pkg.savingsBadge}</span>
                              </span>
                            )}
                          </div>

                          {/* Prominent Price Overlay Footer */}
                          <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between gap-2">
                            <div>
                              <h4 className="font-serif-display text-2xl sm:text-[1.75rem] font-semibold text-[#FAF7F2] leading-tight">
                                {pkg.name}
                              </h4>
                            </div>
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-5 sm:p-6 space-y-5">
                          {/* Tagline */}
                          <p
                            className={`text-xs sm:text-sm leading-relaxed ${
                              isTwoEvent ? 'text-[#5C524E]' : 'text-[#FAF7F2]/82'
                            }`}
                          >
                            {pkg.tagline}
                          </p>

                          {/* Prominent Package Price Block */}
                          <div
                            className={`p-4 rounded-xl border ${
                              isTwoEvent
                                ? 'bg-[#F2ECE1] border-[#5A0B1C]/15'
                                : 'bg-[#4F101E]/90 border-[#D4AF7A]/30'
                            }`}
                          >
                            <div className="flex flex-wrap items-baseline justify-between gap-2">
                              <span
                                className={`font-serif-display text-3xl sm:text-4xl font-bold ${
                                  isTwoEvent ? 'text-[#4F101E]' : 'text-[#FAF7F2]'
                                }`}
                              >
                                {pkg.price}
                              </span>
                              {isTwoEvent && (
                                <span className="text-xs font-semibold text-[#5F1123] bg-[#FFFEFC] px-2.5 py-1 rounded-full border border-[#5A0B1C]/15">
                                  Save ₹5,000 vs ₹33,000
                                </span>
                              )}
                            </div>
                            <p
                              className={`text-[11px] uppercase tracking-[0.12em] font-semibold mt-1 ${
                                isTwoEvent ? 'text-[#5F1123]' : 'text-[#E3C89E]'
                              }`}
                            >
                              {pkg.pricingDisplayLabel}
                            </p>
                          </div>

                          {/* Exact Inclusions List */}
                          <ul className="space-y-2.5">
                            {pkg.inclusions
                              .map((inc) => inc.trim())
                              .filter(Boolean)
                              .map((inc) => (
                                <li
                                  key={inc}
                                  className={`flex items-start gap-2.5 text-xs sm:text-[13px] leading-relaxed ${
                                    isTwoEvent
                                      ? 'text-[#1D1716]/90'
                                      : 'text-[#FAF7F2]/90'
                                  }`}
                                >
                                  <Check
                                    className={`w-4 h-4 shrink-0 mt-0.5 ${
                                      isTwoEvent ? 'text-[#5F1123]' : 'text-[#E3C89E]'
                                    }`}
                                  />
                                  <span>{inc}</span>
                                </li>
                              ))}
                          </ul>

                          {/* Signature Highlight Callout */}
                          <div
                            className={`p-3.5 rounded-xl border text-xs italic font-serif-display sm:text-[15px] leading-snug ${
                              isTwoEvent
                                ? 'bg-[#FFFEFC] border-[#D4AF7A]/55 text-[#390E15]'
                                : 'bg-[#2C060F]/85 border-[#D4AF7A]/25 text-[#E3C89E]'
                            }`}
                          >
                            {pkg.highlightQuote}
                          </div>
                        </div>
                      </div>

                      {/* Card Footer CTA Button */}
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1">
                        <button
                          type="button"
                          onClick={() => openPackageEnquiry(pkg)}
                          className={`btn-royal-sheen w-full min-h-[48px] px-5 py-3 rounded-xl text-xs font-semibold uppercase tracking-[0.08em] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                            isTwoEvent
                              ? 'bg-[#4F101E] text-[#FAF7F2] hover:bg-[#5F1123]'
                              : 'bg-[#FAF7F2] text-[#4F101E] hover:bg-[#E3C89E] hover:text-[#2C060F]'
                          }`}
                        >
                          <MessageCircle className="w-4 h-4 shrink-0" />
                          <span>WhatsApp Bridal Enquiry</span>
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

      {/* BRIDAL PACKAGE WHATSAPP ENQUIRY MODAL */}
      <AnimatePresence>
        {enquiryModalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="bridal-package-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1D1716]/80 backdrop-blur-xs"
            onClick={() => setEnquiryModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.24 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#FAF7F2] text-[#1D1716] border border-[#D4AF7A]/55 shadow-2xl"
            >
              {/* Modal Header */}
              <div className="p-5 sm:p-6 bg-[#390E15] text-[#FAF7F2] border-b border-[#D4AF7A]/30 flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-[#E3C89E] font-semibold">
                    Bridal Couture Concierge
                  </span>
                  <h3
                    id="bridal-package-modal-title"
                    className="font-serif-display text-2xl sm:text-3xl font-semibold mt-0.5"
                  >
                    WhatsApp Bridal Package Enquiry
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setEnquiryModalOpen(false)}
                  aria-label="Close bridal enquiry modal"
                  className="w-9 h-9 rounded-lg bg-[#4F101E] text-[#FAF7F2] flex items-center justify-center hover:bg-[#5F1123] shrink-0 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Bridal Enquiry Form */}
              <form
                onSubmit={handleBridalPackageEnquirySubmit}
                noValidate
                className="p-5 sm:p-6 space-y-4"
              >
                {/* Package Switcher (Individual Events or Complete 2-Event Package) */}
                <div>
                  <label className="block text-xs font-semibold text-[#1D1716] mb-2">
                    Selected Bridal Package <span className="text-[#5F1123]">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {BRIDAL_PACKAGES.map((pkg) => {
                      const active = pkg.id === selectedPackage.id;
                      return (
                        <button
                          key={pkg.id}
                          type="button"
                          onClick={() => handlePackageSwitchInModal(pkg)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            active
                              ? 'bg-[#4F101E] text-[#FAF7F2] border-[#4F101E]'
                              : 'bg-[#FFFEFC] text-[#1D1716] border-[#E4DCD0] hover:border-[#5F1123]/45'
                          }`}
                        >
                          <span className="block text-xs font-semibold leading-snug">
                            {pkg.name}
                          </span>
                          <span
                            className={`block font-serif-display text-lg font-bold mt-0.5 ${
                              active ? 'text-[#E3C89E]' : 'text-[#4F101E]'
                            }`}
                          >
                            {pkg.price}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Bride's Name & Contact Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="bride-enquiry-name"
                      className="block text-xs font-semibold text-[#1D1716] mb-1.5"
                    >
                      Bride’s Name <span className="text-[#5F1123]">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#5C524E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="bride-enquiry-name"
                        type="text"
                        value={brideName}
                        onChange={(e) => {
                          setBrideName(e.target.value);
                          if (formErrors.brideName) {
                            setFormErrors((p) => ({ ...p, brideName: '' }));
                          }
                        }}
                        placeholder="Enter bride’s full name"
                        className="w-full min-h-[46px] pl-10 pr-3.5 py-2.5 rounded-xl bg-[#FFFEFC] border border-[#E4DCD0] text-sm"
                      />
                    </div>
                    {formErrors.brideName && (
                      <p className="mt-1 text-xs text-[#9F1239] flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{formErrors.brideName}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="bride-enquiry-mobile"
                      className="block text-xs font-semibold text-[#1D1716] mb-1.5"
                    >
                      Contact Number <span className="text-[#5F1123]">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#5C524E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="bride-enquiry-mobile"
                        type="tel"
                        inputMode="tel"
                        value={contactNumber}
                        onChange={(e) => {
                          setContactNumber(e.target.value);
                          if (formErrors.contactNumber) {
                            setFormErrors((p) => ({ ...p, contactNumber: '' }));
                          }
                        }}
                        placeholder="10-digit mobile number"
                        className="w-full min-h-[46px] pl-10 pr-3.5 py-2.5 rounded-xl bg-[#FFFEFC] border border-[#E4DCD0] text-sm"
                      />
                    </div>
                    {formErrors.contactNumber && (
                      <p className="mt-1 text-xs text-[#9F1239] flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{formErrors.contactNumber}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Event Type & Event Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="bride-event-type"
                      className="block text-xs font-semibold text-[#1D1716] mb-1.5"
                    >
                      Event Type <span className="text-[#5F1123]">*</span>
                    </label>
                    <select
                      id="bride-event-type"
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full min-h-[46px] px-3.5 py-2.5 rounded-xl bg-[#FFFEFC] border border-[#E4DCD0] text-sm"
                    >
                      {BRIDAL_EVENT_TYPES.map((evt) => (
                        <option key={evt} value={evt}>
                          {evt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="bride-event-date"
                      className="block text-xs font-semibold text-[#1D1716] mb-1.5"
                    >
                      Event Date <span className="text-[#5F1123]">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-[#5C524E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="bride-event-date"
                        type="date"
                        min={minDate}
                        value={eventDate}
                        onChange={(e) => {
                          setEventDate(e.target.value);
                          if (formErrors.eventDate) {
                            setFormErrors((p) => ({ ...p, eventDate: '' }));
                          }
                        }}
                        className="w-full min-h-[46px] pl-10 pr-3.5 py-2.5 rounded-xl bg-[#FFFEFC] border border-[#E4DCD0] text-sm"
                      />
                    </div>
                    {formErrors.eventDate && (
                      <p className="mt-1 text-xs text-[#9F1239] flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{formErrors.eventDate}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Preferred Branch */}
                <div>
                  <label
                    htmlFor="bride-preferred-branch"
                    className="block text-xs font-semibold text-[#1D1716] mb-1.5"
                  >
                    Preferred Branch <span className="text-[#5F1123]">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#5C524E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      id="bride-preferred-branch"
                      value={preferredBranch}
                      onChange={(e) =>
                        setPreferredBranch(e.target.value as BranchId)
                      }
                      className="w-full min-h-[46px] pl-10 pr-8 py-2.5 rounded-xl bg-[#FFFEFC] border border-[#E4DCD0] text-sm"
                    >
                      {BRANCH_OPTIONS.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.displayTitle}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Availability Confirmation Disclaimer */}
                <div className="p-3.5 rounded-xl bg-[#F2ECE1] border border-[#5A0B1C]/15 flex items-start gap-2.5 text-xs text-[#5C524E] leading-relaxed">
                  <Info className="w-4 h-4 text-[#5F1123] shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-[#1D1716]">
                      {selectedPackage.name} — {selectedPackage.price}
                    </strong>{' '}
                    ({selectedPackage.pricingDisplayLabel}). Please note that the
                    appointment is confirmed only after the salon verifies
                    availability.
                  </p>
                </div>

                <button
                  type="submit"
                  className="btn-royal-sheen w-full min-h-[50px] px-6 py-3.5 rounded-xl bg-[#4F101E] text-[#FAF7F2] hover:bg-[#5F1123] text-xs sm:text-sm font-semibold uppercase tracking-[0.08em] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#E3C89E]" />
                  <span>
                    Continue to WhatsApp ({selectedPackage.name} •{' '}
                    {selectedPackage.price})
                  </span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
