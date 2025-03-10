'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CRTEffect } from '@/components/CRTEffect';
import { PostDetail } from '@/components/PostDetail';
import { ReplyList } from '@/components/ReplyList';
import { Post, Reply, postsApi } from '@/lib/api';
import { useAuthStore } from '@/store/auth';

interface Params {
  id: string;
  [key: string]: string | string[];
}

export default function PostPage() {
  const params = useParams() as Params;
  const postId = params.id;
  const { user } = useAuthStore();

  const [post, setPost] = useState<Post | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [postData, repliesData] = await Promise.all([
        postsApi.getOne(postId),
        postsApi.getReplies(postId),
      ]);
      setPost(postData);
      setReplies(repliesData);
      setError(null);
    } catch (err) {
      setError('Failed to load post');
      console.error('Error fetching post:', err);
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
      await postsApi.createReply(postId, { content: replyContent });
      setReplyContent('');
      fetchData(); // 重新加載帖子和回覆
    } catch (err) {
      console.error('Error creating reply:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <CRTEffect>
        <div className="min-h-screen bg-secondary flex items-center justify-center">
          <div className="font-pixel text-primary text-xl">Loading...</div>
        </div>
      </CRTEffect>
    );
  }

  if (error || !post) {
    return (
      <CRTEffect>
        <div className="min-h-screen bg-secondary flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-pixel text-primary mb-4">
              404
            </h1>
            <p className="text-gray-400">
              {error || 'Post not found'}
            </p>
          </div>
        </div>
      </CRTEffect>
    );
  }

  return (
    <CRTEffect>
      <main className="min-h-screen bg-secondary">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <PostDetail post={post} onReactionUpdate={fetchData} />
          
          <div className="mt-8">
            <h2 className="text-2xl font-pixel text-primary mb-4">
              Replies ({replies.length})
            </h2>
            <ReplyList replies={replies} onReactionUpdate={fetchData} />
          </div>

          {user && !post.isLocked && (
            <div className="mt-8">
              <div className="ddos-input">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="w-full bg-transparent border-none outline-none resize-none font-mono text-primary min-h-[120px] p-4"
                  placeholder="Write your reply..."
                  disabled={isSubmitting}
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  className="arcade-button"
                  onClick={handleSubmitReply}
                  disabled={isSubmitting || !replyContent.trim()}
                >
                  {isSubmitting ? 'Posting...' : 'Post Reply'}
                </button>
              </div>
            </div>
          )}

          {post.isLocked && (
            <div className="mt-8 text-center text-gray-400 border-2 border-primary rounded-lg p-4">
              This post is locked. New replies are not allowed.
            </div>
          )}

          {!user && (
            <div className="mt-8 text-center text-gray-400 border-2 border-primary rounded-lg p-4">
              Please sign in to reply to this post.
            </div>
          )}
        </div>
      </main>
    </CRTEffect>
  );
} 