import { Check } from 'lucide-react';
import { site } from '../config/site';

const points = [
  'Water purifier sales for homes and businesses',
  'RO components and spare parts',
  'Free professional installation',
  'Maintenance, filter replacement and repair',
];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="lazy-section py-10 sm:py-14">
      <div className="container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="reveal order-2 grid grid-cols-2 gap-4 lg:order-1">
          <div className="flex flex-col gap-4">
            <figure className="img-zoom aspect-[3/4] overflow-hidden rounded-3xl bg-white shadow-lift">
              <img src="/images/products/aqua-puross-pink.webp" alt="Aqua Puross Pura water purifier" width={880} height={968} loading="lazy" decoding="async" className="h-full w-full object-contain" />
            </figure>
            <div className="flex aspect-square flex-col justify-end rounded-3xl bg-gradient-to-br from-navy-900 to-aqua-700 p-5 text-white sm:p-6">
              <span className="font-display text-[38px] leading-none sm:text-[44px]">{site.stats.years}</span>
              <span className="mt-2 text-[12.5px] leading-snug text-white/80 sm:text-[14px]">years helping Bengaluru families choose and care for their purifiers</span>
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-4">
            <figure className="img-zoom aspect-square overflow-hidden rounded-3xl bg-white shadow-card">
              <img src="/images/products/kent-sterling-star-blue.webp" alt="KENT Sterling Star water purifier" width={880} height={968} loading="lazy" decoding="async" className="h-full w-full object-contain" />
            </figure>
            <figure className="img-zoom aspect-[3/4] overflow-hidden rounded-3xl bg-white shadow-card">
              <img src="/images/products/kent-pearl-star.webp" alt="KENT Pearl Star water purifier" width={880} height={968} loading="lazy" decoding="async" className="h-full w-full object-contain" />
            </figure>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="reveal">
            <p className="eyebrow">About us</p>
            <h2 id="about-title" className="mt-4 text-[30px] leading-[1.12] sm:text-[40px]">
              Good Water for Good Life – Your Trusted Water Purifier Partner
            </h2>
          </div>
          <div className="reveal reveal-d1 mt-6 space-y-4 text-[16.5px] leading-relaxed text-ink-500">
            <p>
              For more than two decades, {site.name} has helped households and businesses across Bengaluru get safe,
              great-tasting drinking water. From our base on 80 Feet Road in Mallathahalli, we combine water purifier sales,
              RO components and hands-on service under one roof.
            </p>
            <p>
              Every home's water is different, so we start by understanding your source and your needs, then recommend a purifier
              that fits — across multiple brand options. After the sale, we stay with you: free installation, routine maintenance,
              filter and membrane replacement, and repairs when you need them.
            </p>
            <p>With {site.stats.customers} satisfied customers, our reputation has been built one installation and one service call at a time.</p>
          </div>
          <ul className="reveal reveal-d2 mt-8 grid gap-3 sm:grid-cols-2">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[15px] font-medium text-navy-900">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-aqua-100 text-aqua-700"><Check className="h-3.5 w-3.5" strokeWidth={3} /></span>{p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
