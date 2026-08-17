import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SafeImage } from '../components/SafeImage';
import { X, ZoomIn, ZoomOut, RotateCw, Download, Share2, ChevronLeft, ChevronRight, MapPin, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { getWhatsAppLink } from '../utils/whatsapp';

export interface LightboxImage {
  src: string;
  title: string;
  category?: string;
  description?: string;
  location?: string;
}

interface ImageLightboxContextType {
  openLightbox: (images: LightboxImage | LightboxImage[], initialIndex?: number) => void;
  closeLightbox: () => void;
}

const ImageLightboxContext = createContext<ImageLightboxContextType | undefined>(undefined);

export const useImageLightbox = (): ImageLightboxContextType => {
  const context = useContext(ImageLightboxContext);
  if (!context) {
    throw new Error('useImageLightbox must be used within an ImageLightboxProvider');
  }
  return context;
};

interface ImageLightboxProviderProps {
  children: ReactNode;
}

export const ImageLightboxProvider: React.FC<ImageLightboxProviderProps> = ({ children }) => {
  const [images, setImages] = useState<LightboxImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const openLightbox = (imgInput: LightboxImage | LightboxImage[], initialIndex: number = 0) => {
    const list = Array.isArray(imgInput) ? imgInput : [imgInput];
    setImages(list);
    setCurrentIndex(Math.min(initialIndex, list.length - 1));
    setZoom(1);
    setRotation(0);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
    setZoom(1);
    setRotation(0);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (images.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setZoom(1);
    setRotation(0);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (images.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setZoom(1);
    setRotation(0);
  };

  const currentImg = images[currentIndex];

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoom((prev) => Math.min(prev + 0.3, 2.5));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoom((prev) => Math.max(prev - 0.3, 0.7));
  };

  const handleRotate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentImg?.src) {
      try {
        await navigator.clipboard.writeText(currentImg.src);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy', err);
      }
    }
  };

  return (
    <ImageLightboxContext.Provider value={{ openLightbox, closeLightbox }}>
      {children}

      {/* Lightbox Modal Overlay */}
      {isOpen && currentImg && (
        <div
          className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 transition-all duration-300 animate-in fade-in"
          onClick={closeLightbox}
        >
          {/* Top Control Bar */}
          <div
            className="flex items-center justify-between w-full max-w-6xl mx-auto z-10 bg-slate-900/80 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <span className="p-1.5 bg-[#D4A373] text-slate-950 rounded-lg">
                <Sparkles className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-white font-bold text-sm sm:text-base line-clamp-1">
                  {currentImg.title}
                </h3>
                {images.length > 1 && (
                  <p className="text-xs text-emerald-400 font-semibold">
                    Photo {currentIndex + 1} of {images.length}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={handleZoomIn}
                className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                type="button"
                onClick={handleZoomOut}
                className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                type="button"
                onClick={handleRotate}
                className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                title="Rotate"
              >
                <RotateCw className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all relative"
                title="Copy Image URL"
              >
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                {copied && (
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                    Copied!
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={closeLightbox}
                className="p-2 ml-2 text-white bg-red-500/80 hover:bg-red-600 rounded-xl transition-all shadow-md"
                title="Close Viewer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Display Stage */}
          <div
            className="relative flex-1 flex items-center justify-center my-4 overflow-hidden select-none cursor-grab active:cursor-grabbing"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-2 sm:left-6 z-20 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/20 transition-all hover:scale-110 shadow-2xl"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Image Box */}
            <div
              className="transition-transform duration-300 ease-out flex items-center justify-center max-w-full max-h-[75vh]"
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg)`
              }}
            >
              <SafeImage
                src={currentImg.src}
                alt={currentImg.title}
                className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/10"
              />
            </div>

            {/* Next Button */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-2 sm:right-6 z-20 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/20 transition-all hover:scale-110 shadow-2xl"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Caption & Action Bar */}
          <div
            className="w-full max-w-4xl mx-auto bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-left space-y-1 w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <span className="text-white font-serif font-bold text-base sm:text-lg">
                  {currentImg.title}
                </span>
                {currentImg.location && (
                  <span className="inline-flex items-center gap-1 text-xs text-[#D4A373] bg-amber-950/60 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-semibold">
                    <MapPin className="w-3 h-3" />
                    {currentImg.location}
                  </span>
                )}
              </div>
              {currentImg.description && (
                <p className="text-xs text-gray-300 line-clamp-2 max-w-xl">
                  {currentImg.description}
                </p>
              )}
            </div>

            <a
              href={getWhatsAppLink(`Hello Remax Safaris! I am inquiring about this photo/destination: ${currentImg.title}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider shadow-lg transition-all shrink-0"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>Inquire About This Photo</span>
            </a>
          </div>
        </div>
      )}
    </ImageLightboxContext.Provider>
  );
};
