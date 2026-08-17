import React from 'react';
import { SafeImage } from './SafeImage';

interface SirikoiBucketListProps {
  onEnquireNow: () => void;
}

export const SirikoiBucketList: React.FC<SirikoiBucketListProps> = ({ onEnquireNow }) => {
  return (
    <section id="bucket-list" className="relative w-full h-[450px] sm:h-[550px] overflow-hidden flex items-center justify-center text-center select-none">
      {/* Full-width evening safari sunset image */}
      <div className="absolute inset-0 bg-stone-900">
        <SafeImage
          src="/images/safari_sunset_horizon.jpg"
          alt="Add Remax Safaris to your bucket list"
          className="w-full h-full object-cover object-center scale-105"
          fallbackSrc="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=80"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Centered Editorial Call to Action */}
      <div className="relative z-10 px-4 sm:px-8 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif text-white font-normal uppercase tracking-wider leading-tight">
          ADD REMAX SAFARIS <br className="hidden sm:inline" />
          TO YOUR BUCKET LIST.
        </h2>

        <div className="pt-2">
          <button
            onClick={onEnquireNow}
            className="sirikoi-button text-xs py-3.5 px-10 shadow-2xl"
          >
            Enquire now
          </button>
        </div>
      </div>
    </section>
  );
};
