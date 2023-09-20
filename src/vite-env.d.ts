/// <reference types="vite/client" />

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- For library design reason, this type must be `interface`.
interface ImportMetaEnv {
  /**
   * Overwrite definition
   */
  [key: string]: string | undefined

  /**
   * Need to use a custom env value for environment identifier. Because:
   * - vite-node does not support import.meta.env.MODE, DEV, or PROD.
   * - AWS AppRunner can not read `VITE_USER_NODE_ENV` (`NODE_ENV`) value for some reason.
   */
  readonly VITE_NODE_ENV?: "development" | "production" | "test"
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- vite requires interface
interface ImportMeta {
  readonly env: ImportMetaEnv
}
