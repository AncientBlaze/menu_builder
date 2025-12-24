import { useState } from "react";
import { useMenuEditor } from "@/context/MenuEditorContext";
import { exportMenuPDF } from "@/utils/pdf";
import { QrPreviewModal } from "../QrPreviewModal";
import {
  IoQrCodeOutline,
  IoMoonOutline,
  IoSunnyOutline,
} from "react-icons/io5";
import { publishMenu } from "@/utils/api";
import { TemplateTabs } from "./TemplateTabs";
import { motion } from "motion/react";
import clsx from "clsx";
import { toast } from "react-hot-toast";

export function PreviewToolbar() {
  const {
    menu,
    editorTheme,
    toggleEditorTheme,
    saveActivePage,
    pages,
    activePageId,
    setRenderMode,
  } = useMenuEditor();

  const [qrValue, setQrValue] = useState<string | null>(null);

  const activePage = pages.find((p) => p.id === activePageId);

  const openMenuQr = async () => {
    try {
      const { id } = await publishMenu(menu);
      setRenderMode("qr");
      setQrValue(`${window.location.origin}/menu/${id}`);
      toast.success("QR code generated!");
    } catch (error) {
      toast.error("Failed to generate QR code");
      console.error(error);
    }
  };

  const closeQr = () => {
    setQrValue(null);
    setRenderMode("editor");
  };

  return (
    <>
      <motion.div
        className={`
          relative
          flex items-center gap-4
          px-5 py-3.5
          rounded-xl
          transition-all duration-300
          ${editorTheme === "dark"
            ? "bg-slate-800/60 border border-slate-700/50 shadow-lg shadow-slate-900/30"
            : "bg-white/70 border border-slate-200/60 shadow-lg shadow-slate-200/30"
          }
          backdrop-blur-xl
        `}
        layout
      >
        {/* LEFT: Tabs */}
        <div className="flex-1 min-w-0">
          <TemplateTabs />
        </div>

        {/* Divider */}
        <motion.div
          className={`
            hidden sm:block h-8 w-px
            transition duration-300
            ${editorTheme === "dark"
              ? "bg-slate-600/40"
              : "bg-slate-300/60"
            }
          `}
        />

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Save Button */}
          <motion.button
            whileHover={{ scale: activePage?.isDirty ? 1.04 : 1 }}
            whileTap={{ scale: activePage?.isDirty ? 0.97 : 1 }}
            onClick={saveActivePage}
            disabled={!activePage?.isDirty}
            className={clsx(
              "h-10 px-4 rounded-lg text-sm font-semibold transition duration-300 flex items-center gap-2",
              activePage?.isDirty
                ? editorTheme === "dark"
                  ? "bg-gradient-to-br from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white shadow-lg shadow-green-500/30"
                  : "bg-gradient-to-br from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white shadow-md shadow-green-300/50"
                : editorTheme === "dark"
                ? "bg-slate-700/50 text-slate-400 cursor-not-allowed"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            )}
          >
            💾 Save
          </motion.button>

          {/* Theme toggle */}
          <motion.button
            whileHover={{ scale: 1.08, rotate: 10 }}
            whileTap={{ scale: 0.95, rotate: -5 }}
            onClick={toggleEditorTheme}
            title={`Switch to ${editorTheme === "dark" ? "light" : "dark"} mode`}
            className={`
              h-10 w-10
              rounded-lg
              flex items-center justify-center
              transition duration-300
              ${editorTheme === "dark"
                ? "bg-slate-700/60 border border-slate-600/50 text-yellow-400 hover:bg-slate-600/80 shadow-lg shadow-slate-900/30"
                : "bg-slate-100/80 border border-slate-300/60 text-indigo-600 hover:bg-slate-200/80 shadow-md shadow-slate-300/30"
              }
            `}
          >
            {editorTheme === "dark" ? (
              <IoSunnyOutline size={18} />
            ) : (
              <IoMoonOutline size={18} />
            )}
          </motion.button>

          {/* QR */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={openMenuQr}
            title="Generate QR code to view menu"
            className={`
              h-10 w-10
              rounded-lg
              flex items-center justify-center
              transition duration-300
              ${editorTheme === "dark"
                ? "bg-slate-700/60 border border-slate-600/50 text-blue-400 hover:bg-slate-600/80 shadow-lg shadow-slate-900/30 hover:shadow-lg hover:shadow-blue-500/20"
                : "bg-slate-100/80 border border-slate-300/60 text-blue-600 hover:bg-slate-200/80 shadow-md shadow-slate-300/30 hover:shadow-md hover:shadow-blue-300/50"
              }
            `}
          >
            <IoQrCodeOutline size={18} />
          </motion.button>

          {/* PDF Export */}
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={async () => {
              const el = document.getElementById("menu-preview");
              if (!el) {
                toast.error("Menu not found");
                return;
              }
              try {
                setRenderMode("export");
                await exportMenuPDF(el);
                toast.success("PDF exported successfully!");
              } catch (error) {
                toast.error("Failed to export PDF");
                console.error(error);
              } finally {
                setRenderMode("editor");
              }
            }}
            className={`
              h-10 px-5
              rounded-lg
              text-sm font-semibold
              transition duration-300
              flex items-center gap-2
              whitespace-nowrap
              shadow-lg
              ${editorTheme === "dark"
                ? "bg-gradient-to-br from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-red-500/30 hover:shadow-lg hover:shadow-red-500/40"
                : "bg-gradient-to-br from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white shadow-red-300/50 hover:shadow-lg hover:shadow-red-400/60"
              }
            `}
          >
            📄 Export
          </motion.button>
        </div>
      </motion.div>

      {qrValue && (
        <QrPreviewModal value={qrValue} onClose={closeQr} />
      )}
    </>
  );
}
