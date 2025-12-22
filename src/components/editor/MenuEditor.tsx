import { MenuMetaForm } from "./MenuMetaForm";
import { ThemeControls } from "./ThemeControls";
import { SectionsEditor } from "./SectionsEditor";
import { TemplateControls } from "./TemplateControls";
import { useState } from "react";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { motion } from "motion/react";
import { useMenuEditor } from "@/context/MenuEditorContext";

export function MenuEditor() {
  const [isOpen, setIsOpen] = useState(true);
  const { mode, setMode } = useMenuEditor();

  return (
    <div className="relative flex">
      {/* Editor Panel */}
      <aside
        className={`
          h-screen
          transition-all duration-300 ease-in-out
          overflow-y-auto
          border-r
          bg-slate-50 dark:bg-slate-950
          border-slate-200 dark:border-slate-800
          ${isOpen ? "w-[440px] px-5 py-6" : "w-0 px-0 py-0"}
        `}
      >
        {isOpen && (
          <div className="space-y-6">
            {/* Mode Toggle */}
            <div className="flex justify-center">
              <div
                className="
                  flex rounded-lg p-1
                  bg-slate-200 dark:bg-slate-900
                  border border-slate-300 dark:border-slate-700
                "
              >
                {(["menu", "template"] as const).map((m) => {
                  const active = mode === m;

                  return (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className={`
                        px-4 py-1.5 text-sm rounded-md transition
                        ${
                          active
                            ? "bg-white dark:bg-slate-800 shadow font-medium text-slate-900 dark:text-slate-100"
                            : "opacity-70 hover:opacity-100 text-slate-700 dark:text-slate-300"
                        }
                      `}
                    >
                      {m === "menu" ? "Menu" : "Template"}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* MENU MODE */}
            {mode === "menu" && (
              <>
                <div
                  className="
                    rounded-2xl p-5
                    bg-white dark:bg-slate-900
                    shadow-sm
                    border border-slate-200 dark:border-slate-800
                  "
                >
                  <MenuMetaForm />
                </div>

                <div
                  className="
                    rounded-2xl p-5
                    bg-white dark:bg-slate-900
                    shadow-sm
                    border border-slate-200 dark:border-slate-800
                  "
                >
                  <ThemeControls />
                </div>

                <div
                  className="
                    rounded-2xl p-5
                    bg-white dark:bg-slate-900
                    shadow-sm
                    border border-slate-200 dark:border-slate-800
                  "
                >
                  <SectionsEditor />
                </div>
              </>
            )}

            {/* TEMPLATE MODE */}
            {mode === "template" && (
              <div
                className="
                  rounded-2xl p-5
                  bg-white dark:bg-slate-900
                  shadow-sm
                  border border-slate-200 dark:border-slate-800
                "
              >
                <TemplateControls />
              </div>
            )}
          </div>
        )}
      </aside>

      {/* Collapse Toggle */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        onClick={() => setIsOpen((v) => !v)}
        className="
          absolute top-24 -right-4 z-20
          h-9 w-9 rounded-full
          flex items-center justify-center
          shadow-md
          bg-slate-800 hover:bg-slate-700
          dark:bg-slate-700 dark:hover:bg-slate-600
          text-white
          border border-slate-700 dark:border-slate-600
        "
        title={isOpen ? "Hide editor" : "Show editor"}
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
