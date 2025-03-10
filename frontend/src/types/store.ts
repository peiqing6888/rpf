import { User as SupabaseUser } from '@supabase/supabase-js';
import { User as ApiUser, UpdateUserDto } from '@/lib/api';

export interface AuthState {
  user: (SupabaseUser & Partial<ApiUser>) | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
  updateAvatar: (avatarData: string) => Promise<void>;
  updateNameplate: (nameplate: string) => Promise<void>;
  updateProfile: (data: UpdateUserDto) => Promise<void>;
} 