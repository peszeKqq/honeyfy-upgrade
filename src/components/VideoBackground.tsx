'use client';

import { useRef, useEffect, useState } from 'react';

interface VideoBackgroundProps {
  videoSrc: string;
  fallbackImage?: string;
}

export default function VideoBackground({ videoSrc, fallbackImage }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Try to play the video
      const playVideo = async () => {
        try {
          await video.play();
        } catch (error) {
          console.log('Video autoplay failed:', error);
        }
      };

      playVideo();

      // Listen for when video data is loaded
      video.addEventListener('loadeddata', () => {
        setIsLoaded(true);
      });

      // Listen for video errors
      video.addEventListener('error', (e) => {
        console.error('Video error:', e);
      });
    }
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster={fallbackImage}
        preload="metadata"
      >
        <source src={videoSrc} type="video/mp4" />
        
        {/* Fallback for browsers that don't support video */}
        {fallbackImage && (
          <img src={fallbackImage} alt="Honey background" className="w-full h-full object-cover" />
        )}
      </video>
      
      {/* Loading state */}
      {!isLoaded && fallbackImage && (
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${fallbackImage})` }}>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      )}
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Subtle gradient overlay for enhanced visual appeal */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/40"></div>
    </div>
  );
}
