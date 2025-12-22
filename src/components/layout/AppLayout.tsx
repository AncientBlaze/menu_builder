import { SidebarPresets } from "@/components/sidebar/SidebarPresets";
import { MenuEditor } from "@/components/editor/MenuEditor";
import { PreviewPane } from "@/components/preview/PreviewPane";
import { useMenuEditor } from "@/context/MenuEditorContext";
import clsx from "clsx";
import { useEffect } from "react";

export function AppLayout() {
  const { editorTheme } = useMenuEditor();
  
  useEffect(() => {
  localStorage.setItem("editor-theme", editorTheme);
}, [editorTheme]);

  return (
    <div className={clsx(
        "h-screen flex transition-colors duration-300 dark:bg-slate-900",
        editorTheme === "dark" && "dark"
      )}>
      <SidebarPresets />
      <MenuEditor />
      <PreviewPane />
    </div>
  );
}
