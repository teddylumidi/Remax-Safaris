import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sun, 
  Eye, 
  Utensils, 
  Users, 
  MapPin, 
  Award, 
  Sparkles, 
  Star, 
  ChevronLeft, 
  ChevronRight,
  Trophy
} from 'lucide-react';

export const SirikoiWhySection: React.FC = () => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const whyPillars = [
    { label: 'Conservation in action', icon: ShieldCheck },
    { label: 'Spring all year round', icon: Sun },
    { label: 'Armchair game viewing', icon: Eye },
    { label: 'Farm-to-table dining', icon: Utensils },
    { label: 'Family fun holidays', icon: Users },
    { label: 'Exceptional location & setting', icon: MapPin },
    { label: 'Personalised Safaris', icon: Award },
    { label: 'Luxurious Accommodation', icon: Sparkles }
  ];

  const guestReviews = [
    {
      author: 'Amanda Monti',
      text: 'This place was magical! The location is amazing because we were able to see elephants and giraffes drinking right while having lunch. The food was exceptional and all vegetables came fresh from the garden. The staff was always so helpful and friendly. Thanks for a great stay!'
    },
    {
      author: 'Lord & Lady Harrington',
      text: 'From the moment we touched down on the bush airstrip to our luxury safari tent, Remax Safaris delivered flawless precision. The bush breakfasts and evening sundowners under acacia trees were the highlight of our African journey.'
    },
    {
      author: 'Dr. Michael & Sarah Vance',
      text: 'Our safari guide had an uncanny instinct for tracking lions in Maasai Mara. We witnessed the Great Wildebeest Migration river crossing without a crowd of vehicles. Absolute five-star excellence from beginning to end.'
    },
    {
      author: 'Patric & Nathalie M.',
      text: 'The service was first class, the cuisine left nothing to be desired, and the accommodation exceeded all expectations. Our children were lovingly involved in tracking animal footprints and designing beaded bracelets.'
    }
  ];

  const awards = [
    { name: 'World Travel Awards 2024', category: "Africa's Leading Safari Destination" },
    { name: 'The Safari Awards 2024', category: 'Best Bespoke Safari Operator' },
    { name: 'Eco-Tourism Kenya 2024', category: 'Gold Eco-Rating Certification' },
    { name: 'Condé Nast Traveller 2023', category: 'Readers Choice Top Safari Lodge' },
    { name: "Travelers' Choice Best of the Best 2024", category: 'Top 1% Global Properties' }
  ];

  const handleNextReview = () => {
    setCurrentReviewIndex((prev) => (prev + 1) % guestReviews.length);
  };

  const handlePrevReview = () => {
    setCurrentReviewIndex((prev) => (prev - 1 + guestReviews.length) % guestReviews.length);
  };

  const activeReview = guestReviews[currentReviewIndex];

  return (
    <section id="why-remax" className="bg-[#FAF6F0] dark:bg-[#0A120E] text-[#1A2621] dark:text-[#F0F4F2] transition-colors duration-300">
      
      {/* 1. WHY REMAX SAFARIS Terracotta / Dark Icons Bar */}
      <div className="bg-[#C88A4B] text-white py-14 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <h2 className="text-center text-sm sm:text-base uppercase tracking-[0.3em] font-serif font-bold text-white">
            WHY REMAX SAFARIS
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 text-center">
            {whyPillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex flex-col items-center gap-3 group">
                  <div className="w-14 h-14 rounded-full bg-white/15 group-hover:bg-white/25 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-[11px] sm:text-xs uppercase tracking-wider font-medium text-white/95 leading-tight">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. GUEST REVIEWS Slider */}
      <div className="py-24 sm:py-28 px-4 sm:px-8 max-w-4xl mx-auto text-center space-y-8">
        <div className="sirikoi-heading mb-4">
          <p className="sub">TESTIMONIALS</p>
          <h2>GUEST REVIEWS</h2>
        </div>

        {/* 5 Stars */}
        <div className="flex items-center justify-center gap-1.5 text-[#C88A4B]">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-current" />
          ))}
        </div>

        {/* Review Text */}
        <div className="min-h-[140px] flex items-center justify-center px-4 sm:px-12">
          <p className="text-base sm:text-lg md:text-xl font-serif italic text-stone-800 dark:text-stone-200 leading-relaxed max-w-3xl">
            “{activeReview.text}”
          </p>
        </div>

        <div>
          <h4 className="text-sm font-serif font-bold text-[#12231A] dark:text-[#FDFBF7] uppercase tracking-widest">
            {activeReview.author}
          </h4>
        </div>

        {/* Slider Controls */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <button
            onClick={handlePrevReview}
            className="w-10 h-10 rounded-full border border-[#C88A4B] text-[#C88A4B] hover:bg-[#C88A4B] hover:text-white flex items-center justify-center transition-colors"
            aria-label="Previous Review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs text-stone-500 font-medium">
            {currentReviewIndex + 1} / {guestReviews.length}
          </span>
          <button
            onClick={handleNextReview}
            className="w-10 h-10 rounded-full border border-[#C88A4B] text-[#C88A4B] hover:bg-[#C88A4B] hover:text-white flex items-center justify-center transition-colors"
            aria-label="Next Review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 3. OUR AWARDS Section */}
      <div className="py-16 sm:py-20 border-t border-[#EAE3D6] dark:border-[#1E3025] bg-[#F5EFEB] dark:bg-[#070D09]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center space-y-10">
          <div className="sirikoi-heading mb-6">
            <p className="sub">RECOGNITION</p>
            <h2>OUR AWARDS</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 items-center justify-center">
            {awards.map((award, i) => (
              <div
                key={i}
                className="p-6 bg-white dark:bg-[#101C15] border border-[#E2DAD0] dark:border-[#1E3025] rounded-sm flex flex-col items-center gap-3 shadow-sm hover:shadow-md transition-all group"
              >
                <Trophy className="w-8 h-8 text-[#C88A4B] group-hover:scale-110 transition-transform" />
                <h4 className="text-xs font-serif font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
                  {award.name}
                </h4>
                <p className="text-[10px] text-stone-500 dark:text-stone-400 font-light">
                  {award.category}
                </p>
              </div>
            ))}
          </div>

          <div>
            <a
              href="#the-experience"
              className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C88A4B] hover:underline"
            >
              View all safari honors & accolades →
            </a>
          </div>
        </div>
      </div>

    </section>
  );
};
