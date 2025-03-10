'use client';

import { useEffect, useState } from 'react';
import { CRTEffect } from '@/components/CRTEffect';
import { ForumBoards } from '@/components/ForumBoards';
import { Board, boardsApi } from '@/lib/api';

export default function ForumPage() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        setIsLoading(true);
        const data = await boardsApi.getAll();
        setBoards(data);
        setError(null);
      } catch (err) {
        setError('Failed to load boards');
        console.error('Error fetching boards:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBoards();
  }, []);

  if (isLoading) {
    return (
      <CRTEffect>
        <div className="min-h-screen bg-secondary flex items-center justify-center">
          <div className="font-pixel text-primary text-xl">Loading...</div>
        </div>
      </CRTEffect>
    );
  }

  if (error) {
    return (
      <CRTEffect>
        <div className="min-h-screen bg-secondary flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-pixel text-primary mb-4">
              Error
            </h1>
            <p className="text-gray-400">
              {error}
            </p>
          </div>
        </div>
      </CRTEffect>
    );
  }

  return (
    <CRTEffect>
      <main className="min-h-screen bg-secondary">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-pixel text-primary mb-4">
              Pixel Forum
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Welcome to our retro-styled safe space. Join the discussion, share your thoughts,
              and connect with others in our pixel-perfect community.
            </p>
          </header>

          <ForumBoards boards={boards} />
        </div>
      </main>
    </CRTEffect>
  );
} 