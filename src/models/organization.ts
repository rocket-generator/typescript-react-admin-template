import { zBrandString } from "src/utils/zod"
import type { Brand } from "utility-types"
import { z } from "zod"

/**
 * OrganizationId is bigint, but since it may be changed to UUID in the future, it is handled as a string.
 */
export type OrganizationId = Brand<string, "OrganizationId">
export const zOrganizationId = zBrandString<OrganizationId>(z.coerce.string())
