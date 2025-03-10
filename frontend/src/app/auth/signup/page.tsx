'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CRTEffect } from '@/components/CRTEffect';
import { useAuthStore } from '@/store/auth';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { signUp, loading, error } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signUp(email, password, username);
    if (!error) {
      router.push('/');
    }
  };

  return (
    <CRTEffect className="min-h-screen bg-secondary p-8">
      <main className="max-w-md mx-auto">
        <h1 className="text-4xl font-pixel text-primary mb-8 text-center">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-pixel text-sm text-primary mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="ddos-input pl-8"
              required
              minLength={3}
              maxLength={20}
              pattern="[a-zA-Z0-9_-]+"
              title="Username can only contain letters, numbers, underscores, and hyphens"
            />
          </div>
          <div>
            <label className="block font-pixel text-sm text-primary mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="ddos-input pl-8"
              required
            />
          </div>
          <div>
            <label className="block font-pixel text-sm text-primary mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="ddos-input pl-8"
              required
              minLength={8}
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
          <button
            type="submit"
            className="arcade-button w-full"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          Already have an account?{' '}
          <Link href="/auth/signin" className="text-primary hover:text-white">
            Sign In
          </Link>
        </p>
      </main>
    </CRTEffect>
  );
} 