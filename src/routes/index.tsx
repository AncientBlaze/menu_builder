import { createFileRoute, redirect } from "@tanstack/react-router";
import { MenuEditorProvider } from "@/context/MenuEditorContext";
import { AppLayout } from "@/components/layout/AppLayout";
import { isAuthenticated } from "@/utils/auth-guard";
import Header from "@/components/Header";

function RootRouteComponent() {
  const isPublicRoute = ['/Landing', '/Login', '/Signup'].includes(location.pathname) || location.pathname.startsWith('/menu/');
  return (
    <MenuEditorProvider>
      {isPublicRoute ? null : <Header/>}
      <AppLayout />
    </MenuEditorProvider>
  );
}

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    if (!isAuthenticated()) {
      throw redirect({
        to: "/Landing",
      });
    }
  },
  component: RootRouteComponent,
});
