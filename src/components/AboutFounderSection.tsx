import React from 'react';
import {
  CheckCircle2,
  HeartHandshake,
  Quote,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { BRAND_INFO } from '../data/salonData';
import {
  ChampagneDivider,
  OriginalBrandLogo,
  Reveal,
  TiltCard,
} from './ui/MotionPrimitives';

interface AboutFounderSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const AboutFounderSection: React.FC<AboutFounderSectionProps> = ({
  onNavigate,
}) => {
  return (
    <section
      id="about"
      className="py-16 sm:py-24 bg-[#FAF7F2] text-[#1D1716] border-b border-[#E4DCD0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-[#5F1123] font-semibold mb-2">
            About &amp; Founder
          </p>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#390E15] leading-tight">
            A Cosmetologist’s Precision. A Sanctuary’s Warmth.
          </h2>
          <ChampagneDivider className="mt-5" />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Founder & Complete Group Photograph Column (Natural Uncropped Proportions) */}
          <Reveal className="lg:col-span-6 lg:sticky lg:top-28">
            <TiltCard maxTilt={3} className="rounded-2xl">
              <div className="rounded-2xl overflow-hidden bg-[#4F101E] p-3.5 sm:p-5 border-2 border-[#D4AF7A]/55 shadow-[0_22px_50px_rgba(57,14,21,0.18)]">
                {/* Complete Uploaded Group Photograph — Natural Full Frame, Zero Face Cropping */}
                <div className="relative rounded-xl overflow-hidden bg-[#2C060F] border border-[#D4AF7A]/35">
                  <img
                    src={BRAND_INFO.aboutGroupPhotoPath}
                    onError={(e) => {
                      const t = e.currentTarget;
                      if (t.src !== BRAND_INFO.aboutGroupPhotoFallback) {
                        t.src = BRAND_INFO.aboutGroupPhotoFallback;
                      }
                    }}
                    alt="Founder Maha Lakshmi – Certified Cosmetologist & Aesthetic Artist with her graduating group at Maha Beauty Saloon and Training Institute"
                    width={1280}
                    height={720}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-contain block"
                  />
                </div>

                {/* Founder Professional Plaque Below Group Photo */}
                <div className="mt-4 pt-4 border-t border-[#D4AF7A]/30 space-y-3 px-1">
                  <div>
                    <p className="font-serif-display text-2xl sm:text-[1.65rem] font-semibold text-[#FAF7F2] leading-tight">
                      {BRAND_INFO.founderName} – {BRAND_INFO.founderTitle}
                    </p>
                    <p className="text-xs text-[#E3C89E] tracking-wide mt-1">
                      Founder, {BRAND_INFO.businessName}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#D4AF7A]/20 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <OriginalBrandLogo sizeClass="w-11 h-11 rounded-md" />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-[#FAF7F2] truncate">
                          6+ Years • 1,000+ Glows Created
                        </p>
                        <p className="text-[11px] text-[#E3C89E]/85 truncate">
                          Hyderabad (Main) &amp; Chennai (Branch 2)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          {/* Founder Story & Philosophy Column */}
          <Reveal delay={0.1} className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F2ECE1] border border-[#5A0B1C]/20 text-xs font-semibold text-[#4F101E]">
              <Sparkles className="w-3.5 h-3.5 text-[#5F1123]" />
              <span>
                {BRAND_INFO.founderName} – {BRAND_INFO.founderTitle}
              </span>
            </div>

            <h3 className="font-serif-display text-2xl sm:text-3xl lg:text-[2.15rem] font-semibold text-[#390E15] leading-snug">
              Personalised Beauty Care Rooted in South Indian Tradition &amp; Modern
              Aesthetic Science
            </h3>

            <div className="space-y-4 text-sm sm:text-base text-[#5C524E] leading-relaxed">
              <p>
                Over <strong className="text-[#1D1716]">6+ years</strong> and more
                than <strong className="text-[#1D1716]">1,000+ glows created</strong>,{' '}
                <strong className="text-[#1D1716]">{BRAND_INFO.founderName}</strong>{' '}
                built{' '}
                <strong className="text-[#1D1716]">{BRAND_INFO.businessName}</strong>{' '}
                as an intimate, heart-led craft studio rather than a rushed chain.
                With our{' '}
                <strong className="text-[#1D1716]">
                  Hyderabad – Main Branch, Telangana
                </strong>{' '}
                and{' '}
                <strong className="text-[#1D1716]">
                  Chennai – Branch 2, Tamil Nadu
                </strong>
                , every guest receives unhurried, one-on-one attention.
              </p>
              <p>
                Whether preparing a South Indian bride in heirloom Kanjeevaram silk,
                delivering restorative scalp and skin care across separate Women’s and
                Men’s service protocols, or mentoring aspiring beauty professionals in
                our training institute, every appointment begins with careful
                observation of your natural skin and scalp health.
              </p>
            </div>

            {/* Required Signature Philosophy Blockquote */}
            <blockquote className="relative p-6 sm:p-7 rounded-2xl bg-[#4F101E] text-[#FAF7F2] border border-[#D4AF7A]/40 shadow-md">
              <Quote
                aria-hidden="true"
                className="w-8 h-8 text-[#D4AF7A]/45 mb-3"
              />
              <p className="font-serif-display italic text-xl sm:text-2xl leading-relaxed text-[#FAF7F2]">
                “True aesthetic care isn’t hiding behind a heavy filter – it’s
                building skin and scalp health so you love your reflection in broad
                daylight.”
              </p>
              <footer className="mt-4 pt-3 border-t border-[#D4AF7A]/25 flex flex-wrap items-center justify-between gap-2 text-xs text-[#E3C89E]">
                <span className="font-semibold uppercase tracking-[0.12em]">
                  — {BRAND_INFO.founderName}
                </span>
                <span>{BRAND_INFO.founderTitle}</span>
              </footer>
            </blockquote>

            {/* Key Care Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              <div className="p-4 rounded-xl bg-[#FFFEFC] border border-[#E4DCD0]">
                <ShieldCheck className="w-5 h-5 text-[#5F1123] mb-2" />
                <p className="text-sm font-semibold text-[#1D1716]">
                  Skin &amp; Scalp First
                </p>
                <p className="text-xs text-[#5C524E] mt-1 leading-relaxed">
                  Thoughtful consultation and sensitivity checks before every protocol.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#FFFEFC] border border-[#E4DCD0]">
                <HeartHandshake className="w-5 h-5 text-[#5F1123] mb-2" />
                <p className="text-sm font-semibold text-[#1D1716]">
                  Unhurried 1-on-1 Care
                </p>
                <p className="text-xs text-[#5C524E] mt-1 leading-relaxed">
                  Tailored sessions across dedicated Women’s and Men’s care menus.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#FFFEFC] border border-[#E4DCD0]">
                <CheckCircle2 className="w-5 h-5 text-[#5F1123] mb-2" />
                <p className="text-sm font-semibold text-[#1D1716]">
                  Heritage &amp; Clinical Craft
                </p>
                <p className="text-xs text-[#5C524E] mt-1 leading-relaxed">
                  South Indian grace harmonised with modern cosmetology discipline.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('booking')}
                className="btn-royal-sheen min-h-[46px] px-6 py-3 rounded-full bg-[#4F101E] text-[#FAF7F2] hover:bg-[#5F1123] text-xs font-semibold uppercase tracking-[0.08em] transition-colors cursor-pointer"
              >
                Book a Personal Consultation
              </button>
              <button
                type="button"
                onClick={() => onNavigate('standards')}
                className="min-h-[46px] px-5 py-3 rounded-full bg-[#F2ECE1] text-[#4F101E] hover:bg-[#E4DCD0] text-xs font-semibold uppercase tracking-[0.08em] transition-colors cursor-pointer"
              >
                Explore Hygiene Standards
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
