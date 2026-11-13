import React from 'react';
import { MessageCircle } from 'lucide-react';
import { BRAND_INFO } from '../data/salonData';
import { WhatsAppHandoffPayload } from './BookingPortalSection';

interface FloatingWhatsAppButtonProps {
  onOpenQuickWhatsApp: (payload: WhatsAppHandoffPayload) => void;
}

export const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({
  onOpenQuickWhatsApp,
}) => {
  const handleClick = () => {
    const msg = [
      `Hello ${BRAND_INFO.businessName},`,
      `I would like to enquire about salon services / booking an appointment.`,
      `• Studio Locations: Hyderabad – Main Branch, Telangana / Chennai – Branch 2, Tamil Nadu`,
      `• Daily Operating Hours: 10 AM–8 PM`,
    ].join('\n');

    onOpenQuickWhatsApp({
      heading: 'Quick WhatsApp Studio Concierge',
      subtitle:
        'Start a direct WhatsApp enquiry with Maha Beauty Saloon and Training Institute, or use our Online Booking Portal on the page to include your exact service, branch, and preferred date/time.',
      message: msg,
      summaryRows: [
        { label: 'Studio', value: BRAND_INFO.businessName },
        { label: 'Branches', value: 'Hyderabad (Main) & Chennai (Branch 2)' },
        { label: 'Hours', value: 'Daily, 10 AM–8 PM' },
      ],
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="WhatsApp Enquiry Concierge"
      className="fixed z-40 safe-bottom-fab inline-flex items-center gap-2.5 pl-3.5 pr-4 py-3 min-h-[48px] rounded-full bg-[#4F101E] text-[#FAF7F2] border border-[#D4AF7A]/55 shadow-[0_12px_30px_rgba(44,6,15,0.42)] hover:bg-[#5F1123] active:scale-[0.98] transition-all cursor-pointer"
    >
      <span className="w-7 h-7 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
        <MessageCircle className="w-4 h-4 fill-current" />
      </span>
      <span className="text-xs font-semibold tracking-wide whitespace-nowrap">
        WhatsApp Enquiry
      </span>
    </button>
  );
};
