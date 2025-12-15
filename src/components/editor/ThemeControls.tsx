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
            className={`px-3 py-1 rounded border text-sm capitalize ${
              menu.theme.theme === theme
                ? "bg-black text-white"
                : "bg-white"
            }`}
          >
            {theme}
          </button>
        ))}
      </div>
    </div>
  );
}
