import { Image } from "@mantine/core"
import { ThemedTitleV2 } from "@refinedev/mantine"
import type { ComponentProps } from "react"
import { env } from "src/config/env"
import { publicPath } from "src/config/publicPath"

type Props = Omit<ComponentProps<typeof ThemedTitleV2>, "icon" | "text">

export const AppTitle = (props: Props): JSX.Element => {
  return (
    <ThemedTitleV2
      {...props}
      icon={<Image alt="logo" src={publicPath.logo} width={24} />}
      text={env.API_TITLE}
    />
  )
}
