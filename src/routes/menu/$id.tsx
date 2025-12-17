import { createFileRoute } from "@tanstack/react-router";
import MenuViewer from "@/pages/MenuViewer";
import { MenuEditorProvider } from "@/context/MenuEditorContext";

export const Route = createFileRoute("/menu/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MenuEditorProvider>
      <MenuViewer />
    </MenuEditorProvider>
  );
}
