import React, { useRef, useEffect, useState } from 'react';
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

// Picked once at module load (not per-render) so it's stable for the whole
// page view and so we can wire up a matching <link rel="preload"> before
// the component even mounts. index.html used to hardcode a preload for
// elephants_waterhole.mp4 regardless of which video actually got picked
// here - 2 times out of 3 the browser was preloading the wrong file while
// the real one loaded late/unprioritized. That static hint has been
// removed from index.html; this component now injects the correct one.
const SELECTED_HERO_VIDEO =
  HERO_VIDEOS[Math.floor(Math.random() * HERO_VIDEOS.length)];

export const Hero: React.FC<HeroProps> = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  const videoSrc = SELECTED_HERO_VIDEO.src;
  const posterSrc = SELECTED_HERO_VIDEO.poster;

  // Inject a high-priority preload hint for the *actual* selected video as
  // early as possible, and clean it up on unmount.
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'video';
    link.type = 'video/mp4';
    link.href = videoSrc;
    // fetchPriority isn't in older TS DOM lib typings yet.
    (link as unknown as { fetchPriority: string }).fetchPriority = 'high';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [videoSrc]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set source directly on the element for fastest load + autoplay
    video.src = videoSrc;
    video.load();

    // Strict cross-browser autoplay enforcement (Safari WebKit & Chrome Blink)
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;
    video.autoplay = true;

    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('autoplay', '');
    video.setAttribute('loop', '');
    // Tell the browser to prioritize fetching this video over lower-priority
    // page assets. Set via setAttribute (not a JSX prop) so it works
    // regardless of which @types/react version is installed.
    video.setAttribute('fetchpriority', 'high');

    const tryPlay = () => {
      if (!video) return;
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback listeners for low-power mode or strict iframe restrictions
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

    // Surface real load failures (404, bad MIME type, decode error, etc.)
    // instead of silently leaving a blank hero. Check the console/network
    // tab for this message to see the actual reason the video didn't load.
    const handleError = () => {
      const err = video.error;
      console.error(
        '[Hero video] failed to load:', videoSrc,
        '- code:', err?.code, '- message:', err?.message
      );
      setVideoFailed(true);
    };

    tryPlay();
    video.addEventListener('loadeddata', tryPlay);
    video.addEventListener('canplay', tryPlay);
    video.addEventListener('loadedmetadata', tryPlay);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadeddata', tryPlay);
      video.removeEventListener('canplay', tryPlay);
      video.removeEventListener('loadedmetadata', tryPlay);
      video.removeEventListener('error', handleError);
    };
  }, [videoSrc]);

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
      {/* Static image fallback layer - always present underneath the video so
          the hero still looks correct if the video fails to load/decode. */}
      <img
        src={posterSrc}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Autoplaying Hero Video with playsinline and muted attributes */}
      {!videoFailed && (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          poster={posterSrc}
          className="bg-video absolute inset-0 w-full h-full object-cover pointer-events-none z-[1]"
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
