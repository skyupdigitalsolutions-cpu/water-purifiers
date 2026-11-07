import { lazy, Suspense, useEffect, useState } from 'react';
import Hero from '../components/Hero';
import Highlights from '../components/Highlights';
import { useReveal } from '../hooks/useReveal';
import { useHashAlign } from '../hooks/useHashAlign';

// Below-the-fold sections are separate chunks: the first screen loads and paints first, the rest follows right after.
const loaders = {
  About: () => import('../components/About'),
  Purifiers: () => import('../components/Purifiers'),
  Softeners: () => import('../components/Softeners'),
  Services: () => import('../components/Services'),
  WhyChooseUs: () => import('../components/WhyChooseUs'),
  Reviews: () => import('../components/Reviews'),
  Contact: () => import('../components/Contact'),
};
// Start downloading the section files as soon as the page script runs (they are shown right after the first screen).
if (typeof window !== 'undefined') Object.values(loaders).forEach((load) => { load(); });
const About = lazy(loaders.About);
const Purifiers = lazy(loaders.Purifiers);
const Softeners = lazy(loaders.Softeners);
const Services = lazy(loaders.Services);
const WhyChooseUs = lazy(loaders.WhyChooseUs);
const Reviews = lazy(loaders.Reviews);
const Contact = lazy(loaders.Contact);

type IdleWindow = Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };

/** true once the browser has painted the first screen and is idle (or immediately when opening a #section link). */
function useAfterFirstPaint() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const w = window as IdleWindow;
    const go = () => setReady(true);
    // Any scroll / touch / key press means the visitor is moving down the page: show the sections immediately.
    const events: (keyof WindowEventMap)[] = ['scroll', 'wheel', 'touchstart', 'keydown', 'click', 'hashchange'];
    const onUser = () => go();
    events.forEach((e) => window.addEventListener(e, onUser, { passive: true, once: true }));
    let cancel = () => {};
    if (window.location.hash) { const t = window.setTimeout(go, 30); cancel = () => window.clearTimeout(t); }
    else if (w.requestIdleCallback) { const id = w.requestIdleCallback(go, { timeout: 900 }); cancel = () => w.cancelIdleCallback?.(id); }
    else { const t = window.setTimeout(go, 250); cancel = () => window.clearTimeout(t); }
    return () => { cancel(); events.forEach((e) => window.removeEventListener(e, onUser)); };
  }, []);
  return ready;
}

export default function Home() {
  useReveal();
  useHashAlign();
  const ready = useAfterFirstPaint();
  useEffect(() => { document.title = 'Water Purifier Sales & RO Service in Bengaluru | Good Water for Good Life'; }, []);
  return (
    <>
      <Hero />
      <Highlights />
      {ready ? (
        <Suspense fallback={<div aria-hidden style={{ minHeight: '400vh' }} />}>
          <About />
          <Purifiers />
          <Softeners />
          <Services />
          <WhyChooseUs />
          <Reviews />
          <Contact />
          <section aria-label="Service area" className="border-t border-navy-900/[.07] bg-sky-50 py-12">
            <div className="container-site text-[14px] leading-relaxed text-ink-500">
              <h2 className="font-sans text-[15px] font-semibold !text-navy-900">Water purifier sales &amp; RO service in Bengaluru</h2>
              <p className="mt-2 max-w-4xl">
                Good Water for Good Life is located on 80 Feet Road, Kengunte, Mallathahalli, Bengaluru 560056. We help customers looking for a
                water purifier in Bengaluru, an RO water purifier in Bangalore, KENT and Aquaguard water purifiers in Bangalore, and A. O. Smith
                purifiers — along with water purifier service in Bengaluru, RO service in Mallathahalli, RO filter replacement and water purifier
                repair in Bangalore.
              </p>
            </div>
          </section>
        </Suspense>
      ) : (
        <div aria-hidden style={{ minHeight: '400vh' }} />
      )}
    </>
  );
}
