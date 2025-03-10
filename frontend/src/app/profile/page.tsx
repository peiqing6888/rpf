'use client';

import { CRTEffect } from '@/components/CRTEffect';
import { UserProfile } from '@/components/UserProfile';

export default function ProfilePage() {
  return (
    <CRTEffect>
      <main className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-pixel mb-8 text-primary text-center">
            Your Profile
          </h1>
          <UserProfile />
        </div>
      </main>
    </CRTEffect>
  );
} 