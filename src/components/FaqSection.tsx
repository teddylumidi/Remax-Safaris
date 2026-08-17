import React, { useState } from 'react';
import { WhatsAppIcon } from './WhatsAppIcon';
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Compass,
  CreditCard,
  Plane,
  ShieldCheck,
  Search,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { getWhatsAppLink, PHONE_NUMBER_DISPLAY } from '../utils/whatsapp';

interface FAQItem {
  id: string;
  category: 'visas' | 'booking' | 'safaris' | 'international' | 'health';
  question: string;
  answer: string;
  keyPoints?: string[];
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'eta-requirements',
    category: 'visas',
    question: 'What are the visa and entry requirements for traveling to Kenya?',
    answer: 'Kenya replaced traditional visas with an Electronic Travel Authorization (eTA) system. All foreign visitors (including infants) must apply for a Kenya eTA online at least 3 to 7 days before departure.',
    keyPoints: [
      'eTA application requires a valid passport (minimum 6 months validity)',
      'Digital passport photo & flight itinerary confirmation required',
      'Remax Safaris offers full assistance with eTA submissions and document verification'
    ]
  },
  {
    id: 'passport-assistance',
    category: 'visas',
    question: 'Can Remax Safaris assist with Passport Applications and Renewals?',
    answer: 'Yes! We provide step-by-step guidance for Kenyan citizen passport applications and renewals via eCitizen. Our team ensures all uploaded documents, photo specs, and payment receipts are compliant, and helps schedule biometrics appointments at immigration offices.',
    keyPoints: [
      'New passport & renewal guidance on eCitizen',
      'Document & photo compliance verification',
      'Appointment scheduling and urgent processing advice'
    ]
  },
  {
    id: 'how-to-book',
    category: 'booking',
    question: 'How do I book a tour package or custom safari with Remax Safaris?',
    answer: 'Booking is simple! You can use our Custom Quote Builder on the website or message us directly on WhatsApp (0795 723 450). Once we agree on your preferred itinerary, dates, and lodge preference, we issue a formal booking voucher and invoice.',
    keyPoints: [
      'Instant quotes generated via WhatsApp or online form',
      'Dedicated safari consultant assigned to your booking',
      'Flexible dates and tailor-made itinerary adjustments available'
    ]
  },
  {
    id: 'payment-methods',
    category: 'booking',
    question: 'What payment methods do you accept, and what are the deposit terms?',
    answer: 'We accept M-Pesa (Till/Paybill), Bank Wire Transfers, and major credit/debit cards. To secure lodge reservations and safari vehicles, a 30% deposit is required at booking, with the remaining balance payable before or upon departure.',
    keyPoints: [
      'M-Pesa, Bank Wire Transfer & Credit/Debit Cards accepted',
      '30% deposit to lock in accommodation and 4x4 Land Cruiser',
      'Transparent pricing in both KES and USD with no hidden fees'
    ]
  },
  {
    id: 'safari-vehicles',
    category: 'safaris',
    question: 'What type of safari vehicles do you use for game drives?',
    answer: 'Our wildlife safaris are conducted in customized 4x4 Toyota Safari Land Cruisers equipped with pop-up roofs for 360-degree photography, UHF long-range radios, cooler boxes for cold drinks, device charging ports, and certified professional driver-guides.',
    keyPoints: [
      '4x4 Land Cruisers with pop-up roofs for panoramic viewing',
      'Guaranteed window seat for every traveler',
      'Experienced driver-guides fluent in wildlife behavior and English/Swahili'
    ]
  },
  {
    id: 'safari-inclusions',
    category: 'safaris',
    question: 'What is included in Remax Safaris tour packages?',
    answer: 'Our standard safari packages are all-inclusive: full-board lodge/camp accommodation (breakfast, lunch, dinner), all national park entry fees, unlimited game drives in 4x4 Land Cruisers, mineral water, and Nairobi airport/hotel transfers.',
    keyPoints: [
      'Full-board accommodation (Luxury lodges or tented camps)',
      'All national park & game reserve entrance fees included',
      'Airport pick-up, drop-off, and bottled drinking water throughout'
    ]
  },
  {
    id: 'international-packages',
    category: 'international',
    question: 'Do you offer international holiday packages and flight ticketing?',
    answer: 'Yes! Remax Safaris manages outbound travel to popular global destinations including Dubai, Zanzibar, South Africa, Bali, and Egypt. We handle international flight ticketing, hotel vouchers, airport transfers, and visa advisory.',
    keyPoints: [
      'All-inclusive packages to Dubai, Zanzibar, Cape Town & Asia',
      'Flight reservations & competitive airline ticket fares',
      'Comprehensive hotel booking and guided city tours'
    ]
  },
  {
    id: 'health-vaccines',
    category: 'health',
    question: 'Are vaccinations or Yellow Fever certificates required for Kenya safaris?',
    answer: 'A Yellow Fever vaccination certificate is mandatory if you are arriving from or in transit through countries with risk of yellow fever transmission. Routine vaccines are recommended, and preventative malaria medication is advised when visiting game parks or coastal regions.',
    keyPoints: [
      'Yellow Fever certificate required if coming from endemic zones',
      'Malaria prophylaxis recommended for park and beach travel',
      'Flying Doctors emergency medical evacuation coverage can be added'
    ]
  },
  {
    id: 'cancellation-policy',
    category: 'booking',
    question: 'What is your cancellation and amendment policy?',
    answer: 'We understand travel plans can shift. Cancellations made 30+ days prior to travel receive a full refund minus administrative and non-refundable lodge deposit fees. Bookings can also be postponed to future dates without penalty subject to lodge availability.',
    keyPoints: [
      'Flexible rescheduling for unforeseen travel changes',
      'Full refund minus lodge deposit fees for cancellations 30+ days prior',
      'Comprehensive travel insurance strongly recommended'
    ]
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All FAQs', icon: HelpCircle },
  { id: 'visas', label: 'Visas & Passports', icon: FileText },
  { id: 'booking', label: 'Booking & Payment', icon: CreditCard },
  { id: 'safaris', label: 'Safari Experience', icon: Compass },
  { id: 'international', label: 'Global Vacations', icon: Plane },
  { id: 'health', label: 'Health & Requirements', icon: ShieldCheck }
];

export const FaqSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openFaqId, setOpenFaqId] = useState<string | null>('eta-requirements');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const filteredFaqs = FAQ_DATA.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (faq.keyPoints && faq.keyPoints.some((kp) => kp.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#F4F1EA] dark:bg-slate-950 border-t border-b border-gray-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-10">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="inline-block px-3.5 py-1 rounded-md bg-[#1B4332] text-white text-[10px] font-black uppercase tracking-[0.25em]">
            Got Questions? We Have Answers
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-[#1B4332] dark:text-emerald-400">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-slate-300 text-sm sm:text-base">
            Essential travel guidelines covering Kenya eTA visas, passport assistance, safari bookings, 4x4 vehicles, and international travel requirements.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative max-w-xl mx-auto">
            <Search className="w-5 h-5 text-gray-400 dark:text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. visa, 4x4 cruiser, deposit, eCitizen)..."
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-800 focus:border-[#1B4332] dark:focus:border-emerald-500 focus:ring-2 focus:ring-[#1B4332]/20 text-sm text-gray-900 dark:text-slate-100 shadow-sm focus:outline-none transition-all"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-2 flex-wrap pt-2">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#1B4332] text-white shadow-md'
                      : 'bg-white dark:bg-slate-900 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 border border-gray-200 dark:border-slate-800'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#D4A373]' : 'text-[#1B4332] dark:text-emerald-400'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all overflow-hidden ${
                    isOpen ? 'border-[#1B4332] dark:border-emerald-500 shadow-md ring-1 ring-[#1B4332]/10' : 'border-gray-200 dark:border-slate-800 hover:border-gray-300 dark:hover:border-slate-700'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left font-serif font-bold text-base sm:text-lg text-[#1B4332] dark:text-emerald-400 hover:text-[#2D5A46] dark:hover:text-emerald-300 transition-colors"
                  >
                    <span className="flex items-start gap-3">
                      <HelpCircle className="w-5 h-5 text-[#D4A373] shrink-0 mt-0.5" />
                      <span>{faq.question}</span>
                    </span>
                    <span className="p-1 rounded-full bg-[#F4F1EA] dark:bg-slate-800 text-[#1B4332] dark:text-emerald-400 shrink-0">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-gray-600 dark:text-slate-300 text-sm leading-relaxed space-y-4 border-t border-gray-100 dark:border-slate-800 animate-in fade-in duration-200">
                      <p className="pl-8 text-gray-700 dark:text-slate-200 font-medium">
                        {faq.answer}
                      </p>

                      {faq.keyPoints && faq.keyPoints.length > 0 && (
                        <div className="ml-8 p-4 rounded-xl bg-[#F4F1EA]/70 dark:bg-slate-800/70 border border-gray-200 dark:border-slate-700 space-y-2">
                          <span className="text-[10px] font-black uppercase tracking-wider text-[#D4A373] block">
                            Key Highlights:
                          </span>
                          <ul className="space-y-1.5 text-xs text-gray-700 dark:text-slate-300">
                            {faq.keyPoints.map((point, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-[#1B4332] dark:text-emerald-400 shrink-0 mt-0.5" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 space-y-3">
              <HelpCircle className="w-10 h-10 text-gray-300 dark:text-slate-600 mx-auto" />
              <p className="text-gray-600 dark:text-slate-300 text-sm font-semibold">
                No questions found matching "{searchQuery}".
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="text-xs font-bold text-[#1B4332] dark:text-emerald-400 underline hover:text-[#D4A373]"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        {/* WhatsApp Direct Inquiry Banner */}
        <div className="bg-[#1B4332] text-white p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <span className="text-[10px] text-[#D4A373] font-black uppercase tracking-[0.2em] block">
              Direct Travel Advisory
            </span>
            <h3 className="text-xl font-serif font-bold text-white">
              Have specific questions about your upcoming trip?
            </h3>
            <p className="text-xs text-gray-200">
              Speak directly with Remax Safaris consultants for personalized visa, itinerary, or booking guidance.
            </p>
          </div>

          <a
            href={getWhatsAppLink('Hello Remax Safaris, I have a travel inquiry regarding visas, bookings, or safari packages.')}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all shrink-0 w-full sm:w-auto"
          >
            <WhatsAppIcon className="w-4 h-4 text-white" />
            <span>Ask Us on WhatsApp ({PHONE_NUMBER_DISPLAY})</span>
          </a>
        </div>

      </div>
    </section>
  );
};
