import { z } from "zod"

const parsed = z
  .object({
    VITE_API_URL: z.string().url(),
    VITE_APP_TITLE: z.string(),
    VITE_NODE_ENV: z.enum(["development", "production", "test"]),
  })
  .safeParse(import.meta.env)
if (!parsed.success) {
  console.error(parsed.error.message)
  throw new Error(
    "Error! Failed to read '.env' file. Did you forget to define your '.env' file or each value?",
  )
}

export const env = {
  API_TITLE: parsed.data.VITE_APP_TITLE,
  API_URL: parsed.data.VITE_API_URL,
  /**
   * Do not use. Use `import.meta.env.VITE_NODE_ENV` directly instead for DCE (Dead Code Elimination).
   */
  VITE_NODE_ENV: undefined as never,
} as const
