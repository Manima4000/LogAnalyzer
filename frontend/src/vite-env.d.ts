/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PORT_FRONTEND: string
  readonly VITE_PORT_BACKEND: string
  readonly VITE_API_URL_FRONT: string
  readonly VITE_API_URL_BACK: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}