import { templateStore } from "@/stores/templateStore";
import { TemplateBlock } from "@/types/template";

export function DividerBlockSettings({
  block,
}: {
  block: Extract<TemplateBlock, { type: "divider" }>;
}) {
  const setVariant = (variant: "line" | "dashed") => {
    templateStore.setState((s) => ({
      ...s,
      templates: s.templates.map((t) =>
        t.id === s.activeTemplateId
          ? {
              ...t,
              blocks: t.blocks.map((b) =>
                b.id === block.id
                  ? { ...b, variant }
                  : b
              ),
            }
          : t
      ),
    }));
  };

  return (
    <div className="flex gap-2">
      <button onClick={() => setVariant("line")}>Line</button>
      <button onClick={() => setVariant("dashed")}>Dashed</button>
    </div>
  );
}
