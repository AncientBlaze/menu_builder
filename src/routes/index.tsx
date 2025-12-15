import { createFileRoute } from "@tanstack/react-router";
import { MenuEditorProvider } from "@/context/MenuEditorContext";
import { AppLayout } from "@/components/layout/AppLayout";

function RootRouteComponent() {
  return (
    <MenuEditorProvider>
      <AppLayout />
    </MenuEditorProvider>
  );
}

export const Route = createFileRoute("/")({
  component: RootRouteComponent,
});
