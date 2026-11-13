import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Award,
  Check,
  Clock,
  GraduationCap,
  MapPin,
  MessageCircle,
  Phone,
  User,
} from 'lucide-react';
import {
  ACADEMY_COURSES,
  AcademyCourseItem,
  BRANCH_OPTIONS,
  BRAND_INFO,
  BranchId,
} from '../data/salonData';
import { ChampagneDivider, Reveal, TiltCard } from './ui/MotionPrimitives';
import { WhatsAppHandoffPayload } from './BookingPortalSection';

interface AcademySectionProps {
  onOpenWhatsAppHandoff: (payload: WhatsAppHandoffPayload) => void;
}

export const AcademySection: React.FC<AcademySectionProps> = ({
  onOpenWhatsAppHandoff,
}) => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    ACADEMY_COURSES[1].id
  );
  const [studentName, setStudentName] = useState('');
  const [studentMobile, setStudentMobile] = useState('');
  const [preferredBranch, setPreferredBranch] = useState<BranchId>('hyderabad');
  const [studentMessage, setStudentMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedCourse: AcademyCourseItem =
    ACADEMY_COURSES.find((c) => c.id === selectedCourseId) || ACADEMY_COURSES[0];

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    const formEl = document.getElementById('academy-enquiry-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleCourseEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};
    const cleanDigits = studentMobile.replace(/[^\d]/g, '');

    if (studentName.trim().length < 2) {
      nextErrors.studentName = 'Please enter your full name.';
    }
    if (cleanDigits.length < 10 || cleanDigits.length > 15) {
      nextErrors.studentMobile = 'Please enter a valid 10-digit mobile number.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const branchObj =
      BRANCH_OPTIONS.find((b) => b.id === preferredBranch) || BRANCH_OPTIONS[0];

    const message = [
      `Hello ${BRAND_INFO.businessName},`,
      `I would like to enquire about Beauty Training Academy admissions:`,
      ``,
      `• Student Name: ${studentName.trim()}`,
      `• Mobile Number: ${studentMobile.trim()}`,
      `• Selected Course: ${selectedCourse.name}`,
      `• Course Fee: ${selectedCourse.fee}`,
      `• Course Duration: ${selectedCourse.duration}`,
      `• Preferred Branch: ${branchObj.displayTitle}`,
      ...(studentMessage.trim()
        ? [`• Question / Note: ${studentMessage.trim()}`]
        : []),
      ``,
      `Please share batch availability and admission details.`,
    ].join('\n');

    onOpenWhatsAppHandoff({
      heading: 'Academy Course Enquiry Ready',
      subtitle:
        'Continue to WhatsApp to connect with Maha Beauty Saloon and Training Institute regarding course admissions.',
      message,
      summaryRows: [
        { label: 'Applicant', value: `${studentName.trim()} (${studentMobile.trim()})` },
        { label: 'Selected Course', value: selectedCourse.name },
        { label: 'Course Fee', value: selectedCourse.fee },
        { label: 'Course Duration', value: selectedCourse.duration },
        { label: 'Preferred Branch', value: branchObj.displayTitle },
      ],
    });
  };

  return (
    <section
      id="academy"
      className="py-16 sm:py-24 bg-[#F2ECE1] text-[#1D1716] border-b border-[#E4DCD0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Required Academy Headline */}
        <Reveal className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#4F101E] text-[#FAF7F2] text-[11px] uppercase tracking-[0.16em] font-semibold mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-[#E3C89E]" />
            <span>{BRAND_INFO.businessName}</span>
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#390E15] leading-tight">
            “Learn the Art of Beauty. Build Your Future.”
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5C524E] leading-relaxed">
            Train directly under {BRAND_INFO.founderName} ({BRAND_INFO.founderTitle})
            with disciplined hands-on practice, salon hygiene standards, and
            individual mentorship.
          </p>
          <ChampagneDivider className="mt-5" />
        </Reveal>

        {/* Three Confirmed Course Fee Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-14">
          {ACADEMY_COURSES.map((course, idx) => {
            const isHighlighted = Boolean(course.featured);
            const isSelected = selectedCourseId === course.id;

            return (
              <Reveal key={course.id} delay={idx * 0.07}>
                <TiltCard maxTilt={3} className="h-full rounded-2xl">
                  <article
                    className={`h-full rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all ${
                      isHighlighted
                        ? 'bg-[#390E15] text-[#FAF7F2] border-2 border-[#D4AF7A]/65 shadow-[0_20px_48px_rgba(57,14,21,0.22)]'
                        : 'bg-[#FFFEFC] text-[#1D1716] border border-[#E4DCD0] shadow-sm'
                    } ${isSelected ? 'ring-2 ring-[#C9A26B]' : ''}`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-[11px] uppercase tracking-[0.15em] font-semibold ${
                            isHighlighted ? 'text-[#E3C89E]' : 'text-[#5F1123]'
                          }`}
                        >
                          {course.tier}
                        </span>
                        <Award
                          className={`w-5 h-5 ${
                            isHighlighted ? 'text-[#E3C89E]' : 'text-[#5F1123]'
                          }`}
                        />
                      </div>

                      <div>
                        <h3
                          className={`font-serif-display text-2xl sm:text-3xl font-semibold ${
                            isHighlighted ? 'text-[#FAF7F2]' : 'text-[#390E15]'
                          }`}
                        >
                          {course.name}
                        </h3>
                        <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-baseline gap-2">
                            <span
                              className={`font-serif-display text-4xl font-bold ${
                                isHighlighted ? 'text-[#E3C89E]' : 'text-[#4F101E]'
                              }`}
                            >
                              {course.fee}
                            </span>
                            <span
                              className={`text-xs ${
                                isHighlighted ? 'text-[#FAF7F2]/75' : 'text-[#5C524E]'
                              }`}
                            >
                              Fee
                            </span>
                          </div>

                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                              isHighlighted
                                ? 'bg-[#4F101E] text-[#E3C89E] border border-[#D4AF7A]/35'
                                : 'bg-[#F2ECE1] text-[#4F101E] border border-[#5A0B1C]/15'
                            }`}
                          >
                            <Clock className="w-3.5 h-3.5" />
                            <span>Duration: {course.duration}</span>
                          </span>
                        </div>
                      </div>

                      <div
                        aria-hidden="true"
                        className={`h-px w-full ${
                          isHighlighted ? 'bg-[#D4AF7A]/25' : 'bg-[#E4DCD0]'
                        }`}
                      />

                      <p
                        className={`text-sm leading-relaxed ${
                          isHighlighted ? 'text-[#FAF7F2]/85' : 'text-[#5C524E]'
                        }`}
                      >
                        {course.summary}
                      </p>

                      <ul className="space-y-2.5 pt-1">
                        {course.focusPoints
                          .map((pt) => pt.trim())
                          .filter(Boolean)
                          .map((pt) => (
                            <li
                              key={pt}
                              className={`flex items-start gap-2.5 text-xs sm:text-[13px] ${
                                isHighlighted
                                  ? 'text-[#FAF7F2]/90'
                                  : 'text-[#1D1716]/85'
                              }`}
                            >
                              <Check
                                className={`w-4 h-4 shrink-0 mt-0.5 ${
                                  isHighlighted ? 'text-[#E3C89E]' : 'text-[#5F1123]'
                                }`}
                              />
                              <span>{pt}</span>
                            </li>
                          ))}
                      </ul>
                    </div>

                    <div className="pt-6 mt-6 border-t border-current/10">
                      <button
                        type="button"
                        onClick={() => handleSelectCourse(course.id)}
                        className={`w-full min-h-[46px] px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-[0.08em] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                          isHighlighted
                            ? 'bg-[#FAF7F2] text-[#4F101E] hover:bg-[#E3C89E] hover:text-[#2C060F]'
                            : 'bg-[#4F101E] text-[#FAF7F2] hover:bg-[#5F1123]'
                        }`}
                      >
                        <span>Enquire {course.name}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>

        {/* Authentic Institute Graduation Photos + Course Admission Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left 5 Cols: Authentic Uploaded Academy Photographs */}
          <Reveal className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl overflow-hidden bg-[#390E15] border border-[#D4AF7A]/40 shadow-md">
              <img
                src="/images/academy-graduates-group.jpg"
                onError={(e) => {
                  const t = e.currentTarget;
                  if (
                    t.src !==
                    'https://www.designarena.ai/u/20347e2d-74a5-4335-aec6-4343411d2eb4'
                  ) {
                    t.src =
                      'https://www.designarena.ai/u/20347e2d-74a5-4335-aec6-4343411d2eb4';
                  }
                }}
                alt="Founder Maha Lakshmi with students holding course completion certificates at Maha Beauty Saloon and Training Institute"
                loading="lazy"
                className="w-full h-auto object-contain block bg-[#2C060F]"
              />
              <div className="p-5 text-[#FAF7F2]">
                <p className="text-[11px] uppercase tracking-[0.15em] text-[#E3C89E] font-semibold">
                  Real Student Milestones
                </p>
                <p className="font-serif-display text-xl font-semibold mt-1">
                  Personal Mentorship by {BRAND_INFO.founderName}
                </p>
                <p className="text-xs text-[#FAF7F2]/80 mt-1.5 leading-relaxed">
                  Students pictured with {BRAND_INFO.founderName} upon completing
                  their training at {BRAND_INFO.businessName}. Contact us directly to
                  discuss batch timings and course suitability.
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden bg-[#FFFEFC] border border-[#E4DCD0] p-3.5 flex items-center gap-4 shadow-xs">
              <img
                src="/images/founder-academy-certificate.jpg"
                onError={(e) => {
                  const t = e.currentTarget;
                  if (
                    t.src !==
                    'https://www.designarena.ai/u/dd60a88a-07d5-4891-a572-34a74189f98b'
                  ) {
                    t.src =
                      'https://www.designarena.ai/u/dd60a88a-07d5-4891-a572-34a74189f98b';
                  }
                }}
                alt="Course completion certificate presentation at Maha Beauty Saloon and Training Institute"
                loading="lazy"
                className="w-20 h-24 rounded-xl object-cover object-top shrink-0 border border-[#5A0B1C]/20"
              />
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.14em] text-[#5F1123] font-bold">
                  Certificate Recognition
                </p>
                <p className="font-serif-display text-lg font-semibold text-[#390E15] leading-snug mt-0.5">
                  Hands-On Training &amp; Completion Recognition
                </p>
                <p className="text-xs text-[#5C524E] mt-0.5">
                  Guided personally by {BRAND_INFO.founderName} across 4, 8, and
                  16-week tracks.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right 7 Cols: Dedicated Academy Course Enquiry Form */}
          <Reveal delay={0.08} className="lg:col-span-7">
            <form
              id="academy-enquiry-form"
              onSubmit={handleCourseEnquirySubmit}
              noValidate
              className="rounded-2xl bg-[#FFFEFC] border border-[#E4DCD0] p-6 sm:p-8 shadow-sm space-y-5"
            >
              <div>
                <span className="text-xs uppercase tracking-[0.16em] text-[#5F1123] font-bold">
                  Institute Admissions Desk
                </span>
                <h3 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#390E15] mt-1">
                  Enquire About a Beauty Training Course
                </h3>
                <p className="text-xs sm:text-sm text-[#5C524E] mt-1">
                  Select a course tier below and connect with us for current batch
                  details at Hyderabad or Chennai.
                </p>
              </div>

              {/* Course Selector Pills */}
              <div>
                <label className="block text-xs font-semibold text-[#1D1716] mb-2">
                  Selected Course &amp; Fee
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {ACADEMY_COURSES.map((c) => {
                    const active = selectedCourseId === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setSelectedCourseId(c.id)}
                        className={`min-h-[50px] p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          active
                            ? 'bg-[#4F101E] text-[#FAF7F2] border-[#4F101E]'
                            : 'bg-[#FAF7F2] text-[#1D1716] border-[#E4DCD0] hover:border-[#5F1123]/45'
                        }`}
                      >
                        <span className="block text-xs font-semibold">
                          {c.name}
                        </span>
                        <span
                          className={`block text-sm font-serif-display font-bold ${
                            active ? 'text-[#E3C89E]' : 'text-[#4F101E]'
                          }`}
                        >
                          {c.fee} • {c.duration}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="academy-name"
                    className="block text-xs font-semibold text-[#1D1716] mb-1.5"
                  >
                    Your Name <span className="text-[#5F1123]">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#5C524E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="academy-name"
                      type="text"
                      value={studentName}
                      onChange={(e) => {
                        setStudentName(e.target.value);
                        if (errors.studentName) {
                          setErrors((p) => ({ ...p, studentName: '' }));
                        }
                      }}
                      placeholder="Enter prospective student name"
                      className="w-full min-h-[46px] pl-10 pr-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E4DCD0] text-sm"
                    />
                  </div>
                  {errors.studentName && (
                    <p className="mt-1 text-xs text-[#9F1239] flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.studentName}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="academy-mobile"
                    className="block text-xs font-semibold text-[#1D1716] mb-1.5"
                  >
                    Mobile Number <span className="text-[#5F1123]">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#5C524E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="academy-mobile"
                      type="tel"
                      inputMode="tel"
                      value={studentMobile}
                      onChange={(e) => {
                        setStudentMobile(e.target.value);
                        if (errors.studentMobile) {
                          setErrors((p) => ({ ...p, studentMobile: '' }));
                        }
                      }}
                      placeholder="10-digit mobile number"
                      className="w-full min-h-[46px] pl-10 pr-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E4DCD0] text-sm"
                    />
                  </div>
                  {errors.studentMobile && (
                    <p className="mt-1 text-xs text-[#9F1239] flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.studentMobile}</span>
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="academy-branch"
                  className="block text-xs font-semibold text-[#1D1716] mb-1.5"
                >
                  Preferred Training Location
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#5C524E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    id="academy-branch"
                    value={preferredBranch}
                    onChange={(e) => setPreferredBranch(e.target.value as BranchId)}
                    className="w-full min-h-[46px] pl-10 pr-8 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E4DCD0] text-sm"
                  >
                    {BRANCH_OPTIONS.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.bookingLabel} — {b.cityState}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="academy-note"
                  className="block text-xs font-semibold text-[#1D1716] mb-1.5"
                >
                  Enquiry Message <span className="text-[#5C524E] font-normal">(Optional)</span>
                </label>
                <textarea
                  id="academy-note"
                  rows={2}
                  value={studentMessage}
                  onChange={(e) => setStudentMessage(e.target.value)}
                  placeholder="Share your learning goals or preferred time to speak..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E4DCD0] text-sm resize-y"
                />
              </div>

              <button
                type="submit"
                className="btn-royal-sheen w-full min-h-[48px] px-6 py-3 rounded-xl bg-[#4F101E] text-[#FAF7F2] hover:bg-[#5F1123] text-xs sm:text-sm font-semibold uppercase tracking-[0.08em] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#E3C89E]" />
                <span>
                  Send {selectedCourse.name} ({selectedCourse.fee} •{' '}
                  {selectedCourse.duration}) Enquiry
                </span>
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
