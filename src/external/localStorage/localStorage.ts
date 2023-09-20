import type { AccessToken } from "src/models/auth"
import type { Me } from "src/models/me.ts"
import { meSchema } from "src/models/me.ts"
import type { ZodRawShape, z } from "zod"

/**
 * For destructive changes, a version prefix is added.
 */
type StorageKey =
  | "v1/access_token"
  | "v1/current_organization_id"
  | "v1/me"

const writeObjectTo = <T extends Record<string, unknown>>(
  key: StorageKey,
  payload: T,
): void => {
  // eslint-disable-next-line no-restricted-properties -- Allow this because it is framework code
  window.localStorage.setItem(key, JSON.stringify(payload))
}
const readObjectFrom = <TZodSchema extends z.ZodObject<ZodRawShape>>(
  key: StorageKey,
  validationSchema: TZodSchema,
): z.infer<TZodSchema> | undefined => {
  // eslint-disable-next-line no-restricted-properties -- Allow this because it is framework code
  const raw = window.localStorage.getItem(key)
  if (raw == null) {
    return
  }

  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch (error) {
    console.warn(error)
    // eslint-disable-next-line no-restricted-properties -- Allow this because it is framework code
    window.localStorage.removeItem(key)
    return
  }
  const verified = validationSchema.safeParse(parsed)
  if (!verified.success) {
    // clear unexpected data.
    console.warn(verified.error)
    // eslint-disable-next-line no-restricted-properties -- Allow this because it is framework code
    window.localStorage.removeItem(key)
    return
  }
  return verified.data
}

const writePrimitiveTo = <T extends string>(
  key: StorageKey,
  payload: T,
): void => {
  // eslint-disable-next-line no-restricted-properties -- Allow this because it is framework code
  window.localStorage.setItem(key, payload)
}

const readPrimitiveFrom = <TValue extends string>(
  key: StorageKey,
): TValue | undefined => {
  // eslint-disable-next-line no-restricted-properties -- Allow this because it is framework code
  const maybe = window.localStorage.getItem(key)
  return maybe == null ? undefined : (maybe as TValue)
}

export const localStorage = {
  accessToken: {
    get: (): AccessToken | undefined => {
      return readPrimitiveFrom("v1/access_token")
    },
    set: (payload: AccessToken): void => {
      writePrimitiveTo("v1/access_token", payload)
    },
  },
  clear: (): void => {
    // eslint-disable-next-line no-restricted-properties -- Allow this because it is framework code
    window.localStorage.clear()
  },
  me: {
    get: (): Me | undefined => {
      return readObjectFrom("v1/me", meSchema)
    },
    set: (payload: Me): void => {
      writeObjectTo("v1/me", payload)
    },
  },
}
