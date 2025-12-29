import { useMenuEditor } from "@/context/MenuEditorContext";
import clsx from "clsx";

export function LogoControls() {
  const { menu, updateMenu } = useMenuEditor();

  const logo = menu.visuals?.logo;

  const updateLogo = (patch: Partial<typeof logo>) => {
    updateMenu({
      visuals: {
        ...menu.visuals,
        logo: {
          ...logo,
          ...patch,
        } as typeof logo,
      },
    });
  };

  const removeLogo = () => {
    updateMenu({
      visuals: {
        ...menu.visuals,
        logo: undefined,
      },
    });
  };

  const inputClass = clsx(
    "w-full rounded-lg border px-3 py-2 text-sm",
    "bg-white dark:bg-slate-900",
    "border-slate-200 dark:border-slate-700"
  );

  const labelClass = "block text-xs font-medium mb-1.5 opacity-70";
  const buttonGroupClass = "flex gap-2 flex-wrap";
  const buttonClass = (isActive: boolean) =>
    clsx(
      "px-3 py-1.5 rounded-md text-sm border transition font-medium",
      isActive
        ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
        : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
    );

  return (
    <div className="space-y-5">
      <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        Logo
      </h4>

      {/* Logo URL */}
      <div>
        <label className={labelClass}>Logo URL</label>
        <input
          type="text"
          placeholder="Paste logo image URL"
          value={logo?.url ?? ""}
          onChange={(e) => updateLogo({ url: e.target.value })}
          className={inputClass}
        />
      </div>

      {logo?.url && (
        <>
          {/* Position */}
          <div>
            <label className={labelClass}>Position</label>
            <div className={buttonGroupClass}>
              {(["top", "bottom", "overlay"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => updateLogo({ position: p })}
                  className={buttonClass(logo.position === p)}
                  title={`Place logo at ${p}`}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Alignment (only for top/bottom) */}
          {(logo.position === "top" || logo.position === "bottom") && (
            <div>
              <label className={labelClass}>Alignment</label>
              <div className={buttonGroupClass}>
                {(["left", "center", "right"] as const).map((a) => (
                  <button
                    key={a}
                    onClick={() => updateLogo({ align: a })}
                    className={buttonClass(logo.align === a)}
                  >
                    {a.charAt(0).toUpperCase() + a.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size */}
          <div>
            <label className={labelClass}>
              Size: {logo.size ?? 64}px
            </label>
            <input
              type="range"
              min={32}
              max={200}
              step={4}
              value={logo.size ?? 64+"px"}
              onChange={(e) => updateLogo({ size: Number(e.target.value) })}
              className="w-full"
            />
          </div>

          {/* Roundness */}
          <div>
            <label className={labelClass}>
              Roundness: {logo.borderRadius ?? 0}%
            </label>
            <input
              type="range"
              min={0}
              max={50}
              step={5}
              value={logo.borderRadius ?? 0}
              onChange={(e) => updateLogo({ borderRadius: Number(e.target.value) })}
              className="w-full"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              0% = Sharp corners, 50% = Perfect circle
            </p>
          </div>

          {/* Opacity */}
          <div>
            <label className={labelClass}>
              Opacity: {logo.opacity ?? 100}%
            </label>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={logo.opacity ?? 100}
              onChange={(e) => updateLogo({ opacity: Number(e.target.value) })}
              className="w-full"
            />
          </div>

          {/* Shadow Effect */}
          <div>
            <label className={labelClass}>Shadow Effect</label>
            <div className={buttonGroupClass}>
              {(
                [
                  { id: "none", label: "None", desc: "No shadow" },
                  { id: "soft", label: "Soft", desc: "Subtle shadow" },
                  { id: "medium", label: "Medium", desc: "Moderate shadow" },
                  { id: "hard", label: "Hard", desc: "Strong shadow" },
                ] as const
              ).map(({ id, label, desc }) => (
                <button
                  key={id}
                  onClick={() => updateLogo({ shadow: id as any })}
                  className={buttonClass(
                    logo.shadow === id || (logo.shadow === undefined && id === "none")
                  )}
                  title={desc}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-4" />

          {/* Remove */}
          <button
            onClick={removeLogo}
            className="w-full px-3 py-2 rounded-lg text-sm font-medium text-red-500 border border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
          >
            Remove Logo
          </button>
        </>
      )}
    </div>
  );
}
