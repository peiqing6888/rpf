'use client';

import { AvatarGenerator } from '@/components/AvatarGenerator';
import { CRTEffect } from '@/components/CRTEffect';
import { useState } from 'react';

export default function Home() {
  const [avatarData, setAvatarData] = useState<string | null>(null);

  const handleSaveAvatar = (data: string) => {
    setAvatarData(data);
  };

  return (
    <CRTEffect>
      <main className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-pixel mb-8 text-primary text-center">
            Welcome to Pixel Forum
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <AvatarGenerator onSave={handleSaveAvatar} />
            </div>
            <div className="bg-secondary p-4 rounded-lg">
              <h2 className="text-xl font-pixel mb-4 text-primary">Preview</h2>
              {avatarData ? (
                <img
                  src={avatarData}
                  alt="Generated avatar"
                  className="w-32 h-32 mx-auto"
                  style={{ imageRendering: 'pixelated' }}
                />
              ) : (
                <div className="w-32 h-32 mx-auto bg-gray-700 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400 text-sm text-center">
                    Generate an avatar to see preview
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </CRTEffect>
  );
} 