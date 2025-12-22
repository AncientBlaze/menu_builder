import { useState } from "react";
import { useMenuEditor } from "@/context/MenuEditorContext";
import { RxCheck, RxCross1 } from "react-icons/rx";
import clsx from "clsx";

export function TemplateTabs() {
  const {
    pages,
    activePageId,
    switchPage,
    closePage,
  } = useMenuEditor();

  const [confirmId, setConfirmId] =
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
        const isActive =
          page.id === activePageId;
        const isConfirming =
          confirmId === page.id;

        return (
          <div
            key={page.id}
            className={clsx(
              `
              group relative
              flex items-center gap-2
              px-3 py-1.5
              rounded-lg
              text-sm
              transition-all
              cursor-pointer
              `,
              isActive
                ? "bg-slate-900 text-white shadow"
                : "text-slate-700 hover:bg-slate-100"
            )}
            onClick={(e) => {
              e.stopPropagation();
              if (!isConfirming) {
                switchPage(page.id);
              }
            }}
          >
            {/* Name */}
            <span
              className={clsx(
                "truncate max-w-[140px]",
                isActive && "font-medium"
              )}
            >
              {page.name}
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
                title="Close tab"
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
                  title="Confirm close"
                  className="
                    h-4 w-4
                    flex items-center justify-center
                    rounded
                    text-green-600
                    hover:bg-green-100
                  "
                >
                  <RxCheck size={11} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setConfirmId(null);
                  }}
                  title="Cancel"
                  className="
                    h-4 w-4
                    flex items-center justify-center
                    rounded
                    text-red-500
                    hover:bg-red-100
                  "
                >
                  <RxCross1 size={11} />
                </button>
              </div>
            )}

            {/* Active underline */}
            {isActive && (
              <span className="absolute -bottom-2 left-3 right-3 h-[2px] bg-slate-900 rounded-full" />
            )}
          </div>
        );
      })}
    </div>
  );
}
