import { useEffect, useState } from 'react';
import { useNearViewport } from '../hooks/useNearViewport';
import { ExternalLink, PenLine } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Stars from './Stars';
import GoogleG from './GoogleG';
import { site } from '../config/site';

type Review = {
  authorName: string;
  authorUri?: string;
  authorPhotoUri?: string;
  rating: number;
  relativeTime?: string;
  publishTime?: string;
  text: string;
  googleMapsUri?: string;
  ownerReply?: string;
};

type ReviewsResponse =
  | {
      configured: true;
      source: 'places' | 'gbp';
      name: string | null;
      rating: number | null;
      userRatingCount: number | null;
      googleMapsUri: string | null;
      writeReviewUri: string | null;
      reviews: Review[];
      fetchedAt: string;
    }
  | { configured: false; message: string };

type State = { status: 'loading' } | { status: 'live'; data: Extract<ReviewsResponse, { configured: true }> } | { status: 'fallback'; reason: string };

function ReviewCard({ r }: { r: Review }) {
  const [expanded, setExpanded] = useState(false);
  const long = r.text.length > 260;
  const date = r.publishTime ? new Date(r.publishTime).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : r.relativeTime;
  return (
    <article className="reveal card flex h-full flex-col p-6">
      <header className="flex items-center gap-3">
        {r.authorPhotoUri ? (
          <img src={r.authorPhotoUri} alt="" referrerPolicy="no-referrer" loading="lazy" className="h-11 w-11 rounded-full object-cover" />
        ) : (
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-100 font-semibold text-navy-900">{r.authorName.charAt(0)}</span>
        )}
        <div className="min-w-0 flex-1">
          {r.authorUri ? (
            <a href={r.authorUri} target="_blank" rel="noopener noreferrer" className="block truncate font-semibold text-navy-900 hover:underline">{r.authorName}</a>
          ) : (
            <p className="truncate font-semibold text-navy-900">{r.authorName}</p>
          )}
          <p className="text-[12.5px] text-ink-500" title={r.relativeTime}>{date}</p>
        </div>
        <GoogleG className="h-5 w-5 shrink-0" />
      </header>
      <div className="mt-4"><Stars value={r.rating} size={15} /></div>
      <p className="mt-3 flex-1 whitespace-pre-line text-[15px] leading-relaxed text-ink-700">
        {long && !expanded ? r.text.slice(0, 260).trimEnd() + '…' : r.text || <span className="italic text-ink-500">Rating only — no written review.</span>}
      </p>
      {long && (
        <button onClick={() => setExpanded(!expanded)} className="mt-3 self-start text-[13.5px] font-semibold text-aqua-700 hover:text-navy-900">
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
      {r.ownerReply && (
        <div className="mt-4 rounded-xl bg-sky-50 p-3.5 text-[13.5px] leading-relaxed text-ink-700">
          <p className="mb-1 text-[12px] font-semibold uppercase tracking-wide text-navy-900">Response from the owner</p>{r.ownerReply}
        </div>
      )}
    </article>
  );
}

export default function Reviews() {
  const [state, setState] = useState<State>({ status: 'loading' });
  const [shown, setShown] = useState(6);
  const [box, near] = useNearViewport<HTMLElement>('900px 0px');

  useEffect(() => {
    if (!near) return;
    const ctrl = new AbortController();
    fetch('/api/reviews', { signal: ctrl.signal })
      .then(async (res) => {
        const body = await res.json().catch(() => null);
        if (!res.ok || !body) throw new Error(body?.message || `HTTP ${res.status}`);
        return body as ReviewsResponse;
      })
      .then((data) => setState(data.configured ? { status: 'live', data } : { status: 'fallback', reason: data.message }))
      .catch((e) => { if (e.name !== 'AbortError') setState({ status: 'fallback', reason: String(e.message || e) }); });
    return () => ctrl.abort();
  }, [near]);

  const live = state.status === 'live' ? state.data : null;
  const rating = live?.rating ?? site.googleSnapshot.rating;
  const count = live?.userRatingCount ?? site.googleSnapshot.reviewCount;
  const readAllUrl = live?.googleMapsUri ?? site.mapsSearchUrl;

  return (
    <section ref={box} id="reviews" aria-labelledby="reviews-title" className="lazy-section bg-sky-50 py-10 sm:py-14">
      <div className="container-site">
        <SectionHeading id="reviews-title" eyebrow="Google customer reviews" title="What our customers say."
          intro="Unedited feedback from customers on our Google Business Profile — the good and the critical." />

        <div className="mt-8 grid gap-6 lg:grid-cols-[340px_1fr] lg:gap-8">
          {/* Summary */}
          <aside className="reveal card flex flex-col p-7 lg:sticky lg:top-28 lg:self-start" aria-label="Google rating summary">
            <div className="flex items-center gap-2 text-[14px] font-semibold text-navy-900"><GoogleG />Google Reviews</div>
            {state.status === 'loading' ? (
              <div className="mt-6 h-[104px] animate-pulse rounded-xl bg-sky-100" />
            ) : (
              <>
                <div className="mt-5 flex items-end gap-3">
                  <span className="font-display text-[72px] leading-[.85] text-navy-900">{rating.toFixed(1)}</span>
                  <span className="pb-1 text-[15px] text-ink-500">/ 5</span>
                </div>
                <div className="mt-3"><Stars value={rating} size={22} /></div>
                <p className="mt-3 text-[15px] text-ink-700">Based on <strong className="text-navy-900">{count.toLocaleString('en-IN')}</strong> Google reviews</p>
                {!live && <p className="mt-2 text-[12px] leading-snug text-ink-500">{site.googleSnapshot.label}. Live figures load automatically once Google is connected.</p>}
              </>
            )}
            <div className="mt-7 flex flex-col gap-2.5">
              <a href={readAllUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">Read All Reviews<ExternalLink className="h-4 w-4" /></a>
              {live?.writeReviewUri && (
                <a href={live.writeReviewUri} target="_blank" rel="noopener noreferrer" className="btn-ghost"><PenLine className="h-4 w-4" />Write a review</a>
              )}
            </div>
          </aside>

          {/* Review list */}
          <div>
            {state.status === 'loading' && (
              <div className="grid gap-5 md:grid-cols-2">{[0, 1, 2, 3].map((i) => <div key={i} className="card h-56 animate-pulse bg-white" />)}</div>
            )}

            {live && live.reviews.length > 0 && (
              <>
                <div className="grid gap-5 md:grid-cols-2">{live.reviews.slice(0, shown).map((r, i) => <ReviewCard key={i} r={r} />)}</div>
                {live.reviews.length > shown && (
                  <div className="mt-8 text-center">
                    <button onClick={() => setShown((n) => n + 6)} className="btn-ghost">Show more reviews ({live.reviews.length - shown} more)</button>
                  </div>
                )}
                <p className="mt-5 text-[12.5px] leading-relaxed text-ink-500">
                  {live.source === 'places'
                    ? 'Reviews from Google Maps. Google provides up to five reviews selected by its own relevance ranking; we do not filter, edit or choose them. '
                    : 'All reviews from our Google Business Profile, newest first, shown unedited and unfiltered. '}
                  See all {count.toLocaleString('en-IN')} reviews, including critical ones, on{' '}
                  <a href={readAllUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-navy-900">Google Maps</a>.
                </p>
              </>
            )}

            {live && live.reviews.length === 0 && (
              <div className="card p-8 text-center text-ink-500">Google did not return any review text right now. <a className="font-semibold text-aqua-700 underline" href={readAllUrl} target="_blank" rel="noopener noreferrer">Read reviews on Google</a>.</div>
            )}

            {state.status === 'fallback' && (
              <div className="space-y-5">
                <div className="card flex flex-col items-center gap-4 p-10 text-center">
                  <GoogleG className="h-10 w-10" />
                  <h3 className="text-[24px]">Read our reviews on Google</h3>
                  <p className="max-w-md text-[15px] leading-relaxed text-ink-500">
                    See every review our customers have left — including detailed feedback on our products and service — directly on our Google Business Profile.
                  </p>
                  <a href={readAllUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mt-2">Open Google Reviews<ExternalLink className="h-4 w-4" /></a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
