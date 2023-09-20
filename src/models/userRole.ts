import { z } from "zod"

export const appUserRole = "traveller"
export const dashboardUserRoles = [
  "admin",
  "assistantCurator",
  "curator",
  "finance",
] as const

export type AppUserRole = typeof appUserRole
export type DashboardUserRole = (typeof dashboardUserRoles)[number]
export type UserRole = AppUserRole | DashboardUserRole

export const zDashboardUserRole = z.union([
  z.literal("admin"),
  z.literal("assistantCurator"),
  z.literal("curator"),
  z.literal("finance"),
])
