/// <reference types="vite/client" />

declare const VITE_APP_VERSION: string;

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_PUBLIC_KEY: string;
  readonly VITE_VOYAGE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
