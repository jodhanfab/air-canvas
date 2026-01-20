'use client';

import React from 'react';
import { Palette } from 'lucide-react';
import { DrawingSettings, ToolType } from '@/types/drawing';
import ColorPicker from './toolbar/ColorPicker';
import LineWidthSlider from './toolbar/LineWidthSlider';
import ToolButtons from './toolbar/ToolButtons';

interface ToolbarProps {
  settings: DrawingSettings;
  onColorChange: (color: string) => void;
  onLineWidthChange: (width: number) => void;
  onToolChange: (tool: ToolType) => void;
  onClear: () => void;
}

export default function Toolbar({
  settings,
  onColorChange,
  onLineWidthChange,
  onToolChange,
  onClear,
}: ToolbarProps) {
  const handleColorClick = (color: string) => {
    onColorChange(color);
    onToolChange('draw');
  };

  return (
    <div className="fixed left-4 right-4 bottom-6 md:left-6 md:right-auto md:top-6 md:bottom-auto z-50 animate-in fade-in slide-in-from-bottom-8 md:slide-in-from-right-8 duration-500">
      <div className="bg-black/60 md:bg-black/40 backdrop-blur-xl border border-white/10 p-3 md:p-4 rounded-2xl md:rounded-3xl shadow-2xl w-auto md:w-64 ring-1 ring-white/5">
        
        <div className="hidden md:flex items-center gap-3 mb-6 px-1">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <Palette size={16} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white leading-tight">Air Canvas</h2>
            <p className="text-[10px] text-gray-400 font-medium">Gesture Drawing</p>
          </div>
        </div>

        <div className="flex flex-row md:flex-col items-center md:items-stretch gap-4 md:space-y-6 overflow-x-auto no-scrollbar">
          <ToolButtons
            tool={settings.tool}
            onToolChange={onToolChange}
            onClear={onClear}
          />

          <div className="w-px h-8 md:w-auto md:h-px bg-white/10 flex-shrink-0" />

          <ColorPicker
            selectedColor={settings.color}
            onColorChange={handleColorClick}
          />

          {settings.tool === 'draw' && (
            <div className="flex flex-row md:flex-col items-center md:items-stretch gap-4 md:space-y-6 animate-in fade-in slide-in-from-right-4 md:slide-in-from-top-2 duration-300">
               <div className="w-px h-8 md:w-auto md:h-px bg-white/10 flex-shrink-0" />
               <LineWidthSlider
                lineWidth={settings.lineWidth}
                color={settings.color}
                onLineWidthChange={onLineWidthChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
