import { useEffect } from 'react';
import { site } from '../config/site';

export default function PrivacyPolicy() {
  useEffect(() => { document.title = `Privacy Policy | ${site.name}`; }, []);
  return (
    <article className="container-site max-w-3xl py-16 sm:py-24">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-4 text-[36px] sm:text-[48px]">Privacy Policy</h1>
      {/* PLACEHOLDER: have this text reviewed for your business before publishing. */}
      <p className="mt-3 text-[14px] text-ink-500">Last updated: {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
      <div className="mt-10 space-y-8 text-[16px] leading-relaxed text-ink-700 [&_h2]:mb-3 [&_h2]:text-[24px]">
        <section><h2>Who we are</h2><p>{site.name} is a water purifier sales and service business at {site.address.full}.</p></section>
        <section><h2>Information we collect</h2><p>This website does not have user accounts and does not store enquiry form submissions on our servers. When you use the enquiry form, the details you type (name, phone number, brand, service and message) are placed into a WhatsApp message on your own device. Nothing is sent until you press Send in WhatsApp, at which point the message is handled by WhatsApp under its own privacy policy and reaches us like any other WhatsApp message.</p></section>
        <section><h2>Phone calls and WhatsApp</h2><p>If you call or message us, we use your number and the details you share only to respond to your enquiry, arrange installation or service, and follow up on that request. We do not sell your information.</p></section>
        <section><h2>Third-party services</h2><p>This site uses Google Maps (embedded map and directions), Google Fonts, and Google Places data to show our Google rating and reviews. These services may process technical data such as your IP address under Google's Privacy Policy (policies.google.com/privacy). Links to WhatsApp and Google open their own services.</p></section>
        <section><h2>Cookies</h2><p>We do not set advertising or analytics cookies. Embedded Google services may set their own cookies.</p></section>
        <section><h2>Contact</h2><p>For any privacy question, call {site.phones.map((p) => p.display).join(' or ')}.</p></section>
      </div>
    </article>
  );
}
