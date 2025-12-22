import { useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchMenu } from "@/utils/api";
import { MenuDocument } from "@/types/menu";
import { MenuPreview } from "@/components/preview/MenuPreview";
import { useMenuEditor } from "@/context/MenuEditorContext";

export default function MenuViewer() {
  const { id } = useParams({ strict: false });
  const { setMenu } = useMenuEditor();

  const [menu, setLocalMenu] = useState<MenuDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) {
      setError(true);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(false);

    fetchMenu(id)
      .then((m) => {
        setLocalMenu(m);
        updateMenu(m); // keep MenuPreview working
      })
      .catch(() => {
        setError(true);
        setLocalMenu(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, setMenu]);

  /* 🌀 Loading */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-sm opacity-70 animate-pulse text-center">
          Loading menu…
        </div>
      </div>
    );
  }

  /* ❌ Error */
  if (error || !menu) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 text-center">
        <div>
          <h2 className="text-lg font-semibold mb-1">
            Menu not found
          </h2>
          <p className="text-sm opacity-70 leading-relaxed">
            This menu may have expired or is unavailable.
          </p>
        </div>
      </div>
    );
  }

  /* ✅ Success */
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl px-3 py-4">
        <MenuPreview />
        {/* <div className="flex justify-center items-center bg-emerald-200">
        <button className="px-2 py-5 bg-red-500 rounded-xl ">
          Order Now
        </button>
        </div> */}
      </div>
    </div>
  );
}
