import type { ResourceProps } from "@refinedev/core"
import { IconUsers, IconDashboard } from "@tabler/icons"

export const appResources: ResourceProps[] = [
  {
    list: "/",
    meta: {
      icon: <IconDashboard />,
      label: "Dashboard",
    },
    name: "dashboard",
  },
  {
    create: "/admin_users/create",
    edit: "/admin_users/:id/edit",
    list: "/admin_users",
    meta: {
      icon: <IconUsers />,
      label: "Admin Users",
    },
    name: "admin_users",
    show: "/admin_users/:id",
  },
  /* [RESOURCE_CRUD] */
]
