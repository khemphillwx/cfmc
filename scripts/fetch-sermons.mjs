/**
 * Snapshots the church's newest YouTube uploads into src/data/sermons.json so
 * the Recent Sermons section ships with real, current content — no API key and
 * no runtime dependency on YouTube.
 *
 * Runs automatically before `npm run build` (see the "prebuild" script).
 * Run it on its own any time with `npm run fetch:sermons`.
 *
 * YouTube's RSS feed needs no credentials, but it is served without CORS
 * headers, which is why this happens at build time instead of in the browser.
 */

import { writeFile, readFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/** @CarrolltonFirstMethodist */
const CHANNEL_ID = "UCGlaq1JAKKEkItED4wSj0Yw";

/**
 * The channel's "Sermons" playlist:
 * https://www.youtube.com/playlist?list=PLN4ec_iMN-G0
 *
 * Snapshotting the playlist rather than the channel's uploads keeps full
 * services, announcements, and other non-sermon videos off the home page.
 * Set SERMONS_PLAYLIST_ID="" to fall back to all channel uploads.
 */
const PLAYLIST_ID =
  process.env.SERMONS_PLAYLIST_ID?.trim() ?? "PLN4ec_iMN-G0";

const FEED_URL = PLAYLIST_ID
  ? `https://www.youtube.com/feeds/videos.xml?playlist_id=${PLAYLIST_ID}`
  : `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

/** How many to snapshot. More than the home page shows, so `count` can grow. */
const MAX_SERMONS = 6;

/** Skip Shorts and clips; full services and sermon excerpts run well past this. */
const MIN_DURATION_SECONDS = 180;

const REQUEST_TIMEOUT_MS = 10_000;
const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0 Safari/537.36";

const OUTPUT_PATH = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../src/data/sermons.json",
);

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

const ENTITIES = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&apos;": "'",
  "&#39;": "'",
};

function decodeEntities(text) {
  return text
    .replace(/&(?:amp|lt|gt|quot|apos|#39);/g, (m) => ENTITIES[m] ?? m)
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

function firstMatch(text, pattern) {
  const match = text.match(pattern);
  return match ? match[1] : "";
}

async function get(url, { as = "text" } = {}) {
  const response = await fetch(url, {
    headers: { "user-agent": USER_AGENT },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    redirect: "follow",
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return as === "head" ? response : response.text();
}

/** Runs `worker` over `items` a few at a time so we don't hammer YouTube. */
async function mapLimit(items, limit, worker) {
  const results = new Array(items.length);
  let cursor = 0;

  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await worker(items[index], index);
    }
  });

  await Promise.all(runners);
  return results;
}

/* ------------------------------------------------------------------ *
 * Feed parsing
 * ------------------------------------------------------------------ */

function parseFeed(xml) {
  return xml
    .split("<entry>")
    .slice(1)
    .map((entry) => {
      const id = firstMatch(entry, /<yt:videoId>([^<]+)<\/yt:videoId>/);
      const title = decodeEntities(
        firstMatch(entry, /<title>([\s\S]*?)<\/title>/).trim(),
      );
      const description = decodeEntities(
        firstMatch(
          entry,
          /<media:description>([\s\S]*?)<\/media:description>/,
        ).trim(),
      );

      return {
        id,
        title,
        description,
        published: firstMatch(entry, /<published>([^<]+)<\/published>/),
        thumbnail: firstMatch(entry, /<media:thumbnail url="([^"]+)"/),
      };
    })
    .filter((video) => video.id && video.title);
}

/**
 * Best effort: the watch page carries the duration and tells us whether a
 * higher-resolution thumbnail exists. Both are nice-to-have, so any failure
 * here leaves the video in the list with whatever the feed already gave us.
 */
async function enrich(video) {
  let durationSeconds = null;
  let thumbnail = video.thumbnail;

  try {
    const html = await get(`https://www.youtube.com/watch?v=${video.id}`);
    const length = firstMatch(html, /"lengthSeconds":"(\d+)"/);
    if (length) durationSeconds = Number(length);
  } catch (error) {
    console.warn(`  ! duration lookup failed for ${video.id}: ${error.message}`);
  }

  try {
    const maxres = `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`;
    const response = await fetch(maxres, {
      method: "HEAD",
      headers: { "user-agent": USER_AGENT },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (response.ok) thumbnail = maxres;
  } catch {
    // Keep the feed's hqdefault thumbnail.
  }

  return { ...video, durationSeconds, thumbnail };
}

/* ------------------------------------------------------------------ *
 * Main
 * ------------------------------------------------------------------ */

async function readExistingSnapshot() {
  try {
    const raw = await readFile(OUTPUT_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed?.videos) && parsed.videos.length > 0
      ? parsed
      : null;
  } catch {
    return null;
  }
}

async function main() {
  console.log(
    PLAYLIST_ID
      ? `Fetching the Sermons playlist (${PLAYLIST_ID})…`
      : `Fetching recent uploads for ${CHANNEL_ID}…`,
  );

  const feed = parseFeed(await get(FEED_URL));
  if (feed.length === 0) throw new Error("feed contained no videos");
  console.log(`  found ${feed.length} entries in the feed`);

  // Look at more than we need so filtering still leaves a full set.
  const candidates = feed.filter((v) => !/#shorts?\b/i.test(v.title)).slice(0, 12);
  const enriched = await mapLimit(candidates, 4, enrich);

  const videos = enriched
    .filter((video) => {
      if (video.durationSeconds === null) return true; // unknown — keep it
      if (video.durationSeconds >= MIN_DURATION_SECONDS) return true;
      console.log(`  skipping short clip (${video.durationSeconds}s): ${video.title}`);
      return false;
    })
    .slice(0, MAX_SERMONS);

  if (videos.length === 0) throw new Error("everything was filtered out");

  const snapshot = {
    channelId: CHANNEL_ID,
    generatedAt: new Date().toISOString(),
    videos,
  };

  await mkdir(dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");

  console.log(`Wrote ${videos.length} sermons to src/data/sermons.json`);
  for (const video of videos) console.log(`  · ${video.title}`);
}

main().catch(async (error) => {
  console.error(`\nCould not refresh sermons: ${error.message}`);

  // A build shouldn't fail because YouTube was unreachable — fall back to
  // whatever snapshot is already on disk.
  const existing = await readExistingSnapshot();
  if (existing) {
    console.error(
      `Keeping the existing snapshot from ${existing.generatedAt} (${existing.videos.length} sermons).`,
    );
    process.exit(0);
  }

  console.error("No previous snapshot to fall back on.");
  process.exit(1);
});
