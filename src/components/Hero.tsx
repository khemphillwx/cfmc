import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { EVENTS_CALENDAR_URL } from "../lib/links";

interface HeroProps {
  title?: string;
  subtitle?: string;
  videoUrl?: string;
  imageUrl?: string;
  primaryBtnText?: string;
  primaryBtnLink?: string;
  secondaryBtnText?: string;
  secondaryBtnLink?: string;
  tertiaryBtnText?: string;
  tertiaryBtnLink?: string;
}

// Router <Link> only handles in-app routes, so external URLs (e.g. the Realm
// calendar) get a plain anchor that opens in a new tab.
function HeroButton({ to, children }: { to: string; children: React.ReactNode }) {
  const className = "btn-outline px-8 py-3 text-lg";
  if (/^https?:\/\//.test(to)) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

export default function Hero({
  title = "A Welcoming Community Following Jesus",
  subtitle,
  // Vimeo "background" mode is built for exactly this: autoplays, loops, stays
  // muted and hides every control, so the video reads as a backdrop. dnt=1 opts
  // out of Vimeo's tracking cookies.
  videoUrl = "https://player.vimeo.com/video/1225063146?background=1&autoplay=1&loop=1&muted=1&dnt=1",
  imageUrl = "https://picsum.photos/id/1018/1920/1080",
  primaryBtnText = "Join Us",
  primaryBtnLink = "/join",
  secondaryBtnText = "Events",
  secondaryBtnLink = EVENTS_CALENDAR_URL,
  tertiaryBtnText = "Give",
  tertiaryBtnLink = "/give",
}: HeroProps) {
  return (
    <section className="h-[70vh] relative lg:h-screen w-full overflow-hidden flex items-center justify-center text-center px-6">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {videoUrl ? (
          <iframe
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: "177.78vh",
              height: "56.25vw",
              minWidth: "100%",
              minHeight: "100%",
            }}
            src={videoUrl}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <img
            src={imageUrl}
            alt="Church Background"
            className="w-full h-full object-cover"
          />
        )}
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-black/0" />
        <div className="absolute inset-0 bg-linear-to-b from-black/0 via-transparent to-black/0" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl text-white font-serif mb-8 leading-tight drop-shadow-2xl"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-white/90 mb-10 font-sans max-w-2xl mx-auto drop-shadow-lg"
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <HeroButton to={primaryBtnLink}>{primaryBtnText}</HeroButton>
          <HeroButton to={secondaryBtnLink}>{secondaryBtnText}</HeroButton>
          <HeroButton to={tertiaryBtnLink}>{tertiaryBtnText}</HeroButton>
        </motion.div>
      </div>
    </section>
  );
}
