import { site } from '../config/site';

type Props = { light?: boolean; className?: string };

/** Original mark: a water drop held inside a soft triangle, with a reflection stroke. */
export default function Logo({ light = false, className = '' }: Props) {
  if (site.logoSrc) {
    return <img src={site.logoSrc} alt={site.name} className={`h-10 w-auto sm:h-11 ${className}`} />;
  }
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true" className="shrink-0">
        <path d="M20 4 L37 34 H3 Z" fill="#ffffff" stroke={light ? '#ffffff' : '#0A2240'} strokeWidth="4" strokeLinejoin="round" />
        <path d="M20 13S14 20.4 14 24.6a6 6 0 0 0 12 0C26 20.4 20 13 20 13Z" fill="#14AFCB" />
        <path d="M17.1 25.2a3 3 0 0 0 3 3" stroke="#0A2240" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      </svg>
      <span className="leading-none">
        <span className={`block font-display text-[19px] font-medium tracking-tight ${light ? 'text-white' : 'text-navy-900'}`}>
          Good Water
        </span>
        <span className={`mt-1 block text-[10.5px] font-semibold uppercase tracking-[0.2em] ${light ? 'text-aqua-400' : 'text-aqua-700'}`}>
          for Good Life
        </span>
      </span>
    </span>
  );
}
