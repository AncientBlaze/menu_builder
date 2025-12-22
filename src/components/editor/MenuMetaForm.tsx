import { useMenuEditor } from "@/context/MenuEditorContext";

export function MenuMetaForm() {
  const { menu, updateMenu } = useMenuEditor();

  return (
    <div className="
      rounded-xl p-4 mb-4
      bg-white dark:bg-slate-900
      border border-slate-200 dark:border-slate-800
      shadow-sm
    ">
      <h3 className="text-sm font-semibold mb-4 text-slate-800 dark:text-slate-200">
        Menu Properties
      </h3>

      {/* Restaurant Name */}
      <label className="block text-xs font-medium mb-1 text-slate-700 dark:text-slate-300">
        Restaurant Name
      </label>
      <input
        className="w-full mb-3 px-3 py-2 rounded-md text-sm
          bg-white dark:bg-slate-800
          border border-slate-300 dark:border-slate-700
          text-slate-900 dark:text-slate-100"
        value={menu.meta.restaurantName}
        onChange={(e) =>
          updateMenu({
            meta: {
              ...menu.meta,
              restaurantName: e.target.value,
            },
          })
        }
      />

      {/* Tagline */}
      <label className="block text-xs font-medium mb-1 text-slate-700 dark:text-slate-300">
        Tagline / Subtitle
      </label>
      <input
        className="w-full mb-3 px-3 py-2 rounded-md text-sm
          bg-white dark:bg-slate-800
          border border-slate-300 dark:border-slate-700
          text-slate-900 dark:text-slate-100"
        value={menu.meta.tagline ?? ""}
        onChange={(e) =>
          updateMenu({
            meta: {
              ...menu.meta,
              tagline: e.target.value,
            },
          })
        }
      />

      {/* Address */}
      <label className="block text-xs font-medium mb-1 text-slate-700 dark:text-slate-300">
        Restaurant Info
      </label>
      <input
        className="w-full px-3 py-2 rounded-md text-sm
          bg-white dark:bg-slate-800
          border border-slate-300 dark:border-slate-700
          text-slate-900 dark:text-slate-100"
        value={menu.meta.address ?? ""}
        onChange={(e) =>
          updateMenu({
            meta: {
              ...menu.meta,
              address: e.target.value,
            },
          })
        }
      />
    </div>
  );
}
