import { useEffect } from 'react';

/**
 * Jumps to a #section after a menu click or when the page is opened with a #hash.
 * The sections below the first screen load a moment after the page opens, so if the target is not on the
 * page yet we wait for it, scroll to it as soon as it appears, and re-align while the layout settles.
 * It stops as soon as the visitor scrolls by hand.
 */
export function useHashAlign() {
  useEffect(() => {
    let timers: number[] = [];
    let observer: MutationObserver | null = null;
    let giveUp = 0;

    const stop = () => {
      timers.forEach((t) => window.clearTimeout(t));
      timers = [];
      observer?.disconnect();
      observer = null;
      window.clearTimeout(giveUp);
    };
    const target = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      return id ? document.getElementById(id) : null;
    };
    const align = () => target()?.scrollIntoView({ block: 'start' });
    const settle = () => {
      [0, 300, 700, 1200, 1800, 2600].forEach((ms) => timers.push(window.setTimeout(align, ms)));
    };
    const run = () => {
      stop();
      if (!window.location.hash) return;
      if (target()) { settle(); return; }
      // Section not on the page yet (still loading): wait for it, then scroll.
      observer = new MutationObserver(() => {
        if (target()) { observer?.disconnect(); observer = null; settle(); }
      });
      observer.observe(document.body, { childList: true, subtree: true });
      giveUp = window.setTimeout(stop, 30000);
    };

    run();
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.('a[href*="#"]');
      if (a) window.setTimeout(run, 0);        // let the browser update the address first
    };
    const onUser = () => stop();
    window.addEventListener('hashchange', run);
    document.addEventListener('click', onClick);
    window.addEventListener('wheel', onUser, { passive: true });
    window.addEventListener('touchstart', onUser, { passive: true });
    window.addEventListener('keydown', onUser);
    return () => {
      stop();
      window.removeEventListener('hashchange', run);
      document.removeEventListener('click', onClick);
      window.removeEventListener('wheel', onUser);
      window.removeEventListener('touchstart', onUser);
      window.removeEventListener('keydown', onUser);
    };
  }, []);
}
