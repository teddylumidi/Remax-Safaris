import React, { useState } from 'react';
import { DESTINATIONS } from '../data/destinations';
import { Destination, ExperienceType } from '../types';
import { formatDestinationInquiry, getWhatsAppLink } from '../utils/whatsapp';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency, CURRENCIES, CurrencyCode } from '../context/CurrencyContext';
import { SafeImage } from './SafeImage';
import { WhatsAppIcon } from './WhatsAppIcon';
import { MapPin, Calendar, Compass, ArrowRight, Sparkles, Filter, Search, X, ArrowUpDown, Coins, Palmtree, Trees, Mountain, Building, LandPlot, Maximize2, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { CurrencyConverter } from './CurrencyConverter';
import { useImageLightbox } from '../context/ImageLightboxContext';

interface DestinationsGridProps {
  onSelectDestination: (destId: string) => void;
  onOpenQuoteForDestination: (destName: string) => void;
}

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc';

interface DestinationCardItemProps {
  dest: Destination;
  onSelectDestination: (destId: string) => void;
}

const DestinationCardItem: React.FC<DestinationCardItemProps> = ({ dest, onSelectDestination }) => {
  const { t } = useLanguage();
  const { currency, formatPrice } = useCurrency();
  const { openLightbox } = useImageLightbox();

  const images = dest.galleryImages && dest.galleryImages.length > 0 ? dest.galleryImages : [dest.image];
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const getImageLabel = (index: number) => {
    if (dest.id === 'cape-town') {
      if (index === 0) return 'Table Mountain';
      if (index === 1) return 'Camps Bay';
      if (index === 2) return 'Remax Cape Town';
      return 'Cape Town View';
    }
    if (dest.id === 'nakuru') {
      if (index === 0) return 'Flamingo Shoreline';
      if (index === 1) return 'Lake View';
      if (index === 2) return 'Flamingo Flock';
      return 'Lesser Flamingo';
    }
    if (dest.id === 'amboseli') {
      return index === 0 ? 'Kibo Entrance' : 'Karibu Lounge';
    }
    if (dest.id === 'naivasha') {
      if (index === 0) return 'Hippo Shores';
      if (index === 1) return 'Boat Safari';
      return "Hell's Gate";
    }
    if (dest.id === 'zanzibar') {
      if (index === 0) return 'Turtle Swimming';
      if (index === 1) return 'Turtle Aquarium';
      if (index === 2) return 'Stone Town';
      return 'Kendwa Beach';
    }
    if (dest.id === 'kisumu') {
      return index === 0 ? 'Lake Victoria Sunset' : 'Dunga Lake View';
    }
    if (dest.id === 'maasai-mara') {
      if (index === 0) return 'Binocular Drive';
      if (index === 1) return 'Safari Cruiser';
      return 'Savannah Expanse';
    }
    if (dest.id === 'samburu') {
      if (index === 0) return 'Giraffe Reserve';
      if (index === 1) return 'Ewaso River';
      return 'Warrior Heritage';
    }
    if (dest.id === 'tsavo') {
      if (index === 0) return 'Elephant Herd';
      if (index === 1) return 'Waterhole';
      if (index === 2) return 'Elephant Savannah';
      return 'Sunset Horizon';
    }
    if (dest.id === 'nairobi') {
      if (index === 0) return 'Safari Cruiser';
      if (index === 1) return 'Binocular Drive';
      return 'Warrior Heritage';
    }
    if (dest.id === 'mombasa') {
      if (index === 0) return 'Fort Jesus';
      if (index === 1) return 'Dhow Cruise';
      return 'Swahili Old Town';
    }
    if (dest.id === 'diani') {
      if (index === 0) return 'Diani Beach';
      if (index === 1) return 'Coral Coast';
      return 'Indian Ocean';
    }
    if (dest.id === 'malindi') {
      if (index === 0) return 'Malindi Shore';
      if (index === 1) return 'Coral Reef';
      return 'White Sands';
    }
    if (dest.id === 'lamu') {
      if (index === 0) return 'Old Town';
      if (index === 1) return 'Dhow Waterfront';
      return 'Coastal Heritage';
    }
    if (dest.id === 'nanyuki') {
      if (index === 0) return 'Mt Kenya Equator';
      if (index === 1) return 'Ol Pejeta Rhino';
      return 'Safari Lodge';
    }
    if (dest.id === 'singapore') {
      if (index === 0) return 'Marina Bay Night';
      if (index === 1) return 'Gardens by the Bay';
      return 'City Skyline';
    }
    if (dest.id === 'dubai') {
      if (index === 0) return 'Burj Khalifa';
      if (index === 1) return 'Dubai Marina';
      if (index === 2) return 'Downtown Skyline';
      return 'Palm Jumeirah';
    }
    if (dest.id === 'bali') {
      if (index === 0) return 'Rice Terraces';
      if (index === 1) return 'Temple Sunrise';
      return 'Beach Sunset';
    }
    if (dest.id === 'egypt') {
      if (index === 0) return 'Pyramids of Giza';
      if (index === 1) return 'Nile Felucca';
      return 'Luxor & Karnak';
    }
    if (dest.id === 'malaysia') {
      if (index === 0) return 'Petronas Towers';
      if (index === 1) return 'Batu Caves';
      return 'Langkawi Cable Car';
    }
    if (dest.id === 'turkey') {
      if (index === 0) return 'Cappadocia Balloons';
      if (index === 1) return 'Hagia Sophia';
      return 'Pamukkale Terraces';
    }
    if (dest.id === 'maldives') {
      if (index === 0) return 'Overwater Villa';
      if (index === 1) return 'Coral Reef';
      return 'Sunset Lagoon';
    }
    if (dest.id === 'thailand') {
      if (index === 0) return 'Phuket Islands';
      if (index === 1) return 'Chiang Mai Temple';
      return 'Phi Phi Islands';
    }
    if (dest.id === 'china') {
      if (index === 0) return 'Great Wall';
      if (index === 1) return 'Forbidden City';
      return 'Shanghai Skyline';
    }
    if (dest.id === 'rwanda') {
      if (index === 0) return 'Mountain Gorillas';
      if (index === 1) return 'Volcanoes NP';
      return 'Luxury Lodge';
    }
    return `View ${index + 1}`;
  };

  const getImageIcon = (index: number) => {
    if (dest.id === 'cape-town') {
      if (index === 0) return '🏔️';
      if (index === 1) return '🏖️';
      return '🌆';
    }
    if (dest.id === 'zanzibar') {
      if (index === 0) return '🐢';
      if (index === 1) return '🐢';
      if (index === 2) return '🏛️';
      return '🏖️';
    }
    if (dest.id === 'kisumu') {
      return index === 0 ? '🌅' : '🚤';
    }
    if (dest.id === 'nakuru') {
      return '🦩';
    }
    if (dest.id === 'naivasha') {
      if (index === 0) return '🦛';
      if (index === 1) return '🚤';
      return '🚴';
    }
    if (dest.id === 'amboseli') {
      return index === 0 ? '🏕️' : '🛋️';
    }
    if (dest.id === 'maasai-mara' || dest.id === 'nairobi') return '🦁';
    if (dest.id === 'samburu') return index === 0 ? '🦒' : '🌿';
    if (dest.id === 'tsavo') return '🐘';
    if (dest.id === 'mombasa' || dest.id === 'lamu') return index === 0 ? '🏰' : '⛵';
    if (dest.id === 'diani' || dest.id === 'malindi' || dest.id === 'watamu') return '🏖️';
    if (dest.id === 'nanyuki') return index === 0 ? '🏔️' : '🦏';
    if (dest.id === 'singapore') return index === 0 ? '🌃' : '🌿';
    if (dest.id === 'dubai') return '🏙️';
    if (dest.id === 'bali') return index === 0 ? '🌾' : '🛕';
    if (dest.id === 'egypt') return index === 0 ? '🏺' : '⛵';
    if (dest.id === 'malaysia') return index === 0 ? '🏙️' : '🚡';
    if (dest.id === 'turkey') return index === 0 ? '🎈' : '🕌';
    if (dest.id === 'maldives') return index === 0 ? '🏝️' : '🤿';
    if (dest.id === 'thailand') return index === 0 ? '🏖️' : '🛕';
    if (dest.id === 'china') return index === 0 ? '🏯' : '🌆';
    if (dest.id === 'rwanda' || dest.id === 'uganda') return '🦍';
    return '📸';
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const currentImage = images[activeImgIndex] || dest.image;

  const handleOpenLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    const list = images.map((img, i) => ({
      src: img,
      title: `${dest.name} - ${getImageLabel(i)}`,
      location: dest.category === 'kenya' ? 'Kenya' : 'International',
      description: `${dest.tagline} - ${dest.description}`
    }));
    openLightbox(list, activeImgIndex);
  };

  return (
    <div className="bg-white dark:bg-[#101C15] border border-[#E8E2D6] dark:border-[#1E3025] transition-all duration-300 flex flex-col overflow-hidden group hover:border-[#C88A4B] shadow-sm hover:shadow-md">
      {/* Image & Badge */}
      <div 
        className="relative h-64 overflow-hidden cursor-pointer group/img"
        onClick={handleOpenLightbox}
      >
        <SafeImage
          src={currentImage}
          alt={`${dest.name} - ${getImageLabel(activeImgIndex)}`}
          fallbackCategory={dest.category}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
        
        {/* Quick View / Zoom Button */}
        <button
          type="button"
          onClick={handleOpenLightbox}
          className="absolute top-3 right-3 p-2 bg-black/70 hover:bg-[#C88A4B] text-white backdrop-blur-md border border-white/20 transition-all flex items-center gap-1.5 text-[11px] uppercase tracking-wider z-10 rounded-sm"
          title="Click to Expand High-Res Photo"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Expand HD</span>
        </button>

        {/* Interchangeable Image Navigation Arrows (if multi-image) */}
        {images.length > 1 && (
          <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none z-10">
            <button
              type="button"
              onClick={handlePrevImage}
              className="p-2 rounded-full bg-black/70 hover:bg-[#C88A4B] text-white backdrop-blur-md border border-white/20 transition-all pointer-events-auto shadow-md"
              title="Previous View"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextImage}
              className="p-2 rounded-full bg-black/70 hover:bg-[#C88A4B] text-white backdrop-blur-md border border-white/20 transition-all pointer-events-auto shadow-md"
              title="Next View"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2 flex-wrap max-w-[75%]">
          <span className={`px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white ${
            dest.category === 'kenya' ? 'bg-[#12231A]' : 'bg-[#3D5A45]'
          }`}>
            {dest.category === 'kenya' ? 'Kenya' : 'International'}
          </span>

          {dest.experienceType && (
            <span className="px-2 py-1 text-[10px] uppercase tracking-wider bg-black/60 text-stone-200 border border-white/15 backdrop-blur-md">
              {dest.experienceType}
            </span>
          )}

          {dest.featured && (
            <span className="px-2 py-1 text-[10px] uppercase tracking-wider bg-[#C88A4B] text-white flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Featured
            </span>
          )}
        </div>

        {/* Destination Name & Active View Label */}
        <div className="absolute bottom-3 left-4 right-4 text-white z-10">
          <h3 className="text-2xl sm:text-3xl font-serif font-normal leading-tight flex items-baseline justify-between">
            <span>{dest.name}</span>
            {images.length > 1 && (
              <span className="text-[10px] uppercase tracking-wider text-amber-300 font-sans font-semibold bg-black/70 px-2 py-0.5 border border-white/20 rounded flex items-center gap-1">
                <Images className="w-3 h-3" />
                {getImageLabel(activeImgIndex)} ({activeImgIndex + 1}/{images.length})
              </span>
            )}
          </h3>
        </div>
      </div>

      {/* Dedicated Interactive Perspective Selector Bar (when multiple views available) */}
      {images.length > 1 && (
        <div 
          className="px-4 py-2 bg-stone-100 dark:bg-[#16271E] border-b border-[#E8E2D6] dark:border-[#1E3025] flex items-center gap-2 overflow-x-auto no-scrollbar"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-[10px] uppercase tracking-widest text-stone-500 dark:text-stone-400 font-bold shrink-0 flex items-center gap-1">
            <Images className="w-3 h-3 text-[#C88A4B]" />
            Views:
          </span>
          <div className="flex items-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImgIndex(i)}
                className={`px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded transition-all flex items-center gap-1 whitespace-nowrap ${
                  activeImgIndex === i
                    ? 'bg-[#12231A] dark:bg-[#C88A4B] text-white shadow-sm ring-1 ring-[#C88A4B]'
                    : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                <span>{getImageIcon(i)}</span>
                <span>{getImageLabel(i)}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Body Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4 bg-white dark:bg-[#101C15]">
        <div className="space-y-3">
          <p className="text-xs text-[#C88A4B] uppercase tracking-wider font-semibold">
            {dest.tagline}
          </p>

          <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm line-clamp-2 leading-relaxed font-light">
            {dest.description}
          </p>

          {/* Highlights */}
          <div className="space-y-1.5 pt-1">
            <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-[0.2em]">Highlights:</p>
            <ul className="text-xs text-stone-600 dark:text-stone-400 space-y-1 font-light">
              {dest.highlights.slice(0, 3).map((hl, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#C88A4B] shrink-0" />
                  <span className="truncate">{hl}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-4 border-t border-[#E8E2D6] dark:border-[#1E3025] space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider block">{t('startingFrom')}</span>
              <span className="text-base font-serif font-semibold text-[#12231A] dark:text-[#C88A4B]">
                {formatPrice(dest.startingPriceKES, dest.startingPriceUSD)}
              </span>
              {currency !== 'KES' && dest.startingPriceKES && (
                <span className="text-[10px] text-stone-400 font-mono block">
                  (KES {dest.startingPriceKES.toLocaleString()})
                </span>
              )}
            </div>

            <div className="text-right">
              <span className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider block">Best Season</span>
              <span className="text-xs text-stone-700 dark:text-stone-300 flex items-center gap-1 justify-end font-light">
                <Calendar className="w-3 h-3 text-[#C88A4B]" />
                {dest.bestTimeToVisit.split('(')[0]}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => onSelectDestination(dest.id)}
              className="py-2.5 px-3 border border-[#12231A] dark:border-[#E8E2D6] text-[#12231A] dark:text-[#FDFBF7] text-xs uppercase tracking-[0.18em] font-semibold hover:bg-[#12231A] hover:text-white dark:hover:bg-[#FDFBF7] dark:hover:text-[#12231A] transition-all text-center flex items-center justify-center gap-1.5"
            >
              <span>{t('viewDetails')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <a
              href={getWhatsAppLink(formatDestinationInquiry(dest.name, dest.category))}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 bg-[#12231A] hover:bg-[#3D5A45] text-white text-xs uppercase tracking-[0.18em] font-semibold transition-all flex items-center justify-center gap-1.5"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Inquire</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export const DestinationsGrid: React.FC<DestinationsGridProps> = ({
  onSelectDestination,
  onOpenQuoteForDestination
}) => {
  const { t } = useLanguage();
  const { currency, setCurrency, formatPrice } = useCurrency();
  const { openLightbox } = useImageLightbox();
  
  const [activeTab, setActiveTab] = useState<'all' | 'kenya' | 'international'>('all');
  const [selectedCategory, setSelectedCategory] = useState<ExperienceType | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [showConverter, setShowConverter] = useState(false);

  // Experience Category Chips definition
  const EXPERIENCE_CATEGORIES: { id: ExperienceType | 'all'; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'all', label: 'All Categories', icon: Compass },
    { id: 'Safari', label: 'Safari', icon: Trees },
    { id: 'Beach', label: 'Beach', icon: Palmtree },
    { id: 'Cultural', label: 'Cultural', icon: LandPlot },
    { id: 'City', label: 'City', icon: Building },
    { id: 'Nature', label: 'Nature', icon: Mountain },
  ];

  // Filtering logic
  const filteredDestinations = DESTINATIONS.filter((d) => {
    const matchesTab = activeTab === 'all' || d.category === activeTab;
    const matchesCategory = selectedCategory === 'all' || d.experienceType === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery = !q ||
      d.name.toLowerCase().includes(q) ||
      d.tagline.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q) ||
      (d.experienceType && d.experienceType.toLowerCase().includes(q)) ||
      d.highlights.some((h) => h.toLowerCase().includes(q));
    return matchesTab && matchesCategory && matchesQuery;
  });

  // Sorting logic
  const sortedDestinations = [...filteredDestinations].sort((a, b) => {
    if (sortBy === 'price-asc') {
      return (a.startingPriceKES || 0) - (b.startingPriceKES || 0);
    }
    if (sortBy === 'price-desc') {
      return (b.startingPriceKES || 0) - (a.startingPriceKES || 0);
    }
    if (sortBy === 'name-asc') {
      return a.name.localeCompare(b.name);
    }
    // Default 'featured'
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  const kenyaCount = DESTINATIONS.filter((d) => d.category === 'kenya').length;
  const intlCount = DESTINATIONS.filter((d) => d.category === 'international').length;

  return (
    <section id="destinations" className="py-20 sm:py-28 bg-[#FAF7F2] dark:bg-[#0A120E] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E8E2D6] dark:border-[#1E3025]">
          <div className="space-y-3">
            <span className="inline-block px-3 py-1 bg-[#12231A] dark:bg-[#FDFBF7] text-[#FDFBF7] dark:text-[#12231A] text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em]">
              The Destinations Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#12231A] dark:text-[#FDFBF7] tracking-tight">
              {t('exploreDestinations')}
            </h2>
            <p className="text-stone-600 dark:text-stone-300 max-w-2xl text-sm sm:text-base font-light leading-relaxed">
              Explore 31 hand-selected safari reserves, secluded Indian Ocean beaches, and bespoke worldwide destinations curated for luxury travelers.
            </p>
          </div>

          {/* Search Input & Currency Switcher Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Maasai Mara, Diani, Dubai..."
                className="w-full bg-white dark:bg-[#111D16] border border-[#E8E2D6] dark:border-[#1E3025] focus:border-[#C88A4B] px-4 py-2.5 pl-10 pr-9 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none transition-all shadow-xs"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Currency Converter Toggle */}
            <button
              onClick={() => setShowConverter(!showConverter)}
              className="px-4 py-2.5 bg-[#12231A] hover:bg-[#3D5A45] text-white font-semibold text-xs uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2 shrink-0 border border-white/10"
            >
              <Coins className="w-4 h-4 text-[#C88A4B]" />
              <span>{showConverter ? 'Close Calculator' : 'Currency Rates'}</span>
            </button>
          </div>
        </div>

        {/* Embedded Currency Converter Drawer */}
        {showConverter && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-300">
            <CurrencyConverter />
          </div>
        )}

        {/* Filter Controls Panel */}
        <div className="bg-white dark:bg-[#101C15] p-6 border border-[#E8E2D6] dark:border-[#1E3025] space-y-5">
          
          {/* Row 1: Region Tabs & Currency Selector */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#E8E2D6] dark:border-[#1E3025] pb-4">
            
            {/* Region Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-2 border ${
                  activeTab === 'all'
                    ? 'bg-[#12231A] text-white border-[#12231A]'
                    : 'bg-[#FAF7F2] dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-[#E8E2D6] dark:border-stone-800 hover:border-stone-400'
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-[#C88A4B]" />
                <span>{t('filterAll')}</span>
                <span className={`text-[10px] px-1.5 py-0.2 ${activeTab === 'all' ? 'bg-[#C88A4B] text-white font-mono' : 'text-stone-500 font-mono'}`}>
                  {DESTINATIONS.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('kenya')}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-2 border ${
                  activeTab === 'kenya'
                    ? 'bg-[#12231A] text-white border-[#12231A]'
                    : 'bg-[#FAF7F2] dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-[#E8E2D6] dark:border-stone-800 hover:border-stone-400'
                }`}
              >
                <span>🇰🇪 {t('filterKenya')}</span>
                <span className={`text-[10px] px-1.5 py-0.2 ${activeTab === 'kenya' ? 'bg-[#C88A4B] text-white font-mono' : 'text-stone-500 font-mono'}`}>
                  {kenyaCount}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('international')}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-2 border ${
                  activeTab === 'international'
                    ? 'bg-[#12231A] text-white border-[#12231A]'
                    : 'bg-[#FAF7F2] dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-[#E8E2D6] dark:border-stone-800 hover:border-stone-400'
                }`}
              >
                <span>🌐 {t('filterInternational')}</span>
                <span className={`text-[10px] px-1.5 py-0.2 ${activeTab === 'international' ? 'bg-[#C88A4B] text-white font-mono' : 'text-stone-500 font-mono'}`}>
                  {intlCount}
                </span>
              </button>
            </div>

            {/* Currency Switcher & Sorting */}
            <div className="flex items-center gap-3 flex-wrap">
              
              {/* Currency Selector */}
              <div className="flex items-center gap-2 bg-[#FAF7F2] dark:bg-stone-900 px-3 py-1.5 border border-[#E8E2D6] dark:border-stone-800">
                <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider">
                  Currency:
                </span>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                  className="bg-transparent text-xs font-semibold text-[#12231A] dark:text-[#C88A4B] focus:outline-none cursor-pointer"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code} className="bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100">
                      {c.flag} {c.code} ({c.symbol})
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 bg-[#FAF7F2] dark:bg-stone-900 px-3 py-1.5 border border-[#E8E2D6] dark:border-stone-800">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#C88A4B]" />
                <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider">
                  Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-transparent text-xs font-semibold text-stone-800 dark:text-stone-200 focus:outline-none cursor-pointer"
                >
                  <option value="featured" className="bg-white dark:bg-stone-900">Featured Portfolio</option>
                  <option value="price-asc" className="bg-white dark:bg-stone-900">Price: Low to High</option>
                  <option value="price-desc" className="bg-white dark:bg-stone-900">Price: High to Low</option>
                  <option value="name-asc" className="bg-white dark:bg-stone-900">Name: A to Z</option>
                </select>
              </div>

            </div>

          </div>

          {/* Row 2: Experience Category Filter Chips */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-wider">
              <Filter className="w-3.5 h-3.5 text-[#C88A4B]" />
              <span>Filter by Experience Type:</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {EXPERIENCE_CATEGORIES.map((cat) => {
                const IconComponent = cat.icon;
                const isSelected = selectedCategory === cat.id;
                
                const count = DESTINATIONS.filter((d) => {
                  const matchesTab = activeTab === 'all' || d.category === activeTab;
                  const matchesCat = cat.id === 'all' || d.experienceType === cat.id;
                  return matchesTab && matchesCat;
                }).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-1.5 text-xs transition-all flex items-center gap-2 border ${
                      isSelected
                        ? 'bg-[#C88A4B] text-white border-[#C88A4B] font-semibold'
                        : 'bg-[#FAF7F2] dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-[#E8E2D6] dark:border-stone-800 hover:border-stone-400'
                    }`}
                  >
                    <IconComponent className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-[#3D5A45] dark:text-emerald-400'}`} />
                    <span>{cat.label}</span>
                    <span className={`text-[10px] font-mono px-1 ${isSelected ? 'text-white/80' : 'text-stone-500'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Active Filters Summary Tag */}
        {(selectedCategory !== 'all' || activeTab !== 'all' || searchQuery) && (
          <div className="flex items-center justify-between bg-white dark:bg-[#101C15] px-4 py-2.5 border border-[#E8E2D6] dark:border-[#1E3025] text-xs">
            <div className="flex items-center gap-2 text-stone-600 dark:text-stone-300 flex-wrap">
              <span className="font-semibold text-[#12231A] dark:text-[#FDFBF7]">Showing {sortedDestinations.length} destination{sortedDestinations.length === 1 ? '' : 's'}</span>
              {selectedCategory !== 'all' && (
                <span className="px-2 py-0.5 bg-[#12231A] text-white text-[10px] font-mono uppercase tracking-wider">
                  Type: {selectedCategory}
                </span>
              )}
              {activeTab !== 'all' && (
                <span className="px-2 py-0.5 bg-[#C88A4B] text-white text-[10px] font-mono uppercase tracking-wider">
                  Region: {activeTab === 'kenya' ? 'Kenya' : 'International'}
                </span>
              )}
              {searchQuery && (
                <span className="px-2 py-0.5 bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-[11px]">
                  "{searchQuery}"
                </span>
              )}
            </div>

            <button
              onClick={() => {
                setActiveTab('all');
                setSelectedCategory('all');
                setSearchQuery('');
                setSortBy('featured');
              }}
              className="text-xs font-semibold text-[#C88A4B] hover:underline uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Grid Display */}
        {sortedDestinations.length === 0 ? (
          <div className="bg-white dark:bg-[#101C15] p-12 text-center border border-[#E8E2D6] dark:border-[#1E3025] space-y-4">
            <Compass className="w-12 h-12 text-stone-400 mx-auto" />
            <h3 className="text-lg font-serif font-normal text-stone-800 dark:text-stone-200">
              No destinations found matching your criteria
            </h3>
            <p className="text-stone-500 dark:text-stone-400 text-xs max-w-md mx-auto font-light">
              Try selecting a different category, region tab, or clearing your search query.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveTab('all');
                setSelectedCategory('all');
              }}
              className="px-6 py-2.5 bg-[#12231A] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#3D5A45] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedDestinations.map((dest) => (
              <DestinationCardItem
                key={dest.id}
                dest={dest}
                onSelectDestination={onSelectDestination}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
