import { MenuItem } from "@/types/menu";
import { useMenuEditor } from "@/context/MenuEditorContext";

type Props = {
  sectionId: string;
  item: MenuItem;
};

export function MenuItemRow({ sectionId, item }: Props) {
  const {
    menu,
    updateItem,
    removeItem,
    reorderItems,
  } = useMenuEditor();

  const section = menu.sections.find(
    (s) => s.id === sectionId
  );

  if (!section) return null;

  const index = section.items.findIndex(
    (i) => i.id === item.id
  );

  const moveUp = () => {
    if (index > 0) {
      reorderItems(sectionId, index, index - 1);
    }
  };

  const moveDown = () => {
    if (index < section.items.length - 1) {
      reorderItems(sectionId, index, index + 1);
    }
  };

  return (
    <div
      className="
        rounded-lg p-2 space-y-2
        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-700
      "
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <input
          className="
            flex-1 bg-transparent
            border-b border-slate-300 dark:border-slate-600
            text-sm
            text-slate-900 dark:text-slate-100
            focus:outline-none focus:border-slate-500
          "
          value={item.name}
          onChange={(e) =>
            updateItem(sectionId, item.id, {
              name: e.target.value,
            })
          }
        />

        {/* Reorder */}
        <div className="flex gap-1">
          <button
            onClick={moveUp}
            disabled={index === 0}
            className="
              text-md px-1
              text-slate-500 dark:text-slate-400
              hover:text-slate-700 dark:hover:text-slate-200
              disabled:opacity-30
            "
            title="Move up"
          >
            ▲
          </button>
          <button
            onClick={moveDown}
            disabled={index === section.items.length - 1}
            className="
              text-md px-1
              text-slate-500 dark:text-slate-400
              hover:text-slate-700 dark:hover:text-slate-200
              disabled:opacity-30
            "
            title="Move down"
          >
            ▼
          </button>
        </div>

        {/* Delete */}
        <button
          onClick={() =>
            removeItem(sectionId, item.id)
          }
          className="
            text-md text-red-500
            hover:text-red-600
          "
          title="Remove item"
        >
          ✕
        </button>
      </div>

      {/* Price & Veg */}
      <div className="flex items-center gap-3">
        <input
          type="number"
          className="
            w-20 px-2 py-1 text-sm
            rounded-md
            bg-white dark:bg-slate-800
            border border-slate-300 dark:border-slate-600
            text-slate-900 dark:text-slate-100
            focus:outline-none focus:ring-1 focus:ring-slate-400
          "
          value={item.price}
          onChange={(e) =>
            updateItem(sectionId, item.id, {
              price: Number(e.target.value),
            })
          }
        />

        <label className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400">
          <input
            type="checkbox"
            checked={item.isVeg}
            onChange={(e) =>
              updateItem(sectionId, item.id, {
                isVeg: e.target.checked,
              })
            }
            className="accent-green-600"
          />
          Veg
        </label>
      </div>

      {/* Description */}
      <textarea
        className="
          w-full text-xs p-2 rounded-md
          bg-white dark:bg-slate-800
          border border-slate-300 dark:border-slate-600
          text-slate-900 dark:text-slate-100
          placeholder:text-slate-400
          focus:outline-none focus:ring-1 focus:ring-slate-400
        "
        placeholder="Description"
        value={item.description ?? ""}
        onChange={(e) =>
          updateItem(sectionId, item.id, {
            description: e.target.value,
          })
        }
      />
    </div>
  );
}
