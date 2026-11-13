import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Check,
  Copy,
  ExternalLink,
  Info,
  MessageCircle,
  Settings2,
  X,
} from 'lucide-react';
import { buildWhatsAppUrl, sanitizeWhatsAppDigits } from '../config/siteConfig';
import { BRAND_INFO } from '../data/salonData';
import { WhatsAppHandoffPayload } from './BookingPortalSection';

interface WhatsAppHandoffModalProps {
  payload: WhatsAppHandoffPayload | null;
  whatsappNumber: string;
  onClose: () => void;
  onOpenLinkSettings: () => void;
}

export const WhatsAppHandoffModal: React.FC<WhatsAppHandoffModalProps> = ({
  payload,
  whatsappNumber,
  onClose,
  onOpenLinkSettings,
}) => {
  const [copied, setCopied] = useState(false);

  if (!payload) return null;

  const hasOfficialNumber = sanitizeWhatsAppDigits(whatsappNumber).length >= 8;
  const whatsappUrl = buildWhatsAppUrl(payload.message, whatsappNumber);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(payload.message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="whatsapp-handoff-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1D1716]/75 backdrop-blur-xs"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-[#FAF7F2] text-[#1D1716] border border-[#D4AF7A]/50 shadow-2xl"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 bg-[#390E15] text-[#FAF7F2] border-b border-[#D4AF7A]/30 flex items-start justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.16em] text-[#E3C89E] font-semibold">
                WhatsApp Enquiry Handoff
              </span>
              <h3
                id="whatsapp-handoff-title"
                className="font-serif-display text-2xl font-semibold mt-0.5"
              >
                {payload.heading}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="w-9 h-9 rounded-lg bg-[#4F101E] text-[#FAF7F2] flex items-center justify-center hover:bg-[#5F1123] shrink-0 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-5 sm:p-6 space-y-5">
            <p className="text-xs sm:text-sm text-[#5C524E] leading-relaxed">
              {payload.subtitle}
            </p>

            {/* Summary Table */}
            <div className="rounded-xl bg-[#FFFEFC] border border-[#E4DCD0] divide-y divide-[#E4DCD0]">
              {payload.summaryRows.map((row) => (
                <div
                  key={row.label}
                  className="px-4 py-2.5 flex items-start justify-between gap-3 text-xs sm:text-sm"
                >
                  <span className="text-[#5C524E] shrink-0">{row.label}</span>
                  <span className="font-semibold text-right text-[#1D1716] break-words">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Formatted Message Preview */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-[#1D1716]">
                  Pre-Filled WhatsApp Message
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#5F1123] hover:underline cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Message</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3.5 rounded-xl bg-[#F2ECE1] border border-[#E4DCD0] text-xs text-[#1D1716] whitespace-pre-wrap font-sans-body max-h-40 overflow-y-auto leading-relaxed">
                {payload.message}
              </pre>
            </div>

            {/* Important Non-Confirmation & Configurable Number Notice */}
            <div className="p-3.5 rounded-xl bg-[#F2ECE1]/80 border border-[#5A0B1C]/15 flex items-start gap-2.5 text-xs text-[#5C524E] leading-relaxed">
              <Info className="w-4 h-4 text-[#5F1123] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#1D1716]">
                  Enquiry Status Notice
                </p>
                <p className="mt-0.5">
                  Opening WhatsApp does not automatically confirm an appointment.
                  Your preferred slot is confirmed once {BRAND_INFO.brandName}{' '}
                  replies on WhatsApp during working hours ({BRAND_INFO.workingHours}).
                </p>
                {!hasOfficialNumber && (
                  <p className="mt-1.5 text-[11px] text-[#5F1123]">
                    Official studio WhatsApp number is currently unset (configurable).
                    Clicking below opens WhatsApp with your pre-filled enquiry text,
                    or you can{' '}
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenLinkSettings();
                      }}
                      className="underline font-semibold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Settings2 className="w-3 h-3" />
                      configure the official number here
                    </button>
                    .
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-royal-sheen flex-1 min-h-[48px] px-5 py-3 rounded-xl bg-[#4F101E] text-[#FAF7F2] hover:bg-[#5F1123] text-xs sm:text-sm font-semibold uppercase tracking-[0.08em] inline-flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#E3C89E]" />
                <span>Open WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#E3C89E]" />
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="min-h-[48px] px-5 py-3 rounded-xl bg-[#FFFEFC] text-[#4F101E] border border-[#E4DCD0] hover:bg-[#F2ECE1] text-xs font-semibold uppercase tracking-[0.08em] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Message Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
