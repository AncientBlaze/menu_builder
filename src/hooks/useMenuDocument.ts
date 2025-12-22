import { useState } from "react";
import { MenuDocument } from "@/types/menu";
import { nanoid } from "nanoid";

/* =====================
   Initial Menu Template
===================== */

export const initialMenu: MenuDocument = {
  meta: {
    restaurantName: "Indian Café",
    tagline: "Fine Food & Drinks",
    address: "123 Main Street · (555) 123-4567",
    currency: "$",
    templateName: "Default",
  },

  theme: {
    theme: "light",
    fontFamily: "Source Serif 4",
    accentColor: "#b38b59",
    layout: "single-column",
    density: "comfortable",
    dividerStyle: "line",
    priceAlignment: "right",
  },

  visuals: {
    logo: {
      url: "",
      position: "top",
      align: "center",
      size: 64,
    },
    background: {
      type: "none",
      url: "",
      overlay: {
        color: "#000",
        opacity: 0.25,
      },
      exportMode: {
        freezeAnimation: true,
      },
    },
  },

  sections: [],
};

/* =====================
   Hook
===================== */

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
