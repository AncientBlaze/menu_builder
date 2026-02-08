import { useMenuEditor } from "@/context/MenuEditorContext";
import { CanvasNode } from "@/types/canvas";

/* =====================
   Types
===================== */

type GradientStop = {
  color: string;
  position: number; // 0–100
};

type Gradient = {
  type: "linear" | "radial";
  angle?: number;
  stops: GradientStop[];
};

type Shadow = {
  x: number;
  y: number;
  blur: number;
  color: string;
};

type ShapeProps = {
  fill?: string;
  opacity?: number;
  radius?: number;
  kind?: "rect" | "circle" | "svg";

  gradient?: Gradient;

  borderWidth?: number;
  borderColor?: string;
  borderStyle?: "solid" | "dashed" | "dotted";

  shadow?: Shadow;
};

type ImageProps = {
  src?: string;
};

/* =====================
   Utils
===================== */

const clamp = (v: number, min = 0, max = 100) =>
  Math.min(max, Math.max(min, v));

/* =====================
   Inspector
===================== */

export function CanvasInspector() {
  const {
    menu,
    selectedCanvasNodeId,
    updateCanvasNode,
    removeCanvasNode,
  } = useMenuEditor();

  if (!selectedCanvasNodeId) return null;

  const node = menu.canvas.nodes.find(
    (n) => n.id === selectedCanvasNodeId
  ) as CanvasNode | undefined;

  if (!node) return null;

  const isShape = node.type === "shape";
  const isImage = node.type === "image";

  const props = node.props as ShapeProps & ImageProps;
  const isCircle = props.kind === "circle";

  /* =====================
     Gradient Helpers
  ===================== */

  const addGradientStop = () => {
    if (!props.gradient) return;

    const stops = [...props.gradient.stops];
    const newPosition =
      stops.length === 2
        ? (stops[0].position + stops[1].position) / 2
        : 50;

    stops.push({
      color: "#888888",
      position: clamp(newPosition),
    });

    stops.sort((a, b) => a.position - b.position);

    updateCanvasNode(node.id, {
      props: {
        ...props,
        gradient: {
          ...props.gradient,
          stops,
        },
      },
    });
  };

  const removeGradientStop = (index: number) => {
    if (!props.gradient || props.gradient.stops.length <= 2) return;

    const stops = props.gradient.stops.filter((_, i) => i !== index);

    updateCanvasNode(node.id, {
      props: {
        ...props,
        gradient: {
          ...props.gradient,
          stops,
        },
      },
    });
  };

  const updateGradientStop = (
    index: number,
    updates: Partial<GradientStop>
  ) => {
    if (!props.gradient) return;

    const stops = props.gradient.stops.map((stop, i) =>
      i === index ? { ...stop, ...updates } : stop
    );

    updateCanvasNode(node.id, {
      props: {
        ...props,
        gradient: {
          ...props.gradient,
          stops,
        },
      },
    });
  };

  /* =====================
     Render
  ===================== */

  return (
    <div className="space-y-5 text-sm">
      <h3 className="font-semibold text-slate-700 dark:text-slate-200">
        Canvas Inspector
      </h3>

      {/* POSITION */}
      <div className="grid grid-cols-2 gap-2">
        <label className="flex flex-col gap-1">
          X
          <input
            type="number"
            value={node.offset.x}
            onChange={(e) =>
              updateCanvasNode(node.id, {
                offset: { ...node.offset, x: Number(e.target.value) },
              })
            }
            className="input"
          />
        </label>

        <label className="flex flex-col gap-1">
          Y
          <input
            type="number"
            value={node.offset.y}
            onChange={(e) =>
              updateCanvasNode(node.id, {
                offset: { ...node.offset, y: Number(e.target.value) },
              })
            }
            className="input"
          />
        </label>
      </div>

      {/* SIZE */}
      <div className="grid grid-cols-2 gap-2">
        <label className="flex flex-col gap-1">
          Width
          <input
            type="number"
            value={node.width}
            onChange={(e) =>
              updateCanvasNode(node.id, {
                width: Math.max(10, Number(e.target.value)),
              })
            }
            className="input"
          />
        </label>

        <label className="flex flex-col gap-1">
          Height
          <input
            type="number"
            value={node.height}
            onChange={(e) =>
              updateCanvasNode(node.id, {
                height: Math.max(10, Number(e.target.value)),
              })
            }
            className="input"
          />
        </label>
      </div>

      {/* ROTATION */}
      <label className="flex flex-col gap-1">
        Rotation
        <input
          type="number"
          value={node.rotation ?? 0}
          onChange={(e) =>
            updateCanvasNode(node.id, {
              rotation: Number(e.target.value),
            })
          }
          className="input"
        />
      </label>

      {/* =====================
         SHAPE CONTROLS
      ===================== */}
      {isShape && (
        <>
          {/* FILL */}
          <label className="flex flex-col gap-1">
            Fill
            <input
              type="color"
              value={props.fill ?? "#000000"}
              onChange={(e) =>
                updateCanvasNode(node.id, {
                  props: { ...props, fill: e.target.value },
                })
              }
            />
          </label>

          {/* GRADIENT TOGGLE */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={!!props.gradient}
              onChange={(e) =>
                updateCanvasNode(node.id, {
                  props: {
                    ...props,
                    gradient: e.target.checked
                      ? {
                          type: "linear",
                          angle: 90,
                          stops: [
                            { color: "#ff0000", position: 0 },
                            { color: "#0000ff", position: 100 },
                          ],
                        }
                      : undefined,
                  },
                })
              }
            />
            <span className="font-medium">Use Gradient</span>
          </label>

          {/* GRADIENT EDITOR */}
          {props.gradient && (
            <div className="space-y-4 rounded border p-3 bg-slate-50 dark:bg-slate-900">
              <div
                className="h-8 rounded border"
                style={{
                  background:
                    props.gradient.type === "linear"
                      ? `linear-gradient(${props.gradient.angle ?? 90}deg, ${props.gradient.stops
                          .map((s) => `${s.color} ${s.position}%`)
                          .join(", ")})`
                      : `radial-gradient(circle, ${props.gradient.stops
                          .map((s) => `${s.color} ${s.position}%`)
                          .join(", ")})`,
                }}
              />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Gradient Stops</div>
                  <button
                    onClick={addGradientStop}
                    className="text-xs px-2 py-1 rounded border hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    + Add Stop
                  </button>
                </div>

                {props.gradient.stops.map((stop, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="color"
                      value={stop.color}
                      onChange={(e) =>
                        updateGradientStop(i, { color: e.target.value })
                      }
                    />

                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={stop.position}
                      onChange={(e) =>
                        updateGradientStop(i, {
                          position: clamp(Number(e.target.value)),
                        })
                      }
                      className="flex-1"
                    />

                    <span className="w-12 text-xs text-right">
                      {stop.position}%
                    </span>

                    {props.gradient!.stops.length > 2 && (
                      <button
                        onClick={() => removeGradientStop(i)}
                        className="text-red-600 text-xs"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* OPACITY */}
          <label className="flex flex-col gap-1">
            Opacity
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={props.opacity ?? 1}
              onChange={(e) =>
                updateCanvasNode(node.id, {
                  props: { ...props, opacity: Number(e.target.value) },
                })
              }
            />
          </label>

          {/* BORDER */}
          <label className="flex flex-col gap-1">
            Border Width
            <input
              type="number"
              value={props.borderWidth ?? 0}
              onChange={(e) =>
                updateCanvasNode(node.id, {
                  props: { ...props, borderWidth: Number(e.target.value) },
                })
              }
              className="input"
            />
          </label>

          <label className="flex flex-col gap-1">
            Border Color
            <input
              type="color"
              value={props.borderColor ?? "#000000"}
              onChange={(e) =>
                updateCanvasNode(node.id, {
                  props: { ...props, borderColor: e.target.value },
                })
              }
            />
          </label>

          <label className="flex flex-col gap-1">
            Border Style
            <select
              value={props.borderStyle ?? "solid"}
              onChange={(e) =>
                updateCanvasNode(node.id, {
                  props: {
                    ...props,
                    borderStyle: e.target.value as
                      | "solid"
                      | "dashed"
                      | "dotted",
                  },
                })
              }
              className="input"
            >
              <option value="solid">Solid</option>
              <option value="dashed">Dashed</option>
              <option value="dotted">Dotted</option>
            </select>
          </label>

          {/* RADIUS — hidden for circles */}
          {!isCircle && (
            <label className="flex flex-col gap-1">
              Corner Radius
              <input
                type="range"
                min={0}
                max={Math.min(node.width, node.height) / 2}
                value={props.radius ?? 0}
                onChange={(e) =>
                  updateCanvasNode(node.id, {
                    props: { ...props, radius: Number(e.target.value) },
                  })
                }
              />
            </label>
          )}
        </>
      )}

      {/* IMAGE */}
      {isImage && (
        <label className="flex flex-col gap-1">
          Image URL
          <input
            type="text"
            value={props.src ?? ""}
            onChange={(e) =>
              updateCanvasNode(node.id, {
                props: { ...props, src: e.target.value },
              })
            }
            className="input"
          />
        </label>
      )}

      {/* FLAGS */}
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={node.locked ?? false}
            onChange={(e) =>
              updateCanvasNode(node.id, { locked: e.target.checked })
            }
          />
          Locked
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={node.visible ?? true}
            onChange={(e) =>
              updateCanvasNode(node.id, { visible: e.target.checked })
            }
          />
          Visible
        </label>
      </div>

      {/* DELETE */}
      <button
        onClick={() => removeCanvasNode(node.id)}
        className="w-full text-red-600 border border-red-500/40 rounded px-3 py-2 hover:bg-red-500/10"
      >
        Delete Element
      </button>
    </div>
  );
}
