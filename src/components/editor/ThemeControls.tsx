import { useMenuEditor } from "@/context/MenuEditorContext";
import { TEMPLATES } from "@/constants/templates";
import { ThemeVariant } from "@/types/menu";
import clsx from "clsx";

export function ThemeControls() {
  const { menu, setMenu } = useMenuEditor();

  return (
    <div className="bg-background text-foreground rounded-xl p-4 shadow mb-4">
      <h3 className="font-semibold mb-3">Theme</h3>

      {/* Theme picker */}
      <div className="flex gap-2 flex-wrap mb-4">
        {Object.entries(TEMPLATES).map(([key, t]) => {
          const active = menu.theme.theme === key;

          return (
            <button
              key={key}
              title={t.tooltip}
              onClick={() =>
                setMenu((m) => ({
                  ...m,
                  theme: {
                    ...m.theme,
                    theme: key as ThemeVariant,
                  },
                }))
              }
              className={clsx(
                "px-3 py-1 rounded border text-sm capitalize transition",
                active
                  ? "bg-black text-white border-primary"
                  : "bg-background hover:bg-gray-100"
              )}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Layout picker */}
      <div>
        <h4 className="font-medium text-sm mb-2">Layout</h4>

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
            className={clsx(
              "px-3 py-1 rounded border text-sm transition",
              menu.theme.layout === "single-column"
                ? "bg-black text-white border-primary"
                : "bg-background hover:bg-gray-100"
            )}
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
            className={clsx(
              "px-3 py-1 rounded border text-sm transition",
              menu.theme.layout === "two-column"
                ? "bg-primary text-white border-primary"
                : "bg-background hover:bg-gray-100"
            )}
          >
            Two Column
          </button>
        </div>
      </div>
    </div>
  );
}
