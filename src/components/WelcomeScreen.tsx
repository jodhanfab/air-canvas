'use client';

import React, { useEffect, useState } from 'react';
import { Background } from './welcome/Background';
import { Header } from './welcome/Header';
import { Hero } from './welcome/Hero';
import { Features } from './welcome/Features';
import { HowItWorks } from './welcome/HowItWorks';
import { Footer } from './welcome/Footer';

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative selection:bg-indigo-500/30">
      <Background />

      <Header isVisible={isVisible} />

      <main className="relative z-10 w-full px-6 pt-20">
        <Hero isVisible={isVisible} onStart={onStart} />
        <HowItWorks isVisible={isVisible} />
        <Features isVisible={isVisible} />
        <Footer isVisible={isVisible} />
      </main>
    </div>
  );
}
