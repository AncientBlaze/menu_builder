import { useMenuEditor } from "@/context/MenuEditorContext";
import { TEMPLATES } from "@/constants/templates";
import { ThemeVariant, FontFamily } from "@/types/menu";
import { GOOGLE_FONTS } from "@/constants/fonts";
import clsx from "clsx";

export function ThemeControls() {
  const { menu, updateMenu} = useMenuEditor();
  const { theme } = menu;

  const updateTheme = (patch: Partial<typeof theme>) =>
    updateMenu(({
      theme: {
        ...theme,
        ...patch,
      },
    }));

  return (
    <div
      className="
        rounded-2xl p-5 space-y-6
        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-800
        shadow-sm
      "
    >
      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
        Visual Style
      </h3>

      {/* Theme Variant */}
      <div>
        <div className="text-xs font-medium mb-2 text-slate-800 dark:text-slate-200">
          Theme
        </div>

        <div className="flex gap-2 flex-wrap">
          {Object.entries(TEMPLATES).map(([key, t]) => {
            const active = theme.theme === key;

            return (
              <button
                key={key}
                onClick={() =>
                  updateTheme({
                    theme: key as ThemeVariant,
                  })
                }
                className={clsx(
                  `
                  px-3 py-1.5 rounded-md text-sm
                  border transition
                  `,
                  active
                    ? `
                      bg-slate-900 text-white
                      dark:bg-slate-100 dark:text-slate-900
                      border-slate-900 dark:border-slate-100
                    `
                    : `
                      bg-slate-100 hover:bg-slate-200
                      dark:bg-slate-800 dark:hover:bg-slate-700
                      text-slate-700 dark:text-slate-300
                      border-slate-200 dark:border-slate-700
                    `
                )}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Font Family */}
      <div>
        <div className="text-xs font-medium mb-2 text-slate-800 dark:text-slate-200">
          Font Family
        </div>

        <select
          value={theme.fontFamily}
          onChange={(e) =>
            updateTheme({
              fontFamily: e.target.value as FontFamily,
            })
          }
          className="
            w-full rounded-lg px-3 py-2 text-sm
            bg-white dark:bg-slate-800
            border border-slate-300 dark:border-slate-700
            text-slate-900 dark:text-slate-100
            focus:outline-none focus:ring-2 focus:ring-slate-400
          "
        >
          {["serif", "sans", "display"].map((group) => (
            <optgroup
              key={group}
              label={group.toUpperCase()}
              className="text-slate-600 dark:text-slate-400"
            >
              {GOOGLE_FONTS
                .filter((f) => f.category === group)
                .map((font) => (
                  <option
                    key={font.value}
                    value={font.value}
                    style={{ fontFamily: font.css }}
                    className="text-slate-900 dark:text-slate-900"
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
        <div className="text-xs font-medium mb-2 text-slate-800 dark:text-slate-200">
          Accent Color
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {[
            "#b38b59",
            "#7a5c3e",
            "#4a7c59",
            "#1f2937",
            "#ff4d00",
            "#2563eb",
          ].map((color) => {
            const active = theme.accentColor === color;

            return (
              <button
                key={color}
                onClick={() =>
                  updateTheme({
                    dividerStyle: "accent",
                    accentColor: color,
                  })
                }
                className={clsx(
                  `
                  h-7 w-7 rounded-full
                  border transition
                  `,
                  active
                    ? "ring-2 ring-offset-2 ring-slate-900 dark:ring-slate-100"
                    : "border-slate-300 dark:border-slate-700"
                )}
                style={{ backgroundColor: color }}
                title={color}
              />
            );
          })}

          <input
            type="color"
            value={theme.accentColor}
            onChange={(e) =>
              updateTheme({
                dividerStyle: "accent",
                accentColor: e.target.value,
              })
            }
            className="
              h-8 w-8 rounded
              border border-slate-300 dark:border-slate-700
              bg-transparent cursor-pointer
            "
            title="Custom color"
          />
        </div>
      </div>
    </div>
  );
}
  