import React, { useState } from 'react';
import { LOGO_DATA_URI } from '../assets/logoDataUri';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'color';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const LOGO_SOURCES = [
  '/logo.png',
  LOGO_DATA_URI
];

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md'
}) => {
  const [srcIndex, setSrcIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  // Height mapping based on size
  const heightMap = {
    sm: 'h-10 sm:h-11',
    md: 'h-12 sm:h-14',
    lg: 'h-16 sm:h-20',
    xl: 'h-24 sm:h-28'
  };

  const handleError = () => {
    if (srcIndex < LOGO_SOURCES.length - 1) {
      setSrcIndex(prev => prev + 1);
    } else {
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <div className={`inline-flex items-center gap-2 font-display font-bold tracking-wider text-[#1B4332] ${heightMap[size]} ${className}`}>
        <span className="text-xl sm:text-2xl font-extrabold text-[#D4A373]">RE/MAX</span>
        <span className="text-base sm:text-lg font-bold text-[#1B4332] uppercase tracking-widest">SAFARIS</span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center select-none ${heightMap[size]} ${className}`}>
      <img
        src={LOGO_SOURCES[srcIndex]}
        alt="Remax Safaris"
        className="h-full w-auto max-w-full object-contain transition-all"
        loading="eager"
        decoding="async"
        onError={handleError}
      />
    </div>
  );
};

