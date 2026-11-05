import ProductCard from './ProductCard';
import { softenerShowcase, steelUnits } from '../data/products';
import { waProduct } from '../lib/whatsapp';
import WhatsAppIcon from './WhatsAppIcon';

const plant = softenerShowcase[4];

export default function Softeners() {
  return (
    <section id="softeners" aria-labelledby="softeners-title" className="bg-sky-50 py-10 sm:py-12">
      <div className="container-site">
        <div className="reveal grid gap-6 border-b border-navy-900/10 pb-8 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <div>
            <p className="eyebrow">For hard water &amp; businesses</p>
            <h2 id="softeners-title" className="mt-4 text-[32px] leading-[1.1] sm:text-[44px]">
              Water Softeners &amp; <em className="font-normal italic text-aqua-700">RO Plants</em>
            </h2>
          </div>
          <p className="text-[15.5px] leading-relaxed text-ink-500 lg:pb-1">
            Automatic and manual water softeners for hard borewell water, and commercial RO water plants for
            higher daily demand. Tell us your usage and we'll suggest the right capacity.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-4">
          {softenerShowcase.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
        </div>

        <article className="reveal card mt-5 grid overflow-hidden md:grid-cols-[1.15fr_1fr]">
          <div className="bg-gradient-to-b from-white to-sky-50">
            <img src={plant.variants[0].image.replace('.webp', '-wide.webp')} srcSet={`${plant.variants[0].image.replace('.webp', '-wide-sm.webp')} 640w, ${plant.variants[0].image.replace('.webp', '-wide.webp')} 1200w`} sizes="(min-width: 768px) 55vw, 100vw" width={1200} height={760} alt={`${plant.name}`} loading="lazy" decoding="async" className="h-full w-full object-contain" />
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-8">
            <h3 className="font-display text-[24px] leading-snug text-navy-900 sm:text-[28px]">{plant.name}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-500">{plant.description}</p>
            <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Features">
              {plant.features.map((f) => <li key={f} className="chip">{f}</li>)}
            </ul>
            <a href={waProduct(plant.name)} target="_blank" rel="noopener noreferrer"
              className="btn-wa mt-6 self-start" aria-label={`Enquire about ${plant.name} on WhatsApp`}>
              <WhatsAppIcon className="h-4 w-4" />Enquire Now
            </a>
          </div>
        </article>

        <div className="mt-5 flex flex-wrap justify-center gap-5">
          {steelUnits.map((p) => (
            <div key={p.id} className="w-full min-[480px]:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] [&>article]:h-full">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
