import { CanvasNode } from "@/types/canvas";

/* =====================
   Anchor math
===================== */

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

/* =====================
   Renderer
===================== */

type Props = {
  nodes?: CanvasNode[];
  scale: number;
};

const BASE_CANVAS: Rect = {
  width: 768,
  height: 1024,
};

export function ReadonlyCanvasRenderer({
  nodes = [],
  scale,
}: Props) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {nodes
        .filter((n) => n.visible !== false)
        .slice()
        .sort((a, b) => a.z - b.z)
        .map((node) => {
          const anchor = resolveAnchor(node.anchor, BASE_CANVAS);

          const x =
            (anchor.x + node.offset.x) * scale;
          const y =
            (anchor.y + node.offset.y) * scale;

          return (
            <div
              key={node.id}
              className="absolute"
              style={{
                left: x,
                top: y,
                width: node.width * scale,
                height: node.height * scale,
                transform: `translate(-50%, -50%) rotate(${node.rotation ?? 0}deg)`,
                zIndex: node.z,
              }}
            >
              {/* SHAPE */}
              {node.type === "shape" && node.props.kind !== "svg" && (
                <div
                  className="w-full h-full"
                  style={{
                    background: node.props.gradient
                      ? node.props.gradient.type === "linear"
                        ? `linear-gradient(${node.props.gradient.angle ?? 90}deg, ${node.props.gradient.stops
                            .map((s: any) => `${s.color} ${s.position}%`)
                            .join(", ")})`
                        : `radial-gradient(circle, ${node.props.gradient.stops
                            .map((s: any) => `${s.color} ${s.position}%`)
                            .join(", ")})`
                      : node.props.fill ?? "#000",
                    opacity: node.props.opacity ?? 1,
                    borderRadius:
                      node.props.kind === "circle"
                        ? "50%"
                        : (node.props.radius ?? 0) * scale,
                    border:
                      node.props.borderWidth
                        ? `${node.props.borderWidth * scale}px ${node.props.borderStyle ?? "solid"} ${node.props.borderColor ?? "#000"}`
                        : undefined,
                    boxShadow: node.props.shadow
                      ? `${node.props.shadow.x * scale}px ${node.props.shadow.y * scale}px ${node.props.shadow.blur * scale}px ${node.props.shadow.color}`
                      : undefined,
                  }}
                />
              )}

              {/* SVG */}
              {node.type === "shape" && node.props.kind === "svg" && (
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    d={node.props.svgPath}
                    fill={node.props.fill ?? "#000"}
                    opacity={node.props.opacity ?? 1}
                  />
                </svg>
              )}

              {/* IMAGE */}
              {node.type === "image" && (
                <img
                  src={node.props.src}
                  draggable={false}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          );
        })}
    </div>
  );
}
