import React, { useRef, useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, MessageCircle, Sparkles, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface VideoReel {
  id: string;
  title: string;
  location: string;
  category: 'zanzibar' | 'kenya' | 'international';
  videoUrl: string;
  posterUrl: string;
  duration: string;
  description: string;
  whatsappMessage: string;
}

interface SafariVideoModalProps {
  video: VideoReel | null;
  onClose: () => void;
  onBookExperience?: (locationName: string) => void;
}

export const SafariVideoModal: React.FC<SafariVideoModalProps> = ({
  video,
  onClose,
  onBookExperience
}) => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
    if (video && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [video]);

  if (!video) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  const toggleFullScreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(`Hi Remax Safaris! I watched the video reel "${video.title}" in ${video.location} on your website and would like to inquire about booking this experience.`);
    window.open(`https://wa.me/254722718919?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800/80 bg-slate-900/90 z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base leading-tight">{video.title}</h3>
              <p className="text-xs text-emerald-400 font-medium">{video.location}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Container */}
        <div className="relative bg-black flex-1 flex items-center justify-center overflow-hidden min-h-[350px] max-h-[60vh]">
          {hasError ? (
            <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center">
              <img 
                src={video.posterUrl} 
                alt={video.title} 
                className="absolute inset-0 w-full h-full object-cover opacity-40 blur-sm"
              />
              <div className="relative z-10 bg-black/70 backdrop-blur-md p-5 rounded-2xl border border-white/10 max-w-xs flex flex-col items-center">
                <AlertCircle className="w-8 h-8 text-[#C88A4B] mb-2" />
                <p className="text-white text-sm font-medium mb-1">Previewing Destination Visual</p>
                <p className="text-slate-400 text-xs mb-3">Reel video is streaming from cache</p>
                <button
                  onClick={() => {
                    setHasError(false);
                    if (videoRef.current) videoRef.current.load();
                  }}
                  className="px-4 py-1.5 bg-[#C88A4B] text-white text-xs font-semibold rounded-lg hover:bg-[#b0773d] transition-colors"
                >
                  Retry Playback
                </button>
              </div>
            </div>
          ) : (
            <video
              ref={videoRef}
              src={video.videoUrl}
              poster={video.posterUrl}
              playsInline
              loop
              preload="auto"
              muted={isMuted}
              autoPlay
              onError={() => setHasError(true)}
              className="w-full h-full object-contain cursor-pointer"
              onClick={togglePlay}
            />
          )}

          {/* Overlay Play/Pause Button Indicator */}
          {!isPlaying && !hasError && (
            <button 
              onClick={togglePlay}
              className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-emerald-500/90 text-white flex items-center justify-center shadow-lg transform transition-transform hover:scale-110"
            >
              <Play className="w-8 h-8 ml-1 fill-current" />
            </button>
          )}

          {/* Bottom Player Controls Overlay */}
          {!hasError && (
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center justify-between gap-3 text-white">
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
                  title={isMuted ? "Unmute Sound" : "Mute Sound"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-amber-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                </button>
              </div>

              <div className="text-xs font-mono bg-black/50 px-2.5 py-1 rounded-md text-slate-300">
                {video.duration} • Reel
              </div>

              <button
                onClick={toggleFullScreen}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
                title="Full Screen"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Video Info & Call to Action Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 space-y-3">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {video.description}
          </p>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleWhatsAppInquiry}
              className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all hover:scale-[1.02]"
            >
              <MessageCircle className="w-4 h-4" />
              Inquire About This Trip on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

