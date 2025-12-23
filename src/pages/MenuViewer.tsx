import { useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchMenu } from "@/utils/api";
import { MenuPreview } from "@/components/preview/MenuPreview";
import { useMenuEditor } from "@/context/MenuEditorContext";

export default function MenuViewer() {
  const { id } = useParams({ strict: false });

  const {
    updateMenu,
    setRenderMode,
  } = useMenuEditor();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);


  useEffect(() => {
    setRenderMode("qr");

    return () => {
      setRenderMode("editor");
    };
  }, []);

  

  useEffect(() => {
    if (!id) {
      setError(true);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(false);

    fetchMenu(id)
      .then((menu) => {
        updateMenu(() => menu);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-sm opacity-70 animate-pulse text-center">
          Loading menu…
        </div>
      </div>
    );
  }

  if (error) {
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


  return (
    <div className="min-h-screen bg-black flex justify-center">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl px-3 py-4">
        <MenuPreview />

        {/* Optional CTA */}
        {/* 
        <div className="mt-4 flex justify-center">
          <button className="px-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold">
            Order Now
          </button>
        </div>
        */}
      </div>
    </div>
  );
}
