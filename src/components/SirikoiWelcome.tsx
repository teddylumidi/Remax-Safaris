import React from 'react';

interface SirikoiWelcomeProps {
  onExploreMore?: () => void;
}

export const SirikoiWelcome: React.FC<SirikoiWelcomeProps> = ({ onExploreMore }) => {
  return (
    <>
      <div id="start" />
      <section id="the-lodge" className="py-20 sm:py-28 bg-[#FAF6F0] dark:bg-[#0A120E] text-[#1A2621] dark:text-[#F0F4F2] transition-colors duration-300 border-b border-[#EAE3D6] dark:border-[#1E3025]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Outlined Intro Heading Box */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start">
              <div className="w-full max-w-md p-8 sm:p-10 border-2 border-[#C88A4B] text-center bg-white/40 dark:bg-[#12231A]/40 backdrop-blur-sm shadow-[0_4px_24px_rgba(200,138,75,0.08)]">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#C88A4B] font-semibold block mb-2">
                  Bespoke East Africa Safaris
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#12231A] dark:text-[#FDFBF7] font-normal leading-snug">
                  <span className="italic font-light">Welcome</span> to <br />
                  Remax Safaris, Kenya
                </h2>
              </div>
            </div>

            {/* Right Intro Editorial Text */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-base sm:text-lg lg:text-xl text-stone-700 dark:text-stone-300 font-serif leading-relaxed italic">
                “Remax Safaris is a premier, bespoke, family-curated safari consultancy based in Kenya, specializing in tailored wilderness expeditions across East Africa's renowned UNESCO World Heritage reserves.”
              </p>
              <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                From the legendary open savannas of Maasai Mara and the dramatic elephant sanctuaries of Amboseli to the private conservancies of Lewa and Ol Pejeta, Remax Safaris offers East Africa’s best game-viewing and exciting travel experiences.
              </p>
              <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                Whether you seek private chartered bush planes, world-class organic farm-to-table dining in the savannah, or seamless combinations with the turquoise coast of Zanzibar and the gleaming skylines of Dubai, every detail is crafted with perfection.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};
