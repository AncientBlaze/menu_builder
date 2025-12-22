import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { useMenuEditor } from "@/context/MenuEditorContext";
import { MenuItemRow } from "./MenuItemRow";

/* ─────────────────────────────────────────── */
/* Sortable Wrappers */
/* ─────────────────────────────────────────── */

function SortableSection({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className="mb-5"
    >
      <div
        {...listeners}
        {...attributes}
        className="
          cursor-grab select-none
          text-xs font-medium mb-2
          text-slate-500 dark:text-slate-400
        "
      >
        ⠿ Section
      </div>
      {children}
    </div>
  );
}

function SortableItem({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className="mb-3"
    >
      <div
        {...listeners}
        {...attributes}
        className="
          cursor-grab select-none
          text-[11px] mb-1
          text-slate-400 dark:text-slate-500
        "
      >
        ⠿ Item
      </div>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────── */
/* Main Sections Editor */
/* ─────────────────────────────────────────── */

export function SectionsEditor() {
  const {
    menu,
    updateMenu,
    addSection,
    addItem,
    removeSection,
    reorderSections,
    reorderItems,
  } = useMenuEditor();

  /* Section drag end */
  const onSectionDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const from = menu.sections.findIndex(
      (s) => s.id === active.id
    );
    const to = menu.sections.findIndex(
      (s) => s.id === over.id
    );

    if (from !== -1 && to !== -1) {
      reorderSections(from, to);
    }
  };

  return (
    <div
      className="
        rounded-2xl p-4
        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-800
        shadow-sm
      "
    >
      <h3 className="text-sm font-semibold mb-4 text-slate-800 dark:text-slate-200">
        Sections & Items
      </h3>

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={onSectionDragEnd}
      >
        <SortableContext
          items={menu.sections.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          {menu.sections.map((section) => (
            <SortableSection
              key={section.id}
              id={section.id}
            >
              <div
                className="
                  rounded-xl p-4 space-y-3
                  bg-slate-50 dark:bg-slate-800
                  border border-slate-200 dark:border-slate-700
                "
              >
                {/* Section Header */}
                <div className="flex items-center gap-2">
                  <input
                    className="
                      flex-1 bg-transparent
                      border-b border-slate-300 dark:border-slate-600
                      text-sm font-medium
                      text-slate-900 dark:text-slate-100
                      focus:outline-none
                      focus:border-slate-500
                    "
                    value={section.title}
                    onChange={(e) =>
                      updateMenu({
                        sections: menu.sections.map((s) =>
                          s.id === section.id
                            ? { ...s, title: e.target.value }
                            : s
                        ),
                      })
                    }

                  />

                  <button
                    onClick={() =>
                      removeSection(section.id)
                    }
                    className="
                      text-md text-red-500
                      hover:text-red-600 py-2 px-2
                    "
                    title="Remove section"
                  >
                    ✕
                  </button>
                </div>

                {/* Items */}
                <DndContext
                  collisionDetection={closestCenter}
                  onDragEnd={(event) => {
                    const { active, over } = event;
                    if (
                      !over ||
                      active.id === over.id
                    )
                      return;

                    const from =
                      section.items.findIndex(
                        (i) => i.id === active.id
                      );
                    const to =
                      section.items.findIndex(
                        (i) => i.id === over.id
                      );

                    if (from !== -1 && to !== -1) {
                      reorderItems(
                        section.id,
                        from,
                        to
                      );
                    }
                  }}
                >
                  <SortableContext
                    items={section.items.map(
                      (i) => i.id
                    )}
                    strategy={
                      verticalListSortingStrategy
                    }
                  >
                    {section.items.map((item) => (
                      <SortableItem
                        key={item.id}
                        id={item.id}
                      >
                        <MenuItemRow
                          sectionId={section.id}
                          item={item}
                        />
                      </SortableItem>
                    ))}
                  </SortableContext>
                </DndContext>

                {/* Add Item */}
                <button
                  onClick={() => addItem(section.id)}
                  className="
                    mt-1 inline-flex
                    px-3 py-1.5
                    rounded-md text-xs font-medium
                    bg-slate-900 text-white
                    dark:bg-slate-100 dark:text-slate-900
                    hover:opacity-90
                  "
                >
                  + Add Item
                </button>
              </div>
            </SortableSection>
          ))}
        </SortableContext>
      </DndContext>

      {/* Add Section */}
      <button
        onClick={addSection}
        className="
          w-full mt-4
          py-2 rounded-lg
          text-sm font-semibold
          bg-slate-900 text-white
          dark:bg-slate-100 dark:text-slate-900
          hover:opacity-90
        "
      >
        + Add Section
      </button>
    </div>
  );
}
