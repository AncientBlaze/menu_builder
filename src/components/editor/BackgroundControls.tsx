// components/editor/BackgroundControls.tsx

import { useMenuEditor } from "@/context/MenuEditorContext";
import { uploadImage } from "@/utils/upload";

export function BackgroundControls() {
  const { menu, updateMenu } = useMenuEditor();
  const bg = menu.visuals?.background;

  const updateBg = (patch: any) =>
    updateMenu({
      visuals: {
        ...menu.visuals,
        background: {
          ...menu.visuals?.background,
          ...patch,
        },
      },
    });

  return (
    <div className="space-y-4">
      <select
        value={bg?.type ?? "none"}
        onChange={(e) =>
          updateBg({
            type: e.target.value,
            previewUrl: "",
            url: "",
          })
        }
        className="w-full rounded border px-3 py-2"
      >
        <option value="none">None</option>
        <option value="image">Image</option>
        <option value="animated">Animated (GIF)</option>
      </select>

      {bg?.type !== "none" && (
        <>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              const previewUrl = URL.createObjectURL(file);

              updateBg({
                previewUrl,
              });
            }}
          />
          <button
            onClick={async () => {
              const fileInput = document.createElement("input");
              fileInput.type = "file";
              fileInput.accept = "image/*";

              fileInput.onchange = async () => {
                const file = fileInput.files?.[0];
                if (!file) return;

                const cloudUrl = await uploadImage(file);

                updateBg({
                  url: cloudUrl,  
                  previewUrl: "",
                });
              };

              fileInput.click();
            }}
            className="px-3 py-2 bg-black text-white rounded"
          >
            Upload to Cloudinary
          </button>

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
