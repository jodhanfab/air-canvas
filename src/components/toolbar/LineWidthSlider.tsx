'use client';

import React from 'react';
import { Circle } from 'lucide-react';
import {
  MIN_LINE_WIDTH,
  MAX_LINE_WIDTH,
} from '@/constants/drawing';

interface LineWidthSliderProps {
  lineWidth: number;
  color: string;
  onLineWidthChange: (width: number) => void;
}

export default function LineWidthSlider({
  lineWidth,
  color,
  onLineWidthChange,
}: LineWidthSliderProps) {
  return (
    <div className="flex flex-row md:flex-col items-center gap-3 md:gap-0 md:space-y-3 w-full md:w-auto">
      <div className="flex items-center justify-between px-1 min-w-[30px] md:min-w-0 md:w-full">
        <div className="text-gray-400 text-[10px] font-bold uppercase tracking-widest hidden md:block">
          Size
        </div>
        <div className="text-white text-xs font-mono opacity-60">{lineWidth}px</div>
      </div>

      <div className="relative flex items-center gap-3">
        <input
          type="range"
          min={MIN_LINE_WIDTH}
          max={MAX_LINE_WIDTH}
          value={lineWidth}
          onChange={(e) => onLineWidthChange(Number(e.target.value))}
          className="w-full h-1.5 bg-gray-700/50 rounded-full appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all"
          title="Adjust line width"
        />
        
        <div 
          className="shrink-0 rounded-full border border-white/10 shadow-sm transition-all duration-300"
          style={{
            backgroundColor: color,
            width: Math.min(Math.max(lineWidth, 8), 24) + 'px',
            height: Math.min(Math.max(lineWidth, 8), 24) + 'px',
          }}
        />
      </div>
    </div>
  );
}

