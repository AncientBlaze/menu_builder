import { useMemo, useState } from "react";
import { PRESETS } from "@/data/presets";
import { useMenuEditor } from "@/context/MenuEditorContext";
import { PresetPreview } from "./PresetPreview";
import { MenuPreset } from "@/types/preset";
import { nanoid } from "nanoid";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { motion } from "motion/react";

/** util: cheap deep clone */
const clone = <T,>(v: T): T =>
  JSON.parse(JSON.stringify(v));

export function SidebarPresets() {
  const { menu, setMenu } = useMenuEditor();

  const [search, setSearch] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [userPresets, setUserPresets] = useState<MenuPreset[]>([]);
  const [isOpen, setIsOpen] = useState(true);

  const allPresets = useMemo(
    () => [...PRESETS, ...userPresets],
    [userPresets]
  );

  const filteredPresets = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return allPresets;
    return allPresets.filter((p) =>
      p.name.toLowerCase().includes(q)
    );
  }, [allPresets, search]);

  const addPreset = () => {
    const name = prompt("Preset name?");
    if (!name?.trim()) return;

    const newPreset: MenuPreset = {
      id: nanoid(),
      name: name.trim(),
      category: "custom",
      document: {
        ...clone(menu),
        meta: {
          ...menu.meta,
          templateName: name.trim(),
        },
      },
    };

    setUserPresets((p) => [newPreset, ...p]);
    setActiveId(newPreset.id);
  };

  const applyPreset = (preset: MenuPreset) => {
    setActiveId(preset.id);
    setMenu(clone(preset.document));
  };

  return (
    <div className="relative flex">
      {/* Sidebar */}
      <aside
        className={`
          h-screen
          transition-all duration-300 ease-in-out
          bg-slate-950 text-white
          flex flex-col overflow-hidden
          border-r border-slate-800
          ${isOpen ? "w-[290px] px-4 py-4" : "w-0 px-0 py-0"}
        `}
      >
        {isOpen && (
          <>
            {/* Header */}
            <div className="mb-4">
              <h2 className="text-xs font-semibold uppercase tracking-wide opacity-70">
                Templates
              </h2>
            </div>

            {/* Search */}
            <div className="mb-3">
              <input
                type="text"
                placeholder="Search templates"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  w-full px-3 py-2 rounded-lg
                  bg-slate-900 text-sm
                  placeholder:text-slate-500
                  outline-none
                  focus:ring-1 focus:ring-slate-600
                "
              />
            </div>

            {/* Save preset */}
            <button
              onClick={addPreset}
              className="
                mb-4 text-sm font-medium
                rounded-lg px-3 py-2
                bg-slate-800 hover:bg-slate-700
                transition
              "
            >
              + Save current menu
            </button>

            {/* Preset list */}
            <div className="flex-1 overflow-y-auto space-y-5 pr-1">
              {filteredPresets.length === 0 && (
                <div className="text-xs opacity-50 text-center py-8">
                  No templates found
                </div>
              )}

              {filteredPresets.map((preset) => {
                const isActive =
                  activeId === preset.id ||
                  menu.meta.templateName ===
                    preset.document.meta.templateName;

                return (
                  <button
                    key={preset.id}
                    onClick={() => applyPreset(preset)}
                    className="w-full text-left group"
                  >
                    <div
                      className={`
                        rounded-xl p-1 transition
                        ${isActive
                          ? "ring-2 ring-blue-500"
                          : "hover:ring-1 hover:ring-slate-600"
                        }
                      `}
                    >
                      <PresetPreview
                        document={preset.document}
                        active={isActive}
                      />
                    </div>

                    <div
                      className={`
                        mt-2 text-xs text-center transition
                        ${isActive
                          ? "text-blue-400 font-medium"
                          : "opacity-70 group-hover:opacity-100"
                        }
                      `}
                    >
                      {preset.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </aside>

      {/* Toggle */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="
          absolute top-5 -right-4 z-20
          h-9 w-9 rounded-full
          bg-slate-800 hover:bg-slate-700
          border border-slate-700
          flex items-center justify-center
          shadow-md text-white
        "
        onClick={() => setIsOpen((v) => !v)}
        title={isOpen ? "Hide templates" : "Show templates"}
      >
        {isOpen ? (
          <FaAnglesLeft size={14} />
        ) : (
          <FaAnglesRight size={14} />
        )}
      </motion.button>
    </div>
  );
}
