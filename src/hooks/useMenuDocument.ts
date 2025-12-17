import { useState } from "react";
import { MenuDocument } from "@/types/menu";
import { nanoid } from "nanoid";

const initialMenu: MenuDocument = {
  meta: {
    restaurantName: "Indian cafe",
    tagline: "Fine Food & Drinks",
    address: "123 Main Street · (555) 123-4567",
    currency: "$",
  },
  theme: {
    theme: "light",
    fontFamily: "serif",
    layout: "single-column",
    compactItems: true,
    accentColor: "#b38b59",
  },
  sections: [],
};

export function useMenuDocument() {
  const [menu, setMenu] = useState<MenuDocument>(initialMenu);

  const addSection = () =>
    setMenu((m) => ({
      ...m,
      sections: [
        ...m.sections,
        { id: nanoid(), title: "New Section", items: [] },
      ],
    }));

  const updateMenu = (partial: Partial<MenuDocument>) =>
    setMenu((m) => ({ ...m, ...partial }));

  return {
    menu,
    setMenu,
    updateMenu,
    addSection,
  };
}
