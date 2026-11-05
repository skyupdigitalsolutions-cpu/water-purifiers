import { useEffect, useState } from 'react';
import { ChevronUp, Phone } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { site } from '../config/site';
import { waGeneral, telLink } from '../lib/whatsapp';

/** Mobile: fixed bottom action bar. Desktop: a single floating WhatsApp button. */
export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <>
      <button type="button" onClick={toTop} aria-label="Scroll to top" tabIndex={showTop ? 0 : -1}
        className={`fixed bottom-[88px] right-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-navy-900/15 bg-white text-navy-900 shadow-lift transition duration-300 hover:bg-sky-100 md:bottom-24 md:right-6 md:h-14 md:w-14 ${showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}>
        <ChevronUp className="h-6 w-6" aria-hidden />
      </button>
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-navy-900/10 bg-white/95 p-2.5 md:hidden" style={{ paddingBottom: 'max(10px, env(safe-area-inset-bottom))' }}>
        <a href={telLink(site.phones[0].e164)} className="btn-primary !min-h-[48px]"><Phone className="h-4 w-4" />Call Now</a>
        <a href={waGeneral()} target="_blank" rel="noopener noreferrer" className="btn-wa !min-h-[48px]"><WhatsAppIcon />WhatsApp</a>
      </div>
      <a href={waGeneral()} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp"
        className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-xl bg-[#1FA855] text-white shadow-lift transition hover:scale-105 md:inline-flex">
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </>
  );
}
