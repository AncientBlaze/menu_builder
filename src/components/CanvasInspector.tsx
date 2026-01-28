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


          {/* GRADIENT */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={!!node.props.gradient}
              onChange={(e) =>
                updateCanvasNode(node.id, {
                  props: {
                    ...node.props,
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
            Use Gradient
          </label>

          {node.props.gradient && (
            <>
              <label className="flex flex-col gap-1">
                Gradient Type
                <select
                  value={node.props.gradient.type}
                  onChange={(e) =>
                    updateCanvasNode(node.id, {
                      props: {
                        ...node.props,
                        gradient: {
                          ...node.props.gradient,
                          type: e.target.value,
                        },
                      },
                    })
                  }
                  className="input"
                >
                  <option value="linear">Linear</option>
                  <option value="radial">Radial</option>
                </select>
              </label>

              {node.props.gradient.type === "linear" && (
                <label className="flex flex-col gap-1">
                  Angle
                  <input
                    type="range"
                    min={0}
                    max={360}
                    value={node.props.gradient.angle ?? 90}
                    onChange={(e) =>
                      updateCanvasNode(node.id, {
                        props: {
                          ...node.props,
                          gradient: {
                            ...node.props.gradient,
                            angle: Number(e.target.value),
                          },
                        },
                      })
                    }
                  />
                </label>
              )}

              <div className="space-y-2">
                <div className="font-medium">Gradient Stops</div>

                {node.props.gradient.stops.map((stop, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="color"
                      value={stop.color}
                      onChange={(e) => {
                        const stops = [...node.props.gradient.stops];
                        stops[i] = { ...stop, color: e.target.value };

                        updateCanvasNode(node.id, {
                          props: {
                            ...node.props,
                            gradient: {
                              ...node.props.gradient,
                              stops,
                            },
                          },
                        });
                      }}
                    />

                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={stop.position}
                      onChange={(e) => {
                        const stops = [...node.props.gradient.stops];
                        stops[i] = {
                          ...stop,
                          position: Number(e.target.value),
                        };

                        updateCanvasNode(node.id, {
                          props: {
                            ...node.props,
                            gradient: {
                              ...node.props.gradient,
                              stops,
                            },
                          },
                        });
                      }}
                      className="w-16"
                    />
                  </div>
                ))}
              </div>
            </>
          )}



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
          {/* BORDER */}
          <label className="flex flex-col gap-1">
            Border Width
            <input
              type="number"
              min={0}
              value={node.props.borderWidth ?? 0}
              onChange={(e) =>
                updateCanvasNode(node.id, {
                  props: {
                    ...node.props,
                    borderWidth: Number(e.target.value),
                  },
                })
              }
              className="input"
            />
          </label>

          <label className="flex flex-col gap-1">
            Border Color
            <input
              type="color"
              value={node.props.borderColor ?? "#000000"}
              onChange={(e) =>
                updateCanvasNode(node.id, {
                  props: {
                    ...node.props,
                    borderColor: e.target.value,
                  },
                })
              }
            />
          </label>

          <label className="flex flex-col gap-1">
            Border Style
            <select
              value={node.props.borderStyle ?? "solid"}
              onChange={(e) =>
                updateCanvasNode(node.id, {
                  props: {
                    ...node.props,
                    borderStyle: e.target.value,
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

          {/* CORNER RADIUS */}
          <label className="flex flex-col gap-1">
            Corner Radius
            <input
              type="range"
              min={0}
              max={Math.min(node.width, node.height) / 2}
              value={node.props.radius ?? 0}
              onChange={(e) =>
                updateCanvasNode(node.id, {
                  props: {
                    ...node.props,
                    radius: Number(e.target.value),
                  },
                })
              }
            />
          </label>
          {/* SHADOW */}
          <div className="space-y-2">
            <div className="font-medium">Shadow</div>

            <label className="flex flex-col gap-1">
              X Offset
              <input
                type="number"
                value={node.props.shadow?.x ?? 0}
                onChange={(e) =>
                  updateCanvasNode(node.id, {
                    props: {
                      ...node.props,
                      shadow: {
                        ...(node.props.shadow ?? { y: 0, blur: 10, color: "#00000055" }),
                        x: Number(e.target.value),
                      },
                    },
                  })
                }
                className="input"
              />
            </label>

            <label className="flex flex-col gap-1">
              Y Offset
              <input
                type="number"
                value={node.props.shadow?.y ?? 0}
                onChange={(e) =>
                  updateCanvasNode(node.id, {
                    props: {
                      ...node.props,
                      shadow: {
                        ...(node.props.shadow ?? { x: 0, blur: 10, color: "#00000055" }),
                        y: Number(e.target.value),
                      },
                    },
                  })
                }
                className="input"
              />
            </label>

            <label className="flex flex-col gap-1">
              Blur
              <input
                type="number"
                min={0}
                value={node.props.shadow?.blur ?? 0}
                onChange={(e) =>
                  updateCanvasNode(node.id, {
                    props: {
                      ...node.props,
                      shadow: {
                        ...(node.props.shadow ?? { x: 0, y: 0, color: "#00000055" }),
                        blur: Number(e.target.value),
                      },
                    },
                  })
                }
                className="input"
              />
            </label>

            <label className="flex flex-col gap-1">
              Shadow Color
              <input
                type="color"
                value={node.props.shadow?.color ?? "#000000"}
                onChange={(e) =>
                  updateCanvasNode(node.id, {
                    props: {
                      ...node.props,
                      shadow: {
                        ...(node.props.shadow ?? { x: 0, y: 0, blur: 10 }),
                        color: e.target.value,
                      },
                    },
                  })
                }
              />
            </label>
          </div>

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
