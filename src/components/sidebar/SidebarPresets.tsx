import { useMemo, useState } from "react";
import { PRESETS } from "@/data/presets";
import { useMenuEditor } from "@/context/MenuEditorContext";
import { PresetPreview } from "./PresetPreview";
import { MenuPreset } from "@/types/preset";
import { nanoid } from "nanoid";

export function SidebarPresets() {
  const { menu, setMenu } = useMenuEditor();

  const [search, setSearch] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [userPresets, setUserPresets] = useState<MenuPreset[]>([]);

  const allPresets = useMemo(
    () => [...PRESETS, ...userPresets],
    [userPresets]
  );

  const filteredPresets = useMemo(
    () =>
      allPresets.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      ),
    [allPresets, search]
  );

  const addPreset = () => {
    const name = prompt("Preset name?");
    if (!name) return;

    const newPreset: MenuPreset = {
      id: nanoid(),
      name,
      category: "custom",
      document: {
        ...JSON.parse(JSON.stringify(menu)),
        meta: {
          ...menu.meta,
          templateName: name,
        },
      },
    };

    setUserPresets((p) => [newPreset, ...p]);
    setActiveId(newPreset.id);
  };

  return (
    <aside className="w-[260px] bg-slate-900 text-white p-3 flex flex-col">
      <h2 className="text-sm font-semibold mb-2 opacity-80">
        Templates
      </h2>

      <input
        type="text"
        placeholder="Search presets…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-3 px-2 py-1 rounded bg-slate-800 text-sm outline-none"
      />

      <button
        onClick={addPreset}
        className="mb-3 text-sm bg-blue-600 hover:bg-blue-500 rounded px-2 py-1"
      >
        + Save as Preset
      </button>

      <div className="flex-1 overflow-y-auto space-y-4">
        {filteredPresets.length === 0 && (
          <div className="text-xs opacity-60 text-center">
            No presets found
          </div>
        )}

        {filteredPresets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => {
              setActiveId(preset.id);
              setMenu(
                JSON.parse(JSON.stringify(preset.document))
              );
            }}
            className="w-full text-left"
          >
            <PresetPreview
              document={preset.document}
              active={
                activeId === preset.id ||
                menu.meta.templateName ===
                  preset.document.meta.templateName
              }
            />
            <div className="mt-1 text-xs text-center opacity-80">
              {preset.name}
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}
