'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { CRTEffect } from '@/components/CRTEffect';
import { ForumPosts } from '@/components/ForumPosts';
import { MOCK_BOARDS, MOCK_POSTS, Board } from '@/data/mock';

interface Params {
  id: string;
  [key: string]: string | string[];
}

export default function BoardPage() {
  const params = useParams() as Params;
  const boardId = params.id;

  // 根據 boardId 獲取對應的板塊數據
  const board = MOCK_BOARDS.find((b: Board) => b.id === boardId);

  if (!board) {
    return (
      <CRTEffect>
        <div className="min-h-screen bg-secondary flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-pixel text-primary mb-4">
              404
            </h1>
            <p className="text-gray-400">
              Board not found
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
          <header className="mb-12">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative w-16 h-16">
                <Image
                  src={board.icon}
                  alt={board.name}
                  fill
                  className="object-contain pixelated"
                />
              </div>
              <div>
                <h1 className="text-4xl font-pixel text-primary">
                  {board.name}
                </h1>
                <p className="text-gray-400">
                  {board.description}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <span className="mr-1">📝</span>
                  {board.postsCount} posts
                </div>
                <div className="flex items-center">
                  <span className="mr-1">👥</span>
                  {board.activeUsers} active
                </div>
              </div>
              <button className="arcade-button">
                New Post
              </button>
            </div>
          </header>

          <ForumPosts posts={MOCK_POSTS} />
        </div>
      </main>
    </CRTEffect>
  );
} 