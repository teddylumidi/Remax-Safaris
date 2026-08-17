import React from 'react';
import { SafeImage } from './SafeImage';

interface SirikoiAwaitsProps {
  onSelectCard?: (category: string) => void;
  onOpenUaeCities?: () => void;
}

export const SirikoiAwaits: React.FC<SirikoiAwaitsProps> = ({
  onSelectCard,
  onOpenUaeCities
}) => {
  const items = [
    {
      id: 'safari-adventures',
      title: 'SAFARI ADVENTURES',
      desc: 'Sunset game drives, hot air balloon flights, and tracked predator encounters in Maasai Mara.',
      image: '/images/park_safari_cruiser_wildlife.jpg',
      fallback: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=800&q=80',
      action: () => onSelectCard?.('safari')
    },
    {
      id: 'wildlife-encounters',
      title: 'WILDLIFE ENCOUNTERS',
      desc: 'Front-row seats to the Great Migration, Amboseli elephant herds, and endangered black rhinos.',
      image: '/images/bespoke_safari_elephants.jpg',
      fallback: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
      action: () => onSelectCard?.('wildlife')
    },
    {
      id: 'cultural-experiences',
      title: 'CULTURAL EXPERIENCES',
      desc: 'Traditional Maasai and Samburu warrior village heritage tours and local artisan workshops.',
      image: '/images/safari_warrior_heritage.jpg',
      fallback: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80',
      action: () => onSelectCard?.('culture')
    },
    {
      id: 'conservation-in-action',
      title: 'CONSERVATION IN ACTION',
      desc: 'Supporting Lewa & Ol Pejeta rhino sanctuaries, anti-poaching units, and community health.',
      image: '/images/park_game_drive_binoculars.jpg',
      fallback: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80',
      action: () => onSelectCard?.('conservation')
    },
    {
      id: 'farm-to-table',
      title: 'FARM-TO-TABLE DINING',
      desc: 'Organic garden dining, candlelit bush breakfasts, and scenic sundowners under acacia trees.',
      image: '/images/amboseli_kibo_lounge.jpg',
      fallback: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      action: () => onSelectCard?.('dining')
    },
    {
      id: 'relax-unwind',
      title: 'RELAX AND UNWIND',
      desc: 'Infinity pools overlooking natural watering holes, bush spa wellness, and private retreats.',
      image: '/images/kisumu_lake_victoria_sunset.jpg',
      fallback: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      action: () => onSelectCard?.('relax')
    }
  ];

  return (
    <section id="what-awaits" className="py-24 sm:py-32 bg-[#FAF6F0] dark:bg-[#0A120E] text-[#1A2621] dark:text-[#F0F4F2] transition-colors duration-300 border-t border-[#EAE3D6] dark:border-[#1E3025]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Heading */}
        <div className="sirikoi-heading mb-6">
          <p className="sub">UNIQUE AFRICAN EXPERIENCE</p>
          <h2>What awaits you at Remax Safaris</h2>
        </div>

        {/* Center Text Block Narrow */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <p className="text-base sm:text-lg font-serif italic text-stone-700 dark:text-stone-300 leading-relaxed">
            To be on safari at Remax Safaris is to step into a layered journey, one that immerses you in the untamed wilderness while quietly opening doors within yourself.
          </p>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
            Here, in the heart of East Africa’s iconic conservancies, you stand in landscapes shaped not only by nature, but by decades of passionate wildlife conservation and warm hospitality.
          </p>
        </div>

        {/* 6 Experience Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative group overflow-hidden bg-stone-900 flex flex-col justify-end min-h-[380px] sm:min-h-[420px] shadow-md hover:shadow-2xl transition-all duration-500"
            >
              {/* Card Image */}
              <div className="absolute inset-0 w-full h-full">
                <SafeImage
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  fallbackSrc={item.fallback}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              </div>

              {/* Card Overlay Content */}
              <div className="relative z-10 p-6 text-center flex flex-col items-center space-y-2">
                <h3 className="text-lg sm:text-xl font-serif text-white uppercase tracking-wider font-normal">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-300 font-light leading-relaxed max-w-xs line-clamp-2">
                  {item.desc}
                </p>
                <div className="pt-2">
                  <button
                    onClick={item.action}
                    className="sirikoi-button text-[10px] py-2 px-6"
                  >
                    Explore
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
