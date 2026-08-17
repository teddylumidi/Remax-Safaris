import React, { useState } from 'react';
import { DESTINATIONS } from '../data/destinations';
import { TOUR_PACKAGES } from '../data/packages';
import { SafeImage } from './SafeImage';
import { useImageLightbox, LightboxImage } from '../context/ImageLightboxContext';
import { Camera, Maximize2, Sparkles, Filter, MapPin, Layers } from 'lucide-react';

// Collect a curated gallery list from destinations and packages
const GALLERY_ITEMS: (LightboxImage & { id: string; category: string })[] = [
  ...DESTINATIONS.flatMap((d) => {
    const images = d.galleryImages && d.galleryImages.length > 0 ? d.galleryImages : [d.image];
    return images.map((imgSrc, idx) => ({
      id: `dest-${d.id}-${idx}`,
      src: imgSrc,
      title: `${d.name}${images.length > 1 ? ` (${
        d.id === 'cape-town'
          ? (idx === 0 ? 'Table Mountain' : 'Camps Bay')
          : d.id === 'amboseli'
          ? (idx === 0 ? 'Kibo Lodge Welcome' : 'Karibu Bar Lounge')
          : d.id === 'maasai-mara'
          ? (idx === 0 ? 'Binocular Game Drive' : idx === 1 ? '4x4 Savannah Safari' : `View ${idx + 1}`)
          : d.id === 'nairobi'
          ? (idx === 0 ? '4x4 Cruiser Game Drive' : idx === 1 ? 'Binocular Spotting' : `View ${idx + 1}`)
          : d.id === 'naivasha'
          ? (idx === 0 ? 'Lake Hippo Shores' : idx === 1 ? 'Boat Safari & Fish Eagles' : `View ${idx + 1}`)
          : d.id === 'nakuru'
          ? (idx === 0 ? 'Flamingo Haven at Lake Shore' : idx === 1 ? 'Pink Flamingos on Water' : idx === 2 ? 'Lake Nakuru Flamingo Flock' : 'Lesser Flamingo Close-up')
          : d.id === 'zanzibar'
          ? (idx === 0 ? 'Baraka Turtle Sanctuary' : idx === 1 ? 'Nungwi Beach Dhow' : `View ${idx + 1}`)
          : `View ${idx + 1}`
      })` : ''}`,
      category: d.experienceType || (d.category === 'kenya' ? 'Safari' : 'International'),
      location: d.category === 'kenya' ? 'Kenya' : 'International',
      description: d.tagline
    }));
  }),
  ...TOUR_PACKAGES.flatMap((p) => {
    const images = p.galleryImages && p.galleryImages.length > 0 ? p.galleryImages : [p.image];
    return images.map((imgSrc, idx) => ({
      id: `pkg-${p.id}-${idx}`,
      src: imgSrc,
      title: `${p.title}${images.length > 1 ? ` - Image ${idx + 1}` : ''}`,
      category: p.category === 'kenya' ? 'Safari' : 'International',
      location: p.destinationName,
      description: `${p.duration} Tour Package`
    }));
  })
];

// Remove duplicates based on src URL
const UNIQUE_GALLERY_ITEMS = Array.from(
  new Map(GALLERY_ITEMS.map((item) => [item.src, item])).values()
);

const CATEGORIES = ['All', 'Safari', 'Beach', 'Nature', 'City', 'International'];

export const PhotoGallerySection: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const { openLightbox } = useImageLightbox();

  const filteredItems = UNIQUE_GALLERY_ITEMS.filter((item) => {
    if (selectedCat === 'All') return true;
    if (selectedCat === 'International') return item.location === 'International';
    return item.category.toLowerCase().includes(selectedCat.toLowerCase());
  });

  const handleOpenGalleryItem = (index: number) => {
    const lightboxList = filteredItems.map((item) => ({
      src: item.src,
      title: item.title,
      location: item.location,
      description: item.description
    }));
    openLightbox(lightboxList, index);
  };

  return (
    <section id="photo-gallery" className="py-16 sm:py-24 bg-slate-100 dark:bg-slate-950/80 border-t border-gray-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-md bg-[#D4A373] text-slate-950 text-[11px] font-black uppercase tracking-[0.25em]">
            <Camera className="w-3.5 h-3.5" />
            <span>Interactive Media Showcase</span>
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B4332] dark:text-emerald-400 tracking-tight font-serif">
            Explore Destination Photo Gallery
          </h2>

          <p className="text-gray-600 dark:text-slate-300 text-base">
            Click any photo to open in our high-definition interactive viewer with zoom, full-screen view, and instant booking inquiry capabilities.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCat === cat
                    ? 'bg-[#1B4332] text-white shadow-md font-extrabold scale-105'
                    : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700'
                }`}
              >
                {cat === 'All' ? '📸 All Photos' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {filteredItems.slice(0, 24).map((item, idx) => (
            <div
              key={item.id}
              onClick={() => handleOpenGalleryItem(idx)}
              className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-slate-800 border border-slate-200 dark:border-slate-800"
            >
              <SafeImage
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3" />

              {/* Expand Icon Hover Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="p-3 rounded-full bg-slate-900/80 backdrop-blur-md text-[#D4A373] border border-white/20 transform group-hover:scale-110 transition-all shadow-xl">
                  <Maximize2 className="w-5 h-5" />
                </span>
              </div>

              {/* Title label at bottom */}
              <div className="absolute bottom-2 left-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <p className="text-xs font-bold truncate drop-shadow-sm">{item.title}</p>
                <p className="text-[10px] text-[#D4A373] font-semibold flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5" />
                  {item.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-10">
          <button
            type="button"
            onClick={() => handleOpenGalleryItem(0)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1B4332] hover:bg-[#2D5A46] text-white font-black text-xs uppercase tracking-wider shadow-lg transition-all hover:scale-105"
          >
            <Layers className="w-4 h-4 text-[#D4A373]" />
            <span>Launch Full HD Lightbox Gallery Viewer ({filteredItems.length} Photos)</span>
          </button>
        </div>

      </div>
    </section>
  );
};
