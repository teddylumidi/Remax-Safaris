import React, { useState } from 'react';
import { Play, Sparkles, Volume2, VolumeX, MessageCircle, Video } from 'lucide-react';
import { SafariVideoModal, VideoReel } from './SafariVideoModal';

export const VIDEO_REELS: VideoReel[] = [
  {
    id: 'singapore-skyline-reel',
    title: 'Singapore Marina Bay & City Skyline',
    location: 'Marina Bay & Downtown, Singapore',
    category: 'international',
    videoUrl: '/videos/singapore_marina_bay.mp4',
    posterUrl: '/images/video_poster_singapore.jpg',
    duration: '0:16',
    description: 'Experience Singapore’s iconic Marina Bay skyline, futuristic gardens, waterfront promenades, and vibrant night cityscapes.',
    whatsappMessage: 'Hi Remax Safaris! I saw the Singapore Skyline video reel and want to book a Singapore city escape.'
  },
  {
    id: 'elephants-safari-reel',
    title: 'African Bush Elephants Herd in Savannah',
    location: 'Amboseli & Tsavo National Parks, Kenya',
    category: 'kenya',
    videoUrl: '/videos/elephants_waterhole.mp4',
    posterUrl: '/images/video_poster_elephants.jpg',
    duration: '0:15',
    description: 'Encounter giant African elephants roaming freely beneath Mount Kilimanjaro and across golden acacia plains.',
    whatsappMessage: 'Hi Remax Safaris! I saw the African Elephants video reel and would like to book an Amboseli Elephant Safari.'
  },
  {
    id: 'diani-zanzibar-beach-reel',
    title: 'Turquoise Beach & Coastal Paradise',
    location: 'Diani Beach & Zanzibar Islands',
    category: 'kenya',
    videoUrl: '/videos/zanzibar_beach_palms.mp4',
    posterUrl: '/images/video_poster_zanzibar_beach.jpg',
    duration: '0:17',
    description: 'Experience idyllic white-sand beaches, crystal turquoise waters, swaying palm trees, and luxury coastal hideaways.',
    whatsappMessage: 'Hi Remax Safaris! I saw the Coastal Beach video reel and would like to inquire about a Diani/Zanzibar beach getaway.'
  }
];

export const VideoReelsSection: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoReel | null>(null);

  return (
    <section id="video-reels" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/60 border-y border-slate-800/60 relative overflow-hidden">
      {/* Background Subtle Accent Glow */}
      <div className="absolute -top-32 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-3">
              <Video className="w-3.5 h-3.5" />
              Live Safari Moments
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Real Guest Experiences <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">& Video Reels</span>
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-2xl">
              Get an authentic preview of what your safari and island vacation will feel like with Remax Safaris.
            </p>
          </div>
        </div>

        {/* Video Reels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {VIDEO_REELS.map((reel) => (
            <div
              key={reel.id}
              onClick={() => setSelectedVideo(reel)}
              className="group relative bg-slate-800/80 rounded-2xl overflow-hidden border border-slate-700/60 shadow-xl hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col"
            >
              {/* Media Thumbnail Container (Vertical 9:16 aspect ratio look) */}
              <div className="relative aspect-[9/14] sm:aspect-[3/4] w-full overflow-hidden bg-slate-950">
                <img
                  src={reel.posterUrl}
                  alt={reel.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-black/30 group-hover:opacity-90 transition-opacity" />

                {/* Video Duration Badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-xs font-mono font-medium flex items-center gap-1.5 border border-slate-700/50">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  {reel.duration}
                </div>

                {/* Central Animated Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500/90 text-white flex items-center justify-center shadow-xl shadow-emerald-950/60 transform group-hover:scale-110 transition-transform duration-300 ring-4 ring-emerald-400/30">
                    <Play className="w-7 h-7 ml-1 fill-current" />
                  </div>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-5 space-y-2">
                  <div className="text-xs font-medium text-emerald-400 uppercase tracking-wider">
                    {reel.location}
                  </div>
                  <h3 className="text-lg font-bold text-white leading-snug group-hover:text-emerald-300 transition-colors">
                    {reel.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {reel.description}
                  </p>
                  
                  <div className="pt-2 flex items-center justify-between text-xs text-emerald-400 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Tap to Play Full Video
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Safari Video Lightbox Modal */}
      <SafariVideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </section>
  );
};
