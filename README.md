<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/6ec1e78f-db3b-401d-ad5e-c2665554f8a7

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Recent Sermons (YouTube)

The "Recent Sermons" section on the home page lists the newest videos from the
church's YouTube channel (`@CarrolltonFirstMethodist`). **No API key or account
is needed.**

Titles, dates, thumbnails, and links are pulled from YouTube's public RSS feed
by [scripts/fetch-sermons.mjs](scripts/fetch-sermons.mjs) and written to
`src/data/sermons.json`, which gets bundled into the site. That happens
automatically as part of `npm run build`, or on demand:

```
npm run fetch:sermons
```

### Keeping it current

The list refreshes **whenever the site is built**. So publishing new sermons is:

```
npm run build      # fetches the latest videos, then builds
```

…then upload `dist/` as usual. Nothing to edit by hand — the newest three
services are picked up automatically.

To make it fully hands-off, have something run that build on a schedule (a
weekly GitHub Actions cron that builds and uploads, or your host's scheduled-build
feature if it grows one). Alternatively, see *Live mode* below.

### Naming videos on YouTube

Titles are parsed to fill in the cards. Two patterns are understood:

| YouTube title | Result |
| --- | --- |
| `"Sermon Title" Genesis 11:1-9 (NIV), Rev. Travis Sneed` | title, scripture reference, and preacher all shown |
| `Carrollton First Methodist Church Service 8/2/26` | "Sunday Worship Service", dated from the title |

The first pattern makes for noticeably richer cards. Anything else is used as-is
for the title. A date in the title always wins over the upload timestamp — a
Sunday service uploaded late that night would otherwise be dated Monday.

Videos under 3 minutes and anything tagged `#shorts` are skipped, so clips and
Shorts don't crowd out the services.

### Live mode (optional)

Setting `VITE_YOUTUBE_API_KEY` makes the section *additionally* refresh itself in
the visitor's browser on every page load, so new sermons appear without a
rebuild. The bundled snapshot stays as the fallback. Only worth doing if you
can't schedule builds.

1. At <https://console.cloud.google.com/>, create a project and enable
   **YouTube Data API v3** under *APIs & Services → Library*.
2. Under *Credentials*, create an **API key**. Restrict it to *YouTube Data API
   v3*, and under application restrictions choose *Websites*, listing your domain
   plus `localhost:3000/*`.
3. Put it in `.env.local` as `VITE_YOUTUBE_API_KEY=…` and in the build
   environment wherever the site is built.

The key ships in the public JS bundle — unavoidable for a static site, which is
why the restrictions above matter. It only grants read access to public video
listings, and reading the uploads playlist costs 1 unit of the 10,000/day free
quota per page load.

Set `VITE_YOUTUBE_PLAYLIST_ID` to pull from a curated playlist instead of all
uploads (applies to live mode; the build script always reads the channel feed).

**Where things live:** data and title parsing in
[src/lib/youtube.ts](src/lib/youtube.ts), UI in
[src/components/RecentSermons.tsx](src/components/RecentSermons.tsx), build step
in [scripts/fetch-sermons.mjs](scripts/fetch-sermons.mjs).

