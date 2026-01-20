'use client';

import React from 'react';
import { Pencil, Eraser, Trash2 } from 'lucide-react';
import { ToolType } from '@/types/drawing';

interface ToolButtonsProps {
  tool: ToolType;
  onToolChange: (tool: ToolType) => void;
  onClear: () => void;
}

export default function ToolButtons({
  tool,
  onToolChange,
  onClear,
}: ToolButtonsProps) {
  const buttonClass = (isActive: boolean, colorClass: string) =>
    `p-2 md:p-3 rounded-full md:rounded-xl transition-all duration-200 flex items-center justify-center gap-1 group cursor-pointer ${
      isActive
        ? `${colorClass} text-white shadow-lg scale-105`
        : 'text-gray-400 hover:text-white hover:bg-white/10'
    }`;

  return (
    <div className="flex flex-row md:flex-col gap-2 items-center md:items-stretch">
      <div className="flex md:grid md:grid-cols-2 gap-2">
        <button
          onClick={() => onToolChange('draw')}
          className={buttonClass(tool === 'draw', 'bg-blue-600 shadow-blue-500/30')}
          title="Pencil Tool"
        >
          <Pencil size={20} />
          <span className="text-[10px] font-medium hidden md:block">Draw</span>
        </button>

        <button
          onClick={() => onToolChange('erase')}
          className={buttonClass(tool === 'erase', 'bg-rose-600 shadow-rose-500/30')}
          title="Eraser Tool"
        >
          <Eraser size={20} />
          <span className="text-[10px] font-medium hidden md:block">Erase</span>
        </button>
      </div>

      <button
        onClick={onClear}
        className="w-auto md:w-full p-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-gray-400 hover:text-red-400 hover:bg-red-950/30 group border border-transparent hover:border-red-900/50"
        title="Clear Canvas"
      >
        <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
        <span className="text-xs font-medium hidden md:block">Clear All</span>
      </button>
    </div>
  );
}

