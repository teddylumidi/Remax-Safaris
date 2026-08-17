import React from 'react';
import { Compass, Award, ShieldCheck, HeartHandshake, Sparkles, Trees, CheckCircle2, UserCheck, PlaneTakeoff } from 'lucide-react';
import { getWhatsAppLink } from '../utils/whatsapp';

interface TrustImpactSectionProps {
  onOpenQuote: () => void;
}

export const TrustImpactSection: React.FC<TrustImpactSectionProps> = ({
  onOpenQuote
}) => {
  const pillars = [
    {
      icon: UserCheck,
      number: '01',
      title: 'Bespoke Personalized Itineraries',
      subtitle: 'Tailored to your individual rhythm',
      description: 'We do not sell cookie-cutter tours. Every single itinerary is personally curated by our senior travel directors to match your exact dates, passions, family dynamics, and luxury comfort preferences.'
    },
    {
      icon: Award,
      number: '02',
      title: 'KPSGA-Certified Safari Naturalists',
      subtitle: 'Decades of wildlife expertise',
      description: 'Our safari guides are Kenya Professional Safari Guides Association (KPSGA) certified naturalists with unparalleled tracking instincts, deep botanical knowledge, and passionate storytelling.'
    },
    {
      icon: PlaneTakeoff,
      number: '03',
      title: 'End-to-End Global Concierge',
      subtitle: 'Effortless door-to-door coordination',
      description: 'From private bush airstrip charters and fast-track international visas to luxury hotel suites and 24/7 dedicated dispatch, we orchestrate every detail so you travel without friction.'
    },
    {
      icon: Trees,
      number: '04',
      title: 'Conservation & Community Heritage',
      subtitle: 'Preserving wild ecosystems',
      description: 'A proportion of every booking directly sustains local community conservancies, anti-poaching wildlife trusts, and sustainable eco-lodges across East Africa.'
    }
  ];

  return (
    <section id="the-consultancy" className="py-24 sm:py-32 bg-[#FDFBF7] dark:bg-[#0A120E] text-[#1A2621] dark:text-[#F0F4F2] transition-colors duration-300 border-t border-[#E8E2D6] dark:border-[#1E3025]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Typographic Block with Generous White Space */}
        <div className="max-w-4xl mx-auto text-center mb-20 sm:mb-24 space-y-6">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold text-[#3D5A45] dark:text-[#8FA896]">
            The Remax Standard
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-[#12231A] dark:text-[#FDFBF7] leading-tight">
            “Travel is the art of connection — orchestrated with precision, lived with grace.”
          </h2>
          <div className="w-16 h-[1px] bg-[#C88A4B] mx-auto opacity-75" />
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            Remax Safaris bridges authentic African wilderness heritage with world-class international travel consulting, delivering unforgettable journeys with absolute discretion.
          </p>
        </div>

        {/* 4 Trust & Impact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="bg-white dark:bg-[#101C15] p-8 sm:p-10 border border-[#E8E2D6] dark:border-[#1E3025] flex flex-col justify-between hover:border-[#C88A4B] dark:hover:border-[#C88A4B] transition-all duration-300 shadow-[0_2px_16px_rgba(0,0,0,0.02)]"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#C88A4B] font-bold tracking-widest">
                      {pillar.number}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#FAF7F0] dark:bg-[#15241B] flex items-center justify-center text-[#3D5A45] dark:text-[#8FA896]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-serif font-normal text-[#12231A] dark:text-[#FDFBF7] leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-xs uppercase tracking-wider text-[#3D5A45] dark:text-[#8FA896] font-semibold">
                    {pillar.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Minimalist Editorial Banner / CTA */}
        <div className="bg-[#12231A] dark:bg-[#101C15] text-[#FDFBF7] p-10 sm:p-14 lg:p-16 border border-[#233B2D] relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-[#C88A4B] font-semibold">
              Begin Your Custom Journey
            </p>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal text-white leading-snug">
              Speak Directly with a Senior Safari & Travel Director
            </h3>
            <p className="text-sm text-slate-300 font-light leading-relaxed">
              Whether arranging a private family safari in the Maasai Mara or a multi-destination global getaway, we ensure seamless execution from first consultation to return.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <button
              onClick={onOpenQuote}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#C88A4B] hover:bg-[#b57a3e] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors"
            >
              Plan Your Journey
            </button>
            <a
              href={getWhatsAppLink('Hello Remax Safaris, I would like to consult with a Senior Safari & Travel Director.')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-white/30 hover:border-white text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors text-center"
            >
              WhatsApp Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
