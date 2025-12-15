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
      className="mb-4"
    >
      <div
        {...listeners}
        {...attributes}
        className="cursor-grab text-sm mb-1 select-none"
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
      className="mb-2"
    >
      <div
        {...listeners}
        {...attributes}
        className="cursor-grab text-xs mb-1 select-none"
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
    setMenu,
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
    <div className="bg-white rounded-xl p-4 shadow">
      <h3 className="font-semibold mb-4">
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
              <div className="border rounded p-3">
                {/* Section Header */}
                <div className="flex items-center gap-2 mb-3">
                  <input
                    className="flex-1 border-b font-medium"
                    value={section.title}
                    onChange={(e) =>
                      setMenu((m) => ({
                        ...m,
                        sections: m.sections.map((s) =>
                          s.id === section.id
                            ? {
                                ...s,
                                title: e.target.value,
                              }
                            : s
                        ),
                      }))
                    }
                  />

                  <button
                    onClick={() =>
                      removeSection(section.id)
                    }
                    className="text-red-500 text-sm"
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
                  className="mt-2 text-sm bg-black text-white px-3 py-1 rounded"
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
        className="w-full bg-black text-white py-2 rounded mt-4"
      >
        + Add Section
      </button>
    </div>
  );
}
