import {
  createContext,
  useContext,
  PropsWithChildren,
} from "react";
import { useMenuDocument } from "@/hooks/useMenuDocument";
import { MenuDocument } from "@/types/menu";
import { nanoid } from "nanoid";
import { arrayMove } from "@/utils/reorder";

type MenuEditorContextValue = {
  menu: MenuDocument;
  setMenu: React.Dispatch<
    React.SetStateAction<MenuDocument>
  >;
  updateMenu: (partial: Partial<MenuDocument>) => void;
  addSection: () => void;
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
  removeSection: (sectionId: string) => void;
  removeItem: (sectionId: string, itemId: string) => void;
  reorderSections: (from: number, to: number) => void;
  reorderItems: (
    sectionId: string,
    from: number,
    to: number
  ) => void;
};

const MenuEditorContext =
  createContext<MenuEditorContextValue | null>(null);

export function MenuEditorProvider({
  children,
}: PropsWithChildren) {
  const { menu, setMenu, updateMenu, addSection } =
    useMenuDocument();

  const addItem = (sectionId: string) => {
    setMenu((m) => ({
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
  };

  const updateItem = (
    sectionId: string,
    itemId: string,
    patch: Partial<{
      name: string;
      price: number;
      description?: string;
      isVeg: boolean;
    }>
  ) => {
    setMenu((m) => ({
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
  };

  const removeSection = (sectionId: string) => {
    setMenu((m) => ({
      ...m,
      sections: m.sections.filter(
        (s) => s.id !== sectionId
      ),
    }));
  };

  const removeItem = (sectionId: string, itemId: string) => {
    setMenu((m) => ({
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
  };

  const reorderSections = (from: number, to: number) => {
    setMenu((m) => ({
      ...m,
      sections: arrayMove(m.sections, from, to),
    }));
  };

  const reorderItems = (
    sectionId: string,
    from: number,
    to: number
  ) => {
    setMenu((m) => ({
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
  };

  const value: MenuEditorContextValue = {
    menu,
    setMenu,
    updateMenu,
    addSection,
    addItem,
    updateItem,
    removeSection,
    removeItem,
    reorderItems,
    reorderSections
  };

  return (
    <MenuEditorContext.Provider value={value}>
      {children}
    </MenuEditorContext.Provider>
  );
}

export function useMenuEditor() {
  const ctx = useContext(MenuEditorContext);
  if (!ctx) {
    throw new Error(
      "useMenuEditor must be used inside MenuEditorProvider"
    );
  }
  return ctx;
}
