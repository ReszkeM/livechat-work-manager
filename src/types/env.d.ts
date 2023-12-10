/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NODE_ENV: "labs" | "production";
  readonly VITE_CLIENT_ID: string;
  readonly VITE_CLIENT_SECTET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
