import { useMemo, useState } from "react";
import { PRESETS } from "@/data/presets";
import { useMenuEditor } from "@/context/MenuEditorContext";
import { MenuPreset } from "@/types/preset";
import { nanoid } from "nanoid";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import clsx from "clsx";
import { MenuThumbnail } from "./MenuThumbnail";

/** util: cheap deep clone */
const clone = <T,>(v: T): T =>
  JSON.parse(JSON.stringify(v));

export function SidebarPresets() {
  const {
    menu,
    pages,
    activePageId,
    addPageFromTemplate,
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
      <aside
        className={clsx(
          "h-full flex flex-col overflow-hidden border-r transition-all duration-300",
          editorTheme === "dark"
            ? "bg-slate-900 border-slate-700 text-white"
            : "bg-slate-950 border-slate-800 text-white",
          isOpen ? "w-[290px] px-4 py-4" : "w-0 px-0 py-0"
        )}
      >
        {isOpen && (
          <>
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider opacity-60">
                Templates
              </h2>
            </div>

            {/* Search */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search templates..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  w-full px-3 py-2.5 rounded-lg text-sm
                  bg-slate-800/60 border border-slate-700/50
                  placeholder:text-slate-500
                  outline-none
                  focus:ring-2 focus:ring-blue-500
                "
              />
            </div>

            {/* Save preset */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={addPreset}
              className="
                mb-6 text-sm font-semibold
                rounded-lg px-4 py-2.5
                bg-gradient-to-r from-blue-600 to-blue-700
                text-white
                flex items-center justify-center gap-2
                shadow-lg
              "
            >
              + Save Menu
            </motion.button>

            {/* Preset list */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {/* ADD PAGE BUTTON (TOP) */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => addPageFromTemplate(PRESETS[0])} // or show modal later
                className="
    mb-4 w-full py-2 rounded-lg
    bg-gradient-to-r from-blue-600 to-blue-700
    hover:from-blue-500 hover:to-blue-600
    text-sm font-semibold text-white
    shadow-md
  "
              >
                ➕ Add New Page
              </motion.button>

              {/* TEMPLATE LIST */}
              {filteredPresets.map((preset, idx) => {
                const activePage = pages.find(
                  p =>
                    p.id === activePageId &&
                    p.document.meta.templateName === preset.name
                );

                const isActive =
                  activePage?.id === activePageId;

                return (
                  <motion.button
                    key={preset.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    onClick={() => openPageFromPreset(preset)}
                    className="w-full text-left"
                  >
                    <div
                      className={clsx(
                        "rounded-lg overflow-hidden transition bg-slate-800",
                        isActive
                          ? "ring-2 ring-blue-500"
                          : "hover:ring-1 hover:ring-slate-600"
                      )}
                    >
                      {activePage?.snapshot ? (
                        <img
                          src={activePage.snapshot}
                          className="w-full rounded-lg"
                          draggable={false}
                        />
                      ) : (
                        <MenuThumbnail document={preset.document} />
                      )}
                    </div>

                    <div
                      className={clsx(
                        "mt-2 text-xs text-center font-medium",
                        isActive
                          ? "text-blue-400"
                          : "opacity-70"
                      )}
                    >
                      {preset.name}
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
        className="
          absolute top-5 -right-5 z-20
          h-10 w-10 rounded-full
          flex items-center justify-center
          bg-blue-600 text-white shadow-lg
        "
        onClick={() => setIsOpen((v) => !v)}
      >
        {isOpen ? <FaAnglesLeft /> : <FaAnglesRight />}
      </motion.button>
    </div>
  );
}
