import { PreviewToolbar } from "./PreviewToolbar";
import { MenuPreview } from "./MenuPreview";

export function PreviewPane() {
  return (
    <section className="flex-1 flex flex-col p-3 bg-no-repeat bg-cover bg-center">
      {/* Tabs */}

      {/* Toolbar */}
      <div className="mt-2">
        <PreviewToolbar />
      </div>
      {/* Preview */}
      <div className="flex-1 overflow-auto mt-2">
        <MenuPreview />
      </div>
    </section>
  );
}
