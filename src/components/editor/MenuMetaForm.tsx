import { useMenuEditor } from "@/context/MenuEditorContext";


export function MenuMetaForm() {
  const { menu, setMenu } = useMenuEditor();

  return (
    <div className="bg-white rounded-xl p-4 shadow mb-4">
      <h3 className="font-semibold mb-3">Menu Properties</h3>

      <label className="block text-sm mb-1">Restaurant Name</label>
      <input
        className="w-full border rounded px-3 py-2 mb-3"
        value={menu.meta.restaurantName}
        onChange={(e) =>
          setMenu((m) => ({
            ...m,
            meta: { ...m.meta, restaurantName: e.target.value },
          }))
        }
      />

      <label className="block text-sm mb-1">Tagline / Subtitle</label>
      <input
        className="w-full border rounded px-3 py-2 mb-3"
        value={menu.meta.tagline ?? ""}
        onChange={(e) =>
          setMenu((m) => ({
            ...m,
            meta: { ...m.meta, tagline: e.target.value },
          }))
        }
      />

      <label className="block text-sm mb-1">Restaurant Info</label>
      <input
        className="w-full border rounded px-3 py-2"
        value={menu.meta.address ?? ""}
        onChange={(e) =>
          setMenu((m) => ({
            ...m,
            meta: { ...m.meta, address: e.target.value },
          }))
        }
      />
    </div>
  );
}
