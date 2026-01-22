import { useMenuEditor } from "@/context/MenuEditorContext";

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
  );

  if (!node) return null;

  const isShape = node.type === "shape";
  const isImage = node.type === "image";

  return (
    <div className="space-y-4 text-sm">
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
                offset: {
                  ...node.offset,
                  x: Number(e.target.value),
                },
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
                offset: {
                  ...node.offset,
                  y: Number(e.target.value),
                },
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

      {/* SHAPE CONTROLS */}
      {isShape && (
        <>
          <label className="flex flex-col gap-1">
            Fill
            <input
              type="color"
              value={node.props.fill ?? "#000000"}
              onChange={(e) =>
                updateCanvasNode(node.id, {
                  props: {
                    ...node.props,
                    fill: e.target.value,
                  },
                })
              }
            />
          </label>

          <label className="flex flex-col gap-1">
            Opacity
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={node.props.opacity ?? 1}
              onChange={(e) =>
                updateCanvasNode(node.id, {
                  props: {
                    ...node.props,
                    opacity: Number(e.target.value),
                  },
                })
              }
            />
          </label>
        </>
      )}

      {/* IMAGE CONTROLS */}
      {isImage && (
        <label className="flex flex-col gap-1">
          Image URL
          <input
            type="text"
            value={node.props.src ?? ""}
            onChange={(e) =>
              updateCanvasNode(node.id, {
                props: {
                  ...node.props,
                  src: e.target.value,
                },
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
              updateCanvasNode(node.id, {
                locked: e.target.checked,
              })
            }
          />
          Locked
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={node.visible ?? true}
            onChange={(e) =>
              updateCanvasNode(node.id, {
                visible: e.target.checked,
              })
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
