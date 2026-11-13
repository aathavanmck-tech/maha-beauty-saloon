import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, RotateCcw, Settings2, X } from 'lucide-react';
import { DEFAULT_SITE_CONFIG, SiteExternalConfig } from '../config/siteConfig';
import { BRAND_INFO } from '../data/salonData';

interface SiteConfigModalProps {
  isOpen: boolean;
  config: SiteExternalConfig;
  onSave: (next: SiteExternalConfig) => void;
  onClose: () => void;
}

const SiteConfigModalInner: React.FC<{
  config: SiteExternalConfig;
  onSave: (next: SiteExternalConfig) => void;
  onClose: () => void;
}> = ({ config, onSave, onClose }) => {
  const [draft, setDraft] = useState<SiteExternalConfig>(config);
  const [savedToast, setSavedToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      whatsappNumber: draft.whatsappNumber.trim(),
      instagramUrl: draft.instagramUrl.trim(),
      hyderabadMapUrl: draft.hyderabadMapUrl.trim(),
      chennaiMapUrl: draft.chennaiMapUrl.trim(),
      googleReviewsUrl: draft.googleReviewsUrl.trim(),
    });
    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
      onClose();
    }, 800);
  };

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="site-config-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1D1716]/75 backdrop-blur-xs"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-[#FAF7F2] text-[#1D1716] border border-[#D4AF7A]/50 shadow-2xl"
        >
          <div className="p-5 bg-[#390E15] text-[#FAF7F2] border-b border-[#D4AF7A]/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Settings2 className="w-5 h-5 text-[#E3C89E]" />
              <div>
                <h3
                  id="site-config-title"
                  className="font-serif-display text-xl font-semibold"
                >
                  Official Studio Links Configuration
                </h3>
                <p className="text-[11px] text-[#E3C89E]/85">
                  Configurable endpoints — no unverified numbers or URLs are invented
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close settings"
              className="w-9 h-9 rounded-lg bg-[#4F101E] text-[#FAF7F2] flex items-center justify-center hover:bg-[#5F1123] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
            <div>
              <label
                htmlFor="cfg-whatsapp"
                className="block text-xs font-semibold text-[#1D1716] mb-1"
              >
                Official WhatsApp Number (with country code, e.g. 91XXXXXXXXXX)
              </label>
              <input
                id="cfg-whatsapp"
                type="tel"
                value={draft.whatsappNumber}
                onChange={(e) =>
                  setDraft((p) => ({ ...p, whatsappNumber: e.target.value }))
                }
                placeholder="Leave blank until official WhatsApp number is provided"
                className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#FFFEFC] border border-[#E4DCD0] text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="cfg-google-reviews"
                className="block text-xs font-semibold text-[#1D1716] mb-1"
              >
                Official Google Reviews Link
              </label>
              <input
                id="cfg-google-reviews"
                type="url"
                value={draft.googleReviewsUrl}
                onChange={(e) =>
                  setDraft((p) => ({ ...p, googleReviewsUrl: e.target.value }))
                }
                placeholder="Official Google Business Profile / Reviews URL"
                className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#FFFEFC] border border-[#E4DCD0] text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="cfg-instagram"
                className="block text-xs font-semibold text-[#1D1716] mb-1"
              >
                Official Instagram URL ({BRAND_INFO.instagramHandle})
              </label>
              <input
                id="cfg-instagram"
                type="url"
                value={draft.instagramUrl}
                onChange={(e) =>
                  setDraft((p) => ({ ...p, instagramUrl: e.target.value }))
                }
                placeholder="https://www.instagram.com/..."
                className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#FFFEFC] border border-[#E4DCD0] text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="cfg-hyd-map"
                className="block text-xs font-semibold text-[#1D1716] mb-1"
              >
                Hyderabad Main Branch — Official Map Link
              </label>
              <input
                id="cfg-hyd-map"
                type="url"
                value={draft.hyderabadMapUrl}
                onChange={(e) =>
                  setDraft((p) => ({ ...p, hyderabadMapUrl: e.target.value }))
                }
                placeholder="Official Google Maps / Apple Maps URL"
                className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#FFFEFC] border border-[#E4DCD0] text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="cfg-che-map"
                className="block text-xs font-semibold text-[#1D1716] mb-1"
              >
                Chennai Branch 2 — Official Map Link
              </label>
              <input
                id="cfg-che-map"
                type="url"
                value={draft.chennaiMapUrl}
                onChange={(e) =>
                  setDraft((p) => ({ ...p, chennaiMapUrl: e.target.value }))
                }
                placeholder="Official Google Maps / Apple Maps URL"
                className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#FFFEFC] border border-[#E4DCD0] text-sm"
              />
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setDraft(DEFAULT_SITE_CONFIG)}
                className="min-h-[42px] px-3.5 py-2 rounded-xl border border-[#E4DCD0] text-xs font-medium text-[#5C524E] hover:text-[#1D1716] inline-flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>

              <button
                type="submit"
                className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#4F101E] text-[#FAF7F2] hover:bg-[#5F1123] text-xs font-semibold uppercase tracking-[0.08em] inline-flex items-center gap-2 cursor-pointer"
              >
                {savedToast ? (
                  <>
                    <Check className="w-4 h-4 text-[#E3C89E]" />
                    <span>Saved</span>
                  </>
                ) : (
                  <span>Save Studio Links</span>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export const SiteConfigModal: React.FC<SiteConfigModalProps> = ({
  isOpen,
  config,
  onSave,
  onClose,
}) => {
  if (!isOpen) return null;
  return (
    <SiteConfigModalInner config={config} onSave={onSave} onClose={onClose} />
  );
};
