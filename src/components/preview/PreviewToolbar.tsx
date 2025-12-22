import { useState } from "react";
import { useMenuEditor } from "@/context/MenuEditorContext";
import { exportMenuPDF } from "@/utils/pdf";
import { QrPreviewModal } from "../QrPreviewModal";
import { IoQrCodeOutline, IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { publishMenu } from "@/utils/api";
import { TemplateTabs } from "./TemplateTabs";
import clsx from "clsx"

export function PreviewToolbar() {
  const {
    menu,
    editorTheme,
    toggleEditorTheme,
  } = useMenuEditor();

  const [qrValue, setQrValue] = useState<string | null>(null);
  const { saveActivePage, pages, activePageId } = useMenuEditor();
  const activePage = pages.find(p => p.id === activePageId);

  const openMenuQr = async () => {
    const { id } = await publishMenu(menu);
    setQrValue(`${window.location.origin}/menu/${id}`);
  };

  return (
    <>
      <div
        className="
          relative
          flex items-center gap-4
          px-4 py-3
          rounded-2xl
          bg-white/70 dark:bg-slate-900/70
          backdrop-blur-xl
          border border-slate-200/60 dark:border-slate-700/60
          shadow-[0_10px_30px_rgba(0,0,0,0.08)]
        "
      >
        {/* LEFT: Tabs */}
        <div className="flex-1 min-w-0">
          <TemplateTabs />
        </div>

        {/* Divider */}
        <div className="hidden sm:block h-8 w-px bg-slate-300/60 dark:bg-slate-700/60" />

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Save Button */}
          <button
            onClick={saveActivePage}
            disabled={!activePage?.isDirty}
            className={clsx(
              "h-10 px-4 rounded-xl text-sm font-semibold transition",
              activePage?.isDirty
                ? "bg-green-600 hover:bg-green-500 text-white"
                : "bg-slate-300 text-slate-500 cursor-not-allowed"
            )}
          >
            Save
          </button>
          {/* Theme toggle */}
          <button
            onClick={toggleEditorTheme}
            title="Toggle editor theme"
            className="
              h-10 w-10
              rounded-xl
              flex items-center justify-center
              bg-white dark:bg-slate-800
              border border-slate-300 dark:border-slate-700
              text-slate-700 dark:text-slate-200
              hover:bg-slate-100 dark:hover:bg-slate-700
              transition
            "
          >
            {editorTheme === "dark" ? (
              <IoSunnyOutline size={18} />
            ) : (
              <IoMoonOutline size={18} />
            )}
          </button>

          {/* QR */}
          <button
            onClick={openMenuQr}
            title="Scan to view menu"
            className="
              h-10 w-10
              rounded-xl
              flex items-center justify-center
              bg-white dark:bg-slate-800
              border border-slate-300 dark:border-slate-700
              text-slate-700 dark:text-slate-200
              hover:bg-slate-100 dark:hover:bg-slate-700
              transition
              hover:scale-[1.04]
              active:scale-[0.97]
            "
          >
            <IoQrCodeOutline size={18} />
          </button>

          {/* PDF */}
          <button
            onClick={() => {
              const el = document.getElementById("menu-preview");
              if (el) exportMenuPDF(el);
            }}
            className="
              h-10 px-4
              rounded-xl
              text-sm font-semibold
              text-white
              bg-gradient-to-br from-slate-900 to-slate-800
              dark:from-slate-100 dark:to-slate-200
              dark:text-slate-900
              shadow-md
              hover:opacity-90
              transition
              hover:scale-[1.03]
              active:scale-[0.97]
              whitespace-nowrap
            "
          >
            Export PDF
          </button>
        </div>
      </div>

      {qrValue && (
        <QrPreviewModal
          value={qrValue}
          onClose={() => setQrValue(null)}
        />
      )}
    </>
  );
}
