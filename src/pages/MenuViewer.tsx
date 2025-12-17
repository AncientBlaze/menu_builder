import { useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { loadMenu } from "@/utils/menuStore";
import { generateMenuPdfBlob } from "@/utils/pdf";
import { MenuDocument } from "@/types/menu";
import { MenuPreview } from "@/components/preview/MenuPreview";
import { useMenuEditor } from "@/context/MenuEditorContext";

export default function MenuViewer() {
  const { id } = useParams({ strict: false });
  const { setMenu } = useMenuEditor();

  const [menu, setLocalMenu] = useState<MenuDocument | null>(null);

  useEffect(() => {
    if (!id) return;

    const m = loadMenu(id);
    if (m) {
      setLocalMenu(m);
      setMenu(m); // ✅ THIS IS THE KEY FIX
    }
  }, [id, setMenu]);

  const downloadPdf = async () => {
    const el = document.getElementById("menu-preview");
    if (!el) return;

    const blob = await generateMenuPdfBlob(el);
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "menu.pdf";
    a.click();

    URL.revokeObjectURL(url);
  };

  if (!menu) {
    return (
      <div className="h-screen flex items-center justify-center">
        Menu not found
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* MenuPreview now reads correct menu from context */}
      <MenuPreview />

      <button
        onClick={downloadPdf}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded"
      >
        Download PDF
      </button>
    </div>
  );
}
