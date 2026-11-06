import { site } from '../config/site';

type Props = { light?: boolean; className?: string };

/** Mark: a white water drop inside a sky-blue triangle (same in the header and the footer). */
export default function Logo({ light = false, className = '' }: Props) {
  if (site.logoSrc) {
    return <img src={site.logoSrc} alt={site.name} className={`h-10 w-auto sm:h-11 ${className}`} />;
  }
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <svg width="44" height="39" viewBox="0 0 108 95" aria-hidden="true" className="shrink-0">
        {/* sky-blue triangle */}
        <path d="M54 4 L104 90 H4 Z" fill="#6EB9DC" stroke="#6EB9DC" strokeWidth="5" strokeLinejoin="round" />
        {/* white water drop */}
        <path d="M54 27.2 L69.8 47.4 A20 20 0 1 1 38.2 47.4 Z" fill="#ffffff" />
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
