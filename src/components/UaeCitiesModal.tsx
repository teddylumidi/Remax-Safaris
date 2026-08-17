import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Sparkles, Compass, CheckCircle2, MessageSquare, Phone } from 'lucide-react';
import { UAE_CITIES_COLLECTION, UaeCityImage } from '../data/uaeCities';
import { SafeImage } from './SafeImage';
import { getWhatsAppLink, PHONE_NUMBER_DISPLAY } from '../utils/whatsapp';

interface UaeCitiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuote?: (cityName: string) => void;
  initialCityId?: string;
}

export const UaeCitiesModal: React.FC<UaeCitiesModalProps> = ({
  isOpen,
  onClose,
  onOpenQuote,
  initialCityId
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(() => {
    if (initialCityId) {
      const idx = UAE_CITIES_COLLECTION.findIndex(c => c.id === initialCityId);
      return idx !== -1 ? idx : 0;
    }
    return 0;
  });

  if (!isOpen) return null;

  const currentItem: UaeCityImage = UAE_CITIES_COLLECTION[selectedIndex] || UAE_CITIES_COLLECTION[0];

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % UAE_CITIES_COLLECTION.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + UAE_CITIES_COLLECTION.length) % UAE_CITIES_COLLECTION.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md transition-opacity">
      <div 
        className="relative w-full max-w-5xl bg-[#FAF7F2] dark:bg-[#0D1812] border border-[#E8E2D6] dark:border-[#1E3025] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#12231A] dark:bg-[#060D09] text-white border-b border-[#243A2C]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#C88A4B]/20 border border-[#C88A4B] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#C88A4B]" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C88A4B] font-semibold block">
                Exclusive Destination Portfolio
              </span>
              <h3 className="text-base sm:text-lg font-serif font-medium tracking-wide">
                UAE Cities & Arabian Marvels
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close UAE Cities Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-6">
          {/* Main Showcase Hero Image */}
          <div className="relative aspect-[16/9] w-full bg-stone-900 overflow-hidden border border-[#E8E2D6] dark:border-[#1E3025]">
            <SafeImage
              src={currentItem.image}
              alt={currentItem.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* City Tag */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 border border-white/20 text-white text-xs uppercase tracking-widest font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#C88A4B]" />
              <span>{currentItem.city} • {currentItem.category}</span>
            </div>

            {/* Prev/Next arrows on image */}
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[#C88A4B] text-white flex items-center justify-center backdrop-blur-sm transition-all shadow-md"
              aria-label="Previous city"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[#C88A4B] text-white flex items-center justify-center backdrop-blur-sm transition-all shadow-md"
              aria-label="Next city"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Title & Caption over image bottom */}
            <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 text-white space-y-1">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-normal">
                {currentItem.title}
              </h2>
              <p className="text-xs sm:text-sm text-stone-200 font-light max-w-3xl leading-relaxed">
                {currentItem.caption}
              </p>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="grid grid-cols-5 gap-2 sm:gap-3">
            {UAE_CITIES_COLLECTION.map((item, idx) => {
              const isCurrent = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedIndex(idx)}
                  className={`relative aspect-[16/10] overflow-hidden transition-all duration-300 border-2 ${
                    isCurrent 
                      ? 'border-[#C88A4B] scale-105 shadow-md' 
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  <span className="absolute bottom-1 left-1.5 right-1.5 text-[9px] sm:text-[10px] text-white font-medium truncate uppercase tracking-wider text-left block">
                    {item.city}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Highlights & Booking Action */}
          <div className="bg-white dark:bg-[#12231A] p-6 border border-[#E8E2D6] dark:border-[#1E3025] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C88A4B]">
                Curated UAE Itinerary Highlights
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                {currentItem.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3D5A45] shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto shrink-0">
              <a
                href={getWhatsAppLink(`Hello Remax Safaris, I would like to explore luxury travel packages for ${currentItem.title} in the UAE.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs uppercase tracking-wider font-semibold shadow-sm transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Advisor</span>
              </a>

              <button
                onClick={() => {
                  onClose();
                  if (onOpenQuote) {
                    onOpenQuote(`UAE Travel: ${currentItem.title}`);
                  }
                }}
                className="flex-1 md:flex-initial px-5 py-2.5 bg-[#12231A] dark:bg-white text-white dark:text-[#12231A] hover:bg-[#3D5A45] dark:hover:bg-stone-100 text-xs uppercase tracking-wider font-semibold transition-colors"
              >
                Request Itinerary
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
