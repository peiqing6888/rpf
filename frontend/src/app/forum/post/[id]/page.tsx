'use client';

import { useParams } from 'next/navigation';
import { CRTEffect } from '@/components/CRTEffect';
import { PostDetail } from '@/components/PostDetail';
import { ReplyList } from '@/components/ReplyList';
import { MOCK_POSTS, MOCK_REPLIES } from '@/data/mock';

interface Params {
  id: string;
  [key: string]: string | string[];
}

export default function PostPage() {
  const params = useParams() as Params;
  const postId = params.id;

  const post = MOCK_POSTS.find(p => p.id === postId);
  const replies = MOCK_REPLIES.filter(r => r.postId === postId);

  if (!post) {
    return (
      <CRTEffect>
        <div className="min-h-screen bg-secondary flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-pixel text-primary mb-4">
              404
            </h1>
            <p className="text-gray-400">
              Post not found
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
          <PostDetail post={post} />
          
          <div className="mt-8">
            <h2 className="text-2xl font-pixel text-primary mb-4">
              Replies ({replies.length})
            </h2>
            <ReplyList replies={replies} />
          </div>

          <div className="mt-8">
            <div className="ddos-input">
              <textarea
                className="w-full bg-transparent border-none outline-none resize-none font-mono text-primary min-h-[120px] p-4"
                placeholder="Write your reply..."
              />
            </div>
            <div className="flex justify-end mt-4">
              <button className="arcade-button">
                Post Reply
              </button>
            </div>
          </div>
        </div>
      </main>
    </CRTEffect>
  );
} 