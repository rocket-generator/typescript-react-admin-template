import axios from "axios"
import type { Either } from "fp-ts/lib/Either"
import { left, right } from "fp-ts/lib/Either"
import { env } from "src/config/env"
import type { AccessToken } from "src/models/auth"

type Request = {
  accessToken: AccessToken
}

type Response = {
  email: string,
  id: string,
  name: string
}

/**
 * GET /me
 * @package
 */
export const getMe = async (
  params: Request,
): Promise<Either<Error, Response>> => {
  const url = new URL(`/api/admin/me`, env.API_URL)
  try {
    const response = await axios.get(url.toString(), {
      headers: {
        authorization: `Bearer ${params.accessToken}`,
        "content-type": "application/json",
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
