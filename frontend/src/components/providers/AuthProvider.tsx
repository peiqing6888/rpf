'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth';
import { useRouter, usePathname } from 'next/navigation';

const publicPaths = ['/', '/auth/signin', '/auth/signup'];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { initialize, initialized, user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname() || '/';

  useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialize, initialized]);

  useEffect(() => {
    if (initialized && !user && !publicPaths.includes(pathname)) {
      router.push('/auth/signin');
    }
  }, [initialized, user, pathname, router]);

  if (!initialized) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="font-pixel text-primary text-xl">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
} 