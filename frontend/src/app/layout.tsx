import type { Metadata } from 'next';
import { Press_Start_2P, Courier_Prime } from 'next/font/google';
import './globals.css';

const pixelFont = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel',
});

const monoFont = Courier_Prime({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Pixel Forum - LGBTQA+ Community',
  description: 'A retro-style community forum for LGBTQA+ individuals',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${pixelFont.variable} ${monoFont.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
} 