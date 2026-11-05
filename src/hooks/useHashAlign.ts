import { useEffect } from 'react';

/**
 * Lazy-rendered sections can shift the layout a little while the page jumps to an anchor.
 * After a #hash jump (page load or menu click) we re-align the target until the layout has settled,
 * and stop as soon as the visitor scrolls by hand.
 */
export function useHashAlign() {
  useEffect(() => {
    let timers: number[] = [];
    const stop = () => { timers.forEach((t) => window.clearTimeout(t)); timers = []; };
    const align = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const el = id ? document.getElementById(id) : null;
      if (el) el.scrollIntoView({ block: 'start' });
    };
    const later = () => {
      stop();
      [150, 400, 700, 1000, 1400, 1900, 2600].forEach((ms) => timers.push(window.setTimeout(align, ms)));
    };

    if (window.location.hash) later();
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.('a[href*="#"]');
      if (a) later();
    };
    const onUser = () => stop();
    window.addEventListener('hashchange', later);
    document.addEventListener('click', onClick);
    window.addEventListener('wheel', onUser, { passive: true });
    window.addEventListener('touchstart', onUser, { passive: true });
    window.addEventListener('keydown', onUser);
    return () => {
      stop();
      window.removeEventListener('hashchange', later);
      document.removeEventListener('click', onClick);
      window.removeEventListener('wheel', onUser);
      window.removeEventListener('touchstart', onUser);
      window.removeEventListener('keydown', onUser);
    };
  }, []);
}
