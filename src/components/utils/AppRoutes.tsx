import { Authenticated, ErrorComponent } from "@refinedev/core"
import { ThemedLayoutV2 } from "@refinedev/mantine"
import {
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router-v6"
import { Outlet, Route, Routes } from "react-router-dom"
import { AppTitle } from "src/components/atoms/AppTitle"
import { DashboardPage } from "src/components/pages/dashboard"
import { LoginPage } from "src/components/pages/login"

import { AdminUserListPage } from "src/components/pages/adminUsers/AdminUserListPage"
import { AdminUserEditPage } from "src/components/pages/adminUsers/AdminUserEditPage.tsx";
import { AdminUserCreatePage } from "src/components/pages/adminUsers/AdminUserCreatePage.tsx";
import { AdminUserShowPage } from "src/components/pages/adminUsers/AdminUserShowPage.tsx";

/* [RESOURCE_CRUD_IMPORT] */

export const AppRoutes = (): JSX.Element => {
  const resourceRoutes: JSX.Element[] = [
    (
      <Route key="admin_users" path="/admin_users">
        <Route element={<AdminUserCreatePage/>} path="create"/>
        <Route element={<AdminUserListPage/>} index/>
        <Route element={<AdminUserEditPage/>} path=":id/edit"/>
        <Route element={<AdminUserShowPage/>} path=":id"/>
      </Route>
    ),
    /* [RESOURCE_CRUD_ROUTES] */
  ]

  return (
    <Routes>
      <Route
        element={
          <Authenticated fallback={<CatchAllNavigate to="/login"/>} v3LegacyAuthProviderCompatible>
            <ThemedLayoutV2
              // TODO impl Header component
              // Header={() => <Header />}
              Title={({collapsed}) => <AppTitle collapsed={collapsed}/>}
            >
              <Outlet/>
            </ThemedLayoutV2>
          </Authenticated>
        }
      >
        <Route element={<DashboardPage/>} index/>

        {resourceRoutes}

        {/* fallback all 404 paths */}
        <Route element={<ErrorComponent/>} path="*"/>
      </Route>

      <Route
        element={
          <Authenticated fallback={<Outlet/>}>
            <NavigateToResource/>
          </Authenticated>
        }
      >
        <Route element={<LoginPage/>} path="/login"/>
      </Route>
    </Routes>
  )
}
