import React from 'react';
import { SafeImage } from './SafeImage';

interface SirikoiImpactProps {
  onExploreLocation?: () => void;
  onExploreImpact?: () => void;
}

export const SirikoiImpact: React.FC<SirikoiImpactProps> = ({
  onExploreLocation,
  onExploreImpact
}) => {
  return (
    <section id="impact" className="py-24 sm:py-32 bg-[#F5EFEB] dark:bg-[#070D09] text-[#1A2621] dark:text-[#F0F4F2] transition-colors duration-300 border-t border-[#EAE3D6] dark:border-[#1E3025]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-16 lg:space-y-20">
        
        {/* Card 1: DESTINATION / TRULY EXCEPTIONAL LOCATION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-white dark:bg-[#101C15] border border-[#E2DAD0] dark:border-[#1E3025] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
          <div className="lg:col-span-6 relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-auto lg:h-[450px] w-full overflow-hidden bg-stone-200 dark:bg-stone-900">
            <SafeImage
              src="/images/safari_landscape_expanse.jpg"
              alt="Truly Exceptional Safari Location"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              fallbackSrc="/images/safari_landscape_expanse.jpg"
            />
          </div>

          <div className="lg:col-span-6 p-8 sm:p-12 space-y-5">
            <p className="text-[11px] uppercase tracking-[0.28em] font-semibold text-[#C88A4B]">
              DESTINATION
            </p>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-[#12231A] dark:text-[#FDFBF7] tracking-wide">
              TRULY EXCEPTIONAL LOCATION
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-light leading-relaxed">
              Remax Safaris operates across over 62,000 acres of pure wilderness in Kenya’s premier conservancies and national reserves. Enjoy year-round mild spring-like climates, uncrowded armchair game viewing, and private charter airstrip access.
            </p>
            <div className="pt-2">
              <button
                onClick={onExploreLocation}
                className="sirikoi-button"
              >
                Explore
              </button>
            </div>
          </div>
        </div>

        {/* Card 2: GIVING BACK / OUR IMPACT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-white dark:bg-[#101C15] border border-[#E2DAD0] dark:border-[#1E3025] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
          <div className="lg:col-span-6 relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-auto lg:h-[450px] w-full overflow-hidden bg-stone-200 dark:bg-stone-900 lg:order-2">
            <SafeImage
              src="/images/safari_warrior_heritage.jpg"
              alt="Our Impact & Community Conservation"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              fallbackSrc="/images/samburu_giraffe_reserve.jpg"
            />
          </div>

          <div className="lg:col-span-6 p-8 sm:p-12 space-y-5 lg:order-1">
            <p className="text-[11px] uppercase tracking-[0.28em] font-semibold text-[#C88A4B]">
              GIVING BACK
            </p>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-[#12231A] dark:text-[#FDFBF7] tracking-wide">
              OUR IMPACT
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-light leading-relaxed">
              Remax Safaris strongly believes that our impact matters. Working closely with local indigenous communities, female guide mentorship programs, and frontline wildlife rangers to affect positive change and protect ecosystems.
            </p>
            <div className="pt-2">
              <button
                onClick={onExploreImpact}
                className="sirikoi-button"
              >
                Explore
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
