import { useMemo, useState } from "react";
import { PRESETS } from "@/data/presets";
import { useMenuEditor } from "@/context/MenuEditorContext";
import { PresetPreview } from "./PresetPreview";
import { MenuPreset } from "@/types/preset";
import { nanoid } from "nanoid";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { motion } from "motion/react";
import toast from "react-hot-toast";

/** util: cheap deep clone */
const clone = <T,>(v: T): T =>
  JSON.parse(JSON.stringify(v));

export function SidebarPresets() {
  const {
    menu,
    pages,
    activePageId,
    openPageFromPreset,
    editorTheme,
  } = useMenuEditor();

  const [search, setSearch] = useState("");
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
    toast.success(`Preset "${name.trim()}" created!`);
  };

  return (
    <div className="relative flex h-full">
      {/* Sidebar */}
      <aside
        className={`
          h-full
          transition-all duration-300 ease-in-out
          text-white
          flex flex-col overflow-hidden
          ${editorTheme === "dark" ? "bg-slate-900 border-slate-700" : "bg-slate-950 border-slate-800"}
          border-r
          ${isOpen ? "w-[290px] px-4 py-4" : "w-0 px-0 py-0"}
        `}
      >
        {isOpen && (
          <>
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider opacity-60 text-slate-300">
                Templates
              </h2>
            </div>

            {/* Search */}
            <div className="mb-4">
              <div className="relative group">
                <svg className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 group-focus-within:text-blue-400 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="
                    w-full pl-9 pr-3 py-2.5 rounded-lg text-sm
                    bg-slate-800/60 border border-slate-700/50
                    placeholder:text-slate-500
                    text-slate-100
                    outline-none
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50
                    transition duration-200
                    hover:bg-slate-800/80 hover:border-slate-700
                  "
                />
              </div>
            </div>

            {/* Save preset */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={addPreset}
              className="
                mb-6 text-sm font-semibold
                rounded-lg px-4 py-2.5
                bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600
                text-white transition
                flex items-center justify-center gap-2
                shadow-lg hover:shadow-xl
              "
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Save Menu
            </motion.button>

            {/* Preset list */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
              {filteredPresets.length === 0 && (
                <div className="text-sm text-slate-400 text-center py-8 flex flex-col items-center gap-2">
                  <svg className="w-8 h-8 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <span>No templates found</span>
                </div>
              )}

              {filteredPresets.map((preset, idx) => {
                const page = pages.find(
                  (p) => p.id === preset.id
                );

                const isActive =
                  page && page.id === activePageId;

                const isOpenPage = Boolean(page);

                return (
                  <motion.button
                    key={preset.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() =>
                      openPageFromPreset(preset)
                    }
                    className="w-full px-2 py-2 text-left group transition duration-200"
                  >
                    <div
                      className={`
                        rounded-lg p-2 transition duration-300
                        ${
                          isActive
                            ? "ring-2 ring-blue-500 shadow-lg shadow-blue-500/30"
                            : isOpenPage
                            ? "ring-1 ring-slate-600 hover:ring-slate-500 hover:shadow-md"
                            : "hover:ring-1 hover:ring-slate-600 hover:shadow-md"
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
                        mt-2.5 text-xs text-center transition duration-200 font-medium
                        ${
                          isActive
                            ? "text-blue-400"
                            : isOpenPage
                            ? "text-slate-200"
                            : "text-slate-400 group-hover:text-slate-300"
                        }
                      `}
                    >
                      {preset.name}
                      {isOpenPage && !isActive && (
                        <span className="ml-1 text-slate-500">
                          • open
                        </span>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </>
        )}
      </aside>

      {/* Toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className={`
          absolute top-5 -right-5 z-20
          h-10 w-10 rounded-full
          flex items-center justify-center
          shadow-lg transition duration-300
          ${editorTheme === "dark"
            ? "bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 border border-blue-500/30"
            : "bg-slate-700 hover:bg-slate-600 border border-slate-600"
          }
          text-white hover:shadow-xl
        `}
        onClick={() => setIsOpen((v) => !v)}
        title={isOpen ? "Hide templates" : "Show templates"}
      >
        {isOpen ? (
          <FaAnglesLeft size={16} />
        ) : (
          <FaAnglesRight size={16} />
        )}
      </motion.button>
    </div>
  );
}
