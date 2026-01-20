'use client';

import React from 'react';
import { Camera, Hand, Palette } from 'lucide-react';

interface FeaturesProps {
  isVisible: boolean;
}

export function Features({ isVisible }: FeaturesProps) {
  return (
    <section
      id="features"
      className={`min-h-screen w-full flex items-center justify-center py-20 transition-all duration-1000 delay-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        <FeatureCard
          icon={<Camera className="text-blue-400" size={24} />}
          title="Privacy First"
          description="Everything runs locally in your browser. No video data is ever sent to a server."
        />
        <FeatureCard
          icon={<Hand className="text-purple-400" size={24} />}
          title="Gesture Control"
          description="Intuitive hand tracking lets you draw, select colors, and control tools naturally."
        />
        <FeatureCard
          icon={<Palette className="text-pink-400" size={24} />}
          title="Professional Tools"
          description="Access a complete suite of creative tools including brush sizes, colors, and more."
        />
      </div>
    </section>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="group p-6 rounded-3xl bg-white/[0.03] border border-white/[0.05] hover:border-white/10 hover:bg-white/[0.05] transition-all duration-300">
      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
}
