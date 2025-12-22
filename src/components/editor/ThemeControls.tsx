import { useMenuEditor } from "@/context/MenuEditorContext";
import { TEMPLATES } from "@/constants/templates";
import { ThemeVariant, FontFamily } from "@/types/menu";
import { GOOGLE_FONTS } from "@/constants/fonts";
import clsx from "clsx";

export function ThemeControls() {
  const { menu, setMenu } = useMenuEditor();
  const { theme } = menu;

  const updateTheme = (patch: Partial<typeof theme>) =>
    setMenu((m) => ({
      ...m,
      theme: {
        ...m.theme,
        ...patch,
      },
    }));

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm space-y-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide opacity-70">
        Visual Style
      </h3>

      {/* Theme Variant */}
      <div>
        <div className="text-xs font-medium mb-2">
          Theme
        </div>
        <div className="flex gap-2 flex-wrap">
          {Object.entries(TEMPLATES).map(([key, t]) => (
            <button
              key={key}
              onClick={() =>
                updateTheme({
                  theme: key as ThemeVariant,
                })
              }
              className={clsx(
                "px-3 py-1.5 rounded-md text-sm transition",
                theme.theme === key
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 hover:bg-slate-200"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Font Family Dropdown */}
      <div>
        <div className="text-xs font-medium mb-2">
          Font Family
        </div>

        <select
          value={theme.fontFamily}
          onChange={(e) =>
            updateTheme({
              fontFamily: e.target.value as FontFamily,
            })
          }
          className="w-full rounded-lg border bg-white px-3 py-2 text-sm"
        >
          {["serif", "sans", "display"].map((group) => (
            <optgroup key={group} label={group.toUpperCase()}>
              {GOOGLE_FONTS
                .filter((f) => f.category === group)
                .map((font) => (
                  <option
                    key={font.value}
                    value={font.value}
                    style={{ fontFamily: font.css }}
                  >
                    {font.label}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
      </div>

      {/* Accent Color */}
      <div>
        <div className="text-xs font-medium mb-2">
          Accent Color
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {["#b38b59", "#7a5c3e", "#4a7c59", "#1f2937", "#ff4d00", "#2563eb"].map(
            (color) => (
              <button
                key={color}
                onClick={() =>
                  updateTheme({
                    dividerStyle: "accent",
                    accentColor: color,
                  })
                }
                className={clsx(
                  "h-6 w-6 rounded-full border",
                  theme.accentColor === color &&
                  "ring-2 ring-slate-900"
                )}
                style={{ backgroundColor: color }}
              />
            )
          )}

          <input
            type="color"
            value={theme.accentColor}
            onChange={(e) =>
              updateTheme({
                dividerStyle: "accent",
                accentColor: e.target.value,
              })
            }
            className="h-7 w-7 rounded border cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
