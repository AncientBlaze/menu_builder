import {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  useEffect,
} from "react";
import { nanoid } from "nanoid";
import { arrayMove } from "@/utils/reorder";
import { useMenuDocument } from "@/hooks/useMenuDocument";
import { MenuDocument } from "@/types/menu";
import { MenuPreset } from "@/types/preset";
import { CanvasNode } from "@/types/canvas";

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

type MenuUpdater =
  | Partial<MenuDocument>
  | ((m: MenuDocument) => MenuDocument);

type MenuEditorContextValue = {
  /* Core */
  menu: MenuDocument;
  updateMenu: (updater: MenuUpdater) => void;

  renderMode: RenderMode;
  setRenderMode: (m: RenderMode) => void;

  mode: EditorMode;
  setMode: (m: EditorMode) => void;

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
  removeSection: (id: string) => void;
  reorderSections: (from: number, to: number) => void;

  /* Items */
  addItem: (sectionId: string) => void;
  updateItem: (sectionId: string, itemId: string, patch: any) => void;
  removeItem: (sectionId: string, itemId: string) => void;
  reorderItems: (sectionId: string, from: number, to: number) => void;

  /* Canvas */
  addCanvasNode: (node: Partial<CanvasNode>) => void;
  updateCanvasNode: (id: string, patch: Partial<CanvasNode>) => void;
  removeCanvasNode: (id: string) => void;

  /* Canvas selection */
  selectedCanvasNodeId: string | null;
  selectCanvasNode: (id: string | null) => void;
  groupCanvasNodes: (ids: string[]) => void;
  ungroupCanvasGroup: (groupId: string) => void;
  renameCanvasNode: (id: string, name: string) => void;


  /* ✅ z-order */
  bringForward: (id: string) => void;
  sendBackward: (id: string) => void;
};


/* =====================
   Utils
===================== */

const clone = <T,>(v: T): T => JSON.parse(JSON.stringify(v));

/* =====================
   Context
===================== */

const MenuEditorContext =
  createContext<MenuEditorContextValue | null>(null);

/* =====================
   Provider
===================== */

export function MenuEditorProvider({ children }: PropsWithChildren) {
  const { menu: baseMenu } = useMenuDocument();

  const [menu, setMenu] = useState<MenuDocument>(() => {
    const m = clone(baseMenu);
    if (!m.canvas) m.canvas = { nodes: [] };
    return m;
  });

  const [renderMode, setRenderMode] = useState<RenderMode>("editor");
  const [mode, setMode] = useState<EditorMode>("menu");
  const [exportMode, setExportMode] = useState(false);

  const [editorTheme, setEditorTheme] =
    useState<EditorTheme>("light");

  const [pages, setPages] = useState<EditorPage[]>([]);
  const [activePageId, setActivePageId] =
    useState<string | null>(null);

  /* ✅ NEW: canvas selection state */
  const [selectedCanvasNodeId, setSelectedCanvasNodeId] =
    useState<string | null>(null);

  const selectCanvasNode = (id: string | null) =>
    setSelectedCanvasNodeId(id);

  /* ---------- Theme persistence ---------- */

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

  /* =====================
     Core sync
  ===================== */

  const syncActivePage = (fn: (m: MenuDocument) => MenuDocument) => {
    setMenu((current) => {
      const next = fn(current);

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

  const updateMenu = (updater: MenuUpdater) =>
    syncActivePage((m) =>
      typeof updater === "function"
        ? updater(m)
        : { ...m, ...updater }
    );

  /* =====================
     Pages
  ===================== */

  const switchPage = (pageId: string) => {
  setPages((prev) => {
    const page = prev.find((p) => p.id === pageId);
    if (!page) return prev;

    setActivePageId(pageId);
    setMenu(clone(page.document));

    return prev;
  });
};

const closePage = (pageId: string) => {
  setPages((prev) => {
    const next = prev.filter((p) => p.id !== pageId);

    // ✅ If no pages left → blank editor
    if (next.length === 0) {
      setActivePageId(null);
      setMenu({
        meta: {
          restaurantName: "",
          currency: "₨",
        },
        theme: {
          theme: "light",
          fontFamily: "Inter",
          accentColor: "#0f172a",
          layout: "single-column",
          density: "comfortable",
          dividerStyle: "none",
          priceAlignment: "right",
        },
        sections: [],
        canvas: { nodes: [] },
      });
      return [];
    }

    // ✅ If closing active page → switch to last
    if (activePageId === pageId) {
      const fallback = next[next.length - 1];
      setActivePageId(fallback.id);
      setMenu(clone(fallback.document));
    }

    return next;
  });
};


const reorderPages = (fromId: string, toId: string) => {
  setPages((prev) => {
    const fromIndex = prev.findIndex((p) => p.id === fromId);
    const toIndex = prev.findIndex((p) => p.id === toId);
    if (fromIndex === -1 || toIndex === -1) return prev;

    return arrayMove(prev, fromIndex, toIndex);
  });
};


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
        return prev;
      }

      const doc = clone(preset.document);
      if (!doc.canvas) doc.canvas = { nodes: [] };

      setActivePageId(preset.id);
      setMenu(doc);

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

  /* =====================
     Sections & Items
  ===================== */

  const bringForward = (id: string) =>
  updateMenu((m) => {
    const nodes = [...m.canvas.nodes].sort((a, b) => a.z - b.z);
    const index = nodes.findIndex((n) => n.id === id);
    if (index === -1 || index === nodes.length - 1) return m;

    const a = nodes[index];
    const b = nodes[index + 1];

    const temp = a.z;
    a.z = b.z;
    b.z = temp;

    return { ...m, canvas: { nodes } };
  });

  const sendBackward = (id: string) =>
  updateMenu((m) => {
    const nodes = [...m.canvas.nodes].sort((a, b) => a.z - b.z);
    const index = nodes.findIndex((n) => n.id === id);
    if (index <= 0) return m;

    const a = nodes[index];
    const b = nodes[index - 1];

    const temp = a.z;
    a.z = b.z;
    b.z = temp;

    return { ...m, canvas: { nodes } };
  });

  const groupCanvasNodes = (ids: string[]) =>
  updateMenu((m) => {
    const gid = nanoid();

    return {
      ...m,
      canvas: {
        nodes: m.canvas.nodes.map((n) =>
          ids.includes(n.id)
            ? { ...n, groupId: gid }
            : n
        ),
      },
    };
  });

const ungroupCanvasGroup = (groupId: string) =>
  updateMenu((m) => ({
    ...m,
    canvas: {
      nodes: m.canvas.nodes.map((n) =>
        n.groupId === groupId
          ? { ...n, groupId: null }
          : n
      ),
    },
  }));

const renameCanvasNode = (id: string, name: string) =>
  updateMenu((m) => ({
    ...m,
    canvas: {
      nodes: m.canvas.nodes.map((n) =>
        n.id === id ? { ...n, name } : n
      ),
    },
  }));


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

  const updateItem = (sectionId: string, itemId: string, patch: any) =>
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
     Canvas
  ===================== */

  const addCanvasNode = (node: Partial<CanvasNode>) =>
  updateMenu((m) => ({
    ...m,
    canvas: {
      nodes: [
        ...m.canvas.nodes,
        {
          id: nanoid(),
          type: "shape",
          anchor: "center",
          offset: { x: 0, y: 0 },
          width: 120,
          height: 120,
          z: 5,
          visible: true,
          locked: false,
          name: undefined,
          groupId: null, // ✅ REQUIRED
          props: {},
          ...node,
        } satisfies CanvasNode,
      ],
    },
  }));


  const updateCanvasNode = (id: string, patch: Partial<CanvasNode>) =>
    updateMenu((m) => ({
      ...m,
      canvas: {
        nodes: m.canvas.nodes.map((n) =>
          n.id === id ? { ...n, ...patch } : n
        ),
      },
    }));

  const removeCanvasNode = (id: string) =>
    updateMenu((m) => ({
      ...m,
      canvas: {
        nodes: m.canvas.nodes.filter((n) => n.id !== id),
      },
    }));

  /* =====================
     Provider
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
        bringForward,
        sendBackward,

        addSection,
        removeSection,
        reorderSections,
        addItem,
        updateItem,
        removeItem,
        reorderItems,
        addCanvasNode,
        updateCanvasNode,
        removeCanvasNode,
        selectedCanvasNodeId,
        selectCanvasNode,
        groupCanvasNodes,
        renameCanvasNode,
        ungroupCanvasGroup,
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
  if (!ctx) {
    throw new Error("useMenuEditor must be used inside provider");
  }
  return ctx;
}
