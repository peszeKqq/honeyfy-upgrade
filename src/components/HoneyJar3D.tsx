'use client';

import { useEffect, useState } from 'react';

export default function HoneyJar3D() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.5) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-32 h-32 mx-auto mb-8">
      {/* 3D Honey Jar */}
      <div 
        className="relative w-full h-full transform-gpu"
        style={{
          transform: `rotateY(${rotation}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Jar Body */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 rounded-full opacity-80">
          {/* Jar Highlights */}
          <div className="absolute top-2 left-4 w-8 h-16 bg-gradient-to-b from-white/30 to-transparent rounded-full"></div>
          <div className="absolute top-4 right-6 w-4 h-8 bg-gradient-to-b from-white/20 to-transparent rounded-full"></div>
        </div>

        {/* Jar Rim */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-20 h-4 bg-gradient-to-r from-amber-300 to-amber-500 rounded-full"></div>

        {/* Honey Inside */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-20 bg-gradient-to-b from-yellow-400 via-orange-400 to-amber-600 rounded-full">
          {/* Honey Surface */}
          <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-t-full"></div>
          
          {/* Honey Bubbles */}
          <div className="absolute top-2 left-3 w-2 h-2 bg-yellow-200 rounded-full opacity-60"></div>
          <div className="absolute top-6 right-4 w-1.5 h-1.5 bg-yellow-200 rounded-full opacity-60"></div>
          <div className="absolute top-10 left-5 w-1 h-1 bg-yellow-200 rounded-full opacity-60"></div>
        </div>

        {/* Jar Label */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-white/20 rounded-lg border border-white/30">
          <div className="text-center text-xs font-bold text-white mt-1">HONEYFY</div>
        </div>

        {/* Floating Honey Drops */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="w-2 h-3 bg-gradient-to-b from-yellow-400 to-amber-500 rounded-full animate-bounce"></div>
        </div>
        <div className="absolute -top-6 right-8">
          <div className="w-1.5 h-2 bg-gradient-to-b from-yellow-400 to-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        </div>
        <div className="absolute -top-5 left-8">
          <div className="w-1 h-1.5 bg-gradient-to-b from-yellow-400 to-amber-500 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
    </div>
  );
}
