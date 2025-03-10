'use client';

import { useState } from 'react';
import { CRTEffect } from '@/components/CRTEffect';
import { useAuthStore } from '@/store/auth';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export default function SettingsPage() {
  const { user, loading, error, updateProfile } = useAuthStore();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    nameplate: user?.nameplate || '',
    preferences: {
      theme: user?.preferences?.theme || 'dark',
      notifications: user?.preferences?.notifications || false,
      language: user?.preferences?.language || 'en',
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      await updateProfile(formData);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!user) {
    return (
      <CRTEffect className="min-h-screen bg-secondary">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-pixel text-primary text-center">
            Please sign in to access settings
          </h1>
        </div>
      </CRTEffect>
    );
  }

  return (
    <CRTEffect>
      <main className="min-h-screen bg-secondary">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-pixel text-primary mb-8 text-center">
            Settings
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 基本信息 */}
            <div className="bg-primary/5 border-2 border-primary rounded-lg p-6">
              <h2 className="text-2xl font-pixel text-primary mb-6">
                Basic Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block font-pixel text-sm text-primary mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      username: e.target.value,
                    }))}
                    className="ddos-input pl-8"
                    minLength={3}
                    maxLength={20}
                    pattern="[a-zA-Z0-9_-]+"
                    title="Username can only contain letters, numbers, underscores, and hyphens"
                    required
                  />
                </div>

                <div>
                  <label className="block font-pixel text-sm text-primary mb-2">
                    Nameplate
                  </label>
                  <input
                    type="text"
                    value={formData.nameplate}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      nameplate: e.target.value,
                    }))}
                    className="ddos-input pl-8"
                    maxLength={30}
                  />
                </div>
              </div>
            </div>

            {/* 偏好設置 */}
            <div className="bg-primary/5 border-2 border-primary rounded-lg p-6">
              <h2 className="text-2xl font-pixel text-primary mb-6">
                Preferences
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block font-pixel text-sm text-primary mb-2">
                    Theme
                  </label>
                  <select
                    value={formData.preferences.theme}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        theme: e.target.value,
                      },
                    }))}
                    className="ddos-input pl-8"
                  >
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                    <option value="system">System</option>
                  </select>
                </div>

                <div>
                  <label className="block font-pixel text-sm text-primary mb-2">
                    Language
                  </label>
                  <select
                    value={formData.preferences.language}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        language: e.target.value,
                      },
                    }))}
                    className="ddos-input pl-8"
                  >
                    <option value="en">English</option>
                    <option value="zh">中文</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="notifications"
                    checked={formData.preferences.notifications}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        notifications: e.target.checked,
                      },
                    }))}
                    className="mr-2"
                  />
                  <label
                    htmlFor="notifications"
                    className="font-pixel text-sm text-primary"
                  >
                    Enable Notifications
                  </label>
                </div>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm">
                {error}
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                className="arcade-button"
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </CRTEffect>
  );
} 