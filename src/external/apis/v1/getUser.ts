import axios from "axios"
import type { Either } from "fp-ts/lib/Either"
import { left, right } from "fp-ts/lib/Either"
import { env } from "src/config/env"
import type { AccessToken } from "src/models/auth"
import type { UserId } from "src/models/me.ts"
import type { OrganizationId } from "src/models/organization"

type Request = {
  accessToken: AccessToken
  id: UserId
  organizationId: OrganizationId
}

type Response = {
  // Most values are not needed, so definitions are omitted.
  country_dial_code: string
  created_at: Date
  deleted_at: unknown
  email: string
  languages_available: string[]
  last_login_at: Date
  mobile: string
  notification_token: unknown
  referrer: unknown
  soft_deleted_at: unknown
  updated_at: Date
  updated_by: string
  user_invites: unknown[]
  user_profile: UserProfile
  user_role: unknown
  user_role_id: unknown
  user_uuid: UserId
}

type UserProfile = {
  additional_preferences: string
  address: string
  admin_notes: unknown
  birthdate: Date
  country: string
  country_code: string
  created_at: Date
  deleted_at: unknown
  gender: string
  item_tags: unknown[]
  name_display: string
  name_family: string
  name_given: string
  name_middle: string
  nationality: string
  passport_country: unknown
  passport_expiry: unknown
  passport_issue: unknown
  passport_no: unknown
  postal_code: unknown
  profile_details: unknown
  profile_img: string[]
  salutation: string
  soft_deleted_at: unknown
  state: string
  twilio_chat_uid: unknown
  updated_at: Date
  updated_by: unknown
}

/**
 * GET /users/:id
 * @package
 */
export const getUser = async (
  params: Request,
): Promise<Either<Error, Response>> => {
  const url = new URL(`/users/${params.id}`, env.API_URL)
  try {
    const response = await axios.get(url.toString(), {
      headers: {
        authorization: `Bearer ${params.accessToken}`,
        "content-type": "application/json",
        "toraq-organization-id": params.organizationId,
      },
    })
    return right(response.data)
  } catch (error) {
    if (error instanceof Error) {
      return left(error)
    }
    return left(new Error(`Unexpected error: failed to fetch ${url.href}`))
  }
}
