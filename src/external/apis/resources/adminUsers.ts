import type { Iso8601DateString } from "src/utils/date.ts"

// TODO auto generate from server-side code

export type GetAdminUsers = {
  app_api_key: string
  created_at: Iso8601DateString
  id: string
  name: string
  updated_at: Iso8601DateString
}[]

export type GetAdminUserResponse = {
  created_at: Iso8601DateString
  email: string,
  id: string
  name: string
  updated_at: Iso8601DateString
}

export type PostAdminUserRequestBody = {
  email: string
  name: string
  password: string
}

export type PutAdminUserRequestBody = {
  email: string
  name: string
}
