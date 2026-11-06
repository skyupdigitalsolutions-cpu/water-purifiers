import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Navigation } from 'lucide-react';
import Logo from './Logo';
import WhatsAppIcon from './WhatsAppIcon';
import { nav, site } from '../config/site';
import { services } from '../data/services';
import { waGeneral, telLink } from '../lib/whatsapp';

const brandLinks = [
  { label: 'KENT', href: '/#kent' },
  { label: 'A. O. Smith', href: '/#ao-smith' },
  { label: 'Aqua & Aquaguard', href: '/#aqua-range' },
];

export default function Footer() {
  return (
    <footer className="bg-navy-950 pb-28 pt-16 text-white/70 md:pb-10">
      <div className="container-site">
        <div className="grid gap-12 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_.8fr_.9fr_1.1fr_1.3fr]">
          <div>
            <Logo light />
            <p className="mt-5 max-w-xs text-[14.5px] leading-relaxed">
              Water purifier sales, service and RO components in Bengaluru — {site.stats.years} years of experience and {site.stats.customers} satisfied customers.
            </p>
            <div className="mt-6 flex gap-2.5">
              <a href={waGeneral()} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#1FA855] text-white" aria-label="WhatsApp"><WhatsAppIcon /></a>
              <a href={site.mapsSearchUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10" aria-label="Open in Google Maps"><MapPin className="h-5 w-5" /></a>
            </div>
          </div>
          <FooterCol title="Navigation">
            {nav.map((n) => <li key={n.href}><a href={`/${n.href}`} className="hover:text-white">{n.label}</a></li>)}
          </FooterCol>
          <FooterCol title="Brands">
            {brandLinks.map((b) => <li key={b.href}><a href={b.href} className="hover:text-white">{b.label}</a></li>)}
          </FooterCol>
          <FooterCol title="Services">
            {services.map((s) => <li key={s.title}><a href="/#services" className="hover:text-white">{s.title}</a></li>)}
          </FooterCol>
          <div>
            <h2 className="font-sans text-[13px] font-semibold uppercase tracking-[0.16em] !text-white">Contact</h2>
            <address className="mt-5 space-y-4 text-[14.5px] not-italic leading-relaxed">
              <p className="flex gap-2.5"><MapPin className="mt-1 h-4 w-4 shrink-0 text-aqua-400" aria-hidden />{site.address.full}</p>
              {site.phones.map((p) => (
                <a key={p.e164} href={telLink(p.e164)} className="flex items-center gap-2.5 hover:text-white"><Phone className="h-4 w-4 text-aqua-400" aria-hidden />{p.display}</a>
              ))}
              <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 hover:text-white"><Mail className="h-4 w-4 shrink-0 text-aqua-400" aria-hidden /><span className="min-w-0">{site.email.replace('@', '@\u200b')}</span></a>
              <a href={waGeneral()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-white"><WhatsAppIcon className="h-4 w-4 text-aqua-400" />WhatsApp us</a>
              <a href={site.directionsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-white"><Navigation className="h-4 w-4 text-aqua-400" aria-hidden />Google Maps directions</a>
            </address>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-7 text-[13px] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}, Bengaluru. All rights reserved.</p>
          <p className="flex gap-5"><Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link><span className="text-white/40">Brand names are trademarks of their respective owners.</span></p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="font-sans text-[13px] font-semibold uppercase tracking-[0.16em] !text-white">{title}</h2>
      <ul className="mt-5 space-y-3 text-[14.5px]">{children}</ul>
    </div>
  );
}
