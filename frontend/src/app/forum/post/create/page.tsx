'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CRTEffect } from '@/components/CRTEffect';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Board, boardsApi, postsApi } from '@/lib/api';
import { useAuthStore } from '@/store/auth';

export default function CreatePostPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const boardId = searchParams?.get('boardId');
  const { user } = useAuthStore();

  const [board, setBoard] = useState<Board | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBoard = async () => {
      if (!boardId) {
        setError('Board ID is required');
        setIsLoading(false);
        return;
      }

      try {
        const boardData = await boardsApi.getOne(boardId);
        setBoard(boardData);
        setError(null);
      } catch (err) {
        console.error('Error fetching board:', err);
        setError('Failed to load board');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBoard();
  }, [boardId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !board) return;

    try {
      setIsSubmitting(true);
      setError(null);
      const post = await postsApi.create({
        title: title.trim(),
        content: content.trim(),
        boardId: board.id,
      });
      router.push(`/forum/post/${post.id}`);
    } catch (err) {
      console.error('Error creating post:', err);
      setError('Failed to create post');
      setIsSubmitting(false);
    }
  };

  if (!user) {
    router.push('/auth/signin');
    return null;
  }

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (error || !board) {
    return (
      <ErrorMessage
        message={error || 'Board not found'}
        fullScreen
        retry={() => router.push('/forum')}
      />
    );
  }

  if (board.settings.requireApproval && !board.moderators.includes(user.id)) {
    return (
      <ErrorMessage
        title="Permission Denied"
        message="This board requires moderator approval for new posts."
        fullScreen
        retry={() => router.push(`/forum/board/${board.id}`)}
      />
    );
  }

  return (
    <CRTEffect>
      <main className="min-h-screen bg-secondary">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-pixel text-primary mb-8">
            Create New Post
          </h1>

          <div className="mb-8">
            <h2 className="font-pixel text-xl text-primary mb-2">
              {board.name}
            </h2>
            <p className="text-gray-400">
              {board.description}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-pixel text-sm text-primary mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="ddos-input pl-8"
                placeholder="Enter post title..."
                disabled={isSubmitting}
                maxLength={100}
                required
              />
            </div>

            <div>
              <label className="block font-pixel text-sm text-primary mb-2">
                Content
              </label>
              <div className="ddos-input">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-transparent border-none outline-none resize-none font-mono text-primary min-h-[300px] p-4"
                  placeholder="Write your post..."
                  disabled={isSubmitting}
                  required
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm">
                {error}
              </div>
            )}

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => router.push(`/forum/board/${board.id}`)}
                className="text-gray-400 hover:text-primary transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="arcade-button"
                disabled={isSubmitting || !title.trim() || !content.trim()}
              >
                {isSubmitting ? 'Creating...' : 'Create Post'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </CRTEffect>
  );
} 