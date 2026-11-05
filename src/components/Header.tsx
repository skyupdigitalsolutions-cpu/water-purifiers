import { useEffect, useState } from 'react';
import { Menu, X, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';
import WhatsAppIcon from './WhatsAppIcon';
import { nav, site } from '../config/site';
import { waGeneral, telLink } from '../lib/whatsapp';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive('#' + e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      {/* Utility strip (desktop) */}
      <div className="hidden bg-navy-950 text-[13px] text-white/75 md:block">
        <div className="container-site flex h-9 items-center justify-between">
          <span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-aqua-400" aria-hidden />80 Feet Road, Kengunte, Mallathahalli, Bengaluru 560056</span>
          <span className="flex items-center gap-5">
            {site.phones.map((p) => (
              <a key={p.e164} href={telLink(p.e164)} className="flex items-center gap-1.5 hover:text-white">
                <Phone className="h-3.5 w-3.5 text-aqua-400" aria-hidden />{p.display}
              </a>
            ))}
          </span>
        </div>
      </div>

      <div className={`border-b transition-colors duration-300 ${scrolled ? 'border-white/10 bg-navy-950/95' : 'border-white/10 bg-navy-950'}`}>
        <div className="container-site flex h-[72px] items-center justify-between gap-4">
          <a href="/#home" aria-label={`${site.name} — home`}><Logo light /></a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={`/${n.href}`}
                    aria-current={active === n.href ? 'true' : undefined}
                    className={`relative rounded-full px-3.5 py-2 text-[14.5px] font-medium transition-colors ${active === n.href ? 'text-white' : 'text-white/70 hover:text-white'}`}
                  >
                    {n.label}
                    <span className={`absolute inset-x-3.5 -bottom-0.5 h-[2px] origin-left rounded bg-aqua-500 transition-transform duration-300 ${active === n.href ? 'scale-x-100' : 'scale-x-0'}`} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a href={telLink(site.phones[0].e164)} className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition hover:bg-white/10 sm:inline-flex" aria-label={`Call ${site.phones[0].display}`}>
              <Phone className="h-[18px] w-[18px]" />
            </a>
            <a href={waGeneral()} target="_blank" rel="noopener noreferrer" className="btn-wa !min-h-[44px] !px-4 sm:!px-5">
              <WhatsAppIcon /><span className="hidden sm:inline">WhatsApp</span><span className="sm:hidden">Chat</span>
            </a>
            <button onClick={() => setOpen(true)} className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white hover:bg-white/10 lg:hidden" aria-label="Open menu" aria-expanded={open} aria-controls="mobile-menu">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-[60] lg:hidden ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
        <div className={`absolute inset-0 bg-navy-950/40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`} onClick={() => setOpen(false)} />
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu"
          className={`absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-white shadow-lift transition-transform duration-300 ease-out ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex h-[72px] items-center justify-between border-b border-white/10 bg-navy-950 px-5">
            <Logo light />
            <button onClick={() => setOpen(false)} className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10" aria-label="Close menu"><X className="h-6 w-6 text-white" /></button>
          </div>
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
            {nav.map((n) => (
              <a key={n.href} href={`/${n.href}`} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}
                className="flex items-center justify-between rounded-xl px-4 py-3.5 font-display text-[20px] text-navy-900 hover:bg-sky-50">
                {n.label}<span className="text-aqua-500">→</span>
              </a>
            ))}
          </nav>
          <div className="space-y-2.5 border-t border-navy-900/10 p-5">
            {site.phones.map((p) => (
              <a key={p.e164} href={telLink(p.e164)} tabIndex={open ? 0 : -1} className="btn-ghost w-full"><Phone className="h-4 w-4" />Call {p.display}</a>
            ))}
            <a href={waGeneral()} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1} className="btn-wa w-full"><WhatsAppIcon />WhatsApp Us</a>
          </div>
        </div>
      </div>
    </header>
  );
}
