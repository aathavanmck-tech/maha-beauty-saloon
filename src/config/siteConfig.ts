export interface SiteExternalConfig {
  /**
   * Official WhatsApp number in international digits (e.g., "91XXXXXXXXXX").
   * Kept empty by default until the official number is supplied — never invented.
   */
  whatsappNumber: string;
  /**
   * Official Instagram profile URL.
   * Kept empty by default until the verified URL is supplied.
   */
  instagramUrl: string;
  /**
   * Official Google Maps / Apple Maps URL for Hyderabad Main Branch.
   * Kept empty by default until official map link is provided.
   */
  hyderabadMapUrl: string;
  /**
   * Official Google Maps / Apple Maps URL for Chennai Branch 2.
   * Kept empty by default until official map link is provided.
   */
  chennaiMapUrl: string;
  /**
   * Official Google Business Profile / Google Reviews URL.
   * Kept empty by default until the verified link is supplied.
   */
  googleReviewsUrl: string;
}

const STORAGE_KEY = 'mahas_salon_external_config_v1';

export const DEFAULT_SITE_CONFIG: SiteExternalConfig = {
  whatsappNumber:
    (import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined)?.trim() || '',
  instagramUrl:
    (import.meta.env.VITE_INSTAGRAM_URL as string | undefined)?.trim() || '',
  hyderabadMapUrl:
    (import.meta.env.VITE_HYDERABAD_MAP_URL as string | undefined)?.trim() || '',
  chennaiMapUrl:
    (import.meta.env.VITE_CHENNAI_MAP_URL as string | undefined)?.trim() || '',
  googleReviewsUrl:
    (import.meta.env.VITE_GOOGLE_REVIEWS_URL as string | undefined)?.trim() || '',
};

export function loadSiteConfig(): SiteExternalConfig {
  if (typeof window === 'undefined') return DEFAULT_SITE_CONFIG;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SITE_CONFIG;
    const parsed = JSON.parse(raw) as Partial<SiteExternalConfig>;
    return {
      whatsappNumber:
        typeof parsed.whatsappNumber === 'string'
          ? parsed.whatsappNumber.trim()
          : DEFAULT_SITE_CONFIG.whatsappNumber,
      instagramUrl:
        typeof parsed.instagramUrl === 'string'
          ? parsed.instagramUrl.trim()
          : DEFAULT_SITE_CONFIG.instagramUrl,
      hyderabadMapUrl:
        typeof parsed.hyderabadMapUrl === 'string'
          ? parsed.hyderabadMapUrl.trim()
          : DEFAULT_SITE_CONFIG.hyderabadMapUrl,
      chennaiMapUrl:
        typeof parsed.chennaiMapUrl === 'string'
          ? parsed.chennaiMapUrl.trim()
          : DEFAULT_SITE_CONFIG.chennaiMapUrl,
      googleReviewsUrl:
        typeof parsed.googleReviewsUrl === 'string'
          ? parsed.googleReviewsUrl.trim()
          : DEFAULT_SITE_CONFIG.googleReviewsUrl,
    };
  } catch {
    return DEFAULT_SITE_CONFIG;
  }
}

export function saveSiteConfig(config: SiteExternalConfig): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {
    // Ignore storage quota errors
  }
}

export function sanitizeWhatsAppDigits(raw: string): string {
  return raw.replace(/[^\d]/g, '');
}

/**
 * Builds the WhatsApp handoff URL.
 * - If an official WhatsApp number is configured, targets that exact number via wa.me/<digits>?text=...
 * - If no official number is configured yet, uses api.whatsapp.com/send?text=... so the pre-filled
 *   enquiry message still opens cleanly in WhatsApp without inventing any phone number.
 */
export function buildWhatsAppUrl(message: string, whatsappNumber: string): string {
  const cleanDigits = sanitizeWhatsAppDigits(whatsappNumber);
  const encoded = encodeURIComponent(message);
  if (cleanDigits.length >= 8) {
    return `https://wa.me/${cleanDigits}?text=${encoded}`;
  }
  return `https://api.whatsapp.com/send?text=${encoded}`;
}
