'use client';

import React, { useState } from 'react';
import { Palette, Github, Menu, X } from 'lucide-react';

interface HeaderProps {
  isVisible: boolean;
}

export function Header({ isVisible }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-slate-950/50 backdrop-blur-xl transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
            <Palette size={18} className="text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            AirCanvas
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-white transition-colors">
            How it works
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-white/5 rounded-full transition-colors text-white"
          >
            <Github size={20} />
          </a>
        </div>

        <button
          className="md:hidden p-2 text-slate-400 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

       {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-slate-950/95 border-b border-white/5 p-4 flex flex-col gap-4 backdrop-blur-xl">
             <a href="#features" className="text-slate-400 hover:text-white block py-2" onClick={() => setIsMobileMenuOpen(false)}>
            Features
          </a>
          <a href="#how-it-works" className="text-slate-400 hover:text-white block py-2" onClick={() => setIsMobileMenuOpen(false)}>
            How it works
          </a>
           <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white block py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            GitHub
          </a>
        </div>
      )}
    </nav>
  );
}
