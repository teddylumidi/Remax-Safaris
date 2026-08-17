import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { PHONE_NUMBER_DISPLAY, COMPANY_EMAIL, getWhatsAppLink } from '../utils/whatsapp';
import { CurrencySelector } from './CurrencySelector';
import { LanguageSelector } from './LanguageSelector';
import { ThemeToggle } from './ThemeToggle';
import { WhatsAppIcon } from './WhatsAppIcon';
import { TikTokIcon } from './TikTokIcon';
import { Search, X, Instagram, Facebook, Youtube, Phone, Mail } from 'lucide-react';

interface NavbarProps {
  onOpenQuoteBuilder: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenQuoteBuilder,
  activeSection,
  setActiveSection
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setOverlayOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchOpen(false);
    const query = searchQuery.toLowerCase();
    
    // Smooth scroll to relevant section based on search query
    if (query.includes('quote') || query.includes('book') || query.includes('enquire') || query.includes('price')) {
      onOpenQuoteBuilder();
    } else if (query.includes('package') || query.includes('tour') || query.includes('migration')) {
      const el = document.getElementById('packages');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      const el = document.getElementById('destinations');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setSearchQuery('');
  };

  return (
    <>
      {/* 1. Primary Absolute Header sitting on top of the Hero Video (Sirikoi Style) */}
      <header className="absolute top-0 left-0 right-0 z-30 bg-[#E9E5E1]/90 dark:bg-[#0A120E]/90 backdrop-blur-md border-b border-[#E8E2D6]/70 dark:border-[#1E3025] px-4 sm:px-8 py-2.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left Navigation Links with Eyebrow labels */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <button
              onClick={() => handleNavClick('the-experience')}
              className="text-left group"
            >
              <small className="block text-[10px] uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400 font-sans group-hover:text-[#C88A4B] transition-colors">
                Explore
              </small>
              <span className="text-xs lg:text-sm uppercase tracking-[0.15em] font-medium text-[#12231A] dark:text-[#FDFBF7] group-hover:text-[#C88A4B] transition-colors">
                The Lodge
              </span>
            </button>

            <button
              onClick={() => handleNavClick('what-awaits')}
              className="text-left group"
            >
              <small className="block text-[10px] uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400 font-sans group-hover:text-[#C88A4B] transition-colors">
                Remax
              </small>
              <span className="text-xs lg:text-sm uppercase tracking-[0.15em] font-medium text-[#12231A] dark:text-[#FDFBF7] group-hover:text-[#C88A4B] transition-colors">
                Experiences
              </span>
            </button>

            <button
              onClick={() => handleNavClick('destinations')}
              className="text-left group"
            >
              <small className="block text-[10px] uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400 font-sans group-hover:text-[#C88A4B] transition-colors">
                About us
              </small>
              <span className="text-xs lg:text-sm uppercase tracking-[0.15em] font-medium text-[#12231A] dark:text-[#FDFBF7] group-hover:text-[#C88A4B] transition-colors">
                Our Legend
              </span>
            </button>
          </nav>

          {/* Center Brand Logo */}
          <div className="logo flex justify-center py-1">
            <a href="#" className="flex items-center gap-2">
              <Logo size="md" variant="color" />
            </a>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Currency & Language selector */}
            <div className="hidden xl:flex items-center gap-2">
              <CurrencySelector />
              <LanguageSelector />
              <ThemeToggle className="scale-90" />
            </div>

            {/* Enquire Now Button */}
            <button
              onClick={onOpenQuoteBuilder}
              className="sirikoi-button hidden sm:inline-block"
            >
              Enquire Now
            </button>

            {/* Search Icon */}
            <div className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-stone-700 dark:text-stone-300 hover:text-[#C88A4B] transition-colors"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              {searchOpen && (
                <form
                  onSubmit={handleSearchSubmit}
                  className="absolute right-0 top-10 w-72 bg-white dark:bg-[#12231A] border border-[#E8E2D6] dark:border-[#1E3025] shadow-2xl p-2 z-50 flex items-center gap-2 rounded"
                >
                  <input
                    type="search"
                    placeholder="Search safaris, destinations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-xs px-2 py-1.5 bg-transparent border-none focus:outline-none text-stone-800 dark:text-stone-100"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-3 py-1 bg-[#C88A4B] text-white text-[11px] uppercase tracking-wider font-semibold rounded"
                  >
                    Search
                  </button>
                </form>
              )}
            </div>

            {/* Burger Menu Trigger */}
            <button
              onClick={() => setOverlayOpen(true)}
              className="flex flex-col justify-center items-center gap-1.5 p-2 group"
              aria-label="Open Menu"
            >
              <span className="block w-6 h-[2px] bg-stone-700 dark:bg-stone-300 group-hover:bg-[#C88A4B] transition-colors" />
              <span className="block w-6 h-[2px] bg-stone-700 dark:bg-stone-300 group-hover:bg-[#C88A4B] transition-colors" />
              <span className="block w-6 h-[2px] bg-stone-700 dark:bg-stone-300 group-hover:bg-[#C88A4B] transition-colors" />
            </button>
          </div>

        </div>
      </header>

      {/* 2. Floating Sticky Navigation on Scroll (Sirikoi .nav-scroll) */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 bg-[#FAF6F0]/95 dark:bg-[#0A120E]/95 backdrop-blur-md border-b border-[#E8E2D6] dark:border-[#1E3025] px-4 sm:px-8 py-2.5 transition-all duration-500 shadow-md ${
          isScrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Scroll Nav Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavClick('the-experience')}
              className="text-xs uppercase tracking-[0.2em] font-medium text-stone-800 dark:text-stone-200 hover:text-[#C88A4B] transition-colors"
            >
              The Lodge
            </button>
            <button
              onClick={() => handleNavClick('what-awaits')}
              className="text-xs uppercase tracking-[0.2em] font-medium text-stone-800 dark:text-stone-200 hover:text-[#C88A4B] transition-colors"
            >
              Experiences
            </button>
            <button
              onClick={() => handleNavClick('destinations')}
              className="text-xs uppercase tracking-[0.2em] font-medium text-stone-800 dark:text-stone-200 hover:text-[#C88A4B] transition-colors"
            >
              Our Legend
            </button>
          </nav>

          {/* Logo Center */}
          <div className="logo flex justify-center">
            <a href="#" className="flex items-center gap-2">
              <Logo size="sm" variant="color" />
            </a>
          </div>

          {/* Right Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenQuoteBuilder}
              className="sirikoi-button text-[10px] py-2 px-6"
            >
              Enquire Now
            </button>

            <button
              onClick={() => setOverlayOpen(true)}
              className="flex flex-col justify-center items-center gap-1.5 p-2 group"
              aria-label="Open Menu"
            >
              <span className="block w-6 h-[2px] bg-stone-700 dark:bg-stone-300 group-hover:bg-[#C88A4B] transition-colors" />
              <span className="block w-6 h-[2px] bg-stone-700 dark:bg-stone-300 group-hover:bg-[#C88A4B] transition-colors" />
              <span className="block w-6 h-[2px] bg-stone-700 dark:bg-stone-300 group-hover:bg-[#C88A4B] transition-colors" />
            </button>
          </div>

        </div>
      </div>

      {/* 3. Full-Screen Overlay Menu (Sirikoi .overlay-menu architecture) */}
      {overlayOpen && (
        <div className="fixed inset-0 z-50 bg-[#12231A] text-[#FAF6F0] flex flex-col justify-between p-6 sm:p-12 md:p-16 animate-fade-in overflow-y-auto">
          
          {/* Close Button */}
          <div className="flex justify-between items-center pb-6 border-b border-white/10">
            <Logo size="md" variant="light" />
            <button
              onClick={() => setOverlayOpen(false)}
              className="p-2.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              aria-label="Close Menu"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          {/* Split Content: Left Accommodations & Right Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-10 flex-1 items-center max-w-6xl mx-auto w-full">
            
            {/* Left Column: Accommodations / Lodges */}
            <div className="md:col-span-5 space-y-4 md:border-r border-white/10 md:pr-10">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#C88A4B] font-semibold block mb-4">
                Accommodations
              </span>
              <ul className="space-y-4 font-serif text-xl sm:text-2xl font-light">
                <li>
                  <button
                    onClick={() => handleNavClick('the-experience')}
                    className="hover:text-[#C88A4B] transition-colors text-left"
                  >
                    Remax Safari House
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick('the-experience')}
                    className="hover:text-[#C88A4B] transition-colors text-left"
                  >
                    Private Safari Cottages
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick('the-experience')}
                    className="hover:text-[#C88A4B] transition-colors text-left"
                  >
                    Remax Luxury Tents
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick('destinations')}
                    className="hover:text-[#C88A4B] transition-colors text-left"
                  >
                    Private Bush Villas
                  </button>
                </li>
              </ul>
            </div>

            {/* Right Column: Main Navigation Links */}
            <div className="md:col-span-7 space-y-6 md:pl-10">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 text-xs sm:text-sm uppercase tracking-[0.2em] font-medium text-stone-300">
                <li>
                  <button
                    onClick={() => handleNavClick('banner')}
                    className="hover:text-[#C88A4B] transition-colors py-1"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick('what-awaits')}
                    className="hover:text-[#C88A4B] transition-colors py-1"
                  >
                    Experiences
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick('the-experience')}
                    className="hover:text-[#C88A4B] transition-colors py-1"
                  >
                    Our Legend
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick('impact')}
                    className="hover:text-[#C88A4B] transition-colors py-1"
                  >
                    Our Impact
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick('destinations')}
                    className="hover:text-[#C88A4B] transition-colors py-1"
                  >
                    Destinations
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick('packages')}
                    className="hover:text-[#C88A4B] transition-colors py-1"
                  >
                    Tour Packages
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick('why-remax')}
                    className="hover:text-[#C88A4B] transition-colors py-1"
                  >
                    Why Remax
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setOverlayOpen(false);
                      onOpenQuoteBuilder();
                    }}
                    className="hover:text-[#C88A4B] transition-colors py-1 text-[#C88A4B] font-bold"
                  >
                    Plan Your Journey
                  </button>
                </li>
              </ul>

              {/* Bottom Actions inside Overlay */}
              <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <button
                  onClick={() => {
                    setOverlayOpen(false);
                    onOpenQuoteBuilder();
                  }}
                  className="sirikoi-button outline text-white border-white/40 hover:border-[#C88A4B]"
                >
                  Enquire Now
                </button>

                {/* Social icons */}
                <div className="flex items-center gap-4 text-stone-300">
                  <a
                    href="https://www.instagram.com/remax_safaris?utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#C88A4B] transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@remax.safaris?_r=1&_t=ZS-98m1ynGAZE7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#C88A4B] transition-colors"
                    aria-label="TikTok"
                  >
                    <TikTokIcon className="w-5 h-5" />
                  </a>
                  <a
                    href={getWhatsAppLink('Hello Remax Safaris!')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#25D366] transition-colors"
                    aria-label="WhatsApp"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Bar in Overlay */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 font-light gap-2">
            <div className="flex items-center gap-4">
              <span>{PHONE_NUMBER_DISPLAY}</span>
              <span>•</span>
              <span>{COMPANY_EMAIL}</span>
            </div>
            <p>© {new Date().getFullYear()} Remax Safaris Kenya.</p>
          </div>

        </div>
      )}
    </>
  );
};
