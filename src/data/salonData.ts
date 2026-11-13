export type ServiceCategory = 'women' | 'men';

export type BranchId = 'hyderabad' | 'chennai';

export type ReviewCategory =
  | 'Bridal Makeup'
  | 'Men’s Services'
  | 'Women’s Services'
  | 'Hair & Scalp Care'
  | 'Facial & Skin Treatments'
  | 'Beauty Academy';

export interface BranchOption {
  id: BranchId;
  bookingLabel: string;
  displayTitle: string;
  cityState: string;
  designation: string;
  hours: string;
  description: string;
}

export interface WomensServiceItem {
  id: string;
  number: string;
  name: string;
  confirmedPrice: number | null;
  priceDisplay: string;
  summaryPriceNote: string;
  inclusionNote?: string;
  availabilityTag: string;
  description: string;
  highlights: string[];
  image: string;
  fallbackImage: string;
  imageAlt: string;
}

export interface MensServiceItem {
  id: string;
  number: string;
  name: string;
  confirmedPrice: number | null;
  priceDisplay: string;
  summaryPriceNote: string;
  inclusionNote?: string;
  availabilityTag: string;
  iconKey: 'oil-wash' | 'hydra' | 'scalp' | 'facial' | 'skin';
  description: string;
  highlights: string[];
  image: string;
  fallbackImage: string;
  imageAlt: string;
}

export interface BridalFeatureItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  fallbackImage: string;
  imageAlt: string;
}

export interface BridalPackageItem {
  id: string;
  eyebrow: string;
  name: string;
  tagline: string;
  price: string;
  priceNumeric: number;
  pricingDisplayLabel: string;
  eventTypeDefault: string;
  badge?: string;
  isTwoEventPackage?: boolean;
  savingsBadge?: string;
  inclusions: string[];
  highlightQuote: string;
  image: string;
  fallbackImage: string;
  imageAlt: string;
}

export interface AcademyCourseItem {
  id: string;
  tier: string;
  name: string;
  fee: string;
  feeNumeric: number;
  duration: string;
  summary: string;
  focusPoints: string[];
  featured?: boolean;
}

export interface GalleryPhotoItem {
  id: string;
  src: string;
  fallbackSrc: string;
  title: string;
  category: 'salon' | 'bridal' | 'transformations' | 'academy';
  categoryLabel: string;
  caption: string;
  aspectClass: string;
}

export interface ReviewItem {
  id: string;
  displayName: string;
  category: ReviewCategory;
  rating: number;
  text: string;
  dateLabel?: string;
  isSampleDemo: boolean;
  status: 'approved' | 'pending';
}

export const BRAND_INFO = {
  brandName: 'Maha Beauty Saloon and Training Institute',
  businessName: 'Maha Beauty Saloon and Training Institute',
  founderName: 'Maha Lakshmi',
  founderTitle: 'Certified Cosmetologist & Aesthetic Artist',
  mainBranch: 'Hyderabad – Main Branch, Telangana',
  secondBranch: 'Chennai – Branch 2, Tamil Nadu',
  experience: '6+ Years',
  clientsCreated: '1,000+ Glows',
  branchesCount: '2 Branches',
  workingHours: 'Daily, 10 AM–8 PM',
  tagline: 'Where Clinical Luminosity Meets South Indian Grace.',
  philosophy:
    'True aesthetic care isn’t hiding behind a heavy filter – it’s building skin and scalp health so you love your reflection in broad daylight.',
  instagramHandle: '@mahasalonaesthetic',
  originalLogoPath: '/images/mahas-original-logo.png',
  originalLogoFallback:
    'https://www.designarena.ai/u/02c852e1-1c21-4a09-8c0f-2fb4285153b0',
  aboutGroupPhotoPath: '/images/about-founder-group.jpg',
  aboutGroupPhotoFallback:
    'https://www.designarena.ai/u/317ee316-a80b-405f-96dd-8b57187c5b86',
};

export const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'womens-services', label: 'Women’s Services' },
  { id: 'mens-services', label: 'Men’s Services' },
  { id: 'bridal', label: 'Bridal Makeup' },
  { id: 'academy', label: 'Academy' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'locations', label: 'Locations' },
  { id: 'contact', label: 'Contact' },
  { id: 'booking', label: 'Book Appointment', isPrimaryCta: true },
] as const;

export const BRANCH_OPTIONS: BranchOption[] = [
  {
    id: 'hyderabad',
    bookingLabel: 'Hyderabad – Main Branch, Telangana',
    displayTitle: 'Hyderabad – Main Branch, Telangana',
    cityState: 'Hyderabad, Telangana',
    designation: 'Main Branch',
    hours: 'Daily, 10 AM–8 PM',
    description:
      'Main Branch offering dedicated Women’s Services, Men’s Services, South Indian bridal artistry, and in-studio beauty training under Maha Lakshmi’s guidance.',
  },
  {
    id: 'chennai',
    bookingLabel: 'Chennai – Branch 2, Tamil Nadu',
    displayTitle: 'Chennai – Branch 2, Tamil Nadu',
    cityState: 'Chennai, Tamil Nadu',
    designation: 'Branch 2',
    hours: 'Daily, 10 AM–8 PM',
    description:
      'Second studio branch delivering Maha’s personalised skin and scalp care, traditional bridal styling, and professional hygiene standards in Tamil Nadu.',
  },
];

export const WOMENS_SERVICES: WomensServiceItem[] = [
  {
    id: 'women-head-oil-hair-wash',
    number: '01',
    name: 'Head Oil Massage + Hair Wash',
    confirmedPrice: 600,
    priceDisplay: '₹600 TOTAL',
    summaryPriceNote: '₹600 TOTAL (Neck massage is NOT included)',
    inclusionNote: 'Neck massage is NOT included.',
    availabilityTag: 'Women’s Hair & Scalp Combo',
    description:
      'Nourishing head oil massage paired with a gentle salon hair wash to leave hair clean, soft, and refreshed.',
    highlights: [
      'Personalised scalp & hair check prior to application.',
      'Relaxing head oil massage followed by salon hair wash.',
    ],
    image: '/images/womens-hair-curls-styling.jpg',
    fallbackImage:
      'https://www.designarena.ai/u/20a5c80d-e6fe-4aac-923d-2e99be8d3bf7',
    imageAlt:
      'Women’s hair care and salon styling at Maha Beauty Saloon and Training Institute',
  },
  {
    id: 'women-hydra-facial',
    number: '02',
    name: 'Hydra Facial',
    confirmedPrice: null,
    priceDisplay: 'Price on Enquiry',
    summaryPriceNote: 'Price on Enquiry',
    availabilityTag: 'Skin Hydration Care',
    description:
      'Professional facial hydration and cleansing care tailored after a personal skin consultation.',
    highlights: [
      'Pre-session skin consultation & sensitivity check.',
      'Tailored cleansing & hydration care for women’s skin.',
      'Sterilised tools & disposable hygiene kit.',
    ],
    image: '/images/womens-luminous-makeup.jpg',
    fallbackImage:
      'https://www.designarena.ai/u/e6c20976-ffae-4de6-8a81-89b36af84147',
    imageAlt: 'Radiant skin glow and beauty aesthetics for women',
  },
  {
    id: 'women-dandruff-treatment',
    number: '03',
    name: 'Dandruff Treatment',
    confirmedPrice: null,
    priceDisplay: 'Price on Enquiry',
    summaryPriceNote: 'Price on Enquiry',
    availabilityTag: 'Scalp Care Service',
    description:
      'Professional scalp care treatment designed to address dandruff, scalp buildup and itchiness.',
    highlights: [
      'Individual scalp check before session.',
      'Hygienic single-use kit & sterilised combs.',
      'Personalised scalp care guidance.',
    ],
    image: '/images/bridal-temple-jadai.jpg',
    fallbackImage:
      'https://www.designarena.ai/u/67fee791-f5e7-47cd-920a-356d8ff412f9',
    imageAlt: 'Healthy nourished long hair and scalp care for women',
  },
  {
    id: 'women-other-facial-services',
    number: '04',
    name: 'Other Facial Services',
    confirmedPrice: null,
    priceDisplay: 'Available In-House, Price on Enquiry',
    summaryPriceNote: 'Available In-House, Price on Enquiry',
    availabilityTag: 'Available In-House',
    description:
      'Additional in-house facial services selected after assessing your skin type, comfort, and occasion needs.',
    highlights: [
      'Personalised facial selection after consultation.',
      'Fresh disposable hygiene kit per client.',
      'Sanitised workstation & unhurried care.',
    ],
    image: '/images/bridal-hd-glow-closeup.jpg',
    fallbackImage:
      'https://www.designarena.ai/u/8dddacd8-292f-4900-a503-cea6d36fb2d9',
    imageAlt: 'Refined facial radiance and women’s beauty care by Maha Lakshmi',
  },
  {
    id: 'women-other-skin-treatments',
    number: '05',
    name: 'Other Skin Treatments',
    confirmedPrice: null,
    priceDisplay: 'Available In-House, Price on Enquiry',
    summaryPriceNote: 'Available In-House, Price on Enquiry',
    availabilityTag: 'Available In-House',
    description:
      'Customised in-house skin treatments guided by skin analysis and personal consultation with our cosmetologist.',
    highlights: [
      'One-on-one skin analysis before selection.',
      'Strict studio hygiene & sanitised tools.',
      'Available at Hyderabad and Chennai branches.',
    ],
    image: '/images/silk-prepleated-prep.jpg',
    fallbackImage:
      'https://www.designarena.ai/u/33893b0c-eec2-4630-9049-12c6d2d1871c',
    imageAlt:
      'Women’s beauty preparation and personalised care at Maha Beauty Saloon and Training Institute',
  },
];

const MENS_UPLOADED_FALLBACK =
  'https://www.designarena.ai/u/fb42437f-c48c-4de5-8e01-6419b9061692';

export const MENS_SERVICES: MensServiceItem[] = [
  {
    id: 'men-head-oil-neck-hair-wash',
    number: '01',
    name: 'Head Oil Massage + Neck Massage + Hair Wash',
    confirmedPrice: 1200,
    priceDisplay: '₹1,200 TOTAL',
    summaryPriceNote: '₹1,200 TOTAL (Neck massage included)',
    inclusionNote: 'Neck massage is included.',
    availabilityTag: 'Complete Men’s Combo',
    iconKey: 'oil-wash',
    description:
      'Complete relaxation and grooming combo uniting warm head oil massage, soothing neck massage, and a refreshing salon hair wash. Neck massage is included in the ₹1,200 TOTAL tariff.',
    highlights: [
      'Nourishing head oil massage for scalp relaxation.',
      'Neck massage included as part of the ₹1,200 TOTAL combo.',
      'Refreshing salon hair wash with clean towel finish.',
    ],
    image: '/images/mens-salon-full.jpg',
    fallbackImage: MENS_UPLOADED_FALLBACK,
    imageAlt:
      'Men’s head oil massage and salon hair wash service at Maha Beauty Saloon and Training Institute',
  },
  {
    id: 'men-hydra-facial',
    number: '02',
    name: 'Hydra Facial',
    confirmedPrice: null,
    priceDisplay: 'Price on Enquiry',
    summaryPriceNote: 'Price on Enquiry',
    availabilityTag: 'Men’s Facial Care',
    iconKey: 'hydra',
    description:
      'Professional cleansing and hydration facial care tailored for men’s skin after an individual consultation.',
    highlights: [
      'Skin type & sensitivity check prior to session.',
      'Sterilised implements & single-use hygiene kit.',
      'Sanitised grooming chair & calm studio setting.',
    ],
    image: '/images/mens-basin-care.jpg',
    fallbackImage: MENS_UPLOADED_FALLBACK,
    imageAlt:
      'Men’s relaxing salon cleanse and hydration care at Maha Beauty Saloon and Training Institute',
  },
  {
    id: 'men-dandruff-treatment',
    number: '03',
    name: 'Dandruff Treatment',
    confirmedPrice: null,
    priceDisplay: 'Price on Enquiry',
    summaryPriceNote: 'Price on Enquiry',
    availabilityTag: 'Scalp Care Service',
    iconKey: 'scalp',
    description:
      'Professional scalp care treatment designed to address dandruff, scalp buildup and itchiness.',
    highlights: [
      'Personalised scalp check prior to session.',
      'Sterilised combs, tools & disposable linens.',
      'Available at Hyderabad and Chennai branches.',
    ],
    image: '/images/mens-scalp-care.jpg',
    fallbackImage: MENS_UPLOADED_FALLBACK,
    imageAlt:
      'Men’s targeted scalp and dandruff care session with disposable hygiene cape',
  },
  {
    id: 'men-other-facial-services',
    number: '04',
    name: 'Other Facial Services',
    confirmedPrice: null,
    priceDisplay: 'Available In-House, Price on Enquiry',
    summaryPriceNote: 'Available In-House, Price on Enquiry',
    availabilityTag: 'Available In-House',
    iconKey: 'facial',
    description:
      'Additional in-house facial care options recommended after assessing your skin condition and grooming preferences.',
    highlights: [
      'One-on-one skin consultation before selection.',
      'Disposable hygiene kit & sanitised workstation.',
      'Unhurried personalised service.',
    ],
    image: '/images/mens-grooming-studio.jpg',
    fallbackImage: MENS_UPLOADED_FALLBACK,
    imageAlt:
      'Dedicated men’s grooming and in-house facial care at Maha Beauty Saloon and Training Institute',
  },
  {
    id: 'men-other-skin-treatments',
    number: '05',
    name: 'Other Skin Treatments',
    confirmedPrice: null,
    priceDisplay: 'Available In-House, Price on Enquiry',
    summaryPriceNote: 'Available In-House, Price on Enquiry',
    availabilityTag: 'Available In-House',
    iconKey: 'skin',
    description:
      'In-house skin care treatments tailored following a personal skin assessment under certified cosmetologist supervision.',
    highlights: [
      'Skin sensitivity & barrier check included.',
      'Professional studio hygiene standards.',
      'Available across both Hyderabad & Chennai studios.',
    ],
    image: '/images/mens-gentleman-care.jpg',
    fallbackImage: MENS_UPLOADED_FALLBACK,
    imageAlt:
      'Men’s personalised skin and grooming care with fresh single-use cape',
  },
];

export const BRIDAL_PILLARS: string[] = [
  'Traditional South Indian bridal makeup',
  'HD bridal makeup',
  'Kanjeevaram silk styling',
  'Temple jewellery styling',
  'Bridal saree draping',
  'Reception makeup looks',
  'Personalised bridal consultations',
];

export const BRIDAL_SHOWCASE_ITEMS: BridalFeatureItem[] = [
  {
    id: 'muhurtham-traditional',
    title: 'Traditional South Indian Bridal Makeup',
    subtitle: 'Sacred Muhurtham Harmony',
    description:
      'Honouring sacred mandapam rituals with skin-true bridal artistry, traditional forehead detailing, and balanced styling for South Indian weddings.',
    image: '/images/bridal-muhurtham-mandapam.jpg',
    fallbackImage:
      'https://www.designarena.ai/u/9b472b01-f216-4ce6-bc06-56b865cda0b2',
    imageAlt: 'Traditional South Indian bride in Kanjeevaram silk saree at mandapam',
  },
  {
    id: 'hd-bridal-reception',
    title: 'HD Bridal & Reception Makeup Looks',
    subtitle: 'Luminous Evening Couture',
    description:
      'Refined HD bridal and reception makeup looks crafted to appear natural in person and radiant under wedding photography lighting.',
    image: '/images/bridal-reception-evening.jpg',
    fallbackImage:
      'https://www.designarena.ai/u/c9c66cf4-cc12-4348-9f20-a22204e52271',
    imageAlt: 'Luminous HD bridal and reception makeup look in deep burgundy silk',
  },
  {
    id: 'kanjeevaram-draping',
    title: 'Kanjeevaram Silk Styling & Bridal Saree Draping',
    subtitle: 'Structured Pleats & Graceful Silhouette',
    description:
      'Neat folding, structured pre-pleating, and secure bridal saree draping so Kanjeevaram silks sit gracefully throughout ceremonies.',
    image: '/images/bridal-full-draping.jpg',
    fallbackImage:
      'https://www.designarena.ai/u/1cdbbdb7-4176-4186-b916-8ebd63961cc3',
    imageAlt: 'Full-length Kanjeevaram silk bridal saree draping with temple waist belt',
  },
  {
    id: 'temple-jewellery-jadai',
    title: 'Temple Jewellery & Traditional Jadai Styling',
    subtitle: 'Poolajada, Rakodi & Veni Balance',
    description:
      'Harmonious placement of maang tikka, harams, oddiyanam, jhumkas, and fresh floral veni braids for enduring comfort and poise.',
    image: '/images/bridal-poolajada-braid.jpg',
    fallbackImage:
      'https://www.designarena.ai/u/fafcc2ec-3347-48a6-a2fc-2209c0386edf',
    imageAlt: 'Traditional South Indian bridal floral veni and embellished jadai braid',
  },
];

export const BRIDAL_PACKAGES: BridalPackageItem[] = [
  {
    id: 'muhurtham-glow',
    eyebrow: 'PER EVENT • MORNING CEREMONY',
    name: 'Muhurtham Glow',
    tagline: 'Sacred morning grace — crafted for temple and mandapam rituals.',
    price: '₹15,000',
    priceNumeric: 15000,
    pricingDisplayLabel: 'Transparent All-Inclusive Pricing',
    eventTypeDefault: 'Morning Ceremony (Muhurtham)',
    inclusions: [
      'Skin-like Bridal HD Makeup (M·A·C & Huda Beauty).',
      'Crisp Kanjeevaram Saree Draping & Traditional Jadai Hairdo.',
      'Comfort Lenses & Handcrafted Mink-Style Lashes.',
      'Personalised Bridal Touch-Up Kit for Post-Muhurtham Photos.',
      'One-on-One Pre-Bridal Skin & Jewellery Consultation.',
    ],
    highlightQuote: '“Calibrated for warm homam firelight and morning daylight.”',
    image: '/images/bridal-muhurtham-mandapam.jpg',
    fallbackImage:
      'https://www.designarena.ai/u/9b472b01-f216-4ce6-bc06-56b865cda0b2',
    imageAlt: 'Muhurtham Glow South Indian bridal look in Kanjeevaram silk saree',
  },
  {
    id: 'reception-royale',
    eyebrow: 'PER EVENT • EVENING GLAM',
    name: 'Reception Royale',
    tagline: 'Most-booked evening couture — luminous, sculpted and camera-ready.',
    price: '₹18,000',
    priceNumeric: 18000,
    pricingDisplayLabel: 'Transparent All-Inclusive Pricing',
    eventTypeDefault: 'Evening Glam (Reception)',
    badge: 'MOST BOOKED',
    inclusions: [
      'Airbrush or High-Definition Sweat-Proof Couture Base.',
      'Designer Gown / Lehenga Draping & Dupatta Architecture.',
      'Two Distinct Hair Looks (Portrait + Stage Reveal).',
      'Luxe Nail Styling & Seamless Volume Hair Extensions.',
      'Zero-Flashback Studio & Video-Light Tested Finish.',
    ],
    highlightQuote: '“12-hour humidity and stage spotlight lock.”',
    image: '/images/bridal-reception-evening.jpg',
    fallbackImage:
      'https://www.designarena.ai/u/c9c66cf4-cc12-4348-9f20-a22204e52271',
    imageAlt: 'Reception Royale evening couture bridal look',
  },
  {
    id: 'complete-bridal-journey',
    eyebrow: '2 EVENTS • ALL-INCLUSIVE',
    name: 'Complete Bridal Journey',
    tagline: 'Two celebrations, one calm artist by your side from trial to aisle.',
    price: '₹28,000',
    priceNumeric: 28000,
    pricingDisplayLabel: 'Transparent All-Inclusive Pricing',
    eventTypeDefault: '2 Events • All-Inclusive (Muhurtham + Reception)',
    isTwoEventPackage: true,
    savingsBadge: 'SAVE ₹5,000 • 2-EVENT SUITE',
    inclusions: [
      'Full Muhurtham Glow Look + Full Reception Royale Look.',
      'Complimentary Full Look Trial Session (7–10 Days Prior).',
      'Curated Pre-Bridal Skin & Hair Radiance Package.',
      'Both Kanjeevaram Saree & Lehenga Precision Draping.',
      'Dedicated On-Venue Dressing & Touch-Up Assistance.',
    ],
    highlightQuote:
      '“Save ₹5,000 compared with booking both individual packages. Priority calendar lock.”',
    image: '/images/bridal-full-draping.jpg',
    fallbackImage:
      'https://www.designarena.ai/u/1cdbbdb7-4176-4186-b916-8ebd63961cc3',
    imageAlt: 'Complete Bridal Journey two-event South Indian bridal couture styling',
  },
];

export const ACADEMY_COURSES: AcademyCourseItem[] = [
  {
    id: 'basic-course',
    tier: 'Foundation Programme',
    name: 'Basic Course',
    fee: '₹7,000',
    feeNumeric: 7000,
    duration: '4 Weeks',
    summary:
      'Foundational beauty saloon training introducing essential studio care, hygiene practices, and practical fundamentals under personal guidance.',
    focusPoints: [
      'Course Fee: ₹7,000 • Duration: 4 Weeks',
      'Practical beauty saloon fundamentals & hygiene discipline',
      'Guided studio practice at our training institute',
    ],
  },
  {
    id: 'advanced-course',
    tier: 'Skill Progression',
    name: 'Advanced Course',
    fee: '₹25,000',
    feeNumeric: 25000,
    duration: '8 Weeks',
    featured: true,
    summary:
      'Progressive hands-on training in salon beauty services, skin and hair care routines, and occasion styling techniques.',
    focusPoints: [
      'Course Fee: ₹25,000 • Duration: 8 Weeks',
      'Supervised practical training with individual feedback',
      'Client consultation & professional workstation standards',
    ],
  },
  {
    id: 'diploma-course',
    tier: 'Comprehensive Programme',
    name: 'Diploma Course',
    fee: '₹80,000',
    feeNumeric: 80000,
    duration: '16 Weeks',
    summary:
      'Comprehensive beauty saloon and aesthetic artistry training mentored by Certified Cosmetologist Maha Lakshmi.',
    focusPoints: [
      'Course Fee: ₹80,000 • Duration: 16 Weeks',
      'In-depth practical mentorship across salon & bridal artistry',
      'Enquire directly for batch timings & personal admissions guidance',
    ],
  },
];

export const PROFESSIONAL_BRANDS = [
  {
    name: 'L’Oréal Professionnel',
    category: 'Hair & Scalp Care Formulations',
  },
  {
    name: 'Kérastase Paris',
    category: 'Luxury Hair Rituals',
  },
  {
    name: 'M·A·C Cosmetics',
    category: 'HD & Bridal Artistry',
  },
  {
    name: 'Huda Beauty',
    category: 'High-Definition Complexion & Eyes',
  },
  {
    name: 'Dermalogica',
    category: 'Clinical Skin Health Care',
  },
] as const;

export const HYGIENE_STANDARDS = [
  {
    number: '01',
    title: 'Sterilised Tools',
    description:
      'Combs, scissors, extractors, and reusable implements undergo thorough cleaning and sterilisation before every appointment.',
  },
  {
    number: '02',
    title: 'Disposable Kits',
    description:
      'Fresh single-use sheets, wipes, applicators, and hygiene kits are used per client to prevent cross-contamination.',
  },
  {
    number: '03',
    title: 'Sanitised Workstations and Chairs',
    description:
      'Treatment beds, styling chairs, mirrors, and headrests in both Hyderabad and Chennai branches are sanitised between sessions.',
  },
  {
    number: '04',
    title: 'Skin and Scalp Analysis',
    description:
      'Every skin or hair treatment begins by observing skin comfort, sensitivity, and scalp condition prior to product application.',
  },
  {
    number: '05',
    title: 'Personalised Consultations',
    description:
      'Unhurried one-on-one discussions ensure every recommendation aligns with your natural features, comfort, and lifestyle.',
  },
  {
    number: '06',
    title: 'Professional Hygiene Standards',
    description:
      'Consistent cleanliness across Women’s Services, Men’s Services, Bridal sessions, and Academy training.',
  },
] as const;

export const REVIEW_CATEGORIES: ReviewCategory[] = [
  'Bridal Makeup',
  'Men’s Services',
  'Women’s Services',
  'Hair & Scalp Care',
  'Facial & Skin Treatments',
  'Beauty Academy',
];

/**
 * STRICT COMPLIANCE:
 * Clearly labelled Sample / Demo layout preview items — NOT presented as verified
 * customer feedback until genuine client reviews are submitted and approved by admin.
 */
export const SAMPLE_DEMO_REVIEWS: ReviewItem[] = [
  {
    id: 'sample-bridal',
    displayName: 'Sample Bride Preview',
    category: 'Bridal Makeup',
    rating: 5,
    text: 'Sample / Demo Review Preview — Illustrates how an approved South Indian bridal makeup and Kanjeevaram saree draping testimonial will appear once published by studio management.',
    dateLabel: 'Sample / Demo Preview',
    isSampleDemo: true,
    status: 'approved',
  },
  {
    id: 'sample-mens',
    displayName: 'Sample Guest Preview',
    category: 'Men’s Services',
    rating: 5,
    text: 'Sample / Demo Review Preview — Illustrates how an approved feedback card for the Men’s Head Oil Massage + Neck Massage + Hair Wash combo will appear once verified.',
    dateLabel: 'Sample / Demo Preview',
    isSampleDemo: true,
    status: 'approved',
  },
  {
    id: 'sample-womens',
    displayName: 'Sample Guest Preview',
    category: 'Women’s Services',
    rating: 5,
    text: 'Sample / Demo Review Preview — Illustrates how an approved client experience for personalised Women’s Services and studio hygiene will appear after admin review.',
    dateLabel: 'Sample / Demo Preview',
    isSampleDemo: true,
    status: 'approved',
  },
  {
    id: 'sample-hair-scalp',
    displayName: 'Sample Guest Preview',
    category: 'Hair & Scalp Care',
    rating: 5,
    text: 'Sample / Demo Review Preview — Illustrates how an approved Hair & Scalp Care or Dandruff Treatment review will display with category tags and star ratings.',
    dateLabel: 'Sample / Demo Preview',
    isSampleDemo: true,
    status: 'approved',
  },
  {
    id: 'sample-facial-skin',
    displayName: 'Sample Guest Preview',
    category: 'Facial & Skin Treatments',
    rating: 5,
    text: 'Sample / Demo Review Preview — Illustrates how an approved Hydra Facial or personalised skin consultation review will appear once verified by the studio.',
    dateLabel: 'Sample / Demo Preview',
    isSampleDemo: true,
    status: 'approved',
  },
  {
    id: 'sample-academy',
    displayName: 'Sample Student Preview',
    category: 'Beauty Academy',
    rating: 5,
    text: 'Sample / Demo Review Preview — Illustrates how an approved student testimonial from Maha Beauty Saloon and Training Institute will appear upon admin approval.',
    dateLabel: 'Sample / Demo Preview',
    isSampleDemo: true,
    status: 'approved',
  },
];

export const GALLERY_PHOTOS: GalleryPhotoItem[] = [
  {
    id: 'gal-1',
    src: '/images/bridal-muhurtham-mandapam.jpg',
    fallbackSrc:
      'https://www.designarena.ai/u/9b472b01-f216-4ce6-bc06-56b865cda0b2',
    title: 'Sacred Muhurtham Bridal Look',
    category: 'bridal',
    categoryLabel: 'Bridal Photographs',
    caption:
      'Traditional South Indian bridal makeup, temple jewellery styling & Kanjeevaram silk grandeur.',
    aspectClass: 'aspect-[3/4]',
  },
  {
    id: 'gal-2',
    src: '/images/bridal-reception-evening.jpg',
    fallbackSrc:
      'https://www.designarena.ai/u/c9c66cf4-cc12-4348-9f20-a22204e52271',
    title: 'Luminous Evening Bridal Portrait',
    category: 'bridal',
    categoryLabel: 'Bridal Photographs',
    caption:
      'Radiant HD bridal glow paired with rich burgundy-plum silk and antique gold jewellery.',
    aspectClass: 'aspect-[3/4]',
  },
  {
    id: 'gal-mens-studio',
    src: '/images/mens-salon-full.jpg',
    fallbackSrc: MENS_UPLOADED_FALLBACK,
    title: 'Men’s Head Oil Massage & Salon Hair Wash',
    category: 'salon',
    categoryLabel: 'Salon Photographs',
    caption:
      'Dedicated in-studio men’s head oil massage, scalp care, and purifying salon hair wash.',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'gal-3',
    src: '/images/womens-hair-curls-styling.jpg',
    fallbackSrc:
      'https://www.designarena.ai/u/20a5c80d-e6fe-4aac-923d-2e99be8d3bf7',
    title: 'Salon Hair Styling & Soft Curls',
    category: 'salon',
    categoryLabel: 'Salon Photographs',
    caption:
      'In-salon hair styling finished with voluminous soft curls, twisted crown detailing, and floral accents.',
    aspectClass: 'aspect-[3/4]',
  },
  {
    id: 'gal-4',
    src: '/images/bridal-full-draping.jpg',
    fallbackSrc:
      'https://www.designarena.ai/u/1cdbbdb7-4176-4186-b916-8ebd63961cc3',
    title: 'Kanjeevaram Bridal Saree Draping',
    category: 'bridal',
    categoryLabel: 'Bridal Photographs',
    caption:
      'Structured Kanjeevaram silk bridal saree draping styled with traditional temple waist belt.',
    aspectClass: 'aspect-[3/4]',
  },
  {
    id: 'gal-5',
    src: '/images/silk-prepleated-prep.jpg',
    fallbackSrc:
      'https://www.designarena.ai/u/33893b0c-eec2-4630-9049-12c6d2d1871c',
    title: 'In-Salon Silk Draping & Styling Prep',
    category: 'salon',
    categoryLabel: 'Salon Photographs',
    caption:
      'Meticulous saree pleating preparation alongside floral veni, jhumkas, and traditional bindis.',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'gal-6',
    src: '/images/transformation-before-after.jpg',
    fallbackSrc:
      'https://www.designarena.ai/u/4378b703-0cde-4eee-8bea-876df76af312',
    title: 'Client Bridal Makeover Transformation',
    category: 'transformations',
    categoryLabel: 'Beauty Transformations',
    caption:
      'Before & after bridal beauty transformation highlighting balanced complexion, temple haram, and silk styling.',
    aspectClass: 'aspect-[1/1]',
  },
  {
    id: 'gal-7',
    src: '/images/bridal-hd-glow-closeup.jpg',
    fallbackSrc:
      'https://www.designarena.ai/u/8dddacd8-292f-4900-a503-cea6d36fb2d9',
    title: 'HD Eye Artistry & Jewellery Detail',
    category: 'bridal',
    categoryLabel: 'Bridal Photographs',
    caption:
      'Refined rose-gold eye makeup, maang tikka alignment, and intricate bridal mehendi.',
    aspectClass: 'aspect-[3/4]',
  },
  {
    id: 'gal-8',
    src: '/images/bridal-poolajada-braid.jpg',
    fallbackSrc:
      'https://www.designarena.ai/u/fafcc2ec-3347-48a6-a2fc-2209c0386edf',
    title: 'Floral Veni & Embellished Poolajada',
    category: 'salon',
    categoryLabel: 'Salon Photographs',
    caption:
      'Traditional South Indian braid styling adorned with fresh jasmine, peach florals, and jadai ornaments.',
    aspectClass: 'aspect-[3/4]',
  },
  {
    id: 'gal-9',
    src: '/images/bridal-temple-jadai.jpg',
    fallbackSrc:
      'https://www.designarena.ai/u/67fee791-f5e7-47cd-920a-356d8ff412f9',
    title: 'Rakodi Crown & Traditional Braid Craft',
    category: 'salon',
    categoryLabel: 'Salon Photographs',
    caption:
      'Classic South Indian hair styling paired with kempu-pearl rakodi and ear chains.',
    aspectClass: 'aspect-[3/4]',
  },
  {
    id: 'gal-10',
    src: '/images/bridal-kanjeevaram-portrait.jpg',
    fallbackSrc:
      'https://www.designarena.ai/u/8ce1c89b-6b52-44ff-820f-60869b90c4b9',
    title: 'Classic Kumkum & Temple Choker Grace',
    category: 'bridal',
    categoryLabel: 'Bridal Photographs',
    caption:
      'Natural bridal finish honouring South Indian features and traditional jewellery.',
    aspectClass: 'aspect-[3/4]',
  },
  {
    id: 'gal-11',
    src: '/images/bridal-auspicious-yellow.jpg',
    fallbackSrc:
      'https://www.designarena.ai/u/4abf4b64-a4a9-41bd-862a-997cad795f85',
    title: 'Auspicious Ceremony Silk & Garland Look',
    category: 'bridal',
    categoryLabel: 'Bridal Photographs',
    caption:
      'Ceremonial bridal look with yellow silk saree, jasmine-rose garland, and traditional bangles.',
    aspectClass: 'aspect-[3/4]',
  },
  {
    id: 'gal-12',
    src: '/images/womens-luminous-makeup.jpg',
    fallbackSrc:
      'https://www.designarena.ai/u/e6c20976-ffae-4de6-8a81-89b36af84147',
    title: 'Luminous Occasion & Reception Transformation',
    category: 'transformations',
    categoryLabel: 'Beauty Transformations',
    caption:
      'Soft peach-rose eye artistry, defined lashes, and radiant occasion makeup look.',
    aspectClass: 'aspect-[3/4]',
  },
  {
    id: 'gal-13',
    src: '/images/bridal-mehendi-art.jpg',
    fallbackSrc:
      'https://www.designarena.ai/u/e1c0b31a-b859-45dc-a668-5740914b1adb',
    title: 'Traditional Bridal Mehendi Artistry',
    category: 'transformations',
    categoryLabel: 'Beauty Transformations',
    caption:
      'Symmetrical traditional full-hand bridal mehendi crafted with detailed precision.',
    aspectClass: 'aspect-[3/4]',
  },
  {
    id: 'gal-14',
    src: '/images/academy-graduates-group.jpg',
    fallbackSrc:
      'https://www.designarena.ai/u/20347e2d-74a5-4335-aec6-4343411d2eb4',
    title: 'Maha Beauty Saloon and Training Institute Graduates',
    category: 'academy',
    categoryLabel: 'Training & Academy',
    caption:
      'Founder Maha Lakshmi with graduating students holding course completion certificates.',
    aspectClass: 'aspect-[16/10]',
  },
  {
    id: 'gal-15',
    src: '/images/founder-academy-certificate.jpg',
    fallbackSrc:
      'https://www.designarena.ai/u/dd60a88a-07d5-4891-a572-34a74189f98b',
    title: 'Course Completion Certificate Presentation',
    category: 'academy',
    categoryLabel: 'Training & Academy',
    caption:
      'Founder Maha Lakshmi presenting a course completion certificate at Maha Beauty Saloon and Training Institute.',
    aspectClass: 'aspect-[3/4]',
  },
];

export const APPOINTMENT_TIME_SLOTS = [
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '01:00 PM',
  '01:30 PM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
  '04:30 PM',
  '05:00 PM',
  '05:30 PM',
  '06:00 PM',
  '06:30 PM',
  '07:00 PM',
  '07:30 PM',
  '08:00 PM',
] as const;
