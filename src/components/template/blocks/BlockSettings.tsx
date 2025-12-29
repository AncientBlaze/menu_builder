import { TemplateBlock } from "@/types/template";
import { HeaderBlockSettings } from "./HeaderBlockSettings";
import { SectionsBlockSettings } from "./SectionBlockSettings";
import { DividerBlockSettings } from "./DividerBlockSettings";
import { SpacerBlockSettings } from "./SpacerSettings";

export function BlockSettings({
  block,
}: {
  block: TemplateBlock;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
      <div className="text-xs font-semibold uppercase text-slate-500">
        Block Settings
      </div>

      {block.type === "header" && (
        <HeaderBlockSettings block={block} />
      )}

      {block.type === "sections" && (
        <SectionsBlockSettings block={block} />
      )}

      {block.type === "divider" && (
        <DividerBlockSettings block={block} />
      )}

      {block.type === "spacer" && (
        <SpacerBlockSettings block={block} />
      )}
    </div>
  );
}
