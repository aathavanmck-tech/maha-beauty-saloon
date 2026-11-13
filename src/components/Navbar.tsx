import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Menu, X } from 'lucide-react';
import { BRAND_INFO, NAV_ITEMS } from '../data/salonData';
import { OriginalBrandLogo } from './ui/MotionPrimitives';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleItemClick = (id: string) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#390E15]/96 backdrop-blur-md shadow-[0_10px_30px_rgba(44,6,15,0.28)] border-b border-[#D4AF7A]/25'
            : 'bg-[#4F101E] border-b border-[#D4AF7A]/20'
        }`}
      >
        {/* Top Info Strip */}
        <div className="hidden md:block bg-[#2C060F] text-[#FAF7F2]/85 border-b border-[#D4AF7A]/15 text-[11px] tracking-[0.12em] uppercase">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <span className="inline-flex items-center gap-1.5 truncate">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF7A] shrink-0" />
                <span>Hyderabad – Main Branch, Telangana</span>
              </span>
              <span className="text-[#D4AF7A]/50">•</span>
              <span className="truncate">Chennai – Branch 2, Tamil Nadu</span>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#D4AF7A]" />
                <span>{BRAND_INFO.workingHours}</span>
              </span>
              <span className="text-[#D4AF7A]/50">•</span>
              <span className="text-[#E3C89E] font-medium normal-case tracking-wide">
                {BRAND_INFO.instagramHandle}
              </span>
            </div>
          </div>
        </div>

        {/* Main Navigation Row — Single Brand Title Only */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between min-h-[72px] sm:min-h-[80px] py-2 gap-2.5 sm:gap-4">
            {/* Original Uploaded Logo + Single Business Name Only */}
            <button
              type="button"
              onClick={() => handleItemClick('home')}
              className="flex items-center gap-2.5 sm:gap-3.5 text-left min-w-0 flex-1 xl:flex-initial group py-1 cursor-pointer"
              aria-label="Maha Beauty Saloon and Training Institute Home"
            >
              <OriginalBrandLogo
                sizeClass="w-11 h-11 sm:w-13 sm:h-13 rounded-md"
                priority
              />
              <span className="font-serif-display text-[15px] min-[375px]:text-[16.5px] sm:text-xl lg:text-[21px] xl:max-w-[250px] 2xl:max-w-none font-semibold leading-[1.2] text-[#FAF7F2] group-hover:text-[#E3C89E] transition-colors break-words">
                {BRAND_INFO.businessName}
              </span>
            </button>

            {/* Desktop Full 10-Item Navigation */}
            <nav
              aria-label="Primary Navigation"
              className="hidden xl:flex items-center gap-0.5 2xl:gap-1 shrink-0"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                if ('isPrimaryCta' in item && item.isPrimaryCta) {
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleItemClick(item.id)}
                      className="ml-1.5 inline-flex items-center gap-1.5 px-3.5 2xl:px-4 py-2.5 rounded-full bg-[#FAF7F2] text-[#4F101E] hover:bg-[#E3C89E] hover:text-[#2C060F] text-[11.5px] font-semibold tracking-[0.05em] uppercase transition-all shadow-sm cursor-pointer whitespace-nowrap"
                    >
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  );
                }

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleItemClick(item.id)}
                    className={`relative px-2 2xl:px-2.5 py-2 text-[12px] 2xl:text-[12.5px] font-medium transition-colors rounded-md cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'text-[#E3C89E]'
                        : 'text-[#FAF7F2]/88 hover:text-[#FAF7F2]'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute left-2 right-2 -bottom-0.5 h-[1.5px] bg-[#D4AF7A]"
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Mobile & Tablet Actions */}
            <div className="flex xl:hidden items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleItemClick('booking')}
                aria-label="Book Appointment"
                className="inline-flex items-center justify-center gap-1.5 px-2.5 min-[390px]:px-3.5 sm:px-4 py-2 min-h-[42px] rounded-full bg-[#FAF7F2] text-[#4F101E] text-[11px] sm:text-xs font-semibold tracking-wide shadow-sm active:scale-[0.98] transition-transform cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden min-[390px]:inline">Book</span>
                <span className="hidden sm:inline">Appointment</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation-drawer"
                aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
                className="inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#D4AF7A]/35 text-[#FAF7F2] hover:bg-[#5F1123] transition-colors cursor-pointer"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Responsive Mobile & Tablet Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div
            id="mobile-navigation-drawer"
            className="fixed inset-0 z-50 xl:hidden flex justify-end"
            role="dialog"
            aria-modal="true"
            aria-label="Site Navigation Menu"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-[#1D1716]/65 backdrop-blur-xs"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full max-w-sm bg-[#390E15] text-[#FAF7F2] h-full overflow-y-auto border-l border-[#D4AF7A]/30 flex flex-col justify-between pb-safe-drawer"
            >
              <div>
                {/* Drawer Header — Single Business Name Only */}
                <div className="flex items-center justify-between gap-3 p-4 sm:p-5 border-b border-[#D4AF7A]/20">
                  <div className="flex items-center gap-3 min-w-0">
                    <OriginalBrandLogo sizeClass="w-11 h-11 rounded-md" />
                    <p className="font-serif-display text-base sm:text-lg font-semibold leading-snug text-[#FAF7F2] break-words">
                      {BRAND_INFO.businessName}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close menu"
                    className="w-11 h-11 shrink-0 inline-flex items-center justify-center rounded-lg border border-[#D4AF7A]/30 text-[#FAF7F2] hover:bg-[#4F101E] cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* All 10 Navigation Links */}
                <nav aria-label="Mobile Navigation" className="p-4 sm:p-5 space-y-1">
                  {NAV_ITEMS.map((item, idx) => {
                    const isActive = activeSection === item.id;
                    const isCta = 'isPrimaryCta' in item && item.isPrimaryCta;

                    if (isCta) {
                      return (
                        <div key={item.id} className="pt-3">
                          <button
                            type="button"
                            onClick={() => handleItemClick(item.id)}
                            className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 rounded-xl bg-[#FAF7F2] text-[#4F101E] font-semibold text-sm tracking-wide uppercase shadow-md hover:bg-[#E3C89E] transition-colors cursor-pointer"
                          >
                            <Calendar className="w-4 h-4" />
                            <span>{item.label}</span>
                          </button>
                        </div>
                      );
                    }

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleItemClick(item.id)}
                        className={`w-full min-h-[46px] px-3.5 py-2.5 rounded-lg flex items-center justify-between text-left transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-[#5F1123] text-[#E3C89E] border border-[#D4AF7A]/30'
                            : 'text-[#FAF7F2]/90 hover:bg-[#4F101E]'
                        }`}
                      >
                        <span className="text-sm font-medium">{item.label}</span>
                        <span className="text-[11px] font-serif-display italic text-[#D4AF7A]/75">
                          0{idx + 1}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer Studio Summary */}
              <div className="p-4 sm:p-5 mx-4 mb-2 rounded-xl bg-[#2C060F]/80 border border-[#D4AF7A]/20 space-y-2 text-xs text-[#FAF7F2]/80">
                <p className="text-[#E3C89E] uppercase tracking-[0.14em] text-[10px] font-semibold">
                  Studio Branches
                </p>
                <p>Hyderabad – Main Branch, Telangana</p>
                <p>Chennai – Branch 2, Tamil Nadu</p>
                <p className="pt-1 text-[#FAF7F2] font-medium">
                  Daily operating hours: 10 AM–8 PM
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
