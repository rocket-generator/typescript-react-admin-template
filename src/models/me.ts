import { zBrandString } from "src/utils/zod"
import type { Brand } from "utility-types"
import { z } from "zod"

export type UserId = Brand<string, "UserId">
export const zUserId = zBrandString<UserId>(z.string().uuid())

export const meSchema = z.object({
  avatar: z.string().url().optional(),
  email: z.string().email(),
  id: zUserId,
  name: z.string(),
})

export type Me = z.infer<typeof meSchema>
