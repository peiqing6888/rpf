'use client';

import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary border-t-2 border-primary py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 關於我們 */}
          <div>
            <h3 className="font-pixel text-primary text-lg mb-4">
              About Us
            </h3>
            <p className="text-gray-400 text-sm">
              Pixel Forum is a safe space for the LGBTQA+ community to connect,
              share experiences, and support each other in a retro-styled
              environment.
            </p>
          </div>

          {/* 快速鏈接 */}
          <div>
            <h3 className="font-pixel text-primary text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/forum"
                  className="text-gray-400 hover:text-primary text-sm"
                >
                  Forum
                </Link>
              </li>
              <li>
                <Link
                  href="/guidelines"
                  className="text-gray-400 hover:text-primary text-sm"
                >
                  Community Guidelines
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-primary text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-primary text-sm"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* 聯繫我們 */}
          <div>
            <h3 className="font-pixel text-primary text-lg mb-4">
              Contact Us
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:support@pixelforum.com"
                  className="text-gray-400 hover:text-primary text-sm"
                >
                  support@pixelforum.com
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/pixelforum"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary text-sm"
                >
                  Join our Discord
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/pixelforum"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary text-sm"
                >
                  Follow us on Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 版權信息 */}
        <div className="mt-8 pt-8 border-t border-primary/30 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Pixel Forum. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}; 