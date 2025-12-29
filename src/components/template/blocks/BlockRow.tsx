import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TemplateBlock } from "@/types/template";
import { templateStore } from "@/stores/templateStore";
import { nanoid } from "nanoid";
import clsx from "clsx";

type Props = {
  block: TemplateBlock;
  selected?: boolean;
  onSelect: () => void;
};

export function BlockRow({ block, selected, onSelect }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const deleteBlock = () => {
    templateStore.setState((s) => ({
      ...s,
      templates: s.templates.map((t) =>
        t.id === s.activeTemplateId
          ? { ...t, blocks: t.blocks.filter((b) => b.id !== block.id) }
          : t
      ),
    }));
  };

  const duplicateBlock = () => {
    templateStore.setState((s) => ({
      ...s,
      templates: s.templates.map((t) =>
        t.id === s.activeTemplateId
          ? {
              ...t,
              blocks: [
                ...t.blocks,
                { ...block, id: nanoid() },
              ],
            }
          : t
      ),
    }));
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={onSelect}
      className={clsx(
        "flex items-center justify-between rounded-lg border p-3 cursor-pointer",
        selected
          ? "border-blue-500 bg-blue-50"
          : "border-slate-200 bg-white"
      )}
    >
      <div className="flex items-center gap-2">
        <span
          {...attributes}
          {...listeners}
          className="cursor-grab text-slate-400"
        >
          ⠿
        </span>
        <span className="capitalize text-sm font-medium">
          {block.type}
        </span>
      </div>

      <div className="flex gap-2 text-xs">
        <button onClick={duplicateBlock}>Duplicate</button>
        <button onClick={deleteBlock} className="text-red-500">
          Delete
        </button>
      </div>
    </div>
  );
}
