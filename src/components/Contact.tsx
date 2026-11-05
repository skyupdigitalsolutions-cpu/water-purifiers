import { useState, type FormEvent } from 'react';
import { MapPin, Phone, Navigation, Send, CheckCircle2 } from 'lucide-react';
import SectionHeading from './SectionHeading';
import WhatsAppIcon from './WhatsAppIcon';
import { site } from '../config/site';
import { waGeneral, waLink, telLink } from '../lib/whatsapp';
import { saveToSheet } from '../lib/sheet';
import { services } from '../data/services';

const brands = ['KENT', 'A. O. Smith', 'Aqua', 'Aquaguard', 'Not sure — need guidance'];
const serviceOptions = ['New water purifier', ...services.map((s) => s.title), 'Other'];

type Form = { name: string; phone: string; brand: string; service: string; message: string };
type Errors = Partial<Record<keyof Form, string>>;

function validate(f: Form): Errors {
  const e: Errors = {};
  const name = f.name.trim();
  if (name.length < 2) e.name = 'Please enter your name.';
  else if (name.length > 60) e.name = 'Name is too long.';
  const digits = f.phone.replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '');
  if (!/^[6-9]\d{9}$/.test(digits)) e.phone = 'Enter a valid 10-digit Indian mobile number.';
  if (!f.brand) e.brand = 'Please choose a brand (or “Not sure”).';
  if (!f.service) e.service = 'Please choose what you need.';
  if (f.message.length > 500) e.message = 'Please keep the message under 500 characters.';
  return e;
}

export default function Contact() {
  const [form, setForm] = useState<Form>({ name: '', phone: '', brand: '', service: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof Form) => (ev: { target: { value: string } }) => {
    setForm((f) => ({ ...f, [k]: ev.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length) {
      document.getElementById(`f-${Object.keys(e)[0]}`)?.focus();
      return;
    }
    const msg = [
      `Hello ${site.name}, I have an enquiry.`,
      ``,
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      `Interested brand: ${form.brand}`,
      `Service required: ${form.service}`,
      form.message.trim() ? `Message: ${form.message.trim()}` : '',
    ].filter(Boolean).join('\n');
    saveToSheet({ source: 'Contact form', name: form.name.trim(), phone: form.phone.trim(), brand: form.brand, service: form.service, message: form.message.trim() });
    const url = waLink(msg);
    const w = window.open(url, '_blank', 'noopener,noreferrer');
    if (!w) window.location.href = url;
    setSent(true);
  };

  const err = (k: keyof Form) => errors[k] && <p id={`e-${k}`} className="mt-1.5 text-[13px] text-red-600">{errors[k]}</p>;
  const aria = (k: keyof Form) => ({ id: `f-${k}`, 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `e-${k}` : undefined });

  return (
    <section id="contact" aria-labelledby="contact-title" className="lazy-section py-10 sm:py-14">
      <div className="container-site">
        <SectionHeading id="contact-title" eyebrow="Contact us" title="Visit us, call us, or message us."
          intro="Call or WhatsApp for product guidance, a service visit, or spare parts. You're welcome to visit us in Mallathahalli." />

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
          <div className="space-y-5">
            <div className="reveal card p-6 sm:p-7">
              <h3 className="text-[22px]">{site.name}</h3>
              <address className="mt-4 flex gap-3 not-italic text-[15px] leading-relaxed text-ink-700">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-aqua-700" aria-hidden />
                <span>{site.address.line1},<br />{site.address.line2},<br />{site.address.line3},<br />{site.address.city}</span>
              </address>
              <div className="mt-5 flex gap-3 text-[15px]">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-aqua-700" aria-hidden />
                <span className="flex flex-wrap gap-x-4 gap-y-1">
                  {site.phones.map((p) => <a key={p.e164} href={telLink(p.e164)} className="font-semibold text-navy-900 hover:text-aqua-700">{p.display}</a>)}
                </span>
              </div>
              <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {site.phones.map((p) => (
                  <a key={p.e164} href={telLink(p.e164)} className="btn-primary !min-h-[44px] !text-[14px]"><Phone className="h-4 w-4" />Call {p.display}</a>
                ))}
                <a href={waGeneral()} target="_blank" rel="noopener noreferrer" className="btn-wa !min-h-[44px] !text-[14px]"><WhatsAppIcon className="h-4 w-4" />WhatsApp Enquiry</a>
                <a href={site.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost !min-h-[44px] !text-[14px]"><Navigation className="h-4 w-4" />Get Directions</a>
              </div>
            </div>
            <div className="reveal overflow-hidden rounded-2xl border border-navy-900/[.07] shadow-card">
              <iframe title={`Map showing ${site.name}, Mallathahalli, Bengaluru`} src={site.mapEmbedUrl} loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" className="block h-[300px] w-full border-0 sm:h-[340px]" allowFullScreen />
            </div>
          </div>

          <div className="reveal reveal-d1 card p-6 sm:p-9">
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center py-12 text-center" role="status">
                <CheckCircle2 className="h-14 w-14 text-[#1FA855]" aria-hidden />
                <h3 className="mt-5 text-[26px]">Your WhatsApp enquiry is ready</h3>
                <p className="mt-3 max-w-sm text-ink-500">WhatsApp has opened with your details filled in — just tap <strong>Send</strong>. If it didn't open, call us on {site.phones[0].display}.</p>
                <button onClick={() => setSent(false)} className="btn-ghost mt-7">Send another enquiry</button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate aria-label="Enquiry form">
                <h3 className="text-[24px]">Send an enquiry</h3>
                <p className="mt-1.5 text-[14.5px] text-ink-500">Fill this in and we'll open WhatsApp with your message ready to send.</p>
                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="f-name" className="mb-1.5 block text-[14px] font-semibold text-navy-900">Name *</label>
                    <input {...aria('name')} className="field" autoComplete="name" value={form.name} onChange={set('name')} placeholder="Your name" />
                    {err('name')}
                  </div>
                  <div>
                    <label htmlFor="f-phone" className="mb-1.5 block text-[14px] font-semibold text-navy-900">Phone number *</label>
                    <input {...aria('phone')} className="field" type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} placeholder="10-digit mobile" />
                    {err('phone')}
                  </div>
                  <div>
                    <label htmlFor="f-brand" className="mb-1.5 block text-[14px] font-semibold text-navy-900">Interested brand *</label>
                    <select {...aria('brand')} className="field" value={form.brand} onChange={set('brand')}>
                      <option value="">Select a brand</option>
                      {brands.map((b) => <option key={b}>{b}</option>)}
                    </select>
                    {err('brand')}
                  </div>
                  <div>
                    <label htmlFor="f-service" className="mb-1.5 block text-[14px] font-semibold text-navy-900">Service required *</label>
                    <select {...aria('service')} className="field" value={form.service} onChange={set('service')}>
                      <option value="">Select a service</option>
                      {serviceOptions.map((s) => <option key={s}>{s}</option>)}
                    </select>
                    {err('service')}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="f-message" className="mb-1.5 block text-[14px] font-semibold text-navy-900">Message <span className="font-normal text-ink-500">(optional)</span></label>
                    <textarea {...aria('message')} className="field min-h-[120px] resize-y" maxLength={600} value={form.message} onChange={set('message')} placeholder="Water source, area, model you own, or any question…" />
                    {err('message')}
                  </div>
                </div>
                <button type="submit" className="btn-wa mt-7 w-full !min-h-[52px] !text-[16px]"><WhatsAppIcon />Send via WhatsApp<Send className="h-4 w-4" /></button>
                <p className="mt-3 text-center text-[12.5px] text-ink-500">Your details go straight to our WhatsApp — this website does not store them.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
