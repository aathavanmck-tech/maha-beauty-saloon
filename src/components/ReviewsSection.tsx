import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Info,
  MessageSquarePlus,
  ShieldAlert,
  ShieldCheck,
  Star,
  Trash2,
  X,
} from 'lucide-react';
import {
  BRAND_INFO,
  REVIEW_CATEGORIES,
  ReviewCategory,
  ReviewItem,
  SAMPLE_DEMO_REVIEWS,
} from '../data/salonData';
import { ChampagneDivider, Reveal, TiltCard } from './ui/MotionPrimitives';

interface ReviewsSectionProps {
  googleReviewsUrl: string;
  onOpenLinkSettings: () => void;
}

const REVIEWS_STORAGE_KEY = 'maha_saloon_reviews_moderation_v1';

interface StoredReviewsState {
  approved: ReviewItem[];
  pending: ReviewItem[];
  showSamplePreviews: boolean;
}

function loadStoredReviews(): StoredReviewsState {
  if (typeof window === 'undefined') {
    return { approved: [], pending: [], showSamplePreviews: true };
  }
  try {
    const raw = window.localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (!raw) {
      return { approved: [], pending: [], showSamplePreviews: true };
    }
    const parsed = JSON.parse(raw) as Partial<StoredReviewsState>;
    return {
      approved: Array.isArray(parsed.approved) ? parsed.approved : [],
      pending: Array.isArray(parsed.pending) ? parsed.pending : [],
      showSamplePreviews:
        typeof parsed.showSamplePreviews === 'boolean'
          ? parsed.showSamplePreviews
          : true,
    };
  } catch {
    return { approved: [], pending: [], showSamplePreviews: true };
  }
}

function saveStoredReviews(state: StoredReviewsState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota errors
  }
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  googleReviewsUrl,
  onOpenLinkSettings,
}) => {
  const [reviewsState, setReviewsState] = useState<StoredReviewsState>(() =>
    loadStoredReviews()
  );
  const [activeCategory, setActiveCategory] = useState<'all' | ReviewCategory>(
    'all'
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  // Submit Review Modal State
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [submittedNotice, setSubmittedNotice] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewCategory, setReviewCategory] =
    useState<ReviewCategory>('Bridal Makeup');
  const [rating, setRating] = useState<number>(5);
  const [reviewText, setReviewText] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Admin Moderation Modal State
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  const updateState = (next: StoredReviewsState) => {
    setReviewsState(next);
    saveStoredReviews(next);
  };

  // Combine admin-approved customer reviews + clearly labelled sample/demo reviews (when enabled)
  const visibleReviews = useMemo(() => {
    const baseList: ReviewItem[] = [
      ...reviewsState.approved,
      ...(reviewsState.showSamplePreviews ? SAMPLE_DEMO_REVIEWS : []),
    ];
    if (activeCategory === 'all') return baseList;
    return baseList.filter((r) => r.category === activeCategory);
  }, [reviewsState.approved, reviewsState.showSamplePreviews, activeCategory]);

  const safeIndex =
    visibleReviews.length > 0 ? currentIndex % visibleReviews.length : 0;

  const handleCategorySelect = (cat: 'all' | ReviewCategory) => {
    setActiveCategory(cat);
    setCurrentIndex(0);
  };

  const handlePrev = () => {
    if (visibleReviews.length === 0) return;
    setCurrentIndex(
      (prev) => (prev - 1 + visibleReviews.length) % visibleReviews.length
    );
  };

  const handleNext = () => {
    if (visibleReviews.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % visibleReviews.length);
  };

  // Show up to 2 cards side-by-side on desktop in the carousel window
  const carouselPair = useMemo(() => {
    if (visibleReviews.length === 0) return [];
    if (visibleReviews.length === 1) return [visibleReviews[0]];
    const first = visibleReviews[safeIndex];
    const second = visibleReviews[(safeIndex + 1) % visibleReviews.length];
    return [first, second];
  }, [visibleReviews, safeIndex]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (reviewerName.trim().length < 2) {
      nextErrors.reviewerName =
        'Please enter your first name or preferred display name.';
    }
    if (reviewText.trim().length < 12) {
      nextErrors.reviewText =
        'Please share a short review (at least 12 characters).';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const formattedDate = visitDate
      ? new Date(visitDate).toLocaleDateString('en-IN', {
          month: 'short',
          year: 'numeric',
        })
      : new Date().toLocaleDateString('en-IN', {
          month: 'short',
          year: 'numeric',
        });

    const newPendingItem: ReviewItem = {
      id: `rev-${Date.now()}`,
      displayName: reviewerName.trim(),
      category: reviewCategory,
      rating,
      text: reviewText.trim(),
      dateLabel: formattedDate,
      isSampleDemo: false,
      status: 'pending',
    };

    updateState({
      ...reviewsState,
      pending: [newPendingItem, ...reviewsState.pending],
    });

    setReviewerName('');
    setReviewText('');
    setVisitDate('');
    setRating(5);
    setSubmittedNotice(true);
  };

  const handleApprovePending = (id: string) => {
    const item = reviewsState.pending.find((r) => r.id === id);
    if (!item) return;
    const approvedItem: ReviewItem = { ...item, status: 'approved' };
    updateState({
      ...reviewsState,
      pending: reviewsState.pending.filter((r) => r.id !== id),
      approved: [approvedItem, ...reviewsState.approved],
    });
    setCurrentIndex(0);
  };

  const handleDeletePending = (id: string) => {
    updateState({
      ...reviewsState,
      pending: reviewsState.pending.filter((r) => r.id !== id),
    });
  };

  const handleRemoveApproved = (id: string) => {
    updateState({
      ...reviewsState,
      approved: reviewsState.approved.filter((r) => r.id !== id),
    });
  };

  const showingAnySample = visibleReviews.some((r) => r.isSampleDemo);

  return (
    <section
      id="reviews"
      className="py-16 sm:py-24 bg-[#390E15] text-[#FAF7F2] border-b border-[#D4AF7A]/25 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Required Section Heading & Supporting Copy */}
        <Reveal className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#4F101E] border border-[#D4AF7A]/40 text-[#E3C89E] text-[11px] uppercase tracking-[0.18em] font-semibold mb-3">
            <Star className="w-3.5 h-3.5 fill-current text-[#E3C89E]" />
            <span>Client Experiences &amp; Feedback</span>
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#FAF7F2] leading-tight">
            “What Our Customers Say”
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#FAF7F2]/84 leading-relaxed">
            “Real experiences, beautiful transformations and confidence that
            speaks for itself.”
          </p>
          <ChampagneDivider light className="mt-5" />
        </Reveal>

        {/* Honest Sample/Demo Transparency Banner (When Sample Cards Are Active) */}
        {showingAnySample && (
          <Reveal>
            <div className="max-w-4xl mx-auto p-4 rounded-xl bg-[#4F101E]/90 border border-[#D4AF7A]/40 flex items-start gap-3 text-xs sm:text-[13px] text-[#FAF7F2]/88 leading-relaxed">
              <Info className="w-4 h-4 text-[#E3C89E] shrink-0 mt-0.5" />
              <p>
                <strong className="text-[#E3C89E]">
                  Transparent Sample / Demo Display:
                </strong>{' '}
                Cards marked <em>Sample / Demo Preview</em> are layout
                illustrations and are not presented as verified customer
                testimonials. Submitted client reviews appear publicly only after
                studio admin approval.
              </p>
            </div>
          </Reveal>
        )}

        {/* Six Review Categories Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => handleCategorySelect('all')}
            className={`min-h-[40px] px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#FAF7F2] text-[#4F101E] shadow-sm'
                : 'bg-[#4F101E] text-[#FAF7F2]/85 border border-[#D4AF7A]/30 hover:border-[#E3C89E]'
            }`}
          >
            All Categories
          </button>
          {REVIEW_CATEGORIES.map((category) => {
            const active = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => handleCategorySelect(category)}
                className={`min-h-[40px] px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  active
                    ? 'bg-[#FAF7F2] text-[#4F101E] shadow-sm'
                    : 'bg-[#4F101E] text-[#FAF7F2]/85 border border-[#D4AF7A]/30 hover:border-[#E3C89E]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Smooth Review Carousel */}
        {visibleReviews.length > 0 ? (
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${safeIndex}-${visibleReviews.length}`}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className={`grid grid-cols-1 ${
                  carouselPair.length > 1 ? 'lg:grid-cols-2' : 'max-w-2xl mx-auto'
                } gap-6`}
              >
                {carouselPair.map((review, idx) => (
                  <TiltCard
                    key={`${review.id}-${idx}`}
                    maxTilt={2.5}
                    className={`h-full rounded-2xl ${
                      idx === 1 ? 'hidden lg:block' : ''
                    }`}
                  >
                    <article className="h-full rounded-2xl bg-[#FAF7F2] text-[#1D1716] border border-[#D4AF7A]/55 p-6 sm:p-8 flex flex-col justify-between shadow-[0_18px_45px_rgba(0,0,0,0.28)] space-y-5">
                      <div className="space-y-4">
                        {/* Top Row: Five-Star Visuals + Category / Sample Status */}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div
                            className="flex items-center gap-1 text-[#C9A26B]"
                            aria-label={`${review.rating} out of 5 stars`}
                          >
                            {Array.from({ length: 5 }).map((_, starIdx) => (
                              <Star
                                key={starIdx}
                                className={`w-4 h-4 ${
                                  starIdx < review.rating
                                    ? 'fill-[#C9A26B] text-[#C9A26B]'
                                    : 'text-[#E4DCD0]'
                                }`}
                              />
                            ))}
                          </div>

                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="px-3 py-1 rounded-full bg-[#F2ECE1] text-[#4F101E] border border-[#5A0B1C]/15 text-[11px] font-semibold">
                              {review.category}
                            </span>
                            {review.isSampleDemo ? (
                              <span className="px-2.5 py-1 rounded-full bg-[#4F101E] text-[#E3C89E] text-[10px] font-bold uppercase tracking-[0.1em]">
                                Sample / Demo
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#4F101E]/10 text-[#4F101E] text-[10px] font-bold uppercase tracking-[0.08em]">
                                <ShieldCheck className="w-3 h-3" />
                                <span>Admin Approved</span>
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Review Text */}
                        <p className="font-serif-display text-xl sm:text-[1.35rem] leading-relaxed text-[#390E15]">
                          “{review.text}”
                        </p>
                      </div>

                      {/* Reviewer Name & Date */}
                      <div className="pt-4 border-t border-[#E4DCD0] flex items-center justify-between gap-3 text-xs">
                        <div>
                          <p className="font-semibold text-[#1D1716] text-sm">
                            {review.displayName}
                          </p>
                          <p className="text-[#5C524E] mt-0.5">
                            {review.category}
                          </p>
                        </div>
                        {review.dateLabel && (
                          <span className="text-[#5C524E] font-medium shrink-0">
                            {review.dateLabel}
                          </span>
                        )}
                      </div>
                    </article>
                  </TiltCard>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Carousel Controls & Pagination Dots */}
            {visibleReviews.length > 1 && (
              <div className="flex items-center justify-center gap-4 pt-1">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous review"
                  className="w-11 h-11 rounded-full bg-[#4F101E] border border-[#D4AF7A]/40 text-[#FAF7F2] hover:bg-[#5F1123] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2">
                  {visibleReviews.map((item, dotIdx) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setCurrentIndex(dotIdx)}
                      aria-label={`Go to review ${dotIdx + 1}`}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${
                        dotIdx === safeIndex
                          ? 'w-7 bg-[#E3C89E]'
                          : 'w-2.5 bg-[#FAF7F2]/30 hover:bg-[#FAF7F2]/55'
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next review"
                  className="w-11 h-11 rounded-full bg-[#4F101E] border border-[#D4AF7A]/40 text-[#FAF7F2] hover:bg-[#5F1123] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-xl mx-auto p-8 rounded-2xl bg-[#4F101E] border border-[#D4AF7A]/35 text-center space-y-2">
            <p className="font-serif-display text-2xl text-[#FAF7F2]">
              No approved reviews in this category yet.
            </p>
            <p className="text-xs text-[#FAF7F2]/75">
              Be the first to share your studio experience using the Submit a
              Review button below.
            </p>
          </div>
        )}

        {/* Action Row: Submit a Review + Configurable Google Reviews Link + Admin Approval */}
        <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3.5">
          <button
            type="button"
            onClick={() => {
              setSubmittedNotice(false);
              setErrors({});
              setSubmitModalOpen(true);
            }}
            className="btn-royal-sheen min-h-[48px] px-6 py-3 rounded-full bg-[#FAF7F2] text-[#4F101E] hover:bg-[#E3C89E] hover:text-[#2C060F] text-xs font-semibold uppercase tracking-[0.08em] inline-flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4 shrink-0" />
            <span>Submit a Review</span>
          </button>

          {googleReviewsUrl ? (
            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] px-6 py-3 rounded-full bg-[#4F101E] text-[#FAF7F2] border border-[#D4AF7A]/45 hover:bg-[#5F1123] text-xs font-semibold uppercase tracking-[0.08em] inline-flex items-center justify-center gap-2 transition-colors"
            >
              <span>View Google Reviews</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#E3C89E]" />
            </a>
          ) : (
            <button
              type="button"
              onClick={onOpenLinkSettings}
              className="min-h-[48px] px-5 py-3 rounded-full bg-[#4F101E] text-[#E3C89E] border border-[#D4AF7A]/40 hover:bg-[#5F1123] text-xs font-semibold uppercase tracking-[0.08em] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Configure Google Reviews Link</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setAdminModalOpen(true)}
            className="min-h-[48px] px-5 py-3 rounded-full bg-transparent text-[#FAF7F2]/88 border border-[#FAF7F2]/25 hover:border-[#D4AF7A] hover:text-[#E3C89E] text-xs font-medium inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4 text-[#D4AF7A]" />
            <span>
              Admin Review Approval
              {reviewsState.pending.length > 0
                ? ` (${reviewsState.pending.length} Pending)`
                : ''}
            </span>
          </button>
        </div>
      </div>

      {/* SUBMIT A REVIEW MODAL */}
      <AnimatePresence>
        {submitModalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="submit-review-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1D1716]/80 backdrop-blur-xs"
            onClick={() => setSubmitModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-[#FAF7F2] text-[#1D1716] border border-[#D4AF7A]/55 shadow-2xl"
            >
              <div className="p-5 bg-[#390E15] text-[#FAF7F2] border-b border-[#D4AF7A]/30 flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-[#E3C89E] font-semibold">
                    {BRAND_INFO.businessName}
                  </span>
                  <h3
                    id="submit-review-modal-title"
                    className="font-serif-display text-2xl font-semibold mt-0.5"
                  >
                    Submit Your Studio Review
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitModalOpen(false)}
                  aria-label="Close review submission modal"
                  className="w-9 h-9 rounded-lg bg-[#4F101E] text-[#FAF7F2] flex items-center justify-center hover:bg-[#5F1123] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {submittedNotice ? (
                <div className="p-6 sm:p-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#4F101E] text-[#E3C89E] mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif-display text-2xl font-semibold text-[#390E15]">
                    Thank You for Sharing Your Feedback
                  </h4>
                  <p className="text-sm text-[#5C524E] leading-relaxed">
                    Your review has been saved and queued for{' '}
                    <strong className="text-[#1D1716]">
                      studio admin approval
                    </strong>{' '}
                    before public display on the website.
                  </p>
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSubmitModalOpen(false)}
                      className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#4F101E] text-[#FAF7F2] text-xs font-semibold uppercase tracking-[0.08em] cursor-pointer"
                    >
                      Done
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitModalOpen(false);
                        setAdminModalOpen(true);
                      }}
                      className="min-h-[44px] px-4 py-2.5 rounded-xl bg-[#F2ECE1] text-[#4F101E] text-xs font-semibold cursor-pointer"
                    >
                      View in Admin Approval Queue
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleReviewSubmit}
                  noValidate
                  className="p-5 sm:p-6 space-y-4"
                >
                  <div>
                    <label
                      htmlFor="rev-name"
                      className="block text-xs font-semibold text-[#1D1716] mb-1.5"
                    >
                      Your First Name or Approved Display Name{' '}
                      <span className="text-[#5F1123]">*</span>
                    </label>
                    <input
                      id="rev-name"
                      type="text"
                      value={reviewerName}
                      onChange={(e) => {
                        setReviewerName(e.target.value);
                        if (errors.reviewerName) {
                          setErrors((p) => ({ ...p, reviewerName: '' }));
                        }
                      }}
                      placeholder="e.g. Priya S."
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#FFFEFC] border border-[#E4DCD0] text-sm"
                    />
                    {errors.reviewerName && (
                      <p className="mt-1 text-xs text-[#9F1239] flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.reviewerName}</span>
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="rev-category"
                        className="block text-xs font-semibold text-[#1D1716] mb-1.5"
                      >
                        Service Category <span className="text-[#5F1123]">*</span>
                      </label>
                      <select
                        id="rev-category"
                        value={reviewCategory}
                        onChange={(e) =>
                          setReviewCategory(e.target.value as ReviewCategory)
                        }
                        className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#FFFEFC] border border-[#E4DCD0] text-sm"
                      >
                        {REVIEW_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="rev-date"
                        className="block text-xs font-semibold text-[#1D1716] mb-1.5"
                      >
                        Visit Date{' '}
                        <span className="font-normal text-[#5C524E]">
                          (Optional)
                        </span>
                      </label>
                      <input
                        id="rev-date"
                        type="date"
                        value={visitDate}
                        onChange={(e) => setVisitDate(e.target.value)}
                        className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#FFFEFC] border border-[#E4DCD0] text-sm"
                      />
                    </div>
                  </div>

                  {/* Five-Star Rating Selector */}
                  <div>
                    <span className="block text-xs font-semibold text-[#1D1716] mb-1.5">
                      Star Rating <span className="text-[#5F1123]">*</span>
                    </span>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((starVal) => (
                        <button
                          key={starVal}
                          type="button"
                          onClick={() => setRating(starVal)}
                          aria-label={`Rate ${starVal} stars`}
                          className="w-10 h-10 rounded-lg bg-[#FFFEFC] border border-[#E4DCD0] flex items-center justify-center hover:border-[#C9A26B] cursor-pointer"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              starVal <= rating
                                ? 'fill-[#C9A26B] text-[#C9A26B]'
                                : 'text-[#E4DCD0]'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-semibold text-[#5C524E] ml-1">
                        {rating} / 5 Stars
                      </span>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="rev-text"
                      className="block text-xs font-semibold text-[#1D1716] mb-1.5"
                    >
                      Your Experience <span className="text-[#5F1123]">*</span>
                    </label>
                    <textarea
                      id="rev-text"
                      rows={4}
                      value={reviewText}
                      onChange={(e) => {
                        setReviewText(e.target.value);
                        if (errors.reviewText) {
                          setErrors((p) => ({ ...p, reviewText: '' }));
                        }
                      }}
                      placeholder="Share your honest experience at Maha Beauty Saloon and Training Institute..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFEFC] border border-[#E4DCD0] text-sm resize-y"
                    />
                    {errors.reviewText && (
                      <p className="mt-1 text-xs text-[#9F1239] flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.reviewText}</span>
                      </p>
                    )}
                  </div>

                  <p className="text-[11px] text-[#5C524E] leading-relaxed">
                    Note: Every submitted review is held for studio admin
                    verification and approval before appearing publicly.
                  </p>

                  <button
                    type="submit"
                    className="btn-royal-sheen w-full min-h-[48px] px-6 py-3 rounded-xl bg-[#4F101E] text-[#FAF7F2] hover:bg-[#5F1123] text-xs font-semibold uppercase tracking-[0.08em] cursor-pointer"
                  >
                    Submit Review for Approval
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ADMIN REVIEW MODERATION & APPROVAL MODAL */}
      <AnimatePresence>
        {adminModalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-review-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1D1716]/80 backdrop-blur-xs"
            onClick={() => setAdminModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#FAF7F2] text-[#1D1716] border border-[#D4AF7A]/55 shadow-2xl"
            >
              <div className="p-5 bg-[#390E15] text-[#FAF7F2] border-b border-[#D4AF7A]/30 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-[#E3C89E] font-semibold">
                    Studio Administration
                  </span>
                  <h3
                    id="admin-review-modal-title"
                    className="font-serif-display text-2xl font-semibold"
                  >
                    Review Approval &amp; Moderation Queue
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setAdminModalOpen(false)}
                  aria-label="Close admin review modal"
                  className="w-9 h-9 rounded-lg bg-[#4F101E] text-[#FAF7F2] flex items-center justify-center hover:bg-[#5F1123] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 sm:p-6 space-y-6">
                {/* Toggle Sample / Demo Preview Cards */}
                <label className="flex items-center justify-between gap-4 p-4 rounded-xl bg-[#FFFEFC] border border-[#E4DCD0] cursor-pointer">
                  <div>
                    <p className="text-sm font-semibold text-[#1D1716]">
                      Display Sample / Demo Preview Cards
                    </p>
                    <p className="text-xs text-[#5C524E] mt-0.5">
                      Keep sample cards labelled as demos until sufficient
                      approved customer reviews are published.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={reviewsState.showSamplePreviews}
                    onChange={(e) =>
                      updateState({
                        ...reviewsState,
                        showSamplePreviews: e.target.checked,
                      })
                    }
                    className="w-5 h-5 accent-[#4F101E] shrink-0"
                  />
                </label>

                {/* Pending Reviews Section */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-[#5F1123]">
                    Pending Approval ({reviewsState.pending.length})
                  </h4>
                  {reviewsState.pending.length === 0 ? (
                    <p className="p-4 rounded-xl bg-[#F2ECE1] text-xs text-[#5C524E]">
                      No pending reviews awaiting approval right now.
                    </p>
                  ) : (
                    reviewsState.pending.map((rev) => (
                      <div
                        key={rev.id}
                        className="p-4 rounded-xl bg-[#FFFEFC] border border-[#E4DCD0] space-y-2.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <span className="font-semibold text-sm text-[#1D1716]">
                              {rev.displayName}
                            </span>
                            <span className="ml-2 text-xs text-[#5F1123] font-medium">
                              • {rev.category} ({rev.rating}★)
                            </span>
                          </div>
                          <span className="text-xs text-[#5C524E]">
                            {rev.dateLabel}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#5C524E] leading-relaxed">
                          “{rev.text}”
                        </p>
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => handleApprovePending(rev.id)}
                            className="min-h-[38px] px-4 py-1.5 rounded-lg bg-[#4F101E] text-[#FAF7F2] text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5 text-[#E3C89E]" />
                            <span>Approve for Public Display</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeletePending(rev.id)}
                            className="min-h-[38px] px-3 py-1.5 rounded-lg border border-[#E4DCD0] text-xs text-[#9F1239] inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Reject</span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Published Approved Customer Reviews */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-[#5F1123]">
                    Approved Customer Reviews ({reviewsState.approved.length})
                  </h4>
                  {reviewsState.approved.length === 0 ? (
                    <p className="p-4 rounded-xl bg-[#F2ECE1] text-xs text-[#5C524E]">
                      No approved customer reviews yet.
                    </p>
                  ) : (
                    reviewsState.approved.map((rev) => (
                      <div
                        key={rev.id}
                        className="p-4 rounded-xl bg-[#FFFEFC] border border-[#E4DCD0] flex items-start justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-[#1D1716]">
                            {rev.displayName} • {rev.category} ({rev.rating}★)
                          </p>
                          <p className="text-xs text-[#5C524E]">“{rev.text}”</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveApproved(rev.id)}
                          aria-label={`Remove review by ${rev.displayName}`}
                          className="p-2 rounded-lg text-[#9F1239] hover:bg-[#F2ECE1] shrink-0 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
