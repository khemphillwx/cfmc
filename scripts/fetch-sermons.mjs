/**
 * Snapshots the three newest videos in the church's YouTube "Sermons" playlist
 * into src/data/sermons.json, which the home page's Recent Sermons section
 * renders. No runtime dependency on YouTube, and no API key required.
 *
 * Runs:
 *   - daily, via .github/workflows/refresh-sermons.yml, which commits the file
 *     when a new sermon appears (and that push redeploys the site)
 *   - before every `npm run build` (the "prebuild" script)
 *   - on demand with `npm run fetch:sermons`
 *
 * The playlist is kept oldest → newest (each Sunday's sermon is added to the
 * end), so "most recent" means the LAST entries in the playlist — not the first,
 * and not the upload date, since several sermons are often uploaded at once.
 *
 * Where the playlist is read from, in order of preference:
 *   1. YouTube Data API — only if YOUTUBE_API_KEY is set. Official and handles
 *      any playlist length.
 *   2. The public playlist page — no key; lists up to 100 videos.
 *   3. The public RSS feed — no key; lists only the first 15 videos, so it is
 *      only trusted while the playlist is that short.
 * A source is only used if it returns the whole playlist; otherwise the newest
 * sermons would be the ones missing.
 *
 * Pass --strict to exit non-zero when the refresh fails (the daily job does, so
 * a failure shows up in GitHub). Without it, a failure keeps the existing
 * snapshot so a build never breaks because YouTube was unreachable.
 */

import { writeFile, readFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/** @CarrolltonFirstMethodist */
const CHANNEL_ID = "UCGlaq1JAKKEkItED4wSj0Yw";

/** https://www.youtube.com/playlist?list=PLN4ec_iMN-G0 */
const PLAYLIST_ID = process.env.SERMONS_PLAYLIST_ID?.trim() || "PLN4ec_iMN-G0";

const API_KEY = process.env.YOUTUBE_API_KEY?.trim();

/** The home page shows exactly this many. */
const MAX_SERMONS = 3;

/** Skip Shorts and clips; sermons run well past this. */
const MIN_DURATION_SECONDS = 180;

/** The RSS feed never lists more than this many entries. */
const FEED_LIMIT = 15;

const STRICT = process.argv.includes("--strict");

const REQUEST_TIMEOUT_MS = 15_000;
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";

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

async function get(url) {
  const response = await fetch(url, {
    headers: { "user-agent": USER_AGENT, "accept-language": "en-US,en" },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    redirect: "follow",
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return response.text();
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
 * Playlist sources — each returns the full playlist, oldest → newest,
 * as [{ id, title, description? }], or throws.
 * ------------------------------------------------------------------ */

async function fromApi() {
  const items = [];
  let pageToken = "";

  do {
    const query = new URLSearchParams({
      part: "snippet",
      playlistId: PLAYLIST_ID,
      maxResults: "50",
      key: API_KEY,
      ...(pageToken && { pageToken }),
    });
    const page = JSON.parse(
      await get(`https://www.googleapis.com/youtube/v3/playlistItems?${query}`),
    );

    for (const item of page.items ?? []) {
      const snippet = item.snippet ?? {};
      items.push({
        id: snippet.resourceId?.videoId ?? "",
        title: snippet.title ?? "",
        description: snippet.description ?? "",
      });
    }
    pageToken = page.nextPageToken ?? "";
  } while (pageToken);

  // Private/deleted videos stay in the playlist but carry no usable metadata.
  return items.filter(
    (v) => v.id && v.title && v.title !== "Private video" && v.title !== "Deleted video",
  );
}

async function fromPlaylistPage() {
  const html = await get(`https://www.youtube.com/playlist?list=${PLAYLIST_ID}`);
  const json = html.match(/var ytInitialData = (\{.*?\});<\/script>/s)?.[1];
  if (!json) throw new Error("playlist page had no ytInitialData");
  const data = JSON.parse(json);

  const items = [];
  let total = null;
  let hasMore = false;

  // Walk the whole tree rather than a fixed path, so minor layout changes on
  // YouTube's side don't break this.
  (function walk(node) {
    if (!node || typeof node !== "object") return;

    const lockup = node.lockupViewModel;
    if (lockup?.contentType === "LOCKUP_CONTENT_TYPE_VIDEO") {
      items.push({
        id: lockup.contentId,
        title: lockup.metadata?.lockupMetadataViewModel?.title?.content ?? "",
      });
    }
    const legacy = node.playlistVideoRenderer;
    if (legacy?.videoId) {
      items.push({
        id: legacy.videoId,
        title: legacy.title?.runs?.map((r) => r.text).join("") ?? "",
      });
    }
    if (node.continuationItemRenderer) hasMore = true;

    for (const value of Object.values(node)) walk(value);
  })(data);

  const count = JSON.stringify(data).match(/"(\d[\d,]*) videos?"/);
  if (count) total = Number(count[1].replace(/,/g, ""));

  const unique = [...new Map(items.map((v) => [v.id, v])).values()].filter(
    (v) => v.id && v.title,
  );
  if (unique.length === 0) throw new Error("no videos found on the playlist page");
  if (hasMore || (total !== null && unique.length < total)) {
    throw new Error(
      `playlist page lists ${unique.length} of ${total ?? "more"} videos — set YOUTUBE_API_KEY to read the rest`,
    );
  }
  return unique;
}

async function fromFeed() {
  const xml = await get(
    `https://www.youtube.com/feeds/videos.xml?playlist_id=${PLAYLIST_ID}`,
  );
  const items = xml
    .split("<entry>")
    .slice(1)
    .map((entry) => ({
      id: firstMatch(entry, /<yt:videoId>([^<]+)<\/yt:videoId>/),
      title: decodeEntities(firstMatch(entry, /<title>([\s\S]*?)<\/title>/).trim()),
      description: decodeEntities(
        firstMatch(entry, /<media:description>([\s\S]*?)<\/media:description>/).trim(),
      ),
    }))
    .filter((v) => v.id && v.title);

  if (items.length === 0) throw new Error("feed contained no videos");
  if (items.length >= FEED_LIMIT) {
    throw new Error(
      `feed is capped at ${FEED_LIMIT} entries, so the newest sermons may be missing`,
    );
  }
  return items;
}

async function readPlaylist() {
  const sources = [
    ...(API_KEY ? [["YouTube Data API", fromApi]] : []),
    ["playlist page", fromPlaylistPage],
    ["RSS feed", fromFeed],
  ];
  const errors = [];

  for (const [name, read] of sources) {
    try {
      const items = await read();
      console.log(`  read ${items.length} videos from the ${name}`);
      return items;
    } catch (error) {
      console.warn(`  ! ${name}: ${error.message}`);
      errors.push(`${name}: ${error.message}`);
    }
  }
  throw new Error(`could not read the playlist (${errors.join("; ")})`);
}

/* ------------------------------------------------------------------ *
 * Per-video details
 * ------------------------------------------------------------------ */

/**
 * The watch page carries the description (where the sermon date lives), the
 * duration, and the upload time. A failure here is non-fatal: the video is
 * kept with whatever the playlist source already gave us.
 */
async function enrich(video) {
  let { description = "" } = video;
  let durationSeconds = null;
  let published = "";
  let thumbnail = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;

  try {
    const html = await get(`https://www.youtube.com/watch?v=${video.id}`);
    const length = firstMatch(html, /"lengthSeconds":"(\d+)"/);
    if (length) durationSeconds = Number(length);
    published = firstMatch(html, /"uploadDate":"([^"]+)"/);

    const short = html.match(/"shortDescription":("(?:[^"\\]|\\.)*")/)?.[1];
    if (short && !description) description = JSON.parse(short);
  } catch (error) {
    console.warn(`  ! details lookup failed for ${video.id}: ${error.message}`);
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
    // Keep hqdefault, which exists for every video.
  }

  return {
    id: video.id,
    title: video.title.trim(),
    description: description.trim(),
    published,
    thumbnail,
    durationSeconds,
  };
}

/* ------------------------------------------------------------------ *
 * Main
 * ------------------------------------------------------------------ */

async function readExistingSnapshot() {
  try {
    const parsed = JSON.parse(await readFile(OUTPUT_PATH, "utf8"));
    return Array.isArray(parsed?.videos) && parsed.videos.length > 0
      ? parsed
      : null;
  } catch {
    return null;
  }
}

async function main() {
  console.log(`Reading the Sermons playlist (${PLAYLIST_ID})…`);
  const playlist = await readPlaylist();

  // Newest first. Look a few past what we need so filtering still leaves a
  // full set.
  const candidates = playlist
    .filter((v) => !/#shorts?\b/i.test(v.title))
    .reverse()
    .slice(0, MAX_SERMONS + 3);
  const enriched = await mapLimit(candidates, 3, enrich);

  const videos = enriched
    .filter((video) => {
      if (video.durationSeconds === null) return true; // unknown — keep it
      if (video.durationSeconds >= MIN_DURATION_SECONDS) return true;
      console.log(`  skipping short clip (${video.durationSeconds}s): ${video.title}`);
      return false;
    })
    .slice(0, MAX_SERMONS);

  if (videos.length === 0) throw new Error("everything was filtered out");

  // Only rewrite when something changed, so the daily job doesn't commit (and
  // redeploy) just to bump a timestamp.
  const existing = await readExistingSnapshot();
  if (existing && JSON.stringify(existing.videos) === JSON.stringify(videos)) {
    console.log("No new sermons — src/data/sermons.json is already current.");
    return;
  }

  const snapshot = {
    channelId: CHANNEL_ID,
    playlistId: PLAYLIST_ID,
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
  if (STRICT) process.exit(1);

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
