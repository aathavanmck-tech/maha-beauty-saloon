import React, { useState } from 'react';
import {
  AlertCircle,
  Calendar,
  Clock,
  ExternalLink,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Send,
  Settings2,
  User,
} from 'lucide-react';
import {
  BRANCH_OPTIONS,
  BRAND_INFO,
  BranchId,
} from '../data/salonData';
import { ChampagneDivider, Reveal, TiltCard } from './ui/MotionPrimitives';
import { WhatsAppHandoffPayload } from './BookingPortalSection';

interface LocationsContactSectionProps {
  hyderabadMapUrl: string;
  chennaiMapUrl: string;
  topic: string;
  onTopicChange: (topic: string) => void;
  onSelectBranchAndBook: (branch: BranchId) => void;
  onOpenWhatsAppHandoff: (payload: WhatsAppHandoffPayload) => void;
  onOpenLinkSettings: () => void;
}

const ENQUIRY_TOPICS = [
  'General Salon Enquiry',
  'Women’s Services Enquiry',
  'Men’s Services Enquiry',
  'Personalised Bridal Makeup Consultation',
  'Beauty Training Academy Admission',
  'Branch Directions & Location Pin',
] as const;

export const LocationsContactSection: React.FC<LocationsContactSectionProps> = ({
  hyderabadMapUrl,
  chennaiMapUrl,
  topic,
  onTopicChange,
  onSelectBranchAndBook,
  onOpenWhatsAppHandoff,
  onOpenLinkSettings,
}) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [branch, setBranch] = useState<BranchId>('hyderabad');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleRequestDirections = (branchId: BranchId) => {
    const branchInfo =
      BRANCH_OPTIONS.find((b) => b.id === branchId) || BRANCH_OPTIONS[0];
    const whatsappMsg = [
      `Hello ${BRAND_INFO.businessName},`,
      `Please share the verified studio Google Maps pin and directions for:`,
      `• Branch: ${branchInfo.displayTitle}`,
      `• Daily Operating Hours: 10 AM–8 PM`,
    ].join('\n');

    onOpenWhatsAppHandoff({
      heading: `Request ${branchInfo.designation} Location Pin`,
      subtitle:
        'Connect on WhatsApp to receive the verified studio location pin and landmark directions.',
      message: whatsappMsg,
      summaryRows: [
        { label: 'Branch', value: branchInfo.displayTitle },
        { label: 'Operating Hours', value: 'Daily, 10 AM–8 PM' },
        { label: 'Request', value: 'Verified Map Pin & Directions' },
      ],
    });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};
    const digits = mobile.replace(/[^\d]/g, '');

    if (name.trim().length < 2) {
      nextErrors.name = 'Please enter your name.';
    }
    if (digits.length < 10 || digits.length > 15) {
      nextErrors.mobile = 'Please enter a valid 10-digit mobile number.';
    }
    if (message.trim().length < 5) {
      nextErrors.message = 'Please write a brief message so we can assist you.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const branchObj =
      BRANCH_OPTIONS.find((b) => b.id === branch) || BRANCH_OPTIONS[0];

    const formatted = [
      `Hello ${BRAND_INFO.businessName},`,
      `New Studio Contact / Enquiry:`,
      ``,
      `• Name: ${name.trim()}`,
      `• Mobile Number: ${mobile.trim()}`,
      `• Branch: ${branchObj.displayTitle}`,
      `• Topic: ${topic}`,
      `• Message: ${message.trim()}`,
    ].join('\n');

    onOpenWhatsAppHandoff({
      heading: 'Contact Enquiry Ready for WhatsApp',
      subtitle:
        'Review your enquiry details below and continue to WhatsApp to reach our studio team.',
      message: formatted,
      summaryRows: [
        { label: 'Name', value: `${name.trim()} (${mobile.trim()})` },
        { label: 'Selected Branch', value: branchObj.bookingLabel },
        { label: 'Topic', value: topic },
      ],
    });
  };

  return (
    <>
      {/* SECTION: LOCATIONS (#locations) */}
      <section
        id="locations"
        className="py-16 sm:py-24 bg-[#390E15] text-[#FAF7F2] border-b border-[#D4AF7A]/25"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#4F101E] border border-[#D4AF7A]/40 text-[#E3C89E] text-[11px] uppercase tracking-[0.18em] font-semibold mb-3">
              <MapPin className="w-3.5 h-3.5" />
              <span>Two Studio Branches</span>
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#FAF7F2] leading-tight">
              Our Locations
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#FAF7F2]/80 leading-relaxed">
              Welcoming guests across Telangana and Tamil Nadu with consistent
              clinical hygiene and personalised service — open{' '}
              <strong className="text-[#E3C89E]">{BRAND_INFO.workingHours}</strong>.
            </p>
            <ChampagneDivider light className="mt-5" />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {BRANCH_OPTIONS.map((loc, idx) => {
              const mapUrl =
                loc.id === 'hyderabad' ? hyderabadMapUrl : chennaiMapUrl;

              return (
                <Reveal key={loc.id} delay={idx * 0.08}>
                  <TiltCard maxTilt={2.5} className="h-full rounded-2xl">
                    <article className="h-full rounded-2xl bg-[#4F101E] border border-[#D4AF7A]/40 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-lg">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-3 py-1 rounded-full bg-[#2C060F] border border-[#D4AF7A]/35 text-[#E3C89E] text-xs font-semibold uppercase tracking-[0.12em]">
                            {loc.designation}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-xs text-[#FAF7F2]/85">
                            <Clock className="w-3.5 h-3.5 text-[#E3C89E]" />
                            <span>{loc.hours}</span>
                          </span>
                        </div>

                        <div>
                          <h3 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#FAF7F2]">
                            {loc.displayTitle}
                          </h3>
                          <p className="text-xs text-[#E3C89E] mt-1 font-medium">
                            {BRAND_INFO.businessName} • Daily operating hours: 10 AM–8 PM
                          </p>
                        </div>

                        <p className="text-sm text-[#FAF7F2]/82 leading-relaxed">
                          {loc.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#D4AF7A]/20 flex flex-col sm:flex-row gap-3">
                        <button
                          type="button"
                          onClick={() => onSelectBranchAndBook(loc.id)}
                          className="flex-1 min-h-[46px] px-4 py-2.5 rounded-xl bg-[#FAF7F2] text-[#4F101E] hover:bg-[#E3C89E] text-xs font-semibold uppercase tracking-[0.08em] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                        >
                          <Calendar className="w-4 h-4 shrink-0" />
                          <span>Book at {loc.designation}</span>
                        </button>

                        {mapUrl ? (
                          <a
                            href={mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 min-h-[46px] px-4 py-2.5 rounded-xl bg-[#390E15] text-[#E3C89E] border border-[#D4AF7A]/40 hover:bg-[#2C060F] text-xs font-semibold uppercase tracking-[0.08em] inline-flex items-center justify-center gap-2 transition-colors"
                          >
                            <Navigation className="w-4 h-4 shrink-0" />
                            <span>Open Map Link</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleRequestDirections(loc.id)}
                            className="flex-1 min-h-[46px] px-4 py-2.5 rounded-xl bg-[#390E15] text-[#E3C89E] border border-[#D4AF7A]/40 hover:bg-[#2C060F] text-xs font-semibold uppercase tracking-[0.08em] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                          >
                            <Navigation className="w-4 h-4 shrink-0" />
                            <span>Request Map Pin</span>
                          </button>
                        )}
                      </div>
                    </article>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={onOpenLinkSettings}
              className="inline-flex items-center gap-1.5 text-xs text-[#E3C89E]/80 hover:text-[#E3C89E] underline underline-offset-4 cursor-pointer"
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>Configure Official Map Links &amp; Studio WhatsApp Number</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION: CONTACT & GENERAL ENQUIRY (#contact) */}
      <section
        id="contact"
        className="py-16 sm:py-24 bg-[#FAF7F2] text-[#1D1716] border-b border-[#E4DCD0]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left 5 Cols: Direct Concierge Info */}
            <Reveal className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-[0.18em] text-[#5F1123] font-bold">
                  Contact &amp; Enquiries
                </span>
                <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#390E15] mt-1 leading-tight">
                  Connect With {BRAND_INFO.businessName}
                </h2>
                <p className="mt-3 text-sm sm:text-base text-[#5C524E] leading-relaxed">
                  Have questions regarding Women’s or Men’s services, personalised
                  bridal consultations, beauty training courses, or branch
                  directions? Send us a direct enquiry below.
                </p>
              </div>

              <div className="space-y-3.5">
                <div className="p-4 rounded-xl bg-[#FFFEFC] border border-[#E4DCD0] flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#5F1123] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-[#1D1716]">
                      Hyderabad – Main Branch, Telangana
                    </p>
                    <p className="text-xs text-[#5C524E] mt-0.5">
                      Flagship Saloon &amp; Training Institute
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#FFFEFC] border border-[#E4DCD0] flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#5F1123] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-[#1D1716]">
                      Chennai – Branch 2, Tamil Nadu
                    </p>
                    <p className="text-xs text-[#5C524E] mt-0.5">
                      Second Studio Branch
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#FFFEFC] border border-[#E4DCD0] flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-[#5F1123] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-[#1D1716]">
                      Daily operating hours: 10 AM–8 PM
                    </p>
                    <p className="text-xs text-[#5C524E] mt-0.5">
                      Open daily across both branches
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right 7 Cols: Validated Contact & Enquiry Form */}
            <Reveal delay={0.08} className="lg:col-span-7">
              <form
                onSubmit={handleContactSubmit}
                noValidate
                className="rounded-2xl bg-[#FFFEFC] border border-[#E4DCD0] p-6 sm:p-8 shadow-[0_14px_38px_rgba(57,14,21,0.06)] space-y-5"
              >
                <h3 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#390E15]">
                  Send a Studio Enquiry
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-[#1D1716] mb-1.5"
                    >
                      Your Name <span className="text-[#5F1123]">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#5C524E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((p) => ({ ...p, name: '' }));
                        }}
                        placeholder="Full name"
                        className="w-full min-h-[46px] pl-10 pr-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E4DCD0] text-sm"
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-xs text-[#9F1239] flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-mobile"
                      className="block text-xs font-semibold text-[#1D1716] mb-1.5"
                    >
                      Mobile Number <span className="text-[#5F1123]">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#5C524E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="contact-mobile"
                        type="tel"
                        inputMode="tel"
                        value={mobile}
                        onChange={(e) => {
                          setMobile(e.target.value);
                          if (errors.mobile) setErrors((p) => ({ ...p, mobile: '' }));
                        }}
                        placeholder="10-digit mobile number"
                        className="w-full min-h-[46px] pl-10 pr-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E4DCD0] text-sm"
                      />
                    </div>
                    {errors.mobile && (
                      <p className="mt-1 text-xs text-[#9F1239] flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.mobile}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-branch"
                      className="block text-xs font-semibold text-[#1D1716] mb-1.5"
                    >
                      Select Branch
                    </label>
                    <select
                      id="contact-branch"
                      value={branch}
                      onChange={(e) => setBranch(e.target.value as BranchId)}
                      className="w-full min-h-[46px] px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E4DCD0] text-sm"
                    >
                      {BRANCH_OPTIONS.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.bookingLabel} ({b.cityState})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-topic"
                      className="block text-xs font-semibold text-[#1D1716] mb-1.5"
                    >
                      Enquiry Subject
                    </label>
                    <select
                      id="contact-topic"
                      value={topic}
                      onChange={(e) => onTopicChange(e.target.value)}
                      className="w-full min-h-[46px] px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E4DCD0] text-sm"
                    >
                      {ENQUIRY_TOPICS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-[#1D1716] mb-1.5"
                  >
                    Your Message <span className="text-[#5F1123]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors((p) => ({ ...p, message: '' }));
                    }}
                    placeholder="Tell us about the service, bridal date, or training course you would like to discuss..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E4DCD0] text-sm resize-y"
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-[#9F1239] flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn-royal-sheen w-full min-h-[50px] px-6 py-3.5 rounded-xl bg-[#4F101E] text-[#FAF7F2] hover:bg-[#5F1123] text-xs sm:text-sm font-semibold uppercase tracking-[0.08em] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#E3C89E]" />
                  <span>Continue Enquiry via WhatsApp</span>
                  <Send className="w-3.5 h-3.5 text-[#E3C89E]" />
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
};
