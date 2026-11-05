// Central business configuration. Edit here — every component reads from this file.
export const site = {
  name: 'Good Water for Good Life',
  /** Logo image path, e.g. '/images/logo.png'. Leave empty to use the built-in mark. */
  logoSrc: '' as string,
  shortName: 'Good Water',
  tagline: 'Water Purifier Sales · Service · RO Components',
  phones: [
    { display: '98801 24944', e164: '+919880124944' },
    { display: '99014 82762', e164: '+919901482762' },
  ],
  // ASSUMPTION: the first number is used for WhatsApp. Change if WhatsApp runs on the other number.
  whatsappNumber: '919880124944',
  address: {
    line1: '392 C, 80 Feet Road',
    line2: 'Opposite Aditya Royal Apartment, MPM Layout',
    line3: 'Kengunte, Mallathahalli, Nagarbhavi',   // <-- changed
    city: 'Bengaluru, Karnataka 560056',
    full: '392 C, 80 Feet Road, Opposite Aditya Royal Apartment, MPM Layout, Kengunte, Mallathahalli, Nagarbhavi, Bengaluru, Karnataka 560056',   // <-- changed
  },
  // Business-provided claims only. Do not add statistics that are not supplied by the business.
  stats: { years: '20+', customers: '5000+' },
  // Google Business Profile figures recorded from the owner's screenshots.
  // Shown ONLY as a labelled fallback while the live Places API integration is not configured.
  googleSnapshot: { rating: 4.7, reviewCount: 248, label: 'Recorded from our Google Business Profile' },
  // PLACEHOLDER: once you have the verified Place ID, the backend returns the exact Maps URL.
  mapsSearchUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('Good Water for Good Life, 80 Feet Road, Mallathahalli, Bengaluru 560056'),
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=' +
    encodeURIComponent('Good Water for Good Life, 392 C, 80 Feet Road, Kengunte, Mallathahalli, Bengaluru 560056'),
  mapEmbedUrl:
    'https://www.google.com/maps?output=embed&q=' +
    encodeURIComponent('392 C, 80 Feet Road, Kengunte, Mallathahalli, Bengaluru, Karnataka 560056'),
};

export const nav = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Water Purifiers', href: '#purifiers' },
  { label: 'Softeners', href: '#softeners' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact Us', href: '#contact' },
];