import { useCallback, useEffect, useState } from 'react';
import {
  BranchId,
  MENS_SERVICES,
  NAV_ITEMS,
  ServiceCategory,
  WOMENS_SERVICES,
} from './data/salonData';
import {
  SiteExternalConfig,
  loadSiteConfig,
  saveSiteConfig,
} from './config/siteConfig';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutFounderSection } from './components/AboutFounderSection';
import { WomensServicesSection } from './components/WomensServicesSection';
import { MensServicesSection } from './components/MensServicesSection';
import {
  BookingPortalSection,
  WhatsAppHandoffPayload,
} from './components/BookingPortalSection';
import { BridalMakeupSection } from './components/BridalMakeupSection';
import { AcademySection } from './components/AcademySection';
import { HygieneProductsSection } from './components/HygieneProductsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { GallerySection } from './components/GallerySection';
import { LocationsContactSection } from './components/LocationsContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { WhatsAppHandoffModal } from './components/WhatsAppHandoffModal';
import { SiteConfigModal } from './components/SiteConfigModal';

export function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] =
    useState<ServiceCategory>('women');
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    WOMENS_SERVICES[0].id
  );
  const [selectedBranch, setSelectedBranch] = useState<BranchId>('hyderabad');
  const [contactTopic, setContactTopic] = useState<string>(
    'General Salon Enquiry'
  );

  const [siteConfig, setSiteConfig] = useState<SiteExternalConfig>(() =>
    loadSiteConfig()
  );
  const [handoffPayload, setHandoffPayload] =
    useState<WhatsAppHandoffPayload | null>(null);
  const [isConfigOpen, setIsConfigOpen] = useState<boolean>(false);

  const handleNavigate = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const headerOffset = 88;
      const rect = el.getBoundingClientRect();
      const targetTop = rect.top + window.scrollY - headerOffset;
      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: 'smooth',
      });
      setActiveSection(sectionId);
    }
  }, []);

  // Scroll spy across all navigation sections
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.id);

    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      let current = 'home';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryChange = useCallback((category: ServiceCategory) => {
    setSelectedCategory(category);
    const defaultService =
      category === 'women' ? WOMENS_SERVICES[0].id : MENS_SERVICES[0].id;
    setSelectedServiceId(defaultService);
  }, []);

  const handleSelectServiceForBooking = useCallback(
    (category: ServiceCategory, serviceId: string) => {
      setSelectedCategory(category);
      setSelectedServiceId(serviceId);
      handleNavigate('booking');
    },
    [handleNavigate]
  );

  const handleSelectBranchAndBook = useCallback(
    (branch: BranchId) => {
      setSelectedBranch(branch);
      handleNavigate('booking');
    },
    [handleNavigate]
  );

  const handleNavigateToBridalContact = useCallback(() => {
    setContactTopic('Personalised Bridal Makeup Consultation');
    handleNavigate('contact');
  }, [handleNavigate]);

  const handleSaveSiteConfig = useCallback((next: SiteExternalConfig) => {
    setSiteConfig(next);
    saveSiteConfig(next);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1D1716] overflow-x-clip">
      {/* Skip to Main Content for Keyboard / Screen Reader Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#4F101E] focus:text-[#FAF7F2] focus:text-xs focus:font-semibold"
      >
        Skip to main content
      </a>

      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      <main id="main-content" className="flex-1">
        <HeroSection onNavigate={handleNavigate} />

        <AboutFounderSection onNavigate={handleNavigate} />

        <WomensServicesSection
          onSelectServiceForBooking={handleSelectServiceForBooking}
        />

        <MensServicesSection
          onSelectServiceForBooking={handleSelectServiceForBooking}
        />

        <BookingPortalSection
          selectedCategory={selectedCategory}
          selectedServiceId={selectedServiceId}
          selectedBranch={selectedBranch}
          onCategoryChange={handleCategoryChange}
          onServiceChange={setSelectedServiceId}
          onBranchChange={setSelectedBranch}
          onOpenWhatsAppHandoff={setHandoffPayload}
        />

        <BridalMakeupSection
          onNavigateToBridalContact={handleNavigateToBridalContact}
          onOpenWhatsAppHandoff={setHandoffPayload}
        />

        <AcademySection onOpenWhatsAppHandoff={setHandoffPayload} />

        <HygieneProductsSection />

        <ReviewsSection
          googleReviewsUrl={siteConfig.googleReviewsUrl}
          onOpenLinkSettings={() => setIsConfigOpen(true)}
        />

        <GallerySection
          instagramUrl={siteConfig.instagramUrl}
          onOpenLinkSettings={() => setIsConfigOpen(true)}
        />

        <LocationsContactSection
          hyderabadMapUrl={siteConfig.hyderabadMapUrl}
          chennaiMapUrl={siteConfig.chennaiMapUrl}
          topic={contactTopic}
          onTopicChange={setContactTopic}
          onSelectBranchAndBook={handleSelectBranchAndBook}
          onOpenWhatsAppHandoff={setHandoffPayload}
          onOpenLinkSettings={() => setIsConfigOpen(true)}
        />
      </main>

      <Footer
        instagramUrl={siteConfig.instagramUrl}
        onNavigate={handleNavigate}
        onOpenLinkSettings={() => setIsConfigOpen(true)}
      />

      <FloatingWhatsAppButton onOpenQuickWhatsApp={setHandoffPayload} />

      <WhatsAppHandoffModal
        payload={handoffPayload}
        whatsappNumber={siteConfig.whatsappNumber}
        onClose={() => setHandoffPayload(null)}
        onOpenLinkSettings={() => setIsConfigOpen(true)}
      />

      <SiteConfigModal
        isOpen={isConfigOpen}
        config={siteConfig}
        onSave={handleSaveSiteConfig}
        onClose={() => setIsConfigOpen(false)}
      />
    </div>
  );
}

export default App;
