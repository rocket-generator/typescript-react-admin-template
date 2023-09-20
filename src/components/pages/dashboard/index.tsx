import { env } from "src/config/env"

export const DashboardPage = (): JSX.Element => {
  return <div>Welcome to {env.API_TITLE} CMS!</div>
}
