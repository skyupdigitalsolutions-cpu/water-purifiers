/**
 * PRODUCT DATA
 * ------------
 * KENT models and the "Aqua & Premium Range" come from the business's own product lists
 * (uploaded PDFs "kent pdf models.pdf" and "Aqua new list-2.pdf"). Names, purification
 * combinations and storage capacities are copied from those lists — nothing has been added.
 *
 * Aquaguard and A. O. Smith: no verified model list or product photography was supplied,
 * so those sections show the CATEGORIES the business stocks/supports, with an enquiry button.
 * To add verified models, append items to `aquaguardModels` / `aoSmithModels` using details
 * and images you are licensed to use (e.g. supplied by your distributor). Leave arrays empty
 * rather than inventing specifications.
 */

export type Variant = { label: string; image: string; swatch: string };

export type Product = {
  id: string;
  name: string;
  description: string;
  features: string[];
  variants: Variant[];
  badge?: string;
  group?: string;
};

export type Category = { name: string; description: string; key?: string };

const img = (f: string) => `/images/products/${f}.webp`;

/* ---------------------------------------------------------------- KENT */
export const kentCategories: Category[] = [
  { name: 'RO', description: 'Reverse osmosis for high-TDS borewell or tanker water.' },
  { name: 'RO + UV', description: 'RO with ultraviolet disinfection as an added stage.' },
  { name: 'RO + UF', description: 'RO with ultrafiltration for an extra membrane barrier.' },
  { name: 'Alkaline & Copper', description: 'Models with copper and alkaline stages.' },
  { name: 'UV / UF', description: 'Non-RO purification, usually for low-TDS supply water.' },
];

export const kentModels: Product[] = [
  {
    id: 'kent-grand-star',
    name: 'KENT Grand Star',
    description: 'White purifier with RO, UF and TDS indicators, a copper-finish tap and a front panel marked RO + UV + UF + TDS control.',
    features: ['RO + UV + UF + TDS control', 'Retains essential minerals', '4 years free service*'],
    variants: [{ label: 'White', image: img('kent-grand-star'), swatch: '#f3f6f9' }],
  },
  {
    id: 'kent-sterling-star-black',
    name: 'KENT Sterling Star — Black & Gold',
    description: 'Curved black and gold purifier with RO, UV, UF and TDS indicators and a power display.',
    features: ['RO + UV + UF + TDS', 'Retains essential minerals', '4 years free service*'],
    variants: [{ label: 'Black & gold', image: img('kent-sterling-star-black'), swatch: '#c9893f' }],
  },
  {
    id: 'kent-sterling-star-blue',
    name: 'KENT Sterling Star — Blue & White',
    description: 'Curved blue and white purifier with RO, UV, UF and TDS indicators and a power display.',
    features: ['RO + UV + UF + TDS', 'Retains essential minerals', '4 years free service*'],
    variants: [{ label: 'Blue & white', image: img('kent-sterling-star-blue'), swatch: '#1c3b8c' }],
  },
  {
    id: 'kent-sapphire',
    name: 'KENT Sapphire',
    description: 'Countertop purifier with a front display marked RO + UF + TDS control and a contamination filter with UV in tank. Shown with an 8 L alkaline water tank marking.',
    features: ['RO + UF + TDS control', 'UV in tank', '8 L alkaline water', '4 years free service*'],
    variants: [
      { label: 'Black', image: img('kent-sapphire-black'), swatch: '#16181c' },
      { label: 'White', image: img('kent-sapphire-white'), swatch: '#f3f6f9' },
    ],
  },
  {
    id: 'kent-pearl-star',
    name: 'KENT Pearl Star',
    description: 'Transparent blue storage tank on a white base with a power and status display, marked Alkaline & Copper.',
    features: ['Alkaline & Copper', 'Retains essential minerals', '4 years free service*'],
    variants: [{ label: 'White & blue', image: img('kent-pearl-star'), swatch: '#4fb3ea' }],
  },
  {
    id: 'kent-excel-plus',
    name: 'KENT Excel Plus',
    description: 'Under-counter RO purifier with a see-through cover over the RO stages, three filter housings and a separate high-capacity RO storage tank.',
    features: ['Under-counter RO', 'A+ grade RO membrane', 'RO storage tank'],
    variants: [{ label: 'White', image: img('kent-excel-plus'), swatch: '#f3f6f9' }],
  },
];

/* ---------------------------------------------------------------- AQUAGUARD */
export const aquaguardCategories: Category[] = [
  { name: 'RO', description: 'Reverse osmosis purifiers for high-TDS water sources.' },
  { name: 'RO + UV', description: 'RO purification with an added UV disinfection stage.' },
  { name: 'RO + UV + UF', description: 'Three-technology purification for mixed water sources.' },
  { name: 'Alkaline & Copper', description: 'Variants with copper and alkaline enrichment stages.' },
];
export const aquaguardModels: Product[] = [
  {
    id: 'aquaguard-hot-ambient', group: 'aquaguard', name: 'Aqua Guard Aspire Flare',
    description: 'Aqua Guard Aspire Flare: black countertop purifier with separate HOT and AMBIENT taps and a separate filter cartridge. RO + UV + Active Copper + Alkaline, with 2 year mega filter life*.',
    features: ['RO + UV', 'Active copper', 'Alkaline', '2 year mega filter life*'],
    variants: [{ label: 'With cartridge', image: img('aquaguard-hot-ambient'), swatch: '#16181c' }],
  },
  {
    id: 'aquaguard-hot-tea', group: 'aquaguard', name: 'Aqua Guard Aspire Flare — Hot Tea',
    description: 'Aqua Guard Aspire Flare dispensing hot water into a cup of tea. RO + UV + Active Copper + Alkaline, with 2 year mega filter life*.',
    features: ['RO + UV', 'Active copper', 'Alkaline', '2 year mega filter life*'],
    variants: [{ label: 'Hot tea', image: img('aquaguard-hot-tea'), swatch: '#c8741f' }],
  },
  {
    id: 'aquaguard-smart', group: 'aquaguard', name: 'Aquaguard Smart',
    description: 'Black purifier with a clock display marked UV + Mineral and a copper-tone front panel, shown with a companion mobile app.',
    features: ['UV + Mineral display', 'Mobile app (as shown)'],
    variants: [{ label: 'Black', image: img('aquaguard-smart'), swatch: '#16181c' }],
  },
  {
    id: 'aquaguard-mineral-guard', group: 'aquaguard', name: 'Aquaguard Auto Mineral Guard',
    description: 'Black purifier with a UV + Mineral display, a copper-tone dispenser panel and an Auto Mineral Guard badge.',
    features: ['UV + Mineral', 'Auto Mineral Guard'],
    variants: [{ label: 'Black', image: img('aquaguard-mineral-guard'), swatch: '#16181c' }],
  },
  {
    id: 'aquaguard-champagne', group: 'aquaguard', name: 'Aquaguard Aspire Lumino Bg',
    description: 'Aquaguard Aspire Lumino Bg: champagne-finish purifier with a black oval touch panel ringed in copper and purple light, marked 2 year filter life*.',
    features: ['Illuminated oval panel', '2 year filter life*'],
    variants: [{ label: 'Champagne', image: img('aquaguard-champagne'), swatch: '#c9b3a4' }],
  },
  {
    id: 'aquaguard-copper-cartridge', group: 'aquaguard', name: 'Aquaguard Aspire Nova',
    description: 'Aquaguard Aspire Nova: black purifier with a copper-tone dispenser, Power / Purifying / Filter Life indicators and a separate filter cartridge. UV + UF + Stainless Steel Copper, with 2X filter life*.',
    features: ['UV + UF', 'Stainless steel copper', '2X filter life*', 'Filter cartridge'],
    variants: [{ label: 'Black', image: img('aquaguard-copper-cartridge'), swatch: '#16181c' }],
  },
  {
    id: 'aquaguard-nova-aspire', group: 'aquaguard', name: 'Aquaguard Nova Aspire',
    description: 'Aquaguard Nova Aspire: black purifier with an Aquaguard dispenser plate, indicator lights and a separate filter cartridge, marked 2 year filter life*. RO + UV + 2X.',
    features: ['RO + UV', '2X', '2 year filter life*', 'Filter cartridge'],
    variants: [{ label: 'Black', image: img('aquaguard-copper-cartridge'), swatch: '#16181c' }],
  },
  {
    id: 'aquaguard-aqua-era', group: 'aquaguard', name: 'Aquaguard Aqua ERA',
    description: 'Blue purifier branded Aqua ERA with the Aquaguard name, a clear dispensing alcove and RO, UV, alkaline and TDS control markings.',
    features: ['RO + UV', 'Alkaline', 'TDS control'],
    variants: [{ label: 'Blue', image: img('aquaguard-aqua-era'), swatch: '#2c3f63' }],
  },
];

/* ---------------------------------------------------------------- A. O. SMITH */
export const aoSmithCategories: Category[] = [
  { name: 'Hot & normal water', description: 'ProPlanet P6, P7 and P8 dispense hot and normal water.' },
  { name: 'RO + SCMT', description: 'ProPlanet P3 to P8 are RO + SCMT models with 8-stage purification.' },
  { name: 'Touch panel', description: 'Models with touch controls and glowing indicator lights.' },
  { name: 'Z2 Pro UTC', description: 'Z2 Pro under-the-counter (UTC) purifiers with a separate chrome gooseneck tap.' },
];
export const aoSmithModels: Product[] = [
  {
    id: 'ao-smith-touch-a', name: 'AO Smith Proplanet P3',
    description: 'Graphite purifier with silver side panels, a green-lit touch panel with a pH indicator and a central silver tap. RO + SCMT + Alkaline, 8 stage purification.',
    features: ['RO + SCMT + Alkaline', '8 stage purification', 'Touch panel'],
    variants: [{ label: 'Graphite & silver', image: img('ao-smith-touch-a'), swatch: '#8e949c' }],
  },
  {
    id: 'ao-smith-touch-b', name: 'AO Smith Proplanet P4',
    description: 'Graphite purifier with silver side panels, a green-lit touch panel with a pH indicator and a central silver tap. RO + SCMT + Alkaline, 8 stage purification.',
    features: ['RO + SCMT + Alkaline', '8 stage purification', 'Touch panel'],
    variants: [{ label: 'Graphite & silver', image: img('ao-smith-touch-b'), swatch: '#5d636b' }],
  },
  {
    id: 'ao-smith-matte-black', name: 'AO Smith Proplanet P5',
    description: 'Glossy black purifier with a side-mounted tap, a vertical water-level window and power, tank and drop indicators. RO + SCMT, 8 stage purification.',
    features: ['RO + SCMT', '8 stage purification', 'Side tap'],
    variants: [{ label: 'Black', image: img('ao-smith-matte-black'), swatch: '#16181c' }],
  },
  {
    id: 'ao-smith-proplanet-p6', name: 'AO Smith Proplanet P6',
    description: 'Black purifier with Normal and Hot taps and a panel marked RO, SCMT and Hot, with touch control. RO + SCMT + HOT, 8 stage purification.',
    features: ['RO + SCMT + HOT', '8 stage purification', 'Hot & normal taps'],
    variants: [{ label: 'Black', image: img('ao-smith-proplanet-p6'), swatch: '#16181c' }],
  },
  {
    id: 'ao-smith-proplanet-p7', name: 'AO Smith Proplanet P7',
    description: 'Black purifier with separate Normal and Hot taps and a touch panel marked RO, SCMT, Hot and Touch. RO + SCMT + HOT + TOUCH, 8 stage purification.',
    features: ['RO + SCMT + HOT + TOUCH', '8 stage purification', 'Hot & normal taps'],
    variants: [{ label: 'Black', image: img('ao-smith-proplanet-p7'), swatch: '#16181c' }],
  },
  {
    id: 'ao-smith-proplanet-p8', name: 'AO Smith Proplanet P8',
    description: 'Matte black purifier with a Normal / Hot selector around the tap, a ventilated side panel and a drip tray. RO + SCMT + HOT + TOUCH.',
    features: ['RO + SCMT + HOT + TOUCH', 'Hot & normal water', 'Selector dial'],
    variants: [{ label: 'Matte black', image: img('ao-smith-proplanet-p8'), swatch: '#16181c' }],
  },
  {
    id: 'ao-smith-vogue-utc', name: 'AO Smith Z2 Pro Vogue UTC',
    description: 'Under-the-counter (UTC) purifier with a separate chrome gooseneck tap and a Power / Purity / RO / Hot indicator panel, in white and black.',
    features: ['Under-the-counter (UTC)', 'Chrome gooseneck tap', 'Power · Purity · RO · Hot panel'],
    variants: [
      { label: 'White', image: img('ao-smith-gooseneck-white'), swatch: '#f3f4f6' },
      { label: 'Black', image: img('ao-smith-gooseneck-black'), swatch: '#15171b' },
    ],
  },
  {
    id: 'ao-smith-gooseneck-wood', name: 'AO Smith Z2 Pro UTC Walnut',
    description: 'Walnut wood-finish under-the-counter (UTC) purifier with a separate chrome gooseneck tap and Power / Purity / RO / Hot indicators.',
    features: ['Under-the-counter (UTC)', 'Chrome gooseneck tap', 'Power · Purity · RO · Hot panel'],
    variants: [{ label: 'Walnut', image: img('ao-smith-gooseneck-wood'), swatch: '#8a4a2a' }],
  },
];

/* ---------------------------------------------------------------- SOFTENERS, FILTRATION & RO PLANTS */
/* Softeners & RO plants — HD product photos only. Shown four per line. */
export const softenerShowcase: Product[] = [
  {
    id: 'kent-auto-water-softener',
    name: 'KENT Auto Water Softener',
    description: 'Automatic water softener from KENT, to reduce water hardness.',
    features: ['Automatic', 'Water softener'],
    variants: [{ label: 'White & navy', image: img('kent-auto-water-softener'), swatch: '#1d2b5a' }],
  },
  {
    id: 'kent-bathroom-water-softener',
    name: 'KENT Bathroom Water Softener',
    description: 'Cartridge-style bathroom softener with a clear resin chamber and two shut-off valves, linked to a wall-mounted unit with pressure gauge and status lights.',
    features: ['Bathroom softener', 'Resin chamber', 'Pressure gauge'],
    variants: [{ label: 'White', image: img('kent-bathroom-water-softener'), swatch: '#f1f2f4' }],
  },
  {
    id: 'water-softener-brine-tank',
    name: 'Water Softener with Brine Tank',
    description: 'Softener vessel with a separate brine tank, installed at the point of use.',
    features: ['Softener vessel', 'Brine tank', 'Free installation'],
    variants: [{ label: 'Blue', image: img('water-softener-brine-tank'), swatch: '#2f8fd0' }],
  },
  {
    id: 'mgf-acf-filter-system',
    name: 'MGF + ACF Filter System with Salt Tank',
    description: 'Twin pressure vessels - Multi Grade Filter and Activated Carbon Filter - with digital control heads and a salt tank.',
    features: ['Multi Grade Filter (MGF)', 'Activated Carbon Filter (ACF)', 'Salt tank'],
    variants: [{ label: 'Blue', image: img('mgf-acf-filter-system'), swatch: '#2f8fd0' }],
  },
  {
    id: 'industrial-ro-plant',
    name: 'Industrial RO Water Treatment Plant',
    description: 'Skid-mounted plant with MGF and ACF vessels, 5 micron and 1 micron filters, RO membranes, control panel and high-pressure pump.',
    features: ['MGF + ACF', '5 µm + 1 µm filters', 'High-pressure pump'],
    variants: [{ label: 'Standard', image: img('industrial-ro-plant'), swatch: '#2f8fd0' }],
  },
];

export const steelUnits: Product[] = [
  {
    id: 'stainless-steel-storage-unit', name: 'SS Water Storage Tank — 304 Food Grade',
    description: 'Stainless steel storage tank with a lid, steel tap and push-fit pipe connections, on a stand with a cabinet panel. Available as 50 Ltr and 100 Ltr SS storage with 304 food grade steel.',
    features: ['50 Ltr SS storage', '100 Ltr SS storage', '304 food grade'],
    variants: [{ label: 'Stainless steel', image: img('stainless-steel-storage-unit'), swatch: '#b9bec4' }],
  },
  {
    id: 'commercial-stainless-purifier', name: 'Water Purifier with In-built 60 Ltr Storage',
    description: 'Floor-standing stainless steel water purifier with in-built 60 Ltr storage, two pressure gauges, a flow meter, two steel taps with a drip tray and a blue pre-filter housing. Available in 25 LPH, 50 LPH and 100 LPH; the 50 and 100 LPH models are listed with 304 food grade steel.',
    features: ['25 LPH', '50 LPH', '100 LPH', 'In-built 60 Ltr storage', '304 food grade (50 & 100 LPH)'],
    variants: [{ label: 'Stainless steel', image: img('commercial-stainless-purifier'), swatch: '#b9bec4' }],
  },
  {
    id: 'commercial-ro-plant', name: 'Commercial RO Plant — 25 / 50 / 100 LPH',
    description: 'Commercial RO plant on a stainless steel stand with three large blue filter housings, an RO booster pump and an RO membrane. Choose 25 LPH, 50 LPH or 100 LPH.',
    features: ['25 / 50 / 100 LPH', 'Commercial RO plant', 'RO booster pump'],
    variants: [
      { label: '25 LPH', image: img('commercial-ro-plant-stainless'), swatch: '#8ab8f0' },
      { label: '50 LPH', image: img('commercial-ro-plant-stainless'), swatch: '#3f86e0' },
      { label: '100 LPH', image: img('commercial-ro-plant-stainless'), swatch: '#1450a8' },
    ],
  },
];

/* ---------------------------------------------------------------- AQUA & PREMIUM RANGE */
const STD = ['RO + UV', 'Active copper', 'Alkaline', 'TDS control'];
const ZINC = ['RO + UV', 'Active copper', 'Zinc', 'TDS control'];

export const aquaCategories: Category[] = [
  { key: 'storage', name: 'Storage purifiers', description: '10 to 15-litre storage models with RO + UV, active copper, alkaline and TDS control.' },
  { key: 'hot', name: 'Hot & Normal / Hot & Cold', description: 'Models with hot and normal taps, or hot and cold dispensing.' },
  { key: 'utc', name: 'Under-the-counter', description: 'Concealed under-the-counter (UTC) installation beneath the kitchen counter.' },
  { key: 'aquaguard', name: 'Aquaguard', description: 'Aquaguard purifiers with hot and ambient taps, UV + Mineral displays and filter-cartridge models.' },
  { key: 'zinc', name: 'Copper + Zinc', description: 'RO + UV models with active copper, zinc and TDS control.' },
];

export const aquaRange: Product[] = [
  {
    id: 'aqua-raga-2090', group: 'storage', name: 'Aqua 2090 Raga — 10 Ltr Storage',
    description: 'Aqua 2090 Raga in green and silver, 10 Ltr storage. RO + UV + Active Copper + Alkaline + TDS control.',
    features: ['10 Ltr storage', 'RO + UV', 'Active copper', 'Alkaline', 'TDS control'],
    variants: [
      { label: 'Green', image: img('aqua-raga-2090-green'), swatch: '#8fc46a' },
      { label: 'Silver', image: img('aqua-raga-2090-silver'), swatch: '#a9adb3' },
    ],
  },
  {
    id: 'aqua-era', group: 'storage', name: 'Aqua ERA',
    description: '10-litre storage purifier with RO + UV, active copper, alkaline and TDS control.',
    features: ['10 L storage', ...STD], variants: [{ label: 'Blue', image: img('aqua-era'), swatch: '#3b4f6b' }],
  },
  {
    id: 'aqua-purosis-pura-pink', group: 'storage', name: 'Aqua Purosis Pura — 10 Ltr Storage (Pink)',
    description: 'Aqua Purosis Pura, 10 Ltr storage, in pink. RO + UV + Active Copper + Alkaline + TDS control, with a silver side panel carrying RO, UV and UF buttons.',
    features: ['10 Ltr storage', 'RO + UV', 'Active copper', 'Alkaline', 'TDS control'],
    variants: [{ label: 'Pink', image: img('aqua-puross-pink'), swatch: '#e3a6ad' }],
  },
  {
    id: 'aqua-purosis-pura-white', group: 'storage', name: 'Aqua Purosis Pura — 10 Ltr Storage (White)',
    description: 'Aqua Purosis Pura, 10 Ltr storage, in white. RO + UV + Active Copper + Alkaline + TDS control, with a silver side panel carrying RO, UV and UF buttons.',
    features: ['10 Ltr storage', 'RO + UV', 'Active copper', 'Alkaline', 'TDS control'],
    variants: [{ label: 'White', image: img('aqua-puross-white'), swatch: '#f4f5f7' }],
  },
  {
    id: 'miracle-royal-single', group: 'storage', name: 'Miracle Royal Single Tap — 10 Ltr',
    description: 'Miracle Royal single tap, 10 Ltr. RO + UV + Active Copper + Alkaline + TDS control.',
    features: ['10 Ltr', 'Single tap', 'RO + UV', 'Active copper', 'Alkaline', 'TDS control'],
    variants: [{ label: 'Navy & gold', image: img('miracle-royal-single-new'), swatch: '#12294f' }],
  },
  {
    id: 'miracle-royal-hot', group: 'hot', name: 'Miracle Royal Hot & Normal Tap — 10 Ltr',
    description: 'Miracle Royal hot & normal tap, 10 Ltr. RO + UV + Active Copper + Alkaline + TDS control.',
    features: ['10 Ltr', 'Hot & normal tap', 'RO + UV', 'Active copper', 'Alkaline', 'TDS control'],
    variants: [{ label: 'Navy & gold', image: img('miracle-royal-hot-normal-a'), swatch: '#12294f' }],
  },
  {
    id: 'purella-supra', group: 'storage', name: 'Purella Supra++ — Navy Blue, 10 Ltr Storage',
    description: 'Purella Supra++ in navy blue, 10 Ltr storage. RO + UV + Active Copper + Alkaline + TDS control.',
    features: ['10 Ltr storage', 'RO + UV', 'Active copper', 'Alkaline', 'TDS control'],
    variants: [{ label: 'Navy blue', image: img('purella-supra-navy'), swatch: '#14224a' }],
  },
  {
    id: 'purella-supra-purple', group: 'storage', name: 'Purella Supra++ — Purple, 10 Ltr Storage',
    description: 'Purella Supra++ in purple, 10 Ltr storage. RO + UV + Active Copper + Alkaline + TDS control.',
    features: ['10 Ltr storage', 'RO + UV', 'Active copper', 'Alkaline', 'TDS control'],
    variants: [{ label: 'Purple', image: img('purella-supra-purple-new'), swatch: '#5b2a6e' }],
  },
  {
    id: 'aqua-green-gray', group: 'storage', name: 'Aqua Green & Gray',
    description: 'Compact green purifier with a grey tap alcove and power, RO, UV and TDS indicators.',
    features: ['RO + UV', 'TDS control'],
    variants: [{ label: 'Green & grey', image: img('aqua-green-gray'), swatch: '#8fc46a' }],
  },
  {
    id: 'aqua-c3-utc', group: 'utc', name: 'Aqua C3 UTC',
    description: 'Under-the-counter (UTC) purifier with RO + UV, active copper, alkaline and TDS control.',
    features: ['Under-the-counter', ...STD], variants: [{ label: 'White', image: img('aqua-c3-utc-white'), swatch: '#f4f5f7' }],
    badge: 'Under-the-counter',
  },
  {
    id: 'axeon', group: 'hot', name: 'Axeon — Hot and Cold',
    description: 'Axeon with floral side panels and hot and cold water. RO + UV + Active Copper + Alkaline + TDS control.',
    features: ['Hot and cold', 'RO + UV', 'Active copper', 'Alkaline', 'TDS control'],
    variants: [{ label: 'Red floral', image: img('aaxon-hot-normal'), swatch: '#c2185b' }],
  },
  {
    id: 'aqua-orca', group: 'zinc', name: 'Aqua Orca',
    description: 'Purifier with RO + UV, active copper, zinc and TDS control.',
    features: ZINC,
    variants: [
      { label: 'Black & sage', image: img('aqua-orca-white'), swatch: '#b9c9b5' },
    ],
  },
];
