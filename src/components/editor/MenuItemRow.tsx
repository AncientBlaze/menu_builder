import { MenuItem } from "@/types/menu";
import { useMenuEditor } from "@/context/MenuEditorContext";

type Props = {
  sectionId: string;
  item: MenuItem;
};

export function MenuItemRow({ sectionId, item }: Props) {
  const { updateItem, removeItem } =
    useMenuEditor();

  return (
    <div className="border rounded p-2 space-y-1">
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

      <div className="flex gap-2">
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
