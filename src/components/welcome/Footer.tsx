'use client';

import React from 'react';

interface FooterProps {
  isVisible: boolean;
}

export function Footer({ isVisible }: FooterProps) {
  return (
    <footer
      className={`mt-24 pb-8 text-center text-slate-600 text-sm transition-all duration-1000 delay-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <p>© {new Date().getFullYear()} AirCanvas. </p>
    </footer>
  );
}
