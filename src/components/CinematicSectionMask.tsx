import React from 'react';

interface CinematicSectionMaskProps {
  fromChapter: string;
  toChapter: string;
  title: string;
  id?: string;
}

export const CinematicSectionMask: React.FC<CinematicSectionMaskProps> = ({
  fromChapter,
  toChapter,
  title,
  id,
}) => {
  return (
    <div
      id={id}
      className="relative w-full py-8 sm:py-10 bg-[#050608] select-none"
    >
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 tracking-wider">
            <span>{fromChapter}</span>
            <span className="text-zinc-600">→</span>
            <span className="text-zinc-300 font-semibold">{toChapter}</span>
          </div>

          <div className="h-[1px] flex-1 bg-white/[0.06]" />

          <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
            {title}
          </span>
        </div>
      </div>
    </div>
  );
};
