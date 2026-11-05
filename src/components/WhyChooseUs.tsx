import { Award, Users, Layers, MessageCircle, Wrench, HeartHandshake, MapPin } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { site } from '../config/site';

const reasons = [
  { icon: Award, title: `${site.stats.years} years of experience`, text: 'Two decades in water purifier sales and service.' },
  { icon: Users, title: `${site.stats.customers} satisfied customers`, text: 'A customer base built through steady, reliable work.' },
  { icon: Layers, title: 'Multiple brand options', text: 'KENT, A. O. Smith, Aqua, Aquaguard and more, to compare side by side.' },
  { icon: MessageCircle, title: 'Personalised guidance', text: 'Recommendations based on your water source and needs.' },
  { icon: Wrench, title: 'Free installation & maintenance', text: 'Support that continues well after the purchase.' },
  { icon: HeartHandshake, title: 'Customer-focused service', text: 'Clear communication and practical advice.' },
  { icon: MapPin, title: 'Bengaluru-based', text: 'Located on 80 Feet Road, Kengunte, Mallathahalli.' },
];

export default function WhyChooseUs() {
  return (
    <section aria-labelledby="why-title" className="lazy-section relative overflow-hidden bg-navy-900 py-10 text-white sm:py-14">
      <svg className="pointer-events-none absolute -bottom-48 -left-40 h-[600px] w-[600px] text-aqua-400/10" viewBox="0 0 400 400" aria-hidden="true">
        {[70, 110, 150, 190].map((r) => <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="currentColor" strokeWidth="1.2" />)}
      </svg>
      <div className="container-site relative grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading light id="why-title" eyebrow="Why choose us" title={<>Experience you can <em className="font-normal italic text-aqua-400">rely on.</em></>}
            intro="Choosing a purifier is a long-term decision. We make it simpler — and we're nearby when your purifier needs attention." />
        </div>
        <ul className="grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2">
          {reasons.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className={`reveal flex gap-4 bg-navy-900 p-6 sm:p-7 ${i === reasons.length - 1 ? 'sm:col-span-2' : ''}`}>
              <Icon className="mt-1 h-6 w-6 shrink-0 text-aqua-400" aria-hidden />
              <div><h3 className="font-sans text-[16.5px] font-semibold !text-white">{title}</h3><p className="mt-1.5 text-[14.5px] leading-relaxed text-white/65">{text}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
