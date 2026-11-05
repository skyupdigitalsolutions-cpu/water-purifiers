import type { ReactNode } from 'react';

type Props = { eyebrow: string; title: ReactNode; intro?: ReactNode; align?: 'left' | 'center'; light?: boolean; id?: string };

export default function SectionHeading({ eyebrow, title, intro, align = 'left', light, id }: Props) {
  const center = align === 'center';
  return (
    <div className={`reveal max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      <p className={`eyebrow ${center ? 'justify-center' : ''} ${light ? '!text-aqua-400' : ''}`}>{eyebrow}</p>
      <h2 id={id} className={`mt-4 text-[30px] leading-[1.12] sm:text-[40px] ${light ? '!text-white' : ''}`}>{title}</h2>
      {intro && <p className={`mt-4 text-[16px] leading-relaxed sm:text-[17px] ${light ? 'text-white/70' : 'text-ink-500'}`}>{intro}</p>}
    </div>
  );
}
