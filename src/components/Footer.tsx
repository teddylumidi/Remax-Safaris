import React, { useState } from 'react';
import { Logo } from './Logo';
import { PHONE_NUMBER_DISPLAY, COMPANY_EMAIL, getWhatsAppLink } from '../utils/whatsapp';
import { WhatsAppIcon } from './WhatsAppIcon';
import { TikTokIcon } from './TikTokIcon';
import { Phone, Mail, Instagram, Facebook, Youtube, CheckCircle, X } from 'lucide-react';

interface FooterProps {
  onSelectDestination: (destId: string) => void;
  onOpenQuoteBuilder: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectDestination, onOpenQuoteBuilder }) => {
  const [newsletterOpen, setNewsletterOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setNewsletterOpen(false);
      setIsSubscribed(false);
      setEmail('');
      setFirstName('');
    }, 2500);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <footer className="bg-[#12231A] text-[#FAF6F0] pt-20 pb-12 border-t border-[#1E3025]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-16">
          
          {/* Main 5-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 items-start">
            
            {/* Col 1: LODGE */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-[0.25em] font-serif font-bold text-[#C88A4B] border-b border-white/10 pb-2">
                LODGE
              </h3>
              <ul className="space-y-2 text-xs text-stone-300 font-light">
                <li>
                  <button onClick={() => scrollToSection('the-experience')} className="hover:text-[#C88A4B] transition-colors">
                    Remax Safari House
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('the-experience')} className="hover:text-[#C88A4B] transition-colors">
                    Remax Safari Cottage
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('the-experience')} className="hover:text-[#C88A4B] transition-colors">
                    Luxury Safari Tents
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('destinations')} className="hover:text-[#C88A4B] transition-colors">
                    Private Bush Villas
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 2: EXPERIENCES */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-[0.25em] font-serif font-bold text-[#C88A4B] border-b border-white/10 pb-2">
                EXPERIENCES
              </h3>
              <ul className="space-y-2 text-xs text-stone-300 font-light">
                <li>
                  <button onClick={() => scrollToSection('what-awaits')} className="hover:text-[#C88A4B] transition-colors">
                    Safari Adventures
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('what-awaits')} className="hover:text-[#C88A4B] transition-colors">
                    Wildlife Encounters
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('what-awaits')} className="hover:text-[#C88A4B] transition-colors">
                    Cultural Experiences
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('what-awaits')} className="hover:text-[#C88A4B] transition-colors">
                    Conservation in Action
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('what-awaits')} className="hover:text-[#C88A4B] transition-colors">
                    Farm to Table Dining
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('what-awaits')} className="hover:text-[#C88A4B] transition-colors">
                    Relax & Unwind
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: CENTER BRAND LOGO */}
            <div className="flex flex-col items-center justify-center text-center space-y-4 py-4 sm:col-span-2 lg:col-span-1">
              <Logo size="lg" variant="light" />
              <p className="text-[11px] text-stone-400 font-light leading-relaxed max-w-[200px]">
                Premier Kenya safari lodge curator & bespoke travel consultancy.
              </p>
            </div>

            {/* Col 4: ABOUT REMAX SAFARIS */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-[0.25em] font-serif font-bold text-[#C88A4B] border-b border-white/10 pb-2">
                ABOUT REMAX
              </h3>
              <ul className="space-y-2 text-xs text-stone-300 font-light">
                <li>
                  <button onClick={onOpenQuoteBuilder} className="hover:text-[#C88A4B] transition-colors font-medium text-[#C88A4B]">
                    Plan Your Journey
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('destinations')} className="hover:text-[#C88A4B] transition-colors">
                    Our Legend & Story
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('impact')} className="hover:text-[#C88A4B] transition-colors">
                    Our Impact
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('destinations')} className="hover:text-[#C88A4B] transition-colors">
                    Destinations
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('why-remax')} className="hover:text-[#C88A4B] transition-colors">
                    Awards & Honors
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('faq')} className="hover:text-[#C88A4B] transition-colors">
                    Safari FAQs
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 5: CONTACT & NEWSLETTER */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-[0.25em] font-serif font-bold text-[#C88A4B] border-b border-white/10 pb-2">
                CONTACT
              </h3>
              <ul className="space-y-2.5 text-xs text-stone-300 font-light">
                <li>
                  <a href={`mailto:${COMPANY_EMAIL}`} className="hover:text-[#C88A4B] transition-colors flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#C88A4B]" />
                    <span>{COMPANY_EMAIL}</span>
                  </a>
                </li>
                <li>
                  <a href={`tel:+254795723450`} className="hover:text-[#C88A4B] transition-colors flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#C88A4B]" />
                    <span>{PHONE_NUMBER_DISPLAY}</span>
                  </a>
                </li>
                <li>
                  <button onClick={onOpenQuoteBuilder} className="text-[#C88A4B] hover:underline font-medium">
                    Enquire Now
                  </button>
                </li>
              </ul>

              {/* Newsletter Trigger */}
              <div className="pt-2">
                <button
                  onClick={() => setNewsletterOpen(true)}
                  className="text-xs text-[#C88A4B] hover:text-white underline tracking-wider font-medium"
                >
                  Sign up to our newsletter
                </button>
              </div>

              {/* Social Channels */}
              <div className="pt-2 flex items-center gap-3">
                <a
                  href="https://www.instagram.com/remax_safaris?utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C88A4B] text-white flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.tiktok.com/@remax.safaris?_r=1&_t=ZS-98m1ynGAZE7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C88A4B] text-white flex items-center justify-center transition-colors"
                  aria-label="TikTok"
                >
                  <TikTokIcon className="w-4 h-4" />
                </a>
                <a
                  href={getWhatsAppLink('Hello Remax Safaris!')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center transition-colors"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                </a>
              </div>

            </div>

          </div>

          {/* Copyright & Disclaimer Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 font-light gap-4">
            <p>© {new Date().getFullYear()} Remax Safaris | Privacy Policy | Terms & Conditions</p>
            <p>Designed for Remax Safaris & Bespoke Travel Consultancy</p>
          </div>

        </div>
      </footer>

      {/* Newsletter Modal Dialog */}
      {newsletterOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF6F0] dark:bg-[#12231A] border border-[#C88A4B] max-w-md w-full p-8 text-center relative shadow-2xl animate-fade-in">
            <button
              onClick={() => setNewsletterOpen(false)}
              className="absolute top-4 right-4 text-stone-500 hover:text-stone-900 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex justify-center mb-4">
              <Logo size="md" variant="color" />
            </div>

            <h3 className="text-xl font-serif font-normal text-[#12231A] dark:text-[#FDFBF7] mb-2">
              Sign up for Remax Safaris Newsletter
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 font-light mb-6">
              Stay informed about the latest wildlife encounters, seasonal migrations, and bespoke safari journeys.
            </p>

            {isSubscribed ? (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 text-xs rounded flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Thank you for subscribing to our newsletter!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                    className="w-full text-xs px-3 py-2 border border-stone-300 dark:border-stone-700 rounded bg-white dark:bg-stone-900 text-stone-900 dark:text-white focus:outline-none focus:border-[#C88A4B]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourname@domain.com"
                    className="w-full text-xs px-3 py-2 border border-stone-300 dark:border-stone-700 rounded bg-white dark:bg-stone-900 text-stone-900 dark:text-white focus:outline-none focus:border-[#C88A4B]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sirikoi-button"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
