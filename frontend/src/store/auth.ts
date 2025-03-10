import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { uploadAvatar } from '@/lib/storage';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
  updateAvatar: (avatarData: string) => Promise<void>;
  updateNameplate: (nameplate: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: true,
  error: null,
  initialized: false,

  initialize: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      set({ user, loading: false, initialized: true });
    } catch (error) {
      set({ error: 'Failed to initialize auth', loading: false, initialized: true });
    }
  },

  signIn: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      set({ user: data.user, loading: false });
    } catch (error) {
      set({ error: 'Failed to sign in', loading: false });
    }
  },

  signUp: async (email: string, password: string, username: string) => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });
      if (error) throw error;
      set({ user: data.user, loading: false });
    } catch (error) {
      set({ error: 'Failed to sign up', loading: false });
    }
  },

  signOut: async () => {
    try {
      set({ loading: true, error: null });
      await supabase.auth.signOut();
      set({ user: null, loading: false });
    } catch (error) {
      set({ error: 'Failed to sign out', loading: false });
    }
  },

  updateAvatar: async (avatarData: string) => {
    try {
      const user = get().user;
      if (!user) throw new Error('No user logged in');

      set({ loading: true, error: null });
      
      // 上傳頭像到 Supabase Storage
      const avatarUrl = await uploadAvatar(user.id, avatarData);

      // 更新用戶資料
      const { error } = await supabase.auth.updateUser({
        data: {
          avatar_url: avatarUrl,
        },
      });

      if (error) throw error;

      // 更新本地狀態
      set((state) => ({
        user: state.user ? {
          ...state.user,
          user_metadata: {
            ...state.user.user_metadata,
            avatar_url: avatarUrl,
          },
        } : null,
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update avatar', loading: false });
    }
  },

  updateNameplate: async (nameplate: string) => {
    try {
      const user = get().user;
      if (!user) throw new Error('No user logged in');

      set({ loading: true, error: null });

      // 更新用戶資料
      const { error } = await supabase.auth.updateUser({
        data: {
          nameplate,
        },
      });

      if (error) throw error;

      // 更新本地狀態
      set((state) => ({
        user: state.user ? {
          ...state.user,
          user_metadata: {
            ...state.user.user_metadata,
            nameplate,
          },
        } : null,
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update nameplate', loading: false });
    }
  },
})); 