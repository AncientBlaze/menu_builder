import { templateStore } from "@/stores/templateStore";
import { TemplateBlock } from "@/types/template";

export function SpacerBlockSettings({
  block,
}: {
  block: Extract<TemplateBlock, { type: "spacer" }>;
}) {
  const updateHeight = (height: number) => {
    templateStore.setState((s) => ({
      ...s,
      templates: s.templates.map((t) =>
        t.id === s.activeTemplateId
          ? {
              ...t,
              blocks: t.blocks.map((b) =>
                b.id === block.id ? { ...b, height } : b
              ),
            }
          : t
      ),
    }));
  };

  return (
    <div className="space-y-2">
      <label className="text-xs">Height</label>
      <input
        type="range"
        min={4}
        max={120}
        value={block.height}
        onChange={(e) => updateHeight(+e.target.value)}
      />
      <div className="text-xs text-slate-400">
        {block.height}px
      </div>
    </div>
  );
}
