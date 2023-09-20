import { zBrandString } from "src/utils/zod"
import type { Brand } from "utility-types"
import { z } from "zod"

export type AccessToken = Brand<string, "AccessToken">
export const zAccessToken = zBrandString<AccessToken>(z.string())

export const toBearerToken = (token: AccessToken): string => `Bearer ${token}`
