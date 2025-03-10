'use client';

import React from 'react';
import classNames from 'classnames';

interface CRTEffectProps {
  children: React.ReactNode;
  className?: string;
}

export const CRTEffect: React.FC<CRTEffectProps> = ({ children, className }) => {
  return (
    <div className={classNames('relative overflow-hidden', className)}>
      {children}
      <div className="pointer-events-none absolute inset-0 before:absolute before:inset-0 before:bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] before:bg-[length:100%_4px] before:animate-scan-line after:absolute after:inset-0 after:bg-[linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] after:bg-[length:3px_100%] after:animate-crt-flicker" />
      <div className="pointer-events-none absolute inset-0 rounded-lg before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.2)_100%)]" />
    </div>
  );
}; 