import { useEffect } from 'react';

/**
 * Adds `is-visible` to every `.reveal` element as it scrolls into view.
 * Performance notes: one IntersectionObserver, no per-scroll layout reads, and the MutationObserver only
 * inspects nodes that were actually added (no whole-document scans). A single cheap safety pass runs after
 * scrolling stops, so a fast flick on a phone can never leave a section invisible. Reduced motion is handled in CSS.
 */
export function useReveal() {
  useEffect(() => {
    const show = (el: Element) => el.classList.add('is-visible');
    const pending = (root: ParentNode) => Array.from(root.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)'));

    if (!('IntersectionObserver' in window)) {
      pending(document).forEach(show);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } }),
      { rootMargin: '0px 0px -6% 0px', threshold: 0 },
    );
    pending(document).forEach((el) => io.observe(el));

    const mo = new MutationObserver((records) => {
      for (const r of records) {
        r.addedNodes.forEach((n) => {
          if (n.nodeType !== 1) return;
          const el = n as HTMLElement;
          if (el.classList.contains('reveal') && !el.classList.contains('is-visible')) io.observe(el);
          pending(el).forEach((c) => io.observe(c));
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    let t = 0;
    const settle = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => {
        const limit = window.innerHeight * 0.98;
        pending(document).forEach((el) => { if (el.getBoundingClientRect().top < limit) { show(el); io.unobserve(el); } });
      }, 180);
    };
    window.addEventListener('scroll', settle, { passive: true });

    return () => {
      io.disconnect(); mo.disconnect(); window.clearTimeout(t);
      window.removeEventListener('scroll', settle);
    };
  }, []);
}
