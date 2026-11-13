import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  ExternalLink,
  Instagram,
  Maximize2,
  X,
} from 'lucide-react';
import { BRAND_INFO, GALLERY_PHOTOS, GalleryPhotoItem } from '../data/salonData';
import { ChampagneDivider, Reveal } from './ui/MotionPrimitives';

interface GallerySectionProps {
  instagramUrl: string;
  onOpenLinkSettings: () => void;
}

const FILTER_TABS = [
  { id: 'all', label: 'All Works' },
  { id: 'salon', label: 'Salon Photographs' },
  { id: 'bridal', label: 'Bridal Photographs' },
  { id: 'transformations', label: 'Beauty Transformations' },
  { id: 'academy', label: 'Training & Academy' },
] as const;

type FilterId = (typeof FILTER_TABS)[number]['id'];

export const GallerySection: React.FC<GallerySectionProps> = ({
  instagramUrl,
  onOpenLinkSettings,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterId>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [copiedHandle, setCopiedHandle] = useState(false);

  const filteredPhotos: GalleryPhotoItem[] =
    activeFilter === 'all'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((item) => item.category === activeFilter);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % filteredPhotos.length
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + filteredPhotos.length) % filteredPhotos.length
        );
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex, filteredPhotos.length]);

  const handleCopyHandle = async () => {
    try {
      await navigator.clipboard.writeText(BRAND_INFO.instagramHandle);
      setCopiedHandle(true);
      setTimeout(() => setCopiedHandle(false), 2400);
    } catch {
      setCopiedHandle(true);
      setTimeout(() => setCopiedHandle(false), 2400);
    }
  };

  const currentPhoto =
    lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

  return (
    <section
      id="gallery"
      className="py-16 sm:py-24 bg-[#F2ECE1] text-[#1D1716] border-b border-[#E4DCD0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#4F101E] text-[#FAF7F2] text-[11px] uppercase tracking-[0.16em] font-semibold mb-3">
            Portfolio &amp; Social Showcase
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#390E15] leading-tight">
            Bridal, Salon &amp; Academy Gallery
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5C524E] leading-relaxed">
            Authentic bridal muhurthams, Kanjeevaram silk draping, hair artistry,
            transformations, and institute milestones created by{' '}
            {BRAND_INFO.founderName}.
          </p>
          <ChampagneDivider className="mt-5" />
        </Reveal>

        {/* Filter Tabs (Responsive wrapped pills for all phone widths) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {FILTER_TABS.map((tab) => {
            const active = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveFilter(tab.id);
                  setLightboxIndex(null);
                }}
                className={`min-h-[42px] px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  active
                    ? 'bg-[#4F101E] text-[#FAF7F2] shadow-sm'
                    : 'bg-[#FFFEFC] text-[#1D1716]/80 border border-[#E4DCD0] hover:border-[#5F1123]/40'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Responsive Masonry-Inspired Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, index) => (
              <motion.figure
                layout
                key={photo.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className="group relative rounded-2xl overflow-hidden bg-[#390E15] border border-[#E4DCD0] shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  className="w-full text-left block cursor-pointer focus:outline-none"
                  aria-label={`Open ${photo.title} in full view`}
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#2C060F]">
                    <img
                      src={photo.src}
                      onError={(e) => {
                        const t = e.currentTarget;
                        if (t.src !== photo.fallbackSrc) {
                          t.src = photo.fallbackSrc;
                        }
                      }}
                      alt={photo.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2C060F]/90 via-[#2C060F]/15 to-transparent opacity-90" />

                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-[#390E15]/90 border border-[#D4AF7A]/35 text-[10px] uppercase tracking-[0.14em] text-[#E3C89E] font-semibold">
                        {photo.categoryLabel}
                      </span>
                      <span className="w-8 h-8 rounded-full bg-[#FAF7F2]/90 text-[#4F101E] flex items-center justify-center opacity-90 group-hover:scale-105 transition-transform">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    <figcaption className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-[#FAF7F2]">
                      <p className="font-serif-display text-xl font-semibold leading-snug">
                        {photo.title}
                      </p>
                      <p className="text-xs text-[#FAF7F2]/80 mt-1 line-clamp-2">
                        {photo.caption}
                      </p>
                    </figcaption>
                  </div>
                </button>
              </motion.figure>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Instagram Social Banner — @mahasalonaesthetic (Configurable Link) */}
        <Reveal className="mt-12 sm:mt-16">
          <div className="rounded-2xl bg-[#4F101E] text-[#FAF7F2] border border-[#D4AF7A]/40 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-[#390E15] border border-[#D4AF7A]/40 flex items-center justify-center shrink-0 text-[#E3C89E]">
                <Instagram className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#E3C89E] font-semibold">
                  Follow Our Bridal &amp; Salon Transformations
                </p>
                <p className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#FAF7F2] break-all">
                  {BRAND_INFO.instagramHandle}
                </p>
                <p className="text-xs text-[#FAF7F2]/78 mt-0.5">
                  Real client reveals, Kanjeevaram bridal styling &amp; studio updates.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {instagramUrl ? (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[46px] px-5 py-2.5 rounded-full bg-[#FAF7F2] text-[#4F101E] hover:bg-[#E3C89E] text-xs font-semibold uppercase tracking-[0.08em] inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Visit {BRAND_INFO.instagramHandle}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleCopyHandle}
                    className="min-h-[46px] px-5 py-2.5 rounded-full bg-[#FAF7F2] text-[#4F101E] hover:bg-[#E3C89E] text-xs font-semibold uppercase tracking-[0.08em] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    {copiedHandle ? (
                      <>
                        <Check className="w-4 h-4 text-[#4F101E]" />
                        <span>Copied {BRAND_INFO.instagramHandle}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy {BRAND_INFO.instagramHandle}</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={onOpenLinkSettings}
                    className="min-h-[46px] px-4 py-2.5 rounded-full bg-transparent text-[#E3C89E] border border-[#D4AF7A]/40 hover:bg-[#390E15] text-xs font-medium transition-colors cursor-pointer"
                  >
                    Set Official Instagram URL
                  </button>
                </>
              )}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Accessible Lightbox Modal */}
      <AnimatePresence>
        {currentPhoto && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={currentPhoto.title}
            className="fixed inset-0 z-50 bg-[#1D1716]/92 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <div
              className="relative max-w-4xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full flex items-center justify-between gap-4 mb-3 text-[#FAF7F2]">
                <span className="text-xs uppercase tracking-[0.14em] text-[#E3C89E]">
                  {lightboxIndex + 1} / {filteredPhotos.length} •{' '}
                  {currentPhoto.categoryLabel}
                </span>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  aria-label="Close gallery preview"
                  className="w-10 h-10 rounded-full bg-[#390E15] border border-[#D4AF7A]/40 text-[#FAF7F2] flex items-center justify-center hover:bg-[#5F1123] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative w-full max-h-[72vh] rounded-2xl overflow-hidden bg-[#2C060F] border border-[#D4AF7A]/35 flex items-center justify-center">
                <img
                  src={currentPhoto.src}
                  onError={(e) => {
                    const t = e.currentTarget;
                    if (t.src !== currentPhoto.fallbackSrc) {
                      t.src = currentPhoto.fallbackSrc;
                    }
                  }}
                  alt={currentPhoto.title}
                  className="max-h-[72vh] w-auto object-contain"
                />

                {filteredPhotos.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setLightboxIndex(
                          (lightboxIndex - 1 + filteredPhotos.length) %
                            filteredPhotos.length
                        )
                      }
                      aria-label="Previous image"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#390E15]/90 border border-[#D4AF7A]/40 text-[#FAF7F2] flex items-center justify-center hover:bg-[#5F1123] cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length)
                      }
                      aria-label="Next image"
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#390E15]/90 border border-[#D4AF7A]/40 text-[#FAF7F2] flex items-center justify-center hover:bg-[#5F1123] cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              <div className="mt-3 text-center max-w-xl">
                <p className="font-serif-display text-2xl font-semibold text-[#FAF7F2]">
                  {currentPhoto.title}
                </p>
                <p className="text-xs sm:text-sm text-[#FAF7F2]/80 mt-1">
                  {currentPhoto.caption}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
