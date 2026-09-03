/**
 * Supplies the Recent Sermons section with the church's newest YouTube videos.
 *
 * The list is snapshotted from YouTube's (credential-free) RSS feed at build
 * time by scripts/fetch-sermons.mjs, so the site ships with real, current
 * content and needs no API key — see the README.
 *
 * If a YouTube Data API key is ever configured in `VITE_YOUTUBE_API_KEY`, the
 * section additionally refreshes itself live in the browser, and the build-time
 * snapshot becomes the fallback. Without a key, nothing here touches the
 * network.
 */

import snapshot from "../data/sermons.json";

/** @CarrolltonFirstMethodist */
export const CHANNEL_ID = "UCGlaq1JAKKEkItED4wSj0Yw";
export const CHANNEL_URL =
  "https://www.youtube.com/@CarrolltonFirstMethodist/videos";

export interface Sermon {
  id: string;
  /** Cleaned-up display title. */
  title: string;
  /** Original YouTube title, kept for tooltips/debugging. */
  rawTitle: string;
  /** Scripture reference or short description, when we can find one. */
  subtitle: string;
  /** Preacher, when the title names one. */
  speaker: string;
  /** Date of the service, preferring a date in the title over the upload time. */
  date: Date;
  thumbnail: string;
  url: string;
  isLive: boolean;
}

/** The shape scripts/fetch-sermons.mjs writes. */
interface SnapshotVideo {
  id: string;
  title: string;
  description: string;
  published: string;
  thumbnail: string;
  durationSeconds: number | null;
}

/* ------------------------------------------------------------------ *
 * Title parsing
 * ------------------------------------------------------------------ */

/** "Rev. Travis Sneed", "Jackson Rivers" — a trailing comma-separated name. */
const SPEAKER_PATTERN =
  /^(?:(?:rev\.?|revd\.?|pastor|dr\.?|bishop|mr\.?|mrs\.?|ms\.?)\s+)?[A-Z][A-Za-z.'-]*(?:\s+[A-Z][A-Za-z.'-]*){1,3}$/;
const SPEAKER_TITLE = /\b(rev\.?|pastor|dr\.?|bishop)\b/i;

/** Recurring livestream naming, e.g. "Carrollton First Methodist Church Service 8/2/26". */
const SERVICE_PREFIX =
  /^carrollton\s+first\s+(?:methodist\s+)?(?:church\s+)?(?:worship\s+)?(?:service|worship)\b[\s:\-–—]*(.*)$/i;

/** A bare date left over after stripping the prefix, e.g. "8/2/26" or "8-2-2026". */
const BARE_DATE = /^(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{2,4})$/;

function splitSpeaker(text: string): { rest: string; speaker: string } {
  const parts = text.split(",");
  if (parts.length < 2) return { rest: text.trim(), speaker: "" };

  const candidate = parts[parts.length - 1].trim();
  const looksLikeName =
    SPEAKER_TITLE.test(candidate) ||
    (SPEAKER_PATTERN.test(candidate) && !/\d/.test(candidate));

  if (!looksLikeName) return { rest: text.trim(), speaker: "" };
  return { rest: parts.slice(0, -1).join(",").trim(), speaker: candidate };
}

function parseDateInTitle(title: string): Date | null {
  const match = title.match(/(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{2,4})/);
  if (!match) return null;

  const [, m, d, y] = match;
  const year = y.length === 2 ? 2000 + Number(y) : Number(y);
  const date = new Date(year, Number(m) - 1, Number(d));
  return Number.isNaN(date.getTime()) ? null : date;
}

/**
 * Descriptions on this channel are often just the title repeated, which would
 * make the card read the same line twice.
 */
function descriptionAddsNothing(description: string, rawTitle: string): boolean {
  const normalize = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "");
  const desc = normalize(description);
  const title = normalize(rawTitle);
  return !desc || desc === title || title.includes(desc) || desc.includes(title);
}

function firstUsefulLine(description: string): string {
  const line = description
    .split("\n")
    .map((l) => l.trim())
    .find(
      (l) => l.length > 20 && !/https?:\/\//i.test(l) && !/subscribe/i.test(l),
    );
  if (!line) return "";
  return line.length > 200 ? `${line.slice(0, 197)}…` : line;
}

export function parseSermonTitle(rawTitle: string, description = "") {
  const cleaned = rawTitle.replace(/#shorts?/gi, "").trim();

  let title = cleaned;
  let subtitle = "";

  // Preferred shape: "Sermon Title" Scripture (VERSION), Speaker
  const quoted = cleaned.match(/^["“'‘](.+?)["”'’][\s:\-–—]*(.*)$/);
  const service = cleaned.match(SERVICE_PREFIX);

  if (quoted) {
    title = quoted[1].trim();
    subtitle = quoted[2].trim();
  } else if (service) {
    const remainder = service[1].trim();
    title = "Sunday Worship Service";
    // The remainder is usually just the service date, which we render separately.
    subtitle = BARE_DATE.test(remainder) ? "" : remainder;
  }

  const { rest, speaker } = splitSpeaker(subtitle);
  subtitle = rest;

  if (!subtitle && !descriptionAddsNothing(description, rawTitle)) {
    subtitle = firstUsefulLine(description);
  }

  return { title: title || cleaned, subtitle, speaker };
}

/* ------------------------------------------------------------------ *
 * Build-time snapshot (the default source)
 * ------------------------------------------------------------------ */

function toSermon(video: SnapshotVideo, isLive = false): Sermon {
  const { title, subtitle, speaker } = parseSermonTitle(
    video.title,
    video.description,
  );

  return {
    id: video.id,
    title,
    rawTitle: video.title,
    subtitle,
    speaker,
    date: parseDateInTitle(video.title) ?? new Date(video.published),
    thumbnail:
      video.thumbnail || `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
    url: `https://www.youtube.com/watch?v=${video.id}`,
    isLive,
  };
}

/** When the bundled snapshot was taken. Useful for a staleness notice. */
export const snapshotGeneratedAt = new Date(snapshot.generatedAt);

/**
 * The sermons baked in at build time. Always available and synchronous, so the
 * section renders real content on first paint with no loading state.
 */
export function getSnapshotSermons(limit = 3): Sermon[] {
  return (snapshot.videos as SnapshotVideo[])
    .slice(0, limit)
    .map((video) => toSermon(video));
}

/* ------------------------------------------------------------------ *
 * Optional live refresh (only when an API key is configured)
 * ------------------------------------------------------------------ */

const API_KEY = import.meta.env?.VITE_YOUTUBE_API_KEY?.trim();

/**
 * Every channel has an "uploads" playlist whose ID is the channel ID with the
 * UC prefix swapped for UU. Reading a playlist costs 1 quota unit per call,
 * versus 100 for a search — so the free daily quota is effectively unlimited.
 */
export const UPLOADS_PLAYLIST_ID = `UU${CHANNEL_ID.slice(2)}`;

/**
 * The channel's "Sermons" playlist — the same source the build-time snapshot
 * uses (see scripts/fetch-sermons.mjs), so live and snapshot content match.
 * https://www.youtube.com/playlist?list=PLN4ec_iMN-G0
 */
export const SERMONS_PLAYLIST_ID = "PLN4ec_iMN-G0";

/** Optional override, e.g. to read all uploads instead of the Sermons playlist. */
const PLAYLIST_ID =
  import.meta.env?.VITE_YOUTUBE_PLAYLIST_ID?.trim() || SERMONS_PLAYLIST_ID;

const MIN_DURATION_SECONDS = 180;

export const hasLiveRefresh = Boolean(API_KEY);

interface PlaylistItem {
  snippet?: {
    title?: string;
    description?: string;
    publishedAt?: string;
    resourceId?: { videoId?: string };
    thumbnails?: Record<string, { url?: string }>;
  };
  contentDetails?: { videoId?: string; videoPublishedAt?: string };
}

interface VideoDetails {
  id?: string;
  snippet?: { liveBroadcastContent?: string };
  contentDetails?: { duration?: string };
}

function parseIsoDuration(duration: string): number {
  const match = duration.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
  if (!match) return 0;
  const [, h, m, s] = match;
  return Number(h || 0) * 3600 + Number(m || 0) * 60 + Number(s || 0);
}

function pickThumbnail(
  thumbnails: Record<string, { url?: string }> | undefined,
  videoId: string,
): string {
  for (const key of ["maxres", "standard", "high", "medium", "default"]) {
    const url = thumbnails?.[key]?.url;
    if (url) return url;
  }
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

async function getJson<T>(
  path: string,
  params: Record<string, string>,
): Promise<T> {
  const query = new URLSearchParams({ ...params, key: API_KEY as string });
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/${path}?${query}`,
  );
  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`YouTube ${path} ${response.status}: ${body.slice(0, 200)}`);
  }
  return response.json() as Promise<T>;
}

/**
 * Reads the channel live. Only usable when `VITE_YOUTUBE_API_KEY` is set;
 * throws otherwise, and on any API failure, so callers keep the snapshot.
 */
export async function fetchLiveSermons(limit = 3): Promise<Sermon[]> {
  if (!API_KEY) throw new Error("VITE_YOUTUBE_API_KEY is not set");

  // Over-fetch so filtering out Shorts and premieres still leaves enough cards.
  const playlist = await getJson<{ items?: PlaylistItem[] }>("playlistItems", {
    part: "snippet,contentDetails",
    playlistId: PLAYLIST_ID,
    maxResults: String(Math.min(50, Math.max(limit * 4, 10))),
  });

  const items = playlist.items ?? [];
  const ids = items
    .map((i) => i.contentDetails?.videoId || i.snippet?.resourceId?.videoId)
    .filter((id): id is string => Boolean(id));

  if (ids.length === 0) throw new Error("YouTube returned no videos");

  // One extra unit buys duration + live status, which is how we drop Shorts and
  // scheduled premieres that haven't aired yet.
  let details = new Map<string, VideoDetails>();
  try {
    const videos = await getJson<{ items?: VideoDetails[] }>("videos", {
      part: "contentDetails,snippet",
      id: ids.slice(0, 50).join(","),
    });
    details = new Map((videos.items ?? []).map((v) => [v.id ?? "", v]));
  } catch {
    // Non-fatal: fall through with no filtering rather than showing nothing.
  }

  const sermons: Sermon[] = [];
  for (const item of items) {
    const videoId =
      item.contentDetails?.videoId || item.snippet?.resourceId?.videoId;
    const rawTitle = item.snippet?.title?.trim();

    // Private/deleted videos stay in the playlist but carry no usable metadata.
    if (!videoId || !rawTitle) continue;
    if (rawTitle === "Private video" || rawTitle === "Deleted video") continue;

    const detail = details.get(videoId);
    const broadcast = detail?.snippet?.liveBroadcastContent ?? "none";
    if (broadcast === "upcoming") continue;

    const isLive = broadcast === "live";
    const duration = detail?.contentDetails?.duration;
    if (!isLive && duration && parseIsoDuration(duration) < MIN_DURATION_SECONDS) {
      continue;
    }

    sermons.push(
      toSermon(
        {
          id: videoId,
          title: rawTitle,
          description: item.snippet?.description ?? "",
          published:
            item.contentDetails?.videoPublishedAt ||
            item.snippet?.publishedAt ||
            new Date().toISOString(),
          thumbnail: pickThumbnail(item.snippet?.thumbnails, videoId),
          durationSeconds: duration ? parseIsoDuration(duration) : null,
        },
        isLive,
      ),
    );

    if (sermons.length >= limit) break;
  }

  if (sermons.length === 0) throw new Error("No sermons left after filtering");
  return sermons;
}
