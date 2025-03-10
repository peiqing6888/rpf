'use client';

import { useEffect, useState } from 'react';
import { CRTEffect } from '@/components/CRTEffect';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { useAuthStore } from '@/store/auth';
import { usersApi } from '@/lib/api';
import type { Post, Reaction } from '@/lib/api';
import { AvatarGenerator } from '@/components/AvatarGenerator';

export default function ProfilePage() {
  const { user, loading: authLoading, updateAvatar } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const [userPosts, userReactions] = await Promise.all([
          usersApi.getCurrentUserPosts(),
          usersApi.getCurrentUserReactions(),
        ]);
        setPosts(userPosts);
        setReactions(userReactions);
      } catch (err) {
        setError('Failed to load user data');
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleSaveAvatar = async (avatarData: string) => {
    try {
      await updateAvatar(avatarData);
      setIsEditingAvatar(false);
    } catch (err) {
      console.error('Error updating avatar:', err);
    }
  };

  if (authLoading || loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!user) {
    return (
      <CRTEffect className="min-h-screen bg-secondary">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-pixel text-primary text-center">
            Please sign in to view profile
          </h1>
        </div>
      </CRTEffect>
    );
  }

  if (error) {
    return <ErrorMessage message={error} fullScreen />;
  }

  return (
    <CRTEffect>
      <main className="min-h-screen bg-secondary">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* 用戶信息 */}
          <div className="bg-primary/5 border-2 border-primary rounded-lg p-6 mb-8">
            <div className="flex items-start gap-8">
              <div className="flex-shrink-0">
                {isEditingAvatar ? (
                  <div className="w-48">
                    <AvatarGenerator onSave={handleSaveAvatar} />
                  </div>
                ) : (
                  <div
                    className="relative w-48 h-48 cursor-pointer group"
                    onClick={() => setIsEditingAvatar(true)}
                  >
                    <img
                      src={user.avatar || '/icons/default.svg'}
                      alt={user.username}
                      className="w-full h-full object-cover rounded-lg pixelated"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                      <span className="text-white font-pixel text-sm">
                        Change Avatar
                      </span>
                    </div>
                  </div>
                )}
                <div className="mt-4 text-center">
                  <div className="bg-primary px-4 py-2 rounded-lg">
                    <span className="text-white font-pixel">
                      {user.nameplate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-grow">
                <h1 className="text-4xl font-pixel text-primary mb-4">
                  {user.username}
                </h1>
                <div className="grid grid-cols-2 gap-4 text-gray-400">
                  <div>
                    <span className="block text-sm">Posts</span>
                    <span className="text-2xl font-pixel text-primary">
                      {user.postCount}
                    </span>
                  </div>
                  <div>
                    <span className="block text-sm">Reactions</span>
                    <span className="text-2xl font-pixel text-primary">
                      {user.reactionCount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 最近的帖子 */}
          <div className="mb-8">
            <h2 className="text-2xl font-pixel text-primary mb-4">
              Recent Posts
            </h2>
            {posts.length > 0 ? (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-primary/5 border-2 border-primary rounded-lg p-4"
                  >
                    <h3 className="font-pixel text-primary mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2">
                      {post.content}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No posts yet</p>
            )}
          </div>

          {/* 最近的反應 */}
          <div>
            <h2 className="text-2xl font-pixel text-primary mb-4">
              Recent Reactions
            </h2>
            {reactions.length > 0 ? (
              <div className="space-y-4">
                {reactions.map((reaction) => (
                  <div
                    key={reaction.id}
                    className="bg-primary/5 border-2 border-primary rounded-lg p-4"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{reaction.type}</span>
                      <span className="text-gray-400">on</span>
                      <span className="font-pixel text-primary">
                        {reaction.post.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No reactions yet</p>
            )}
          </div>
        </div>
      </main>
    </CRTEffect>
  );
} 