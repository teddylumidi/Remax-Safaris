import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  onSelectDestination?: (destId: string) => void;
  onOpenQuoteBuilder?: () => void;
  onOpenUaeCities?: () => void;
}

const HERO_VIDEOS = [
  {
    src: '/videos/elephants_waterhole.mp4',
    poster: '/images/video_poster_elephants_waterhole.jpg',
  },
  {
    src: '/videos/zanzibar_beach_palms.mp4',
    poster: '/images/video_poster_zanzibar_beach.jpg',
  },
  {
    src: '/videos/singapore_marina_bay.mp4',
    poster: '/images/video_poster_singapore.jpg',
  },
];

export const Hero: React.FC<HeroProps> = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [videoFailed, setVideoFailed] = useState(false);

  const currentVideo = HERO_VIDEOS[currentIndex];
  const videoSrc = currentVideo.src;
  const posterSrc = currentVideo.poster;

  // Advance to the next video with a brief crossfade
  const advanceVideo = useCallback(() => {
    setOpacity(0);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_VIDEOS.length);
      setVideoFailed(false);
      setOpacity(1);
    }, 600);
  }, []);

  // Inject a high-priority preload hint for the current video.
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'video';
    link.type = 'video/mp4';
    link.href = videoSrc;
    (link as unknown as { fetchPriority: string }).fetchPriority = 'high';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [videoSrc]);

  // Load and play the current video; cycle on 'ended'.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.src = videoSrc;
    video.load();

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = false; // we handle cycling manually
    video.autoplay = true;

    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('autoplay', '');
    video.setAttribute('fetchpriority', 'high');

    const tryPlay = () => {
      if (!video) return;
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          const unlock = () => {
            if (video) {
              video.muted = true;
              video.play().catch(() => {});
            }
            window.removeEventListener('touchstart', unlock);
            window.removeEventListener('click', unlock);
            window.removeEventListener('scroll', unlock);
            window.removeEventListener('keydown', unlock);
          };
          window.addEventListener('touchstart', unlock, { once: true, passive: true });
          window.addEventListener('click', unlock, { once: true, passive: true });
          window.addEventListener('scroll', unlock, { once: true, passive: true });
          window.addEventListener('keydown', unlock, { once: true, passive: true });
        });
      }
    };

    const handleError = () => {
      const err = video.error;
      console.error(
        '[Hero video] failed to load:', videoSrc,
        '- code:', err?.code, '- message:', err?.message
      );
      setVideoFailed(true);
      // Still advance so the slideshow continues even if one video fails
      const t = setTimeout(advanceVideo, 4000);
      return () => clearTimeout(t);
    };

    const handleEnded = () => {
      advanceVideo();
    };

    tryPlay();
    video.addEventListener('loadeddata', tryPlay);
    video.addEventListener('canplay', tryPlay);
    video.addEventListener('loadedmetadata', tryPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('loadeddata', tryPlay);
      video.removeEventListener('canplay', tryPlay);
      video.removeEventListener('loadedmetadata', tryPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('ended', handleEnded);
    };
  }, [videoSrc, advanceVideo]);

  const handleScrollDown = () => {
    const nextSection =
      document.getElementById('the-lodge') ||
      document.getElementById('start') ||
      document.getElementById('the-experience') ||
      document.getElementById('destinations');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <div
      id="banner"
      className="hero-container banner relative w-full h-[100svh] min-h-[500px] overflow-hidden bg-[#050A14]"
    >
      {/* Static image fallback layer - always present underneath the video */}
      <img
        src={posterSrc}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ transition: 'opacity 0.6s ease', opacity }}
      />

      {/* Autoplaying Hero Video — cycles through all three clips */}
      {!videoFailed && (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          poster={posterSrc}
          className="bg-video absolute inset-0 w-full h-full object-cover pointer-events-none z-[1]"
          style={{ transition: 'opacity 0.6s ease', opacity }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* Subtle overlay for contrast */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none z-[2]" />

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center pointer-events-auto select-none">
        <button
          onClick={handleScrollDown}
          className="group flex flex-col items-center gap-2 p-3 text-white/80 hover:text-white transition-all duration-300 focus:outline-none"
          aria-label="Scroll to explore"
        >
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.28em] font-medium text-stone-300 group-hover:text-[#C88A4B] transition-colors drop-shadow">
            Scroll to Explore
          </span>
          <div className="relative flex flex-col items-center">
            <div className="w-5 h-8 sm:w-6 sm:h-9 rounded-full border border-white/40 group-hover:border-[#C88A4B] flex justify-center pt-1.5 transition-colors shadow-lg">
              <span className="w-1 h-2 bg-[#C88A4B] rounded-full animate-scroll-bounce" />
            </div>
            <ChevronDown className="w-4 h-4 text-[#C88A4B] -mt-1 animate-bounce group-hover:translate-y-1 transition-transform" />
          </div>
        </button>
      </div>
    </div>
  );
};
