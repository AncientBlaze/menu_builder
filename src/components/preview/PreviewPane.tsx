import { PreviewToolbar } from "./PreviewToolbar";
import { MenuPreview } from "./MenuPreview";
import { useMenuEditor } from "@/context/MenuEditorContext";
import { motion } from "motion/react";

export function PreviewPane() {
  const { editorTheme } = useMenuEditor();

  return (
    <section
      className={`
        flex-1 flex flex-col p-4
        transition-all duration-300
        ${editorTheme === "dark"
          ? "bg-slate-950"
          : "bg-slate-50"
        }
        bg-no-repeat bg-cover bg-center
      `}
    >
      {/* Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`
          rounded-xl p-3 shadow-md
          transition duration-300
          ${editorTheme === "dark"
            ? "bg-slate-900/50 border border-slate-700/50"
            : "bg-white border border-slate-200/50"
          }
        `}
      >
        <PreviewToolbar />
      </motion.div>

      {/* Preview Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`
          flex-1 overflow-auto mt-4 rounded-xl
          transition duration-300
          ${editorTheme === "dark"
            ? "bg-slate-900/50 border border-slate-700/30"
            : "bg-white border border-slate-200/50"
          }
        `}
      >
        <div className="p-4">
          <MenuPreview />
        </div>
      </motion.div>
    </section>
  );
}
