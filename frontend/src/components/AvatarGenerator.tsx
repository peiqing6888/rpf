'use client';

import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

interface AvatarGeneratorProps {
  onSave: (avatarData: string) => void;
}

const CANVAS_SIZE = 64;
const PIXEL_SIZE = 8;

export const AvatarGenerator: React.FC<AvatarGeneratorProps> = ({ onSave }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedColor, setSelectedColor] = useState('#FF770F');
  const [currentTool, setCurrentTool] = useState<'pencil' | 'eraser'>('pencil');
  const [isDrawing, setIsDrawing] = useState(false);

  const colors = [
    '#FF770F', // Primary (Hermès Orange)
    '#000026', // Secondary (Deep Blue)
    '#FFFFFF', // White
    '#FF69B4', // Pink
    '#4B0082', // Indigo
    '#9400D3', // Violet
    '#FF1493', // Deep Pink
    '#00FFFF', // Cyan
  ];

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 初始化畫布
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // 繪製網格
    ctx.strokeStyle = '#CCCCCC';
    for (let i = 0; i <= CANVAS_SIZE; i += PIXEL_SIZE) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, CANVAS_SIZE);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(CANVAS_SIZE, i);
      ctx.stroke();
    }
  }, []);

  const drawPixel = (x: number, y: number) => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const pixelX = Math.floor(x / PIXEL_SIZE) * PIXEL_SIZE;
    const pixelY = Math.floor(y / PIXEL_SIZE) * PIXEL_SIZE;

    ctx.fillStyle = currentTool === 'eraser' ? '#FFFFFF' : selectedColor;
    ctx.fillRect(pixelX, pixelY, PIXEL_SIZE, PIXEL_SIZE);

    // 重繪網格線
    ctx.strokeStyle = '#CCCCCC';
    ctx.strokeRect(pixelX, pixelY, PIXEL_SIZE, PIXEL_SIZE);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    drawPixel(x, y);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    drawPixel(x, y);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // 重繪網格
    ctx.strokeStyle = '#CCCCCC';
    for (let i = 0; i <= CANVAS_SIZE; i += PIXEL_SIZE) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, CANVAS_SIZE);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(CANVAS_SIZE, i);
      ctx.stroke();
    }
  };

  const handleSave = () => {
    if (!canvasRef.current) return;
    const avatarData = canvasRef.current.toDataURL();
    onSave(avatarData);
  };

  return (
    <div className="p-4 bg-secondary rounded-lg shadow-lg">
      <h2 className="text-xl mb-4 font-pixel text-primary">8-Bit Avatar Generator</h2>
      <div className="flex gap-4">
        <div>
          <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            className="border-4 border-primary cursor-crosshair"
            style={{ imageRendering: 'pixelated' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            {colors.map((color) => (
              <button
                key={color}
                className={classNames(
                  'w-8 h-8 rounded-full border-2',
                  selectedColor === color && currentTool === 'pencil'
                    ? 'border-white scale-110'
                    : 'border-transparent'
                )}
                style={{ backgroundColor: color }}
                onClick={() => {
                  setSelectedColor(color);
                  setCurrentTool('pencil');
                }}
              />
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <button
              className={classNames(
                'px-3 py-1 rounded text-sm',
                currentTool === 'eraser'
                  ? 'bg-primary text-white'
                  : 'bg-gray-700 text-gray-300'
              )}
              onClick={() => setCurrentTool('eraser')}
            >
              Eraser
            </button>
            <button
              className="px-3 py-1 rounded text-sm bg-gray-700 text-gray-300"
              onClick={clearCanvas}
            >
              Clear
            </button>
          </div>
          <button
            className="arcade-button mt-4 text-sm"
            onClick={handleSave}
          >
            Save Avatar
          </button>
        </div>
      </div>
    </div>
  );
}; 