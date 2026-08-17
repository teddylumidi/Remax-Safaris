import React, { useState } from 'react';
import { ArrowRight, Star, Clock, MapPin, Sparkles, Check, Heart, Shield, ChevronLeft, ChevronRight, Maximize2, Images } from 'lucide-react';
import { SafeImage } from './SafeImage';
import { useCurrency } from '../context/CurrencyContext';
import { useImageLightbox } from '../context/ImageLightboxContext';

interface CuratedJourneysProps {
  onSelectJourney: (id: string) => void;
  onOpenQuote: (name: string) => void;
}

interface JourneyItem {
  id: string;
  title: string;
  category: 'safari' | 'global' | 'retreat';
  tag: string;
  location: string;
  duration: string;
  priceUsd: number;
  image: string;
  galleryImages?: string[];
  description: string;
  highlights: string[];
}

const JOURNEYS: JourneyItem[] = [
  {
    id: 'luxury-savannah-camps',
    title: 'Luxury Savannah Tented Camps',
    category: 'safari',
    tag: 'Signature Wilderness',
    location: 'Maasai Mara & Lewa Conservancy',
    duration: '6 Days / 5 Nights',
    priceUsd: 1450,
    image: '/images/luxury_safari_hero_sirikoi.jpg',
    galleryImages: [
      '/images/luxury_safari_hero_sirikoi.jpg',
      '/images/park_game_drive_binoculars.jpg'
    ],
    description: 'Ultra-exclusive private tented chalets nestled along wildlife river corridors, candlelit open-air dinners under the stars, and expert-guided tracking.',
    highlights: ['Private 4x4 open Land Cruiser', 'Bush breakfasts & sundowners', 'Big Five night game drives']
  },
  {
    id: 'bespoke-world-tours',
    title: 'Bespoke World Tours & Escapes',
    category: 'global',
    tag: 'Global Consultancy',
    location: 'Dubai, UAE & Cape Town, SA',
    duration: '8 Days / 7 Nights',
    priceUsd: 1850,
    image: '/images/global_luxury_travel.jpg',
    galleryImages: [
      '/images/global_luxury_travel.jpg',
      '/images/capetown_table_mountain.jpg'
    ],
    description: 'Curated international luxury packages featuring 5-star private suites, desert dune retreats, wineland tastings, and seamless VIP travel logistics.',
    highlights: ['Fast-track visa processing', '5-star boutique accommodations', 'Chauffeured private transfers']
  },
  {
    id: 'amboseli-kilimanjaro-sanctuary',
    title: 'Amboseli Elephant Sanctuary & Kibo',
    category: 'safari',
    tag: 'Heritage Safari',
    location: 'Amboseli National Park, Kenya',
    duration: '4 Days / 3 Nights',
    priceUsd: 850,
    image: '/images/bespoke_safari_elephants.jpg',
    galleryImages: [
      '/images/bespoke_safari_elephants.jpg',
      '/images/amboseli_kibo_entrance.jpg',
      '/images/amboseli_kibo_lounge.jpg'
    ],
    description: 'Dramatic views of Mount Kilimanjaro with massive elephant herds lumbering past your veranda, rustic handcrafted lodges, and guided cultural walks.',
    highlights: ['Mount Kilimanjaro photo vantage', 'Observation Hill walking safari', 'Authentic Maasai cultural exchange']
  },
  {
    id: 'diani-ocean-retreat',
    title: 'Diani Beach & Marine Sanctuary',
    category: 'retreat',
    tag: 'Ocean Paradise',
    location: 'Diani Beach & Wasini Island',
    duration: '5 Days / 4 Nights',
    priceUsd: 720,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    description: 'Pristine powdery white sands, private beachfront villas, private dhow dolphin-sighting sailing, and fresh ocean-to-table seafood banquets.',
    highlights: ['Wasini dolphin dhow cruise', 'Kisite Mpunguti coral reef snorkeling', 'Private sunset beach dining']
  },
  {
    id: 'rift-valley-lakes',
    title: 'Great Rift Valley Lakes & Hippo Pods',
    category: 'safari',
    tag: 'Scenic Safari',
    location: 'Lake Naivasha, Crescent Island & Nakuru',
    duration: '3 Days / 2 Nights',
    priceUsd: 590,
    image: '/images/naivasha_hippos_shore.jpg',
    galleryImages: [
      '/images/naivasha_hippos_shore.jpg',
      '/images/naivasha_boat_safari.jpg',
      '/images/nakuru_flamingos_shore.jpg'
    ],
    description: 'Tranquil freshwater lakes, gentle boat cruises amongst resident hippo families, walking safaris among giraffes on Crescent Island, and flamingo sanctuaries.',
    highlights: ['Motorized boat hippo safaris', 'Crescent Island walking safari', 'Flamingo & rhino spotting']
  },
  {
    id: 'cape-town-panoramas',
    title: 'Cape Town & Coastal Winelands',
    category: 'global',
    tag: 'Global Luxury',
    location: 'Cape Town, South Africa',
    duration: '6 Days / 5 Nights',
    priceUsd: 1380,
    image: '/images/capetown_table_mountain.jpg',
    galleryImages: [
      '/images/capetown_table_mountain.jpg'
    ],
    description: 'Panoramic summit cables up Table Mountain, private Franschhoek vineyard tastings, Boulders Beach penguin sanctuaries, and Atlantic oceanfront dining.',
    highlights: ['Table Mountain cableway pass', 'Cape Peninsula scenic drive', 'Exclusive Stellenbosch wine cellar tours']
  }
];

interface JourneyCardItemProps {
  item: JourneyItem;
  onOpenQuote: (name: string) => void;
}

const JourneyCardItem: React.FC<JourneyCardItemProps> = ({ item, onOpenQuote }) => {
  const { formatPrice } = useCurrency();
  const { openLightbox } = useImageLightbox();
  const images = item.galleryImages && item.galleryImages.length > 0 ? item.galleryImages : [item.image];
  const [activeIdx, setActiveIdx] = useState(0);

  const getImageLabel = (index: number) => {
    if (item.id.includes('cape-town') || item.title.toLowerCase().includes('cape town')) {
      return index === 0 ? 'Table Mountain' : 'Camps Bay';
    }
    return `View ${index + 1}`;
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleOpenLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    const list = images.map((img, idx) => ({
      src: img,
      title: `${item.title} - ${getImageLabel(idx)}`,
      location: item.location,
      description: item.description
    }));
    openLightbox(list, activeIdx);
  };

  const currentImage = images[activeIdx] || item.image;

  return (
    <div className="group bg-white dark:bg-[#101C15] border border-[#E8E2D6] dark:border-[#1E3025] rounded-none overflow-hidden flex flex-col justify-between hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)] hover:border-[#C88A4B] transition-all duration-300">
      {/* Card Image */}
      <div 
        className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100 dark:bg-stone-900 cursor-pointer group/img"
        onClick={handleOpenLightbox}
      >
        <SafeImage
          src={currentImage}
          alt={`${item.title} - ${getImageLabel(activeIdx)}`}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          fallbackSrc="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Tag */}
        <div className="absolute top-4 left-4 bg-[#12231A]/90 backdrop-blur-sm text-[#FDFBF7] px-3 py-1 text-[10px] uppercase tracking-widest font-semibold">
          {item.tag}
        </div>

        {/* High Res Expand Button */}
        <button
          type="button"
          onClick={handleOpenLightbox}
          className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-[#C88A4B] text-white backdrop-blur-md border border-white/20 transition-all flex items-center gap-1.5 text-[11px] uppercase tracking-wider z-10"
          title="Expand High-Res Photo"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>

        {/* Interchangeable arrows if multiple images */}
        {images.length > 1 && (
          <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between opacity-90 sm:opacity-0 group-hover/img:opacity-100 transition-opacity z-10 pointer-events-none">
            <button
              type="button"
              onClick={handlePrev}
              className="p-1.5 rounded-full bg-black/70 hover:bg-[#C88A4B] text-white backdrop-blur-sm transition-all pointer-events-auto shadow-md"
              title="Previous photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="p-1.5 rounded-full bg-black/70 hover:bg-[#C88A4B] text-white backdrop-blur-sm transition-all pointer-events-auto shadow-md"
              title="Next photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Duration & Multi-image badge */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-light tracking-wide z-10">
          <div className="flex items-center gap-1.5 bg-black/50 px-2 py-0.5 rounded backdrop-blur-xs">
            <Clock className="w-3.5 h-3.5 text-[#C88A4B]" />
            <span>{item.duration}</span>
          </div>

          {images.length > 1 && (
            <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded border border-white/20 text-[10px] font-semibold text-amber-300">
              <Images className="w-3 h-3" />
              <span>{getImageLabel(activeIdx)} ({activeIdx + 1}/{images.length})</span>
            </div>
          )}
        </div>
      </div>

      {/* Pill Selector for Multiple Images */}
      {images.length > 1 && (
        <div className="px-6 pt-3 pb-1 bg-stone-50/80 dark:bg-stone-900/40 border-b border-stone-100 dark:border-stone-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold shrink-0">Views:</span>
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveIdx(idx);
              }}
              className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded transition-all whitespace-nowrap ${
                activeIdx === idx
                  ? 'bg-[#12231A] dark:bg-[#C88A4B] text-white'
                  : 'bg-stone-200/80 dark:bg-stone-800 text-slate-600 dark:text-slate-300 hover:bg-stone-300'
              }`}
            >
              {getImageLabel(idx)}
            </button>
          ))}
        </div>
      )}

      {/* Card Body with Generous Padding */}
      <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-xs text-[#3D5A45] dark:text-[#8FA896] font-medium">
            <MapPin className="w-3.5 h-3.5" />
            <span>{item.location}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif text-[#12231A] dark:text-[#FDFBF7] font-normal leading-snug">
            {item.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed line-clamp-3">
            {item.description}
          </p>

          {/* Highlights Bullet List */}
          <div className="pt-3 border-t border-[#F0EBE0] dark:border-[#1E3025] space-y-1.5">
            {item.highlights.map((hl, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="w-1 h-1 rounded-full bg-[#C88A4B]" />
                <span>{hl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="pt-5 border-t border-[#E8E2D6] dark:border-[#1E3025] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-medium block">
              Starting From
            </span>
            <span className="text-lg font-serif font-semibold text-[#12231A] dark:text-[#FDFBF7]">
              {formatPrice(item.priceUsd)}
            </span>
            <span className="text-[11px] text-slate-500 font-light ml-1">/ person</span>
          </div>

          <button
            onClick={() => onOpenQuote(item.title)}
            className="px-4 py-2 bg-[#12231A] dark:bg-[#FDFBF7] text-[#FDFBF7] dark:text-[#12231A] hover:bg-[#3D5A45] dark:hover:bg-white text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Inquire
          </button>
        </div>
      </div>
    </div>
  );
};

export const CuratedJourneys: React.FC<CuratedJourneysProps> = ({
  onSelectJourney,
  onOpenQuote
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'safari' | 'global' | 'retreat'>('all');

  const filteredJourneys = activeTab === 'all' 
    ? JOURNEYS 
    : JOURNEYS.filter(j => j.category === activeTab);

  return (
    <section id="curated-journeys" className="py-20 sm:py-28 bg-[#FAF7F0] dark:bg-[#0D1612] text-[#1A2621] dark:text-[#F0F4F2] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 border-b border-[#E8E2D6] dark:border-[#1E3025] pb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-[#3D5A45] dark:text-[#8FA896] mb-3">
              Handcrafted Portfolios
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#12231A] dark:text-[#FDFBF7]">
              Featured Curated Journeys
            </h2>
          </div>

          {/* Minimalist Filter Tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-xs uppercase tracking-widest font-semibold transition-all border ${
                activeTab === 'all'
                  ? 'bg-[#12231A] text-[#FDFBF7] border-[#12231A] dark:bg-[#FDFBF7] dark:text-[#12231A] dark:border-[#FDFBF7]'
                  : 'bg-transparent text-slate-600 dark:text-slate-400 border-transparent hover:border-[#E8E2D6] dark:hover:border-[#1E3025]'
              }`}
            >
              All Journeys
            </button>
            <button
              onClick={() => setActiveTab('safari')}
              className={`px-4 py-2 text-xs uppercase tracking-widest font-semibold transition-all border ${
                activeTab === 'safari'
                  ? 'bg-[#12231A] text-[#FDFBF7] border-[#12231A] dark:bg-[#FDFBF7] dark:text-[#12231A] dark:border-[#FDFBF7]'
                  : 'bg-transparent text-slate-600 dark:text-slate-400 border-transparent hover:border-[#E8E2D6] dark:hover:border-[#1E3025]'
              }`}
            >
              Kenya Wilderness
            </button>
            <button
              onClick={() => setActiveTab('global')}
              className={`px-4 py-2 text-xs uppercase tracking-widest font-semibold transition-all border ${
                activeTab === 'global'
                  ? 'bg-[#12231A] text-[#FDFBF7] border-[#12231A] dark:bg-[#FDFBF7] dark:text-[#12231A] dark:border-[#FDFBF7]'
                  : 'bg-transparent text-slate-600 dark:text-slate-400 border-transparent hover:border-[#E8E2D6] dark:hover:border-[#1E3025]'
              }`}
            >
              Global Travel
            </button>
            <button
              onClick={() => setActiveTab('retreat')}
              className={`px-4 py-2 text-xs uppercase tracking-widest font-semibold transition-all border ${
                activeTab === 'retreat'
                  ? 'bg-[#12231A] text-[#FDFBF7] border-[#12231A] dark:bg-[#FDFBF7] dark:text-[#12231A] dark:border-[#FDFBF7]'
                  : 'bg-transparent text-slate-600 dark:text-slate-400 border-transparent hover:border-[#E8E2D6] dark:hover:border-[#1E3025]'
              }`}
            >
              Ocean Retreats
            </button>
          </div>
        </div>

        {/* The Curated Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredJourneys.map((item) => (
            <JourneyCardItem
              key={item.id}
              item={item}
              onOpenQuote={onOpenQuote}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

