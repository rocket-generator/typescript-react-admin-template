import type {
  BaseRecord,
  GetListResponse,
  IDataMultipleContextProvider,
} from "@refinedev/core/dist/interfaces"
import dataProvider, {
  generateFilter,
  generateSort,
  stringify,
} from "@refinedev/simple-rest"
import axios from "axios"
import { env } from "src/config/env"
import { localStorage } from "src/external/localStorage/localStorage"
import type { AccessToken } from "src/models/auth"
import { toBearerToken } from "src/models/auth"

// initialize global httpClient instance
const httpClient = axios.create()

/**
 * Set access token to global httpClient instance
 */
export const setAuthorizationHeader = (token: AccessToken): void => {
  httpClient.defaults.headers.common["authorization"] = toBearerToken(token)
}

// Set last login info at startup
const token = localStorage.accessToken.get()
if (token) {
  setAuthorizationHeader(token)
}

const defaultDataProvider = dataProvider(
  new URL("/api/admin", env.API_URL).href,
  httpClient,
)

export const appDataProvider: IDataMultipleContextProvider = {
  default: {
    ...defaultDataProvider,
    // @ts-expect-error -- FIXME: I don't know why, but the type does not match.
    getList: async ({ filters, meta, pagination, resource, sorters }) => {
      const apiUrl = defaultDataProvider.getApiUrl()

      const url = `${apiUrl}/${resource}`
      const { current = 1, mode = "server", pageSize = 10 } = pagination ?? {}
      const { headers: headersFromMeta } = meta ?? {}

      const queryFilters = generateFilter(filters)

      const query: {
        _end?: number
        _order?: string
        _sort?: string
        _start?: number
      } = {}

      if (mode === "server") {
        query._start = (current - 1) * pageSize
        query._end = current * pageSize
      }

      const generatedSort = generateSort(sorters)
      if (generatedSort) {
        const { _order, _sort } = generatedSort
        query._sort = _sort.join(",")
        query._order = _order.join(",")
      }

      type GetListResponseToAvoidVulnerability = {
        count: number
        resources: BaseRecord[]
      }

      const { data } =
        await httpClient.get<GetListResponseToAvoidVulnerability>(
          `${url}?${stringify(query)}&${stringify(queryFilters)}`,
          {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- TODO: fix type error
            headers: headersFromMeta,
          },
        )

      return {
        data: data.resources,
        total: data.count,
      } satisfies GetListResponse
    },
  },
}
