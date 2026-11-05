import { ArrowUpRight } from 'lucide-react';
import type { Category } from '../data/products';
import { waLink } from '../lib/whatsapp';
import { site } from '../config/site';

export default function CategoryCard({ brand, category, index }: { brand: string; category: Category; index: number }) {
  const msg = `Hello ${site.name}, I am interested in ${brand} ${category.name} water purifiers. Please share the current models and details.`;
  return (
    <a href={waLink(msg)} target="_blank" rel="noopener noreferrer"
      className="reveal group card relative flex min-h-[176px] flex-col justify-between overflow-hidden p-6 transition duration-300 hover:-translate-y-1 hover:border-aqua-500/40 hover:shadow-lift"
      aria-label={`Enquire about ${brand} ${category.name} purifiers on WhatsApp`}>
      <span className="absolute right-5 top-5 font-display text-[13px] text-ink-300">{String(index + 1).padStart(2, '0')}</span>
      <div>
        <h4 className="font-display text-[22px] text-navy-900">{category.name}</h4>
        <p className="mt-2 max-w-[28ch] text-[14px] leading-relaxed text-ink-500">{category.description}</p>
      </div>
      <span className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-aqua-700">
        Ask for current models<ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </a>
  );
}
