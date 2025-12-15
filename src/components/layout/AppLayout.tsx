import { SidebarPresets } from "@/components/sidebar/SidebarPresets";
import { MenuEditor } from "@/components/editor/MenuEditor";
import { PreviewPane } from "@/components/preview/PreviewPane";

export function AppLayout() {
  return (
    <div className="min-h-screen h-auto flex bg-slate-200">
      <SidebarPresets />
      <MenuEditor />
      <PreviewPane />
    </div>
  );
}
