import { useMenuEditor } from "@/context/MenuEditorContext";
import clsx from "clsx";
import { FaEye, FaEyeSlash, FaLock, FaUnlock, FaTrash } from "react-icons/fa6";
import { useState } from "react";


export function LayersPanel() {
  const {
    menu,
    selectedCanvasNodeId,
    selectCanvasNode,
    updateCanvasNode,
    removeCanvasNode,
    updateMenu,
    renameCanvasNode,
  } = useMenuEditor();


  const nodes = [...menu.canvas.nodes].sort(
    (a, b) => b.z - a.z
  );

  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftName, setDraftName] = useState("");


  const moveLayer = (from: number, to: number) => {
    updateMenu((m) => {
      const ordered = [...m.canvas.nodes].sort((a, b) => b.z - a.z);
      const [moved] = ordered.splice(from, 1);
      ordered.splice(to, 0, moved);

      // normalize z values
      const normalized = ordered.map((n, i) => ({
        ...n,
        z: ordered.length - i,
      }));

      return {
        ...m,
        canvas: { nodes: normalized },
      };
    });
  };

  return (
    <div className="space-y-3 text-sm">
      <h3 className="font-semibold text-slate-700 dark:text-slate-200">
        Layers
      </h3>

      {nodes.length === 0 && (
        <p className="text-xs opacity-60">No canvas elements</p>
      )}

      <ul className="space-y-1">
        {nodes.map((node, index) => {
          const selected = node.id === selectedCanvasNodeId;

          return (
            <li
              key={node.id}
              className={clsx(
                "flex items-center gap-2 px-2 py-1 rounded cursor-pointer",
                selected
                  ? "bg-blue-500/15 border border-blue-500/40"
                  : "hover:bg-slate-200/50 dark:hover:bg-slate-700/40",
                node.visible === false && "opacity-40 italic"
              )}

              onClick={() => {
                if (node.visible === false) return;
                selectCanvasNode(node.id);
              }}
            >
              {/* Drag handles */}
              <div className="flex flex-col text-xs leading-none">
                <button
                  disabled={index === 0}
                  onClick={(e) => {
                    e.stopPropagation();
                    moveLayer(index, index - 1);
                  }}
                >
                  ▲
                </button>
                <button
                  disabled={index === nodes.length - 1}
                  onClick={(e) => {
                    e.stopPropagation();
                    moveLayer(index, index + 1);
                  }}
                >
                  ▼
                </button>
              </div>

              {/* Label */}
              <div className="flex-1 truncate">
                {editingId === node.id ? (
                  <input
                    autoFocus
                    value={draftName}
                    onChange={(e) => setDraftName(e.target.value)}
                    onBlur={() => {
                      renameCanvasNode(node.id, draftName.trim() || node.type);
                      setEditingId(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        renameCanvasNode(node.id, draftName.trim() || node.type);
                        setEditingId(null);
                      }
                      if (e.key === "Escape") {
                        setEditingId(null);
                      }
                    }}
                    className="
        w-full bg-transparent
        border border-blue-400/40
        rounded px-1 text-sm
        outline-none
      "
                  />
                ) : (
                  <span
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      setEditingId(node.id);
                      setDraftName(node.name || node.type);
                    }}
                    className="cursor-text"
                    title="Double click to rename"
                  >
                    {node.name || node.type}
                  </span>
                )}
              </div>


              {/* Visibility */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateCanvasNode(node.id, {
                    visible: node.visible === false ? true : false,
                  });
                }}
              >
                {node.visible === false ? <FaEyeSlash /> : <FaEye />}
              </button>

              {/* Lock */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateCanvasNode(node.id, {
                    locked: !node.locked,
                  });
                }}
              >
                {node.locked ? <FaLock /> : <FaUnlock />}
              </button>

              {/* Delete */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeCanvasNode(node.id);
                }}
                className="text-red-500"
              >
                <FaTrash />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
