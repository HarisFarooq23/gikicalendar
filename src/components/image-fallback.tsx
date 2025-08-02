"use client";

import { generateColor } from '@/lib/utils';

type ImageFallbackProps = {
  text: string;
};

export function ImageFallback({ text }: ImageFallbackProps) {
  const firstLetter = text.charAt(0).toUpperCase();
  const color = generateColor(text);

  return (
    <div
      className="w-full h-full flex items-center justify-center text-white font-bold text-5xl"
      style={{ backgroundColor: color }}
    >
      {firstLetter}
    </div>
  );
}
