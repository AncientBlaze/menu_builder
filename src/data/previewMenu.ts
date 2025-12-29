import { MenuDocument } from "@/types/menu";

export const PREVIEW_MENU: MenuDocument = {
  meta: {
    restaurantName: "Sample Restaurant",
    currency: "$",
  },
  theme: {} as any,
  visuals: undefined,
  sections: [
    {
      id: "p-1",
      title: "Starters",
      items: [
        { id: "i-1", name: "Spring Rolls", price: 120, isVeg: true },
        { id: "i-2", name: "Chicken Wings", price: 180, isVeg: false },
      ],
    },
    {
      id: "p-2",
      title: "Mains",
      items: [
        { id: "i-3", name: "Paneer Butter Masala", price: 260, isVeg: true },
        { id: "i-4", name: "Grilled Chicken", price: 320, isVeg: false },
      ],
    },
  ],
};
