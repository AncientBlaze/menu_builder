import { useMemo, useState } from "react";
import { useStore } from "@tanstack/react-store";
import { nanoid } from "nanoid";
import { motion } from "motion/react";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import toast from "react-hot-toast";

import { MenuPreset } from "@/types/preset";
import { MenuDocument } from "@/types/menu";
import { TemplateDocument } from "@/types/template";

import { useMenuEditor } from "@/context/MenuEditorContext";
import { PresetPreview } from "./PresetPreview";
import { templateStore } from "@/stores/templateStore";
import { saveTemplate } from "@/utils/api";
import { PREVIEW_MENU } from "@/data/previewMenu";

/* --------------------------------
   Utils
-------------------------------- */

const clone = <T,>(v: T): T =>
  JSON.parse(JSON.stringify(v));

function menuToTemplate(
  menu: MenuDocument,
  name: string
): TemplateDocument {
  return {
    id: crypto.randomUUID(),
    name,
    theme: menu.theme,
    visuals: menu.visuals,
    blocks: [
      {
        id: nanoid(),
        type: "header",
        text: "Restaurant Name",
      },
      {
        id: nanoid(),
        type: "sections",
        showTitle: true,
      },
    ],
    createdAt: new Date().toISOString(),
  };
}

/* --------------------------------
   Component
-------------------------------- */

export function SidebarPresets() {
  const {
    menu,
    pages,
    activePageId,
    openPageFromPreset,
    editorTheme,
  } = useMenuEditor();

  const { templates } = useStore(templateStore);

  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  /* --------------------------------
     Template-based presets ONLY
  -------------------------------- */

  const presets = useMemo<
    {
      preset: MenuPreset;
      template: TemplateDocument;
    }[]
  >(
    () =>
      templates.map((t) => ({
        preset: {
          id: t.id,
          name: t.name,
          category: "custom",
          document: {
            ...PREVIEW_MENU,
            meta: {
              ...PREVIEW_MENU.meta,
              restaurantName: t.name,
              templateName: t.name,
              templateId: t.id,
            },
            theme: t.theme,
            visuals: t.visuals,
          },
        },
        template: t,
      })),
    [templates]
  );

  const filteredPresets = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return presets;

    return presets.filter(({ preset }) =>
      preset.name.toLowerCase().includes(q)
    );
  }, [presets, search]);

  /* --------------------------------
     Save as Template
  -------------------------------- */

  const saveAsTemplate = async () => {
    const name = prompt("Template name?");
    if (!name?.trim()) return;

    const template = menuToTemplate(
      clone(menu),
      name.trim()
    );

    try {
      await saveTemplate(template);

      templateStore.setState((s) => ({
        ...s,
        templates: [template, ...s.templates],
      }));

      toast.success(`Template "${name}" saved`);
    } catch {
      toast.error("Failed to save template");
    }
  };

  /* --------------------------------
     Render
  -------------------------------- */

  return (
    <div className="relative flex h-full">
      <aside
        className={`
          h-full flex flex-col overflow-hidden
          transition-all duration-300
          border-r
          ${
            editorTheme === "dark"
              ? "bg-slate-900 border-slate-700"
              : "bg-slate-950 border-slate-800"
          }
          ${isOpen ? "w-[290px] px-4 py-4" : "w-0 px-0 py-0"}
        `}
      >
        {isOpen && (
          <>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 opacity-60 mb-5">
              Templates
            </h2>

            <input
              type="text"
              placeholder="Search templates…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                mb-4 w-full px-3 py-2 rounded-lg text-sm
                bg-slate-800/70 border border-slate-700
                text-slate-100 placeholder:text-slate-500
                outline-none focus:ring-2 focus:ring-blue-500
              "
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={saveAsTemplate}
              className="
                mb-6 py-2.5 rounded-lg text-sm font-semibold
                bg-gradient-to-r from-blue-600 to-blue-700
                hover:from-blue-500 hover:to-blue-600
                text-white shadow-lg
              "
            >
              + Save as Template
            </motion.button>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {filteredPresets.map(({ preset, template }) => {
                const page = pages.find(
                  (p) => p.id === preset.id
                );

                const isActive =
                  page?.id === activePageId;

                return (
                  <button
                    key={preset.id}
                    onClick={() => openPageFromPreset(preset)}
                    className="w-full text-left group"
                  >
                    <div
                      className={`rounded-lg p-2 transition ${
                        isActive
                          ? "ring-2 ring-blue-500 shadow-lg"
                          : "hover:ring-1 hover:ring-slate-600"
                      }`}
                    >
                      <PresetPreview
                        document={preset.document}
                        template={template}
                        active={isActive}
                      />
                    </div>

                    <div
                      className={`mt-2 text-xs text-center font-medium ${
                        isActive
                          ? "text-blue-400"
                          : "text-slate-400 group-hover:text-slate-300"
                      }`}
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

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`
          absolute top-5 -right-5 z-20
          h-10 w-10 rounded-full
          flex items-center justify-center
          shadow-lg
          ${
            editorTheme === "dark"
              ? "bg-blue-600 hover:bg-blue-500"
              : "bg-slate-700 hover:bg-slate-600"
          }
          text-white
        `}
        onClick={() => setIsOpen((v) => !v)}
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

export default SidebarPresets;
