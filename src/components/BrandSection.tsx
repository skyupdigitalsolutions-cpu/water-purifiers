import type { ReactNode } from 'react';
import type { Category, Product } from '../data/products';
import ProductCard from './ProductCard';
import CategoryCard from './CategoryCard';

type Props = {
  id: string;
  index: string;
  brand: string;
  wordmark: ReactNode;
  intro: string;
  categories: Category[];
  models: Product[];
  tone?: 'white' | 'sky';
  modelsNote?: string;
  perRow?: 3 | 4;
};

const catCols = (n: number) => (n >= 5 ? 'lg:grid-cols-3 xl:grid-cols-5' : n === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3');
const modelCols = (n: number) => (n % 4 === 0 ? 'lg:grid-cols-4' : 'lg:grid-cols-3');

export default function BrandSection({ id, index, brand, wordmark, intro, categories, models, tone = 'white', modelsNote, perRow }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`py-10 sm:py-12 ${tone === 'sky' ? 'bg-sky-50' : 'bg-white'}`}>
      <div className="container-site">
        <div className="reveal grid gap-6 border-b border-navy-900/10 pb-8 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-ink-300">Brand {index}</p>
            <h3 id={`${id}-title`} className="mt-3 text-[34px] leading-none sm:text-[44px]">{wordmark}<span className="sr-only"> water purifiers</span></h3>
          </div>
          <p className="text-[15.5px] leading-relaxed text-ink-500 lg:pb-1">{intro}</p>
        </div>

        <div className={`mt-8 grid gap-5 sm:grid-cols-2 ${catCols(categories.length)}`}>
          {categories.map((c, i) => <CategoryCard key={c.name} brand={brand} category={c} index={i} />)}
        </div>

        {models.length > 0 ? (
          <>
            <div className="mt-8 flex items-end justify-between gap-4 border-b border-navy-900/10 pb-3">
              <h4 className="font-display text-[22px] text-navy-900 sm:text-[26px]">{brand} models</h4>
              <span className="text-[13px] text-ink-500">{models.length} models</span>
            </div>
            {perRow === 4 ? (
              <div className="mt-6 flex flex-wrap justify-center gap-5">
                {models.map((p) => (
                  <div key={p.id} className="w-full min-[480px]:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] [&>article]:h-full">
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            ) : (
              <div className={`mt-6 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 ${modelCols(models.length)}`}>
                {models.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
            {modelsNote && <p className="mt-5 text-[13px] text-ink-500">{modelsNote}</p>}
          </>
        ) : (
          <p className="mt-5 text-[13px] text-ink-500">
            Model availability changes often — tap a category and we'll share current {brand} models and guidance on WhatsApp.
          </p>
        )}
      </div>
    </section>
  );
}
