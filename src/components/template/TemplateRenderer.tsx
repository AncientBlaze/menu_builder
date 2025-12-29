import { MenuDocument } from "@/types/menu";
import { TemplateDocument, TemplateBlock } from "@/types/template";

type Props = {
  menu: MenuDocument;
  template: TemplateDocument;
  preview?: boolean;
};

export function TemplateRenderer({
  menu,
  template,
  preview = false,
}: Props) {
  return (
    <div
      className={
        preview
          ? "space-y-4 text-xs"
          : "space-y-6 text-sm"
      }
    >
      {template.blocks.map((block) =>
        renderBlock(block, menu, preview)
      )}
    </div>
  );
}

/* --------------------------------
   Block Renderer
-------------------------------- */

function renderBlock(
  block: TemplateBlock,
  menu: MenuDocument,
  preview: boolean
) {
  switch (block.type) {
    case "header":
      return (
        <div
          key={block.id}
          className="text-center"
        >
          <div className="font-bold">
            {menu.meta.restaurantName}
          </div>
          {menu.meta.tagline && (
            <div className="opacity-70">
              {menu.meta.tagline}
            </div>
          )}
        </div>
      );

    case "sections":
      return (
        <div key={block.id}>
          {menu.sections.map((section) => (
            <div key={section.id} className="mb-3">
              {block.showTitle && (
                <div className="font-semibold mb-1">
                  {section.title}
                </div>
              )}

              {section.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between opacity-90"
                >
                  <span>{item.name}</span>
                  <span>
                    {menu.meta.currency}
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      );

    case "divider":
      return (
        <hr
          key={block.id}
          className="my-3 opacity-40"
        />
      );

    case "spacer":
      return (
        <div
          key={block.id}
          style={{
            height: preview
              ? Math.min(block.height, 16)
              : block.height,
          }}
        />
      );

    default:
      return null;
  }
}
