import React, { useState } from 'react';
import Image from 'next/image';
import { AvatarGenerator } from './AvatarGenerator';

interface UserProfileProps {
  user: {
    id: string;
    name: string;
    avatar: string;
    nameplate: string;
    joinDate: string;
    postCount: number;
    reactions: number;
  };
  onUpdateAvatar: (avatarData: string) => void;
  onUpdateNameplate: (nameplate: string) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  user,
  onUpdateAvatar,
  onUpdateNameplate,
}) => {
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [isEditingNameplate, setIsEditingNameplate] = useState(false);
  const [newNameplate, setNewNameplate] = useState(user.nameplate);

  const handleSaveAvatar = (avatarData: string) => {
    onUpdateAvatar(avatarData);
    setIsEditingAvatar(false);
  };

  const handleSaveNameplate = () => {
    onUpdateNameplate(newNameplate);
    setIsEditingNameplate(false);
  };

  return (
    <div className="bg-secondary p-6 rounded-lg border-4 border-primary">
      <div className="flex flex-col items-center">
        <div className="relative group">
          <Image
            src={user.avatar}
            alt={user.name}
            width={128}
            height={128}
            className="rounded-lg pixelated border-4 border-white"
          />
          <button
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => setIsEditingAvatar(true)}
          >
            <span className="text-white text-sm">Edit Avatar</span>
          </button>
        </div>

        <div className="mt-4 text-center">
          <h2 className="text-2xl font-pixel text-primary mb-2">{user.name}</h2>
          <div className="relative inline-block">
            <div
              className="bg-primary px-4 py-2 rounded cursor-pointer"
              onClick={() => setIsEditingNameplate(true)}
            >
              <span className="font-pixel text-white text-sm">
                {user.nameplate}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-8 text-center">
          <div>
            <div className="text-2xl font-pixel text-primary">
              {user.postCount}
            </div>
            <div className="text-sm text-gray-400">Posts</div>
          </div>
          <div>
            <div className="text-2xl font-pixel text-primary">
              {user.reactions}
            </div>
            <div className="text-sm text-gray-400">Reactions</div>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-400">
          Member since {user.joinDate}
        </div>
      </div>

      {isEditingAvatar && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-secondary p-6 rounded-lg max-w-xl w-full">
            <h3 className="text-xl font-pixel text-primary mb-4">
              Edit Avatar
            </h3>
            <AvatarGenerator onSave={handleSaveAvatar} />
            <button
              className="mt-4 text-gray-400 hover:text-white"
              onClick={() => setIsEditingAvatar(false)}
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