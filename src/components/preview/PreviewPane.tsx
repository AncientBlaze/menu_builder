import { PreviewToolbar } from "./PreviewToolbar.tsx";
import { MenuPreview } from "./MenuPreview.tsx";

export function PreviewPane() {
  return (
    <section className="flex-1 p-2 bg-no-repeat bg-cover bg-center bg-[url('https://picsum.photos/1920')]">
      <PreviewToolbar />
      <MenuPreview />
    </section>
  );
}
