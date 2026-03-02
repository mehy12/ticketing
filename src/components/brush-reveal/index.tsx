'use client';
import dynamic from 'next/dynamic';

const BrushRevealScene = dynamic(() => import('./scene'), {
  ssr: false,
  loading: () => (
    <div className="flex w-full h-full justify-center items-center bg-black/40 rounded-3xl backdrop-blur-sm">
      <div className="w-6 h-6 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
    </div>
  ),
});

export { BrushRevealScene };
export type { default as BrushRevealSceneType } from './scene';
