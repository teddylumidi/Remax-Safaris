import React, { useState } from 'react';
import { TOUR_PACKAGES } from '../data/packages';
import { TourPackage } from '../types';
import { formatPackageInquiry, getWhatsAppLink } from '../utils/whatsapp';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { SafeImage } from './SafeImage';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Compass, Clock, Check, Sparkles, ChevronDown, ChevronUp, Tag, Maximize2, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { useImageLightbox } from '../context/ImageLightboxContext';

interface PackagesGridProps {
  onSelectPackage: (pkg: TourPackage) => void;
}

interface PackageCardItemProps {
  pkg: TourPackage;
  onSelectPackage: (pkg: TourPackage) => void;
}

const PackageCardItem: React.FC<PackageCardItemProps> = ({ pkg, onSelectPackage }) => {
  const { t } = useLanguage();
  const { formatPrice, currency } = useCurrency();
  const { openLightbox } = useImageLightbox();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const images = pkg.galleryImages && pkg.galleryImages.length > 0 ? pkg.galleryImages : [pkg.image];

  const getImageLabel = (index: number) => {
    if (pkg.id.includes('cape-town') || pkg.destinationId === 'cape-town') {
      return index === 0 ? 'Table Mountain' : 'Camps Bay';
    }
    if (pkg.id.includes('zanzibar') || pkg.destinationId === 'zanzibar') {
      if (index === 0) return 'Turtle Swimming';
      if (index === 1) return 'Stone Town';
      return 'Kendwa Beach';
    }
    if (pkg.id.includes('nakuru')) {
      if (index === 0) return 'Flamingo Shoreline';
      if (index === 1) return 'Lake View';
      if (index === 2) return 'Flamingo Flock';
      return 'Lesser Flamingo';
    }
    if (pkg.id.includes('naivasha') || pkg.destinationId === 'naivasha') {
      if (index === 0) return 'Hippo Shores';
      return 'Boat Safari';
    }
    if (pkg.id.includes('kisumu') || pkg.destinationId === 'kisumu') {
      return index === 0 ? 'Lake Victoria Sunset' : 'Dunga Lake View';
    }
    return `View ${index + 1}`;
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const currentImage = images[activeImgIndex] || pkg.image;

  const handleOpenLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    const list = images.map((img, i) => ({
      src: img,
      title: `${pkg.title} - ${getImageLabel(i)}`,
      location: pkg.destinationName,
      description: `${pkg.duration} All-Inclusive Holiday Safari Package`
    }));
    openLightbox(list, activeImgIndex);
  };

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      onClick={() => onSelectPackage(pkg)}
      className="bg-white dark:bg-[#101C15] border border-[#E8E2D6] dark:border-[#1E3025] hover:border-[#C88A4B] transition-all duration-300 flex flex-col overflow-hidden group cursor-pointer"
    >
      {/* Card Image Header */}
      <div 
        className="relative h-64 overflow-hidden group/pkgimg cursor-pointer"
        onClick={handleOpenLightbox}
      >
        <SafeImage
          src={currentImage}
          alt={`${pkg.title} - ${getImageLabel(activeImgIndex)}`}
          fallbackCategory={pkg.category}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

        {/* Quick Lightbox Expand Button */}
        <button
          type="button"
          onClick={handleOpenLightbox}
          className="absolute top-3 right-3 z-10 p-2 bg-black/60 hover:bg-[#C88A4B] text-white backdrop-blur-md border border-white/20 transition-all text-[11px] uppercase tracking-wider flex items-center gap-1"
          title="Expand High-Res Photo"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Expand</span>
        </button>

        {/* Interchangeable Arrows (if multi-photo) */}
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

        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className={`px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white ${
            pkg.category === 'kenya' ? 'bg-[#12231A]' : 'bg-[#3D5A45]'
          }`}>
            {pkg.category === 'kenya' ? 'Kenya Safari' : 'World Tour'}
          </span>
          <span className="px-2.5 py-1 text-xs font-light bg-black/60 backdrop-blur-md text-stone-200 border border-white/15 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#C88A4B]" />
            {pkg.duration}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="text-2xl font-serif font-normal leading-tight">
            {pkg.title}
          </h3>
          <div className="flex items-center justify-between text-xs text-stone-300 mt-1">
            <p className="line-clamp-1 font-light">
              {pkg.destinationName}
            </p>
            {images.length > 1 && (
              <span className="text-[10px] uppercase tracking-wider text-amber-300 font-semibold bg-black/70 px-2 py-0.5 border border-white/20 rounded flex items-center gap-1">
                <Images className="w-3 h-3" />
                {getImageLabel(activeImgIndex)} ({activeImgIndex + 1}/{images.length})
              </span>
            )}
          </div>
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
                <span>{getImageLabel(i)}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Body Info */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5 bg-white dark:bg-[#101C15]">
        {/* Price Box */}
        <div className="bg-[#FAF7F2] dark:bg-stone-900 p-4 border border-[#E8E2D6] dark:border-stone-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-semibold">All-Inclusive Rate</span>
            <span className="text-lg font-serif font-semibold text-[#12231A] dark:text-[#C88A4B]">
              {formatPrice(pkg.priceKES, pkg.priceUSD)}
            </span>
            {currency !== 'KES' && pkg.priceKES && (
              <span className="text-xs text-stone-500 font-mono block">
                (KES {pkg.priceKES.toLocaleString()} / person)
              </span>
            )}
          </div>
          <span className="text-xs font-semibold text-[#C88A4B] uppercase tracking-wider bg-white dark:bg-[#101C15] px-3 py-1.5 border border-[#E8E2D6] dark:border-stone-800">
            {pkg.duration}
          </span>
        </div>

        {/* Highlights Preview */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-[#12231A] dark:text-[#FDFBF7] uppercase tracking-wider flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-[#C88A4B]" />
            <span>{t('inclusions')}:</span>
          </p>
          <ul className="text-xs text-stone-600 dark:text-stone-300 space-y-1.5 font-light">
            {pkg.inclusions.slice(0, isExpanded ? pkg.inclusions.length : 3).map((inc, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#3D5A45] dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{inc}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Expand / Details Toggle Button */}
        <div className="pt-2 border-t border-[#E8E2D6] dark:border-[#1E3025] space-y-3">
          <button
            type="button"
            onClick={toggleExpand}
            className="w-full text-center text-xs font-semibold text-[#C88A4B] hover:underline uppercase tracking-wider flex items-center justify-center gap-1 py-1"
          >
            <span>{isExpanded ? 'Hide Inclusions' : 'Show All Inclusions'}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSelectPackage(pkg)}
              className="py-2.5 px-3 border border-[#12231A] dark:border-[#E8E2D6] text-[#12231A] dark:text-[#FDFBF7] text-xs uppercase tracking-[0.18em] font-semibold hover:bg-[#12231A] hover:text-white dark:hover:bg-[#FDFBF7] dark:hover:text-[#12231A] transition-all text-center"
            >
              {t('viewFullPackage')}
            </button>

            <a
              href={getWhatsAppLink(formatPackageInquiry(pkg.title, pkg.duration, pkg.priceKES, pkg.priceUSD))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
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

export const PackagesGrid: React.FC<PackagesGridProps> = ({ onSelectPackage }) => {
  const { t } = useLanguage();
  const [filterCategory, setFilterCategory] = useState<'all' | 'kenya' | 'international'>('all');

  const filteredPackages = TOUR_PACKAGES.filter(
    (pkg) => filterCategory === 'all' || pkg.category === filterCategory
  );

  return (
    <section id="packages" className="py-20 sm:py-28 bg-[#FAF7F2] dark:bg-[#0A120E] border-t border-[#E8E2D6] dark:border-[#1E3025] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <span className="inline-block px-3.5 py-1 bg-[#12231A] dark:bg-[#FDFBF7] text-[#FDFBF7] dark:text-[#12231A] text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em]">
            Curated Safari Journeys & Escapes
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#12231A] dark:text-[#FDFBF7] tracking-tight">
            {t('exclusivePackages')}
          </h2>
          <div className="w-12 h-[1.5px] bg-[#C88A4B] mx-auto opacity-70" />
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base font-light leading-relaxed">
            {t('packagesSubtitle')}
          </p>

          {/* Filter Pills */}
          <div className="flex justify-center gap-2 pt-3">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all border ${
                filterCategory === 'all'
                  ? 'bg-[#12231A] text-white border-[#12231A]'
                  : 'bg-white dark:bg-[#111D16] text-stone-700 dark:text-stone-300 border-[#E8E2D6] dark:border-stone-800 hover:border-stone-400'
              }`}
            >
              {t('filterAll')} ({TOUR_PACKAGES.length})
            </button>
            <button
              onClick={() => setFilterCategory('kenya')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all border ${
                filterCategory === 'kenya'
                  ? 'bg-[#12231A] text-white border-[#12231A]'
                  : 'bg-white dark:bg-[#111D16] text-stone-700 dark:text-stone-300 border-[#E8E2D6] dark:border-stone-800 hover:border-stone-400'
              }`}
            >
              Kenya ({TOUR_PACKAGES.filter((p) => p.category === 'kenya').length})
            </button>
            <button
              onClick={() => setFilterCategory('international')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all border ${
                filterCategory === 'international'
                  ? 'bg-[#12231A] text-white border-[#12231A]'
                  : 'bg-white dark:bg-[#111D16] text-stone-700 dark:text-stone-300 border-[#E8E2D6] dark:border-stone-800 hover:border-stone-400'
              }`}
            >
              Worldwide ({TOUR_PACKAGES.filter((p) => p.category === 'international').length})
            </button>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <PackageCardItem
              key={pkg.id}
              pkg={pkg}
              onSelectPackage={onSelectPackage}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
