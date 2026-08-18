import React, { useState, useEffect } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackCategory?: 'kenya' | 'international' | 'beach' | 'safari' | 'city';
  customFallback?: string;
  fallbackSrc?: string;
}

// Local image fallbacks for travel categories
const CATEGORY_FALLBACKS: Record<string, string> = {
  safari: '/images/park_game_drive_binoculars.jpg',
  kenya: '/images/park_game_drive_binoculars.jpg',
  beach: '/images/diani_white_sand_beach.jpg',
  city: '/images/uae_dubai_burj_khalifa.jpg',
  international: '/images/uae_dubai_burj_khalifa.jpg',
  default: '/images/safari_sunset_horizon.jpg'
};

// SVG placeholder generator as bulletproof offline fallback
const generateSvgPlaceholder = (title: string): string => {
  const cleanTitle = (title || 'Remax Safaris').length > 25 ? (title || 'Remax Safaris').substring(0, 22) + '...' : (title || 'Remax Safaris');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1A1208"/>
        <stop offset="50%" stop-color="#2C2010"/>
        <stop offset="100%" stop-color="#0D0B08"/>
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(#g)"/>
    <circle cx="400" cy="240" r="60" fill="#D4A373" opacity="0.2"/>
    <path d="M370 240 l30 -30 l30 30 M400 210 v60" stroke="#D4A373" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <text x="400" y="360" font-family="serif, sans-serif" font-size="32" font-weight="bold" fill="#FFFFFF" text-anchor="middle">${cleanTitle}</text>
    <text x="400" y="400" font-family="sans-serif" font-size="18" font-weight="600" fill="#D4A373" text-anchor="middle">REMAX SAFARIS</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  fallbackCategory = 'kenya',
  customFallback,
  fallbackSrc,
  onError,
  onLoad,
  ...props
}) => {
  const fallbackUrl = fallbackSrc || customFallback;
  const initialUrl = src || fallbackUrl || CATEGORY_FALLBACKS[fallbackCategory] || CATEGORY_FALLBACKS.default;
  const [imageSrc, setImageSrc] = useState<string>(initialUrl);
  const [fallbackLevel, setFallbackLevel] = useState<number>(0);

  useEffect(() => {
    const nextUrl = src || fallbackUrl || CATEGORY_FALLBACKS[fallbackCategory] || CATEGORY_FALLBACKS.default;
    setImageSrc(nextUrl);
    setFallbackLevel(0);
  }, [src, fallbackCategory, fallbackUrl]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (fallbackLevel === 0) {
      const nextUrl = fallbackUrl || CATEGORY_FALLBACKS[fallbackCategory] || CATEGORY_FALLBACKS.default;
      setFallbackLevel(1);
      if (nextUrl !== imageSrc) {
        setImageSrc(nextUrl);
      } else {
        setFallbackLevel(2);
        setImageSrc(generateSvgPlaceholder(alt));
      }
    } else if (fallbackLevel === 1) {
      setFallbackLevel(2);
      setImageSrc(generateSvgPlaceholder(alt));
    }

    if (onError) {
      onError(e);
    }
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      referrerPolicy="no-referrer"
      loading="lazy"
      decoding="async"
      onLoad={onLoad}
      onError={handleError}
      {...props}
    />
  );
};
