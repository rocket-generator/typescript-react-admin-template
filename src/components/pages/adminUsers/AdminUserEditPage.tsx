import { Container, Text, TextInput, Title } from "@mantine/core"
import { Edit, useForm } from "@refinedev/mantine"
import type { GetAdminUserResponse } from "src/external/apis/resources/adminUsers"

const initialValues: Record<keyof GetAdminUserResponse, ""> = {
  created_at: "",
  email: "",
  id: "",
  name: "",
  updated_at: "",
}

export const AdminUserEditPage = (): JSX.Element => {
  const { getInputProps, saveButtonProps } = useForm<GetAdminUserResponse>({
    initialValues,
    validate: {
      name: (value: string) => (value.length < 2 ? "Too short name" : null),
    },
  })

  return (
    <Edit canDelete saveButtonProps={saveButtonProps}>
      <form>
        <Container pt={8}>
          <Title order={5}>ID</Title>
          <Text mt="xs">{getInputProps("id").value}</Text>
        </Container>
        <Container pt={8}>
          <Title order={5}>Name</Title>
          <TextInput placeholder="Name" {...getInputProps("name")} />
        </Container>
        <Container pt={8}>
          <Title order={5}>Email</Title>
          <TextInput placeholder="Email" {...getInputProps("email")} />
        </Container>
        <Container pt={8}>
          <Title order={5}>Created At</Title>
          <Text mt="xs">{getInputProps("created_at").value}</Text>
        </Container>
        <Container pt={8}>
          <Title order={5}>Updated At</Title>
          <Text mt="xs">{getInputProps("updated_at").value}</Text>
        </Container>
      </form>
    </Edit>
  )
}
