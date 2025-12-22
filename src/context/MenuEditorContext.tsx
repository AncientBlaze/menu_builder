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

/* =====================
   Types
===================== */

export type EditorMode = "menu" | "template";
export type EditorTheme = "light" | "dark";

export type EditorPage = {
  id: string;
  name: string;
  document: MenuDocument;
  savedDocument: MenuDocument;
  isDirty: boolean;
};

type MenuEditorContextValue = {
  /* Menu */
  menu: MenuDocument;
  updateMenu: (partial: Partial<MenuDocument>) => void;

  /* Modes */
  mode: EditorMode;
  setMode: (mode: EditorMode) => void;

  editorTheme: EditorTheme;
  toggleEditorTheme: () => void;

  exportMode: boolean;
  setExportMode: (v: boolean) => void;

  /* Pages */
  pages: EditorPage[];
  activePageId: string | null;
  saveActivePage: () => void;
  openPageFromPreset: (preset: MenuPreset) => void;
  switchPage: (pageId: string) => void;
  closePage: (pageId: string) => void;
  reorderPages: (fromId: string, toId: string) => void;

  /* Sections */
  addSection: () => void;
  removeSection: (sectionId: string) => void;
  reorderSections: (from: number, to: number) => void;

  /* Items */
  addItem: (sectionId: string) => void;
  updateItem: (
    sectionId: string,
    itemId: string,
    patch: Partial<{
      name: string;
      price: number;
      description?: string;
      isVeg: boolean;
    }>
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

export function MenuEditorProvider({
  children,
}: PropsWithChildren) {
  /* Base menu template */
  const { menu: baseMenu } = useMenuDocument();

  /* Editor theme (SSR safe) */
  const [editorTheme, setEditorTheme] =
    useState<EditorTheme>("light");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("editor-theme");
    if (stored === "light" || stored === "dark") {
      setEditorTheme(stored);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("editor-theme", editorTheme);
  }, [editorTheme]);

  const toggleEditorTheme = () =>
    setEditorTheme((t) => (t === "dark" ? "light" : "dark"));

  /* Export mode (PDF / snapshot) */
  const [exportMode, setExportMode] = useState(false);

  /* Menu */
  const [menu, setMenu] =
    useState<MenuDocument>(clone(baseMenu));

  /* Mode */
  const [mode, setMode] =
    useState<EditorMode>("menu");

  /* Pages */
  const [pages, setPages] = useState<EditorPage[]>([]);
  const [activePageId, setActivePageId] =
    useState<string | null>(null);

  /* =====================
     Page helpers
  ===================== */
  const saveActivePage = () => {
    if (!activePageId) return;

    setPages((prev) =>
      prev.map((p) =>
        p.id === activePageId
          ? {
            ...p,
            document: clone(menu),        // ← 🔥 THIS WAS MISSING
            savedDocument: clone(menu),   // ← save CURRENT menu
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
        return prev;
      }

      const doc = clone(preset.document);

      const page: EditorPage = {
        id: preset.id,
        name: preset.name,
        document: doc,
        savedDocument: clone(doc),
        isDirty: false,
      };

      setActivePageId(page.id);
      setMenu(clone(page.document));
      return [...prev, page];
    });
  };


  const switchPage = (pageId: string) => {
    const page = pages.find((p) => p.id === pageId);
    if (!page) return;
    setActivePageId(pageId);
    setMenu(clone(page.document));
  };

  const closePage = (pageId: string) => {
    const page = pages.find(p => p.id === pageId);
    if (page?.isDirty) {
      const ok = confirm("You have unsaved changes. Close anyway?");
      if (!ok) return;
    }
    setPages((prev) => {
      const nextPages = prev.filter((p) => p.id !== pageId);

      // If closing the active page
      if (activePageId === pageId) {
        const next = nextPages[0] ?? null;

        if (next) {
          setActivePageId(next.id);
          setMenu(clone(next.document));
        } else {
          // ✅ LAST TAB CLOSED → RESET PREVIEW
          setActivePageId(null);
          setMenu(initialMenu);
        }
      }

      return nextPages;
    });
  };


  const reorderPages = (fromId: string, toId: string) => {
    setPages((prev) => {
      const from = prev.findIndex((p) => p.id === fromId);
      const to = prev.findIndex((p) => p.id === toId);
      if (from === -1 || to === -1) return prev;
      return arrayMove(prev, from, to);
    });
  };

  /* =====================
     Sync helper
  ===================== */

  const syncActivePage = (
    updater: (m: MenuDocument) => MenuDocument
  ) => {
    setMenu((m) => {
      const next = updater(m);

      setPages((prev) =>
        prev.map((p) => {
          if (p.id !== activePageId) return p;

          const isDirty =
            JSON.stringify(next) !==
            JSON.stringify(p.savedDocument);

          return {
            ...p,
            document: next,
            isDirty,
          };
        })
      );

      return next;
    });
  };


  /* =====================
     Sections
  ===================== */

  const addSection = () =>
    syncActivePage((m) => ({
      ...m,
      sections: [
        ...m.sections,
        { id: nanoid(), title: "New Section", items: [] },
      ],
    }));

  const removeSection = (id: string) =>
    syncActivePage((m) => ({
      ...m,
      sections: m.sections.filter((s) => s.id !== id),
    }));

  const reorderSections = (from: number, to: number) =>
    syncActivePage((m) => ({
      ...m,
      sections: arrayMove(m.sections, from, to),
    }));

  /* =====================
     Items
  ===================== */

  const addItem = (sectionId: string) =>
    syncActivePage((m) => ({
      ...m,
      sections: m.sections.map((s) =>
        s.id === sectionId
          ? {
            ...s,
            items: [
              ...s.items,
              {
                id: nanoid(),
                name: "New Item",
                price: 0,
                isVeg: true,
              },
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
    syncActivePage((m) => ({
      ...m,
      sections: m.sections.map((s) =>
        s.id === sectionId
          ? {
            ...s,
            items: s.items.map((i) =>
              i.id === itemId
                ? {
                  ...i,
                  ...patch,
                  price:
                    typeof patch.price === "number"
                      ? Math.max(patch.price, 0)
                      : i.price,
                }
                : i
            ),
          }
          : s
      ),
    }));

  const removeItem = (sectionId: string, itemId: string) =>
    syncActivePage((m) => ({
      ...m,
      sections: m.sections.map((s) =>
        s.id === sectionId
          ? {
            ...s,
            items: s.items.filter((i) => i.id !== itemId),
          }
          : s
      ),
    }));

  const reorderItems = (
    sectionId: string,
    from: number,
    to: number
  ) =>
    syncActivePage((m) => ({
      ...m,
      sections: m.sections.map((s) =>
        s.id === sectionId
          ? {
            ...s,
            items: arrayMove(s.items, from, to),
          }
          : s
      ),
    }));

  /* =====================
     Context value
  ===================== */

  const value: MenuEditorContextValue = {
    menu,
    updateMenu: (partial) =>
      syncActivePage((m) => ({
        ...m,
        ...partial,
      })),
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
  };

  return (
    <MenuEditorContext.Provider value={value}>
      {children}
    </MenuEditorContext.Provider>
  );
}

/* =====================
   Hook
===================== */

export function useMenuEditor() {
  const ctx = useContext(MenuEditorContext);
  if (!ctx) {
    throw new Error(
      "useMenuEditor must be used inside MenuEditorProvider"
    );
  }
  return ctx;
}
