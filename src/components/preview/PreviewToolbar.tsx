import { useState } from "react";
import { PRESETS } from "@/data/presets";
import { useMenuEditor } from "@/context/MenuEditorContext";
import { exportMenuPDF } from "@/utils/pdf";

import { QrPreviewModal } from "../QrPreviewModal";
import { IoQrCodeOutline } from "react-icons/io5";
import { saveMenu } from "@/utils/menuStore";

export function PreviewToolbar() {
  const { menu, setMenu } = useMenuEditor();

  const [presetIndex, setPresetIndex] = useState(0);
  const [showQr, setShowQr] = useState(false);
  const [qrValue, setQrValue] = useState<string | null>(null);

  const applyPresetByIndex = (index: number) => {
    const preset = PRESETS[index];
    if (!preset) return;
    setMenu(JSON.parse(JSON.stringify(preset.document)));
  };

  const prevPreset = () => {
    const nextIndex =
      (presetIndex - 1 + PRESETS.length) % PRESETS.length;
    setPresetIndex(nextIndex);
    applyPresetByIndex(nextIndex);
  };

  const nextPreset = () => {
    const nextIndex =
      (presetIndex + 1) % PRESETS.length;
    setPresetIndex(nextIndex);
    applyPresetByIndex(nextIndex);
  };

  // ✅ MOBILE-SAFE QR: PDF → Base64 → Viewer URL
  const openMenuQr = () => {
  const id = saveMenu(menu);
  const url = `${window.location.origin}/menu/${id}`;
  setQrValue(url);
  setShowQr(true);
  console.log(url);
  
};

  return (
    <>
      <div className="flex items-center justify-between bg-gray-300 rounded-lg px-4 py-2 mb-4">
        <div className="flex gap-2">
          <button className="px-2 py-1 bg-white rounded text-sm">≡</button>
          <button className="px-2 py-1 bg-white rounded text-sm">☰</button>
          <button className="px-2 py-1 bg-white rounded text-sm">▤</button>
        </div>

        {/* QR → Mobile PDF */}

        <div className="flex items-center gap-3">
          <button
            onClick={prevPreset}
            className="px-2 py-1 bg-white rounded"
          >
            ◀
          </button>

          <span className="text-sm font-medium">
            {menu.meta.templateName}
          </span>

          <button
            onClick={nextPreset}
            className="px-2 py-1 bg-white rounded"
          >
            ▶
          </button>
        </div>

        <span className="flex gap-2">
          <button
            onClick={openMenuQr}
            title="Scan to view PDF"
            className="px-2 py-1 bg-white rounded"
          >
            <IoQrCodeOutline />
          </button>
          <button
            onClick={() => {
              const el = document.getElementById("menu-preview");
              if (el) exportMenuPDF(el);
            }}
            className="px-3 py-1 bg-white rounded font-medium"
          >
            Download as PDF
          </button>
        </span>
      </div>

      {showQr && qrValue && (
        <QrPreviewModal
          value={qrValue}
          onClose={() => setShowQr(false)}
        />
      )}
    </>
  );
}
