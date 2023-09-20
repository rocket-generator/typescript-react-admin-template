import { Global, MantineProvider } from "@mantine/core"
import { NotificationsProvider } from "@mantine/notifications"
import { Refine } from "@refinedev/core"
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar"
import { RefineThemes, notificationProvider } from "@refinedev/mantine"
import routerBindings, {
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6"
import { StrictMode, Suspense } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "src/components/utils/AppRoutes"
import { appAuthProvider } from "src/components/utils/appAuthProvider"
import { appDataProvider } from "src/components/utils/appDataProvider"
import { appResources } from "src/components/utils/appResources"

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- well known code
createRoot(document.querySelector("#root")!).render(
  <StrictMode>
    <Suspense fallback="loading">
      <BrowserRouter>
        <RefineKbarProvider>
          <MantineProvider
            theme={{
              ...RefineThemes.Blue,
              colorScheme: "light",
            }}
            withGlobalStyles
            withNormalizeCSS
          >
            {/* eslint-disable-next-line @typescript-eslint/naming-convention -- library-required naming */}
            <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
            <NotificationsProvider position="top-right">
              <Refine
                authProvider={appAuthProvider}
                dataProvider={appDataProvider}
                notificationProvider={notificationProvider}
                options={{
                  disableTelemetry: true,
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                }}
                resources={appResources}
                // TODO implement i18n
                // i18nProvider={i18nProvider}
                routerProvider={routerBindings}
              >
                <AppRoutes />
                <RefineKbar />
                <UnsavedChangesNotifier />
              </Refine>
            </NotificationsProvider>
          </MantineProvider>
        </RefineKbarProvider>
      </BrowserRouter>
    </Suspense>
  </StrictMode>,
)
