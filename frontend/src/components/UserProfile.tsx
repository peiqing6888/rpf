'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { AvatarGenerator } from './AvatarGenerator';
import { generateDefaultAvatar } from './DefaultAvatar';
import { useAuthStore } from '@/store/auth';

export const UserProfile: React.FC = () => {
  const { user, updateAvatar, loading, error, updateNameplate } = useAuthStore();
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [isEditingNameplate, setIsEditingNameplate] = useState(false);
  const [newNameplate, setNewNameplate] = useState(user?.user_metadata?.nameplate || 'New Member');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [defaultAvatarUrl, setDefaultAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.user_metadata?.avatar_url) {
      const username = user?.user_metadata?.username || 'User';
      const avatarUrl = generateDefaultAvatar({ size: 128, username });
      setDefaultAvatarUrl(avatarUrl);
    }
  }, [user]);

  if (!user) {
    return null;
  }

  const handleSaveAvatar = async (avatarData: string) => {
    try {
      setUploadError(null);
      await updateAvatar(avatarData);
      setIsEditingAvatar(false);
    } catch (error) {
      console.error('Error saving avatar:', error);
      setUploadError('Failed to upload avatar. Please try again.');
    }
  };

  const handleSaveNameplate = async () => {
    try {
      await updateNameplate(newNameplate);
      setIsEditingNameplate(false);
    } catch (error) {
      console.error('Error updating nameplate:', error);
    }
  };

  const avatarUrl = user.user_metadata?.avatar_url || defaultAvatarUrl;

  if (!avatarUrl) {
    return null; // 等待默認頭像生成
  }

  return (
    <div className="bg-secondary p-6 rounded-lg border-4 border-primary">
      <div className="flex flex-col items-center">
        <div className="relative group">
          <div className="w-32 h-32 relative">
            <Image
              src={avatarUrl}
              alt={user.user_metadata?.username || 'User'}
              fill
              className="rounded-lg pixelated border-4 border-white object-cover"
            />
          </div>
          <button
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
            onClick={() => setIsEditingAvatar(true)}
          >
            <span className="text-white text-sm">Edit Avatar</span>
          </button>
        </div>

        <div className="mt-4 text-center">
          <h2 className="text-2xl font-pixel text-primary mb-2">
            {user.user_metadata?.username || 'Anonymous'}
          </h2>
          <div className="relative inline-block">
            <div
              className="bg-primary px-4 py-2 rounded cursor-pointer"
              onClick={() => setIsEditingNameplate(true)}
            >
              <span className="font-pixel text-white text-sm">
                {newNameplate}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-8 text-center">
          <div>
            <div className="text-2xl font-pixel text-primary">
              {user.user_metadata?.post_count || 0}
            </div>
            <div className="text-sm text-gray-400">Posts</div>
          </div>
          <div>
            <div className="text-2xl font-pixel text-primary">
              {user.user_metadata?.reaction_count || 0}
            </div>
            <div className="text-sm text-gray-400">Reactions</div>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-400">
          Member since {new Date(user.created_at).toLocaleDateString()}
        </div>

        {error && (
          <div className="mt-4 text-red-500 text-sm text-center">
            {error}
          </div>
        )}
      </div>

      {isEditingAvatar && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-secondary p-6 rounded-lg max-w-xl w-full">
            <h3 className="text-xl font-pixel text-primary mb-4">
              Edit Avatar
            </h3>
            <AvatarGenerator onSave={handleSaveAvatar} />
            {uploadError && (
              <div className="mt-4 text-red-500 text-sm">
                {uploadError}
              </div>
            )}
            <button
              className="mt-4 text-gray-400 hover:text-white"
              onClick={() => {
                setIsEditingAvatar(false);
                setUploadError(null);
              }}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {isEditingNameplate && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-secondary p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-pixel text-primary mb-4">
              Edit Nameplate
            </h3>
            <div className="ddos-input mb-4">
              <input
                type="text"
                value={newNameplate}
                onChange={(e) => setNewNameplate(e.target.value)}
                className="w-full bg-transparent border-none outline-none font-mono text-primary"
                maxLength={20}
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                className="text-gray-400 hover:text-white"
                onClick={() => setIsEditingNameplate(false)}
              >
                Cancel
              </button>
              <button
                className="arcade-button text-xs px-4 py-2"
                onClick={handleSaveNameplate}
                disabled={loading}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 