'use client';

import React from 'react';
import { CRTEffect } from './CRTEffect';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ fullScreen }) => {
  const content = (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-primary rounded-full animate-spin border-t-transparent" />
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-primary/30 rounded-full" />
      </div>
      <span className="ml-4 font-pixel text-primary">Loading...</span>
    </div>
  );

  if (fullScreen) {
    return (
      <CRTEffect className="fixed inset-0 bg-secondary flex items-center justify-center">
        {content}
      </CRTEffect>
    );
  }

  return content;
}; 