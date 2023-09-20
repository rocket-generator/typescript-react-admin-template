import axios from "axios"
import type { Either } from "fp-ts/lib/Either"
import { left, right } from "fp-ts/lib/Either"
import { env } from "src/config/env"
import type { AccessToken } from "src/models/auth"

type Request = {
  email: string
  password: string
}

type Response = {
  access_token: AccessToken
  expires_in: number
  id: string
  token_type: string
}

/**
 * POST /login
 * @package
 */
export const postLogin = async (
  params: Request,
): Promise<Either<Error, Response>> => {
  const url = new URL("/api/admin/auth/login", env.API_URL)
  try {
    const response = await axios.post(url.toString(), params, {
      headers: {
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
