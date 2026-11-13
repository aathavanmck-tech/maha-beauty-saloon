import React from 'react';
import { Clock, Instagram, MapPin, Settings2 } from 'lucide-react';
import { BRAND_INFO, NAV_ITEMS } from '../data/salonData';
import { OriginalBrandLogo } from './ui/MotionPrimitives';

interface FooterProps {
  instagramUrl: string;
  onNavigate: (sectionId: string) => void;
  onOpenLinkSettings: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  instagramUrl,
  onNavigate,
  onOpenLinkSettings,
}) => {
  return (
    <footer className="bg-[#2C060F] text-[#FAF7F2] pt-14 pb-24 sm:pb-16 border-t border-[#D4AF7A]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#D4AF7A]/20">
          {/* Brand & Original Uncropped Logo */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-4">
              <OriginalBrandLogo sizeClass="w-16 h-16 sm:w-20 sm:h-20 rounded-lg" />
              <div className="min-w-0">
                <p className="font-serif-display text-xl sm:text-2xl font-semibold text-[#FAF7F2] leading-snug">
                  {BRAND_INFO.businessName}
                </p>
                <p className="text-[11px] sm:text-xs text-[#E3C89E] mt-1">
                  Founder: {BRAND_INFO.founderName} ({BRAND_INFO.founderTitle})
                </p>
              </div>
            </div>

            <p className="font-serif-display italic text-lg text-[#E3C89E]">
              “{BRAND_INFO.tagline}”
            </p>

            <p className="text-xs text-[#FAF7F2]/75 leading-relaxed max-w-md">
              6+ years of certified cosmetology &amp; aesthetic artistry with
              1,000+ glows created across dedicated Women’s Services, Men’s
              Services, South Indian bridal makeup, and beauty training courses.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-4">
            <p className="text-xs uppercase tracking-[0.16em] text-[#E3C89E] font-semibold mb-4">
              Explore Studio
            </p>
            <ul className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs sm:text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(item.id)}
                    className="text-[#FAF7F2]/82 hover:text-[#E3C89E] transition-colors text-left cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Branches & Hours */}
          <div className="lg:col-span-3 space-y-3 text-xs sm:text-sm">
            <p className="text-xs uppercase tracking-[0.16em] text-[#E3C89E] font-semibold mb-4">
              Branches &amp; Hours
            </p>
            <div className="flex items-start gap-2.5 text-[#FAF7F2]/85">
              <MapPin className="w-4 h-4 text-[#E3C89E] shrink-0 mt-0.5" />
              <span>Hyderabad – Main Branch, Telangana</span>
            </div>
            <div className="flex items-start gap-2.5 text-[#FAF7F2]/85">
              <MapPin className="w-4 h-4 text-[#E3C89E] shrink-0 mt-0.5" />
              <span>Chennai – Branch 2, Tamil Nadu</span>
            </div>
            <div className="flex items-start gap-2.5 text-[#FAF7F2]/85">
              <Clock className="w-4 h-4 text-[#E3C89E] shrink-0 mt-0.5" />
              <span>Daily operating hours: 10 AM–8 PM</span>
            </div>
            <div className="pt-1 flex items-center gap-2 text-[#E3C89E]">
              <Instagram className="w-4 h-4 shrink-0" />
              {instagramUrl ? (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline break-all"
                >
                  {BRAND_INFO.instagramHandle}
                </a>
              ) : (
                <span className="break-all">{BRAND_INFO.instagramHandle}</span>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Configurable Link Settings */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#FAF7F2]/65">
          <p>
            © {new Date().getFullYear()} {BRAND_INFO.businessName}. All rights
            reserved.
          </p>
          <button
            type="button"
            onClick={onOpenLinkSettings}
            className="inline-flex items-center gap-1.5 text-[#E3C89E]/85 hover:text-[#E3C89E] transition-colors cursor-pointer"
          >
            <Settings2 className="w-3.5 h-3.5" />
            <span>Studio Link Settings</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
