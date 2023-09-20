import { Center, Image, Space, Stack, Title } from "@mantine/core"
import { AuthPage } from "@refinedev/mantine"
import type { ComponentProps } from "react"
import { useTitle } from "react-use"
import { publicPath } from "src/config/publicPath"
import { env } from "src/config/env"

const renderContent: ComponentProps<typeof AuthPage>["renderContent"] = (
  content,
) => {
  return (
    <Stack>
      <Center>
        <Image alt="logo" src={publicPath.logo} width={24} />
        <Space w="xs" />
        <Title order={2}>{env.API_TITLE}</Title>
      </Center>
      {content}
    </Stack>
  )
}

export const LoginPage = (): JSX.Element => {
  useTitle(`Login | ${  env.API_TITLE}`)

  return (
    <AuthPage registerLink={false} renderContent={renderContent} type="login" />
  )
}
