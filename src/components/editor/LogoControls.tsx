import { useMenuEditor } from "@/context/MenuEditorContext";
import clsx from "clsx";

export function LogoControls() {
  const { menu, setMenu } = useMenuEditor();

  const logo = menu.visuals?.logo;

  const updateLogo = (patch: Partial<typeof logo>) => {
    updateMenu((m) => ({
      ...m,
      visuals: {
        ...m.visuals,
        logo: {
          url: logo?.url ?? "",
          position: logo?.position ?? "top",
          align: logo?.align ?? "center",
          size: logo?.size ?? 64,
          ...patch,
        },
      },
    }));
  };

  const removeLogo = () => {
    updateMenu((m) => ({
      ...m,
      visuals: {
        ...m.visuals,
        logo: undefined,
      },
    }));
  };

  return (
    <div className="space-y-4">
      <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        Logo
      </h4>

      {/* Logo URL */}
      <input
        type="text"
        placeholder="Paste logo image URL"
        value={logo?.url ?? ""}
        onChange={(e) =>
          updateLogo({ url: e.target.value })
        }
        className="
          w-full rounded-lg border px-3 py-2 text-sm
          bg-white dark:bg-slate-900
          border-slate-200 dark:border-slate-700
        "
      />

      {logo?.url && (
        <>
          {/* Position */}
          <div className="flex gap-2 flex-wrap">
            {(["top", "bottom", "overlay"] as const).map((p) => (
              <button
                key={p}
                onClick={() => updateLogo({ position: p })}
                className={clsx(
                  "px-3 py-1.5 rounded-md text-sm border transition",
                  logo.position === p
                    ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                    : "bg-slate-100 dark:bg-slate-800"
                )}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Alignment */}
          <div className="flex gap-2">
            {(["left", "center", "right"] as const).map((a) => (
              <button
                key={a}
                onClick={() => updateLogo({ align: a })}
                className={clsx(
                  "px-3 py-1.5 rounded-md text-sm border transition",
                  logo.align === a
                    ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                    : "bg-slate-100 dark:bg-slate-800"
                )}
              >
                {a}
              </button>
            ))}
          </div>

          {/* Size */}
          <div>
            <label className="text-xs opacity-70">
              Size ({logo.size ?? 64}px)
            </label>
            <input
              type="range"
              min={32}
              max={160}
              step={4}
              value={logo.size ?? 64}
              onChange={(e) =>
                updateLogo({ size: Number(e.target.value) })
              }
              className="w-full"
            />
          </div>

          {/* Remove */}
          <button
            onClick={removeLogo}
            className="text-xs text-red-500 hover:underline"
          >
            Remove logo
          </button>
        </>
      )}
    </div>
  );
}
