import { useEffect, useRef, useState } from 'react';

/**
 * Lazy mode: returns [ref, near]. `near` turns true once the element is within `margin` of the viewport
 * (default 700px before it scrolls into view) and stays true. Falls back to true when IntersectionObserver
 * is unavailable, so content is never hidden.
 */
export function useNearViewport<T extends HTMLElement>(margin = '700px 0px') {
  const ref = useRef<T | null>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { setNear(true); return; }
    const io = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) { setNear(true); io.disconnect(); } },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);

  return [ref, near] as const;
}
