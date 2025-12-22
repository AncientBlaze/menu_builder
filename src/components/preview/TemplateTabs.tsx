import { useState } from "react";
import { useMenuEditor } from "@/context/MenuEditorContext";
import { RxCross1 } from "react-icons/rx";
import { FaCheck, FaX } from "react-icons/fa6";
import clsx from "clsx";

export function TemplateTabs() {
  const {
    pages,
    activePageId,
    switchPage,
    closePage,
    reorderPages,
  } = useMenuEditor();

  const [confirmId, setConfirmId] =
    useState<string | null>(null);

  const [draggingId, setDraggingId] =
    useState<string | null>(null);

  if (pages.length === 0) return null;

  return (
    <div
      className="
        flex items-center gap-1
        overflow-x-auto
        px-3 py-2
        rounded-xl
        bg-white/80 backdrop-blur
        border border-slate-200
        shadow-sm
      "
      onClick={() => setConfirmId(null)}
    >
      {pages.map((page) => {
        const isActive = page.id === activePageId;
        const isConfirming = confirmId === page.id;
        const isDragging = draggingId === page.id;

        const accent =
          page.document.theme.accentColor;

        return (
          <div
            key={page.id}
            draggable
            onDragStart={() =>
              setDraggingId(page.id)
            }
            onDragEnd={() =>
              setDraggingId(null)
            }
            onDragOver={(e) => {
              e.preventDefault();
              if (
                draggingId &&
                draggingId !== page.id
              ) {
                reorderPages(draggingId, page.id);
              }
            }}
            className={clsx(
              `
              group relative
              flex items-center gap-2
              px-3 py-1.5
              rounded-lg
              text-sm
              cursor-pointer
              transition-all
              `,
              isActive
                ? "bg-slate-900 text-white shadow"
                : "text-slate-700 hover:bg-slate-100",
              isDragging &&
              "opacity-40 scale-95"
            )}
            onClick={(e) => {
              e.stopPropagation();
              if (!isConfirming) {
                switchPage(page.id);
              }
            }}
          >
            {/* Accent dot */}
            <span
              className={clsx(
                "h-2.5 w-2.5 rounded-full shrink-0",
                isActive
                  ? "ring-2 ring-white"
                  : "ring-1 ring-slate-300"
              )}
              style={{ backgroundColor: accent }}
            />

            {/* Name */}
            <span className="truncate max-w-[120px] flex items-center gap-1">
              {page.name}
              {page.isDirty && (
                <span className="text-red-500 text-xs">●</span>
              )}
            </span>

            {/* Close / Confirm */}
            {!isConfirming ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirmId(page.id);
                }}
                className={clsx(
                  `
                  flex items-center justify-center
                  h-4 w-4 rounded
                  transition
                  `,
                  isActive
                    ? "opacity-80 hover:opacity-100"
                    : "opacity-0 group-hover:opacity-70"
                )}
              >
                <RxCross1 size={11} />
              </button>
            ) : (
              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closePage(page.id);
                    setConfirmId(null);
                  }}
                  className="
                    h-4 w-4
                    flex items-center justify-center
                    rounded
                    text-green-600
                    hover:bg-green-100
                  "
                >
                  <FaCheck size={11} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setConfirmId(null);
                  }}
                  className="
                    h-4 w-4
                    flex items-center justify-center
                    rounded
                    text-red-500
                    hover:bg-red-100
                  "
                >
                  <FaX size={11} />
                </button>
              </div>
            )}

            {/* Active underline */}
            {isActive && (
              <span
                className="absolute -bottom-2 left-3 right-3 h-[2px] rounded-full"
                style={{ backgroundColor: accent }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
