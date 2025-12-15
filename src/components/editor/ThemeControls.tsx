import { ThemeVariant } from "@/types/menu";
import { useMenuEditor } from "@/context/MenuEditorContext";


const THEMES: ThemeVariant[] = [
  "light",
  "dark",
  "elegant",
  "vintage",
  "bold",
];

export function ThemeControls() {
  const { menu, setMenu } = useMenuEditor();

  return (
    <div className="bg-white rounded-xl p-4 shadow mb-4">
      <h3 className="font-semibold mb-3">Theme</h3>

      <div className="flex gap-2 flex-wrap">
        {THEMES.map((theme) => (
          <button
            key={theme}
            onClick={() =>
              setMenu((m) => ({
                ...m,
                theme: { ...m.theme, theme },
              }))
            }
            className={`px-3 py-1 rounded border text-sm capitalize ${menu.theme.theme === theme
                ? "bg-black text-white"
                : "bg-white"
              }`}
          >
            {theme}
          </button>
        ))}

        {/* Layout Toggle */}
        <div>
          <label className="block text-sm mb-1">Layout</label>
          <div className="flex gap-2">
            <button
              onClick={() =>
                setMenu((m) => ({
                  ...m,
                  theme: {
                    ...m.theme,
                    layout: "single-column",
                  },
                }))
              }
              className={`px-3 py-1 rounded border text-sm ${menu.theme.layout === "single-column"
                  ? "bg-black text-white"
                  : "bg-white"
                }`}
            >
              Single Column
            </button>

            <button
              onClick={() =>
                setMenu((m) => ({
                  ...m,
                  theme: {
                    ...m.theme,
                    layout: "two-column",
                  },
                }))
              }
              className={`px-3 py-1 rounded border text-sm ${menu.theme.layout === "two-column"
                  ? "bg-black text-white"
                  : "bg-white"
                }`}
            >
              Two Column
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
