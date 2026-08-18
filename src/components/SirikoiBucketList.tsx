import React from 'react';
import { SafeImage } from './SafeImage';
import { Compass, Globe, TreePine, Sparkles } from 'lucide-react';

interface SirikoiBucketListProps {
  onEnquireNow: () => void;
}

const STATS = [
  { icon: Globe, value: '31', label: 'Curated Destinations' },
  { icon: TreePine, value: '18', label: 'Kenya Reserves' },
  { icon: Compass, value: '13', label: 'International Escapes' },
  { icon: Sparkles, value: '15+', label: 'Years of Excellence' },
];

export const SirikoiBucketList: React.FC<SirikoiBucketListProps> = ({ onEnquireNow }) => {
  return (
    <section id="bucket-list" className="relative w-full overflow-hidden select-none">

      {/* === STATS BAR === */}
      <div className="relative z-10 bg-[#12231A] border-b border-[#C88A4B]/30">
        <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-4 gap-0 divide-x divide-[#C88A4B]/20">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center justify-center py-2 px-4 gap-1 text-center">
              <Icon className="w-4 h-4 text-[#C88A4B] mb-0.5" />
              <span className="text-2xl sm:text-3xl font-serif font-normal text-white leading-none">{value}</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-light">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* === CINEMATIC HERO === */}
      <div className="relative h-[420px] sm:h-[520px] flex items-center justify-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <SafeImage
            src="/images/luxury_safari_hero_sirikoi.jpg"
            alt="Remax Safaris luxury experience"
            className="w-full h-full object-cover object-center"
            fallbackSrc="/images/safari_landscape_expanse.jpg"
          />
          {/* Multi-layer overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left: Editorial text */}
          <div className="space-y-6">
            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[#C88A4B] font-semibold">
              <span className="w-8 h-px bg-[#C88A4B]" />
              Bespoke Safari &amp; Travel
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white font-normal leading-tight">
              Add Remax Safaris<br />
              to Your<br />
              <em className="not-italic text-[#C88A4B]">Bucket List.</em>
            </h2>

            <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed max-w-md">
              From the flamingo lakes of the Great Rift Valley to Zanzibar's turtle sanctuaries — every journey is crafted for discerning travellers who expect nothing less than extraordinary.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={onEnquireNow}
                className="sirikoi-button text-xs py-3.5 px-10 shadow-2xl"
              >
                Plan My Journey
              </button>
              <button
                onClick={onEnquireNow}
                className="text-xs uppercase tracking-widest text-[#C88A4B] hover:text-white transition-colors py-3.5 px-6 border border-[#C88A4B]/40 hover:border-white/40 font-semibold"
              >
                Request Brochure
              </button>
            </div>
          </div>

          {/* Right: Accent image collage */}
          <div className="hidden lg:grid grid-cols-2 gap-2 h-64">
            <div className="row-span-2 rounded-sm overflow-hidden">
              <SafeImage
                src="/images/zanzibar_turtle_swimming.jpg"
                alt="Zanzibar turtle sanctuary"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="rounded-sm overflow-hidden">
              <SafeImage
                src="/images/nakuru_flamingos_shore.jpg"
                alt="Lake Nakuru flamingos"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="rounded-sm overflow-hidden">
              <SafeImage
                src="/images/capetown_table_mountain.jpg"
                alt="Cape Town Table Mountain"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
