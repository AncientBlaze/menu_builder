import { templateStore } from "@/stores/templateStore";
import { TemplateBlock } from "@/types/template";

export function HeaderBlockSettings({
  block,
}: {
  block: Extract<TemplateBlock, { type: "header" }>;
}) {
  const updateText = (text: string) => {
    templateStore.setState((s) => ({
      ...s,
      templates: s.templates.map((t) =>
        t.id === s.activeTemplateId
          ? {
              ...t,
              blocks: t.blocks.map((b) =>
                b.id === block.id ? { ...b, text } : b
              ),
            }
          : t
      ),
    }));
  };

  return (
    <div className="space-y-2">
      <label className="text-xs">Header Text</label>
      <input
        className="w-full border rounded px-2 py-1 text-sm"
        value={block.text}
        onChange={(e) => updateText(e.target.value)}
      />
    </div>
  );
}
