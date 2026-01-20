'use client';

import React from 'react';
import { Camera, Check, GripHorizontal, Palette } from 'lucide-react';

interface HowItWorksProps {
  isVisible: boolean;
}

export function HowItWorks({ isVisible }: HowItWorksProps) {
  return (
    <section
      id="how-it-works"
      className={`min-h-screen w-full flex flex-col justify-center items-center py-20 transition-all duration-1000 delay-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">How it Works</h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Start creating in seconds. No extra hardware required—just your webcam and your hands.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-indigo-500/0 via-indigo-500/50 to-indigo-500/0" />

        <StepCard
          number={1}
          icon={<Camera size={24} className="text-white" />}
          title="Enable Camera"
          description="Allow camera access when prompted. We process everything locally for privacy."
        />
        <StepCard
          number={2}
          icon={<GripHorizontal size={24} className="text-white" />}
          title="Pinch to Draw"
          description="Bring your index finger and thumb together to start drawing lines in the air."
        />
        <StepCard
          number={3}
          icon={<Palette size={24} className="text-white" />}
          title="Create Art"
          description="Use gestures to change colors, adjust brush size, and switch tools."
        />
      </div>
    </section>
  );
}

interface StepCardProps {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

function StepCard({ number, icon, title, description }: StepCardProps) {
  return (
    <div className="relative flex flex-col items-center text-center">
      <div className="w-24 h-24 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center relative z-10 mb-6 group">
        <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg">
            {icon}
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-sm font-bold">
          {number}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed max-w-xs">{description}</p>
    </div>
  );
}
