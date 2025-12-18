import { useState } from "react";
import { PRESETS } from "@/data/presets";
import { useMenuEditor } from "@/context/MenuEditorContext";
import { exportMenuPDF } from "@/utils/pdf";
import { QrPreviewModal } from "../QrPreviewModal";
import { IoQrCodeOutline } from "react-icons/io5";
import { publishMenu } from "@/utils/api";

export function PreviewToolbar() {
  const { menu, setMenu } = useMenuEditor();

  const [presetIndex, setPresetIndex] = useState(0);
  const [qrValue, setQrValue] = useState<string | null>(null);

  const applyPresetByIndex = (index: number) => {
    const preset = PRESETS[index];
    if (!preset) return;
    setMenu(JSON.parse(JSON.stringify(preset.document)));
  };

  const prevPreset = () => {
    const nextIndex =
      (presetIndex - 1 + PRESETS.length) %
      PRESETS.length;
    setPresetIndex(nextIndex);
    applyPresetByIndex(nextIndex);
  };

  const nextPreset = () => {
    const nextIndex =
      (presetIndex + 1) % PRESETS.length;
    setPresetIndex(nextIndex);
    applyPresetByIndex(nextIndex);
  };

  const openMenuQr = async () => {
    const { id } = await publishMenu(menu);
    const qrUrl = `${window.location.origin}/menu/${id}`;
    setQrValue(qrUrl);
  };

  return (
    <>
      <div
        className="
          flex flex-wrap items-center justify-between
          gap-x-4 gap-y-3
          bg-slate-200
          rounded-xl
          px-4 py-3
          mb-4
        "
      >
        {/* View controls (desktop-first, hide on mobile) */}
        <div className="hidden sm:flex gap-2">
          <button className="px-2 py-1 bg-white rounded text-sm">
            ≡
          </button>
          <button className="px-2 py-1 bg-white rounded text-sm">
            ☰
          </button>
          <button className="px-2 py-1 bg-white rounded text-sm">
            ▤
          </button>
        </div>

        {/* Preset switcher */}
        <div
          className="
            flex items-center gap-2
            order-1 sm:order-none
            mx-auto sm:mx-0
          "
        >
          <button
            onClick={prevPreset}
            className="px-2 py-1 bg-white rounded"
            aria-label="Previous preset"
          >
            ◀
          </button>

          <span className="text-sm font-medium max-w-[140px] truncate text-center">
            {menu.meta.templateName}
          </span>

          <button
            onClick={nextPreset}
            className="px-2 py-1 bg-white rounded"
            aria-label="Next preset"
          >
            ▶
          </button>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={openMenuQr}
            title="Scan to view menu"
            className="
              px-2 py-2
              bg-white rounded
              flex items-center justify-center
            "
          >
            <IoQrCodeOutline size={18} />
          </button>

          <button
            onClick={() => {
              const el =
                document.getElementById("menu-preview");
              if (el) exportMenuPDF(el);
            }}
            className="
              px-3 py-2
              bg-white rounded
              text-sm font-medium
              whitespace-nowrap
            "
          >
            Download PDF
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
