
import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, Maximize2 } from 'lucide-react';
import { CRISIS_GALLERY } from '../galleryData.ts';

const Gallery3D: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  // Fix: Use number for the timeout reference type to avoid NodeJS.Timeout error in browser context
  const timeoutRef = useRef<number | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % CRISIS_GALLERY.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + CRISIS_GALLERY.length) % CRISIS_GALLERY.length);
  };

  useEffect(() => {
    if (isAutoPlay) {
      // Use window.setInterval to explicitly use the browser API returning a number
      timeoutRef.current = window.setInterval(nextSlide, 4000);
    }
    return () => {
      if (timeoutRef.current) window.clearInterval(timeoutRef.current);
    };
  }, [currentIndex, isAutoPlay]);

  return (
    <div className="relative w-full overflow-hidden py-20 bg-slate-950" dir="ltr">
      {/* 3D Container */}
      <div className="flex items-center justify-center h-[400px] sm:h-[500px] perspective-container">
        {CRISIS_GALLERY.map((img, index) => {
          let position = index - currentIndex;
          
          // Handle circular array for smooth 3D loop
          if (position > CRISIS_GALLERY.length / 2) position -= CRISIS_GALLERY.length;
          if (position < -CRISIS_GALLERY.length / 2) position += CRISIS_GALLERY.length;

          const isActive = position === 0;
          const isVisible = Math.abs(position) <= 2;

          if (!isVisible) return null;

          const opacity = isActive ? 1 : 0.4 - Math.abs(position) * 0.1;
          const scale = 1 - Math.abs(position) * 0.15;
          const translateX = position * 45; // Spread on X axis
          const rotateY = position * -35; // Tilt for 3D effect
          const zIndex = 10 - Math.abs(position);

          return (
            <div
              key={index}
              className={`absolute transition-all duration-700 ease-out cursor-pointer group`}
              style={{
                transform: `translateX(${translateX}%) scale(${scale}) rotateY(${rotateY}deg)`,
                opacity,
                zIndex,
              }}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlay(false);
              }}
              onMouseEnter={() => setIsAutoPlay(false)}
              onMouseLeave={() => setIsAutoPlay(true)}
            >
              <div className={`relative overflow-hidden rounded-2xl shadow-2xl border-4 ${isActive ? 'border-rose-600' : 'border-white/10'} w-64 h-80 sm:w-80 sm:h-96 transition-colors`}>
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover filter brightness-90 group-hover:brightness-110 transition-all duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-6 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                  <p className="text-white font-black text-lg mb-1 leading-tight text-right">{img.title}</p>
                  <div className="h-1 w-12 bg-rose-600 rounded-full"></div>
                </div>
                {isActive && (
                  <div className="absolute top-4 right-4 bg-rose-600/80 p-2 rounded-full backdrop-blur-sm animate-pulse">
                     <Maximize2 className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-6 mt-12">
        <button 
          onClick={prevSlide}
          className="p-3 bg-white/5 hover:bg-rose-600 text-white rounded-full transition-all border border-white/10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex gap-2">
           {CRISIS_GALLERY.map((_, i) => (
             <div 
               key={i} 
               className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8 bg-rose-600' : 'w-2 bg-white/20'}`}
             ></div>
           ))}
        </div>
        <button 
          onClick={nextSlide}
          className="p-3 bg-white/5 hover:bg-rose-600 text-white rounded-full transition-all border border-white/10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <style>{`
        .perspective-container {
          perspective: 1200px;
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
};

export default Gallery3D;
