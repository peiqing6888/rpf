import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { usersApi, UpdateUserDto } from '@/lib/api';
import { uploadAvatar } from '@/lib/storage';
import { AuthState } from '@/types/store';

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: true,
  error: null,
  initialized: false,

  initialize: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // 獲取用戶的完整資料
        const apiUser = await usersApi.getCurrentUser();
        set({
          user: {
            ...session.user,
            ...apiUser,
          },
          loading: false,
          initialized: true,
        });
      } else {
        set({ user: null, loading: false, initialized: true });
      }
    } catch (error) {
      set({
        error: 'Failed to initialize auth',
        loading: false,
        initialized: true,
      });
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

      // 獲取用戶的完整資料
      if (data.user) {
        const apiUser = await usersApi.getCurrentUser();
        set({
          user: {
            ...data.user,
            ...apiUser,
          },
          loading: false,
        });
      }
    } catch (error) {
      set({
        error: 'Failed to sign in',
        loading: false,
      });
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

      // 等待用戶確認郵件
      set({
        user: data.user,
        loading: false,
      });
    } catch (error) {
      set({
        error: 'Failed to sign up',
        loading: false,
      });
    }
  },

  signOut: async () => {
    try {
      set({ loading: true, error: null });
      await supabase.auth.signOut();
      set({ user: null, loading: false });
    } catch (error) {
      set({
        error: 'Failed to sign out',
        loading: false,
      });
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
      const updatedUser = await usersApi.updateCurrentUser({
        avatar: avatarUrl,
      });

      // 更新本地狀態
      set((state) => ({
        user: state.user ? {
          ...state.user,
          ...updatedUser,
        } : null,
        loading: false,
      }));
    } catch (error) {
      set({
        error: 'Failed to update avatar',
        loading: false,
      });
    }
  },

  updateNameplate: async (nameplate: string) => {
    try {
      const user = get().user;
      if (!user) throw new Error('No user logged in');

      set({ loading: true, error: null });

      // 更新用戶資料
      const updatedUser = await usersApi.updateCurrentUser({
        nameplate,
      });

      // 更新本地狀態
      set((state) => ({
        user: state.user ? {
          ...state.user,
          ...updatedUser,
        } : null,
        loading: false,
      }));
    } catch (error) {
      set({
        error: 'Failed to update nameplate',
        loading: false,
      });
    }
  },

  updateProfile: async (data: UpdateUserDto) => {
    try {
      const user = get().user;
      if (!user) throw new Error('No user logged in');

      set({ loading: true, error: null });

      // 更新用戶資料
      const updatedUser = await usersApi.updateCurrentUser(data);

      // 更新本地狀態
      set((state) => ({
        user: state.user ? {
          ...state.user,
          ...updatedUser,
        } : null,
        loading: false,
      }));
    } catch (error) {
      set({
        error: 'Failed to update profile',
        loading: false,
      });
    }
  },
})); 