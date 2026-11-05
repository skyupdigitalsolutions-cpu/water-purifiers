import { Award, Users, Droplets, Wrench } from 'lucide-react';
import { site } from '../config/site';

// Business-provided claims only.
const items = [
  { icon: Award, title: `${site.stats.years} Years`, text: 'of experience' },
  { icon: Users, title: `${site.stats.customers}`, text: 'satisfied customers' },
  { icon: Droplets, title: 'Purification', text: 'solutions for home & business' },
  { icon: Wrench, title: 'Free installation', text: 'and service support' },
];

export default function Highlights() {
  return (
    <section aria-label="Business highlights" className="border-y border-navy-900/[.07] bg-white">
      <div className="container-site grid grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, text }, i) => (
          <div key={title} className={`reveal flex items-center gap-4 py-7 sm:py-9 ${i % 2 ? 'pl-4 sm:pl-8' : 'pr-4'} ${i > 0 ? 'lg:border-l lg:border-navy-900/[.07] lg:pl-8' : ''} ${i > 1 ? 'border-t border-navy-900/[.07] lg:border-t-0' : ''}`}>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sky-100 text-aqua-700"><Icon className="h-[22px] w-[22px]" aria-hidden /></span>
            <span>
              <span className="block font-display text-[22px] leading-tight text-navy-900 sm:text-[26px]">{title}</span>
              <span className="block text-[13.5px] text-ink-500">{text}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
