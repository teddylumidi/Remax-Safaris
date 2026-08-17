import React, { useState } from 'react';
import { TourPackage } from '../types';
import { formatPackageInquiry, getWhatsAppLink } from '../utils/whatsapp';
import { SafeImage } from './SafeImage';
import { WhatsAppIcon } from './WhatsAppIcon';
import { X, Clock, CheckCircle2, XCircle, Calendar, ShieldCheck, MapPin, Sparkles, Maximize2, ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useImageLightbox } from '../context/ImageLightboxContext';

interface PackageDetailModalProps {
  packageData: TourPackage | null;
  onClose: () => void;
  onOpenQuoteForPackage: (pkgTitle: string) => void;
}

export const PackageDetailModal: React.FC<PackageDetailModalProps> = ({
  packageData,
  onClose,
  onOpenQuoteForPackage
}) => {
  const { openLightbox } = useImageLightbox();
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  if (!packageData) return null;

  const allPhotos = packageData.galleryImages && packageData.galleryImages.length > 0
    ? packageData.galleryImages
    : [packageData.image];

  const getPhotoLabel = (index: number) => {
    if (packageData.id.includes('cape-town') || packageData.destinationId === 'cape-town') {
      return index === 0 ? 'Table Mountain Summit' : 'Camps Bay Coastal View';
    }
    if (packageData.id.includes('nakuru')) {
      if (index === 0) return 'Flamingos Shoreline';
      if (index === 1) return 'Lake Mirror View';
      if (index === 2) return 'Pink Flock';
      return 'Lesser Flamingo Close-up';
    }
    return `Photo ${index + 1}`;
  };

  const handleOpenPhoto = (index: number = activePhotoIndex) => {
    const list = allPhotos.map((img, i) => ({
      src: img,
      title: `${packageData.title} - ${getPhotoLabel(i)}`,
      location: packageData.destinationName,
      description: `${packageData.duration} All-Inclusive Holiday Safari`
    }));
    openLightbox(list, index);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIndex((prev) => (prev - 1 + allPhotos.length) % allPhotos.length);
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIndex((prev) => (prev + 1) % allPhotos.length);
  };

  const currentBannerImage = allPhotos[activePhotoIndex] || packageData.image;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 relative my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white transition-all backdrop-blur-sm"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Banner */}
        <div 
          className="relative h-72 sm:h-80 w-full overflow-hidden rounded-t-3xl cursor-pointer group/banner"
          onClick={() => handleOpenPhoto(activePhotoIndex)}
        >
          <SafeImage
            src={currentBannerImage}
            alt={`${packageData.title} - ${getPhotoLabel(activePhotoIndex)}`}
            fallbackCategory={packageData.category}
            className="w-full h-full object-cover group-hover/banner:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Banner Navigation Arrows (if multi-photo) */}
          {allPhotos.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-slate-950/70 hover:bg-[#D4A373] hover:text-slate-950 text-white transition-all backdrop-blur-sm border border-white/20"
                title="Previous Image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-slate-950/70 hover:bg-[#D4A373] hover:text-slate-950 text-white transition-all backdrop-blur-sm border border-white/20"
                title="Next Image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Quick Expand Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenPhoto(activePhotoIndex);
            }}
            className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-[#D4A373] text-white hover:text-slate-950 backdrop-blur-md border border-white/20 transition-all text-xs font-bold flex items-center gap-1.5 shadow-lg"
            title="Expand Full Resolution Photo"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Expand Photo ({activePhotoIndex + 1}/{allPhotos.length})</span>
          </button>

          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest bg-[#1B4332] text-white">
                {packageData.category === 'kenya' ? '🇰🇪 Kenya Tour' : '🌐 International Tour'}
              </span>
              <span className="px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#D4A373]" />
                {packageData.duration}
              </span>
              {allPhotos.length > 1 && (
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-[#D4A373] text-slate-950">
                  {getPhotoLabel(activePhotoIndex)}
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
              {packageData.title}
            </h2>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-8 bg-white dark:bg-slate-900">
          
          {/* Price Header Box */}
          <div className="bg-[#F4F1EA] dark:bg-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] text-gray-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Special Package Price</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-[#1B4332] dark:text-emerald-400">
                  KES {packageData.priceKES?.toLocaleString() ?? 0}
                </span>
                <span className="text-sm font-bold text-gray-600 dark:text-slate-300">
                  / ${packageData.priceUSD} USD
                </span>
              </div>
              <p className="text-xs text-[#1B4332] dark:text-emerald-400 font-semibold mt-0.5">
                Per person sharing • Flexible booking terms available
              </p>
            </div>

            <a
              href={getWhatsAppLink(formatPackageInquiry(packageData.title, packageData.duration, packageData.priceKES, packageData.priceUSD))}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#25D366] hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>Book via WhatsApp</span>
            </a>
          </div>

          {/* Photo Gallery Thumbnails Strip (Interchangeable switchers) */}
          {allPhotos.length > 1 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black text-[#1B4332] dark:text-emerald-400 uppercase tracking-widest flex items-center gap-2 font-serif">
                  <ImageIcon className="w-4 h-4 text-[#D4A373]" />
                  <span>Interchangeable Package Views ({allPhotos.length})</span>
                </h4>
                <span className="text-[11px] text-gray-500 dark:text-slate-400 font-medium">Click thumbnail to switch view</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {allPhotos.map((img, idx) => {
                  const isSelected = activePhotoIndex === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => setActivePhotoIndex(idx)}
                      className={`relative aspect-video rounded-xl overflow-hidden cursor-pointer group border transition-all ${
                        isSelected 
                          ? 'border-2 border-[#D4A373] shadow-lg ring-2 ring-[#D4A373]/30 scale-[1.02]' 
                          : 'border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-gray-400'
                      }`}
                    >
                      <SafeImage
                        src={img}
                        alt={`${packageData.title} photo ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className={`absolute inset-0 transition-colors ${isSelected ? 'bg-transparent' : 'bg-slate-950/20 group-hover:bg-slate-950/0'}`} />
                      <div className={`absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold backdrop-blur-sm ${
                        isSelected ? 'bg-[#D4A373] text-slate-950' : 'bg-slate-900/80 text-white'
                      }`}>
                        {getPhotoLabel(idx)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Day by Day Detailed Itinerary */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#1B4332] dark:text-emerald-400 font-serif flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#D4A373]" />
              <span>Day-by-Day Tour Itinerary</span>
            </h3>

            <div className="space-y-4">
              {packageData.itinerary.map((day) => (
                <div key={day.day} className="p-5 rounded-2xl bg-[#F4F1EA]/60 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-[#1B4332] text-white text-[10px] font-black uppercase tracking-widest">
                      DAY {day.day}
                    </span>
                    <h4 className="font-bold text-[#1B4332] dark:text-emerald-400 text-base font-serif">{day.title}</h4>
                  </div>
                  <p className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed pl-1">
                    {day.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200 dark:border-slate-800">
            {/* Inclusions */}
            <div className="space-y-3 bg-[#F4F1EA] dark:bg-slate-800 p-5 rounded-2xl border border-gray-200 dark:border-slate-700">
              <h4 className="font-bold text-sm flex items-center gap-2 text-[#1B4332] dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4 text-[#1B4332] dark:text-emerald-400" />
                <span className="font-serif">What's Included</span>
              </h4>
              <ul className="space-y-2 text-xs text-gray-700 dark:text-slate-300">
                {packageData.inclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1B4332] dark:bg-emerald-400 shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions */}
            <div className="space-y-3 bg-red-50/50 dark:bg-red-950/30 p-5 rounded-2xl border border-red-100 dark:border-red-900/50">
              <h4 className="font-bold text-sm flex items-center gap-2 text-red-900 dark:text-red-400">
                <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                <span className="font-serif">What's Excluded</span>
              </h4>
              <ul className="space-y-2 text-xs text-gray-700 dark:text-slate-300">
                {packageData.exclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA Footer */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100 dark:border-slate-800">
            <p className="text-xs text-gray-500 dark:text-slate-400">
              Need custom dates, group discounts, or flight upgrades?
            </p>
            <button
              onClick={() => {
                onClose();
                onOpenQuoteForPackage(packageData.title);
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#1B4332] dark:border-emerald-500 text-[#1B4332] dark:text-emerald-400 font-bold text-xs uppercase tracking-wider hover:bg-[#1B4332] dark:hover:bg-emerald-600 hover:text-white transition-all"
            >
              Request Custom Adjustments
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
