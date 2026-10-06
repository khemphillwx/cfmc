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

The "Recent Sermons" section on the home page shows the **three newest videos in
the channel's [Sermons playlist](https://www.youtube.com/playlist?list=PLN4ec_iMN-G0)**.
**No API key or account is needed.**

[scripts/fetch-sermons.mjs](scripts/fetch-sermons.mjs) reads the playlist and
writes the newest three to `src/data/sermons.json`, which gets bundled into the
site. Run it by hand any time with:

```
npm run fetch:sermons
```

### Keeping it current (automatic)

A GitHub Actions job,
[.github/workflows/refresh-sermons.yml](.github/workflows/refresh-sermons.yml),
runs the script **every morning**. When a new sermon has been added to the
playlist, it commits the updated `sermons.json`, and that push redeploys the site
on Vercel. On days with nothing new it does nothing. To check now, open the
repo's **Actions** tab → **Refresh sermons** → **Run workflow**. If a check
fails, GitHub emails the repo owner.

The script also runs before every `npm run build`.

### Adding sermons on YouTube

- **Add each new sermon to the end of the Sermons playlist.** The playlist runs
  oldest → newest, so the site takes the last three. Upload dates aren't used,
  because several sermons are often uploaded at once.
- **Title** each video like this:

  | YouTube title | Card shows |
  | --- | --- |
  | `"Sermon Title" Genesis 11:1-9 (NIV), Rev. Travis Sneed` | title, scripture reference, and preacher |

- **Put the sermon date in the description**, e.g. `May 31 2026` (`Sept. 7,
  2026` and `9/7/26` work too). If there's no date, the card leaves the date line
  off rather than show the wrong one.

Videos under 3 minutes and anything tagged `#shorts` are skipped.

### When the playlist passes 100 videos

Without an API key, the script reads the public playlist page, which lists the
first 100 videos. Past that (roughly two years of weekly sermons) the daily job
will fail with a message saying so. To fix it, add a YouTube Data API key:

1. At <https://console.cloud.google.com/>, create a project and enable
   **YouTube Data API v3** under *APIs & Services → Library*.
2. Under *Credentials*, create an **API key** restricted to *YouTube Data API
   v3*.
3. In the GitHub repo, add it under *Settings → Secrets and variables → Actions*
   as `YOUTUBE_API_KEY`. (For local runs, set `YOUTUBE_API_KEY` in your shell.)

The key is only used by the script, never shipped to the browser, and the
script's usage is far inside the free daily quota.

**Where things live:** data and title parsing in
[src/lib/youtube.ts](src/lib/youtube.ts), UI in
[src/components/RecentSermons.tsx](src/components/RecentSermons.tsx), fetching
in [scripts/fetch-sermons.mjs](scripts/fetch-sermons.mjs).

