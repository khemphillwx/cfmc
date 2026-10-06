/**
 * Supplies the Recent Sermons section with the newest videos from the church's
 * YouTube "Sermons" playlist.
 *
 * The list is snapshotted into src/data/sermons.json by
 * scripts/fetch-sermons.mjs — daily by a GitHub Actions job, and before every
 * build — so the site ships with current content and never calls YouTube from
 * the browser. See the README.
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
  /**
   * Date of the service: from the title, else the description. Null when
   * neither has one — upload dates aren't used, since sermons are often
   * uploaded in batches days or weeks later.
   */
  date: Date | null;
  thumbnail: string;
  url: string;
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

const MONTHS = [
  "jan", "feb", "mar", "apr", "may", "jun",
  "jul", "aug", "sep", "oct", "nov", "dec",
];

function makeDate(year: number, monthIndex: number, day: number): Date | null {
  const date = new Date(year, monthIndex, day);
  return date.getMonth() === monthIndex && date.getDate() === day ? date : null;
}

/** "8/2/26", "8-2-2026", "May 31 2026", "Sept. 7, 2026", "June 14th 2026". */
function parseDate(text: string): Date | null {
  const named = text.match(
    /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+(\d{4})\b/i,
  );
  if (named) {
    const [, month, d, y] = named;
    return makeDate(Number(y), MONTHS.indexOf(month.toLowerCase()), Number(d));
  }

  const numeric = text.match(/\b(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{2,4})\b/);
  if (numeric) {
    const [, m, d, y] = numeric;
    const year = y.length === 2 ? 2000 + Number(y) : Number(y);
    return makeDate(year, Number(m) - 1, Number(d));
  }

  return null;
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
  const quoted =
    cleaned.match(/^["“](.+?)["”][\s:\-–—]*(.*)$/) ??
    cleaned.match(/^['‘](.+?)['’][\s:\-–—]*(.*)$/);
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
 * Snapshot
 * ------------------------------------------------------------------ */

function toSermon(video: SnapshotVideo): Sermon {
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
    date: parseDate(video.title) ?? parseDate(video.description),
    thumbnail:
      video.thumbnail || `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
    url: `https://www.youtube.com/watch?v=${video.id}`,
  };
}

/** When the bundled snapshot was taken. Useful for a staleness notice. */
export const snapshotGeneratedAt = new Date(snapshot.generatedAt);

/**
 * The snapshotted sermons, newest first. Synchronous, so the section renders
 * real content on first paint with no loading state.
 */
export function getSnapshotSermons(limit = 3): Sermon[] {
  return (snapshot.videos as SnapshotVideo[])
    .slice(0, limit)
    .map((video) => toSermon(video));
}
