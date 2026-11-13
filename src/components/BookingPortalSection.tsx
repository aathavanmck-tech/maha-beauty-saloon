import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Info,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
  User,
} from 'lucide-react';
import {
  APPOINTMENT_TIME_SLOTS,
  BRANCH_OPTIONS,
  BRAND_INFO,
  BranchId,
  MENS_SERVICES,
  ServiceCategory,
  WOMENS_SERVICES,
} from '../data/salonData';
import { ChampagneDivider, Reveal } from './ui/MotionPrimitives';

export interface WhatsAppHandoffPayload {
  heading: string;
  subtitle: string;
  message: string;
  summaryRows: Array<{ label: string; value: string }>;
}

interface BookingPortalSectionProps {
  selectedCategory: ServiceCategory;
  selectedServiceId: string;
  selectedBranch: BranchId;
  onCategoryChange: (cat: ServiceCategory) => void;
  onServiceChange: (serviceId: string) => void;
  onBranchChange: (branch: BranchId) => void;
  onOpenWhatsAppHandoff: (payload: WhatsAppHandoffPayload) => void;
}

function getTodayLocalISO(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatReadableDate(isoDate: string): string {
  if (!isoDate) return 'Not selected yet';
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

export const BookingPortalSection: React.FC<BookingPortalSectionProps> = ({
  selectedCategory,
  selectedServiceId,
  selectedBranch,
  onCategoryChange,
  onServiceChange,
  onBranchChange,
  onOpenWhatsAppHandoff,
}) => {
  const minDate = useMemo(() => getTodayLocalISO(), []);

  const [customerName, setCustomerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [preferredDate, setPreferredDate] = useState(minDate);
  const [preferredTime, setPreferredTime] = useState<string>('11:00 AM');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const activeServices =
    selectedCategory === 'women' ? WOMENS_SERVICES : MENS_SERVICES;

  // Keep selectedServiceId strictly synchronized with active category
  useEffect(() => {
    const existsInTab = activeServices.some((s) => s.id === selectedServiceId);
    if (!existsInTab && activeServices.length > 0) {
      onServiceChange(activeServices[0].id);
    }
  }, [selectedCategory, selectedServiceId, activeServices, onServiceChange]);

  const currentService =
    activeServices.find((s) => s.id === selectedServiceId) || activeServices[0];

  const currentBranch =
    BRANCH_OPTIONS.find((b) => b.id === selectedBranch) || BRANCH_OPTIONS[0];

  const categoryLabel =
    selectedCategory === 'women' ? 'Women’s Services' : 'Men’s Services';

  const validateForm = (): boolean => {
    const nextErrors: Record<string, string> = {};
    const trimmedName = customerName.trim();
    const digits = mobileNumber.replace(/[^\d]/g, '');

    if (trimmedName.length < 2) {
      nextErrors.customerName = 'Please enter your full name (minimum 2 characters).';
    }

    if (digits.length < 10 || digits.length > 15) {
      nextErrors.mobileNumber = 'Please enter a valid 10-digit mobile number.';
    }

    if (!preferredDate) {
      nextErrors.preferredDate = 'Please choose your preferred appointment date.';
    } else if (preferredDate < minDate) {
      nextErrors.preferredDate = 'Preferred date cannot be in the past.';
    }

    if (!preferredTime) {
      nextErrors.preferredTime = 'Please select a preferred time between 10 AM and 8 PM.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const priceLine =
      currentService.confirmedPrice !== null
        ? `Service Tariff: ${currentService.summaryPriceNote}`
        : 'Service Tariff: Price on Enquiry';

    const messageLines = [
      `Hello ${BRAND_INFO.businessName},`,
      `I would like to request an appointment / service enquiry:`,
      ``,
      `• Customer Name: ${customerName.trim()}`,
      `• Mobile Number: ${mobileNumber.trim()}`,
      `• Category: ${categoryLabel}`,
      `• Selected Service: ${currentService.name}`,
      `• ${priceLine}`,
      `• Branch: ${currentBranch.displayTitle}`,
      `• Preferred Date: ${formatReadableDate(preferredDate)} (${preferredDate})`,
      `• Preferred Time: ${preferredTime}`,
      ...(notes.trim() ? [`• Consultation Note: ${notes.trim()}`] : []),
      ``,
      `Please verify slot availability and reply to confirm during working hours (${BRAND_INFO.workingHours}).`,
    ];

    onOpenWhatsAppHandoff({
      heading: 'WhatsApp Appointment Enquiry Ready',
      subtitle:
        'Review your summary below and continue to WhatsApp. Appointments are confirmed only after the salon verifies slot availability.',
      message: messageLines.join('\n'),
      summaryRows: [
        { label: 'Customer', value: `${customerName.trim()} (${mobileNumber.trim()})` },
        { label: 'Category', value: categoryLabel },
        { label: 'Service', value: currentService.name },
        {
          label: 'Tariff',
          value:
            currentService.confirmedPrice !== null
              ? currentService.summaryPriceNote
              : 'Price on Enquiry',
        },
        { label: 'Branch', value: currentBranch.displayTitle },
        {
          label: 'Preferred Slot',
          value: `${formatReadableDate(preferredDate)} at ${preferredTime}`,
        },
        ...(notes.trim() ? [{ label: 'Consultation Note', value: notes.trim() }] : []),
      ],
    });
  };

  return (
    <section
      id="booking"
      className="py-16 sm:py-24 bg-[#FAF7F2] text-[#1D1716] border-b border-[#E4DCD0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#4F101E] text-[#FAF7F2] text-[11px] uppercase tracking-[0.16em] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#E3C89E]" />
            <span>Online Booking Portal</span>
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#390E15] leading-tight">
            Reserve Your Studio Appointment
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5C524E] leading-relaxed">
            Choose Women’s Services or Men’s Services, select your preferred
            Hyderabad or Chennai branch, and continue via WhatsApp for direct slot
            scheduling ({BRAND_INFO.workingHours}).
          </p>
          <ChampagneDivider className="mt-5" />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left 7 Columns: Category Tabs, Service Selection & Client Details Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="lg:col-span-7 bg-[#FFFEFC] rounded-2xl border border-[#E4DCD0] p-5 sm:p-8 shadow-[0_14px_38px_rgba(57,14,21,0.06)] space-y-8"
          >
            {/* Step 1: Separate Women's & Men's Service Tabs */}
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#5F1123]">
                  Step 1 • Choose Service Category
                </span>
                <span className="text-xs text-[#5C524E]">Separate Menus</span>
              </div>

              <div
                role="tablist"
                aria-label="Service Category Tabs"
                className="grid grid-cols-2 gap-2 p-1.5 rounded-xl bg-[#F2ECE1] border border-[#E4DCD0]"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === 'women'}
                  onClick={() => onCategoryChange('women')}
                  className={`min-h-[46px] px-3 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    selectedCategory === 'women'
                      ? 'bg-[#4F101E] text-[#FAF7F2] shadow-sm'
                      : 'text-[#1D1716]/80 hover:text-[#4F101E]'
                  }`}
                >
                  Women’s Services
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === 'men'}
                  onClick={() => onCategoryChange('men')}
                  className={`min-h-[46px] px-3 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    selectedCategory === 'men'
                      ? 'bg-[#4F101E] text-[#FAF7F2] shadow-sm'
                      : 'text-[#1D1716]/80 hover:text-[#4F101E]'
                  }`}
                >
                  Men’s Services
                </button>
              </div>
            </div>

            {/* Step 2: Relevant Services for Active Tab Only */}
            <div className="space-y-3" role="tabpanel">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#5F1123]">
                  Step 2 • Select {categoryLabel}
                </span>
                <span className="text-xs text-[#5C524E]">
                  {activeServices.length} Services Available
                </span>
              </div>

              <div className="space-y-2.5">
                {activeServices.map((service) => {
                  const isSelected = currentService.id === service.id;
                  const hasConfirmedPrice = service.confirmedPrice !== null;

                  return (
                    <label
                      key={service.id}
                      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#FAF7F2] border-[#4F101E] ring-1 ring-[#4F101E]'
                          : 'bg-[#FFFEFC] border-[#E4DCD0] hover:border-[#5F1123]/45'
                      }`}
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <input
                          type="radio"
                          name="booking-service"
                          value={service.id}
                          checked={isSelected}
                          onChange={() => onServiceChange(service.id)}
                          className="mt-1 w-4 h-4 accent-[#4F101E] shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="block font-serif-display text-lg sm:text-xl font-semibold text-[#390E15] leading-snug">
                            {service.name}
                          </span>
                          <span className="block text-xs text-[#5C524E] mt-0.5">
                            {service.inclusionNote
                              ? `${service.availabilityTag} • ${service.inclusionNote}`
                              : service.availabilityTag}
                          </span>
                        </div>
                      </div>

                      <div className="pl-7 sm:pl-0 sm:text-right shrink-0">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                            hasConfirmedPrice
                              ? 'bg-[#4F101E] text-[#FAF7F2]'
                              : 'bg-[#F2ECE1] text-[#4F101E] border border-[#5A0B1C]/15'
                          }`}
                        >
                          {service.priceDisplay}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Branch & Appointment Details */}
            <div className="space-y-5 pt-2 border-t border-[#E4DCD0]">
              <span className="block text-xs font-bold uppercase tracking-[0.15em] text-[#5F1123]">
                Step 3 • Guest &amp; Appointment Details
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Customer Name */}
                <div>
                  <label
                    htmlFor="booking-name"
                    className="block text-xs font-semibold text-[#1D1716] mb-1.5"
                  >
                    Customer Name <span className="text-[#5F1123]">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#5C524E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="booking-name"
                      type="text"
                      autoComplete="name"
                      value={customerName}
                      onChange={(e) => {
                        setCustomerName(e.target.value);
                        if (errors.customerName) {
                          setErrors((prev) => ({ ...prev, customerName: '' }));
                        }
                      }}
                      placeholder="Enter your full name"
                      className="w-full min-h-[46px] pl-10 pr-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E4DCD0] text-sm text-[#1D1716] placeholder:text-[#5C524E]/60"
                    />
                  </div>
                  {errors.customerName && (
                    <p className="mt-1 text-xs text-[#9F1239] flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.customerName}</span>
                    </p>
                  )}
                </div>

                {/* Mobile Number */}
                <div>
                  <label
                    htmlFor="booking-mobile"
                    className="block text-xs font-semibold text-[#1D1716] mb-1.5"
                  >
                    Mobile Number <span className="text-[#5F1123]">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#5C524E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="booking-mobile"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={mobileNumber}
                      onChange={(e) => {
                        setMobileNumber(e.target.value);
                        if (errors.mobileNumber) {
                          setErrors((prev) => ({ ...prev, mobileNumber: '' }));
                        }
                      }}
                      placeholder="10-digit mobile number"
                      className="w-full min-h-[46px] pl-10 pr-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E4DCD0] text-sm text-[#1D1716] placeholder:text-[#5C524E]/60"
                    />
                  </div>
                  {errors.mobileNumber && (
                    <p className="mt-1 text-xs text-[#9F1239] flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.mobileNumber}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Branch Selection */}
              <div>
                <label
                  htmlFor="booking-branch"
                  className="block text-xs font-semibold text-[#1D1716] mb-1.5"
                >
                  Select Studio Branch <span className="text-[#5F1123]">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {BRANCH_OPTIONS.map((branch) => {
                    const active = selectedBranch === branch.id;
                    return (
                      <button
                        key={branch.id}
                        type="button"
                        onClick={() => onBranchChange(branch.id)}
                        className={`min-h-[54px] p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                          active
                            ? 'bg-[#4F101E] text-[#FAF7F2] border-[#4F101E]'
                            : 'bg-[#FAF7F2] text-[#1D1716] border-[#E4DCD0] hover:border-[#5F1123]/45'
                        }`}
                      >
                        <MapPin
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            active ? 'text-[#E3C89E]' : 'text-[#5F1123]'
                          }`}
                        />
                        <div className="min-w-0">
                          <span className="block text-xs sm:text-sm font-semibold">
                            {branch.bookingLabel}
                          </span>
                          <span
                            className={`block text-[11px] mt-0.5 ${
                              active ? 'text-[#E3C89E]/90' : 'text-[#5C524E]'
                            }`}
                          >
                            {branch.cityState}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Preferred Date & Preferred Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="booking-date"
                    className="block text-xs font-semibold text-[#1D1716] mb-1.5"
                  >
                    Preferred Date <span className="text-[#5F1123]">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-[#5C524E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="booking-date"
                      type="date"
                      min={minDate}
                      value={preferredDate}
                      onChange={(e) => {
                        setPreferredDate(e.target.value);
                        if (errors.preferredDate) {
                          setErrors((prev) => ({ ...prev, preferredDate: '' }));
                        }
                      }}
                      className="w-full min-h-[46px] pl-10 pr-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E4DCD0] text-sm text-[#1D1716]"
                    />
                  </div>
                  {errors.preferredDate && (
                    <p className="mt-1 text-xs text-[#9F1239] flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.preferredDate}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="booking-time"
                    className="block text-xs font-semibold text-[#1D1716] mb-1.5"
                  >
                    Preferred Time (10 AM–8 PM) <span className="text-[#5F1123]">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-[#5C524E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      id="booking-time"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full min-h-[46px] pl-10 pr-8 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E4DCD0] text-sm text-[#1D1716]"
                    >
                      {APPOINTMENT_TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Optional Skin/Scalp Preference Note */}
              <div>
                <label
                  htmlFor="booking-notes"
                  className="block text-xs font-semibold text-[#1D1716] mb-1.5"
                >
                  Consultation Note <span className="text-[#5C524E] font-normal">(Optional)</span>
                </label>
                <textarea
                  id="booking-notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Share any skin sensitivity, scalp concern, or occasion detail..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E4DCD0] text-sm text-[#1D1716] placeholder:text-[#5C524E]/60 resize-y"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-royal-sheen w-full min-h-[52px] px-6 py-3.5 rounded-xl bg-[#4F101E] text-[#FAF7F2] hover:bg-[#5F1123] font-semibold text-xs sm:text-sm uppercase tracking-[0.08em] inline-flex items-center justify-center gap-2.5 shadow-md transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#E3C89E] shrink-0" />
              <span>Continue to WhatsApp Booking / Enquiry</span>
            </button>
          </form>

          {/* Right 5 Columns: Live Clear Booking Summary Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="rounded-2xl bg-[#390E15] text-[#FAF7F2] border border-[#D4AF7A]/40 p-6 sm:p-7 shadow-[0_20px_48px_rgba(44,6,15,0.22)] space-y-6">
              <div className="pb-4 border-b border-[#D4AF7A]/25">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#E3C89E] font-semibold">
                  Live Appointment Summary
                </p>
                <h3 className="font-serif-display text-2xl sm:text-3xl font-semibold mt-1">
                  {BRAND_INFO.businessName}
                </h3>
              </div>

              <dl className="space-y-3.5 text-sm">
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-[#FAF7F2]/70 shrink-0">Category</dt>
                  <dd className="font-semibold text-right text-[#E3C89E]">
                    {categoryLabel}
                  </dd>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <dt className="text-[#FAF7F2]/70 shrink-0">Selected Service</dt>
                  <dd className="font-semibold text-right text-[#FAF7F2]">
                    {currentService.name}
                    {currentService.inclusionNote && (
                      <span className="block text-xs font-normal text-[#E3C89E] mt-0.5">
                        {currentService.inclusionNote}
                      </span>
                    )}
                  </dd>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <dt className="text-[#FAF7F2]/70 shrink-0">Branch</dt>
                  <dd className="font-medium text-right text-[#FAF7F2]">
                    {currentBranch.displayTitle}
                  </dd>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <dt className="text-[#FAF7F2]/70 shrink-0">Preferred Date</dt>
                  <dd className="font-medium text-right text-[#FAF7F2]">
                    {formatReadableDate(preferredDate)}
                  </dd>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <dt className="text-[#FAF7F2]/70 shrink-0">Preferred Time</dt>
                  <dd className="font-medium text-right text-[#FAF7F2]">
                    {preferredTime}
                  </dd>
                </div>

                {customerName.trim() && (
                  <div className="flex items-start justify-between gap-4">
                    <dt className="text-[#FAF7F2]/70 shrink-0">Guest</dt>
                    <dd className="font-medium text-right text-[#FAF7F2] break-words">
                      {customerName.trim()}
                      {mobileNumber.trim() ? ` • ${mobileNumber.trim()}` : ''}
                    </dd>
                  </div>
                )}

                {notes.trim() && (
                  <div className="flex items-start justify-between gap-4">
                    <dt className="text-[#FAF7F2]/70 shrink-0">Note</dt>
                    <dd className="text-xs text-right text-[#FAF7F2]/90 break-words max-w-[220px]">
                      {notes.trim()}
                    </dd>
                  </div>
                )}
              </dl>

              {/* Pricing Summary Box — Strictly Accurate, Never Inventing Totals */}
              <div className="p-4 rounded-xl bg-[#4F101E] border border-[#D4AF7A]/35">
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#E3C89E] font-semibold">
                  Service Pricing Status
                </p>
                {currentService.confirmedPrice !== null ? (
                  <div className="mt-1.5 space-y-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-xs text-[#FAF7F2]/85">Confirmed Tariff</span>
                      <span className="font-serif-display text-3xl font-bold text-[#FAF7F2]">
                        {currentService.priceDisplay}
                      </span>
                    </div>
                    {currentService.inclusionNote && (
                      <p className="text-xs text-[#E3C89E]">
                        {currentService.inclusionNote}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="mt-1.5 space-y-1">
                    <p className="font-serif-display text-2xl font-semibold text-[#FAF7F2]">
                      Price on Enquiry
                    </p>
                    <p className="text-xs text-[#FAF7F2]/78 leading-relaxed">
                      {currentService.priceDisplay}. Exact tariff is shared after
                      consultation — no estimated total is generated online.
                    </p>
                  </div>
                )}
              </div>

              {/* Transparent WhatsApp Handoff Notice */}
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#2C060F]/80 border border-[#D4AF7A]/20 text-xs text-[#FAF7F2]/80 leading-relaxed">
                <Info className="w-4 h-4 text-[#E3C89E] shrink-0 mt-0.5" />
                <p>
                  Appointments are confirmed only after the salon verifies slot
                  availability during working hours ({BRAND_INFO.workingHours}).
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#E3C89E]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Complimentary consultation &amp; disposable hygiene kit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
