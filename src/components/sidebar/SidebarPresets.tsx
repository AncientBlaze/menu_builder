import { PRESETS } from "@/data/presets";
import { useMenuEditor } from "@/context/MenuEditorContext";

export function SidebarPresets() {
  const { setMenu } = useMenuEditor();

  return (
    <aside className="w-55 bg-slate-900 text-white p-3">
      <h2 className="text-sm font-semibold mb-3 opacity-80">
        Presets
      </h2>

      <div className="space-y-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() =>
              setMenu(
                JSON.parse(JSON.stringify(preset.document))
              )
            }
            className="w-full text-left px-3 py-2 rounded bg-slate-800 hover:bg-slate-700"
          >
            <div className="text-sm font-medium">
              {preset.name}
            </div>
            <div className="text-xs opacity-60 capitalize">
              {preset.category}
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}
