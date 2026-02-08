import { MenuDocument } from "@/types/menu";
import clsx from "clsx";

type Props = {
  document: MenuDocument;
  active?: boolean;
};

export function PresetPreview({ document, active = false }: Props) {
  const snapshot = document.meta.snapshotUrl;

  return (
    <div
      className={clsx(
        "rounded-lg overflow-hidden transition bg-slate-100",
        active
          ? "ring-2 ring-blue-500 shadow-md"
          : "hover:ring-1 hover:ring-slate-400"
      )}
    >
      {/* Snapshot container */}
      <div className="aspect-[3/4] w-full bg-slate-200 relative">
        {snapshot ? (
          <img
            src={snapshot}
            alt={document.meta.templateName ?? "Menu template"}
            className="w-full h-full object-cover"
            draggable={false}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-xs opacity-60">
            No preview available
          </div>
        )}
      </div>

      {/* Name */}
      <div className="p-2 text-center text-xs font-medium truncate">
        {document.meta.templateName}
      </div>
    </div>
  );
}
