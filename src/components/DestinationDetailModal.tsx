import React, { useState } from 'react';
import { Destination } from '../types';
import { TOUR_PACKAGES } from '../data/packages';
import { formatDestinationInquiry, getWhatsAppLink } from '../utils/whatsapp';
import { SafeImage } from './SafeImage';
import { WhatsAppIcon } from './WhatsAppIcon';
import { X, MapPin, Calendar, CheckCircle2, Compass, Sparkles, Phone, ArrowRight, Maximize2, ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useImageLightbox } from '../context/ImageLightboxContext';

interface DestinationDetailModalProps {
  destination: Destination | null;
  onClose: () => void;
  onOpenQuoteForDestination: (destName: string) => void;
  onSelectPackage: (packageId: string) => void;
}

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  onClose,
  onOpenQuoteForDestination,
  onSelectPackage
}) => {
  const { openLightbox } = useImageLightbox();
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  if (!destination) return null;

  // Related packages and photo list
  const relatedPackages = TOUR_PACKAGES.filter(
    (pkg) => pkg.destinationId === destination.id || pkg.title.toLowerCase().includes(destination.name.toLowerCase())
  );

  const allPhotos = destination.galleryImages && destination.galleryImages.length > 0
    ? destination.galleryImages
    : [destination.image];

  const getPhotoTitle = (index: number) => {
    if (destination.id === 'cape-town') {
      return index === 0 ? 'Table Mountain Summit Panorama' : 'Camps Bay Coastal & Ocean View';
    }
    if (destination.id === 'nakuru') {
      if (index === 0) return 'Lake Nakuru Shoreline & Flamingos';
      if (index === 1) return 'Pink Flamingos on Water Mirror';
      if (index === 2) return 'Lake Nakuru Vibrant Flock';
      return 'Lesser Flamingo Close-up';
    }
    if (destination.id === 'amboseli') {
      return index === 0 ? 'Kibo Camp Welcome' : 'Karibu Bar Lounge';
    }
    if (destination.id === 'maasai-mara') {
      return index === 0 ? 'Binocular Game Drive' : index === 1 ? '4x4 Savannah Wildlife Safari' : `Photo ${index + 1}`;
    }
    if (destination.id === 'nairobi') {
      return index === 0 ? '4x4 Open Roof Safari' : index === 1 ? 'Binocular Game Drive Spotting' : `Photo ${index + 1}`;
    }
    if (destination.id === 'naivasha') {
      return index === 0 ? 'Lake Naivasha Hippo Shores' : index === 1 ? 'Motorboat Safari & Fish Eagles' : `Photo ${index + 1}`;
    }
    if (destination.id === 'zanzibar') {
      return index === 0 ? 'Turtle Sanctuary' : 'Lagoon Turtles';
    }
    if (destination.id === 'kisumu') {
      return index === 0 ? 'Lake Victoria Sunset' : 'Dunga Beach & Boardwalk';
    }
    return `Photo ${index + 1}`;
  };

  const handleOpenPhoto = (index: number = activePhotoIndex) => {
    const list = allPhotos.map((img, i) => ({
      src: img,
      title: `${destination.name} - ${getPhotoTitle(i)}`,
      location: destination.category === 'kenya' ? 'Kenya' : 'International',
      description: destination.tagline
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

  const currentBannerImage = allPhotos[activePhotoIndex] || destination.image;

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

        {/* Modal Banner Image */}
        <div 
          className="relative h-72 sm:h-80 w-full overflow-hidden rounded-t-3xl cursor-pointer group/banner"
          onClick={() => handleOpenPhoto(activePhotoIndex)}
        >
          <SafeImage
            src={currentBannerImage}
            alt={`${destination.name} - ${getPhotoTitle(activePhotoIndex)}`}
            fallbackCategory={destination.category}
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
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest bg-[#1B4332] text-white">
                {destination.category === 'kenya' ? '🇰🇪 Kenya Destination' : '🌐 International Destination'}
              </span>
              <span className="px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white">
                Best: {destination.bestTimeToVisit}
              </span>
              {allPhotos.length > 1 && (
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-[#D4A373] text-slate-950">
                  {getPhotoTitle(activePhotoIndex)}
                </span>
              )}
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white">
              {destination.name}
            </h2>
            <p className="text-[#D4A373] font-bold text-sm sm:text-base">
              {destination.tagline}
            </p>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-8 bg-white dark:bg-slate-900">
          
          {/* Overview */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-[#1B4332] dark:text-emerald-400 font-serif flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#D4A373]" />
              <span>About {destination.name}</span>
            </h3>
            <p className="text-gray-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              {destination.description}
            </p>
          </div>

          {/* Photo Gallery Thumbnails Strip (Interchangeable switchers) */}
          {allPhotos.length > 1 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black text-[#1B4332] dark:text-emerald-400 uppercase tracking-widest flex items-center gap-2 font-serif">
                  <ImageIcon className="w-4 h-4 text-[#D4A373]" />
                  <span>Interchangeable Photo Views ({allPhotos.length})</span>
                </h4>
                <span className="text-[11px] text-gray-500 dark:text-slate-400 font-medium">Click thumbnail to switch main view</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
                        alt={`${destination.name} photo ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className={`absolute inset-0 transition-colors ${isSelected ? 'bg-transparent' : 'bg-slate-950/20 group-hover:bg-slate-950/0'}`} />
                      <div className={`absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold backdrop-blur-sm ${
                        isSelected ? 'bg-[#D4A373] text-slate-950' : 'bg-slate-900/80 text-white'
                      }`}>
                        {getPhotoTitle(idx)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Highlights & Activities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#F4F1EA] dark:bg-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-slate-700">
            <div className="space-y-3">
              <h4 className="text-[10px] font-black text-[#D4A373] uppercase tracking-[0.2em] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#D4A373]" />
                <span>Top Highlights</span>
              </h4>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-slate-200">
                {destination.highlights.map((hl, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1B4332] dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-[10px] font-black text-[#D4A373] uppercase tracking-[0.2em] flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#1B4332] dark:text-emerald-400" />
                <span>Popular Activities</span>
              </h4>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-slate-200">
                {destination.popularActivities.map((act, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#1B4332] dark:bg-emerald-400 shrink-0 mt-1.5" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Related Packages if Any */}
          {relatedPackages.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#1B4332] dark:text-emerald-400 font-serif">
                Available Tour Packages for {destination.name}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {relatedPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-[#F4F1EA]/60 dark:bg-slate-800/60 hover:bg-[#F4F1EA] dark:hover:bg-slate-800 transition-all gap-4"
                  >
                    <div>
                      <h4 className="font-bold text-[#1B4332] dark:text-emerald-400 text-sm">{pkg.title}</h4>
                      <p className="text-xs text-gray-600 dark:text-slate-300">
                        {pkg.duration} • KES {pkg.priceKES?.toLocaleString() ?? 0} / ${pkg.priceUSD ?? 0}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onSelectPackage(pkg.id);
                      }}
                      className="px-4 py-2 bg-[#1B4332] hover:bg-[#2D5A46] text-white rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap shadow-sm"
                    >
                      View Itinerary
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pricing & Booking CTA */}
          <div className="p-6 rounded-2xl bg-[#1B4332] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-[10px] text-[#D4A373] font-black uppercase tracking-[0.2em] block">
                Standard Rates From
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-white">
                  {destination.startingPriceKES
                    ? `KES ${destination.startingPriceKES.toLocaleString()}`
                    : 'Custom Rates'}
                </span>
                {destination.startingPriceUSD && (
                  <span className="text-xs text-gray-200 font-bold">
                    (${destination.startingPriceUSD} USD)
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-300 pt-1">
                Includes transfers, accommodation options & guided tours.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={getWhatsAppLink(formatDestinationInquiry(destination.name, destination.category))}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#25D366] hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Book Now</span>
              </a>

              <button
                onClick={() => {
                  onClose();
                  onOpenQuoteForDestination(destination.name);
                }}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition-all text-center"
              >
                Custom Quote
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
