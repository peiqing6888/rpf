'use client';

export interface DefaultAvatarOptions {
  size?: number;
  username?: string;
}

export function generateDefaultAvatar(options: DefaultAvatarOptions = {}): string {
  const { size = 64, username = 'User' } = options;
  
  if (typeof window === 'undefined') {
    return '';
  }

  // 創建 canvas
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // 設置背景色
  ctx.fillStyle = '#000026';
  ctx.fillRect(0, 0, size, size);

  // 生成基於用戶名的隨機顏色
  const hash = username.split('').reduce((acc: number, char: string) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  const color = `hsl(${hash % 360}, 70%, 60%)`;

  // 繪製像素圖案
  ctx.fillStyle = color;
  const pixelSize = size / 8;
  const pattern = [
    [0,0,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,0],
    [1,1,0,1,1,0,1,1],
    [1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1],
    [1,1,0,1,1,0,1,1],
    [0,1,1,0,0,1,1,0],
    [0,0,1,1,1,1,0,0],
  ] as const;

  pattern.forEach((row, y) => {
    row.forEach((pixel, x) => {
      if (pixel) {
        ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
      }
    });
  });

  // 返回 base64 數據
  return canvas.toDataURL('image/png');
} 