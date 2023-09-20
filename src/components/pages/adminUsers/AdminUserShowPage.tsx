import { Container, Text, Title } from "@mantine/core"
import { useShow } from "@refinedev/core"
import { Show } from "@refinedev/mantine"
import type { GetAdminUserResponse } from "src/external/apis/resources/adminUsers"

export const AdminUserShowPage = (): JSX.Element => {
  const { queryResult } = useShow<GetAdminUserResponse>()
  const { data, isLoading } = queryResult
  const record = data?.data

  return (
    <Show isLoading={isLoading}>
      <Container>
        <Title order={5}>ID</Title>
        <Text mt="sm">{record?.id}</Text>
      </Container>

      <Container>
        <Title mt="sm" order={5}>
          Name
        </Title>
        <Text mt="sm">{record?.name}</Text>
      </Container>

      <Container>
        <Title mt="sm" order={5}>
          Email
        </Title>
        <Text mt="sm">{record?.email}</Text>
      </Container>

      <Container>
        <Title mt="sm" order={5}>
          Created At
        </Title>
        <Text mt="sm">{record?.created_at}</Text>
      </Container>

      <Container>
        <Title mt="sm" order={5}>
          Updated At
        </Title>
        <Text mt="sm">{record?.updated_at}</Text>
      </Container>
    </Show>
  )
}
