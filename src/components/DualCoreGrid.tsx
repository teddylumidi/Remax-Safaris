import React from 'react';
import { ArrowRight, Compass, Globe, Sparkles, Shield, Award, Calendar } from 'lucide-react';
import { SafeImage } from './SafeImage';

interface DualCoreGridProps {
  onExploreSafaris: () => void;
  onConsultExpert: () => void;
}

export const DualCoreGrid: React.FC<DualCoreGridProps> = ({
  onExploreSafaris,
  onConsultExpert
}) => {
  return (
    <section id="the-pillars" className="py-20 sm:py-28 bg-[#FDFBF7] dark:bg-[#0A120E] text-[#1A2621] dark:text-[#F0F4F2] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <p className="text-xs uppercase tracking-[0.25em] font-semibold text-[#3D5A45] dark:text-[#8FA896] mb-3">
            Two Distinctive Pillars • Infinite Horizons
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#12231A] dark:text-[#FDFBF7] leading-tight">
            Crafted for the Discerning Explorer
          </h2>
          <div className="w-12 h-[1px] bg-[#C88A4B] mx-auto my-5 opacity-70" />
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            From the untamed golden savannahs of East Africa to the world’s most private archipelagos, we curate seamless, worry-free journeys guided by bespoke mastery.
          </p>
        </div>

        {/* The Dual-Core 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Card: Bespoke Kenya Safaris */}
          <div 
            className="group relative bg-white dark:bg-[#101C15] rounded-none border border-[#E8E2D6] dark:border-[#1E3025] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col justify-between"
          >
            {/* Image Box */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 dark:bg-stone-900">
              <SafeImage
                src="/images/bespoke_safari_elephants.jpg"
                alt="Amboseli wild elephants near Mount Kilimanjaro - Bespoke Kenya Safaris"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                fallbackSrc="https://images.unsplash.com/photo-1581852017103-68ac65514cf7?auto=format&fit=crop&w=1200&q=80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
              
              {/* Badge */}
              <div className="absolute top-6 left-6 flex items-center gap-2 bg-[#12231A]/90 backdrop-blur-md text-[#FDFBF7] px-3.5 py-1.5 text-[11px] uppercase tracking-widest font-medium border border-white/10">
                <Compass className="w-3.5 h-3.5 text-[#C88A4B]" />
                <span>African Wilderness</span>
              </div>
            </div>

            {/* Content Box */}
            <div className="p-8 sm:p-10 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-widest text-[#C88A4B] font-semibold">
                  Pillar I • Authentic East Africa
                </p>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#12231A] dark:text-[#FDFBF7] font-normal leading-snug">
                  Bespoke Kenya Safaris
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                  Immerse yourself in private concessions, front-row seats to the Great Wildebeest Migration, intimate tented camps under acacia canopies, and silver-certified naturalist guides dedicated solely to your party.
                </p>

                {/* Highlights */}
                <div className="pt-3 grid grid-cols-2 gap-2.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3D5A45]" />
                    <span>Maasai Mara & Great Migration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3D5A45]" />
                    <span>Amboseli Kilimanjaro Herds</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3D5A45]" />
                    <span>Private Chartered Bush Flights</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3D5A45]" />
                    <span>Diani & Lamu Ocean Hideaways</span>
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-4 border-t border-[#E8E2D6] dark:border-[#1E3025]">
                <button
                  onClick={onExploreSafaris}
                  className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-[#12231A] dark:text-[#FDFBF7] group-hover:text-[#3D5A45] dark:group-hover:text-[#8FA896] transition-colors"
                >
                  <span>Explore Safaris</span>
                  <ArrowRight className="w-4 h-4 text-[#C88A4B] group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Card: Global Travel Consultancy */}
          <div 
            className="group relative bg-white dark:bg-[#101C15] rounded-none border border-[#E8E2D6] dark:border-[#1E3025] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col justify-between"
          >
            {/* Image Box */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 dark:bg-stone-900">
              <SafeImage
                src="/images/global_luxury_travel.jpg"
                alt="Curated worldwide luxury destinations - Global Travel Consultancy"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                fallbackSrc="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
              
              {/* Badge */}
              <div className="absolute top-6 left-6 flex items-center gap-2 bg-[#12231A]/90 backdrop-blur-md text-[#FDFBF7] px-3.5 py-1.5 text-[11px] uppercase tracking-widest font-medium border border-white/10">
                <Globe className="w-3.5 h-3.5 text-[#C88A4B]" />
                <span>Worldwide Horizons</span>
              </div>
            </div>

            {/* Content Box */}
            <div className="p-8 sm:p-10 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-widest text-[#C88A4B] font-semibold">
                  Pillar II • Worldwide Advisory
                </p>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#12231A] dark:text-[#FDFBF7] font-normal leading-snug">
                  Global Travel Consultancy
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                  Tailored corporate expeditions, luxury global holidays, fast-track visa processing, premium airline booking, and 24/7 dedicated travel concierge for destinations spanning Europe, the Middle East, Asia, and beyond.
                </p>

                {/* Highlights */}
                <div className="pt-3 grid grid-cols-2 gap-2.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C88A4B]" />
                    <span>Dubai & UAE Luxury Escapes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C88A4B]" />
                    <span>Fast-Track Global Visas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C88A4B]" />
                    <span>South Africa & Winelands</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C88A4B]" />
                    <span>24/7 Itinerary Support</span>
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-4 border-t border-[#E8E2D6] dark:border-[#1E3025]">
                <button
                  onClick={onConsultExpert}
                  className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-[#12231A] dark:text-[#FDFBF7] group-hover:text-[#C88A4B] transition-colors"
                >
                  <span>Consult an Expert</span>
                  <ArrowRight className="w-4 h-4 text-[#C88A4B] group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
