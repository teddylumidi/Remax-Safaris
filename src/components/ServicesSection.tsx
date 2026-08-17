import React from 'react';
import { TRAVEL_SERVICES } from '../data/services';
import { getWhatsAppLink, COMPANY_EMAIL } from '../utils/whatsapp';
import { WhatsAppIcon } from './WhatsAppIcon';
import { FileText, Globe, Plane, Hotel, Compass, Car, CheckCircle, ArrowRight, ShieldCheck, Mail } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'FileText': return FileText;
      case 'Globe': return Globe;
      case 'Plane': return Plane;
      case 'Hotel': return Hotel;
      case 'Compass': return Compass;
      case 'Car': return Car;
      default: return CheckCircle;
    }
  };

  return (
    <section id="services" className="py-20 sm:py-28 bg-[#12231A] text-[#FDFBF7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-block px-3.5 py-1 bg-black/40 text-[#C88A4B] text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] border border-[#C88A4B]/30">
            Concierge & Travel Advisory
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-[#FDFBF7]">
            Comprehensive Travel Consultancy
          </h2>
          <div className="w-12 h-[1.5px] bg-[#C88A4B] mx-auto opacity-70" />

          <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
            From seamless passport and fast-track visa processing to worldwide airline ticketing, private 4x4 safari cruiser charters, and exclusive lodge reservations.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TRAVEL_SERVICES.map((srv) => {
            const Icon = getIconComponent(srv.iconName);

            return (
              <div
                key={srv.id}
                className="bg-[#FAF7F2] dark:bg-[#101C15] text-[#12231A] dark:text-[#FDFBF7] border border-[#E8E2D6] dark:border-[#1E3025] p-8 transition-all duration-300 flex flex-col justify-between group hover:border-[#C88A4B]"
              >
                <div className="space-y-5">
                  {/* Icon & Title */}
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-[#12231A] text-[#C88A4B] flex items-center justify-center shrink-0 border border-white/10">
                      <Icon className="w-5 h-5 text-[#C88A4B]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-serif font-normal text-[#12231A] dark:text-[#FDFBF7]">
                        {srv.title}
                      </h3>
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-[#C88A4B]">Fast-Track Concierge</span>
                    </div>
                  </div>

                  <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
                    {srv.shortDesc}
                  </p>

                  {/* Bullet points */}
                  <div className="space-y-2 pt-3 border-t border-[#E8E2D6] dark:border-[#1E3025]">
                    <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-[0.2em]">Service Inclusions:</p>
                    <ul className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300 font-light">
                      {srv.features.map((ft, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-[#3D5A45] dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{ft}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* WhatsApp Action */}
                <div className="pt-6 mt-6 border-t border-[#E8E2D6] dark:border-[#1E3025]">
                  <a
                    href={getWhatsAppLink(srv.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 bg-[#12231A] hover:bg-[#3D5A45] text-white text-xs uppercase tracking-[0.18em] font-semibold flex items-center justify-center gap-2 transition-colors duration-300"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                    <span>Inquire with Concierge</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

        {/* Support Banner */}
        <div className="mt-16 bg-[#0E1B14] border border-[#C88A4B]/40 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-serif font-normal text-white">Need Urgent Visa or Passport Guidance?</h3>
            <p className="text-stone-300 text-xs sm:text-sm max-w-xl font-light leading-relaxed">
              Our Senior Travel Directors are available directly via WhatsApp at <strong>+254 795 723 450</strong> or via email at <a href={`mailto:${COMPANY_EMAIL}`} className="underline text-[#C88A4B] hover:text-white font-medium">{COMPANY_EMAIL}</a> to verify documents and expedite processing.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`mailto:${COMPANY_EMAIL}`}
              className="px-6 py-3.5 bg-black/60 hover:bg-black/90 text-white text-xs uppercase tracking-[0.18em] font-semibold flex items-center gap-2 border border-white/20 transition-all"
            >
              <Mail className="w-4 h-4 text-[#C88A4B]" />
              <span>{COMPANY_EMAIL}</span>
            </a>

            <a
              href={getWhatsAppLink('Hello Remax Safaris, I need urgent passport / visa / travel assistance.')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-[#C88A4B] hover:bg-[#b57a3e] text-white text-xs uppercase tracking-[0.18em] font-semibold flex items-center gap-2 transition-all shadow-lg"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>WhatsApp Advisory</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
