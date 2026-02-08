import { CanvasNode } from "@/types/canvas";
import { CanvasNodeView } from "./MenuPreview";

type Rect = { width: number; height: number };

function resolveAnchor(anchor: string, rect: Rect) {
  switch (anchor) {
    case "top-left": return { x: 0, y: 0 };
    case "top-center": return { x: rect.width / 2, y: 0 };
    case "top-right": return { x: rect.width, y: 0 };
    case "center": return { x: rect.width / 2, y: rect.height / 2 };
    case "bottom-left": return { x: 0, y: rect.height };
    case "bottom-center": return { x: rect.width / 2, y: rect.height };
    case "bottom-right": return { x: rect.width, y: rect.height };
    default: return { x: 0, y: 0 };
  }
}

type Props = {
  nodes: CanvasNode[];
  rect: DOMRect;
  interactive?: boolean;
  selectedIds?: string[];
  primaryId?: string | null;
  onSelect?: (id: string, multi?: boolean) => void;
  onDrag?: (id: string, dx: number, dy: number) => void;
};

export function CanvasRenderer({
  nodes,
  rect,
  interactive = false,
  selectedIds = [],
  primaryId = null,
  onSelect,
  onDrag,
}: Props) {
  return (
    <div
      className="absolute inset-0"
      style={{
        pointerEvents: interactive ? "auto" : "none",
      }}
    >
      {nodes
        .slice()
        .sort((a, b) => a.z - b.z)
        .map((node) => {
          const anchor = resolveAnchor(node.anchor, rect);

          return (
            <div
              key={node.id}
              className="absolute"
              style={{
                left: anchor.x + node.offset.x * rect.width,
                top: anchor.y + node.offset.y * rect.height,
                zIndex: node.z,
              }}
            >
              <CanvasNodeView
                node={node}
                isSelected={selectedIds.includes(node.id)}
                isPrimary={primaryId === node.id}
                onSelect={(e) =>
                  interactive && onSelect?.(node.id, e.shiftKey)
                }
                onDrag={(dx, dy) =>
                  interactive && onDrag?.(node.id, dx, dy)
                }
              />
            </div>
          );
        })}
    </div>
  );
}
