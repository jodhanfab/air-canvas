'use client';

import React, { useState } from 'react';
import { ArrowRight, Wand2 } from 'lucide-react';

interface HeroProps {
  isVisible: boolean;
  onStart: () => void;
}

export function Hero({ isVisible, onStart }: HeroProps) {
  const [buttonHovered, setButtonHovered] = useState(false);

  return (
    <section
      className={`min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center text-center max-w-4xl mx-auto transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="relative mb-8 group">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
        <div className="relative w-24 h-24 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl flex items-center justify-center shadow-2xl">
          <Wand2 size={40} className="text-indigo-400" />
        </div>
      </div>

      <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
        Create Art with <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
          Hand Gestures
        </span>
      </h1>

      <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed">
        Experience the future of digital art. Use computer vision to draw in the air without touching
        your screen.
      </p>

      <button
        onClick={onStart}
        onMouseEnter={() => setButtonHovered(true)}
        onMouseLeave={() => setButtonHovered(false)}
        className="group relative px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full overflow-hidden transition-all duration-300"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative flex items-center gap-3">
          <span className="font-semibold tracking-wide">Turn On Camera</span>
          <ArrowRight
            size={18}
            className={`transition-transform duration-300 ${
              buttonHovered ? 'translate-x-1' : ''
            }`}
          />
        </div>
      </button>
    </section>
  );
}
