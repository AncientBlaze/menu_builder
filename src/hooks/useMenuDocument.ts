import { useState } from "react";
import { MenuDocument } from "@/types/menu";
import { nanoid } from "nanoid";

const initialMenu: MenuDocument = {
  meta: {
    restaurantName: "Indian Café",
    tagline: "Fine Food & Drinks",
    address: "123 Main Street · (555) 123-4567",
    currency: "$",
    templateName: "Default",
  },
  theme: {
    /* Visual identity */
    theme: "light",
    fontFamily: "serif",
    accentColor: "#b38b59",

    /* Template behavior */
    layout: "single-column",
    density: "comfortable",
    dividerStyle: "line",
    priceAlignment: "right",
  },
  sections: [],
};

export function useMenuDocument() {
  const [menu, setMenu] =
    useState<MenuDocument>(initialMenu);

  const addSection = () =>
    setMenu((m) => ({
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

  const updateMenu = (
    partial: Partial<MenuDocument>
  ) =>
    setMenu((m) => ({
      ...m,
      ...partial,
    }));

  return {
    menu,
    setMenu,
    updateMenu,
    addSection,
  };
}
