"use client";

import type { ImageLoaderProps } from "next/image";

export default function netlifyImageLoader({ src, width, quality }: ImageLoaderProps) {
  const params = new URLSearchParams({ url: src, w: String(width) });
  if (quality !== undefined) params.set("q", String(quality));
  return `/.netlify/images?${params}`;
}
