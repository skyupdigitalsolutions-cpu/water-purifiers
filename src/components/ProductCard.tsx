import { useState } from 'react';
import { useNearViewport } from '../hooks/useNearViewport';
import WhatsAppIcon from './WhatsAppIcon';
import type { Product } from '../data/products';
import { waProduct } from '../lib/whatsapp';

export default function ProductCard({ product }: { product: Product }) {
  const [v, setV] = useState(0);
  const [imgBox, near] = useNearViewport<HTMLDivElement>();
  const variant = product.variants[v];
  const enquiryName = product.variants.length > 1 ? `${product.name} (${variant.label})` : product.name;

  return (
    <article className="reveal group card flex flex-col overflow-hidden transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-25px_rgba(10,34,64,.45)]">
      <div ref={imgBox} className="img-zoom relative aspect-[4/4.4] overflow-hidden border-b border-navy-900/5 bg-white">
        {!near && <div aria-hidden className="absolute inset-0 bg-sky-50" />}
        {near && <img
          key={variant.image}
          src={variant.image}
          srcSet={`${variant.image.replace('.webp', '-sm.webp')} 440w, ${variant.image} 880w`}
          sizes="(min-width: 1024px) 25vw, (min-width: 480px) 50vw, 100vw"
          width={880}
          height={968}
          alt={`${product.name} water purifier — ${variant.label}`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full animate-[gwFade_.5s_ease] object-cover"
        />}
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {product.variants.length > 1 && (
          <div className="mb-3 flex items-center gap-2" role="radiogroup" aria-label={`${product.name} options`}>
            {product.variants.map((x, i) => (
              <button key={x.label} role="radio" aria-checked={i === v} aria-label={x.label} title={x.label} onClick={() => setV(i)}
                className={`h-6 w-6 rounded-full border-2 transition ${i === v ? 'border-aqua-500 ring-2 ring-aqua-100' : 'border-white shadow-[0_0_0_1px_rgba(10,34,64,.15)]'}`}
                style={{ background: x.swatch }} />
            ))}
            <span className="text-[12px] text-ink-500">{variant.label}</span>
          </div>
        )}
        <h4 className="font-display text-[17px] leading-snug text-navy-900 sm:text-[19px]">{product.name}</h4>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-500 sm:text-[14px]">{product.description}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Features">
          {product.features.map((f) => <li key={f} className="chip">{f}</li>)}
        </ul>
        <a href={waProduct(enquiryName)} target="_blank" rel="noopener noreferrer"
          className="mt-5 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-navy-900/15 text-[14px] font-semibold text-navy-900 transition hover:border-[#1FA855] hover:bg-[#1FA855] hover:text-white sm:mt-auto sm:translate-y-0"
          aria-label={`Enquire about ${enquiryName} on WhatsApp`}>
          <WhatsAppIcon className="h-4 w-4" />Enquire Now
        </a>
      </div>
    </article>
  );
}
