import { Group, Pagination, Table } from "@mantine/core"
import type { BaseKey } from "@refinedev/core"
import { EditButton, List, ShowButton } from "@refinedev/mantine"
import { useTable } from "@refinedev/react-table"
import type { ColumnDef } from "@tanstack/react-table"
import { flexRender } from "@tanstack/react-table"
import type { GetAdminUsers } from "src/external/apis/resources/adminUsers"

const columns: ColumnDef<GetAdminUsers[number]>[] = [
  {
    accessorKey: "id",
    header: "ID",
    id: "id",
  },
  {
    accessorKey: "name",
    header: "Name",
    id: "name",
  },
  {
    accessorKey: "email",
    header: "Email",
    id: "email",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    id: "created_at",
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
    id: "updated_at",
  },
  {
    accessorKey: "id",
    cell: ({ getValue }) => (
      <Group noWrap spacing="xs">
        <ShowButton recordItemId={getValue() as BaseKey} size="xs" />
        <EditButton recordItemId={getValue() as BaseKey} size="xs" />
      </Group>
    ),
    header: "Actions",
    id: "actions",
  },
]

export const AdminUserListPage = (): JSX.Element => {
  const {
    getHeaderGroups,
    getRowModel,
    refineCore: { current, pageCount, setCurrent },
  } = useTable({
    columns,
  })

  return (
    <List>
      <Table>
        <thead>
        {getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
              </th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody>
        {getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </Table>
      <br />
      <Pagination
        onChange={setCurrent}
        page={current}
        position="right"
        total={pageCount}
      />
    </List>
  )
}
