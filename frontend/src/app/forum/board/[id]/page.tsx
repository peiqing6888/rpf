'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { CRTEffect } from '@/components/CRTEffect';
import { ForumPosts } from '@/components/ForumPosts';
import { CreatePostForm } from '@/components/CreatePostForm';
import { Board, Post, boardsApi, postsApi } from '@/lib/api';
import { useAuthStore } from '@/store/auth';

interface Params {
  id: string;
  [key: string]: string | string[];
}

export default function BoardPage() {
  const params = useParams() as Params;
  const boardId = params.id;
  const { user } = useAuthStore();

  const [board, setBoard] = useState<Board | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [boardData, postsData] = await Promise.all([
        boardsApi.getOne(boardId),
        postsApi.getAll(boardId),
      ]);
      setBoard(boardData);
      setPosts(postsData);
      setError(null);
    } catch (err) {
      setError('Failed to load board');
      console.error('Error fetching board:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [boardId]);

  if (isLoading) {
    return (
      <CRTEffect>
        <div className="min-h-screen bg-secondary flex items-center justify-center">
          <div className="font-pixel text-primary text-xl">Loading...</div>
        </div>
      </CRTEffect>
    );
  }

  if (error || !board) {
    return (
      <CRTEffect>
        <div className="min-h-screen bg-secondary flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-pixel text-primary mb-4">
              404
            </h1>
            <p className="text-gray-400">
              {error || 'Board not found'}
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
                  {board.postCount} posts
                </div>
                <div className="flex items-center">
                  <span className="mr-1">👥</span>
                  {board.activeUsers} active
                </div>
              </div>
              {user && !board.settings.requireApproval && (
                <button
                  className="arcade-button"
                  onClick={() => setIsCreating(true)}
                >
                  New Post
                </button>
              )}
            </div>
          </header>

          {isCreating ? (
            <div className="mb-8">
              <h2 className="text-2xl font-pixel text-primary mb-4">
                Create New Post
              </h2>
              <CreatePostForm
                boardId={boardId}
                onCancel={() => setIsCreating(false)}
              />
            </div>
          ) : (
            <ForumPosts posts={posts} onUpdate={fetchData} />
          )}

          {board.settings.requireApproval && (
            <div className="text-center text-gray-400 border-2 border-primary rounded-lg p-4 mt-8">
              This board requires moderator approval for new posts.
              Please contact a moderator to submit a post.
            </div>
          )}

          {!user && (
            <div className="text-center text-gray-400 border-2 border-primary rounded-lg p-4 mt-8">
              Please sign in to create a new post.
            </div>
          )}
        </div>
      </main>
    </CRTEffect>
  );
} 