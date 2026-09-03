/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** YouTube Data API v3 key used to pull recent sermons. See README. */
  readonly VITE_YOUTUBE_API_KEY?: string;
  /** Optional: pull from a specific playlist instead of the channel's uploads. */
  readonly VITE_YOUTUBE_PLAYLIST_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
