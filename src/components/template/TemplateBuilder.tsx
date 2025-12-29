import { templateStore } from "@/stores/templateStore";

export function TemplateBuilder() {
  const { templates, activeTemplateId } = templateStore.state;
  const template = templates.find(t => t.id === activeTemplateId);

  if (!template) {
    return (
      <div className="p-6 text-sm text-slate-500">
        Select or create a template to begin
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      {template.blocks.map(block => (
        <div
          key={block.id}
          className="border rounded-md p-4 bg-white"
        >
          <strong className="capitalize">{block.type}</strong>

          {block.type === "spacer" && (
            <div className="text-xs opacity-60">
              Height: {block.height}px
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
