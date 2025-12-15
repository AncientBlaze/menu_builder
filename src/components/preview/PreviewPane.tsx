import { PreviewToolbar } from "./PreviewToolbar.tsx";
import { MenuPreview } from "./MenuPreview.tsx";

export function PreviewPane() {
  return (
    <section className="flex-1 bg-gray-100 rounded-xl p-4">
      <PreviewToolbar />
      <MenuPreview />
    </section>
  );
}
