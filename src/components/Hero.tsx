import { useEffect, useRef, useState } from 'react';
import { Phone, ArrowRight, ShieldCheck, Wrench, Star, Droplets } from 'lucide-react';
import { site } from '../config/site';
import { telLink } from '../lib/whatsapp';

const slides = [
  { src: '/images/products/kent-sterling-star-blue.webp', name: 'KENT Sterling Star', tag: 'RO + UV + UF · TDS' },
  { src: '/images/products/miracle-royal-hot-normal-a.webp', name: 'Aqua Miracle Royal', tag: 'Hot & normal taps' },
  { src: '/images/products/ao-smith-proplanet-p7.webp', name: 'AO Smith Proplanet P7', tag: 'RO + SCMT · Hot & normal' },
  { src: '/images/products/aquaguard-champagne.webp', name: 'Aquaguard Champagne', tag: 'Illuminated touch panel' },
  { src: '/images/products/kent-sapphire-black.webp', name: 'KENT Sapphire', tag: 'RO + UF + TDS · UV in tank' },
  { src: '/images/products/purella-supra-purple-new.webp', name: 'Aqua Purella Supra++', tag: 'RO + UV + UF · Alkaline' },
];

const bubbles = Array.from({ length: 14 }, (_, i) => ({
  left: (i * 37) % 100,
  size: 6 + ((i * 7) % 18),
  delay: (i * 1.3) % 9,
  dur: 9 + ((i * 3) % 8),
}));

export default function Hero() {
  const [i, setI] = useState(0);
  const [inView, setInView] = useState(true);
  const root = useRef<HTMLElement | null>(null);

  // Performance: the hero animations (bubbles, glow, marquee, waves) and the slider only run while the hero is on screen.
  useEffect(() => {
    const el = root.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: '80px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !inView) return;
    const t = setInterval(() => { if (!document.hidden) setI((n) => (n + 1) % slides.length); }, 4200);
    return () => clearInterval(t);
  }, [inView]);

  return (
    <section ref={root} id="home" aria-labelledby="hero-title" className={`hero-bg relative isolate overflow-hidden text-white ${inView ? '' : 'hero-paused'}`}>
      {/* glow orbs */}
      <div aria-hidden className="pointer-events-none absolute -left-52 -top-5 h-[620px] w-[620px] rounded-full bg-[radial-gradient(closest-side,rgba(20,175,203,.30),rgba(20,175,203,.12)_55%,transparent)] animate-glow" />
      <div aria-hidden className="pointer-events-none absolute -right-44 -bottom-10 h-[680px] w-[680px] rounded-full bg-[radial-gradient(closest-side,rgba(29,111,216,.30),rgba(29,111,216,.12)_55%,transparent)] animate-glow [animation-delay:-4s]" />

      {/* rising bubbles */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {bubbles.map((b, k) => (
          <span key={k} className="bubble" style={{ left: `${b.left}%`, width: b.size, height: b.size, animationDelay: `${b.delay}s`, animationDuration: `${b.dur}s` }} />
        ))}
      </div>

      <div className="container-site relative grid items-center gap-10 pb-20 pt-8 sm:pt-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-12 lg:pb-28 lg:pt-14">
        {/* Copy */}
        <div className="text-center lg:text-left">
          <p className="hero-in inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.06] px-3.5 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-aqua-400 sm:text-[12px]">
            <Droplets className="h-3.5 w-3.5" aria-hidden /><span className="sm:hidden">Sales &amp; service · Bengaluru</span><span className="hidden sm:inline">Water purifier sales &amp; service · Bengaluru</span>
          </p>

          <h1 id="hero-title" className="hero-in mt-6 font-display text-[40px] leading-[1.04] !text-white [animation-delay:.1s] min-[400px]:text-[46px] sm:text-[60px] lg:text-[70px]">
            Pure Water.<br />Healthy Living.<br />
            <span className="shimmer-text italic">Trusted Service.</span>
          </h1>

          <p className="hero-in mx-auto mt-5 max-w-xl text-[15.5px] leading-relaxed text-white/75 [animation-delay:.2s] sm:text-[18px] lg:mx-0">
            Discover the right water purification solutions for your home and business with {site.name}, Bengaluru —
            sales, free installation &amp; service under one roof.
          </p>

          <div className="hero-in mt-8 grid grid-cols-2 gap-3 [animation-delay:.3s] sm:flex sm:flex-wrap sm:justify-center lg:justify-start">
            <a href={telLink(site.phones[0].e164)} className="btn bg-white text-navy-900 shadow-[0_10px_30px_-10px_rgba(255,255,255,.5)] hover:bg-sky-100"><Phone className="h-4 w-4" />Call Now</a>
            <a href="#purifiers" className="btn-light">Explore Products<ArrowRight className="h-4 w-4" /></a>
          </div>

          <dl className="hero-in mt-10 grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-white/[.05] p-4 [animation-delay:.4s] sm:gap-4 sm:p-5 lg:max-w-xl">
            <div className="px-1 text-center lg:px-3 lg:text-left"><dd className="font-display text-[26px] leading-none sm:text-[34px]">{site.stats.years}</dd><dt className="mt-1.5 text-[11.5px] text-white/60 sm:text-[13px]">Years experience</dt></div>
            <div className="border-x border-white/10 px-1 text-center lg:px-5 lg:text-left"><dd className="font-display text-[26px] leading-none sm:text-[34px]">{site.stats.customers}</dd><dt className="mt-1.5 text-[11.5px] text-white/60 sm:text-[13px]">Happy customers</dt></div>
            <div className="px-1 text-center lg:px-5 lg:text-left">
              <dd className="flex items-center justify-center gap-1 font-display text-[26px] leading-none sm:text-[34px] lg:justify-start">
                {site.googleSnapshot.rating}<Star className="h-5 w-5 fill-[#F5B301] text-[#F5B301] sm:h-6 sm:w-6" aria-hidden />
              </dd>
              <dt className="mt-1.5 text-[11.5px] text-white/60 sm:text-[13px]">Google rating</dt>
            </div>
          </dl>
        </div>

        {/* Showcase */}
        <div className="hero-in relative mx-auto w-full max-w-[340px] [animation-delay:.25s] sm:max-w-[420px] lg:max-w-[470px]">
          {/* rotating ring */}
          <div aria-hidden className="absolute -inset-6 rounded-full border border-dashed border-aqua-400/30 animate-spin-slow sm:-inset-10" />
          <div aria-hidden className="absolute -inset-2 rounded-[40px] bg-gradient-to-br from-aqua-400/40 via-transparent to-[#1d6fd8]/40 blur-2xl" />

          <div className="animate-float relative aspect-[4/5] overflow-hidden rounded-[32px] border border-white/15 bg-white shadow-[0_40px_80px_-30px_rgba(0,0,0,.8)]">
            {slides.map((s, k) => (
              <img key={s.src} src={s.src} alt={k === i ? `${s.name} water purifier` : ''} aria-hidden={k !== i}
                width={720} height={900} fetchPriority={k === 0 ? 'high' : 'low'} loading={k === 0 ? 'eager' : 'lazy'} decoding="async"
                className={`absolute inset-0 h-full w-full object-contain pb-24 transition-[opacity,transform] duration-[1200ms] ease-out ${k === i ? 'scale-100 opacity-100' : 'scale-[1.04] opacity-0'}`} />
            ))}
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/95 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5" aria-live="polite">
              <p key={i} className="animate-[gwUp_.6s_ease] font-display text-[22px] leading-tight text-navy-900 sm:text-[24px]">{slides[i].name}</p>
              <p className="mt-1 text-[13px] font-medium text-aqua-700">{slides[i].tag}</p>
              <div className="mt-4 flex gap-1.5">
                {slides.map((s, k) => (
                  <button key={s.src} onClick={() => setI(k)} aria-label={`Show ${s.name}`}
                    className={`h-1.5 rounded-full transition-all duration-500 ${k === i ? 'w-8 bg-aqua-500' : 'w-3 bg-navy-900/20 hover:bg-navy-900/40'}`} />
                ))}
              </div>
            </div>
          </div>

          {/* floating chips */}
          <div className="animate-float-slow absolute -left-3 top-8 flex items-center gap-2 rounded-2xl border border-white/20 bg-navy-800 px-3 py-2.5 text-[12.5px] font-semibold text-white shadow-lift sm:-left-10 sm:px-4 sm:text-[13.5px]">
            <Wrench className="h-4 w-4 text-aqua-400" aria-hidden />Free installation
          </div>
          <div className="animate-float-slow absolute -right-3 top-1/2 flex items-center gap-2 rounded-2xl bg-white px-3 py-2.5 text-[12.5px] font-semibold text-navy-900 shadow-lift [animation-delay:-2s] sm:-right-10 sm:px-4 sm:text-[13.5px]">
            <ShieldCheck className="h-4 w-4 text-aqua-600" aria-hidden />RO spares
          </div>
        </div>
      </div>

      {/* brand ticker */}
      <div className="relative border-y border-white/10 bg-white/[.04] py-3.5">
        <div className="marquee flex w-max gap-10 whitespace-nowrap text-[13px] font-semibold uppercase tracking-[0.2em] text-white/55">
          {[0, 1].map((r) => (
            <div key={r} className="flex gap-10" aria-hidden={r === 1}>
              {['KENT', 'A. O. Smith', 'Aqua', 'Aquaguard', 'Purella', 'Water Softeners', 'RO Plants', 'Filters & Membranes', 'AMC Service'].map((t) => (
                <span key={t} className="flex items-center gap-10">{t}<span className="text-aqua-400">✦</span></span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* animated waves */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-[52px] h-20 overflow-hidden sm:h-24">
        <svg className="wave wave-1 absolute bottom-0 h-full w-[200%]" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0 60 C 240 20 480 100 720 60 S 1200 20 1440 60 V100 H0Z" fill="rgba(20,175,203,.12)" />
        </svg>
        <svg className="wave wave-2 absolute bottom-0 h-full w-[200%]" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0 70 C 240 40 480 100 720 70 S 1200 40 1440 70 V100 H0Z" fill="rgba(255,255,255,.06)" />
        </svg>
      </div>
    </section>
  );
}
