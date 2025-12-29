import { MenuMetaForm } from "./MenuMetaForm";
import { ThemeControls } from "./ThemeControls";
import { SectionsEditor } from "./SectionsEditor";
import { AppearanceControls } from "./AppearanceControl";
import { useState } from "react";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { motion } from "motion/react";
import { useMenuEditor } from "@/context/MenuEditorContext";
import { TemplateBuilder } from "../template/TemplateBuilder";

export function MenuEditor() {
  const [isOpen, setIsOpen] = useState(true);
  const { mode, setMode, editorTheme } = useMenuEditor();

  return (
    <div className="relative flex h-full">
      {/* Editor Panel */}
      <aside
        className={`
          h-full
          transition-all duration-300 ease-in-out
          overflow-y-auto
          border-r
          ${editorTheme === "dark"
            ? "bg-slate-900/50 border-slate-700/50"
            : "bg-slate-50 border-slate-200"
          }
          ${isOpen ? "w-[440px] px-5 py-6" : "w-0 px-0 py-0"}
        `}
      >
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Mode Toggle */}
            <div className="flex justify-center">
              <motion.div
                layout
                className={`
                  flex rounded-lg p-1.5 gap-1
                  ${editorTheme === "dark"
                    ? "bg-slate-800/50 border border-slate-700/50"
                    : "bg-slate-200 border border-slate-300"
                  }
                  transition duration-300
                `}
              >
                {(["menu", "template"] as const).map((m) => {
                  const active = mode === m;

                  return (
                    <motion.button
                      key={m}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setMode(m)}
                      className={`
                        px-4 py-2 text-sm rounded-md transition duration-200 font-medium
                        ${active
                          ? editorTheme === "dark"
                            ? "bg-blue-600/80 shadow-lg shadow-blue-500/30 text-white"
                            : "bg-white shadow-md text-blue-600"
                          : editorTheme === "dark"
                            ? "text-slate-300 hover:text-white hover:bg-slate-700/30"
                            : "text-slate-600 hover:text-slate-900"
                        }
                      `}
                    >
                      {m === "menu" ? "Menu" : "Template"}
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>

            {/* MENU MODE */}
            {mode === "menu" && (
              <>
                <MenuMetaForm />
                <ThemeControls />
                <AppearanceControls />
                <SectionsEditor />
              </>
            )}


            {/* TEMPLATE MODE */}
            {mode === "template" && (
              <TemplateBuilder/>
            )}
          </motion.div>
        )}
      </aside>

      {/* Collapse Toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        onClick={() => setIsOpen((v) => !v)}
        className={`
          absolute top-24 -right-5 z-20
          h-10 w-10 rounded-full
          flex items-center justify-center
          shadow-lg transition duration-300
          ${editorTheme === "dark"
            ? "bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 border border-blue-500/30"
            : "bg-slate-700 hover:bg-slate-600 border border-slate-600"
          }
          text-white hover:shadow-xl
        `}
        title={isOpen ? "Hide editor" : "Show editor"}
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
