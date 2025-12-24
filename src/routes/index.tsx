import { createFileRoute, redirect } from "@tanstack/react-router";
import { MenuEditorProvider } from "@/context/MenuEditorContext";
import { AppLayout } from "@/components/layout/AppLayout";
import { isAuthenticated } from "@/utils/auth-guard";

function RootRouteComponent() {
  return (
    <MenuEditorProvider>
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
