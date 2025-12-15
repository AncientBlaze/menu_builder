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
    <div className="border rounded p-2 space-y-1">
      {/* Header */}
      <div className="flex items-center gap-2">
        <input
          className="flex-1 border-b text-sm"
          value={item.name}
          onChange={(e) =>
            updateItem(sectionId, item.id, {
              name: e.target.value,
            })
          }
        />

        {/* Reorder buttons */}
        <div className="flex gap-1">
          <button
            onClick={moveUp}
            disabled={index === 0}
            className="text-xs px-1 disabled:opacity-30"
            title="Move up"
          >
            ▲
          </button>
          <button
            onClick={moveDown}
            disabled={
              index === section.items.length - 1
            }
            className="text-xs px-1 disabled:opacity-30"
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
          className="text-red-500 text-xs"
          title="Remove item"
        >
          ✕
        </button>
      </div>

      {/* Price & Veg */}
      <div className="flex gap-2 items-center">
        <input
          type="number"
          className="w-20 border rounded px-2 text-sm"
          value={item.price}
          onChange={(e) =>
            updateItem(sectionId, item.id, {
              price: Number(e.target.value),
            })
          }
        />

        <label className="flex items-center gap-1 text-xs">
          <input
            type="checkbox"
            checked={item.isVeg}
            onChange={(e) =>
              updateItem(sectionId, item.id, {
                isVeg: e.target.checked,
              })
            }
          />
          Veg
        </label>
      </div>

      {/* Description */}
      <textarea
        className="w-full border rounded text-xs p-1"
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
