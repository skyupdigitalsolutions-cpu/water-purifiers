import { useEffect, useRef, useState, type FormEvent } from 'react';
import { X, Send, ExternalLink, MessageSquareText } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import GoogleG from './GoogleG';
import Stars from './Stars';
import { site } from '../config/site';
import { waLink } from '../lib/whatsapp';
import { saveToSheet } from '../lib/sheet';

/** Scroll depth (0–1) at which the enquiry popup and Google reviews badge appear. */
const TRIGGER_AT = 0.25;
const ENQUIRY_KEY = 'gw_enquiry_popup_seen';
const BADGE_KEY = 'gw_reviews_badge_closed';

const needs = ['New water purifier', 'Water softener', 'RO service / repair', 'Filter / spare parts', 'AMC plan', 'Other'];

const store = {
  get: (k: string) => { try { return sessionStorage.getItem(k); } catch { return null; } },
  set: (k: string) => { try { sessionStorage.setItem(k, '1'); } catch { /* ignore */ } },
};

function useScrolledPast(fraction: number) {
  const [past, setPast] = useState(false);
  useEffect(() => {
    if (past) return;
    let raf = 0;
    let max = 0;
    const measure = () => { max = document.documentElement.scrollHeight - window.innerHeight; };
    const check = () => {
      raf = 0;
      if (max > 0 && window.scrollY / max >= fraction) setPast(true);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check); };
    const onResize = () => { measure(); onScroll(); };
    measure();
    const remeasure = window.setInterval(measure, 2000);   // page height changes as lazy sections render
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.clearInterval(remeasure);
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize);
    };
  }, [fraction, past]);
  return past;
}

type Summary = { rating: number; count: number; url: string };

function useGoogleSummary(enabled: boolean): Summary {
  const [s, setS] = useState<Summary>({ rating: site.googleSnapshot.rating, count: site.googleSnapshot.reviewCount, url: site.mapsSearchUrl });
  useEffect(() => {
    if (!enabled) return;
    const ctrl = new AbortController();
    fetch('/api/reviews', { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.configured) setS({ rating: d.rating ?? site.googleSnapshot.rating, count: d.userRatingCount ?? site.googleSnapshot.reviewCount, url: d.googleMapsUri ?? site.mapsSearchUrl });
      })
      .catch(() => { /* keep snapshot */ });
    return () => ctrl.abort();
  }, [enabled]);
  return s;
}

/* ---------------- Enquiry popup ---------------- */

function EnquiryModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [need, setNeed] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string; need?: string }>({});
  const firstField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstField.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    const e: typeof errors = {};
    if (name.trim().length < 2) e.name = 'Please enter your name.';
    const digits = phone.replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '');
    if (!/^[6-9]\d{9}$/.test(digits)) e.phone = 'Enter a valid 10-digit mobile number.';
    if (!need) e.need = 'Please choose what you need.';
    setErrors(e);
    if (Object.keys(e).length) return;
    saveToSheet({ source: 'Popup', name: name.trim(), phone: phone.trim(), brand: '', service: need, message: '' });
    const url = waLink([`Hello ${site.name}, I have an enquiry.`, '', `Name: ${name.trim()}`, `Phone: ${phone.trim()}`, `Requirement: ${need}`].join('\n'));
    const w = window.open(url, '_blank', 'noopener,noreferrer');
    if (!w) window.location.href = url;
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-navy-950/60 p-0 backdrop-blur-sm animate-[gwFade_.25s_ease] sm:items-center sm:p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-labelledby="enq-title"
        className="relative w-full max-w-md rounded-t-3xl bg-white p-6 shadow-lift animate-[gwUp_.3s_ease] sm:rounded-3xl sm:p-8">
        <button onClick={onClose} aria-label="Close enquiry form"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-ink-500 transition hover:bg-sky-100 hover:text-navy-900">
          <X className="h-5 w-5" />
        </button>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-aqua-100 px-3 py-1 text-[12px] font-semibold uppercase tracking-wide text-aqua-700">
          <MessageSquareText className="h-3.5 w-3.5" />Quick enquiry
        </span>
        <h2 id="enq-title" className="mt-3 text-[26px] leading-tight">Need a purifier or service?</h2>
        <p className="mt-1.5 text-[14.5px] text-ink-500">Share your details — we'll reply on WhatsApp with the right option.</p>

        <form onSubmit={submit} noValidate className="mt-6 space-y-4">
          <div>
            <label htmlFor="pq-name" className="mb-1.5 block text-[14px] font-semibold text-navy-900">Name *</label>
            <input ref={firstField} id="pq-name" className="field" autoComplete="name" value={name} placeholder="Your name"
              onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} />
            {errors.name && <p className="mt-1 text-[13px] text-red-600">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="pq-phone" className="mb-1.5 block text-[14px] font-semibold text-navy-900">Phone number *</label>
            <input id="pq-phone" className="field" type="tel" inputMode="tel" autoComplete="tel" value={phone} placeholder="10-digit mobile"
              onChange={(e) => setPhone(e.target.value)} aria-invalid={!!errors.phone} />
            {errors.phone && <p className="mt-1 text-[13px] text-red-600">{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor="pq-need" className="mb-1.5 block text-[14px] font-semibold text-navy-900">What do you need? *</label>
            <select id="pq-need" className="field" value={need} onChange={(e) => setNeed(e.target.value)} aria-invalid={!!errors.need}>
              <option value="">Select an option</option>
              {needs.map((n) => <option key={n}>{n}</option>)}
            </select>
            {errors.need && <p className="mt-1 text-[13px] text-red-600">{errors.need}</p>}
          </div>
          <button type="submit" className="btn-wa w-full !min-h-[50px] !text-[16px]"><WhatsAppIcon />Send Enquiry<Send className="h-4 w-4" /></button>
          <p className="text-center text-[12px] text-ink-500">Opens WhatsApp with your message ready. We don't store your details.</p>
        </form>
      </div>
    </div>
  );
}

/* ---------------- Google reviews badge ---------------- */

function ReviewsBadge({ summary, onClose }: { summary: Summary; onClose: () => void }) {
  return (
    <div className="fixed bottom-[88px] left-3 z-40 animate-[gwUp_.35s_ease] md:bottom-6 md:left-6">
      <div className="relative flex items-center gap-3 rounded-2xl border border-navy-900/10 bg-white py-3 pl-3.5 pr-9 shadow-lift">
        <GoogleG className="h-8 w-8 shrink-0" />
        <a href="#reviews" className="block leading-tight">
          <span className="flex items-center gap-1.5">
            <strong className="text-[17px] text-navy-900">{summary.rating.toFixed(1)}</strong>
            <Stars value={summary.rating} size={14} />
          </span>
          <span className="mt-0.5 block text-[12.5px] text-ink-500">
            {summary.count.toLocaleString('en-IN')} Google reviews
          </span>
        </a>
        <a href={summary.url} target="_blank" rel="noopener noreferrer" aria-label="Open Google reviews"
          className="ml-1 hidden items-center gap-1 rounded-lg bg-sky-100 px-2.5 py-1.5 text-[12.5px] font-semibold text-navy-900 hover:bg-sky-200 sm:inline-flex">
          Read<ExternalLink className="h-3.5 w-3.5" />
        </a>
        <button onClick={onClose} aria-label="Hide Google reviews badge"
          className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full text-ink-300 hover:bg-sky-100 hover:text-navy-900">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

/** Shows an enquiry popup (once per visit) and a Google reviews badge after the visitor scrolls 25% of the page. */
export default function ScrollPopups() {
  const past = useScrolledPast(TRIGGER_AT);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [badgeOpen, setBadgeOpen] = useState(false);
  const summary = useGoogleSummary(past);

  useEffect(() => {
    if (!past) return;
    if (!store.get(BADGE_KEY)) setBadgeOpen(true);
    if (!store.get(ENQUIRY_KEY)) {
      const t = setTimeout(() => { setEnquiryOpen(true); store.set(ENQUIRY_KEY); }, 400);
      return () => clearTimeout(t);
    }
  }, [past]);

  return (
    <>
      {badgeOpen && <ReviewsBadge summary={summary} onClose={() => { setBadgeOpen(false); store.set(BADGE_KEY); }} />}
      {enquiryOpen && <EnquiryModal onClose={() => setEnquiryOpen(false)} />}
    </>
  );
}
