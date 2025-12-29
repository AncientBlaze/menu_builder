import {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  useEffect,
} from "react";
import { initialMenu, useMenuDocument } from "@/hooks/useMenuDocument";
import { MenuDocument } from "@/types/menu";
import { MenuPreset } from "@/types/preset";
import { nanoid } from "nanoid";
import { arrayMove } from "@/utils/reorder";
import { templateStore } from "@/stores/templateStore";

/* =====================
   Types
===================== */

export type EditorMode = "menu" | "template";
export type RenderMode = "editor" | "qr" | "export";
export type EditorTheme = "light" | "dark";

export type EditorPage = {
  id: string;
  name: string;
  document: MenuDocument;
  savedDocument: MenuDocument;
  isDirty: boolean;
};

/* 🔥 updateMenu now supports function OR object */
type MenuUpdater =
  | Partial<MenuDocument>
  | ((m: MenuDocument) => MenuDocument);

type MenuEditorContextValue = {
  menu: MenuDocument;
  updateMenu: (updater: MenuUpdater) => void;

  renderMode: RenderMode;
  setRenderMode: (m: RenderMode) => void;

  mode: EditorMode;
  setMode: (mode: EditorMode) => void;

  editorTheme: EditorTheme;
  toggleEditorTheme: () => void;

  exportMode: boolean;
  setExportMode: (v: boolean) => void;

  pages: EditorPage[];
  activePageId: string | null;
  saveActivePage: () => void;
  openPageFromPreset: (preset: MenuPreset) => void;
  switchPage: (pageId: string) => void;
  closePage: (pageId: string) => void;
  reorderPages: (fromId: string, toId: string) => void;

  addSection: () => void;
  removeSection: (sectionId: string) => void;
  reorderSections: (from: number, to: number) => void;

  addItem: (sectionId: string) => void;
  updateItem: (
    sectionId: string,
    itemId: string,
    patch: Partial<any>
  ) => void;
  removeItem: (sectionId: string, itemId: string) => void;
  reorderItems: (sectionId: string, from: number, to: number) => void;
};

const MenuEditorContext =
  createContext<MenuEditorContextValue | null>(null);

/* =====================
   Helpers
===================== */

const clone = <T,>(v: T): T =>
  JSON.parse(JSON.stringify(v));

/* =====================
   Provider
===================== */

export function MenuEditorProvider({ children }: PropsWithChildren) {
  const { menu: baseMenu } = useMenuDocument();

  const [renderMode, setRenderMode] =
    useState<RenderMode>("editor");

  const [editorTheme, setEditorTheme] =
    useState<EditorTheme>("light");

  useEffect(() => {
    const stored = localStorage.getItem("editor-theme");
    if (stored === "light" || stored === "dark") {
      setEditorTheme(stored);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("editor-theme", editorTheme);
  }, [editorTheme]);

  const toggleEditorTheme = () =>
    setEditorTheme((t) => (t === "dark" ? "light" : "dark"));

  const [exportMode, setExportMode] = useState(false);
  const [menu, setMenu] =
    useState<MenuDocument>(clone(baseMenu));

  const [mode, setMode] =
    useState<EditorMode>("menu");

  const [pages, setPages] = useState<EditorPage[]>([]);
  const [activePageId, setActivePageId] =
    useState<string | null>(null);

  /* =====================
     Core sync logic
  ===================== */

  const syncActivePage = (
    updater: (m: MenuDocument) => MenuDocument
  ) => {
    setMenu((current) => {
      const next = updater(current);

      setPages((prev) =>
        prev.map((p) =>
          p.id === activePageId
            ? {
                ...p,
                document: next,
                isDirty:
                  JSON.stringify(next) !==
                  JSON.stringify(p.savedDocument),
              }
            : p
        )
      );

      return next;
    });
  };

  /* 🔥 FIXED updateMenu */
  const updateMenu = (updater: MenuUpdater) => {
    syncActivePage((m) =>
      typeof updater === "function"
        ? updater(m)
        : { ...m, ...updater }
    );
  };

  /* =====================
     Pages
  ===================== */

  const saveActivePage = () => {
    if (!activePageId) return;

    setPages((prev) =>
      prev.map((p) =>
        p.id === activePageId
          ? {
              ...p,
              document: clone(menu),
              savedDocument: clone(menu),
              isDirty: false,
            }
          : p
      )
    );
  };

  const openPageFromPreset = (preset: MenuPreset) => {
  setPages((prev) => {
    const existing = prev.find((p) => p.id === preset.id);

    if (existing) {
      setActivePageId(existing.id);
      setMenu(clone(existing.document));

      // 🔥 sync template if present
      const templateId = existing.document.meta.templateId;
      if (templateId) {
        templateStore.setState((s) => ({
          ...s,
          activeTemplateId: templateId,
        }));
      }

      return prev;
    }

    const doc = clone(preset.document);

    setActivePageId(preset.id);
    setMenu(doc);

    // 🔥 sync template if present
    if (doc.meta.templateId) {
      templateStore.setState((s) => ({
        ...s,
        activeTemplateId: doc.meta.templateId!,
      }));
    }

    return [
      ...prev,
      {
        id: preset.id,
        name: preset.name,
        document: doc,
        savedDocument: clone(doc),
        isDirty: false,
      },
    ];
  });
};

  const switchPage = (pageId: string) => {
    const page = pages.find((p) => p.id === pageId);
    if (!page) return;
    setActivePageId(pageId);
    setMenu(clone(page.document));
  };

  const closePage = (pageId: string) => {
    const page = pages.find((p) => p.id === pageId);
    if (page?.isDirty && !confirm("Unsaved changes. Close anyway?")) return;

    setPages((prev) => {
      const next = prev.filter((p) => p.id !== pageId);
      if (activePageId === pageId) {
        const fallback = next[0];
        setActivePageId(fallback?.id ?? null);
        setMenu(fallback ? clone(fallback.document) : initialMenu);
      }
      return next;
    });
  };

  const reorderPages = (fromId: string, toId: string) => {
    setPages((prev) => {
      const from = prev.findIndex((p) => p.id === fromId);
      const to = prev.findIndex((p) => p.id === toId);
      return from === -1 || to === -1
        ? prev
        : arrayMove(prev, from, to);
    });
  };

  /* =====================
     Sections & Items
  ===================== */

  const addSection = () =>
    updateMenu((m) => ({
      ...m,
      sections: [
        ...m.sections,
        { id: nanoid(), title: "New Section", items: [] },
      ],
    }));

  const removeSection = (id: string) =>
    updateMenu((m) => ({
      ...m,
      sections: m.sections.filter((s) => s.id !== id),
    }));

  const reorderSections = (from: number, to: number) =>
    updateMenu((m) => ({
      ...m,
      sections: arrayMove(m.sections, from, to),
    }));

  const addItem = (sectionId: string) =>
    updateMenu((m) => ({
      ...m,
      sections: m.sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              items: [
                ...s.items,
                { id: nanoid(), name: "New Item", price: 0, isVeg: true },
              ],
            }
          : s
      ),
    }));

  const updateItem = (
    sectionId: string,
    itemId: string,
    patch: any
  ) =>
    updateMenu((m) => ({
      ...m,
      sections: m.sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              items: s.items.map((i) =>
                i.id === itemId ? { ...i, ...patch } : i
              ),
            }
          : s
      ),
    }));

  const removeItem = (sectionId: string, itemId: string) =>
    updateMenu((m) => ({
      ...m,
      sections: m.sections.map((s) =>
        s.id === sectionId
          ? { ...s, items: s.items.filter((i) => i.id !== itemId) }
          : s
      ),
    }));

  const reorderItems = (sectionId: string, from: number, to: number) =>
    updateMenu((m) => ({
      ...m,
      sections: m.sections.map((s) =>
        s.id === sectionId
          ? { ...s, items: arrayMove(s.items, from, to) }
          : s
      ),
    }));

  /* =====================
     Context
  ===================== */

  return (
    <MenuEditorContext.Provider
      value={{
        menu,
        updateMenu,
        renderMode,
        setRenderMode,
        mode,
        setMode,
        editorTheme,
        toggleEditorTheme,
        exportMode,
        setExportMode,
        pages,
        activePageId,
        saveActivePage,
        openPageFromPreset,
        switchPage,
        closePage,
        reorderPages,
        addSection,
        removeSection,
        reorderSections,
        addItem,
        updateItem,
        removeItem,
        reorderItems,
      }}
    >
      {children}
    </MenuEditorContext.Provider>
  );
}

/* =====================
   Hook
===================== */

export function useMenuEditor() {
  const ctx = useContext(MenuEditorContext);
  if (!ctx) throw new Error("useMenuEditor must be used inside provider");
  return ctx;
}
