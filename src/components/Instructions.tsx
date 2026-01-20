'use client';

import { InfoIcon, XIcon } from 'lucide-react';
import React, { useState } from 'react';

export default function Instructions() {
  const [isVisible, setIsVisible] = useState(false);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-md border border-white/10 transition-all"
        aria-label="Show instructions"
      >
      <InfoIcon/>        
      </button>
    );
  }

  return (
    <div className="absolute top-4 right-4 left-4 md:left-auto md:right-4 z-50 bg-black/80 backdrop-blur-lg p-4 rounded-xl border border-white/10 shadow-2xl w-auto md:w-96 max-w-[calc(100vw-2rem)] md:max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-white">Instructions</h2>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white transition-colors"
          aria-label="Close instructions"
        >
          <XIcon/>
        </button>
      </div>
      <ul className="space-y-2 text-sm text-gray-300">
        <li className="flex items-start gap-2">
          <span className="text-blue-400 mt-1">•</span>
          <span>Pinch index & thumb together to draw</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-blue-400 mt-1">•</span>
          <span>Release to stop drawing</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-blue-400 mt-1">•</span>
          <span>Move your hand to control the drawing</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-blue-400 mt-1">•</span>
          <span>Use toolbar below to change colors and tools</span>
        </li>
      </ul>
    </div>
  );
}

