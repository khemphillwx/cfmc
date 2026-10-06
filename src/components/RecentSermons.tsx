import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Play, Calendar, Heart, ArrowRight, X, Youtube } from "lucide-react";
import { CHANNEL_URL, getSnapshotSermons, type Sermon } from "../lib/youtube";

interface RecentSermonsProps {
  /** How many cards to show. The grid is built for multiples of three. */
  count?: number;
}

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

export default function RecentSermons({ count = 3 }: RecentSermonsProps) {
  // From the snapshot in src/data/sermons.json (refreshed daily), so real
  // sermons are on screen for the first paint — no loading state.
  const sermons = getSnapshotSermons(count);
  const [playing, setPlaying] = useState<Sermon | null>(null);

  // While the player is open: close on Escape and don't scroll the page behind it.
  useEffect(() => {
    if (!playing) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPlaying(null);
    };
    const previousOverflow = document.body.style.overflow;

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [playing]);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="max-w-2xl">
          <span className="handwritten text-church-accent mb-2 block">
            Latest Message
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-church-blue mb-6">
            Recent Sermons
          </h2>
          <p className="text-lg text-church-dark/70 leading-relaxed">
            Missed a service? Catch up on our latest traditional messages and
            scripture readings.
          </p>
        </div>
        <a
          href={CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary flex items-center gap-2 shrink-0"
        >
          View All Sermons <ArrowRight size={18} />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sermons.map((sermon) => (
          <SermonCard
            key={sermon.id}
            sermon={sermon}
            onPlay={() => setPlaying(sermon)}
          />
        ))}
      </div>

      {playing && (
        <SermonPlayer sermon={playing} onClose={() => setPlaying(null)} />
      )}
    </section>
  );
}

// `key` is declared explicitly because this project has no @types/react
// installed, so TS doesn't know React reserves it on every component.
function SermonCard({
  sermon,
  onPlay,
}: {
  key?: string | number;
  sermon: Sermon;
  onPlay: () => void;
}) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white rounded-xl overflow-hidden shadow-sm border border-black/5 flex flex-col"
    >
      <button
        type="button"
        onClick={onPlay}
        aria-label={`Play: ${sermon.title}`}
        className="relative aspect-video bg-church-blue/10 flex items-center justify-center group cursor-pointer w-full text-left"
      >
        <SermonThumbnail sermon={sermon} />
      </button>

      <div className="p-8 flex flex-col flex-1">
        {sermon.date && (
          <div className="flex items-center gap-2 text-xs text-church-accent uppercase tracking-widest mb-4 font-medium">
            <Calendar size={14} /> {dateFormat.format(sermon.date)}
          </div>
        )}
        <h3
          title={sermon.rawTitle}
          className="text-2xl font-serif text-church-blue mb-4 leading-tight line-clamp-2"
        >
          {sermon.title}
        </h3>
        {sermon.subtitle && (
          <p className="text-church-dark/60 line-clamp-2 mb-6">
            {sermon.subtitle}
          </p>
        )}

        <div className="mt-auto">
          {sermon.speaker ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-church-blue/10 flex items-center justify-center text-church-blue">
                <Heart size={14} />
              </div>
              <span className="text-sm font-medium text-church-blue">
                {sermon.speaker}
              </span>
            </div>
          ) : (
            <a
              href={sermon.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-church-blue hover:text-church-accent transition-colors"
            >
              <Youtube size={16} /> Watch on YouTube
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function SermonThumbnail({ sermon }: { sermon: Sermon }) {
  return (
    <>
      <img
        src={sermon.thumbnail}
        alt={sermon.title}
        loading="lazy"
        onError={(event) => {
          // maxres/standard art doesn't exist for every upload.
          const img = event.currentTarget;
          const fallback = `https://i.ytimg.com/vi/${sermon.id}/hqdefault.jpg`;
          if (sermon.id && img.src !== fallback) img.src = fallback;
        }}
        className="absolute inset-0 w-full h-full object-cover brightness-75 group-hover:brightness-50 transition-all"
      />
      <div className="relative z-10 w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:scale-110 transition-transform">
        <Play fill="currentColor" size={24} />
      </div>
    </>
  );
}

function SermonPlayer({
  sermon,
  onClose,
}: {
  sermon: Sermon;
  onClose: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={sermon.title}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-5xl"
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="text-white">
            <h3 className="text-xl sm:text-2xl font-serif leading-tight">
              {sermon.title}
            </h3>
            {(sermon.date || sermon.speaker) && (
              <p className="text-white/60 text-sm mt-1">
                {[sermon.date && dateFormat.format(sermon.date), sermon.speaker]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close video"
            className="shrink-0 w-10 h-10 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-church-blue transition-all"
          >
            <X size={18} />
          </button>
        </div>
        <div className="aspect-video w-full overflow-hidden rounded-xl bg-black shadow-2xl">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${sermon.id}?autoplay=1&rel=0`}
            title={sermon.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
