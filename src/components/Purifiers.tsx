import { useState } from 'react';
import { Info, Droplets, Zap, Sparkles, Gauge } from 'lucide-react';
import SectionHeading from './SectionHeading';
import BrandSection from './BrandSection';
import ProductCard from './ProductCard';
import {
  kentCategories, kentModels, aoSmithCategories, aoSmithModels, aquaRange, aquaCategories,
  aquaguardModels,
} from '../data/products';

const jump = [
  { href: '#kent', label: 'KENT' },
  { href: '#ao-smith', label: 'A. O. Smith' },
  { href: '#aqua-range', label: 'Aqua & Aquaguard' },
];

export default function Purifiers() {
  const [group, setGroup] = useState<string | null>(null);
  const allAqua = [...aquaRange, ...aquaguardModels];
  const filtered = group ? allAqua.filter((p) => p.group === group) : allAqua;
  const visible = filtered;
  const count = (k: string) => allAqua.filter((p) => p.group === k).length;

  return (
    <div id="purifiers" className="scroll-mt-24">
      <section aria-labelledby="purifiers-title" className="bg-navy-900 pb-10 pt-16 text-white sm:pt-20">
        <div className="container-site">
          <SectionHeading light id="purifiers-title" eyebrow="Water purifiers"
            title={<>Choose from trusted brands, <em className="font-normal italic text-aqua-400">guided by experience.</em></>}
            intro="Not sure which technology suits your water? Tell us your water source and family size — we'll help you compare options before you decide." />
          <nav aria-label="Brands" className="no-scrollbar reveal -mx-4 mt-10 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            {jump.map((j) => (
              <a key={j.href} href={j.href} className="shrink-0 rounded-full border border-white/20 px-5 py-2.5 text-[14px] font-semibold text-white transition hover:border-aqua-400 hover:bg-white/5">
                {j.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <BrandSection
        id="kent" index="01" brand="KENT"
        wordmark={<span className="font-sans font-bold tracking-[0.06em]">KENT</span>}
        intro="KENT purifiers across RO, RO + UV, RO + UF, UV / UF and copper & alkaline options. Below are models from our current KENT list — ask us about other models in each category."
        categories={kentCategories} models={kentModels}
        modelsNote="Model names and purification stages are taken from our current product list. *4 years free service is as marked on the product photo — terms apply. Final specifications are confirmed at the time of enquiry."
      />
      <BrandSection
        id="ao-smith" index="02" brand="A. O. Smith" tone="sky"
        wordmark={<span className="font-sans font-bold tracking-[0.02em]">A. O. Smith</span>}
        intro="A. O. Smith ProPlanet and touch-panel purifiers, including hot and normal water models. Model names are taken from the product photos — final specifications are confirmed when you enquire."
        categories={aoSmithCategories} models={aoSmithModels} perRow={4}
      />
      <section id="aqua-range" aria-labelledby="aqua-range-title" className="bg-white py-10 sm:py-12">
        <div className="container-site">
          <div className="reveal grid gap-6 border-b border-navy-900/10 pb-8 lg:grid-cols-[1fr_1.1fr] lg:items-end">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-ink-300">Brand 03</p>
              <h3 id="aqua-range-title" className="mt-3 text-[34px] leading-none sm:text-[44px]">Aqua &amp; Aquaguard</h3>
            </div>
            <p className="text-[15.5px] leading-relaxed text-ink-500 lg:pb-1">
              Aqua storage, under-the-counter and hot &amp; normal purifiers, together with Aquaguard hot &amp; ambient, UV + Mineral and
              filter-cartridge models — {allAqua.length} models in one place. Model names are taken from the product photos.
            </p>
          </div>

          <ul className="reveal mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4" aria-label="Common features">
            {[
              { Icon: Droplets, t: 'RO + UV', d: 'Across the Aqua range' },
              { Icon: Sparkles, t: 'Active copper', d: 'Copper stage in Aqua models' },
              { Icon: Zap, t: 'Alkaline / Zinc', d: 'Mineral stage by model' },
              { Icon: Gauge, t: 'TDS control', d: 'Aqua models' },
            ].map(({ Icon, t, d }) => (
              <li key={t} className="flex items-center gap-3 rounded-2xl border border-navy-900/[.07] bg-white p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sky-100 text-aqua-700"><Icon className="h-5 w-5" aria-hidden /></span>
                <span><span className="block text-[14px] font-semibold text-navy-900">{t}</span><span className="block text-[12.5px] text-ink-500">{d}</span></span>
              </li>
            ))}
          </ul>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5" role="group" aria-label="Aqua and Aquaguard categories">
            {aquaCategories.map((c, i) => {
              const active = group === c.key;
              return (
                <button key={c.key} type="button" aria-pressed={active} onClick={() => setGroup(active ? null : c.key!)}
                  className={`reveal card group relative flex min-h-[176px] flex-col justify-between p-6 text-left transition duration-300 hover:-translate-y-1 hover:shadow-lift ${active ? '!border-aqua-500 ring-2 ring-aqua-100' : 'hover:border-aqua-500/40'}`}>
                  <span className="absolute right-5 top-5 font-display text-[13px] text-ink-300">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h4 className="font-display text-[22px] text-navy-900">{c.name}</h4>
                    <p className="mt-2 max-w-[30ch] text-[14px] leading-relaxed text-ink-500">{c.description}</p>
                  </div>
                  <span className="mt-6 text-[14px] font-semibold text-aqua-700">{active ? 'Showing — tap to show all' : `View ${count(c.key!)} model${count(c.key!) > 1 ? 's' : ''}`}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex items-end justify-between gap-4 border-b border-navy-900/10 pb-3">
            <h4 className="font-display text-[22px] text-navy-900 sm:text-[26px]">
              {group ? aquaCategories.find((c) => c.key === group)?.name : 'All Aqua & Aquaguard models'}
            </h4>
            <span className="text-[13px] text-ink-500">{filtered.length} models</span>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-5">
            {visible.map((p) => (
              <div key={p.id} className="w-full min-[480px]:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] [&>article]:h-full">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
          <p className="mt-5 text-[13px] text-ink-500">*2 year filter life is as marked on the Aquaguard product photos — terms apply. Final specifications are confirmed at the time of enquiry.</p>
          {group && (
            <div className="mt-10 text-center">
              <button onClick={() => setGroup(null)} className="btn-ghost">Show all models</button>
            </div>
          )}
        </div>
      </section>

      <section aria-label="Brand disclaimer" className="bg-white pb-10 pt-2">
        <div className="container-site">
                    <p className="flex items-start gap-2.5 rounded-2xl border border-navy-900/10 bg-white p-4 text-[13px] leading-relaxed text-ink-500">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-aqua-700" aria-hidden />
            KENT, A. O. Smith, Aqua, Aquaguard and other brand names are trademarks of their respective owners and are used only to identify
            products we sell and service. Good Water for Good Life is an independent business and is not claiming to be an authorised
            dealer or affiliate of any manufacturer. Product images are for illustration; please confirm specifications and availability with us.
          </p>
        </div>
      </section>
    </div>
  );
}
