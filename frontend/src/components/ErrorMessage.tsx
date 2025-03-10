'use client';

import React from 'react';
import { CRTEffect } from './CRTEffect';

interface ErrorMessageProps {
  title?: string;
  message: string;
  fullScreen?: boolean;
  retry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = 'Error',
  message,
  fullScreen,
  retry,
}) => {
  const content = (
    <div className="text-center">
      <h1 className="text-4xl font-pixel text-primary mb-4">
        {title}
      </h1>
      <p className="text-gray-400 mb-8">
        {message}
      </p>
      {retry && (
        <button
          onClick={retry}
          className="arcade-button text-sm px-6 py-3"
        >
          Try Again
        </button>
      )}
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