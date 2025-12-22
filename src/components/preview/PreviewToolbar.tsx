import { useState } from "react";
import { useMenuEditor } from "@/context/MenuEditorContext";
import { exportMenuPDF } from "@/utils/pdf";
import { QrPreviewModal } from "../QrPreviewModal";
import { IoQrCodeOutline } from "react-icons/io5";
import { publishMenu } from "@/utils/api";
import { TemplateTabs } from "./TemplateTabs";

export function PreviewToolbar() {
  const { menu } = useMenuEditor();
  const [qrValue, setQrValue] = useState<string | null>(null);

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
          bg-white/70 backdrop-blur-xl
          border border-white/40
          shadow-[0_10px_30px_rgba(0,0,0,0.08)]
        "
      >
        {/* LEFT: Tabs */}
        <div className="flex-1 min-w-0">
          <TemplateTabs />
        </div>

        {/* DIVIDER */}
        <div className="hidden sm:block h-8 w-px bg-slate-300/60" />

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* QR */}
          <button
            onClick={openMenuQr}
            title="Scan to view menu"
            className="
              h-10 w-10
              rounded-xl
              bg-white/80
              border border-slate-200
              hover:bg-white
              shadow-sm
              flex items-center justify-center
              transition-all
              hover:scale-[1.04]
              active:scale-[0.97]
            "
          >
            <IoQrCodeOutline size={18} />
          </button>

          {/* PDF */}
          <button
            onClick={() => {
              const el =
                document.getElementById("menu-preview");
              if (el) exportMenuPDF(el);
            }}
            className="
              h-10 px-4
              rounded-xl
              bg-gradient-to-br from-slate-900 to-slate-800
              text-white
              text-sm font-semibold
              shadow-md
              hover:from-slate-800 hover:to-slate-700
              transition-all
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
