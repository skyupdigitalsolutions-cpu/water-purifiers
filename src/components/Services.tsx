import SectionHeading from './SectionHeading';
import { services } from '../data/services';
import { waLink } from '../lib/whatsapp';
import { site } from '../config/site';
import { ArrowRight } from 'lucide-react';

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="lazy-section py-10 sm:py-14">
      <div className="container-site">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="services-title" eyebrow="Our services" title="Care for your purifier, from day one."
            intro="Free installation, servicing, replacements and repairs — for the purifier you buy from us and the one you already own." />
          <a href={waLink(`Hello ${site.name}, I would like to book a water purifier service.`)} target="_blank" rel="noopener noreferrer" className="reveal btn-primary self-start lg:self-auto">
            Book a service<ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ title, description, icon: Icon, points }, i) => (
            <article key={title} className={`reveal reveal-d${(i % 3) + 1} card group flex flex-col p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lift`}>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 text-navy-900 transition-colors duration-300 group-hover:bg-navy-900 group-hover:text-aqua-400">
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="mt-6 text-[21px] leading-snug">{title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-ink-500">{description}</p>
              <ul className="mt-5 space-y-2 border-t border-navy-900/[.07] pt-5">
                {points.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-[14px] text-navy-800"><span className="h-1.5 w-1.5 rounded-full bg-aqua-500" />{p}</li>
                ))}
              </ul>
              <a href={waLink(`Hello ${site.name}, I need help with: ${title}.`)} target="_blank" rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-aqua-700 hover:text-navy-900" aria-label={`Enquire about ${title} on WhatsApp`}>
                Enquire<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
