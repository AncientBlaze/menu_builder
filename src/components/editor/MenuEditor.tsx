import { MenuMetaForm } from "./MenuMetaForm";
import { ThemeControls } from "./ThemeControls";
import { SectionsEditor } from "./SectionsEditor";

export function MenuEditor() {
  return (
    <aside className="w-105 bg-white p-4 overflow-y-auto">
      <MenuMetaForm />
      <ThemeControls />
      <SectionsEditor />
    </aside>
  );
}
