import { templateStore } from "@/stores/templateStore";
import { TemplateBlock } from "@/types/template";

export function SectionsBlockSettings({
  block,
}: {
  block: Extract<TemplateBlock, { type: "sections" }>;
}) {
  const toggleTitle = () => {
    templateStore.setState((s) => ({
      ...s,
      templates: s.templates.map((t) =>
        t.id === s.activeTemplateId
          ? {
              ...t,
              blocks: t.blocks.map((b) =>
                b.id === block.id && b.type === "sections"
                  ? { ...b, showTitle: !b.showTitle }
                  : b
              ),
            }
          : t
      ),
    }));
  };

  return (
    <div className="space-y-2 text-sm">
      <button
        onClick={toggleTitle}
        className="px-2 py-1 border rounded"
      >
        {block.showTitle ? "Hide Section Title" : "Show Section Title"}
      </button>
    </div>
  );
}
