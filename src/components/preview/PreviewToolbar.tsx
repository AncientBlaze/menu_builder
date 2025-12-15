import { useState } from "react";
import { exportMenuPDF } from "@/utils/pdf";
import { PRESETS } from "@/data/presets";
import { useMenuEditor } from "@/context/MenuEditorContext";

export function PreviewToolbar() {
  const { setMenu } = useMenuEditor();

  const [presetIndex, setPresetIndex] = useState(0);

  const applyPresetByIndex = (index: number) => {
    const preset = PRESETS[index];
    if (!preset) return;

    // deep clone to avoid shared references
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

  return (
    <div className="flex items-center justify-between bg-gray-300 rounded-lg px-4 py-2 mb-4">
      {/* View icons (future use) */}
      <div className="flex gap-2">
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
      <div className="flex items-center gap-3">
        <button
          onClick={prevPreset}
          className="px-2 py-1 bg-white rounded"
          title="Previous preset"
        >
          ◀
        </button>
        
        <span className="text-sm font-medium">
          {PRESETS[presetIndex]?.name}
        </span>


        <button
          onClick={nextPreset}
          className="px-2 py-1 bg-white rounded"
          title="Next preset"
        >
          ▶
        </button>
      </div>

      {/* Export */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            const el =
              document.getElementById("menu-preview");
            if (el) exportMenuPDF(el);
          }}
          className="px-3 py-1 bg-white rounded font-medium"
        >
          Download as PDF
        </button>
      </div>
    </div>
  );
}
