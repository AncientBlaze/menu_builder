import { exportMenuPDF } from "@/utils/pdf";

export function PreviewToolbar() {
  return (
    <div className="flex items-center justify-between bg-gray-300 rounded-lg px-4 py-2 mb-4">
      <div className="flex gap-2">
        <button className="px-2 py-1 bg-white rounded text-sm">≡</button>
        <button className="px-2 py-1 bg-white rounded text-sm">☰</button>
        <button className="px-2 py-1 bg-white rounded text-sm">▤</button>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm">Style</span>
        <button className="px-2 py-1 bg-white rounded">◀</button>
        
        <button className="px-2 py-1 bg-white rounded">▶</button>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            const el = document.getElementById("menu-preview");
            if (el) exportMenuPDF(el);
          }}
          className="px-3 py-1 bg-white rounded font-medium"
        >
          Download as PDF
        </button>
      </div>
    </div>
  );
}
