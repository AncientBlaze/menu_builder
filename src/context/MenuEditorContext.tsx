import {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
} from "react";
import { useMenuDocument } from "@/hooks/useMenuDocument";
import { MenuDocument } from "@/types/menu";
import { MenuPreset } from "@/types/preset";
import { nanoid } from "nanoid";
import { arrayMove } from "@/utils/reorder";

/* =====================
   Editor Mode
===================== */

export type EditorMode = "menu" | "template";

/* =====================
   Template Page
===================== */

export type EditorPage = {
  id: string;
  name: string;
  document: MenuDocument;
};

/* =====================
   Context Type
===================== */

type MenuEditorContextValue = {
  /* Active document */
  menu: MenuDocument;
  setMenu: React.Dispatch<
    React.SetStateAction<MenuDocument>
  >;
  updateMenu: (partial: Partial<MenuDocument>) => void;

  /* Mode */
  mode: EditorMode;
  setMode: (mode: EditorMode) => void;

  /* Pages (multi-template) */
  pages: EditorPage[];
  activePageId: string | null;
  openPageFromPreset: (preset: MenuPreset) => void;
  switchPage: (pageId: string) => void;
  closePage: (pageId: string) => void;

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
  reorderItems: (
    sectionId: string,
    from: number,
    to: number
  ) => void;
};

const MenuEditorContext =
  createContext<MenuEditorContextValue | null>(null);

/* =====================
   Provider
===================== */

export function MenuEditorProvider({
  children,
}: PropsWithChildren) {
  const base = useMenuDocument();

  /* Active editor document */
  const [menu, setMenu] = useState<MenuDocument>(
    base.menu
  );

  /* Editor Mode */
  const [mode, setMode] =
    useState<EditorMode>("menu");

  /* Pages */
  const [pages, setPages] = useState<
    EditorPage[]
  >([]);
  const [activePageId, setActivePageId] =
    useState<string | null>(null);

  /* =====================
     Page helpers
  ===================== */

  const openPageFromPreset = (
    preset: MenuPreset
  ) => {
    setPages((prev) => {
      const exists = prev.find(
        (p) => p.id === preset.id
      );
      if (exists) {
        setActivePageId(exists.id);
        setMenu(structuredClone(exists.document));
        return prev;
      }

      const page: EditorPage = {
        id: preset.id,
        name: preset.name,
        document: structuredClone(
          preset.document
        ),
      };

      setActivePageId(page.id);
      setMenu(structuredClone(page.document));
      return [...prev, page];
    });
  };

  const switchPage = (pageId: string) => {
    const page = pages.find(
      (p) => p.id === pageId
    );
    if (!page) return;

    setActivePageId(pageId);
    setMenu(structuredClone(page.document));
  };

  const closePage = (pageId: string) => {
    setPages((prev) =>
      prev.filter((p) => p.id !== pageId)
    );

    if (activePageId === pageId) {
      const next =
        pages.find((p) => p.id !== pageId) ??
        null;

      setActivePageId(next?.id ?? null);
      if (next) {
        setMenu(
          structuredClone(next.document)
        );
      }
    }
  };

  /* =====================
     Sync active page
  ===================== */

  const syncActivePage = (
    updater: (m: MenuDocument) => MenuDocument
  ) => {
    setMenu((m) => {
      const next = updater(m);
      setPages((prev) =>
        prev.map((p) =>
          p.id === activePageId
            ? { ...p, document: next }
            : p
        )
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
        {
          id: nanoid(),
          title: "New Section",
          items: [],
        },
      ],
    }));

  const removeSection = (sectionId: string) =>
    syncActivePage((m) => ({
      ...m,
      sections: m.sections.filter(
        (s) => s.id !== sectionId
      ),
    }));

  const reorderSections = (
    from: number,
    to: number
  ) =>
    syncActivePage((m) => ({
      ...m,
      sections: arrayMove(
        m.sections,
        from,
        to
      ),
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
    patch: Partial<{
      name: string;
      price: number;
      description?: string;
      isVeg: boolean;
    }>
  ) =>
    syncActivePage((m) => ({
      ...m,
      sections: m.sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              items: s.items.map((i) =>
                i.id === itemId
                  ? { ...i, ...patch }
                  : i
              ),
            }
          : s
      ),
    }));

  const removeItem = (
    sectionId: string,
    itemId: string
  ) =>
    syncActivePage((m) => ({
      ...m,
      sections: m.sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              items: s.items.filter(
                (i) => i.id !== itemId
              ),
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
              items: arrayMove(
                s.items,
                from,
                to
              ),
            }
          : s
      ),
    }));

  /* =====================
     Context value
  ===================== */

  const value: MenuEditorContextValue = {
    menu,
    setMenu,
    updateMenu: (partial) =>
      syncActivePage((m) => ({
        ...m,
        ...partial,
      })),

    mode,
    setMode,

    pages,
    activePageId,
    openPageFromPreset,
    switchPage,
    closePage,

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
