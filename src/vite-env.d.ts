/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_GPT_API: string;
  readonly VITE_ASSISTANT_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
