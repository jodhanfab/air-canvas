'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { DEFAULT_COLORS } from '@/constants/drawing';

interface ColorPickerProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

export default function ColorPicker({
  selectedColor,
  onColorChange,
}: ColorPickerProps) {
  return (
    <div className="flex items-center gap-3 overflow-x-auto no-scrollbar md:block md:space-y-3 md:overflow-visible">
      <div className="text-gray-400 text-[10px] font-bold uppercase tracking-widest pl-1 hidden md:block">
        Colors
      </div>
      
      <div className="flex flex-row md:grid md:grid-cols-4 gap-2 md:gap-9 p-1">
        {DEFAULT_COLORS.slice(0, 7).map((color) => (
          <button
            key={color}
            onClick={() => onColorChange(color)}
            className={`w-10 h-10 md:w-auto md:h-auto shrink-0 aspect-square rounded-full transition-all duration-200 relative group overflow-hidden ${
              selectedColor === color
                ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-110'
                : 'hover:scale-110 opacity-80 hover:opacity-100'
            }`}
            style={{ backgroundColor: color }}
            title={color}
          >
            {selectedColor === color && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full shadow-sm" />
              </div>
            )}
          </button>
        ))}

        <div className="relative w-10 h-10 md:w-auto md:h-auto shrink-0 aspect-square rounded-full overflow-hidden group">
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => onColorChange(e.target.value)}
            className="absolute inset-0  w-[150%] h-[150%] p-0 m-0 opacity-0 cursor-pointer z-20"
            title="Custom Color"
          />
          <div className={`w-full h-full rounded-full border border-white/20 bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center transition-all ${
            !DEFAULT_COLORS.includes(selectedColor) ? 'ring-2 ring-white ring-offset-2 ring-offset-black' : 'group-hover:bg-white/20'
          }`}>
             {!DEFAULT_COLORS.includes(selectedColor) ? (
               <div className="w-full h-full" style={{ backgroundColor: selectedColor }} />
             ) : (
               <Plus size={14} className="text-white/70 group-hover:text-white" />
             )}
          </div>
        </div>
      </div>
    </div>
  );
}

