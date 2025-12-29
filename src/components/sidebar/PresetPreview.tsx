import { MenuDocument } from "@/types/menu";
import { TemplateDocument } from "@/types/template";
import { TemplateRenderer } from "@/components/template/TemplateRenderer";

export function PresetPreview({
  document,
  template,
  active,
}: {
  document: MenuDocument;
  template: TemplateDocument;
  active?: boolean;
}) {
  return (
    <div
      className={`
        rounded-lg border p-3 transition
        ${
          active
            ? "border-blue-500 bg-blue-500/5"
            : "border-slate-700/50"
        }
      `}
    >
      <TemplateRenderer
        menu={document}
        template={template}
        preview
      />
    </div>
  );
}
