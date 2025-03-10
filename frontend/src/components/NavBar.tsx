'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth';

export const NavBar: React.FC = () => {
  const pathname = usePathname();
  const { user, signOut } = useAuthStore();

  const isActive = (path: string) => {
    return pathname?.startsWith(path);
  };

  return (
    <nav className="bg-secondary border-b-2 border-primary">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* 左側 Logo 和主要導航 */}
          <div className="flex">
            <Link href="/" className="flex items-center">
              <Image
                src="/icons/default.svg"
                alt="Pixel Forum"
                width={32}
                height={32}
                className="pixelated"
              />
              <span className="ml-2 font-pixel text-primary">
                Pixel Forum
              </span>
            </Link>
            <div className="ml-8 flex items-center space-x-4">
              <Link
                href="/forum"
                className={`font-pixel text-sm ${
                  isActive('/forum')
                    ? 'text-primary'
                    : 'text-gray-400 hover:text-primary'
                }`}
              >
                Forum
              </Link>
              <Link
                href="/about"
                className={`font-pixel text-sm ${
                  isActive('/about')
                    ? 'text-primary'
                    : 'text-gray-400 hover:text-primary'
                }`}
              >
                About
              </Link>
            </div>
          </div>

          {/* 右側用戶菜單 */}
          <div className="flex items-center">
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2">
                  <div className="relative w-8 h-8">
                    <Image
                      src={user.avatar ?? '/icons/default.svg'}
                      alt={user.username ?? 'User'}
                      fill
                      className="rounded-full object-cover pixelated"
                    />
                  </div>
                  <span className="font-pixel text-sm text-primary">
                    {user.username}
                  </span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-secondary border-2 border-primary rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-1">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-400 hover:text-primary hover:bg-primary/10"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-400 hover:text-primary hover:bg-primary/10"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-400 hover:text-primary hover:bg-primary/10"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-x-4">
                <Link
                  href="/auth/signin"
                  className="font-pixel text-sm text-gray-400 hover:text-primary"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="font-pixel text-sm text-primary"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}; 