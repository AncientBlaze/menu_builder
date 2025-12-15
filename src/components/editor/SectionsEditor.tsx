import { useMenuEditor } from "@/context/MenuEditorContext";
import { MenuItemRow } from "./MenuItemRow";
import { CiCircleRemove } from "react-icons/ci";

export function SectionsEditor() {
  const {
    menu,
    addSection,
    addItem,
    removeSection,
    setMenu,
  } = useMenuEditor();

  return (
    <div className="space-y-4">
      {menu.sections.map((section) => (
        <div
          key={section.id}
          className="border rounded p-3"
        >
          <div className="flex items-center gap-2">
            <input
              className="flex-1 border-b font-medium"
              value={section.title}
              onChange={(e) =>
                setMenu((m) => ({
                  ...m,
                  sections: m.sections.map((s) =>
                    s.id === section.id
                      ? {
                          ...s,
                          title: e.target.value,
                        }
                      : s
                  ),
                }))
              }
            />

            <button
              onClick={() => removeSection(section.id)}
              className="text-red-500 text-sm"
              title="Remove Section"
            >
              <CiCircleRemove size={25} color="purple"/>
            </button>
          </div>

          <div className="mt-3 space-y-2">
            {section.items.map((item) => (
              <MenuItemRow
                key={item.id}
                sectionId={section.id}
                item={item}
              />
            ))}
            
          </div>

          <button
            onClick={() => addItem(section.id)}
            className="mt-2 text-sm bg-black text-white px-3 py-1 rounded"
          >
            + Add Item
          </button>
        </div>
      ))}

      <button
        onClick={addSection}
        className="w-full bg-black text-white py-2 rounded"
      >
        + Add Section
      </button>
    </div>
  );
}
