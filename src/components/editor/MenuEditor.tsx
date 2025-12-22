import { MenuMetaForm } from "./MenuMetaForm";
import { ThemeControls } from "./ThemeControls";
import { SectionsEditor } from "./SectionsEditor";
import { useState } from "react";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { motion } from "motion/react";
import { useMenuEditor } from "@/context/MenuEditorContext";
import { TemplateControls } from "./TemplateControls";



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
          bg-slate-50
          border-r border-slate-200
          overflow-y-auto
          ${isOpen ? "w-[440px] px-5 py-6" : "w-0 px-0 py-0"}
        `}
      >
        {isOpen && (
          <div className="space-y-6">
            {/* Mode Toggle */}
            <div className="flex justify-center">
              <div className="flex bg-slate-200 rounded-lg p-1">
                {(["menu", "template"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`
                      px-4 py-1.5 text-sm rounded-md transition
                      ${mode === m
                        ? "bg-white shadow font-medium"
                        : "opacity-70 hover:opacity-100"
                      }
                    `}
                  >
                    {m === "menu" ? "Menu" : "Template"}
                  </button>
                ))}
              </div>
            </div>

            {/* MENU MODE */}
            {mode === "menu" && (
              <>
                <div className="bg-white rounded-2xl shadow-sm p-5">
                  <MenuMetaForm />
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-5">
                  <ThemeControls />
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-5">
                  <SectionsEditor />
                </div>
              </>
            )}

            {/* TEMPLATE MODE */}
            {mode === "template" && <TemplateControls />}

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
          bg-slate-800 hover:bg-slate-700
          text-white
          border border-slate-700
          shadow-md
          flex items-center justify-center
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
