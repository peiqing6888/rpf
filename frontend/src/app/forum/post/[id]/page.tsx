'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CRTEffect } from '@/components/CRTEffect';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { PostDetail } from '@/components/PostDetail';
import { ReplyList } from '@/components/ReplyList';
import { Post, Reply, postsApi } from '@/lib/api';
import { useAuthStore } from '@/store/auth';

export default function PostPage() {
  const params = useParams();
  const postId = typeof params?.id === 'string' ? params.id : null;
  const { user } = useAuthStore();
  const [post, setPost] = useState<Post | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchData = async () => {
    if (!postId) {
      setError('Invalid post ID');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const postData = await postsApi.getOne(postId);
      const repliesData = await postsApi.getReplies(postId);
      setPost(postData);
      setReplies(repliesData);
    } catch (err) {
      console.error('Error fetching post:', err);
      setError('Failed to load post');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [postId]);

  const handleSubmitReply = async () => {
    if (!user || !replyContent.trim()) return;

    try {
      setIsSubmitting(true);
      await postsApi.createReply(post!.id, {
        content: replyContent.trim(),
      });
      setReplyContent('');
      fetchData(); // 重新加載帖子和回覆
    } catch (err) {
      console.error('Error creating reply:', err);
      setError('Failed to create reply');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (error || !post) {
    return (
      <ErrorMessage
        message={error || 'Post not found'}
        fullScreen
        retry={fetchData}
      />
    );
  }

  return (
    <CRTEffect>
      <main className="min-h-screen bg-secondary">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <PostDetail
            post={post}
            onReactionUpdate={fetchData}
          />

          {/* 回覆區域 */}
          <div className="mt-8">
            <h2 className="font-pixel text-2xl text-primary mb-6">
              Replies
            </h2>

            {user && !post.isLocked && (
              <div className="mb-8">
                <div className="ddos-input">
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="w-full bg-transparent border-none outline-none resize-none font-mono text-primary min-h-[100px] p-4"
                    placeholder="Write your reply..."
                    disabled={isSubmitting}
                  />
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleSubmitReply}
                    disabled={isSubmitting || !replyContent.trim()}
                    className="arcade-button"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Reply'}
                  </button>
                </div>
              </div>
            )}

            {post.isLocked && (
              <div className="text-center py-4 mb-8 border-2 border-primary rounded-lg">
                <p className="text-primary">
                  🔒 This post is locked. New replies are not allowed.
                </p>
              </div>
            )}

            <ReplyList
              replies={replies}
              onReactionUpdate={fetchData}
            />
          </div>
        </div>
      </main>
    </CRTEffect>
  );
} 