import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Page not found | Good Water for Good Life';
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <section className="container-site py-24 text-center">
      <h1 className="text-[36px]">Page not found</h1>
      <p className="mt-4">The page you are looking for does not exist.</p>
      <Link to="/" className="mt-6 inline-block underline">
        Go to homepage
      </Link>
    </section>
  );
}
