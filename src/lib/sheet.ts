/**
 * Saves each website enquiry to a Google Sheet (via a Google Apps Script web app).
 * Paste your Apps Script "Web app URL" below. Leave it empty to turn this off.
 */
export const SHEET_URL = '';

export function saveToSheet(data: Record<string, string>) {
  if (!SHEET_URL) return;
  const body = new URLSearchParams({ ...data, page: window.location.href });
  // sendBeacon survives the page opening WhatsApp or the phone dialer; fetch is the fallback.
  if (navigator.sendBeacon && navigator.sendBeacon(SHEET_URL, body)) return;
  // no-cors: Google Apps Script does not send CORS headers; the row is still saved.
  fetch(SHEET_URL, { method: 'POST', mode: 'no-cors', body, keepalive: true }).catch(() => {});
}

const sectionNames: Record<string, string> = {
  home: 'Hero', about: 'About', purifiers: 'Purifiers', softeners: 'Softeners',
  services: 'Services', reviews: 'Reviews', contact: 'Contact',
};

/**
 * Logs every Call / WhatsApp button click on the landing page (header, hero, products,
 * services, softeners, footer, mobile bar) as a row in the sheet. Returns a cleanup function.
 */
export function trackLandingClicks() {
  const onClick = (ev: MouseEvent) => {
    const a = (ev.target as HTMLElement | null)?.closest?.('a') as HTMLAnchorElement | null;
    if (!a) return;
    const href = a.getAttribute('href') || '';
    const isCall = href.startsWith('tel:');
    const isWa = href.includes('wa.me/');
    if (!isCall && !isWa) return;
    if (a.dataset.noTrack !== undefined) return; // form submits already log their own row

    let area = 'Page';
    if (a.closest('header')) area = 'Header';
    else if (a.closest('footer')) area = 'Footer';
    else if (a.closest('.fixed')) area = 'Floating button';
    else {
      const sec = a.closest('section[id]');
      if (sec) area = sectionNames[sec.id] || sec.id;
    }

    const label = (a.getAttribute('aria-label') || a.textContent || '').replace(/\s+/g, ' ').trim();
    let message = '';
    if (isWa) {
      try { message = new URL(href).searchParams.get('text') || ''; } catch { /* ignore */ }
    }
    saveToSheet({
      source: `${isCall ? 'Call' : 'WhatsApp'} click · ${area}`,
      name: '',
      phone: isCall ? href.replace('tel:', '') : '',
      brand: '',
      service: label,
      message,
    });
  };
  document.addEventListener('click', onClick, true);
  return () => document.removeEventListener('click', onClick, true);
}
