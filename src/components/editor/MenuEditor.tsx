import { MenuMetaForm } from "./MenuMetaForm";
import { ThemeControls } from "./ThemeControls";
import { SectionsEditor } from "./SectionsEditor";
import { useState } from "react";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { motion } from "motion/react";

export function MenuEditor() {
  const [isOpen, setIsOpen] = useState(true);

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
            {/* Meta */}
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <MenuMetaForm />
            </div>

            {/* Theme */}
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <ThemeControls />
            </div>

            {/* Sections */}
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <SectionsEditor />
            </div>
          </div>
        )}
      </aside>

      {/* Toggle */}
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
