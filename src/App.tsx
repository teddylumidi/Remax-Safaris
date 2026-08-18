import React, { useState, lazy, Suspense } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { ImageLightboxProvider } from './context/ImageLightboxContext';
import { SeoHead } from './components/SeoHead';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SirikoiWelcome } from './components/SirikoiWelcome';
import { SirikoiExperience } from './components/SirikoiExperience';
import { SirikoiAwaits } from './components/SirikoiAwaits';
import { SirikoiImpact } from './components/SirikoiImpact';
import { SirikoiWhySection } from './components/SirikoiWhySection';
import { SirikoiBucketList } from './components/SirikoiBucketList';
import { DestinationsGrid } from './components/DestinationsGrid';
import { PackagesGrid } from './components/PackagesGrid';
import { ServicesSection } from './components/ServicesSection';
import { UaeCitiesModal } from './components/UaeCitiesModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ScrollToTop } from './components/ScrollToTop';
import { Footer } from './components/Footer';

// Lazy-loaded secondary components for optimal performance
const DestinationDetailModal = lazy(() => import('./components/DestinationDetailModal').then(m => ({ default: m.DestinationDetailModal })));
const PackageDetailModal = lazy(() => import('./components/PackageDetailModal').then(m => ({ default: m.PackageDetailModal })));
const PhotoGallerySection = lazy(() => import('./components/PhotoGallerySection').then(m => ({ default: m.PhotoGallerySection })));
const FaqSection = lazy(() => import('./components/FaqSection').then(m => ({ default: m.FaqSection })));
const CustomQuoteBuilder = lazy(() => import('./components/CustomQuoteBuilder').then(m => ({ default: m.CustomQuoteBuilder })));

import { DESTINATIONS } from './data/destinations';
import { TOUR_PACKAGES } from './data/packages';
import { Destination, TourPackage } from './types';

function MainAppContent() {
  const [activeSection, setActiveSection] = useState('destinations');
  
  // Modals state
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<TourPackage | null>(null);
  const [isUaeModalOpen, setIsUaeModalOpen] = useState(false);

  // Quote builder initial pre-fills
  const [quoteDestination, setQuoteDestination] = useState('');
  const [quoteService, setQuoteService] = useState('Full Safari / Tour Package');

  const handleSelectDestinationById = (destId: string) => {
    if (destId === 'dubai' || destId === 'dubai-skyline' || destId === 'uae') {
      setIsUaeModalOpen(true);
      return;
    }
    const found = DESTINATIONS.find((d) => d.id === destId);
    if (found) {
      setSelectedDestination(found);
    }
  };

  const handleSelectPackageById = (packageId: string) => {
    const found = TOUR_PACKAGES.find((p) => p.id === packageId);
    if (found) {
      setSelectedPackage(found);
    }
  };

  const handleOpenQuoteForDestination = (destName: string) => {
    setQuoteDestination(destName);
    setQuoteService('Full Safari / Tour Package');
    const el = document.getElementById('custom-quote');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenQuoteForPackage = (pkgTitle: string) => {
    setQuoteDestination(pkgTitle);
    setQuoteService('Full Safari / Tour Package');
    const el = document.getElementById('custom-quote');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenQuoteGeneral = () => {
    const el = document.getElementById('custom-quote');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] dark:bg-[#070D09] text-stone-900 dark:text-stone-100 flex flex-col font-sans selection:bg-[#C88A4B]/30 selection:text-stone-900 transition-colors duration-300">
      
      {/* Dynamic SEO Meta Tags & Structured Data */}
      <SeoHead
        selectedDestination={selectedDestination}
        selectedPackage={selectedPackage}
        activeSection={activeSection}
      />

      {/* Luxury Navigation Header */}
      <Navbar
        onOpenQuoteBuilder={handleOpenQuoteGeneral}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Luxury Landing Page Flow (Guided by Sirikoi UI/UX Architecture) */}
      <main className="flex-1">
        {/* Page 1: Continuous Randomized Autoplay Video Feed */}
        <Hero
          onSelectDestination={handleSelectDestinationById}
          onOpenQuoteBuilder={handleOpenQuoteGeneral}
          onOpenUaeCities={() => setIsUaeModalOpen(true)}
        />

        {/* Page 1 Flow: Welcome to Remax Safaris Framed Box & Story */}
        <SirikoiWelcome
          onExploreMore={() => {
            const el = document.getElementById('destinations');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Page 2 Flow: THE REMAX EXPERIENCE (3 Tall Signature Cards) */}
        <SirikoiExperience
          onSelectExperience={(type) => {
            const el = document.getElementById('destinations');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenUaeCities={() => setIsUaeModalOpen(true)}
        />

        {/* Page 3 Flow: WHAT AWAITS YOU AT REMAX SAFARIS (4 Horizontal Interactive Cards) */}
        <SirikoiAwaits
          onSelectCard={(category) => {
            const el = document.getElementById('packages');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenUaeCities={() => setIsUaeModalOpen(true)}
        />

        {/* Page 4 Flow: TRULY EXCEPTIONAL LOCATION & OUR IMPACT */}
        <SirikoiImpact
          onExploreLocation={() => {
            const el = document.getElementById('destinations');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onExploreImpact={handleOpenQuoteGeneral}
        />

        {/* Page 5 Flow: WHY REMAX SAFARIS (Terracotta Banner with 8 Icons & GUEST REVIEWS) */}
        <SirikoiWhySection />

        {/* Page 6 Flow: ADD REMAX SAFARIS TO YOUR BUCKET LIST */}
        <SirikoiBucketList
          onEnquireNow={handleOpenQuoteGeneral}
        />

        {/* Full Destinations Grid Portfolio */}
        <DestinationsGrid
          onSelectDestination={handleSelectDestinationById}
          onOpenQuoteForDestination={handleOpenQuoteForDestination}
        />

        {/* Curated Tour Packages Grid */}
        <PackagesGrid
          onSelectPackage={(pkg) => setSelectedPackage(pkg)}
        />

        {/* Full Travel Services (Passport, Visa, Ticketing, Transfers, Charters) */}
        <ServicesSection />

        <Suspense fallback={null}>
          {/* Guest Video Reels Showcase */}

          {/* Interactive Media & Destination Photo Gallery */}
          <PhotoGallerySection />

          {/* Frequently Asked Questions (FAQ) Accordion */}
          <FaqSection />

          {/* Custom Quote & Itinerary Builder */}
          <CustomQuoteBuilder
            initialDestination={quoteDestination}
            initialService={quoteService}
          />
        </Suspense>
      </main>

      {/* Page 7 Flow: Refined Sirikoi-Style Luxury Footer */}
      <Footer
        onSelectDestination={handleSelectDestinationById}
        onOpenQuoteBuilder={handleOpenQuoteGeneral}
      />

      {/* UAE Cities & Arabian Marvels Modal (Dubai Burj Khalifa, Abu Dhabi, Marina, Palm Jumeirah) */}
      <UaeCitiesModal
        isOpen={isUaeModalOpen}
        onClose={() => setIsUaeModalOpen(false)}
        onOpenQuote={(title) => handleOpenQuoteForDestination(title)}
      />

      {/* Destination & Package Detail Modals */}
      <Suspense fallback={null}>
        <DestinationDetailModal
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
          onOpenQuoteForDestination={handleOpenQuoteForDestination}
          onSelectPackage={handleSelectPackageById}
        />

        <PackageDetailModal
          packageData={selectedPackage}
          onClose={() => setSelectedPackage(null)}
          onOpenQuoteForPackage={handleOpenQuoteForPackage}
        />
      </Suspense>

      {/* Persistent WhatsApp Floating Button */}
      <FloatingWhatsApp />

      {/* Smooth Scroll To Top Button */}
      <ScrollToTop />
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <CurrencyProvider>
          <ImageLightboxProvider>
            <MainAppContent />
          </ImageLightboxProvider>
        </CurrencyProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
