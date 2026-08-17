import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="fixed bottom-5 left-5 z-40 p-3.5 rounded-full bg-[#1B4332] hover:bg-[#2A5C45] text-white shadow-xl hover:shadow-2xl border-2 border-[#D4A373] transition-all duration-300 hover:scale-110 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-[#D4A373]/50 animate-in fade-in slide-in-from-bottom-3"
      aria-label="Scroll to top"
      title="Back to top"
    >
      <ChevronUp className="w-5 h-5 text-white group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
};
