import React, { useState } from 'react';
import { SafeImage } from './SafeImage';

interface SirikoiExperienceProps {
  onSelectExperience?: (type: string) => void;
  onOpenUaeCities?: () => void;
}

export const SirikoiExperience: React.FC<SirikoiExperienceProps> = ({
  onSelectExperience,
  onOpenUaeCities
}) => {
  const [activeCard, setActiveCard] = useState<number>(1);

  const experiences = [
    {
      id: 'remax-house',
      title: 'REMAX SAFARI HOUSE',
      tagline: 'A beautiful home immersed in nature',
      image: '/images/luxury_safari_hero_sirikoi.jpg',
      fallback: '/images/samburu_giraffe_reserve.jpg',
      action: () => onSelectExperience?.('house')
    },
    {
      id: 'remax-cottage',
      title: 'REMAX SAFARI COTTAGE',
      tagline: 'Private home with two en-suite bedrooms',
      image: '/images/amboseli_kibo_lounge.jpg',
      fallback: '/images/park_game_drive_binoculars.jpg',
      action: () => onSelectExperience?.('cottage')
    },
    {
      id: 'luxury-tents',
      title: 'LUXURY SAFARI TENTS',
      tagline: '4 En-suite tents with private viewing decks',
      image: '/images/bespoke_safari_elephants.jpg',
      fallback: '/images/uae_dubai_burj_khalifa.jpg',
      action: () => onSelectExperience?.('tents')
    }
  ];

  return (
    <section id="the-experience" className="py-24 sm:py-32 bg-[#FAF6F0] dark:bg-[#070D09] text-[#1A2621] dark:text-[#F0F4F2] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Sirikoi Styled Heading */}
        <div className="sirikoi-heading mb-14 sm:mb-16">
          <p className="sub">ABSOLUTELY MAGICAL ACCOMMODATION</p>
          <h2>The Remax Safari Experience</h2>
        </div>

        {/* 3 Interactive Cards (block-columns three) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch">
          {experiences.map((exp, index) => {
            const isActive = activeCard === index;
            return (
              <div
                key={exp.id}
                onMouseEnter={() => setActiveCard(index)}
                className={`relative group overflow-hidden bg-stone-900 transition-all duration-500 flex flex-col justify-end min-h-[460px] sm:min-h-[520px] shadow-lg hover:shadow-2xl ${
                  isActive ? 'ring-2 ring-[#C88A4B] md:-translate-y-2' : 'opacity-95 hover:opacity-100'
                }`}
              >
                {/* Full Background Card Image */}
                <div className="absolute inset-0 w-full h-full">
                  <SafeImage
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    fallbackSrc={exp.fallback}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                </div>

                {/* Bottom Card Content Overlay */}
                <div className="relative z-10 p-8 text-center flex flex-col items-center space-y-3">
                  <h3 className="text-xl sm:text-2xl font-serif text-white uppercase tracking-wider font-normal">
                    {exp.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-200 font-light max-w-xs leading-relaxed">
                    {exp.tagline}
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={exp.action}
                      className="sirikoi-button"
                    >
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
