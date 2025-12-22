// components/editor/BackgroundControls.tsx

import { useMenuEditor } from "@/context/MenuEditorContext";
import { uploadToCloudinary } from "@/utils/uploadImage";

export function BackgroundControls() {
  const { menu, setMenu } = useMenuEditor();
  const bg = menu.visuals?.background;

  const updateBg = (patch: any) =>
    updateMenu((m) => ({
      ...m,
      visuals: {
        ...m.visuals,
        background: {
          ...m.visuals?.background,
          ...patch,
        },
      },
    }));

  return (
    <div className="space-y-4">
      <select
        value={bg?.type ?? "none"}
        onChange={(e) => updateBg({ type: e.target.value })}
        className="w-full rounded border px-3 py-2"
      >
        <option value="none">None</option>
        <option value="image">Image</option>
        <option value="animated">Animated (GIF)</option>
      </select>

      {bg?.type !== "none" && (
        <>
          {/* Local preview */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const url = URL.createObjectURL(file);
              updateBg({ url });
            }}
          />

          {/* Upload */}
          <button
            onClick={async () => {
              const fileInput = document.createElement("input");
              fileInput.type = "file";
              fileInput.accept = "image/*";
              fileInput.onchange = async () => {
                const file = fileInput.files?.[0];
                if (!file) return;
                const url = await uploadToCloudinary(file);
                updateBg({ url });
              };
              fileInput.click();
            }}
            className="px-3 py-2 bg-black text-white rounded"
          >
            Upload to Cloudinary
          </button>

          {/* Overlay */}
          <input
            type="range"
            min={0}
            max={100}
            value={(bg?.overlay?.opacity ?? 0.3) * 100}
            onChange={(e) =>
              updateBg({
                overlay: {
                  color: "#000000",
                  opacity: Number(e.target.value) / 100,
                },
              })
            }
          />
        </>
      )}
    </div>
  );
}
