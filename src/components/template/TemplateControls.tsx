import { useState } from "react";
import { templateStore } from "@/stores/templateStore";
import { TemplateBlock } from "@/types/template";
import { createBlock } from "./helper/createBlock";
import clsx from "clsx";

export function TemplateControls() {
  const { templates, activeTemplateId } = templateStore.state;
  const template = templates.find(t => t.id === activeTemplateId);

  const [selectedId, setSelectedId] =
    useState<string | null>(null);

  if (!template) {
    return (
      <div className="text-sm text-slate-500">
        No template selected
      </div>
    );
  }

  const addBlock = (type: TemplateBlock["type"]) => {
    templateStore.setState(s => ({
      ...s,
      templates: s.templates.map(t =>
        t.id === activeTemplateId
          ? { ...t, blocks: [...t.blocks, createBlock(type)] }
          : t
      ),
    }));
  };

  const deleteBlock = (id: string) => {
    templateStore.setState(s => ({
      ...s,
      templates: s.templates.map(t =>
        t.id === activeTemplateId
          ? { ...t, blocks: t.blocks.filter(b => b.id !== id) }
          : t
      ),
    }));
    setSelectedId(null);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xs font-semibold uppercase text-slate-500">
        Template Blocks
      </h3>

      {/* Add block buttons */}
      <div className="grid grid-cols-2 gap-2">
        <BlockButton onClick={() => addBlock("header")}>
          + Header
        </BlockButton>
        <BlockButton onClick={() => addBlock("sections")}>
          + Sections
        </BlockButton>
        <BlockButton onClick={() => addBlock("divider")}>
          + Divider
        </BlockButton>
        <BlockButton onClick={() => addBlock("spacer")}>
          + Spacer
        </BlockButton>
      </div>

      {/* Block list */}
      <div className="space-y-2">
        {template.blocks.map((b, i) => (
          <div
            key={b.id}
            onClick={() => setSelectedId(b.id)}
            className={clsx(
              "border rounded-lg p-3 flex justify-between items-center cursor-pointer",
              selectedId === b.id
                ? "border-blue-500 bg-blue-50"
                : "border-slate-200 bg-white"
            )}
          >
            <div className="text-sm font-medium capitalize">
              {i + 1}. {b.type}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteBlock(b.id);
              }}
              className="text-xs text-red-500 hover:text-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function BlockButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-2 rounded-md text-sm border bg-slate-100 hover:bg-slate-200"
    >
      {children}
    </button>
  );
}
