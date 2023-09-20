import { TextInput, PasswordInput } from "@mantine/core"
import { Create, useForm } from "@refinedev/mantine"
import type { PostAdminUserRequestBody } from "src/external/apis/resources/adminUsers"

const initialValues: PostAdminUserRequestBody = {
  email: "",
  name:  "",
  password:  "",
}

export const AdminUserCreatePage = (): JSX.Element => {
  const { getInputProps, saveButtonProps } =
    useForm<PostAdminUserRequestBody>({
      initialValues,
      validate: {
        name: (value: string) => (value.length < 2 ? "Too short name" : null),
      },
    })

  return (
    <Create saveButtonProps={saveButtonProps}>
      <form>
        <TextInput
          label="Name"
          mt={8}
          placeholder="Name"
          {...getInputProps("name")}
        />
        <TextInput
          label="Email"
          mt={8}
          placeholder="Email"
          {...getInputProps("email")}
        />
        <PasswordInput
          label="Password"
          mt={8}
          placeholder="Password"
          {...getInputProps("password")}
        />
      </form>
    </Create>
  )
}
