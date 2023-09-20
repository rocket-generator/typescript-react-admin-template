import type { AuthBindings } from "@refinedev/core"
import { isRight } from "fp-ts/lib/Either"
import {
  setAuthorizationHeader,
} from "src/components/utils/appDataProvider"
import { apiV1 } from "src/external/apis/v1"
import { localStorage } from "src/external/localStorage/localStorage"
import type { Me, UserId } from "src/models/me.ts"
import { stringify } from "src/utils/object"
import { z } from "zod"

const loginParamsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

const dummyPromise = async (): Promise<void> => {
  // eslint-disable-next-line unicorn/no-useless-promise-resolve-reject -- Workaround (meaningless code) just to match the return type
  return Promise.resolve()
}

export const appAuthProvider: AuthBindings = {
  check: async () => {
    await dummyPromise()

    const user = localStorage.me.get()
    const accessToken = localStorage.accessToken.get()

    if (user == null || accessToken == null) {
      localStorage.clear()
      return {
        authenticated: false,
        redirectTo: "/login",
      }
    }
    return {
      authenticated: true,
    }
  },
  // eslint-disable-next-line @typescript-eslint/ban-types -- library requires null instead of undefined
  getIdentity: async (): Promise<Me | null> => {
    await dummyPromise()

    const user = localStorage.me.get()
    return user == null ? null : user
  },
  getPermissions: async () => {
    await dummyPromise()

    console.warn("TODO getPermissions not implemented")
  },
  login: async (params) => {
    const parsed = loginParamsSchema.safeParse(params)
    if (!parsed.success) {
      return {
        error: parsed.error,
        success: false,
      }
    }

    // login (get access token from API v1)
    const loginResponse = await apiV1.postLogin(parsed.data)
    if (!isRight(loginResponse)) {
      return {
        error: loginResponse.left,
        success: false,
      }
    }

    // get the user's own info
    console.error(loginResponse.right.id)
    const userResponse = await apiV1.getMe({
      accessToken: loginResponse.right.access_token,
    })
    if (!isRight(userResponse)) {
      return {
        error: userResponse.left,
        success: false,
      }
    }

    // store auth info to localStorage
    localStorage.accessToken.set(loginResponse.right.access_token)
    localStorage.me.set({
      avatar: undefined,
      email: userResponse.right.email,
      id: userResponse.right.id as UserId,
      name: userResponse.right.name,
    } satisfies Me)

    // set auth info to global httpClient instance
    setAuthorizationHeader(loginResponse.right.access_token)

    return {
      redirectTo: "/",
      success: true,
    }
  },
  logout: async () => {
    await dummyPromise()

    localStorage.clear()
    return {
      redirectTo: "/login",
      success: true,
    }
  },
  onError: async (error) => {
    await dummyPromise()

    console.error(error)
    if (error instanceof Error) {
      // TODO if 400 error, force logout
      return { error }
    }
    return {
      error: {
        message: stringify(error),
        name: "UnknownError",
      },
    }
  },
}
